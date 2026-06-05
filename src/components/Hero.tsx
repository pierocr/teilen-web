"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef } from "react";
import { Navbar } from "./Navbar";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

const HERO_SCREEN = "/appPrincipal.webp";

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";

const HERO_BULLETS = [
  "Saldos claros en tiempo real",
  "Gastos personales y compartidos",
  "Recordatorios y metas de ahorro",
];

const HERO_STATS = [
  { value: "iOS + Android", label: "Disponible para todos tus grupos" },
  { value: "160+", label: "Monedas para viajes y compras" },
  { value: "Premium", label: "IA, reportes y grupos ilimitados" },
];

const BALANCE_ITEMS = [
  { name: "Casa Las Condes", detail: "Servicios y supermercado", amount: "$42.800", tone: "emerald" },
  { name: "Viaje al sur", detail: "Alojamiento y bencina", amount: "$18.450", tone: "sky" },
  { name: "Meta: vacaciones", detail: "Progreso mensual", amount: "68%", tone: "amber" },
];

export function Hero() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);

  const overlayStyle = useMemo(
    () => ({
      background: `
        radial-gradient(900px 520px at 14% 10%, rgba(6,95,70,0.34), transparent 58%),
        radial-gradient(700px 420px at 86% 16%, rgba(20,184,166,0.16), transparent 62%),
        linear-gradient(145deg, #041011 0%, #07191c 48%, #0b2425 100%)
      `,
    }),
    []
  );

  return (
    <section className="relative overflow-hidden bg-slate-950 sm:min-h-[82vh]">
      <Navbar />

      <div className="absolute inset-0" style={overlayStyle} />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0%,transparent_30%,rgba(16,185,129,0.08)_100%)]" />
      <div className="pointer-events-none absolute -left-28 top-28 h-72 w-72 rounded-full bg-emerald-400/18 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-4 h-80 w-80 rounded-full bg-teal-300/14 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-9 px-5 pb-12 pt-24 sm:gap-10 sm:pb-16 sm:pt-28 md:pt-32 lg:grid-cols-[0.98fr_1.02fr] lg:gap-14 lg:pb-20">
        <div className="relative z-20 mx-auto w-full max-w-[680px] lg:mx-0">
          <span
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-300/35 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100 shadow-[0_12px_38px_rgba(0,0,0,0.16)] backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.24em]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.95)]" />
            {home.hero.badge}
          </span>

          <h1
            className="animate-hero-in mt-5 max-w-3xl text-[2.85rem] font-extrabold leading-[0.98] tracking-tight text-white min-[390px]:text-5xl sm:mt-6 md:text-6xl lg:text-[4.45rem] fhd:text-7xl"
          >
            {home.hero.title}
          </h1>

          <p
            style={{ animationDelay: "90ms" }}
            className="animate-hero-in mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 md:text-xl md:leading-9"
          >
            {home.hero.description}
          </p>

          <ul
            style={{ animationDelay: "140ms" }}
            className="animate-hero-in mt-6 flex max-w-2xl flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white/82"
          >
            {HERO_BULLETS.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-300/18 text-emerald-100 ring-1 ring-emerald-200/25">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M7.8 13.4 4.4 10l1.1-1.1 2.3 2.3 6.7-6.7 1.1 1.1-7.8 7.8Z" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div style={{ animationDelay: "180ms" }} className="animate-hero-in mt-8">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={APP_STORE_URL}
              aria-label={home.stores.appStoreAria}
              className="inline-flex overflow-hidden rounded-2xl border border-white/40 bg-white/14 p-1.5 shadow-[0_18px_42px_rgba(0,0,0,0.28)] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white/18"
              rel="noopener"
            >
              <Image
                src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                alt={home.stores.appStoreAlt}
                width={174}
                height={58}
                className="h-[54px] w-[162px] sm:h-[62px] sm:w-[186px]"
              />
            </a>
            <a
              href={PLAY_STORE_URL}
              aria-label={home.stores.googlePlayAria}
              className="inline-flex overflow-hidden rounded-2xl border border-white/40 bg-white/14 p-1.5 shadow-[0_18px_42px_rgba(0,0,0,0.28)] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white/18"
              rel="noopener"
            >
              <Image
                src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                alt={home.stores.googlePlayAlt}
                width={196}
                height={58}
                className="h-[54px] w-[182px] sm:h-[62px] sm:w-[210px]"
              />
            </a>
            <a
              href="#how"
              className="inline-flex min-h-[54px] items-center justify-center rounded-2xl border border-white/18 bg-white/8 px-5 py-3 text-sm font-semibold text-white/82 shadow-[0_18px_42px_rgba(0,0,0,0.18)] backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-200/55 hover:bg-white/12 hover:text-white"
            >
              {home.hero.demoButton}
            </a>
            </div>
          </div>

          <p
            style={{ animationDelay: "260ms" }}
            className="animate-hero-in mt-5 text-[10px] uppercase tracking-[0.2em] text-white/66 sm:mt-6 sm:text-[11px] sm:tracking-[0.35em]"
          >
            {home.hero.availability}
          </p>

          <div
            style={{ animationDelay: "310ms" }}
            className="animate-hero-in mt-7 grid max-w-2xl gap-3 border-t border-white/12 pt-5 sm:grid-cols-3"
          >
            {HERO_STATS.map((item) => (
              <div key={item.value}>
                <p className="text-sm font-bold text-white sm:text-base">{item.value}</p>
                <p className="mt-1 text-xs leading-5 text-white/55">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <ProductShowcase />
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <div className="relative z-10 mx-auto hidden w-full max-w-[570px] sm:block lg:justify-self-end">
      <div className="absolute -left-6 top-16 z-20 w-[235px] rounded-[26px] border border-white/16 bg-white/12 p-4 text-white shadow-[0_26px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:-left-10 md:w-[270px]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100/70">Resumen</p>
            <p className="mt-1 text-2xl font-extrabold">$128.940</p>
          </div>
          <span className="rounded-full border border-emerald-300/25 bg-emerald-300/14 px-3 py-1 text-xs font-bold text-emerald-100">
            al día
          </span>
        </div>
        <div className="mt-4 space-y-2.5">
          {BALANCE_ITEMS.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
              <div className="flex items-center gap-3">
                <span
                  className={`h-9 w-9 rounded-full ${
                    item.tone === "emerald"
                      ? "bg-emerald-300/20 text-emerald-100"
                      : item.tone === "sky"
                      ? "bg-sky-300/18 text-sky-100"
                      : "bg-amber-300/18 text-amber-100"
                  } flex items-center justify-center text-xs font-black`}
                >
                  {item.name.slice(0, 1)}
                </span>
                <div>
                  <p className="text-xs font-bold">{item.name}</p>
                  <p className="text-[11px] text-white/52">{item.detail}</p>
                </div>
              </div>
              <p className="text-xs font-extrabold">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      <PhoneShowcase className="relative z-10 ml-auto lg:mr-8" />

      <div className="absolute -bottom-2 right-0 z-20 w-[255px] rounded-[24px] border border-white/16 bg-slate-950/78 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl md:right-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">Próxima cuenta</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold">Internet hogar</p>
            <p className="mt-1 text-xs text-white/52">Vence en 3 días</p>
          </div>
          <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-emerald-950">$29.990</span>
        </div>
      </div>
    </div>
  );
}

function PhoneShowcase({
  className = "",
}: {
  className?: string;
}) {
  const phoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      phoneRef.current?.style.setProperty("--phone-rx", `${y * -8}deg`);
      phoneRef.current?.style.setProperty("--phone-ry", `${x * 10}deg`);
      phoneRef.current?.style.setProperty("--phone-tx", `${x * 20}px`);
      phoneRef.current?.style.setProperty("--phone-ty", `${y * -16}px`);
    };
    const onLeave = () => {
      phoneRef.current?.style.setProperty("--phone-rx", "0deg");
      phoneRef.current?.style.setProperty("--phone-ry", "0deg");
      phoneRef.current?.style.setProperty("--phone-tx", "0px");
      phoneRef.current?.style.setProperty("--phone-ty", "0px");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className={`animate-hero-in relative mx-auto w-full max-w-[430px] ${className}`}
      style={{ animationDelay: "150ms" }}
    >
      <div
        ref={phoneRef}
        className="phone-hero-parallax relative mx-auto aspect-[9/19.5] w-[210px] max-w-[66vw] rounded-[2.25rem] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-2 shadow-[0_32px_80px_rgba(2,6,23,0.58)] sm:w-[240px] sm:max-w-[72vw] sm:rounded-[2.45rem] sm:p-[9px] md:w-[260px] md:max-w-[78vw] md:rounded-[2.65rem] md:shadow-[0_48px_110px_rgba(2,6,23,0.68)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] border border-white/20 sm:rounded-[2.6rem] md:rounded-[2.8rem]" />
        <div className="pointer-events-none absolute -right-4 top-8 h-[58%] w-8 rounded-full bg-emerald-400/18 blur-2xl" />
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-4 w-[44%] -translate-x-1/2 rounded-b-2xl bg-black/95 sm:top-2.5 sm:h-5" />
        <div className="pointer-events-none absolute -right-[3px] top-[32%] h-16 w-[4px] rounded-full bg-slate-800" />
        <div className="pointer-events-none absolute -left-[3px] top-[24%] h-10 w-[4px] rounded-full bg-slate-800" />
        <div className="pointer-events-none absolute -left-[3px] top-[34%] h-10 w-[4px] rounded-full bg-slate-800" />

        <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] border border-white/8 bg-black sm:rounded-[2rem] md:rounded-[2.2rem]">
          <Image
            src={HERO_SCREEN}
            alt="Pantalla real de la app Teilen"
            fill
            priority
            sizes="(max-width: 1024px) 78vw, 260px"
            className="object-cover object-top"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0)_35%,rgba(2,6,23,0.3)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_22%,rgba(255,255,255,0)_46%)]" />
        </div>
      </div>
    </div>
  );
}
