// src/lib/amigos/api.ts
import { apiRequest } from "../api-client";

export type Amigo = {
  id: number;
  nombre: string;
  correo: string;
  imagen_perfil?: string | null;
};

export type AmigosResponse = {
  full: boolean;
  data: Amigo[];
  serverTime: string;
};

export function fetchAmigos(token: string) {
  return apiRequest<AmigosResponse>("/amigos", {
    method: "GET",
    authToken: token,
  });
}
