// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WaitlistJoin from "@/emails/WaitlistJoin";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Remitente verificado en Resend (puedes dejar el nombre de marca)
const FROM =
  process.env.WAITLIST_FROM || "Teilen <notificaciones@teilen.cl>";

// Si quieres que además te llegue a ti como notificación, define esto
const NOTIFY_TO = process.env.WAITLIST_NOTIFY_TO || "";

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

    // Destinatarios: siempre al usuario; opcionalmente a tu inbox
    const recipients = NOTIFY_TO ? [email, NOTIFY_TO] : [email];

    const baseUrl = getBaseUrl(req);

    const { error } = await resend.emails.send({
      from: FROM,
      to: recipients,
      subject: "¡Nuevo registro en la lista de espera de Teilen!",
      react: WaitlistJoin({
        email,
        createdAt: new Date().toISOString(),
        baseUrl, // usado para construir las URLs absolutas de imágenes
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
