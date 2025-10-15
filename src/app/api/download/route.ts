import { NextRequest, NextResponse } from "next/server";

/**
 * Cloudflare Pages (next-on-pages) requiere Edge Runtime en rutas no estáticas.
 * Además forzamos que sea siempre dinámica para que no intente prerender.
 */
export const runtime = "edge";
export const dynamic = "force-dynamic";

/**
 * Reemplaza estas URLs por las reales cuando publiques.
 */
const IOS_APP_STORE = "https://apps.apple.com/app/id0000000000"; // TODO: tu App Store URL
const ANDROID_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.tuapp.teilen"; // TODO: tu Play Store URL
const FALLBACK_LANDING = "/";

/**
 * Detección simple por User-Agent (Edge compatible).
 */
function detectTarget(ua: string): "ios" | "android" | "fallback" {
  const u = ua.toLowerCase();
  if (/iphone|ipad|ipod|ios/.test(u)) return "ios";
  if (/android/.test(u)) return "android";
  return "fallback";
}

export function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const platform = detectTarget(ua);

  const to =
    platform === "ios"
      ? IOS_APP_STORE
      : platform === "android"
      ? ANDROID_PLAY_STORE
      : FALLBACK_LANDING;

  // Construye URL absoluta incluso si 'to' es relativo (como "/")
  const target = new URL(to, req.url);

  // Redirige con 307 (mantiene el método si lo cambias a POST en el futuro)
  const res = NextResponse.redirect(target, 307);
  // Control de caché para que no se quede pegado en CDNs
  res.headers.set("Cache-Control", "no-store");

  return res;
}
