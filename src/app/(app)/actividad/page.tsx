"use client";

import { useActividad } from "@/lib/actividad/useActividad";
import { formatClp } from "@/lib/number";

export default function ActividadPage() {
  const { resumen, items, loading, error, refresh } = useActividad();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Actividad</p>
          <h1 className="text-2xl font-bold text-slate-900">Movimiento reciente</h1>
          <p className="text-sm text-slate-600">Lectura directa de /gastos/actividad y /gastos/actividad/resumen.</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-px hover:border-emerald-200 hover:text-emerald-700"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Resumen</p>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Has pagado</span>
              <span className="font-semibold text-slate-900">{formatClp(resumen?.total_gastado || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Has recibido</span>
              <span className="font-semibold text-slate-900">{formatClp(resumen?.total_recibido || 0)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Estado</p>
          <p className="mt-2 text-sm text-slate-600">Solo lectura, sin acciones.</p>
        </div>
      </div>

      <div className="space-y-3">
        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Cargando actividad...</div>
        )}
        {!loading && !error && items.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No hay actividad reciente.
          </div>
        )}
        {!loading && items.map((item, idx) => (
          <article key={idx} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{item.descripcion || item.tipo || "Evento"}</h2>
                <p className="text-sm text-slate-600">{item.usuario || item.grupo || ""}</p>
                <p className="text-xs text-slate-500">{formatFecha(item.fecha || item.creado_en)}</p>
              </div>
              {item.monto !== undefined && item.monto !== null ? (
                <p className="text-lg font-bold text-slate-900">{formatClp(item.monto)}</p>
              ) : null}
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
