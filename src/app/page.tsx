
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
const SCREEN_LABELS = ["Ordena tus gastos", "Divide gastos", "Programa cuentas", "Revisa actividad"];

const spotlightSections = [
  {
    id: "recurrentes",
    eyebrow: "Gastos recurrentes",
    title: "Programa tus cuentas frecuentes",
    description: "Crea gastos recurrentes para suscripciones, servicios mensuales y pagos compartidos.",
    support: "Perfecto para esas cuentas que se repiten todos los meses.",
    bullets: [
      "Disponible para grupos.",
      "Disponible para gastos personales.",
      "Ideal para streaming, arriendo, cuentas del hogar y servicios.",
      "Puedes editar o eliminar cuando lo necesites.",
      "Revisa la próxima ejecución de cada gasto.",
    ],
  },
  {
    id: "recordatorios",
    eyebrow: "Recordatorios",
    title: "Tus vencimientos siempre a la vista",
    description: "Crea recordatorios para cuentas importantes y revisa qué viene esta semana.",
    support: "Úsalo para luz, agua, internet, TAG, suscripciones, créditos o pagos mensuales.",
    bullets: [
      "Próximos vencimientos.",
      "Recordatorios activos.",
      "Filtro por esta semana.",
      "Historial de vencidos.",
      "Alertas según disponibilidad en la app.",
    ],
  },
  {
    id: "ahorros",
    eyebrow: "Ahorros y metas",
    title: "Convierte tus metas en avances visibles",
    description: "Crea objetivos de ahorro, registra avances y revisa cuánto falta para completarlos.",
    support: "Ideal para matrimonio, pie para casa, viajes, auto o fondo de emergencia.",
    bullets: [
      "Metas personalizadas.",
      "Ahorro acumulado.",
      "Fecha objetivo.",
      "Progreso visual.",
      "Monto faltante.",
      "Crecimiento estimado si aplica.",
    ],
  },
];

const useCases = [
  { title: "Parejas", text: "Organicen compras, servicios, salidas y metas en común." },
  { title: "Viajes", text: "Registren cada gasto del viaje y revisen los saldos del grupo." },
  { title: "Roomies", text: "Ordenen arriendo, servicios, compras y suscripciones compartidas." },
  { title: "Familia", text: "Lleven gastos del hogar, recordatorios y pagos importantes." },
  { title: "Salidas con amigos", text: "Dividan restaurantes, panoramas y compras compartidas en segundos." },
  { title: "Gastos personales", text: "Registra tus movimientos, crea recordatorios y sigue tus metas." },
];

const premiumHighlights = [
  {
    title: "Grupos ilimitados",
    text: "Crea y administra todos los grupos que quieras.",
    icon: "users",
  },
  {
    title: "Escaneo con IA",
    text: "Captura y categoriza tus gastos automáticamente.",
    icon: "sparkles",
  },
  {
    title: "Reportes premium",
    text: "Reportes avanzados y exportaciones ilimitadas.",
    icon: "file",
  },
];

