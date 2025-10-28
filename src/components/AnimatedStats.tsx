// AnimatedStats.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";


type Card = {
  title: string;
  currency: string;
  balance: string;
  img: string; // ruta en /public
  chipLabel: string;
  chipRight: string;
  chipSub: string;
  emoji?: string;
};

const CARDS: Card[] = [
  {
    title: "Gastos mensuales",
    currency: "CLP",
    balance: "$7.126",
    img: "/demo/card-1.jpg",
    chipLabel: "Pizza en Ñuñoa",
    chipRight: "−$5490",
    chipSub: "Ayer, 09:02",
    emoji: "🍕",
  },
  {
    title: "Vacaciones",
    currency: "CLP",
    balance: "$600.000",
    img: "/demo/card-2.jpg",
    chipLabel: "Vuelo",
    chipRight: "+$1.200.000",
    chipSub: "Hoy, 11:28",
    emoji: "✈️",
  },
  {
    title: "Junta de amigas",
    currency: "CLP",
    balance: "$7.350",
    img: "/demo/card-3.jpg",
    chipLabel: "Cafeteria Providencia",
    chipRight: "−$25.000",
    chipSub: "Vie, 16:45",
    emoji: "☕",
  },
];

export default function AnimatedStats() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 md:px-6 fhd:px-8">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl fhd:text-6xl font-bold tracking-tight text-gray-900">
          Tu dinero compartido, reinventado
        </h2>
        <p className="mt-3 text-gray-600 md:text-lg fhd:text-xl">
          Organiza grupos, divide gastos y mira cómo todo se liquida sin fricción. 
          Esto es Teilen: simple, transparente y pensado para tu día a día.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-white font-medium shadow-sm"
            style={{ backgroundColor: "#019a57" }}
          >
            Descarga la app
          </a>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-6 fhd:gap-8 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="group relative overflow-hidden rounded-3xl bg-black/5 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.25)]"
          >
            {/* Imagen (escala extra al hover) */}
            <div className="relative h-[420px] fhd:h-[460px]">
              {/* fallback si no pones imágenes reales */}
              <div className="absolute inset-0 bg-neutral-200" />
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={i === 1}
              />
              {/* Gradiente inferior para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            </div>

            {/* Contenido sobre la imagen */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
              {/* Top-left tag */}
              <div>
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {c.title}
                </span>
              </div>

              {/* Saldo + CTA */}
{/*               <div className="text-white">
                <div className="text-4xl md:text-5xl font-semibold drop-shadow">
                  {c.balance}
                </div>
                <div className="mt-3">
                  <span className="pointer-events-auto inline-flex select-none items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow transition-transform group-hover:scale-[1.03]">
                    Cuentas
                  </span>
                </div>
              </div> */}

              {/* Ficha movimiento (abajo) */}
              <div className="pointer-events-auto">
                <div className="mx-auto w-full max-w-[90%] rounded-2xl bg-white p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#019a57]/10">
                      <span className="text-base">{c.emoji ?? "🧾"}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {c.chipLabel}
                      </p>
                      <p className="truncate text-xs text-gray-500">{c.chipSub}</p>
                    </div>
                    <div className="shrink-0 text-sm font-semibold text-gray-900">
                      {c.chipRight}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Borde suave al pasar el mouse */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/10 group-hover:ring-black/20" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
