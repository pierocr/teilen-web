import Image from "next/image";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { StatsLoading } from "@/components/skeletons/StatsLoading";
import { FeaturesLoading } from "@/components/skeletons/FeaturesLoading";
import { HowItWorksLoading } from "@/components/skeletons/HowItWorksLoading";
import { howToSchema, aggregateRatingSchema } from "@/lib/schema";

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

const testimonials = [
  {
    quote:
      "“Con Teilen logramos ordenar el arriendo y los servicios del depto. El resumen es transparente y todos quedamos tranquilos con lo que toca pagar.”",
    author: "Constanza R.",
    context: "Ñuñoa · Convive con 3 roomies",
  },
  {
    quote:
      "“Para nuestro viaje a Chiloé fue ideal. Cada gasto quedó registrado al tiro y al final bastó un par de clics para saldar entre el grupo completo.”",
    author: "Diego M.",
    context: "Valparaíso · Viajes en grupo",
  },
  {
    quote:
      "“Con mi pareja nos organizamos mejor: la app recuerda quién pagó cada cosa y evita esos malos ratos por las cuentas de la casa.”",
    author: "Camila & Seba",
    context: "Santiago Centro · Pareja joven",
  },
  {
    quote:
      "“Soy tesorera de un club deportivo y Teilen nos permitió llevar los aportes y reembolsos con claridad. Los socios quedan informados al instante.”",
    author: "María José L.",
    context: "Providencia · Club amateur",
  },
];

const faqItems = [
  {
    question: "¿Qué hace diferente a Teilen frente a otras apps para dividir gastos?",
    answer:
      "Teilen está pensada para el mercado chileno: permite registrar gastos en pesos, dividirlos en partes iguales o personalizadas, enviar recordatorios y exportar reportes claros para tu grupo.",
  },
  {
    question: "¿Sirve para viajes, parejas o grupos de roomies?",
    answer:
      "Sí. Puedes crear distintos grupos, invitar a tus contactos y llevar el detalle de cada compra, reembolso y saldo pendiente en tiempo real.",
  },
  {
    question: "¿Cómo se liquidan los saldos en Teilen?",
    answer:
      "La app calcula automáticamente quién le debe a quién y te muestra la mejor ruta de pagos para dejar el grupo en cero sin cálculos manuales.",
  },
];

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";
const UNIVERSAL_DOWNLOAD_URL = "https://www.teilen.cl/api/download";

export default function Page() {
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

      {/* Métricas */}
      <section className="mx-auto max-w-6xl px-5 py-16 fhd:py-20">
        <Suspense fallback={<StatsLoading />}>
          <AnimatedStats />
        </Suspense>
      </section>

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

      {/* Características — versión moderna con mockup + animaciones CSS */}
      <section id="features" className="scroll-mt-24">
        <Suspense fallback={<FeaturesLoading />}>
          <FeaturesShowcase />
        </Suspense>
      </section>

      {/* FAQ para snippet enriquecido */}
      <section id="faq" className="mx-auto max-w-6xl px-5 py-20 fhd:py-24">
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Preguntas frecuentes
        </span>
        <h2 className="mt-4 text-4xl font-bold text-slate-900 md:text-5xl fhd:text-6xl">
          Resuelve tus dudas antes de descargar Teilen
        </h2>
        <p className="mt-3 max-w-3xl text-base md:text-lg fhd:text-xl leading-7 text-slate-600">
          Respondemos lo que más nos consultan sobre compartir gastos, saldar cuentas y organizar grupos
          para que pruebes Teilen con confianza.
        </p>

        <div className="mt-10 grid gap-6 fhd:gap-8 md:grid-cols-3">
          {faqItems.map((item) => (
            <article
              key={item.question}
              className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </section>

      {/* Screens de la app: 4 en fila en desktop */}
      <section id="screens" className="scroll-mt-24">
        <AppScreens
          images={[
            "/screens/home.jpg",
            "/screens/grupos.jpg",
            "/screens/gasto.jpg",
            "/screens/actividad.jpg",
          ]}
        />
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-br from-emerald-500/20 via-white to-teal-100 p-10 text-center shadow-soft">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(1,154,87,0.15),_transparent_55%)]"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 shadow">
              Descarga Teilen
            </span>
            <h3 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
              Disponible en iOS y Android para Chile y el mundo
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600 md:text-lg">
              Lleva la app líder para compartir gastos, dividir pagos y ordenar tus finanzas personales sin importar
              dónde estés. Gratis, segura y con un diseño listo para tus grupos.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <a
                href={APP_STORE_URL}
                aria-label="Descargar Teilen en App Store"
                className="inline-flex overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow transition hover:-translate-y-0.5 hover:border-emerald-400"
                rel="noopener"
              >
                <Image
                  src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                  alt="Disponible en App Store"
                  width={200}
                  height={60}
                  className="h-[60px] w-[200px]"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                aria-label="Descargar Teilen en Google Play"
                className="inline-flex overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow transition hover:-translate-y-0.5 hover:border-emerald-400"
                rel="noopener"
              >
                <Image
                  src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                  alt="Disponible en Google Play"
                  width={216}
                  height={64}
                  className="h-[64px] w-[216px]"
                />
              </a>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.35em] text-emerald-700/80">
              App global para compartir gastos · Sin costo de descarga
            </p>
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-emerald-100/80 bg-white/90 px-4 py-4 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md sm:max-w-2xl sm:flex-row sm:items-center sm:gap-5"
            >
              <Image
                src="/qr-download.png"
                alt="Código QR de descarga universal de Teilen"
                width={108}
                height={108}
                className="h-24 w-24 flex-shrink-0 rounded-xl border border-emerald-50 bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              />
              <div className="space-y-1 text-sm leading-6 text-slate-700 sm:space-y-1.5">
                <p className="text-base font-semibold text-slate-900 sm:text-lg">Escanea con tu cámara</p>
                <p>Elige el sistema operativo que quieras, nosotros detectamos tu store automáticamente.</p>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-600 break-all sm:break-normal sm:tracking-[0.35em]">
                  {UNIVERSAL_DOWNLOAD_URL.replace("https://", "")}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-10 fhd:py-28">
        <div
          className="absolute inset-x-10 -top-10 h-40 rounded-full bg-emerald-200/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative rounded-3xl border border-white/60 bg-white/80 p-10 fhd:p-12 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-4 fhd:gap-6 flex-wrap">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Reseñas
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl fhd:text-5xl">
                Lo que dice nuestra comunidad
              </h2>
              <p className="mt-3 text-base md:text-lg fhd:text-xl leading-7 text-slate-600 max-w-xl fhd:max-w-2xl">
                Testimonios reales de usuarios piloto que ya están usando Teilen para dividir gastos
                sin drama.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 fhd:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white/90 p-6 fhd:p-7 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
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
                  <span className="sr-only">5 de 5 estrellas</span>
                </div>
                <p className="mt-4 text-base leading-7 text-slate-700">{item.quote}</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs uppercase tracking-wide text-emerald-700">{item.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* AggregateRating Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      </section>

      {/* Footer global */}
      <Footer />
    </>
  );
}
