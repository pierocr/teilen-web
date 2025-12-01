// src/lib/auth/api.ts
import { apiRequest } from "../api-client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export type AuthUser = {
  id: number;
  nombre?: string | null;
  nombreCompleto?: string | null;
  correo: string;
  imagen_perfil?: string | null;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type ProfileResponse = {
  id: number;
  nombre?: string | null;
  correo: string;
  telefono?: string | null;
  imagen_perfil?: string | null;
};

export function loginRequest(payload: { correo: string; password: string }) {
  return apiRequest<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function fetchProfile(token: string) {
  return apiRequest<ProfileResponse>("/auth/perfil", {
    method: "GET",
    authToken: token,
  });
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
