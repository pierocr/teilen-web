// AnimatedStats.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

export default function AnimatedStats() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);

  return (
    <section className="relative mx-auto max-w-6xl px-5">
      <div className="relative overflow-hidden rounded-[34px] border border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/35 to-teal-50/55 px-6 py-14 shadow-[0_30px_90px_rgba(15,23,42,0.12)] md:px-10 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_220px_at_12%_0%,rgba(1,154,87,0.13),transparent_60%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
            {home.animatedStats.badge}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-5xl fhd:text-6xl">
            {home.animatedStats.title}
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg fhd:text-xl">
            {home.animatedStats.description}
          </p>
        </div>

        <div className="relative mt-10 grid gap-6 md:grid-cols-3 fhd:gap-8">
          {home.animatedStats.cards.map((c, i) => (
            <motion.article
              key={c.title + i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-slate-900/5 shadow-[0_20px_45px_rgba(15,23,42,0.16)]"
            >
              <div className="relative h-[390px] fhd:h-[430px]">
                <div className="absolute inset-0 bg-neutral-200" />
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={i === 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-5">
                <div>
                  <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    {c.title}
                  </span>
                </div>

                <div className="pointer-events-auto">
                  <div className="mx-auto w-full max-w-[92%] rounded-2xl border border-white/70 bg-white p-3 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#019a57]/10">
                        <span className="text-base">{c.emoji ?? "🧾"}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{c.chipLabel}</p>
                        <p className="truncate text-xs text-gray-500">{c.chipSub}</p>
                      </div>
                      <div className="shrink-0 text-sm font-semibold text-gray-900">{c.chipRight}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/10 group-hover:ring-black/20" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
