"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";
const UNIVERSAL_DOWNLOAD_URL = "/api/download";
const APP_SCHEME = "teilen://referral";

function detectPlatform(userAgent: string) {
  const ua = userAgent.toLowerCase();
  if (/iphone|ipad|ipod|ios/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  return "other";
}

export default function ReferralPage() {
  const searchParams = useSearchParams();

  const code = useMemo(() => {
    const raw =
      searchParams.get("code") ||
      searchParams.get("ref") ||
      searchParams.get("c") ||
      "";
    return raw.trim().toUpperCase();
  }, [searchParams]);

  const appLink = useMemo(() => {
    const hasCode = Boolean(code);
    const suffix = hasCode ? `?code=${encodeURIComponent(code)}` : "";
    return `${APP_SCHEME}${suffix}`;
  }, [code]);

  useEffect(() => {
    const platform = detectPlatform(navigator.userAgent || "");
    const openApp = () => {
      window.location.href = appLink;
    };
    const fallback = () => {
      const target =
        platform === "ios"
          ? APP_STORE_URL
          : platform === "android"
          ? PLAY_STORE_URL
          : UNIVERSAL_DOWNLOAD_URL;
      window.location.href = target;
    };

    const t1 = window.setTimeout(openApp, 150);
    const t2 = window.setTimeout(fallback, 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [appLink]);

  return (
    <div className="flex min-h-dvh flex-col items-center bg-gradient-to-b from-emerald-50 via-white to-slate-50 px-5 py-14 text-slate-800">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-emerald-100/70 bg-white/90 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.06)] backdrop-blur">
        <div className="flex flex-col gap-2 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-700 ring-4 ring-emerald-50 flex items-center justify-center font-black text-xl">
            TL
          </div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Únete a Teilen con este código
          </h1>
          <p className="text-base text-slate-600">
            Abriremos la app automáticamente. Si no la tienes instalada, te llevaremos a la tienda correcta.
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Código de invitación
          </p>
          <div className="rounded-xl border-2 border-emerald-200 bg-white px-6 py-3 text-3xl font-extrabold tracking-[0.2em] text-slate-900 shadow-sm">
            {code || "----"}
          </div>
          <p className="text-sm text-slate-600">
            Compártelo o presiona “Abrir app”. Si aún no tienes Teilen, instala y vuelve: el código se mantiene.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={appLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white shadow-md transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">Abrir app</span>
          </a>
          <a
            href={UNIVERSAL_DOWNLOAD_URL}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-emerald-700 transition hover:-translate-y-[1px] hover:border-emerald-400 hover:shadow-sm"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">Ir a la tienda</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={APP_STORE_URL}
            aria-label="Descargar Teilen en App Store"
            className="inline-flex overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow transition hover:-translate-y-0.5 hover:border-emerald-400"
            rel="noopener"
          >
            <Image
              src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
              alt="Disponible en App Store"
              width={200}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <Link
            href={PLAY_STORE_URL}
            aria-label="Descargar Teilen en Google Play"
            className="inline-flex overflow-hidden rounded-2xl border border-emerald-100 bg-white p-1 shadow transition hover:-translate-y-0.5 hover:border-emerald-400"
            rel="noopener"
          >
            <Image
              src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
              alt="Disponible en Google Play"
              width={216}
              height={64}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-xs leading-6 text-slate-500">
          <p>
            Si la app ya está instalada pero no se abre automáticamente, toca “Abrir app”. Si no la tienes, toca “Ir a la tienda”.
            El código de invitación se mantiene en la URL y se aplicará cuando completes el registro.
          </p>
        </div>
      </div>
    </div>
  );
}
