"use client";

import { useMemo } from "react";
import { useGrupos } from "@/lib/grupos/useGrupos";
import { cn } from "@/lib/utils";
import { toClpNumber, formatClp } from "@/lib/number";

const isValidImageUrl = (url: string | null | undefined) => {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  return /^https?:\/\//i.test(trimmed);
};

export default function GruposPage() {
  const { grupos, loading, error, refresh } = useGrupos();

  const sorted = useMemo(() => {
    return [...grupos]
      .map((g) => {
        const debesPend = Math.max(toClpNumber(g.total_adeudado) - toClpNumber(g.total_pagado), 0);
        const cobrarPend = Math.max(toClpNumber(g.total_por_cobrar) - toClpNumber(g.total_recibido), 0);
        const neto = cobrarPend - debesPend; // positivo = te deben
        return { ...g, _debesPend: debesPend, _cobrarPend: cobrarPend, _neto: neto };
      })
      .sort((a, b) => {
        const orderA = a.orden ?? 0;
        const orderB = b.orden ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return b.id - a.id;
      });
  }, [grupos]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Grupos</p>
          <h1 className="text-2xl font-bold text-slate-900">Tus grupos (solo lectura)</h1>
          <p className="text-sm text-slate-600">
            Información obtenida de /grupos en el backend móvil. Próximas fases: detalle de gastos por grupo.
          </p>
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

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          Cargando grupos...
        </div>
      )}

      {!loading && !error && sorted.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No encontramos grupos asociados a tu cuenta todavía.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {sorted.map((grupo) => (
          <article
            key={grupo.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow"
          >
            <div className="flex items-center gap-3">
              {isValidImageUrl(grupo.imagen) ? (
                // Usamos <img> directo para evitar bloqueos si el dominio no está permitido
                <img
                  src={grupo.imagen!}
                  alt={grupo.nombre}
                  className="h-12 w-12 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : null}
              {!isValidImageUrl(grupo.imagen) && (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-sm font-semibold text-emerald-800">
                  {grupo.nombre.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-slate-900">{grupo.nombre}</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{grupo.moneda || "CLP"}</p>
              </div>
              <BadgeDeuda neto={grupo._neto} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <Metric
                label={grupo._neto >= 0 ? "Te deben (neto)" : "Debes (neto)"}
                value={formatClp(Math.abs(grupo._neto))}
                highlightPositive={grupo._neto > 0}
                highlightNegative={grupo._neto < 0}
                emphasized
              />
              <Metric label="Gastado" value={formatClp(grupo.total_gastado)} />
              <Metric label="Cobrado" value={formatClp(grupo.total_recibido)} />
              <Metric label="Pagado" value={formatClp(grupo.total_pagado)} />
            </div>

            <div className="mt-4 flex justify-end">
              <a
                href={`/app/grupos/${grupo.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:-translate-y-px hover:border-emerald-300"
              >
                Ver gastos
                <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  highlightPositive,
  highlightNegative,
  emphasized,
}: {
  label: string;
  value: string;
  highlightPositive?: boolean;
  highlightNegative?: boolean;
  emphasized?: boolean;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p
        className={cn(
          emphasized ? "text-lg font-extrabold" : "text-base font-bold",
          highlightPositive ? "text-emerald-700" : "",
          highlightNegative ? "text-amber-700" : "text-slate-900"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function BadgeDeuda({ neto }: { neto: number }) {
  if (neto === 0) {
    return (
      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
        Saldado
      </span>
    );
  }
  const isAcreedor = neto > 0; // positivo: te deben
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        isAcreedor
          ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border border-amber-200 bg-amber-50 text-amber-700"
      )}
    >
      {isAcreedor ? "Te deben" : "Debes"}
    </span>
  );
}
