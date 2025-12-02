"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { toast } from "sonner";

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

function ReferralContent() {
  const searchParams = useSearchParams();
  const [redirecting, setRedirecting] = useState(false);
  const [platform, setPlatform] = useState<string>("");

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

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, []);

  useEffect(() => {
    const detectedPlatform = detectPlatform(navigator.userAgent || "");
    setPlatform(detectedPlatform);

    // Track referral page visit
    trackEvent("referral_page_view", {
      code: code || "no_code",
      platform: detectedPlatform,
      has_code: Boolean(code),
    });

    setRedirecting(true);

    const openApp = () => {
      trackEvent("referral_attempt_open_app", { code, platform: detectedPlatform });
      window.location.href = appLink;
    };

    const fallback = () => {
      const target =
        detectedPlatform === "ios"
          ? APP_STORE_URL
          : detectedPlatform === "android"
          ? PLAY_STORE_URL
          : UNIVERSAL_DOWNLOAD_URL;

      trackEvent("referral_redirect_store", {
        code,
        platform: detectedPlatform,
        target
      });

      window.location.href = target;
    };

    const t1 = window.setTimeout(openApp, 150);
    const t2 = window.setTimeout(fallback, 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [appLink, code]);

  const copyCode = async () => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      toast.success("Código copiado al portapapeles");
      trackEvent("referral_code_copied", { code });
    } catch {
      toast.error("No se pudo copiar el código");
    }
  };

  const shareViaWhatsApp = () => {
    const text = `¡Únete a Teilen! Usa mi código de invitación: ${code}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`;
    window.open(url, "_blank");
    trackEvent("referral_share_whatsapp", { code });
  };

  const shareViaTwitter = () => {
    const text = `¡Únete a Teilen con mi código de invitación: ${code}!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
    trackEvent("referral_share_twitter", { code });
  };

  const shareViaEmail = () => {
    const subject = "Únete a Teilen";
    const body = `¡Hola! Te invito a usar Teilen para dividir gastos.\n\nUsa mi código de invitación: ${code}\n\nAbre este link: ${shareUrl}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    trackEvent("referral_share_email", { code });
  };

  const handleOpenApp = () => {
    trackEvent("referral_manual_open_app", { code });
    window.location.href = appLink;
  };

  const handleGoToStore = () => {
    trackEvent("referral_manual_go_to_store", { code, platform });
    window.location.href = UNIVERSAL_DOWNLOAD_URL;
  };

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
          <div className="flex items-center gap-3">
            <div className="rounded-xl border-2 border-emerald-200 bg-white px-6 py-3 text-3xl font-extrabold tracking-[0.2em] text-slate-900 shadow-sm">
              {code || "----"}
            </div>
            {code && (
              <button
                onClick={copyCode}
                className="p-3 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 transition"
                aria-label="Copiar código"
              >
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm text-slate-600">
            Compártelo o presiona &ldquo;Abrir app&rdquo;. Si aún no tienes Teilen, instala y vuelve: el código se mantiene.
          </p>
        </div>

        {/* Loading indicator */}
        {redirecting && (
          <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2 border border-emerald-100">
            <div className="w-4 h-4 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin" />
            <span>Abriendo Teilen...</span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <button
            onClick={handleOpenApp}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white shadow-md transition hover:-translate-y-[1px] hover:shadow-lg"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">Abrir app</span>
          </button>
          <button
            onClick={handleGoToStore}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-emerald-700 transition hover:-translate-y-[1px] hover:border-emerald-400 hover:shadow-sm"
          >
            <span className="text-sm font-semibold uppercase tracking-wide">Ir a la tienda</span>
          </button>
        </div>

        {/* Share buttons */}
        {code && (
          <div className="border-t border-slate-200 pt-6">
            <p className="text-sm font-semibold text-slate-700 text-center mb-3">
              Comparte tu código de invitación
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-200 bg-white hover:bg-emerald-50 transition"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm font-medium">WhatsApp</span>
              </button>

              <button
                onClick={shareViaTwitter}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-sm font-medium">Twitter</span>
              </button>

              <button
                onClick={shareViaEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
              >
                <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">Email</span>
              </button>
            </div>
          </div>
        )}

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

export default function ReferralClient() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-white" />}>
      <ReferralContent />
    </Suspense>
  );
}
