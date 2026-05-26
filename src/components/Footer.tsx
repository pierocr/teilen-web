"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "./LanguageProvider";

const nav = {
  producto: [
    { label: "Dividir gastos", href: "#features" },
    { label: "Gastos personales", href: "#features" },
    { label: "Gastos recurrentes", href: "#recurrentes" },
    { label: "Recordatorios", href: "#recordatorios" },
    { label: "Metas de ahorro", href: "#ahorros" },
    { label: "Premium", href: "#premium" },
  ],
  casos: [
    { label: "Parejas", href: "#casos-de-uso" },
    { label: "Viajes", href: "#casos-de-uso" },
    { label: "Roomies", href: "#casos-de-uso" },
    { label: "Cuentas del hogar", href: "#casos-de-uso" },
    { label: "Salidas con amigos", href: "#casos-de-uso" },
    { label: "Suscripciones", href: "#recurrentes" },
  ],
  herramientas: [
    { label: "Escáner de boletas", href: "#features" },
    { label: "Conversor de monedas", href: "#features" },
    { label: "Reportes", href: "#premium" },
    { label: "Notificaciones", href: "#features" },
  ],
  ayuda: [
    { label: "Preguntas frecuentes", href: "#faq" },
    { label: "Contacto", href: "/contacto" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Términos", href: "/terminos" },
  ],
};

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-12 border-t border-black/10 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sm:mt-24">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 fhd:px-10">
        <div className="grid grid-cols-1 gap-8 py-10 sm:gap-12 sm:py-14 fhd:gap-16 fhd:py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_teilen.png"
                alt="Teilen"
                width={40}
                height={40}
                className="h-10 w-10 select-none"
                priority={false}
              />
              <span className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-[42px]">Teilen</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600 fhd:text-base fhd:leading-7">
              Teilen te ayuda a organizar gastos compartidos y personales desde una app simple, clara y moderna.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:gap-3 fhd:gap-4">
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
                  className="h-[48px] w-[144px] sm:h-[58px] sm:w-[174px]"
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
                  className="h-[48px] w-[162px] sm:h-[58px] sm:w-[196px]"
                />
              </a>
            </div>
          </div>

          <FooterColumn title="Producto" items={nav.producto} className="lg:col-span-2" />
          <FooterColumn title="Casos de uso" items={nav.casos} className="lg:col-span-2" />
          <FooterColumn title="Herramientas" items={nav.herramientas} className="lg:col-span-2" />
          <FooterColumn title="Ayuda" items={nav.ayuda} className="lg:col-span-2" />
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="flex flex-col gap-5 py-6 sm:gap-6 sm:py-8 fhd:py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4 text-sm fhd:text-base text-gray-600">
            <span>© {year} Teilen</span>
            <span className="hidden md:inline text-gray-300">|</span>
            <Link href="/privacidad" className="hover:text-emerald-700">{t.footer.links.legal.privacy}</Link>
            <Link href="/terminos" className="hover:text-emerald-700">{t.footer.links.legal.terms}</Link>
            <Link href="/cookies" className="hover:text-emerald-700">{t.footer.links.legal.cookies}</Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 fhd:gap-5">
            <LanguageSwitcher />
            <SocialIcon label={t.footer.instagram} href="https://www.instagram.com/teilen.app/" kind="ig" />
          </div>
        </div>
      </div>
    </footer>
  );
}

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

function SocialIcon({
  label,
  href,
  kind,
}: {
  label: string;
  href: string;
  kind: "ig";
}) {
  const paths: Record<string, ReactNode> = {
    ig: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" fill="white" />
        <circle cx="18" cy="6" r="1.2" fill="white" />
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
