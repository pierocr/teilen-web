
"use client";

import Image from "next/image";
import Link from "next/link";
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
        const neto = -Math.round(toClpNumber(g.deuda_neta ?? 0)); // positivo = te deben
        const debesPend = Math.max(-neto, 0);
        const cobrarPend = Math.max(neto, 0);
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
          <h1 className="text-2xl font-bold text-slate-900">Tus grupos</h1>
          <p className="text-sm text-slate-600">
            Revisa el estado de cada grupo y entra al detalle para ver participantes, deudas y gastos.
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

      {sorted.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {sorted.map((grupo) => (
            <Link
              key={grupo.id}
              href={`/app/grupos/${grupo.id}`}
              className="group block border-b border-slate-100 px-4 py-4 transition last:border-b-0 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 sm:px-5"
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(220px,1.4fr)_120px_repeat(4,minmax(108px,0.8fr))_96px] lg:items-center">
                <div className="flex min-w-0 items-center gap-3">
                  {isValidImageUrl(grupo.imagen) ? (
                    <Image
                      src={grupo.imagen!}
                      alt={grupo.nombre}
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                      unoptimized
                      sizes="44px"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                  {!isValidImageUrl(grupo.imagen) && (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-sm font-semibold text-emerald-800">
                      {grupo.nombre.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-bold text-slate-900 group-hover:text-emerald-800">
                      {grupo.nombre}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{grupo.moneda || "CLP"}</p>
                  </div>
                </div>

                <div className="flex items-center lg:justify-start">
                  <BadgeDeuda neto={grupo._neto} />
                </div>

                <ListMetric
                  label={grupo._neto >= 0 ? "Te deben (neto)" : "Debes (neto)"}
                  value={formatClp(Math.abs(grupo._neto))}
                  highlightPositive={grupo._neto > 0}
                  highlightNegative={grupo._neto < 0}
                  emphasized
                />
                <ListMetric label="Gastado" value={formatClp(grupo.total_gastado)} />
                <ListMetric label="Cobrado" value={formatClp(grupo.total_recibido)} />
                <ListMetric label="Pagado" value={formatClp(grupo.total_pagado)} />

                <div className="text-sm font-bold text-emerald-700 lg:text-right">
                  Ver detalle <span aria-hidden className="ml-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ListMetric({
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
    <div className="grid grid-cols-[112px_1fr] items-baseline gap-2 lg:block">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p
        className={cn(
          "truncate",
          emphasized ? "text-base font-extrabold" : "text-sm font-bold",
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
