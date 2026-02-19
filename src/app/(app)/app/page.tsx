
"use client";

import { useMemo } from "react";
import { useAuth } from "@/lib/auth/auth-provider";
import { useGrupos } from "@/lib/grupos/useGrupos";
import { toClpNumber, formatClp } from "@/lib/number";
import { cn } from "@/lib/utils";

export default function PrivateHome() {
  const { user } = useAuth();
  const { grupos, loading, error, refresh } = useGrupos();

  const totals = useMemo(() => {
    const count = grupos.length;
    let totalGastado = 0;
    let totalDebesPendiente = 0;
    let totalCobrarPendiente = 0;

    grupos.forEach((g) => {
      totalGastado += toClpNumber(g.total_gastado);

      const debesPend = Math.max(toClpNumber(g.total_adeudado) - toClpNumber(g.total_pagado), 0);
      const cobrarPend = Math.max(
        toClpNumber(g.total_por_cobrar) - toClpNumber(g.total_recibido),
        0
      );
      totalDebesPendiente += debesPend;
      totalCobrarPendiente += cobrarPend;
    });

    const balanceNeto = totalCobrarPendiente - totalDebesPendiente; // positivo = te deben
    return {
      count,
      totalGastado,
      totalDebesPendiente,
      totalCobrarPendiente,
      balanceNeto,
    };
  }, [grupos]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Dashboard</p>
            <h1 className="text-2xl font-bold text-slate-900">Hola {user?.nombre || user?.correo}</h1>
            <p className="text-sm text-slate-600">
              Resumen rápido de tus grupos (solo lectura). Datos obtenidos desde el backend móvil.
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
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <StatCard
            title="Balance neto"
            value={formatClp(totals.balanceNeto)}
            loading={loading}
            emphasized
            positive={totals.balanceNeto > 0}
            negative={totals.balanceNeto < 0}
          />
          <StatCard title="Grupos" value={totals.count} loading={loading} />
          <StatCard
            title="Total gastado (grupos)"
            value={formatClp(totals.totalGastado)}
            loading={loading}
          />
          <StatCard
            title="Lo que debes"
            value={formatClp(totals.totalDebesPendiente)}
            loading={loading}
          />
          <StatCard
            title="Lo que te deben"
            value={formatClp(totals.totalCobrarPendiente)}
            loading={loading}
          />
        </div>

        <div className="mt-6">
          <BalanceBar
            debes={totals.totalDebesPendiente}
            teDeben={totals.totalCobrarPendiente}
            loading={loading}
          />
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-3 text-sm text-emerald-800">
          Sin acciones de edición/creación; todo es lectura. Próximo paso: Grupos en detalle y listado de
          gastos por grupo (fase 3).
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  loading: boolean;
  emphasized?: boolean;
  positive?: boolean;
  negative?: boolean;
};

function StatCard({ title, value, loading, emphasized, positive, negative }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
      <p className="text-sm font-semibold text-slate-600">{title}</p>
      <p
        className={cn(
          "mt-2 text-2xl font-bold",
          emphasized ? "text-3xl" : "",
          positive ? "text-emerald-700" : "",
          negative ? "text-amber-700" : "text-slate-900"
        )}
      >
        {loading ? <span className="text-slate-400">Cargando...</span> : value}
      </p>
    </div>
  );
}

function BalanceBar({ debes, teDeben, loading }: { debes: number; teDeben: number; loading: boolean }) {
  const total = Math.max(debes, 0) + Math.max(teDeben, 0);
  const debesPct = total > 0 ? (debes / total) * 100 : 0;
  const teDebenPct = total > 0 ? (teDeben / total) * 100 : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>Distribución</span>
        <span className="text-xs text-slate-500">Solo lectura · backend móvil</span>
      </div>
      <div className="relative h-5 overflow-hidden rounded-full bg-slate-100">
        {loading ? (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        ) : (
          <>
            <div
              className="h-full bg-amber-200"
              style={{ width: `${Math.min(100, debesPct)}%` }}
              aria-label="Debes"
            />
            <div
              className="h-full bg-emerald-300"
              style={{ width: `${Math.min(100, teDebenPct)}%` }}
              aria-label="Te deben"
            />
          </>
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span>Debes</span>
          <span className="font-semibold text-slate-900">{formatClp(debes)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Te deben</span>
          <span className="font-semibold text-slate-900">{formatClp(teDeben)}</span>
        </div>
      </div>
    </div>
  );
}
