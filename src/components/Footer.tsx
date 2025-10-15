"use client";
import type { ReactNode } from "react";

export function Footer() {
  const year = new Date().getFullYear();

  const nav = {
    producto: [
      { label: "Estadísticas claras de gasto", href: "#" },
      { label: "Solicitudes de pago fáciles", href: "#" },
      { label: "Seguimiento automático", href: "#" },
      { label: "Divide gastos de grupo", href: "#" },
      { label: "Tarjeta virtual gratis", href: "#" },
    ],
    casos: [
      { label: "Para parejas", href: "#" },
      { label: "Vacaciones en grupo", href: "#" },
      { label: "Compañeros de piso", href: "#" },
      { label: "Cuentas de restaurante", href: "#" },
      { label: "Freelancers", href: "#" },
    ],
    ayuda: [
      { label: "Centro de ayuda", href: "#" },
      { label: "Contáctanos", href: "#" },
      { label: "Preguntas frecuentes", href: "#" },
      { label: "Glosario", href: "#" },
      { label: "Estado del servicio", href: "#" },
    ],
    empresa: [
      { label: "Sobre Teilen", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Prensa", href: "#" },
      { label: "Empleos", href: "#" },
      { label: "Documentos legales", href: "#" },
    ],
  };

  return (
    <footer className="relative mt-24 border-t border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-emerald-600" aria-hidden />
              <span className="text-lg font-semibold tracking-tight text-gray-900">
                Teilen
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
              La forma moderna de dividir gastos con amigos, pareja y equipos.
              Claro, rápido y sin drama.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:border-emerald-400 hover:shadow transition"
                aria-label="Disponible en App Store"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M16.365 1.43c0 1.14-.42 2.05-1.26 2.86-.84.8-1.85 1.27-2.97 1.17-.06-1.1.48-2.12 1.26-2.9.86-.84 2.16-1.42 2.97-1.13zM20.82 17.22c-.56 1.3-1.25 2.51-2.1 3.63-1.13 1.5-2.45 3.17-4.22 3.17-1.65 0-2.17-1.02-4.03-1.02-1.89 0-2.45 1-4.06 1.05-1.64.05-2.88-1.62-4.02-3.11C1.22 19.18 0 16.3 0 13.63c0-3.39 2.21-5.19 4.4-5.19 1.62 0 2.85.98 4 .98 1.11 0 2.54-1.02 4.44-1.02 1.01 0 3.08.11 4.6 1.95-3.9 2.11-3.27 7.7 3.38 6.87z" />
                </svg>
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:border-emerald-400 hover:shadow transition"
                aria-label="Disponible en Google Play"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M3.6 1.8l11.2 10.2L3.6 22.2c-.37.27-.86 0-.86-.45V2.25c0-.45.5-.72.86-.45zM16.1 12.9l3.7 3.36c.9.82 1.9 1.7 2.6 2.33.2.18.2.48 0 .66-.69.63-1.7 1.5-2.6 2.33l-3.7 3.36c-.35.32-.9.07-.9-.4V13.3c0-.47.55-.72.9-.4z" />
                </svg>
                Google Play
              </a>
            </div>

            {/* Newsletter (visual; conecta tu acción real cuando la tengas) */}
            <form
              className="mt-6 flex max-w-sm items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Suscripción a novedades"
            >
              <input
                type="email"
                required
                placeholder="Tu correo"
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none ring-emerald-500/30 focus:ring-4"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 active:translate-y-px transition"
              >
                Unirme
              </button>
            </form>
          </div>

          <FooterColumn title="Producto" items={nav.producto} className="lg:col-span-2" />
          <FooterColumn title="Casos de uso" items={nav.casos} className="lg:col-span-2" />
          <FooterColumn title="Ayuda" items={nav.ayuda} className="lg:col-span-2" />
          <FooterColumn title="Empresa" items={nav.empresa} className="lg:col-span-2" />
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>© {year} Teilen</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="#" className="hover:text-emerald-700">Privacidad</a>
            <a href="#" className="hover:text-emerald-700">Términos</a>
            <a href="#" className="hover:text-emerald-700">Cookies</a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                aria-label="Seleccionar idioma"
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:outline-none"
                defaultValue="es"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <SocialIcon label="X / Twitter" href="#" kind="x" />
              <SocialIcon label="LinkedIn" href="#" kind="in" />
              <SocialIcon label="Instagram" href="#" kind="ig" />
              <SocialIcon label="Facebook" href="#" kind="fb" />
              <SocialIcon label="YouTube" href="#" kind="yt" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Helpers ---------- */

function FooterColumn({
  title,
  items,
  className = "",
}: {
  title: string;
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav className={`min-w-[12rem] ${className}`} aria-label={title}>
      <h3 className="text-sm font-semibold tracking-wide text-gray-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-sm text-gray-600 transition hover:text-emerald-700"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialIcon({
  label,
  href,
  kind,
}: {
  label: string;
  href: string;
  kind: "x" | "in" | "ig" | "fb" | "yt";
}) {
  const paths: Record<string, ReactNode> = {
    x: <path d="M3 3l7.3 9.1L3.7 21H6l5.3-6.6L15.7 21H21l-7.5-9.4L20.3 3H18l-5 6.2L8.4 3H3z" />,
    in: <path d="M4 3a2 2 0 110 4 2 2 0 010-4zM4 8h4v13H4V8zm6 0h4v2h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.4 3 5.4 6.9V21h-4v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.6 1.7-2.6 3.5V21h-4V8z" />,
    ig: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" fill="white" />
        <circle cx="18" cy="6" r="1.2" fill="white" />
      </>
    ),
    fb: <path d="M13 3h4V7h-4v3h3.5l-.5 4H13v7H9v-7H7v-4h2V7.5C9 5 10.1 3 13 3z" />,
    yt: (
      <>
        <path d="M2 8.5C2 6.6 3.6 5 5.5 5h13c1.9 0 3.5 1.6 3.5 3.5v7c0 1.9-1.6 3.5-3.5 3.5h-13A3.5 3.5 0 012 15.5v-7z" />
        <path d="M10 10l6 3-6 3V10z" fill="white" />
      </>
    ),
  };

  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" stroke="none" aria-hidden>
        {paths[kind]}
      </svg>
    </a>
  );
}

export default Footer;
