import { apiRequest } from "../api-client";

export type GrupoInfo = {
  id: number;
  nombre: string;
  descripcion?: string | null;
  imagen?: string | null;
  creado_por?: number | null;
  moneda?: string | null;
  mi_rol?: string | null;
};

export type GrupoResumen = {
  grupo_id: number;
  total_gastado: number;
  total_pagado: number;
  total_adeudado: number;
  total_adeudado_usuario: number;
  total_pagado_usuario: number;
  detalles_deuda?: Array<{
    destinatario_id: number;
    a_quien: string;
    monto: number;
  }>;
};

export type GrupoParticipante = {
  id: number;
  nombre: string;
  imagen_perfil?: string | null;
  es_ficticio?: boolean | null;
  rol?: string | null;
  estado?: string | null;
  es_amigo?: boolean | null;
  friendship_status?: string | null;
};

export type GrupoDeuda = {
  deudor_id: number;
  acreedor_id: number;
  monto: number;
};

export type GrupoDeudasResponse = {
  grupo_id: number;
  version?: string | number;
  deudas: GrupoDeuda[];
  serverTime?: string;
};

export function fetchGrupoInfo(grupoId: number) {
  return apiRequest<GrupoInfo>(`/grupos/${grupoId}`, { method: "GET" });
}

export function fetchGrupoResumen(grupoId: number) {
  return apiRequest<GrupoResumen>(`/grupos/${grupoId}/resumen`, { method: "GET" });
}

export function fetchGrupoParticipantes(grupoId: number) {
  return apiRequest<GrupoParticipante[]>(`/grupos/${grupoId}/participantes`, { method: "GET" });
}

export function fetchGrupoDeudas(grupoId: number) {
  return apiRequest<GrupoDeudasResponse>(`/grupos/${grupoId}/deudas`, { method: "GET" });
}
