"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DownloadModal } from "@/components/DownloadModal";

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";
const UNIVERSAL_DOWNLOAD_URL = "https://www.teilen.cl/api/download";

type Feature = {
  title: string;
  description: string;
  icon: () => JSX.Element;
};

const features: Feature[] = [
  {
    title: "Grupos ilimitados",
    description: "Crea todos los grupos que necesites sin restricciones.",
    icon: PeopleIcon,
  },
  {
    title: "Reportes premium",
    description: "Exporta PDF y Excel listos para compartir.",
    icon: ReportIcon,
  },
  {
    title: "Gastos completos",
    description: "Todo el detalle de tus gastos en un toque.",
    icon: NotebookIcon,
  },
  {
    title: "Recurrentes y cuotas",
    description: "Pagos automáticos sin olvidos.",
    icon: RecurringIcon,
  },
];

const trustBadges = [
  { icon: ShieldIcon, label: "Pago seguro" },
  { icon: RefreshIcon, label: "Cancela cuando quieras" },
];

export function PremiumLanding() {
  const [downloadOpen, setDownloadOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 90% at 10% 0%, rgba(245,214,114,0.12), transparent 60%), radial-gradient(45% 60% at 88% 2%, rgba(0,208,132,0.14), transparent 60%), linear-gradient(150deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
        }}
      />
      <div
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[#f5d6721f] blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-4 h-80 w-80 rounded-full bg-[#00d0841f] blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-12 md:pb-24 md:pt-16">
        <header className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_22px_60px_rgba(0,0,0,0.45)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              <Image
                src="/logo_teilen.png"
                alt="Teilen Premium"
                width={56}
                height={56}
                className="h-12 w-12 rounded-lg object-contain drop-shadow"
                priority
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Teilen Premium
              </p>
              <p className="text-lg font-bold">Experiencia completa</p>
            </div>
          </div>

          <Link
            href="/"
            aria-label="Volver al inicio"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg font-semibold text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5d672] sm:inline-flex"
          >
            ✕
          </Link>
        </header>

        <section className="mt-8 space-y-6 rounded-[28px] border border-[#f5d67233] bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] p-6 shadow-[0_28px_80px_rgba(0,0,0,0.55)] md:p-8">
          <div className="space-y-3 md:space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#f5d67230] bg-[#f5d6721a] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#f5d672]">
              Todo tu dinero, sin límites
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              Gestiona finanzas sin restricciones
            </h1>
            <p className="max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              Reportes, grupos ilimitados y control detallado para tus gastos compartidos. La misma experiencia
              premium de la app, ahora explicada en la web.
            </p>
          </div>

          <div className="grid gap-3 md:gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 rounded-2xl border border-[#f5d67226] bg-white/[0.02] px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
              >
                <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#f5d67255] bg-[#f5d6721f] text-[#f5d672]">
                  <feature.icon />
                </div>
                <div>
                  <p className="text-base font-semibold">{feature.title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[28px] border border-[#f5d67240] bg-gradient-to-br from-[#1c1c26] via-[#161620] to-[#0f0f15] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.65)] md:mt-10 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#f5d67230] bg-[#f5d6721a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f5d672]">
                Oferta lanzamiento
              </p>
              <div className="flex flex-wrap items-end gap-2 text-4xl font-extrabold leading-none md:text-5xl">
                <span>$4.990</span>
                <span className="text-lg font-semibold text-white/70 md:text-xl">/mes</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f5d6721f] px-3 py-1.5 text-sm font-semibold text-[#f5d672]">
                <span>-50% oferta lanzamiento</span>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/70 md:text-base">
                Disponible solo desde la app. Activa Premium en iOS o Android y lleva tus grupos, reportes y
                recordatorios sin límites.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="w-full min-w-[220px] rounded-full bg-[#f5d672] px-5 py-3 text-center text-base font-bold text-[#0a0a0f] shadow-[0_18px_60px_rgba(245,214,114,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_70px_rgba(245,214,114,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5d672]"
              >
                Descarga la app
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Suscripción segura en App Store y Google Play
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-white/80">
            {trustBadges.map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2"
              >
                <span className="text-[#f5d672]">
                  <item.icon />
                </span>
                {item.label}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={APP_STORE_URL}
              aria-label="Descargar Teilen en App Store"
              className="inline-flex overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-1 shadow-lg transition hover:-translate-y-0.5 hover:border-[#f5d67260]"
              rel="noopener"
            >
              <Image
                src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                alt="Disponible en App Store"
                width={174}
                height={58}
                className="h-[58px] w-[174px]"
              />
            </a>
            <a
              href={PLAY_STORE_URL}
              aria-label="Descargar Teilen en Google Play"
              className="inline-flex overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] p-1 shadow-lg transition hover:-translate-y-0.5 hover:border-[#f5d67260]"
              rel="noopener"
            >
              <Image
                src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                alt="Disponible en Google Play"
                width={196}
                height={58}
                className="h-[58px] w-[196px]"
              />
            </a>
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/90 shadow-lg transition hover:-translate-y-0.5 hover:border-[#f5d67260]"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f5d6721f] text-[#f5d672] text-xs font-bold tracking-wide">
                QR
              </span>
              <span>Escanear QR o abrir en tu móvil</span>
            </a>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/55">
            Se renueva automáticamente - Gestiona tu plan desde Google Play o App Store
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
            <span className="text-[#f5d672]">
              <RestoreIcon />
            </span>
            Restaura compras directamente desde la app
          </div>
        </section>
      </div>

      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </div>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7.2 11a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm9.6 0a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Z" />
      <path d="M3 19.4c0-2.7 2.2-4.9 4.9-4.9H10c1.4 0 2.6.6 3.5 1.5a6 6 0 0 0-1.3 3.4v1.1H3.9c-.5 0-.9-.4-.9-.9Z" />
      <path d="M12 19.4c0-2.7 2.2-4.9 4.9-4.9h.3a4.8 4.8 0 0 1 4.8 4.3l.1 1.2H12v-.6Z" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M7 3h7.6L19 7.4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm7.5 1.9V8h3.1L14.5 4.9ZM9 11.5h6v-1H9v1Zm0 3h6v-1H9v1Zm0 3h3v-1H9v1Z" />
    </svg>
  );
}

function NotebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M6 4h11a2 2 0 0 1 2 2v12.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2Zm0 3.5v11a1 1 0 0 0 1 1h9.9a1 1 0 0 0 1-1V6c0-.6-.5-1-1-1H7a1 1 0 0 0-1 1v1.5ZM9 10.25h7v-1.5H9v1.5Zm0 3.25h7v-1.5H9v1.5Zm0 3.25h5v-1.5H9V16.75Z" />
      <path d="M5.5 5.5h-1a1 1 0 0 0-1 1v12.5a1.5 1.5 0 0 0 1.5 1.5H7V5.5H5.5Z" />
    </svg>
  );
}

function RecurringIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M16.4 4.6A8 8 0 0 0 4.8 9.2l-1.1-.5a.6.6 0 0 0-.7.9l2 3.4c.2.4.8.4 1 0l2-3.4a.6.6 0 0 0-.7-.9l-1 .5a6 6 0 0 1 8.1-3.4.8.8 0 1 0 .6-1.5Zm3.6 5.1c-.2-.4-.8-.4-1 0l-2 3.4a.6.6 0 0 0 .7.9l1-.5a6 6 0 0 1-8 3.3.8.8 0 0 0-.6 1.5 8 8 0 0 0 11.6-4.7l1 .5a.6.6 0 0 0 .7-.9l-2-3.5Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 3 5 6v5.8c0 3.7 2.9 7.1 7 8.7 4.1-1.6 7-5 7-8.7V6l-7-3Zm0 1.8 5 2.2v4.8c0 3-2.1 5.8-5 7.1-2.9-1.3-5-4.1-5-7.1V7l5-2.2Zm3.2 6.3-4 4-2.4-2.3 1.2-1.2 1.2 1.1 2.8-2.7 1.2 1.1Z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20 4v6h-6l2.3-2.3a5 5 0 0 0-8.2 2.4l-1.7-.4A7 7 0 0 1 16 6.7L18 4h2Zm-16 7h6l-2.3 2.3a5 5 0 0 0 8.2-2.4l1.7.4A7 7 0 0 1 8 17.3L6 20H4v-6Z" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 5a7 7 0 0 1 6.4 4H21l-3.5 3.5L14 9h2.3A5 5 0 1 0 7 12.5H5A7 7 0 0 1 12 5Zm-1 7V8h2v6h-5v-2h3Z" />
    </svg>
  );
}
