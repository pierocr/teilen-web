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
import { AuthUser, fetchSession, loginRequest, logoutRequest } from "./api";
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

  const refreshProfileInternal = useCallback(async () => {
    try {
      setStatus("checking");
      const result = await fetchSession();
      setUser(normalizeUser(result.user));
      setToken("cookie-session");
      clearLegacyToken();
      setStatus("authenticated");
    } catch {
      setUser(null);
      setToken(null);
      clearLegacyToken();
      setStatus("unauthenticated");
    }
  }, []);

  // Lee token al hidratar + maneja callback de OAuth
  useEffect(() => {
    const bootstrap = async () => {
      try {
        await refreshProfileInternal();
      } catch (err) {
        console.warn("Error inicializando autenticación web:", err);
        clearLegacyToken();
        setUser(null);
        setToken(null);
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
      clearLegacyToken();
      setToken("cookie-session");
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
            redirectTo: `${window.location.origin}/auth/callback`,
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
    logoutRequest().catch((err) => {
      console.warn("No se pudo cerrar sesión backend:", err);
    });
    clearLegacyToken();
    setUser(null);
    setToken(null);
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    const { data: authListener } = supabaseBrowser.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        clearLegacyToken();
        setUser(null);
        setToken(null);
        setStatus("unauthenticated");
        return;
      }

      if (session?.access_token) {
        refreshProfileInternal().catch((err) => {
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

function clearLegacyToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
function normalizeUser(data: AuthUser): AuthUser {
  return {
    ...data,
    nombre: data.nombre ?? data.nombreCompleto ?? null,
  };
}
