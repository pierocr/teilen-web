"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DownloadModal } from "@/components/DownloadModal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PremiumPriceCards } from "@/components/premium/PremiumPriceCards";
import { APP_STORE_URL, PLAY_STORE_URL, UNIVERSAL_DOWNLOAD_URL } from "@/lib/seo";

const navLinks = [
  { href: "#how", label: "Cómo funciona" },
  { href: "#features", label: "Funciones" },
  { href: "#screens", label: "La app" },
  { href: "#premium", label: "Premium" },
  { href: "#faq", label: "FAQ" },
];

const footerSections = [
  {
    title: "Producto",
    links: [
      { label: "Dividir gastos", href: "/dividir-gastos" },
      { label: "Gastos compartidos", href: "/gastos-compartidos" },
      { label: "Control de gastos", href: "/control-de-gastos" },
      { label: "Recordatorios", href: "/recordatorios" },
      { label: "Metas de ahorro", href: "/metas-de-ahorro" },
      { label: "Premium", href: "/premium" },
    ],
  },
  {
    title: "Herramientas",
    links: [
      { label: "Funciones clave", href: "/#features" },
      { label: "La app", href: "/#screens" },
      { label: "Reportes", href: "/premium" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
    ],
  },
  {
    title: "Legal y ayuda",
    links: [
      { label: "Contacto", href: "/contacto" },
      { label: "Privacidad", href: "/privacidad" },
      { label: "Términos", href: "/terminos" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
];

const howSteps = [
  {
    title: "Crea un grupo",
    text: "Invita a tu pareja, amigos o compañeros.",
    icon: "users",
  },
  {
    title: "Agrega un gasto",
    text: "Indica el monto, quién pagó y entre quiénes se divide.",
    icon: "receipt",
  },
  {
    title: "Teilen calcula quién debe a quién",
    text: "Saldos claros y actualizados para todos.",
    icon: "split",
  },
];

const features = [
  { title: "Divide gastos", text: "Fácil y justo entre los integrantes.", icon: "chart" },
  { title: "Registra pagos", text: "Lleva el historial de quién pagó qué.", icon: "card" },
  { title: "Recordatorios", text: "No olvides pagos o pendientes.", icon: "bell" },
  { title: "Metas de ahorro", text: "Ahorra en grupo, para lo que quieran.", icon: "target" },
];

const featureItems = [
  ...features,
  { title: "Gastos personales", text: "Controla tus movimientos propios.", icon: "wallet" },
  { title: "Calculadora de divisas", text: "Convierte montos para viajes.", icon: "currency" },
  { title: "Recordatorios de pagos", text: "Ten vencimientos a la vista.", icon: "calendar" },
  { title: "Teilen Dash", text: "Juegos y dinámicas en la app.", icon: "game" },
  { title: "Gastos con IA", text: "Crea gastos con menos pasos.", icon: "sparkles" },
  { title: "Reportes por grupo", text: "Detalle claro de cada grupo.", icon: "report" },
  { title: "Y mucho más", text: "Más herramientas para ordenar.", icon: "more" },
];

const faqItems = [
  {
    question: "¿Qué puedo hacer con Teilen?",
    answer:
      "Puedes dividir gastos en grupos, registrar gastos personales, crear recordatorios, programar gastos recurrentes y seguir tus metas de ahorro.",
  },
  {
    question: "¿Sirve para parejas, viajes o roomies?",
    answer:
      "Sí. Puedes crear grupos para cada situación, invitar a otras personas por enlace o QR y mantener los saldos siempre claros.",
  },
  {
    question: "¿Puedo usar Teilen solo para mis gastos personales?",
    answer:
      "Sí. También puedes registrar gastos personales, crear recordatorios y seguir tus metas de ahorro.",
  },
  {
    question: "¿Puedo programar gastos mensuales?",
    answer:
      "Sí. Puedes crear gastos recurrentes para suscripciones, servicios, arriendo, cuentas del hogar o pagos compartidos.",
  },
  {
    question: "¿Teilen tiene recordatorios?",
    answer:
      "Sí. Puedes crear recordatorios para próximos vencimientos y revisar cuáles están activos, próximos o vencidos.",
  },
  {
    question: "¿Puedo crear metas de ahorro?",
    answer:
      "Sí. Puedes crear metas, registrar avances, ver tu ahorro acumulado y revisar cuánto falta para completarlas.",
  },
  {
    question: "¿Puedo escanear boletas?",
    answer:
      "Según disponibilidad en la app, Teilen permite escanear boletas para ayudarte a crear gastos con menos pasos.",
  },
  {
    question: "¿Está disponible para iOS y Android?",
    answer: "Sí. Puedes descargar Teilen desde App Store y Google Play.",
  },
  {
    question: "¿Qué incluye Teilen Premium?",
    answer:
      "Premium desbloquea herramientas avanzadas como más grupos, gastos completos, reportes, comprobantes, funciones con IA y módulos financieros extendidos, según disponibilidad en la app.",
  },
];

export default function Page() {
  const [downloadOpen, setDownloadOpen] = useState(false);

  const openDownload = () => setDownloadOpen(true);

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
      <div className="min-h-screen overflow-x-hidden bg-white text-[#10231d]">
        <Header onDownload={openDownload} />

        <section className="relative overflow-hidden border-b border-emerald-900/10 bg-[linear-gradient(105deg,#ffffff_0%,#f4fff9_48%,#e7fbf2_100%)]">
          <div className="pointer-events-none absolute -right-24 top-28 h-[500px] w-[500px] rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-24 hidden h-[410px] w-[540px] rounded-l-full bg-[#bff2d9]/42 lg:block" />
          <div className="pointer-events-none absolute bottom-0 right-0 hidden h-[220px] w-[350px] bg-[radial-gradient(circle_at_70%_70%,rgba(0,157,99,0.24),transparent_55%)] lg:block" />

          <div className="relative mx-auto grid max-w-6xl items-start gap-8 px-5 pb-8 pt-20 sm:px-6 sm:pb-10 sm:pt-24 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-8 lg:pb-8 lg:pt-28">
            <div className="max-w-2xl">
              <h1 className="text-[2.5rem] font-extrabold leading-[1.02] tracking-tight text-[#10231d] sm:text-[3.35rem] lg:text-[3.7rem]">
                Divide gastos{" "}
                <span className="text-[#009d63]">en segundos.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Teilen te ayuda a saber quién pagó, cuánto debe cada persona y
                mantener las cuentas claras desde el celular.
              </p>

              <div className="mt-6 flex flex-col items-start gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <StoreBadge store="apple" />
                  <StoreBadge store="google" />
                </div>
                <a
                  href="#how"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#009d63] bg-white/80 px-6 py-3 text-sm font-bold text-[#008a57] shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  <Icon kind="play" className="h-5 w-5 fill-current" />
                  Ver cómo funciona
                </a>
              </div>

              <div className="mt-6 flex max-w-xl items-start gap-2 text-sm font-extrabold leading-6 text-emerald-900 sm:text-base">
                <Icon
                  kind="shield"
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#009d63] sm:h-6 sm:w-6"
                />
                <p>
                  Tus datos siempre están seguros, protegidos y encriptados en
                  Teilen.
                </p>
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-[380px] justify-center lg:max-w-none">
              <LeafDecoration className="absolute -right-10 bottom-4 hidden h-44 w-44 text-[#009d63]/34 lg:block" />
              <LeafDecoration className="absolute -left-6 bottom-0 hidden h-28 w-28 -scale-x-100 text-[#009d63]/24 lg:block" />
              <HeroImageMockup />
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-24 bg-white px-5 py-8 sm:px-6 sm:py-10">
          <SectionTitle>Cómo funciona</SectionTitle>
          <div className="mx-auto mt-4 grid max-w-6xl gap-3 md:grid-cols-3">
            {howSteps.map((step, index) => (
              <article
                key={step.title}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-extrabold text-[#009d63]">
                  {index + 1}
                </span>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#009d63]">
                  <Icon kind={step.icon} className="h-9 w-9" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-slate-950">{step.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-white px-5 pb-10 sm:px-6 sm:pb-12">
          <div className="mx-auto max-w-6xl">
            <SectionTitle>Funciones clave</SectionTitle>
            <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {featureItems.map((item) => (
                <SmallCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section id="screens" className="bg-white px-5 pb-10 sm:px-6 sm:pb-12">
          <SectionTitle>La app en acción</SectionTitle>
          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 items-end justify-items-center gap-4 sm:grid-cols-3 sm:gap-10">
            <ImagePhoneMockup
              src="/screens/imagen_home.png"
              alt="Pantalla principal de Teilen con balance de grupos"
            />
            <ImagePhoneMockup
              src="/screens/imagen_grupo.png"
              alt="Pantalla de grupo en Teilen con gastos compartidos"
            />
            <ImagePhoneMockup
              src="/screens/imagen_reporte.png"
              alt="Pantalla de reportes detallados de un grupo en Teilen"
            />
          </div>
        </section>

        <section id="premium" className="bg-white px-5 pb-8 sm:px-6 sm:pb-10">
          <div className="mx-auto max-w-6xl">
            <PremiumPriceCards onDownload={openDownload} />
          </div>
        </section>

        <section id="faq" className="bg-white px-5 pb-12 sm:px-6 sm:pb-16">
          <SectionTitle>Preguntas frecuentes</SectionTitle>
          <p className="mx-auto mt-2 max-w-3xl text-center text-sm leading-6 text-slate-600 sm:text-base">
            Todo lo que necesitas saber antes de empezar con Teilen.
          </p>
          <div className="mx-auto mt-6 grid max-w-6xl gap-3 md:grid-cols-2">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.05)] open:bg-emerald-50/40"
              >
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-sm font-extrabold text-slate-950 transition hover:bg-slate-50 sm:px-6 sm:text-base [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#009d63] transition group-open:rotate-45">
                    <Icon kind="plus" className="h-4 w-4" />
                  </span>
                </summary>
                <p className="border-t border-emerald-100 px-5 pb-5 pt-4 pr-16 text-sm leading-6 text-slate-600 sm:px-6 sm:pr-20 sm:text-base sm:leading-7">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
          />
        </section>

        <HomeFooter />
      </div>

      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </>
  );
}

function Header({ onDownload }: { onDownload: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Teilen, inicio">
          <Image
            src="/logo_teilen.png"
            alt="Teilen"
            width={38}
            height={38}
            priority
            className="h-9 w-9"
          />
          <span className="text-2xl font-extrabold tracking-tight text-[#063829]">Teilen</span>
        </Link>

        <ul className="hidden items-center justify-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-[#008a57]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 md:inline-flex"
            aria-label="Ver QR para descargar Teilen"
          >
            <Image
              src="/qr-download.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 rounded bg-white"
            />
            <span className="hidden xl:inline">QR</span>
          </button>
          <a
            href={UNIVERSAL_DOWNLOAD_URL}
            rel="noopener"
            className="rounded-xl bg-[#009d63] px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,157,99,0.22)] transition hover:-translate-y-0.5 hover:bg-[#008a57] sm:hidden"
          >
            Descargar
          </a>
          <button
            type="button"
            onClick={onDownload}
            className="hidden rounded-xl bg-[#009d63] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,157,99,0.22)] transition hover:-translate-y-0.5 hover:bg-[#008a57] sm:inline-flex"
          >
            Descargar app
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <Icon kind="menu" className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          aria-label="Cerrar menú"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-76 max-w-[82vw] transform bg-white shadow-2xl transition-transform duration-200 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <span className="text-base font-extrabold text-slate-950">Menú</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-700"
            aria-label="Cerrar menú"
          >
            <Icon kind="plus" className="h-4 w-4 rotate-45" />
          </button>
        </div>
        <div className="p-5">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-[#008a57]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-slate-100 pt-5">
            <LanguageSwitcher className="w-full" buttonClassName="w-full justify-between" />
            <button
              type="button"
              onClick={() => {
                setQrOpen(true);
                setMenuOpen(false);
              }}
              className="mt-3 flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Image
                  src="/qr-download.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded bg-white"
                />
                QR de descarga
              </span>
              <Icon kind="plus" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {qrOpen && (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            aria-label="Cerrar QR"
            onClick={() => setQrOpen(false)}
          />
          <div className="relative z-[101] flex min-h-full items-center justify-center p-4">
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              className="relative flex flex-col items-center gap-4 rounded-3xl border border-white/20 bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  setQrOpen(false);
                }}
                aria-label="Cerrar QR"
                className="absolute right-3 top-3 rounded-full border border-black/10 px-2.5 py-0.5 text-xs font-medium text-slate-600 transition hover:bg-black/5"
              >
                ✕
              </button>
              <Image
                src="/qr-download.png"
                alt="Código QR para descargar Teilen"
                width={240}
                height={240}
                className="h-60 w-60 rounded-2xl border border-slate-100 bg-white p-3"
              />
              <div className="text-center">
                <p className="text-lg font-bold text-slate-900">Escanea para descargar</p>
                <p className="mt-1 text-sm text-slate-600">Abre Teilen en App Store o Google Play.</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-emerald-600">
                  teilen.cl/api/download
                </p>
              </div>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function SectionTitle({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex items-center gap-4 ${
        align === "center" ? "mx-auto max-w-6xl justify-center" : ""
      }`}
    >
      {align === "center" && <span className="hidden h-px w-24 bg-slate-200 sm:block" />}
      <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
        {children}
      </h2>
      {align === "center" && <span className="hidden h-px w-24 bg-slate-200 sm:block" />}
    </div>
  );
}

function SmallCard({
  item,
}: {
  item: { title: string; text: string; icon: string };
}) {
  return (
    <article className="flex min-h-[168px] flex-col items-center justify-start rounded-xl border border-slate-200 bg-white p-4 text-center shadow-[0_10px_28px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-emerald-200 sm:min-h-[176px]">
      <span className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#009d63] sm:h-14 sm:w-14">
        <Icon kind={item.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
      </span>
      <h3 className="mt-3 min-h-[34px] text-sm font-extrabold leading-[1.2] text-slate-950">
        {item.title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-600">
        {item.text}
      </p>
    </article>
  );
}

function StoreBadge({ store }: { store: "apple" | "google" }) {
  const isApple = store === "apple";

  return (
    <a
      href={isApple ? APP_STORE_URL : PLAY_STORE_URL}
      rel="noopener"
      aria-label={isApple ? "Descargar Teilen en App Store" : "Descargar Teilen en Google Play"}
      className="inline-flex overflow-hidden rounded-lg bg-black shadow-[0_12px_26px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5"
    >
      <Image
        src={
          isApple
            ? "/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
            : "/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
        }
        alt={isApple ? "Descargar en App Store" : "Disponible en Google Play"}
        width={isApple ? 174 : 196}
        height={58}
        className={isApple ? "h-12 w-[144px]" : "h-12 w-[162px]"}
      />
    </a>
  );
}

function HomeFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-emerald-900/10 bg-white">
      <div className="relative overflow-hidden bg-[#009d63] px-5 py-6 text-white sm:px-6">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_12%_100%,transparent_0,transparent_70px,rgba(255,255,255,.4)_71px,transparent_72px),radial-gradient(circle_at_92%_20%,transparent_0,transparent_90px,rgba(255,255,255,.35)_91px,transparent_92px)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:text-left">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
              <Image
                src="/logo_teilen.png"
                alt="Teilen"
                width={42}
                height={42}
                className="h-10 w-10"
              />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold">Ordena tus cuentas desde hoy</h2>
              <p className="mt-1 text-sm text-white/90">
                Descarga Teilen para iOS y Android.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <StoreBadge store="apple" />
            <StoreBadge store="google" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_1.85fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Teilen, inicio">
              <Image
                src="/logo_teilen.png"
                alt="Teilen"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-3xl font-extrabold tracking-tight text-[#063829]">Teilen</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              App chilena para dividir gastos, organizar cuentas compartidas,
              crear recordatorios y seguir metas de ahorro.
            </p>
            <p className="mt-3 flex max-w-sm items-start gap-2 text-sm font-bold leading-6 text-emerald-900">
              <Icon kind="shield" className="mt-0.5 h-5 w-5 shrink-0 text-[#009d63]" />
              Tus datos están protegidos y encriptados en Teilen.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerSections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <h3 className="text-sm font-extrabold text-slate-950">{section.title}</h3>
                <ul className="mt-3 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-slate-600 transition hover:text-[#008a57]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
            <span>© {year} Teilen</span>
            <Link href="/privacidad" className="font-medium hover:text-[#008a57]">
              Privacidad
            </Link>
            <Link href="/terminos" className="font-medium hover:text-[#008a57]">
              Términos
            </Link>
            <Link href="/cookies" className="font-medium hover:text-[#008a57]">
              Cookies
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <SocialIcon label="Instagram de Teilen" href="https://www.instagram.com/teilen.app/" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-[#008a57]"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" fill="white" />
        <circle cx="18" cy="6" r="1.2" fill="white" />
      </svg>
    </a>
  );
}

function HeroImageMockup() {
  return (
    <div className="relative z-10 aspect-[887/1774] w-[250px] sm:w-[285px] lg:w-[262px] lg:translate-y-3">
      <div className="absolute inset-0 rounded-[2.4rem] bg-[#101010] p-2 shadow-[0_28px_70px_rgba(15,23,42,0.24)] ring-1 ring-black/20">
        <div className="absolute left-1/2 top-3 z-20 h-5 w-[42%] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute -right-1 top-[28%] h-16 w-1 rounded-full bg-slate-800" />
        <div className="absolute -left-1 top-[22%] h-10 w-1 rounded-full bg-slate-800" />
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-white ring-1 ring-white/10">
          <Image
            src="/screens/imagen_home.png"
            alt="Pantalla principal de Teilen con balance de grupos"
            fill
            priority
            sizes="(max-width: 640px) 270px, 330px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function ImagePhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[9/19.5] w-full max-w-[148px] sm:w-[200px] sm:max-w-none lg:w-[208px]">
      <div className="absolute inset-0 rounded-[2.4rem] bg-[#101010] p-2 shadow-[0_28px_70px_rgba(15,23,42,0.18)] ring-1 ring-black/20">
        <div className="absolute left-1/2 top-3 z-20 h-5 w-[42%] -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute -right-1 top-[28%] h-16 w-1 rounded-full bg-slate-800" />
        <div className="absolute -left-1 top-[22%] h-10 w-1 rounded-full bg-slate-800" />
        <div className="relative h-full overflow-hidden rounded-[2rem] bg-white ring-1 ring-white/10">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 190px, 220px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

function LeafDecoration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" className={className} fill="none" aria-hidden="true">
      <path
        d="M38 148c49-2 88-41 103-104-61 13-99 52-103 104Z"
        fill="currentColor"
      />
      <path
        d="M58 132c18-32 40-55 69-73M73 117l-2-31M91 95l31 2"
        stroke="white"
        strokeOpacity=".45"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M21 158c18-32 43-55 75-70" stroke="currentColor" strokeWidth="16" strokeLinecap="round" />
    </svg>
  );
}

function Icon({
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

  if (kind === "download") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 19h14" />
      </svg>
    );
  }

  if (kind === "play") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M8 5v14l11-7-11-7Z" />
      </svg>
    );
  }

  if (kind === "menu") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }

  if (kind === "shield") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (kind === "heart") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 21s-7.3-4.7-9.4-9.2C.9 8.1 3.1 4.5 6.9 4.5c2 0 3.7 1.1 5.1 2.9 1.4-1.8 3.1-2.9 5.1-2.9 3.8 0 6 3.6 4.3 7.3C19.3 16.3 12 21 12 21Z" />
      </svg>
    );
  }

  if (kind === "bag" || kind === "travel") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        <path d="M5 7h14l1 13H4L5 7Z" />
        <path d="M8 11h8" />
      </svg>
    );
  }

  if (kind === "home" || kind === "house") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M3 11.2 12 3l9 8.2-1.8 2L18 12.1V21h-5v-6h-2v6H6v-8.9l-1.2 1.1-1.8-2Z" />
      </svg>
    );
  }

  if (kind === "users" || kind === "friends" || kind === "couple") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM15.8 11.4a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 20.2c.5-4 2.8-6.5 6-6.5s5.5 2.5 6 6.5H2.5ZM13.4 14.2c2.8.3 4.7 2.4 5.1 6h3c-.4-3.8-2.6-6.3-5.6-6.3-.9 0-1.7.1-2.5.3Z" />
      </svg>
    );
  }

  if (kind === "receipt") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3Z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    );
  }

  if (kind === "split") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 7h10M7 17h10M12 7v10" />
        <path d="m9 10 3-3 3 3M9 14l3 3 3-3" />
      </svg>
    );
  }

  if (kind === "chart") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M11 3a9 9 0 1 0 8.5 12H11V3Zm2 0v10h10A10 10 0 0 0 13 3Z" />
      </svg>
    );
  }

  if (kind === "card") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M3 10h18M7 15h4" />
      </svg>
    );
  }

  if (kind === "bell") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M12 22a3 3 0 0 0 2.8-2H9.2A3 3 0 0 0 12 22ZM19 17H5l1.6-2.1V10a5.4 5.4 0 0 1 10.8 0v4.9L19 17Z" />
      </svg>
    );
  }

  if (kind === "target") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="m15 9 5-5M17 4h3v3" />
      </svg>
    );
  }

  if (kind === "wallet") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M4 7.5h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.8A2.8 2.8 0 0 1 5.8 4H18" />
        <path d="M16 13.5h5" />
        <path d="M17.5 13.5h.1" />
      </svg>
    );
  }

  if (kind === "currency") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 7h10l-3-3" />
        <path d="m17 7-3 3" />
        <path d="M17 17H7l3 3" />
        <path d="m7 17 3-3" />
        <path d="M12 8v8" />
      </svg>
    );
  }

  if (kind === "calendar") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4M16 3v4M4 10h16" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }

  if (kind === "game") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 9h10a5 5 0 0 1 4.7 6.7l-.4 1.2a2.3 2.3 0 0 1-3.8.9L15 15H9l-2.5 2.8a2.3 2.3 0 0 1-3.8-.9l-.4-1.2A5 5 0 0 1 7 9Z" />
        <path d="M8 12v4M6 14h4M16.5 13.5h.1M18.5 15.5h.1" />
      </svg>
    );
  }

  if (kind === "sparkles") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
        <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" />
        <path d="M5 13l.7 1.8 1.8.7-1.8.7L5 19l-.7-1.8-1.8-.7 1.8-.7L5 13Z" />
      </svg>
    );
  }

  if (kind === "report") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M15 3v4h4" />
        <path d="M9 17v-4M12 17V9M15 17v-6" />
      </svg>
    );
  }

  if (kind === "more") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M12 5v14M5 12h14" />
        <path d="M18 6 6 18" />
      </svg>
    );
  }

  if (kind === "fork") {
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M7 3v8M4 3v8M10 3v8M4 11h6M7 11v10M16 3v18M16 3c2.5 1.8 4 4.2 4 7 0 2-1.6 3.5-4 3.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
