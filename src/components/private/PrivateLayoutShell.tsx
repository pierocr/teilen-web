"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-provider";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/app" },
  { label: "Grupos", href: "/app/grupos" },
  { label: "Gastos personales", href: "/personales" },
  { label: "Amigos", href: "/amigos" },
  { label: "Actividad", href: "/actividad" },
  { label: "Cuenta", href: "/cuenta" },
];

export function PrivateLayoutShell({ children }: PropsWithChildren) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/app" className="text-lg font-semibold text-emerald-700">
              Teilen · Área privada
            </Link>
            <nav className="hidden gap-3 text-sm text-slate-600 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 font-medium hover:bg-emerald-50 hover:text-emerald-700",
                    pathname === item.href ? "bg-emerald-50 text-emerald-700" : ""
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-xs text-slate-600 sm:block">
              <div className="font-semibold text-slate-900">{user?.nombre || "Usuario"}</div>
              <div className="text-slate-500">{user?.correo}</div>
            </div>
            <button
              type="button"
              onClick={logout}
              className={cn(
                "rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700",
                "transition hover:-translate-y-px hover:border-emerald-200 hover:text-emerald-700"
              )}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="mb-6 rounded-2xl border border-dashed border-emerald-200 bg-white/70 px-4 py-3 text-sm text-emerald-700">
          <p className="font-semibold">Solo lectura (Fase 1)</p>
          <p className="text-emerald-700/80">
            Reutilizando el backend móvil. Grupos, Gastos, Amigos, Actividad y Cuenta vendrán en próximas fases.
          </p>
        </section>
        {children}
      </main>
    </div>
  );
}
