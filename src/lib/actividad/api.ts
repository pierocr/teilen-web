// src/lib/actividad/api.ts
import { apiRequest } from "../api-client";

export type ActividadResumen = {
  total_gastado: number;
  total_recibido: number;
};

export type ActividadItem = {
  id?: number;
  tipo?: string;
  descripcion?: string;
  fecha?: string;
  creado_en?: string;
  monto?: number;
  usuario?: string;
  grupo?: string;
};

export function fetchActividadResumen(token: string) {
  return apiRequest<ActividadResumen>('/gastos/actividad/resumen', { method: 'GET', authToken: token });
}

export function fetchActividad(token: string) {
  return apiRequest<ActividadItem[]>('/gastos/actividad', { method: 'GET', authToken: token });
}
