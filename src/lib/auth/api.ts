// src/lib/auth/api.ts
import { apiRequest } from "../api-client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export type AuthUser = {
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
  auth_uid?: string | null;
  uuid_auth?: string | null;
  imagen_perfil?: string | null;
};

export type LoginResponse = {
  user: AuthUser;
};

export type ProfileResponse = {
  id: number;
  nombre?: string | null;
  correo: string;
  telefono?: string | null;
  imagen_perfil?: string | null;
  direccion?: string | null;
  ciudad?: string | null;
  pais?: string | null;
  bio?: string | null;
  codigo_pais?: string | null;
  fecha_nacimiento?: string | null;
  auth_uid?: string | null;
  uuid_auth?: string | null;
};

export type ProfileEnvelope = {
  full?: boolean;
  data?: ProfileResponse;
  serverTime?: string;
};

export function loginRequest(payload: { correo: string; password: string }) {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchProfile(token: string) {
  return apiRequest<ProfileEnvelope | ProfileResponse>("/usuarios/perfil", {
    method: "GET",
    authToken: token,
  }).then(normalizeProfileResponse);
}

export function registerFromSupabaseProfile(user: SupabaseUser) {
  const metadata = user?.user_metadata || {};
  const inferNombre =
    metadata.full_name ||
    metadata.name ||
    metadata.fullName ||
    (user.email?.includes("@") ? user.email.split("@")[0] : null) ||
    "Usuario Teilen";

  const lenguaje =
    typeof metadata.locale === "string" && metadata.locale.length >= 2
      ? metadata.locale.slice(0, 2).toLowerCase()
      : "es";

  return apiRequest<ProfileResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      nombre: inferNombre,
      correo: user.email,
      telefono: metadata.phone_number || metadata.phone || null,
      direccion: metadata.address || null,
      ciudad: metadata.city || metadata.ciudad || null,
      pais: metadata.country || null,
      fecha_nacimiento: metadata.birthdate || null,
      genero: metadata.gender || null,
      bio: metadata.bio || null,
      lenguaje,
      codigo_pais: metadata.country_code || metadata.countryCode || null,
      uuid_auth: user.id,
    }),
  });
}

export function fetchSession() {
  return apiRequest<LoginResponse>("/api/auth/session", {
    method: "GET",
  });
}

export function logoutRequest() {
  return apiRequest<{ ok: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}

function normalizeProfileResponse(payload: ProfileEnvelope | ProfileResponse) {
  if (payload && "data" in payload && payload.data) return payload.data;
  return payload as ProfileResponse;
}
