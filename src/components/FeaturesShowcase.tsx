"use client";

import { useEffect, useRef, useState } from "react";

type Feature = {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  pill?: string;
};

const FEATURES: Feature[] = [
  {
    id: "scan",
    title: "Escáner de boletas con IA",
    desc: "Detecta ítems, impuestos y propinas. Divide en segundos.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2M7 8h10M7 12h10M7 16h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    pill: "Nuevo · IA"
  },
  {
    id: "pay",
    title: "Pagos simples",
    desc: "Enlaza tu método favorito y liquida al instante.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M3 7h18v10H3zM3 10h18M7 15h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    pill: "MP · Transferencias"
  },
  {
    id: "rules",
    title: "Grupos & reglas",
    desc: "Crea grupos, define porcentajes y lleva el historial.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 7a3 3 0 110-6 3 3 0 010 6zM4 22a4 4 0 014-4h8a4 4 0 014 4M3 10h6M15 10h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    id: "audit",
    title: "Auditoría en tiempo real",
    desc: "Transparencia total del quién-pagó-qué y cuándo.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M3 12l6 6L21 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    pill: "Anti-drama"
  },
  {
    id: "multi",
    title: "Multi-moneda",
    desc: "Soporte UF/CLP y conversión inteligente.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 3v18M4 8h8M4 16h8M12 8h8M12 16h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export default function FeaturesShowcase() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="caracteristicas"
      ref={rootRef}
      className="relative mx-auto max-w-7xl px-5 py-24 sm:py-28 fhd:py-32"
    >
      {/* aurora background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora-gradient absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 blur-[50px] opacity-60" />
      </div>

      {/* Headline */}
      <div className="mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur md:text-sm dark:border-white/10 dark:bg-white/5">
          ✨ Características
          <span className="ml-1 hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:text-emerald-300 sm:inline">
            estilo Teilen
          </span>
        </div>
        <h2 className="mt-4 text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl fhd:text-6xl">
          Potentes, pero fáciles.
          <span className="block text-muted-foreground mt-3 text-lg font-normal sm:text-xl fhd:text-2xl">
            Todo lo que de verdad usa la gente.
          </span>
        </h2>
      </div>

      {/* Layout */}
      <div className="grid items-start gap-10 fhd:gap-12 lg:grid-cols-2">
        {/* Left: sticky phone/video */}
        <div className="relative lg:sticky lg:top-28">
          <div className="phone-frame group mx-auto w-[200px] sm:w-[240px] md:w-[280px] fhd:w-[320px]">
            {/* Reemplaza src por tu archivo en /public o /app */}
            {/* Coloca el mp4 en public/videos/teilen-demo.mp4 */}
            <video
              className="phone-screen"
              src="/videos/teilen-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* brillo sobre la pantalla */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] ring-1 ring-black/10 shadow-2xl" />
          </div>

          {/* People/photo background hint */}
          {/* <div className="absolute -right-6 -top-10 -z-10 hidden aspect-[16/10] w-[520px] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-200/30 to-emerald-500/10 shadow-xl saturate-150 backdrop-blur-sm lg:block">
            <img
              src="/images/people-sharing.jpg"
              alt=""
              className="h-full w-full object-cover opacity-70"
            />
          </div> */}
        </div>

        {/* Right: features list */}
        <ul
          className={`grid gap-4 sm:gap-6 fhd:gap-7`}
            data-inview={inView ? "true" : "false"}
        >
          {FEATURES.map((f, i) => (
            <li
              key={f.id}
              style={{ viewTransitionName: `feat-${f.id}` }}
              className="group relative"
            >
              <div
                className="card-3d overflow-hidden rounded-3xl border border-black/10 bg-white/80 p-5 shadow-xl backdrop-blur transition-all duration-500
                           dark:border-white/10 dark:bg-white/5"
                style={{
                  transitionDelay: `${i * 70}ms`
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="feature-icon">
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {f.title}
                      </h3>
                      {f.pill && (
                        <span className="badge">{f.pill}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>

                {/* glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-10 animate-pulse-slow bg-[conic-gradient(var(--tw-gradient-stops))] from-emerald-300/20 via-teal-400/10 to-emerald-300/20" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
