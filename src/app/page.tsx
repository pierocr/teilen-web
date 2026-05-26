
"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { StatsLoading } from "@/components/skeletons/StatsLoading";
import { FeaturesLoading } from "@/components/skeletons/FeaturesLoading";
import { HowItWorksLoading } from "@/components/skeletons/HowItWorksLoading";
import { howToSchema } from "@/lib/schema";
import { getHomeMessages } from "@/lib/home-i18n";
import { useLocale } from "@/components/LanguageProvider";

// Code splitting: componentes below-fold se cargan cuando son necesarios
const AnimatedStats = dynamic(() => import("@/components/AnimatedStats"), {
  loading: () => <StatsLoading />,
  ssr: true,
});

const FeaturesShowcase = dynamic(() => import("@/components/FeaturesShowcase"), {
  loading: () => <FeaturesLoading />,
  ssr: true,
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <HowItWorksLoading />,
  ssr: true,
});

const AppScreens = dynamic(() => import("@/components/AppScreens").then(mod => ({ default: mod.AppScreens })), {
  ssr: true,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
});

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";
const UNIVERSAL_DOWNLOAD_URL = "https://www.teilen.cl/api/download";
// TODO: Generate these WebP files from the current JPG screenshots, then replace the values below:
// /screens/home.webp, /screens/grupos.webp, /screens/gasto.webp, /screens/actividad.webp.
const SCREEN_IMAGES = [
  "/screens/home.jpg",
  "/screens/grupos.jpg",
  "/screens/gasto.jpg",
  "/screens/actividad.jpg",
];

export default function Page() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const faqItems = home.page.faq.items;
  const testimonials = home.page.testimonials.items;

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Hero con Navbar overlay */}
      <Hero />

      {/* Cómo funciona */}
      <section id="how" className="scroll-mt-24">
        <Suspense fallback={<HowItWorksLoading />}>
          <HowItWorks />
        </Suspense>

        {/* HowTo Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </section>

      {/* Características */}
      <section id="features" className="scroll-mt-24">
        <Suspense fallback={<FeaturesLoading />}>
          <FeaturesShowcase />
        </Suspense>
      </section>

      {/* Experiencia Teilen */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-20 fhd:py-24">
        <Suspense fallback={<StatsLoading />}>
          <AnimatedStats />
        </Suspense>
      </section>

      {/* Screens de la app: 4 en fila en desktop */}
      <section id="screens" className="scroll-mt-24">
        <AppScreens images={SCREEN_IMAGES} />
      </section>

      {/* FAQ para snippet enriquecido */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-10 sm:py-20 fhd:py-24">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
          {home.page.faq.badge}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:mt-5 sm:text-4xl md:text-5xl fhd:text-6xl">
          {home.page.faq.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7 md:text-lg fhd:text-xl">
          {home.page.faq.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 fhd:gap-8 md:grid-cols-3">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_12px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] sm:rounded-3xl sm:p-6"
            >
              <h3 className="text-sm font-semibold leading-tight text-slate-900 sm:text-lg">{item.question}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">{item.answer}</p>
            </article>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-5 pb-12 sm:pb-24">
        <div className="relative overflow-hidden rounded-[24px] border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/45 to-teal-50 p-5 text-center shadow-[0_22px_60px_rgba(15,23,42,0.12)] sm:rounded-[36px] sm:p-10 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(1,154,87,0.15),_transparent_52%)]"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 shadow-sm sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
              {home.page.cta.badge}
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900 sm:mt-5 sm:text-3xl md:text-4xl">
              {home.page.cta.title}
            </h3>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7 md:text-lg">
              {home.page.cta.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-4">
              <a
                href={APP_STORE_URL}
                aria-label={home.stores.appStoreAria}
                className="inline-flex overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow transition hover:-translate-y-0.5 hover:border-emerald-400"
                rel="noopener"
              >
                <Image
                  src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                  alt={home.stores.appStoreAlt}
                  width={174}
                  height={58}
                  className="h-[48px] w-[144px] sm:h-[58px] sm:w-[174px]"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                aria-label={home.stores.googlePlayAria}
                className="inline-flex overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow transition hover:-translate-y-0.5 hover:border-emerald-400"
                rel="noopener"
              >
                <Image
                  src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                  alt={home.stores.googlePlayAlt}
                  width={196}
                  height={58}
                  className="h-[48px] w-[162px] sm:h-[58px] sm:w-[196px]"
                />
              </a>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-emerald-700/80 sm:text-xs sm:tracking-[0.35em]">
              {home.page.cta.availability}
            </p>
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-emerald-100/80 bg-white/95 px-4 py-4 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md sm:max-w-2xl sm:flex-row sm:items-center sm:gap-5"
            >
              <Image
                src="/qr-download.png"
                alt={home.page.cta.qrAlt}
                width={108}
                height={108}
                className="mx-auto h-20 w-20 flex-shrink-0 rounded-xl border border-emerald-50 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:mx-0 sm:h-24 sm:w-24"
              />
              <div className="space-y-1 text-sm leading-6 text-slate-700 sm:space-y-1.5">
                <p className="text-base font-semibold text-slate-900 sm:text-lg">{home.page.cta.qrTitle}</p>
                <p>{home.page.cta.qrDescription}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 break-all sm:break-normal sm:tracking-[0.35em]">
                  {UNIVERSAL_DOWNLOAD_URL.replace("https://", "")}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="relative mx-auto max-w-6xl px-5 pb-14 pt-4 sm:pb-24 sm:pt-10 fhd:py-28">
        <div
          className="absolute inset-x-10 -top-10 h-40 rounded-full bg-emerald-200/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative rounded-[24px] border border-slate-100 bg-white p-5 shadow-[0_22px_60px_rgba(15,23,42,0.12)] sm:rounded-[34px] sm:p-10 fhd:p-12">
          <div className="flex items-center justify-between gap-4 fhd:gap-6 flex-wrap">
            <div>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
                {home.page.testimonials.badge}
              </span>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:mt-5 sm:text-3xl md:text-4xl fhd:text-5xl">
                {home.page.testimonials.title}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7 md:text-lg fhd:max-w-2xl fhd:text-xl">
                {home.page.testimonials.description}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 fhd:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_55px_rgba(15,23,42,0.12)] sm:p-6 fhd:p-7"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="h-4 w-4 fill-current"
                    >
                      <path d="M10 1.5l2.47 5.02 5.53.8-4 3.9.94 5.48L10 13.92l-4.94 2.78.94-5.48-4-3.9 5.53-.8L10 1.5z" />
                    </svg>
                  ))}
                  <span className="sr-only">{home.page.testimonials.starsLabel}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{item.quote}</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs uppercase tracking-wide text-emerald-700">{item.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer global */}
      <Footer />
    </>
  );
}
