"use client";

import Image from "next/image";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const highlights = [
  {
    title: "Balances vivos",
    description:
      "Cada abono y gasto se refleja al instante para que nadie pierda de vista el saldo real.",
  },
  {
    title: "Recordatorios humanos",
    description: "Automatiza avisos amables y evita perseguir a tus amigos por WhatsApp.",
  },
  {
    title: "Pagos ordenados",
    description: "Calculamos la mejor ruta para liquidar sin transferencias innecesarias.",
  },
];

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";
const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const UNIVERSAL_DOWNLOAD_URL = "https://www.teilen.cl/api/download";

export function DownloadModal({ open, onClose }: Props) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-[101] flex min-h-full items-center justify-center px-3 py-6 sm:px-4 sm:py-10 overflow-y-auto">
        <div className="relative w-full max-w-5xl rounded-[28px] border border-white/50 bg-white/95 p-5 sm:p-7 lg:p-9 shadow-[0_24px_100px_rgba(15,23,42,0.35)] max-h-[92vh] overflow-y-auto overscroll-contain">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-5 top-5 rounded-full border border-black/10 px-3 py-1 text-xs sm:text-sm font-medium text-slate-600 transition hover:bg-black/5"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1.05fr_0.8fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
                Disponible en iOS y Android
              </span>

              <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900 md:text-3xl lg:text-[34px]">
                Comparte gastos y ordena tus finanzas personales desde un mismo lugar
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
                Disfruta Teilen desde Chile hacia el mundo: grupos, viajes, parejas y equipos pueden sincronizar
                cada movimiento sin depender de hojas de cálculo.
              </p>

              <ul className="mt-5 space-y-3.5 text-sm leading-6 text-slate-600 md:text-base">
                {highlights.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 text-xs font-semibold">
                      ✓
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={APP_STORE_URL}
                  aria-label="Descargar Teilen en App Store"
                  className="inline-flex overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                  rel="noopener"
                >
                  <Image
                    src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                    alt="Disponible en App Store"
                    width={190}
                    height={56}
                    className="h-14 w-auto"
                  />
                </a>
                <a
                  href={PLAY_STORE_URL}
                  aria-label="Descargar Teilen en Google Play"
                  className="inline-flex overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md"
                  rel="noopener"
                >
                  <Image
                    src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                    alt="Disponible en Google Play"
                    width={204}
                    height={60}
                    className="h-14 w-auto"
                  />
                </a>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.35em] text-slate-400">
                Chile · Latinoamérica · Resto del mundo
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]">
              <div
                className="pointer-events-none absolute -inset-4 rounded-[40px] bg-gradient-to-br from-emerald-400/30 via-slate-100 to-slate-900/5 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative rounded-[26px] border border-white/60 bg-white/80 p-3 shadow-xl backdrop-blur">
                <div className="rounded-[22px] border border-slate-100 bg-slate-900/5 p-2">
                  <Image
                    src="/screens/home.jpg"
                    alt="Pantalla principal de Teilen mostrando saldos y grupos"
                    width={900}
                    height={1800}
                    priority={false}
                    className="h-auto w-full rounded-[16px] border border-black/5 object-cover shadow-[0_18px_35px_rgba(15,23,42,0.25)]"
                  />
                </div>

                <a
                  href={UNIVERSAL_DOWNLOAD_URL}
                  className="absolute -bottom-12 right-0 hidden w-40 flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white/95 p-3 text-center text-xs font-medium text-slate-700 shadow-xl transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-2xl md:flex"
                >
                  <Image
                    src="/qr-download.png"
                    alt="QR para descargar Teilen"
                    width={120}
                    height={120}
                    className="h-24 w-24 rounded-xl border border-slate-100 bg-white p-2"
                  />
                  <span className="uppercase tracking-[0.25em] text-emerald-600">
                    Descarga aqui
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
