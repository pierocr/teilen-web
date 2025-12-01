// src/lib/finanzas/api.ts
import { apiRequest } from "../api-client";

export type TransaccionPersonal = {
  id: number;
  tipo: "gasto" | "ingreso";
  monto: number;
  categoria: string;
  descripcion: string;
  notas?: string | null;
  fecha: string;
  origen?: string | null;
  created_at?: string;
};

export type ResumenFinanzas = {
  mes: string;
  presupuesto: number;
  comentario: string | null;
  gasto_total: number;
  ingreso_total: number;
  actualizado_en: string | null;
  transacciones: TransaccionPersonal[];
  meses_disponibles: string[];
};

export type FinanzasResponse = {
  full: boolean;
  data: { resumen: ResumenFinanzas };
  serverTime: string;
};

export function fetchFinanzasPersonales(token: string, mes?: string) {
  const params = new URLSearchParams();
  if (mes) params.set("mes", mes);
  const path = `/finanzas-personales${params.size ? `?${params.toString()}` : ""}`;
  return apiRequest<FinanzasResponse>(path, { method: "GET", authToken: token });
}
