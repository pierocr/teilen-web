// AnimatedStats.tsx
"use client";

import Image from "next/image";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

export default function AnimatedStats() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);

  return (
    <section id="experience" className="relative mx-auto max-w-7xl sm:px-5">
      <div className="relative overflow-hidden rounded-[24px] border border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/35 to-teal-50/55 px-5 py-8 shadow-[0_22px_60px_rgba(15,23,42,0.12)] sm:rounded-[34px] sm:px-6 sm:py-14 md:px-10 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_220px_at_12%_0%,rgba(1,154,87,0.13),transparent_60%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
            {home.animatedStats.badge}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:mt-5 sm:text-3xl md:text-5xl fhd:text-6xl">
            {home.animatedStats.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base md:text-lg fhd:text-xl">
            {home.animatedStats.description}
          </p>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 md:grid-cols-3 fhd:gap-8">
          {home.animatedStats.cards.map((c, i) => (
            <article
              key={c.title + i}
              className="group relative overflow-hidden rounded-2xl border border-white/70 bg-slate-900/5 shadow-[0_14px_34px_rgba(15,23,42,0.16)] transition-transform duration-300 hover:-translate-y-1 sm:rounded-3xl sm:shadow-[0_20px_45px_rgba(15,23,42,0.16)]"
            >
              <div className="relative h-[210px] min-[390px]:h-[235px] sm:h-[390px] fhd:h-[430px]">
                <div className="absolute inset-0 bg-neutral-200" />
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
              </div>

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2.5 min-[390px]:p-3 sm:p-5">
                <div>
                  <span className="inline-flex max-w-full items-center rounded-full border border-white/25 bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur sm:px-3 sm:py-1 sm:text-xs">
                    {c.title}
                  </span>
                </div>

                <div className="pointer-events-auto">
                  <div className="mx-auto w-full max-w-full rounded-xl border border-white/70 bg-white p-2 shadow-lg sm:max-w-[92%] sm:rounded-2xl sm:p-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#019a57]/10 sm:h-8 sm:w-8">
                        <span className="text-base">{c.emoji ?? "🧾"}</span>
                      </div>
                      <div className="hidden min-w-0 flex-1 sm:block">
                        <p className="truncate text-xs font-medium text-gray-900 sm:text-sm">{c.chipLabel}</p>
                        <p className="truncate text-[10px] text-gray-500 sm:text-xs">{c.chipSub}</p>
                      </div>
                      <div className="ml-auto shrink-0 text-xs font-semibold text-gray-900 sm:ml-0 sm:text-sm">{c.chipRight}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-black/10 group-hover:ring-black/20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
