// Navbar.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const LINKS = [
  { href: "#how", label: "Cómo funciona" },
  { href: "#features", label: "Características" },
  { href: "#pricing", label: "Precios" },
  { href: "#screens", label: "Screens" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

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
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_teilen.png"
            alt="Teilen"
            width={36}
            height={36}
            priority
            className="rounded-sm"
          />
          <span className="hidden sm:block text-lg font-semibold">Teilen</span>
        </Link>

        {/* Menú desktop */}
        <ul className="hidden md:flex items-center justify-center gap-6 text-base">
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
        <div className="flex items-center gap-2">
          {/* CTA compactos también en mobile */}
          <a
            href="#"
            className="rounded-full px-3 py-1.5 text-sm border border-gray-300 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Ingresar
          </a>
          <a
            href="#"
            className="rounded-full px-3 py-1.5 text-sm text-white whitespace-nowrap"
            style={{ backgroundColor: "#019a57" }}
          >
            Crear cuenta
          </a>

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
            <a
              href="#"
              className="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-50 text-center"
              onClick={() => setOpen(false)}
            >
              Ingresar
            </a>
            <a
              href="#"
              className="rounded-full px-4 py-2 text-white text-center"
              style={{ backgroundColor: "#019a57" }}
              onClick={() => setOpen(false)}
            >
              Crear cuenta
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
