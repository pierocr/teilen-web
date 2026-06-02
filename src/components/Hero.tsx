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
  "Gastos grupales y personales",
  "Recordatorios y pagos recurrentes",
  "Metas de ahorro",
  "Disponible en iOS y Android",
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
    <section className="relative overflow-hidden sm:min-h-[76vh]">
      <Navbar />

      <div className="absolute inset-0" style={overlayStyle} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black/10" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-7 px-5 pb-7 pt-20 sm:gap-10 sm:pb-6 sm:pt-22 md:pt-26 md:pb-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pb-10">
        <div className="relative z-20 mx-auto w-full max-w-[680px] lg:mx-0">
          <span
            className="inline-flex max-w-full items-center rounded-full border border-emerald-300/40 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-100 backdrop-blur sm:px-4 sm:text-[11px] sm:tracking-[0.24em]"
          >
            {home.hero.badge}
          </span>

          <h1
            className="animate-hero-in mt-4 max-w-3xl text-[2.45rem] font-extrabold leading-[1.06] tracking-tight text-white min-[390px]:text-5xl sm:mt-5 md:text-6xl lg:text-[4rem] fhd:text-7xl"
          >
            Teilen App: divide gastos, organiza cuentas y alcanza tus metas
          </h1>

          <p
            style={{ animationDelay: "90ms" }}
            className="animate-hero-in mt-4 max-w-2xl text-base leading-7 text-white/78 sm:mt-5 md:text-lg md:leading-8 fhd:text-xl"
          >
            {home.hero.description}
          </p>

          <ul
            style={{ animationDelay: "140ms" }}
            className="animate-hero-in mt-5 grid max-w-2xl grid-cols-1 gap-2 text-sm text-white/82 sm:grid-cols-2"
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

          <div
            style={{ animationDelay: "180ms" }}
            className="animate-hero-in mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3 fhd:gap-4"
          >
            <a
              href={APP_STORE_URL}
              aria-label={home.stores.appStoreAria}
              className="inline-flex overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-1 shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-200"
              rel="noopener"
            >
              <Image
                src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                alt={home.stores.appStoreAlt}
                width={174}
                height={58}
                className="h-[48px] w-[144px] sm:h-[58px] sm:w-[174px]"
              />
            </a>
            <a
              href={PLAY_STORE_URL}
              aria-label={home.stores.googlePlayAria}
              className="inline-flex overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-1 shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-200"
              rel="noopener"
            >
              <Image
                src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                alt={home.stores.googlePlayAlt}
                width={196}
                height={58}
                className="h-[48px] w-[162px] sm:h-[58px] sm:w-[196px]"
              />
            </a>
            <a
              href="#how"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white/15 sm:px-5 sm:py-3 sm:text-sm"
            >
              Ver cómo funciona
            </a>
          </div>

          <p
            style={{ animationDelay: "260ms" }}
            className="animate-hero-in mt-4 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:mt-6 sm:text-[11px] sm:tracking-[0.35em]"
          >
            {home.hero.availability}
          </p>
        </div>

        <PhoneShowcase className="hidden sm:block sm:mt-2 lg:mt-0 lg:justify-self-end" />
      </div>
    </section>
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
