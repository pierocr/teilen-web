"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGrupos } from "@/lib/grupos/useGrupos";
import { useGastos } from "@/lib/gastos/useGastos";
import { cn } from "@/lib/utils";

export default function GrupoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const grupoId = useMemo(() => Number(params?.id ?? NaN), [params?.id]);
  const [incluirPagados, setIncluirPagados] = useState(false);

  const { grupos } = useGrupos();
  const grupo = useMemo(() => grupos.find((g) => g.id === grupoId) || null, [grupos, grupoId]);

  const { gastos, loading, error, refresh } = useGastos(Number.isFinite(grupoId) ? grupoId : null, {
    incluirPagados,
  });

  if (!Number.isFinite(grupoId)) {
    router.replace("/app/grupos");
    return null;
  }

  const title = grupo?.nombre ? `Gastos de ${grupo.nombre}` : "Gastos";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Gastos</p>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">
            Datos en solo lectura obtenidos desde /gastos/:id_grupo. Las cifras deben coincidir con la app móvil.
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
            <Link href="/app/grupos" className="rounded-full border border-slate-200 px-3 py-1 font-semibold hover:border-emerald-200 hover:text-emerald-700">
              ← Volver a grupos
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={incluirPagados}
              onChange={(e) => setIncluirPagados(e.target.checked)}
              className="h-4 w-4 accent-emerald-600"
            />
            Ver saldados
          </label>
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

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Cargando gastos...
        </div>
      )}

      {!loading && !error && gastos.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No hay gastos registrados en este grupo.
        </div>
      )}

      <div className="space-y-3">
        {gastos.map((gasto) => (
          <article
            key={gasto.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                  {gasto.icono || "💸"}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{gasto.descripcion}</h2>
                  <p className="text-sm text-slate-600">
                    Pagó {gasto.pagado_por_nombre || `Usuario ${gasto.pagado_por}`}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatFecha(gasto.fecha_gasto || gasto.creado_en)} · ID {gasto.id}
                  </p>
                  {gasto.nota ? (
                    <p className="mt-1 text-sm text-slate-600">Nota: {gasto.nota}</p>
                  ) : null}
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-slate-900">{formatCurrency(gasto.monto)}</p>
                {gasto.monto_usuario !== null && gasto.monto_usuario !== undefined ? (
                  <p className="text-sm text-slate-600">
                    Tu parte: <span className="font-semibold">{formatCurrency(gasto.monto_usuario)}</span>
                  </p>
                ) : null}
                <StatusBadge saldado={Boolean(gasto.saldado || gasto.pagado)} relacion={gasto.relacion_usuario} />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              {gasto.pago_en_cuotas && gasto.monto_cuota ? (
                <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                  En cuotas · {gasto.cuota_actual || 1}/{gasto.total_cuotas || "?"} · Cuota {formatCurrency(gasto.monto_cuota)}
                </span>
              ) : null}
              {gasto.recurrente ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                  Recurrente {gasto.recurrente_frecuencia ? `· ${gasto.recurrente_frecuencia}` : ""}
                </span>
              ) : null}
              {gasto.es_plantilla ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                  Plantilla
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({
  saldado,
  relacion,
}: {
  saldado: boolean;
  relacion?: "debes" | "a_favor" | "sin_participacion";
}) {
  if (saldado) {
    return (
      <span className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
        Saldado
      </span>
    );
  }

  if (relacion === "debes") {
    return (
      <span className="mt-2 inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
        Debes
      </span>
    );
  }
  if (relacion === "a_favor") {
    return (
      <span className="mt-2 inline-flex items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        A tu favor
      </span>
    );
  }

  return (
    <span className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
      Pendiente
    </span>
  );
}

function formatCurrency(value: number | null | undefined) {
  const num = Number(value || 0);
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(num);
}

function formatFecha(value?: string | null) {
  if (!value) return "Fecha no disponible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("es-CL", { year: "numeric", month: "short", day: "numeric" });
}
