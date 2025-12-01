// src/lib/gastos/api.ts
import { apiRequest } from "../api-client";

export type Gasto = {
  id: number;
  descripcion: string;
  monto: number;
  pagado_por: number;
  pagado_por_nombre: string | null;
  pagado_por_imagen?: string | null;
  icono?: string | null;
  nota?: string | null;
  recurrente?: boolean;
  es_plantilla?: boolean;
  plantilla_tipo?: string | null;
  recurrente_frecuencia?: string | null;
  recurrente_fecha_inicio?: string | null;
  recurrente_fecha_proxima?: string | null;
  recurrente_ultima_ejecucion?: string | null;
  pago_en_cuotas?: boolean;
  fecha_inicio_cuotas?: string | null;
  num_cuotas?: number | null;
  creado_en?: string;
  fecha_gasto?: string | null;
  pagado: boolean;
  pagado_en?: string | null;
  saldado?: boolean;
  relacion_usuario?: "debes" | "a_favor" | "sin_participacion";
  monto_usuario?: number | null;
  monto_prestado?: number | null;
  es_cuota?: boolean;
  total_cuotas?: number | null;
  cuota_actual?: number | null;
  monto_cuota?: number | null;
  proxima_cuota_fecha?: string | null;
};

export async function fetchGastosByGrupo(
  token: string,
  grupoId: number,
  opts: { incluirPagados?: boolean } = {}
) {
  const params = new URLSearchParams();
  if (opts.incluirPagados) {
    params.set("incluirPagados", "1");
    params.set("includePaid", "1");
  }

  const search = params.toString();
  const path = `/gastos/${grupoId}${search ? `?${search}` : ""}`;
  return apiRequest<Gasto[]>(path, { method: "GET", authToken: token });
}
