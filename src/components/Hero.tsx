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
  { emoji: "🍽️", nombre: "Restaurante", fecha: "Hoy, 12:40", amount: -58490 },
  { emoji: "🛒", nombre: "Supermercado", fecha: "Ayer, 19:05", amount: -129990 },
  { emoji: "🏢", nombre: "Gastos comunes", fecha: "Lun, 09:10", amount: -95000 },
  { emoji: "💰", nombre: "Reembolso grupo", fecha: "Dom, 18:22", amount: +45000 },
];

const formatoCLP = (v: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(v);

export function Hero() {
  const [open, setOpen] = useState(false);

  const saldoBase = 300000;
  const totalTx = useMemo<number>(() => txs.reduce((acc, t) => acc + t.amount, 0), []);
  const saldo = saldoBase + totalTx;

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
        src="/hero.jpg"
        alt="Personas compartiendo una comida mientras coordinan gastos con Teilen en sus teléfonos"
        width={2400}
        height={1400}
        priority
        className="absolute inset-0 h-full w-full object-cover object-center"
        onError={handleImageError}
      />

      <div className="absolute inset-0" style={overlayStyle} />

      <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-24 md:pt-36 md:pb-40">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow"
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
          className="mt-5 max-w-2xl text-lg md:text-xl text-white/80"
        >
          La cuenta ya no es un problema. Organiza, divide y paga sin complicaciones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={() => setOpen(true)}
            className="btn-shine rounded-xl px-5 py-3 shadow"
            style={{ backgroundColor: "#019a57", color: "white" }}
          >
            Descargar la app
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-14 w-full max-w-xl rounded-3xl p-6 shadow-soft"
          style={{
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(22px)",
            background: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(255,255,255,0.45)",
          }}
        >
          <div className="text-sm text-black/60">Cuenta • Personal</div>
          <div className="mt-2 text-5xl font-semibold">{formatoCLP(saldo)}</div>

          <div className="mt-5 space-y-3">
            {txs.map((t, idx) => (
              <GastoRow key={idx} {...t} />
            ))}
          </div>
        </motion.div>
      </div>

      <DownloadModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

function GastoRow({ emoji, nombre, fecha, amount }: Tx) {
  const esPositivo = amount > 0;
  const color = esPositivo ? "#019a57" : "#ef4444";
  const signo = esPositivo ? "+ " : "- ";
  const valorAbs = Math.abs(amount);

  return (
    <div className="rounded-2xl bg-white/95 px-4 py-3 flex items-center justify-between shadow border border-black/5">
      <div className="flex items-center gap-3">
        <div className="text-xl" aria-hidden>
          {emoji}
        </div>
        <div>
          <div className="font-medium leading-none">{nombre}</div>
          <div className="text-xs text-black/60">{fecha}</div>
        </div>
      </div>
      <div className="font-semibold" style={{ color }}>
        {signo}
        {formatoCLP(valorAbs)}
      </div>
    </div>
  );
}
