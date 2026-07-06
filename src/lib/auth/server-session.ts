import { cookies } from "next/headers";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  BACKEND_AUTH_COOKIE,
  getBackendBaseUrl,
  getCookieOptions,
} from "./session";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";

export type ServerAuthUser = {
  id: number;
  nombre?: string | null;
  nombreCompleto?: string | null;
  correo: string;
  telefono?: string | null;
  direccion?: string | null;
  ciudad?: string | null;
  pais?: string | null;
  bio?: string | null;
  codigo_pais?: string | null;
  fecha_nacimiento?: string | null;
  imagen_perfil?: string | null;
  uuid_auth?: string | null;
  auth_uid?: string | null;
};

type BackendProfilePayload =
  | ServerAuthUser
  | {
      full?: boolean;
      data?: ServerAuthUser;
      serverTime?: string;
    };

export function normalizeProfilePayload(payload: BackendProfilePayload | null): ServerAuthUser | null {
  if (!payload) return null;
  if ("data" in payload && payload.data) return normalizeUser(payload.data);
  return normalizeUser(payload as ServerAuthUser);
}

export function normalizeUser(user: ServerAuthUser): ServerAuthUser {
  return {
    ...user,
    nombre: user.nombre ?? user.nombreCompleto ?? null,
    nombreCompleto: user.nombreCompleto ?? user.nombre ?? null,
    auth_uid: user.auth_uid || user.uuid_auth || null,
    uuid_auth: user.uuid_auth || user.auth_uid || null,
  };
}

export async function fetchBackendJson<T>(
  path: string,
  init: RequestInit & { authToken?: string | null } = {}
) {
  const { authToken, headers: initHeaders, ...rest } = init;
  const headers = new Headers(initHeaders);
  if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
  if (rest.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    ...rest,
    headers,
    cache: "no-store",
  });

  const data = await safeJson(response);
  if (!response.ok) {
    const message =
      (data as { error?: string; message?: string; mensaje?: string } | null)?.error ||
      (data as { message?: string } | null)?.message ||
      (data as { mensaje?: string } | null)?.mensaje ||
      response.statusText;
    const error = new Error(message);
    (error as Error & { status?: number; payload?: unknown }).status = response.status;
    (error as Error & { status?: number; payload?: unknown }).payload = data;
    throw error;
  }

  return data as T;
}

export async function getSupabaseAccessToken() {
  const supabase = await createSupabaseServerClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) return { token: null, user: null };

  const { data: sessionData } = await supabase.auth.getSession();
  return {
    token: sessionData.session?.access_token ?? null,
    user: userData.user,
  };
}

export async function getRequestAuthToken() {
  const cookieStore = await cookies();
  const backendToken = cookieStore.get(BACKEND_AUTH_COOKIE)?.value;
  if (backendToken) return backendToken;

  const { token } = await getSupabaseAccessToken();
  return token;
}

export async function getCurrentProfile() {
  const cookieStore = await cookies();
  const backendToken = cookieStore.get(BACKEND_AUTH_COOKIE)?.value;

  if (backendToken) {
    try {
      const payload = await fetchBackendJson<BackendProfilePayload>("/usuarios/perfil", {
        method: "GET",
        authToken: backendToken,
      });
      return normalizeProfilePayload(payload);
    } catch (error) {
      const status = (error as Error & { status?: number }).status;
      if (status === 401 || status === 403 || status === 404) {
        cookieStore.delete(BACKEND_AUTH_COOKIE);
      } else {
        throw error;
      }
    }
  }

  const { token, user } = await getSupabaseAccessToken();
  if (!token || !user) return null;

  try {
    const payload = await fetchBackendJson<BackendProfilePayload>("/usuarios/perfil", {
      method: "GET",
      authToken: token,
    });
    return normalizeProfilePayload(payload);
  } catch (error) {
    const status = (error as Error & { status?: number }).status;
    if (status !== 404 && status !== 400) throw error;

    await registerSupabaseUser(user, token);
    const payload = await fetchBackendJson<BackendProfilePayload>("/usuarios/perfil", {
      method: "GET",
      authToken: token,
    });
    return normalizeProfilePayload(payload);
  }
}

export async function registerSupabaseUser(user: SupabaseUser, token: string) {
  const metadata = user.user_metadata || {};
  const emailName = user.email?.includes("@") ? user.email.split("@")[0] : null;
  const nombre =
    metadata.full_name ||
    metadata.name ||
    metadata.fullName ||
    emailName ||
    "Usuario Teilen";
  const rawLocale = typeof metadata.locale === "string" ? metadata.locale : null;

  return fetchBackendJson("/auth/register", {
    method: "POST",
    authToken: token,
    body: JSON.stringify({
      nombre,
      correo: user.email,
      telefono: metadata.phone_number || metadata.phone || null,
      direccion: metadata.address || null,
      ciudad: metadata.city || metadata.ciudad || null,
      pais: metadata.country || null,
      fecha_nacimiento: metadata.birthdate || null,
      genero: metadata.gender || null,
      bio: metadata.bio || null,
      lenguaje: rawLocale ? rawLocale.slice(0, 2).toLowerCase() : "es",
      codigo_pais: metadata.country_code || metadata.countryCode || null,
      uuid_auth: user.id,
      provider: user.app_metadata?.provider || metadata.provider || "google",
    }),
  });
}

export async function setBackendAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(BACKEND_AUTH_COOKIE, token, getCookieOptions());
}

export async function clearBackendAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(BACKEND_AUTH_COOKIE, "", {
    ...getCookieOptions(),
    maxAge: 0,
  });
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
