"use client";
import { motion } from "framer-motion";

const steps = [
  { t: "Crea tu grupo", d: "Invita a tus amigos y define reglas de división.", emoji: "👥" },
  { t: "Agrega gastos", d: "Escanea la boleta con IA o ingrésalos manualmente.", emoji: "🧾" },
  { t: "Liquida en un toque", d: "Paga lo justo y recibe lo que te deben.", emoji: "💸" },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-5 py-24">
      {/* Encabezado fijo (sticky) sin animación de parallax */}
      <div
        className="
          sticky top-20 md:top-24 z-20
          -mx-5 px-5 pb-6
          bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70
        "
      >
        <h2 className="text-3xl md:text-5xl font-bold">¿Cómo funciona?</h2>
        <p className="mt-3 max-w-2xl text-black/70">
          Todo lo que necesitas para dividir sin drama — simple, rápido y transparente.
        </p>
      </div>

      {/* Tarjetas */}
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-3xl border border-black/10 p-6 md:p-7 bg-white shadow-soft"
          >
            <div className="h-11 w-11 grid place-content-center rounded-2xl bg-[#019a57] text-white text-xl">
              {s.emoji}
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
            <p className="mt-2 text-black/70">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
