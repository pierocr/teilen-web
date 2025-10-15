// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WaitlistJoin from "@/emails/WaitlistJoin";

// 👇 Requisito de Cloudflare Pages (next-on-pages)
export const runtime = "edge";

const FROM =
  process.env.WAITLIST_FROM || "Teilen <notificaciones@teilen.cl>";
const NOTIFY_TO = process.env.WAITLIST_NOTIFY_TO || "";

// Base URL robusta (usa env si existe o el host de la request)
function getBaseUrl(req: Request) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");

  const host = req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (host && host.includes("localhost") ? "http" : "https");

  return host ? `${proto}://${host}` : "https://teilen.cl";
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // 👇 Crear el cliente Resend dentro del handler (edge-safe)
    const resend = new Resend(process.env.RESEND_API_KEY!);

    const recipients = NOTIFY_TO ? [email, NOTIFY_TO] : [email];
    const baseUrl = getBaseUrl(req);

    const { error } = await resend.emails.send({
      from: FROM,
      to: recipients,
      subject: "¡Nuevo registro en la lista de espera de Teilen!",
      react: WaitlistJoin({
        email,
        createdAt: new Date().toISOString(),
        baseUrl, // usado por la plantilla para logo/hero
      }),
    });

    if (error) {
      return NextResponse.json({ error: String(error) }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Error inesperado" },
      { status: 500 }
    );
  }
}
