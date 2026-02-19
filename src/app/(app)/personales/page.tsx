
"use client";

import { useMemo, useState } from "react";
import { useFinanzas } from "@/lib/finanzas/useFinanzas";
import { formatClp, toClpNumber } from "@/lib/number";
import { cn } from "@/lib/utils";

export default function PersonalesPage() {
  const [mes, setMes] = useState<string | undefined>(undefined);
  const { resumen, loading, error, refresh } = useFinanzas(mes);

  const disponiblePresupuesto = useMemo(() => {
    if (!resumen) return 0;
    const pres = toClpNumber(resumen.presupuesto);
    const gasto = toClpNumber(resumen.gasto_total);
    if (!pres) return Math.max(toClpNumber(resumen.ingreso_total) - gasto, 0);
    return Math.max(pres - gasto, 0);
  }, [resumen]);

  const progresoPresupuesto = useMemo(() => {
    if (!resumen) return 0;
    const pres = toClpNumber(resumen.presupuesto);
    const gasto = toClpNumber(resumen.gasto_total);
    if (!pres) return 0;
    return Math.min(100, pres > 0 ? Math.round((gasto / pres) * 100) : 0);
  }, [resumen]);

  const meses = resumen?.meses_disponibles || [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Gastos personales</p>
          <h1 className="text-2xl font-bold text-slate-900">Control personal</h1>
          <p className="text-sm text-slate-600">Solo lectura, mismo backend que la app móvil.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {meses.length > 0 && (
            <select
              value={mes || ""}
              onChange={(e) => setMes(e.target.value || undefined)}
              className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 focus:border-emerald-300"
            >
              <option value="">Mes reciente</option>
              {meses.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          )}
          <button
            type="button"
            onClick={refresh}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-px hover:border-emerald-200 hover:text-emerald-700"
          >
            Actualizar
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Presupuesto</p>
              <h2 className="text-lg font-semibold text-slate-900">{resumen?.mes || "Mes actual"}</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {progresoPresupuesto}% usado
            </span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3 text-sm font-semibold text-slate-900">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Disponible</p>
              <p className="text-lg">{formatClp(disponiblePresupuesto)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gastado</p>
              <p className="text-lg text-amber-700">{formatClp(resumen?.gasto_total || 0)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Ingresos</p>
              <p className="text-lg text-emerald-700">{formatClp(resumen?.ingreso_total || 0)}</p>
            </div>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full bg-emerald-400"
              style={{ width: `${Math.min(100, progresoPresupuesto)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">Presupuesto: {formatClp(resumen?.presupuesto || 0)}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Totales</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Balance neto</p>
              <p className={cn("text-xl", (resumen?.ingreso_total || 0) - (resumen?.gasto_total || 0) >= 0 ? "text-emerald-700" : "text-amber-700")}>{formatClp((resumen?.ingreso_total || 0) - (resumen?.gasto_total || 0))}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="text-xs text-slate-500">Meses con movimiento</p>
              <p className="text-xl text-slate-900">{meses.length || "-"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Cargando movimientos...</div>
        )}
        {!loading && !error && resumen?.transacciones?.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No hay movimientos en este mes.
          </div>
        )}
        {!loading && resumen?.transacciones?.map((mov) => (
          <article key={mov.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{mov.descripcion}</h3>
                <p className="text-sm text-slate-600">{mov.categoria || "-"}</p>
                <p className="text-xs text-slate-500">{formatFecha(mov.fecha || mov.created_at)}</p>
              </div>
              <p className={cn("text-lg font-bold", mov.tipo === "ingreso" ? "text-emerald-700" : "text-amber-700")}>{formatClp(mov.monto)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function formatFecha(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-CL", { year: "numeric", month: "short", day: "numeric" });
}
