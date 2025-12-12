// Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { DownloadModal } from "./DownloadModal";

const LINKS = [
  { href: "#how", label: "Cómo funciona" },
  { href: "#features", label: "Características" },
  { href: "#screens", label: "Screens" },
];

const UNIVERSAL_DOWNLOAD_URL = "https://www.teilen.cl/api/download";
const SHOW_LOGIN = (process.env.NEXT_PUBLIC_SHOW_LOGIN_CTA ?? "false").toLowerCase() !== "false";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 text-gray-900">
      <nav className="mx-auto flex h-16 fhd:h-20 max-w-6xl items-center justify-between px-4 md:px-5 fhd:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_teilen_navidad.png"
            alt="Teilen"
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-sm"
          />
          <span className="hidden sm:block text-lg font-semibold">Teilen</span>
        </Link>

        {/* Menú desktop */}
        <ul className="hidden md:flex items-center justify-center gap-6 text-base fhd:text-lg">
          {LINKS.map((l) => (
            <li key={l.href} className="whitespace-nowrap">
              <a
                href={l.href}
                className="hover:text-gray-700 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Acciones + Burger (siempre a la derecha) */}
        <div className="flex items-center gap-2 fhd:gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm transition hover:border-emerald-300"
            onClick={() => setQrOpen(true)}
            aria-label="Escanea el código QR para descargar"
          >
            <Image
              src="/qr-download.png"
              alt="QR"
              width={24}
              height={24}
              className="h-6 w-6 rounded bg-white"
            />
            <span className="hidden lg:inline">QR</span>
          </button>
          <button
            type="button"
            className="rounded-full px-3 py-1.5 fhd:px-4 fhd:py-2 text-sm fhd:text-base text-white whitespace-nowrap shadow-sm transition-colors"
            style={{ backgroundColor: "#019a57" }}
            onClick={() => setDownloadOpen(true)}
          >
            Descargar app
          </button>
          {SHOW_LOGIN && (
            <Link
              href="/login"
              className="hidden md:inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-emerald-700"
            >
              Iniciar sesión
            </Link>
          )}

          {/* Burger solo en mobile */}
          <button
            type="button"
            className="md:hidden ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen(true)}
          >
            {/* Ícono simple */}
            <span className="sr-only">Abrir menú</span>
            ☰
          </button>
        </div>
      </nav>

      {/* Overlay clickeable */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          aria-label="Cerrar menú"
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
          <span className="text-base font-semibold">Menú</span>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-3 text-base">
            {LINKS.map((l) => (
              <li key={l.href} className="whitespace-nowrap">
                <a
                  href={l.href}
                  className="block rounded-md px-3 py-2 hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 flex flex-col gap-2">
            {SHOW_LOGIN && (
              <Link
                href="/login"
                className="rounded-full bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-px hover:bg-emerald-700"
                onClick={() => setOpen(false)}
              >
                Iniciar sesión
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
              Descargar app
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
                aria-label="Cerrar"
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
                <p className="text-lg font-semibold text-slate-900">Escanea con tu cámara</p>
                <p className="mt-1 text-sm text-slate-600">
                  Detectamos tu sistema automáticamente
                </p>
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
