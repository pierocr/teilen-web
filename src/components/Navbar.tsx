"use client";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "#how", label: "Cómo funciona" },
  { href: "#features", label: "Características" },
  { href: "#pricing", label: "Precios" },
  { href: "#screens", label: "Screens" },
];

export function Navbar() {
  return (
    // ABSOLUTE dentro del Hero, no sigue el scroll
    <header className="absolute inset-x-0 top-0 z-30 text-white">
      <nav className="mx-auto grid h-16 max-w-6xl grid-cols-3 items-center px-4 md:px-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo_teilen.png" alt="Teilen" width={40} height={40} priority
                 className="filter drop-shadow-[0_6px_16px_rgba(0,0,0,.35)]" />
          <span className="hidden sm:block text-lg font-semibold drop-shadow">
            Teilen
          </span>
        </Link>

        <ul className="hidden md:flex items-center justify-center gap-8 text-sm">
          {LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href} className="hover:opacity-85 drop-shadow">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center justify-end gap-2">
          <a href="#" className="rounded-full px-4 py-2 border border-white/50 hover:bg-white/10">
            Ingresar
          </a>
          <a href="#" className="rounded-full px-4 py-2 text-white" style={{backgroundColor:"#019a57"}}>
            Crear cuenta
          </a>
        </div>

        {/* Burger móvil compacto */}
        <button className="md:hidden justify-self-end rounded-full border border-white/40 px-3 py-2" aria-label="Abrir menú">
          ☰
        </button>
      </nav>
    </header>
  );
}
