"use client";

import { useEffect, useState } from "react";
import { fetchProfile, ProfileResponse } from "@/lib/auth/api";
import { useAuth } from "@/lib/auth/auth-provider";

export default function CuentaPage() {
  const { token, logout } = useAuth();
  const [perfil, setPerfil] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchProfile(token);
        setPerfil(data);
        setError(null);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "No pudimos cargar tu perfil";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Cuenta</p>
          <h1 className="text-2xl font-bold text-slate-900">Tu perfil</h1>
          <p className="text-sm text-slate-600">Solo lectura. Misma data que la app móvil.</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-px hover:border-emerald-200 hover:text-emerald-700"
        >
          Cerrar sesión
        </button>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">Cargando perfil...</div>
      ) : perfil ? (
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2">
          <Field label="Nombre" value={perfil.nombre || "-"} />
          <Field label="Correo" value={perfil.correo} />
          <Field label="Teléfono" value={perfil.telefono || "-"} />
          <Field label="Ciudad" value={perfil.ciudad || "-"} />
          <Field label="País" value={perfil.pais || "-"} />
          <Field label="Bio" value={perfil.bio || "-"} />
          <Field label="Fecha de nacimiento" value={perfil.fecha_nacimiento || "-"} />
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          No pudimos cargar tu perfil.
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
