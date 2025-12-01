// src/lib/grupos/api.ts
import { apiRequest } from "../api-client";

export type Grupo = {
  id: number;
  nombre: string;
  imagen: string | null;
  moneda: string | null;
  orden: number | null;
  total_gastado: number;
  total_adeudado: number;
  total_pagado: number;
  total_por_cobrar: number;
  total_recibido: number;
  deuda_neta: number;
};

export type GruposResponse = {
  full: boolean;
  data: Grupo[];
  serverTime: string;
};

export function fetchGrupos(token: string) {
  return apiRequest<GruposResponse>("/grupos", {
    method: "GET",
    authToken: token,
  });
}
