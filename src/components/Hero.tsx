"use client";

import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { DownloadModal } from "./DownloadModal";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

const HERO_SCREEN = "/screens/home.jpg";

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";

export function Hero() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const [open, setOpen] = useState(false);
  const prefersReduce = useReducedMotion();
  const timerRef = useRef<number | null>(null);

  const overlayStyle = useMemo(
    () => ({
      background: `
        radial-gradient(900px 520px at 12% 8%, rgba(6,182,120,0.28), transparent 55%),
        radial-gradient(680px 420px at 88% 18%, rgba(5,150,105,0.22), transparent 58%),
        linear-gradient(145deg, #041012 0%, #0a2228 44%, #0e2f35 100%)
      `,
    }),
    []
  );

  const words: string[] = useMemo(() => home.hero.words, [home.hero.words]);
  const [wIndex, setWIndex] = useState<number>(0);

  const longest = useMemo<string>(
    () => words.reduce((a, b) => (a.length > b.length ? a : b)),
    [words]
  );

  useEffect(() => {
    if (words.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      setWIndex((i) => (i + 1) % words.length);
    }, 2200);

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [words.length]);

  return (
    <section className="relative min-h-[76vh] overflow-hidden">
      <Navbar />

      <div className="absolute inset-0" style={overlayStyle} />
      <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white/8" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-6 pt-22 md:pt-26 md:pb-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pb-10">
        <div className="relative z-20 mx-auto w-full max-w-[680px] lg:mx-0">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center rounded-full border border-emerald-300/40 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-100 backdrop-blur"
          >
            {home.hero.badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-5 text-5xl font-extrabold leading-[1.06] tracking-tight text-white md:text-7xl fhd:text-8xl"
          >
            <span className="md:whitespace-nowrap">{home.hero.titlePrefix}&nbsp;</span>

            <span className="relative inline-block align-baseline whitespace-nowrap text-emerald-300">
              <span className="invisible">{longest}</span>
              <span className="absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[wIndex]}
                    initial={{ opacity: 0, y: prefersReduce ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: prefersReduce ? 0 : -18 }}
                    transition={{ duration: 0.45 }}
                    className="inline-block"
                  >
                    {words[wIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>

            <br className="hidden md:block" />
            <span>&nbsp;{home.hero.titleSuffix}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 max-w-2xl text-lg text-white/82 md:text-xl fhd:text-2xl"
          >
            {home.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center gap-3 fhd:gap-4"
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
                className="h-[58px] w-[174px]"
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
                className="h-[58px] w-[196px]"
              />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5"
            >
              {home.hero.demoButton}
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-[11px] uppercase tracking-[0.35em] text-white/70"
          >
            {home.hero.availability}
          </motion.p>
        </div>

        <PhoneShowcase prefersReduce={prefersReduce} className="mt-2 lg:mt-0 lg:justify-self-end lg:translate-x-6" />
      </div>

      <DownloadModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function PhoneShowcase({
  prefersReduce,
  className = "",
}: {
  prefersReduce: boolean;
  className?: string;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.45 });
  const parallaxRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const parallaxRotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const parallaxShiftX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const parallaxShiftY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  useEffect(() => {
    if (prefersReduce) return;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };
    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [pointerX, pointerY, prefersReduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className={`relative mx-auto w-full max-w-[500px] ${className}`}
    >
      <motion.div
        style={
          prefersReduce
            ? { transformPerspective: 1700 }
            : {
                transformPerspective: 1700,
                rotateX: parallaxRotateX,
                rotateY: parallaxRotateY,
                x: parallaxShiftX,
                y: parallaxShiftY,
              }
        }
        className="relative mx-auto aspect-[9/19.5] w-[290px] max-w-[84vw] rounded-[2.8rem] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-[10px] shadow-[0_60px_140px_rgba(2,6,23,0.75)]"
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.8rem] border border-white/20" />
        <div className="pointer-events-none absolute -right-4 top-8 h-[58%] w-8 rounded-full bg-emerald-400/18 blur-2xl" />
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-5 w-[44%] -translate-x-1/2 rounded-b-2xl bg-black/95" />
        <div className="pointer-events-none absolute -right-[3px] top-[32%] h-16 w-[4px] rounded-full bg-slate-800" />
        <div className="pointer-events-none absolute -left-[3px] top-[24%] h-10 w-[4px] rounded-full bg-slate-800" />
        <div className="pointer-events-none absolute -left-[3px] top-[34%] h-10 w-[4px] rounded-full bg-slate-800" />

        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border border-white/8 bg-black">
          <Image
            src={HERO_SCREEN}
            alt="Pantalla real de la app Teilen"
            fill
            priority
            sizes="(max-width: 1024px) 84vw, 290px"
            className="object-cover object-top"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0)_35%,rgba(2,6,23,0.3)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_22%,rgba(255,255,255,0)_46%)]" />
        </div>
      </motion.div>
    </motion.div>
  );
}
