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
          {/* Columna marca + texto + badges + newsletter */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/logo_mail.png"
                alt="Teilen"
                className="h-10 w-auto select-none"
                loading="lazy"
              />
              <span className="sr-only">Teilen</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600">
              La forma moderna de dividir gastos con amigos, pareja y equipos.
              Claro, rápido y sin drama.
            </p>

            {/* Badges de tiendas */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#"
                aria-label="Descargar en App Store"
                className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow"
                rel="noopener"
              >
                <img
                  src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                  alt="Disponible en App Store"
                  className="h-12 w-auto"
                  loading="lazy"
                />
              </a>

              <a
                href="#"
                aria-label="Obtener en Google Play"
                className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow"
                rel="noopener"
              >
                <img
                  src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                  alt="Disponible en Google Play"
                  className="h-12 w-auto"
                  loading="lazy"
                />
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
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 active:translate-y-px"
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
