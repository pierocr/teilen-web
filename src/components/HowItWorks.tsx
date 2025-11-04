"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    title: "Crea tu grupo",
    desc: "Invita a tus amigos o familiares a unirse a tu grupo mediante un enlace o código QR.",
    img: "/images/how-group.png",
  },
  {
    title: "Agrega tus gastos",
    desc: "Elige quién pagó y divídelo de distintas formas: igual, porcentual o personalizada.",
    img: "/images/how-scan.png",
  },
  {
    title: "Notificación de todos tus gastos",
    desc: "Cada vez que realices un gasto, todos los miembros del grupo serán notificados al instante.",
    img: "/images/how-pay.png",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative mx-auto max-w-6xl px-5 py-24 fhd:py-28 space-y-20 fhd:space-y-24"
    >
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl fhd:text-6xl font-bold text-gray-900">
          ¿Cómo funciona?
        </h2>
        <p className="mt-4 text-gray-600 text-lg fhd:text-xl">
          Todo lo que necesitas para dividir sin complicaciones.
        </p>
      </div>

      {steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`flex flex-col md:flex-row items-center gap-10 fhd:gap-12 ${
            i % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Imagen */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl md:text-3xl fhd:text-4xl font-semibold text-gray-900">
              {s.title}
            </h3>
            <p className="mt-4 text-gray-600 text-lg fhd:text-xl">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
