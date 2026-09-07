"use client";

import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getMessages, normalizeLocale, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const STORAGE_KEY = "teilen_locale";
const DEFAULT_LOCALE: Locale = "es";

const LocaleContext = createContext<LocaleContextValue | null>(null);

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function readPreferredLocale(fallback: Locale): Locale {
  try {
    const stored = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
    if (stored) return stored;
  } catch {
    // The language selector also works when browser storage is unavailable.
  }

  const cookie = document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${STORAGE_KEY}=`));
  const cookieLocale = normalizeLocale(cookie?.slice(STORAGE_KEY.length + 1));
  if (cookieLocale) return cookieLocale;

  return normalizeLocale(navigator.language.split("-")[0]) ?? fallback;
}

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  // The server and the first browser render use the same locale. Read browser
  // preferences only after hydration, before persisting anything back to storage.
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [selectedLocale, setLocale] = useState<Locale | null>(null);
  const locale = selectedLocale ?? (hasHydrated ? readPreferredLocale(initialLocale) : initialLocale);

  useEffect(() => {
    if (!hasHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Keep the current selection in React state if persistence is blocked.
    }
    document.documentElement.lang = locale;
    document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [hasHydrated, locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LanguageProvider");
  }
  return ctx;
}

export function useTranslations() {
  const { locale } = useLocale();
  return getMessages(locale);
}