const premiumBenefits = [
  { title: "Gastos completos", text: "Todo el detalle de tus gastos en un toque." },
  { title: "Recurrentes y cuotas", text: "Pagos automáticos para cuentas que se repiten." },
  { title: "Grupos ilimitados", text: "Crea todos los grupos que necesites sin restricciones." },
  { title: "Reportes premium", text: "Exporta PDF y Excel listos para compartir." },
  { title: "Comprobantes con imagen", text: "Guarda cada comprobante junto al gasto." },
  { title: "Ahorro e inversiones", text: "Mira tu progreso en una sola vista clara." },
  { title: "Finanzas personales", text: "Cartola mensual lista para revisar." },
  { title: "Recordatorios ilimitados", text: "Mantén tus cuentas importantes siempre a la vista." },
  { title: "Escaneo con IA", text: "Escanea boletas y crea gastos con menos pasos." },
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

      {spotlightSections.map((section, index) => (
        <SpotlightSection key={section.id} section={section} flip={index % 2 === 1} />
      ))}

      <UseCasesSection />

      {/* Experiencia Teilen */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:py-20 fhd:py-24">
        <Suspense fallback={<StatsLoading />}>
          <AnimatedStats />
        </Suspense>
      </section>

      {/* Screens de la app: 4 en fila en desktop */}
      <section id="screens" className="scroll-mt-24">
        <AppScreens images={SCREEN_IMAGES} labels={SCREEN_LABELS} />
      </section>

      <PremiumSection />

      {/* FAQ para snippet enriquecido */}
      <section id="faq" className="mx-auto max-w-7xl px-5 py-10 sm:py-20 fhd:py-24">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
          {home.page.faq.badge}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:mt-5 sm:text-4xl md:text-5xl fhd:text-6xl">
          {home.page.faq.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7 md:text-lg fhd:text-xl">
          {home.page.faq.description}
        </p>

        <div className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:mt-10 sm:rounded-[30px]">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group bg-white open:bg-emerald-50/35"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left text-sm font-semibold leading-5 text-slate-900 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500 sm:px-6 sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-emerald-700 transition group-open:rotate-45 group-open:border-emerald-200 group-open:bg-emerald-100">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                    <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 pr-14 text-sm leading-6 text-slate-600 sm:px-6 sm:pb-5 sm:pr-20 sm:text-base sm:leading-7">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:pb-24">
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
      <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-4 sm:pb-24 sm:pt-10 fhd:py-28">
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

function SpotlightSection({
  section,
  flip = false,
}: {
  section: (typeof spotlightSections)[number];
  flip?: boolean;
}) {
  return (
    <section id={section.id} className="scroll-mt-24 border-y border-slate-100 bg-slate-50/60">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className={flip ? "lg:order-2" : ""}>
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
            {section.eyebrow}
          </span>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {section.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-lg sm:leading-8">
            {section.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-emerald-800 sm:text-base">{section.support}</p>
        </div>

        <div className="rounded-[24px] border border-slate-100 bg-white p-4 shadow-[0_18px_55px_rgba(15,23,42,0.09)] sm:p-6">
          <ul className="grid gap-3">
            {section.bullets.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700 sm:text-base">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                    <path d="M7.8 13.4 4.4 10l1.1-1.1 2.3 2.3 6.7-6.7 1.1 1.1-7.8 7.8Z" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section id="casos-de-uso" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12 sm:py-20">
      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
        Casos de uso
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
        Úsalo en tu día a día
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-lg sm:leading-8">
        Teilen se adapta a tus grupos, tus cuentas frecuentes y tus objetivos personales.
      </p>

      <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {useCases.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_34px_rgba(15,23,42,0.08)] sm:rounded-3xl sm:p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PremiumSection() {
  return (
    <section id="premium" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-10 sm:py-16">
      <div className="relative overflow-hidden rounded-[28px] border border-emerald-500/25 bg-[#020806] p-5 text-white shadow-[0_28px_80px_rgba(2,6,23,0.28)] sm:rounded-[34px] sm:p-7 lg:p-8">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_360px_at_12%_8%,rgba(34,197,94,0.26),transparent_62%),radial-gradient(520px_300px_at_92%_6%,rgba(16,185,129,0.18),transparent_58%)]"
          aria-hidden
        />

        <div className="relative grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300 shadow-[0_0_24px_rgba(34,197,94,0.16)]">
                <PremiumIcon kind="check" className="h-4 w-4" />
                Premium activo
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-white/5 px-3 py-1 text-xs font-bold text-emerald-300">
                <PremiumIcon kind="sparkles" className="h-4 w-4" />
                Todo incluido
              </span>
            </div>

            <h2 className="mt-7 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.03]">
              Todo Premium, <span className="text-emerald-400">ya disponible.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/72 sm:text-xl sm:leading-8">
              Accede a grupos ilimitados, escaneo con IA, reportes avanzados y herramientas para organizar tus cuentas con más detalle.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {premiumHighlights.map((item) => (
                <article key={item.title} className="text-center sm:text-left">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/12 text-emerald-400 shadow-[0_0_34px_rgba(34,197,94,0.16)] sm:mx-0">
                    <PremiumIcon kind={item.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-white sm:text-base">{item.title}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/58 sm:text-sm">{item.text}</p>
                </article>
              ))}
            </div>

            <p className="mt-7 max-w-lg rounded-2xl border border-emerald-400/18 bg-emerald-500/8 px-4 py-3 text-sm leading-6 text-emerald-50/76">
              La suscripción se gestiona desde la app y puede variar según disponibilidad en App Store o Google Play.
            </p>
          </div>

          <div className="relative lg:self-center">
            <div className="mx-auto w-full max-w-[360px] rotate-0 rounded-[26px] border border-emerald-400/22 bg-[#10141b]/94 p-3.5 shadow-[0_24px_70px_rgba(0,0,0,0.38),0_0_45px_rgba(34,197,94,0.12)] sm:p-4 lg:rotate-2">
              <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-emerald-500/60" />
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                  <PremiumIcon kind="sparkles" className="h-4 w-4" />
                  Premium
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/78">
                  <PremiumIcon kind="check" className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 rounded-[22px] border border-emerald-400/25 bg-[#061b12] p-4 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
                    <PremiumIcon kind="check" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Tu suscripción está activa</h3>
                    <p className="mt-0.5 text-xs font-semibold text-white/58">Plan activo · Renovación automática</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs font-bold text-white/86">
                  {premiumHighlights.map((item) => (
                    <li key={item.title} className="flex items-center gap-3">
                      <PremiumIcon kind={item.icon} className="h-4 w-4 text-emerald-400" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 grid gap-2.5">
                {premiumBenefits.slice(0, 6).map((item) => (
                  <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.055] p-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-950">
                      <PremiumIcon kind="check" className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-extrabold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[11px] font-medium leading-4 text-white/54">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PremiumIcon({
  kind,
  className = "h-5 w-5",
}: {
  kind: string;
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "users") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M16 11a4 4 0 1 0-8 0" />
        <path d="M3 21a7 7 0 0 1 14 0" />
        <path d="M17 7a3 3 0 0 1 0 6" />
        <path d="M20 21a5 5 0 0 0-3-4.6" />
      </svg>
    );
  }

  if (kind === "file") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h5" />
        <path d="M10 13h6M10 17h4" />
      </svg>
    );
  }

  if (kind === "check") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="m6 12 4 4 8-8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 3l1.4 4.2L18 9l-4.6 1.8L12 15l-1.4-4.2L6 9l4.6-1.8L12 3Z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
      <path d="M5 13l.7 1.8L7.5 15.5l-1.8.7L5 18l-.7-1.8-1.8-.7 1.8-.7L5 13Z" />
    </svg>
  );
}
