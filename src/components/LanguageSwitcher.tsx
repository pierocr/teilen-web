"use client";

import { useEffect, useRef, useState } from "react";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
import { useLocale, useTranslations } from "@/components/LanguageProvider";

type LanguageSwitcherProps = {
  className?: string;
  buttonClassName?: string;
};

const FLAGS: Record<(typeof SUPPORTED_LOCALES)[number], string> = {
  es: "🇪🇸",
  en: "🇺🇸",
  pt: "🇧🇷",
};

export function LanguageSwitcher({ className = "", buttonClassName = "" }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocale();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`relative inline-flex ${className}`}
    >
      <button
        type="button"
        aria-label={t.language.select}
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 ${buttonClassName}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span aria-hidden className="text-base leading-none">
          {FLAGS[locale]}
        </span>
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M5.5 7.5L10 12l4.5-4.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
          role="menu"
          aria-label={t.language.select}
        >
          <div className="flex flex-col items-center gap-1">
            {SUPPORTED_LOCALES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setLocale(item);
                  setOpen(false);
                }}
                aria-label={t.language.names[item]}
                title={t.language.names[item]}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-base transition ${
                  locale === item
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
                role="menuitem"
              >
                <span aria-hidden>{FLAGS[item]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
