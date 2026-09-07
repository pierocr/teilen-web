"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { DownloadModal } from "@/components/DownloadModal";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/components/LanguageProvider";
import { getMarketingCopy } from "@/lib/marketing-copy";
import { INSTAGRAM_URL } from "@/lib/seo";
import { MarketingIcon } from "./MarketingIcon";
import "./marketing.css";

const PUBLIC_ROUTES = new Set(["/", "/dividir-gastos", "/gastos-compartidos", "/control-de-gastos", "/recordatorios", "/metas-de-ahorro", "/premium", "/preguntas-frecuentes", "/centro-de-ayuda", "/contacto", "/privacidad", "/terminos", "/cookies"]);
const DOCUMENT_ROUTES = new Set(["/preguntas-frecuentes", "/centro-de-ayuda", "/contacto", "/privacidad", "/terminos", "/cookies"]);
const DownloadContext = createContext<() => void>(() => {});
export const useMarketingDownload = () => useContext(DownloadContext);

function Brand() {
  return <Link href="/" className="m-brand" aria-label="Teilen · Inicio"><Image src="/logo_teilen.webp" width={42} height={42} alt="" /><span>teilen</span></Link>;
}

export function PublicSiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const copy = getMarketingCopy(locale);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [menuOpen]);

  if (!PUBLIC_ROUTES.has(pathname)) return children;
  const navHrefs = ["/#la-app", "/#como-funciona", "/#planes", "/centro-de-ayuda"];
  const footerHrefs = [["/dividir-gastos", "/gastos-compartidos", "/control-de-gastos", "/metas-de-ahorro", "/premium"], ["/centro-de-ayuda", "/preguntas-frecuentes", "/contacto"], ["/privacidad", "/terminos", "/cookies"]];
  return (
    <DownloadContext.Provider value={() => setDownloadOpen(true)}>
      <div className={`marketing-site${DOCUMENT_ROUTES.has(pathname) ? " marketing-document" : ""}`}>
        <header className="m-header">
          <div className="m-wrap m-header-inner">
            <Brand />
            <nav aria-label="Principal" className="m-desktop-nav">{copy.nav.map((label, i) => <Link key={navHrefs[i]} href={navHrefs[i]}>{label}</Link>)}</nav>
            <div className="m-header-actions">
              {(pathname === "/" || pathname === "/premium") && <LanguageSwitcher className="m-language" />}
              <button className="m-button m-button-green m-header-download" onClick={() => setDownloadOpen(true)}>{copy.download}<MarketingIcon /></button>
              <div ref={menuRef} className="m-menu-root">
                <button ref={menuButton} className="m-menu-button" aria-label={menuOpen ? copy.closeMenu : copy.menu} aria-expanded={menuOpen} aria-controls="marketing-menu" onClick={() => setMenuOpen(!menuOpen)}><MarketingIcon name={menuOpen ? "close" : "menu"} /></button>
                {menuOpen && <nav id="marketing-menu" aria-label="Navegación móvil" className="m-mobile-nav">{copy.nav.map((label, i) => <Link key={navHrefs[i]} href={navHrefs[i]} onClick={() => setMenuOpen(false)}>{label}<MarketingIcon /></Link>)}<button className="m-button" onClick={() => {setMenuOpen(false);setDownloadOpen(true);}}>{copy.freeDownload}</button></nav>}
              </div>
            </div>
          </div>
        </header>
        <div className="m-page-content" lang={pathname === "/" ? locale : "es"}>{children}</div>
        <footer className="m-footer">
          <div className="m-wrap m-footer-grid">
            <div className="m-footer-brand"><Brand /><p>{copy.footerDescription}</p><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="m-text-link">Instagram <MarketingIcon /></a></div>
            {[copy.footerProduct,copy.footerHelp,copy.footerLegal].map((items, col) => <nav key={copy.footerHeadings[col]} aria-label={copy.footerHeadings[col]}><h2>{copy.footerHeadings[col]}</h2><ul>{items.map((label, i) => <li key={label}><Link href={footerHrefs[col][i]}>{label}</Link></li>)}</ul></nav>)}
          </div>
          <div className="m-wrap m-footer-bottom"><span>© {new Date().getFullYear()} Teilen. {copy.allRights}</span><span>{copy.madeIn}</span></div>
        </footer>
        <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} />
      </div>
    </DownloadContext.Provider>
  );
}
