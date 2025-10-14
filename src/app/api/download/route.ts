import { NextRequest, NextResponse } from "next/server";

/**
 * Reemplaza estas URLs por las reales cuando publiques
 */
const IOS_APP_STORE =
  "https://apps.apple.com/app/id0000000000"; // TODO: tu App Store URL
const ANDROID_PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.tuapp.teilen"; // TODO: tu Play Store URL
const FALLBACK_LANDING = "/";

export function GET(req: NextRequest) {
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  const isIOS = /iphone|ipad|ipod|ios/.test(ua);
  const isAndroid = /android/.test(ua);

  const to = isIOS ? IOS_APP_STORE : isAndroid ? ANDROID_PLAY_STORE : FALLBACK_LANDING;
  return NextResponse.redirect(new URL(to, req.url));
}
