import { apiRequest } from "../api-client";

export type ResumenDeudas = {
  total_adeudado: number;
  total_pagado: number;
  cantidad_grupos: number;
  total_por_cobrar?: number;
  total_a_recibir?: number;
};

export type AhorrosEstadisticas = {
  total_metas: number | string;
  metas_completadas: number | string;
  metas_activas: number | string;
  total_objetivo: number | string;
  total_ahorrado: number | string;
  total_faltante: number | string;
};

export type AhorrosResponse = {
  estadisticas: AhorrosEstadisticas;
};

export type Notificacion = {
  id: number | string;
  titulo?: string | null;
  cuerpo?: string | null;
  tipo?: string | null;
  leido?: boolean | null;
  read?: boolean | null;
  is_read?: boolean | null;
  descripcion?: string | null;
  mensaje?: string | null;
  created_at?: string | null;
  creado_en?: string | null;
  fecha?: string | null;
};

export function fetchResumenDeudas(userId: number) {
  return apiRequest<ResumenDeudas>(`/deudas/resumen-financiero/${userId}`, {
    method: "GET",
  });
}

export function fetchAhorrosEstadisticas() {
  return apiRequest<AhorrosResponse>("/ahorros/estadisticas", {
    method: "GET",
  });
}

export function fetchNotificaciones() {
  return apiRequest<Notificacion[]>("/notificaciones", {
    method: "GET",
  });
}
