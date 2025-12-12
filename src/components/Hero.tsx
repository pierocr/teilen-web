"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { DownloadModal } from "./DownloadModal";

const BRAND_TINT = 0.32;
const DARK_VIGNETTE = 0.40;

type Tx = {
  emoji: string;
  nombre: string;
  fecha: string;
  amount: number; // CLP. Positivo = abono, negativo = gasto
};

const txs: Tx[] = [
  { emoji: "💼", nombre: "Pago cliente", fecha: "Hoy, 09:10", amount: +280000 },
  { emoji: "💳", nombre: "Transferencia roomie", fecha: "Hoy, 08:20", amount: +120000 },
  { emoji: "🍽️", nombre: "Restaurante", fecha: "Hoy, 12:40", amount: -58490 },
  { emoji: "🛒", nombre: "Supermercado", fecha: "Ayer, 19:05", amount: -129990 },
  { emoji: "🏢", nombre: "Gastos comunes", fecha: "Lun, 09:10", amount: -95000 },
  { emoji: "💰", nombre: "Reembolso grupo", fecha: "Dom, 18:22", amount: +45000 },
  { emoji: "🚗", nombre: "Carsharing", fecha: "Dom, 17:30", amount: -42000 },
  { emoji: "🎟️", nombre: "Entradas concierto", fecha: "Sáb, 21:30", amount: -68000 },
];

const CARD_BASE_BALANCE = 1175880;
const BALANCE_LIMIT = 10_000_000;
const INITIAL_BALANCE = CARD_BASE_BALANCE + txs[0].amount;

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";

const formatoCLP = (v: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(v);

export function Hero() {
  const [open, setOpen] = useState(false);

  const overlayStyle = useMemo(
    () => ({
      background: `
        radial-gradient(1100px 600px at 12% 15%, rgba(1,154,87,${BRAND_TINT}), transparent 25%),
        linear-gradient(180deg, rgba(0,0,0,${DARK_VIGNETTE}) 0%, rgba(0,0,0,0.18) 40%, rgba(255,255,255,0) 68%),
        linear-gradient(180deg, rgba(255,255,255,0) 70%, rgba(255,255,255,0.85) 100%)
      `,
    }),
    []
  );

  /** Palabra animada del título */
  const words: string[] = useMemo(() => ["divides", "compartes", "administras"], []);
  const [wIndex, setWIndex] = useState<number>(0);
  const prefersReduce = useReducedMotion();

  // Reserva de ancho: palabra más larga (deps correctas)
  const longest = useMemo<string>(
    () => words.reduce((a, b) => (a.length > b.length ? a : b)),
    [words]
  );

  // Rotación de palabras (deps correctas)
  const timerRef = useRef<number | null>(null);
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = "none";
  };

  return (
    <section className="relative overflow-hidden">
      <Navbar />

      <Image
        src="/hero.webp"
        alt="Personas compartiendo una comida mientras coordinan gastos con Teilen en sus teléfonos"
        width={2400}
        height={1400}
        priority
        quality={85}
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
        onError={handleImageError}
      />

      <div className="absolute inset-0" style={overlayStyle} />

      <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-24 md:pt-36 md:pb-40">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl fhd:text-8xl font-extrabold leading-tight tracking-tight text-white drop-shadow"
        >
          <span className="md:whitespace-nowrap">Cambia la forma en que </span>

          <span className="relative inline-block align-baseline whitespace-nowrap">
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
                  style={{ color: "#00D084" }}
                >
                  {words[wIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>

          <br className="hidden md:block" />
          <span className="md:leading-tight">&nbsp;tus gastos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-2xl fhd:max-w-3xl text-lg md:text-xl fhd:text-2xl text-white/80"
        >
          Mantén tus cuentas claras y tus momentos compartidos aún mejores. Divide y registra tus gastos en segundos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 fhd:mt-10 flex flex-wrap items-center gap-3 fhd:gap-4"
        >
          <a
            href={APP_STORE_URL}
            aria-label="Descargar Teilen en App Store"
            className="inline-flex overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-1 shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-200"
            rel="noopener"
          >
            <Image
              src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
              alt="Disponible en App Store"
              width={180}
              height={48}
              className="h-12 w-[180px]"
            />
          </a>
          <a
            href={PLAY_STORE_URL}
            aria-label="Descargar Teilen en Google Play"
            className="inline-flex overflow-hidden rounded-2xl border border-white/30 bg-white/10 p-1 shadow-lg transition hover:-translate-y-0.5 hover:border-emerald-200"
            rel="noopener"
          >
            <Image
              src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
              alt="Disponible en Google Play"
              width={194}
              height={58}
              className="h-[58px] w-[194px]"
            />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Ver experiencia teilen
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 text-[11px] uppercase tracking-[0.35em] text-white/70"
        >
          Disponible en Chile y el mundo
        </motion.p>

        <div className="mt-14">
          <AnimatedTxCard />
        </div>
      </div>

      <DownloadModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function AnimatedTxCard() {
  const reduceMotion = useReducedMotion();
  const [state, setState] = useState({ pointer: 0, balance: INITIAL_BALANCE });
  const pointer = state.pointer;
  const balance = state.balance;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setState((prev) => {
        const nextPointer = (prev.pointer + 1) % txs.length;
        const nextBalance = prev.balance + txs[nextPointer].amount;
        if (Math.abs(nextBalance) > BALANCE_LIMIT) {
          return { pointer: 0, balance: INITIAL_BALANCE };
        }
        return { pointer: nextPointer, balance: nextBalance };
      });
    }, 2400);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const orderedTxs = useMemo(() => {
    if (reduceMotion) return txs;
    return Array.from({ length: txs.length }, (_, idx) => txs[(pointer + idx) % txs.length]);
  }, [pointer, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mx-auto w-full max-w-md rounded-[36px] border border-white/30 bg-white/85 px-6 py-6 text-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.45)] backdrop-blur lg:mx-0 lg:max-w-xl"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(228,242,238,0.9) 70%)",
      }}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Cuenta · Personal</p>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={`${pointer}-${balance}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-2 text-5xl font-semibold"
        >
          {formatoCLP(balance)}
        </motion.p>
      </AnimatePresence>

      <motion.ul layout className="mt-6 space-y-3.5">
        {orderedTxs.slice(0, 4).map((item, idx) => {
          const esPositivo = item.amount > 0;
          const color = esPositivo ? "#019a57" : "#ef4444";
          const signo = esPositivo ? "+ " : "- ";
          const valorAbs = Math.abs(item.amount);
          const isActive = idx === 0 && !reduceMotion;

          return (
            <motion.li
              key={`${item.nombre}-${idx}`}
              layout
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className={`flex items-center justify-between rounded-[20px] border border-white/60 px-4 py-3 shadow-sm backdrop-blur ${
                isActive ? "bg-white/95" : "bg-white/85"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl" aria-hidden>
                  {item.emoji}
                </div>
                <div>
                  <p className="text-base font-semibold leading-none">{item.nombre}</p>
                  <p className="text-[11px] text-slate-500">{item.fecha}</p>
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`${item.nombre}-${pointer}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-base font-semibold"
                  style={{ color }}
                >
                  {signo}
                  {formatoCLP(valorAbs)}
                </motion.span>
              </AnimatePresence>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.div>
  );
}
