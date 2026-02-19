// Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { DownloadModal } from "./DownloadModal";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "./LanguageProvider";

const UNIVERSAL_DOWNLOAD_URL = "https://www.teilen.cl/api/download";
const SHOW_LOGIN = (process.env.NEXT_PUBLIC_SHOW_LOGIN_CTA ?? "false").toLowerCase() !== "false";

export function Navbar() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const links = [
    { href: "/premium", label: t.navbar.links.premium },
    { href: "#how", label: t.navbar.links.how },
    { href: "#features", label: t.navbar.links.features },
    { href: "#screens", label: t.navbar.links.screens },
  ];

  // Cierre QR con ESC
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setQrOpen(false);
    if (qrOpen) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [qrOpen]);

  // Cierre con ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Enfocar el panel al abrir
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.focus();
  }, [open]);

  // Estado visual al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 text-gray-900">
      <div
        className={`mx-auto mt-2 max-w-6xl px-3 transition-all duration-300 md:px-4 ${
          scrolled ? "mt-3" : "mt-2"
        }`}
      >
        <nav
          className={`relative flex h-16 fhd:h-20 items-center justify-between rounded-2xl border px-4 md:px-5 fhd:px-6 transition-all duration-300 ${
            scrolled
              ? "border-white/70 bg-white/92 shadow-[0_12px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl"
              : "border-white/60 bg-white/84 shadow-[0_8px_28px_rgba(15,23,42,0.12)] backdrop-blur-md"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(120deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_48%,rgba(255,255,255,0.55)_100%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 flex w-full items-center justify-between">
        {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo_teilen.png"
                alt="Teilen"
                width={40}
                height={40}
                priority
                className="h-10 w-10 rounded-lg ring-1 ring-emerald-100"
              />
              <span className="hidden text-[30px] font-semibold tracking-tight text-slate-900 sm:block">
                Teilen
              </span>
            </Link>

            {/* Menú desktop */}
            <ul className="hidden items-center justify-center gap-2 md:flex">
              {links.map((l) => (
                <li key={l.href} className="whitespace-nowrap">
                  {l.href.startsWith("/") ? (
                    <Link
                      href={l.href}
                      className="rounded-xl px-3 py-2 text-base font-medium text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900 fhd:text-lg"
                    >
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      href={l.href}
                      className="rounded-xl px-3 py-2 text-base font-medium text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900 fhd:text-lg"
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Acciones + Burger */}
            <div className="flex items-center gap-2 fhd:gap-3">
              <LanguageSwitcher className="hidden lg:inline-flex" />
              <button
                type="button"
                className="hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50/30 lg:flex"
                onClick={() => setQrOpen(true)}
                aria-label={t.navbar.qrLabel}
              >
                <Image
                  src="/qr-download.png"
                  alt="QR"
                  width={24}
                  height={24}
                  className="h-6 w-6 rounded bg-white"
                />
                <span className="hidden xl:inline">{t.navbar.qrShort}</span>
              </button>
              <button
                type="button"
                className="rounded-full border border-emerald-500/90 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white whitespace-nowrap shadow-[0_10px_24px_rgba(1,154,87,0.35)] transition hover:-translate-y-px hover:bg-emerald-700 fhd:px-5 fhd:py-2.5 fhd:text-base"
                onClick={() => setDownloadOpen(true)}
              >
                {t.navbar.downloadApp}
              </button>
              {SHOW_LOGIN && (
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-px hover:border-slate-300 hover:text-slate-900"
                >
                  {t.navbar.login}
                </Link>
              )}

              {/* Burger solo en mobile */}
              <button
                type="button"
                className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 md:hidden"
                aria-label={t.navbar.openMenu}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">{t.navbar.openMenu}</span>
                ☰
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Overlay clickeable */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          aria-label={t.navbar.closeMenu}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer derecho */}
      <div
        id="mobile-drawer"
        ref={panelRef}
        tabIndex={-1}
        className={`fixed right-0 top-0 z-50 h-screen w-72 transform bg-white shadow-xl transition-transform duration-200 ease-out md:hidden
        ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <span className="text-base font-semibold">{t.navbar.menuTitle}</span>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
            aria-label={t.navbar.closeMenu}
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-3 text-base">
            {links.map((l) => (
              <li key={l.href} className="whitespace-nowrap">
                {l.href.startsWith("/") ? (
                  <Link
                    href={l.href}
                    className="block rounded-md px-3 py-2 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="block rounded-md px-3 py-2 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <LanguageSwitcher className="w-full" buttonClassName="w-full justify-between" />
          </div>

          <div className="mt-6 border-t pt-4 flex flex-col gap-2">
            {SHOW_LOGIN && (
              <Link
                href="/login"
                className="rounded-full bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-emerald-700"
                onClick={() => setOpen(false)}
              >
                {t.navbar.login}
              </Link>
            )}
            <button
              type="button"
              className="rounded-full px-4 py-2 text-white text-center shadow-sm transition-colors"
              style={{ backgroundColor: "#019a57" }}
              onClick={() => {
                setDownloadOpen(true);
                setOpen(false);
              }}
            >
              {t.navbar.downloadApp}
            </button>
          </div>
        </div>
      </div>
      <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />

      {/* QR Lightbox */}
      {qrOpen && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setQrOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-[101] flex min-h-full items-center justify-center p-4">
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              className="relative flex flex-col items-center gap-4 rounded-3xl border border-white/20 bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQrOpen(false);
                }}
                aria-label={t.navbar.close}
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
                <p className="text-lg font-semibold text-slate-900">{t.navbar.qrTitle}</p>
                <p className="mt-1 text-sm text-slate-600">{t.navbar.qrDescription}</p>
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

export default Navbar;
