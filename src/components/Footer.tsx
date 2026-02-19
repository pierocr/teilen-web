"use client";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "./LanguageProvider";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const useCases = t.footer.useCases;

  const [activeCase, setActiveCase] = useState<typeof useCases[number] | null>(null);

  const nav = {
    producto: t.footer.links.product.map((label) => ({ label, href: "#" })),
    casos: useCases.map(({ title }) => ({ label: title, href: "#" })),
    ayuda: [
      { label: t.footer.links.help.center, href: "/centro-de-ayuda" },
      { label: t.footer.links.help.contact, href: "/contacto" },
      { label: t.footer.links.help.faq, href: "/preguntas-frecuentes" },
    ],
    empresa: [
      { label: t.footer.links.company.about, href: "#" },
      { label: t.footer.links.company.blog, href: "#" },
      { label: t.footer.links.company.press, href: "#" },
      { label: t.footer.links.company.jobs, href: "#" },
      { label: t.footer.links.company.legal, href: "/terminos" },
    ],
  };

  return (
    <footer className="relative mt-24 border-t border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 fhd:px-10">
        <div className="grid grid-cols-1 gap-12 fhd:gap-16 py-14 fhd:py-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Columna marca + texto + badges + newsletter */}
          <div className="lg:col-span-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo_teilen.png"
                alt="Teilen"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg ring-1 ring-emerald-100 select-none"
                priority={false}
              />
              <span className="text-[42px] font-semibold tracking-tight text-slate-900">Teilen</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600 fhd:text-base fhd:leading-7">
              {t.footer.brandDescription}
            </p>

            {/* Badges de tiendas */}
            <div className="mt-6 flex flex-wrap items-center gap-3 fhd:gap-4">
              <a
                href="https://apps.apple.com/cl/app/teilen/id6754208104"
                aria-label={t.footer.stores.appStoreAria}
                className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow"
                rel="noopener"
              >
                <Image
                  src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                  alt={t.footer.stores.appStoreAlt}
                  width={174}
                  height={58}
                  className="h-[58px] w-[174px]"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.pierocr.teilenapp"
                aria-label={t.footer.stores.googlePlayAria}
                className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow"
                rel="noopener"
              >
                <Image
                  src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                  alt={t.footer.stores.googlePlayAlt}
                  width={196}
                  height={58}
                  className="h-[58px] w-[196px]"
                />
              </a>
            </div>

            {/* Newsletter (visual; conecta tu acción real cuando la tengas) */}
            <form
              className="mt-6 flex max-w-sm items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label={t.footer.newsletterAria}
            >
              <input
                type="email"
                required
                placeholder={t.footer.emailPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none ring-emerald-500/30 focus:ring-4"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 active:translate-y-px"
              >
                {t.footer.join}
              </button>
            </form>
          </div>

          <FooterColumn title={t.footer.columns.product} items={nav.producto} className="lg:col-span-2" />
          <UseCasesColumn
            title={t.footer.columns.useCases}
            items={useCases}
            className="lg:col-span-2"
            onSelect={(title) => {
              const match = useCases.find((c) => c.title === title);
              if (match) setActiveCase(match);
            }}
          />
          <FooterColumn title={t.footer.columns.help} items={nav.ayuda} className="lg:col-span-2" />
          <FooterColumn title={t.footer.columns.company} items={nav.empresa} className="lg:col-span-2" />
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="flex flex-col gap-6 py-8 fhd:py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm fhd:text-base text-gray-600">
            <span>© {year} Teilen</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <Link href="/privacidad" className="hover:text-emerald-700">{t.footer.links.legal.privacy}</Link>
            <Link href="/terminos" className="hover:text-emerald-700">{t.footer.links.legal.terms}</Link>
            <Link href="/cookies" className="hover:text-emerald-700">{t.footer.links.legal.cookies}</Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 fhd:gap-5">
            <div className="relative">
              <LanguageSwitcher />
            </div>

            <div className="flex items-center gap-3">
              <SocialIcon label={t.footer.instagram} href="https://www.instagram.com/teilen.app/" kind="ig" />
            </div>
          </div>
        </div>
      </div>

      {activeCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="use-case-title"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-200">
            <div className="flex items-start justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{t.footer.useCaseModal.label}</p>
                <h3 id="use-case-title" className="mt-1 text-2xl font-semibold text-gray-900">
                  {activeCase.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{activeCase.description}</p>
              </div>
                <button
                  type="button"
                  onClick={() => setActiveCase(null)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:text-gray-800 hover:border-gray-300"
                  aria-label={t.footer.useCaseModal.close}
                >
                  ×
                </button>
            </div>

            <div className="px-5 pb-5">
              <ul className="space-y-2.5 text-sm text-gray-700">
                {activeCase.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCase(null)}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  {t.footer.useCaseModal.startWithCase}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCase(null)}
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-300"
                >
                  {t.footer.useCaseModal.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

/* ---------- Helpers ---------- */

function FooterColumn({
  title,
  items,
  className = "",
}: {
  title: string;
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav className={`min-w-[12rem] ${className}`} aria-label={title}>
      <h3 className="text-sm fhd:text-base font-semibold tracking-wide text-gray-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-sm fhd:text-base text-gray-600 transition hover:text-emerald-700"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function UseCasesColumn({
  title,
  items,
  className = "",
  onSelect,
}: {
  title: string;
  items: { title: string; description: string; bullets: string[] }[];
  className?: string;
  onSelect: (title: string) => void;
}) {
  return (
    <nav className={`min-w-[12rem] ${className}`} aria-label={title}>
      <h3 className="text-sm fhd:text-base font-semibold tracking-wide text-gray-900">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => onSelect(item.title)}
              className="text-left text-sm fhd:text-base text-gray-600 transition hover:text-emerald-700"
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialIcon({
  label,
  href,
  kind,
}: {
  label: string;
  href: string;
  kind: "x" | "in" | "ig" | "fb" | "yt";
}) {
  const paths: Record<string, ReactNode> = {
    x: <path d="M3 3l7.3 9.1L3.7 21H6l5.3-6.6L15.7 21H21l-7.5-9.4L20.3 3H18l-5 6.2L8.4 3H3z" />,
    in: <path d="M4 3a2 2 0 110 4 2 2 0 010-4zM4 8h4v13H4V8zm6 0h4v2h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.4 3 5.4 6.9V21h-4v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.6 1.7-2.6 3.5V21h-4V8z" />,
    ig: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" fill="white" />
        <circle cx="18" cy="6" r="1.2" fill="white" />
      </>
    ),
    fb: <path d="M13 3h4V7h-4v3h3.5l-.5 4H13v7H9v-7H7v-4h2V7.5C9 5 10.1 3 13 3z" />,
    yt: (
      <>
        <path d="M2 8.5C2 6.6 3.6 5 5.5 5h13c1.9 0 3.5 1.6 3.5 3.5v7c0 1.9-1.6 3.5-3.5 3.5h-13A3.5 3.5 0 012 15.5v-7z" />
        <path d="M10 10l6 3-6 3V10z" fill="white" />
      </>
    ),
  };

  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" stroke="none" aria-hidden>
        {paths[kind]}
      </svg>
    </a>
  );
}

export default Footer;
