"use client";
import Image from "next/image";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

export function HowItWorks() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);

  return (
    <section
      id="how"
      className="relative mx-auto max-w-7xl px-5 py-10 space-y-6 sm:py-20 sm:space-y-12 md:py-24 fhd:py-28"
    >
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
          {home.howItWorks.badge}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:mt-5 sm:text-4xl md:text-5xl fhd:text-6xl">
          {home.howItWorks.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-lg fhd:text-xl">
          {home.howItWorks.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {home.howItWorks.steps.map((s, i) => (
          <div
            key={s.title}
            className="relative overflow-hidden rounded-[18px] border border-slate-100 bg-white p-3 shadow-[0_12px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_20px_48px_rgba(15,23,42,0.1)] sm:rounded-[24px] sm:p-4 lg:p-5"
          >
            <div className="absolute left-3 top-3 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-700 sm:left-4 sm:top-4 sm:h-8 sm:w-8 sm:text-sm">
              {i + 1}
            </div>

            <div className="w-full pt-7">
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/60 shadow-lg sm:aspect-[4/3] sm:rounded-2xl sm:shadow-xl lg:aspect-square">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            <div className="w-full pt-3">
              <h3 className="text-base font-semibold leading-tight text-slate-900 sm:text-xl lg:text-lg fhd:text-xl">
                {s.title}
              </h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6 fhd:text-base">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
