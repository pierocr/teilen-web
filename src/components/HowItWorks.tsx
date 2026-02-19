"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

export function HowItWorks() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);

  return (
    <section
      id="how"
      className="relative mx-auto max-w-6xl px-5 py-20 space-y-12 md:py-24 fhd:py-28"
    >
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
          {home.howItWorks.badge}
        </span>
        <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl fhd:text-6xl">
          {home.howItWorks.title}
        </h2>
        <p className="mt-4 text-lg text-slate-600 fhd:text-xl">
          {home.howItWorks.description}
        </p>
      </div>

      {home.howItWorks.steps.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className={`relative overflow-hidden rounded-[30px] border border-slate-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:flex md:items-center md:gap-10 md:p-8 fhd:gap-12 ${
            i % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="absolute left-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 md:left-6 md:top-6">
            {i + 1}
          </div>

          <div className="w-full pt-10 md:w-1/2 md:pt-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/60 shadow-xl">
              <Image
                src={s.img}
                alt={s.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-slate-900 md:text-3xl fhd:text-4xl">
              {s.title}
            </h3>
            <p className="mt-4 text-lg text-slate-600 fhd:text-xl">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
