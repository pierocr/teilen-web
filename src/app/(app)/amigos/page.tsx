
"use client";

import { useAmigos } from "@/lib/amigos/useAmigos";

export default function AmigosPage() {
  const { amigos, loading, error, refresh } = useAmigos();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Amigos</p>
          <h1 className="text-2xl font-bold text-slate-900">Tu red en Teilen</h1>
          <p className="text-sm text-slate-600">Solo lectura, mismo backend que la app móvil.</p>
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
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Cargando amigos...</div>
      )}

      {!loading && !error && amigos.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          No tienes amigos registrados todavía.
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {amigos.map((amigo) => (
          <article key={amigo.id} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-sm font-semibold text-emerald-800">
              {amigo.nombre?.slice(0, 2).toUpperCase() || "AM"}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900">{amigo.nombre || "Sin nombre"}</h2>
              <p className="text-sm text-slate-600">{amigo.correo}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
