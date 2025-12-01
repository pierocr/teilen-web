"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { AuthUser, fetchProfile, loginRequest, registerFromSupabaseProfile } from "./api";
import { supabaseBrowser } from "../supabase-browser";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  isAuthenticating: boolean;
  error: string | null;
  login: (payload: { correo: string; password: string }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
};

const STORAGE_KEY = "teilen.auth.token";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("checking");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileWithRegistration = useCallback(
    async (accessToken: string, supabaseUser?: SupabaseUser | null) => {
      try {
        return await fetchProfile(accessToken);
      } catch (err) {
        if (!supabaseUser) throw err;

        try {
          await registerFromSupabaseProfile(supabaseUser);
        } catch (registerErr) {
          console.warn("No se pudo registrar usuario desde Supabase:", registerErr);
        }

        return await fetchProfile(accessToken);
      }
    },
    []
  );

  const applySession = useCallback(
    async (accessToken: string, supabaseUser?: SupabaseUser | null) => {
      saveToken(accessToken);
      setToken(accessToken);
      const profile = await fetchProfileWithRegistration(accessToken, supabaseUser);
      setUser(normalizeUser(profile));
      setStatus("authenticated");
    },
    [fetchProfileWithRegistration]
  );

  const refreshProfileInternal = useCallback(
    async (session: Session | null, activeToken?: string) => {
      const currentToken = activeToken ?? token ?? session?.access_token ?? null;
      if (!currentToken) {
        setStatus("unauthenticated");
        setUser(null);
        return;
      }
      try {
        setStatus("checking");
        await applySession(currentToken, session?.user);
      } catch (_err) {
        clearToken();
        setUser(null);
        setStatus("unauthenticated");
      }
    },
    [applySession, token]
  );

  // Lee token al hidratar + maneja callback de OAuth
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          const code = url.searchParams.get("code");
          if (code) {
            const { error: exchangeError } = await supabaseBrowser.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              console.warn("No se pudo completar el login OAuth:", exchangeError.message);
            } else {
              url.searchParams.delete("code");
              url.searchParams.delete("state");
              window.history.replaceState({}, document.title, url.toString());
            }
          }
        }

        const { data: sessionData } = await supabaseBrowser.auth.getSession();
        const session = sessionData?.session;

        if (session?.access_token) {
          await refreshProfileInternal(session, session.access_token);
          return;
        }

        if (stored) {
          await refreshProfileInternal(null, stored);
          return;
        }

        setStatus("unauthenticated");
      } catch (err) {
        console.warn("Error inicializando autenticación web:", err);
        clearToken();
        setUser(null);
        setStatus("unauthenticated");
      }
    };

    bootstrap();
  }, [refreshProfileInternal]);

  const login = useCallback(async (payload: { correo: string; password: string }) => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const result = await loginRequest(payload);
      const normalizedUser = normalizeUser(result.user);
      saveToken(result.token);
      setToken(result.token);
      setUser(normalizedUser);
      setStatus("authenticated");
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo iniciar sesión";
      setError(message);
      setStatus("unauthenticated");
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const loginWithOAuth = useCallback(
    async (provider: "google" | "apple") => {
      if (typeof window === "undefined") return;
      setIsAuthenticating(true);
      setError(null);

      try {
        const { data, error: oauthError } = await supabaseBrowser.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/login`,
            scopes: provider === "google" ? "email profile" : undefined,
          },
        });

        if (oauthError) throw oauthError;

        if (data?.url) {
          window.location.assign(data.url);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "No se pudo iniciar sesión";
        setError(message);
        setStatus("unauthenticated");
      } finally {
        setIsAuthenticating(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    supabaseBrowser.auth.signOut().catch((err) => {
      console.warn("No se pudo cerrar sesión en Supabase:", err);
    });
    clearToken();
    setUser(null);
    setToken(null);
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        clearToken();
        setUser(null);
        setToken(null);
        setStatus("unauthenticated");
        return;
      }

      if (session?.access_token) {
        refreshProfileInternal(session, session.access_token).catch((err) => {
          console.warn("No se pudo refrescar sesión Supabase:", err);
        });
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, [refreshProfileInternal]);

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      isAuthenticating,
      error,
      login,
      loginWithGoogle: () => loginWithOAuth("google"),
      loginWithApple: () => loginWithOAuth("apple"),
      logout,
    }),
    [error, isAuthenticating, login, loginWithOAuth, logout, status, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

function saveToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, token);
}
function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
function normalizeUser(data: AuthUser): AuthUser {
  return {
    ...data,
    nombre: data.nombre ?? data.nombreCompleto ?? null,
  };
}
