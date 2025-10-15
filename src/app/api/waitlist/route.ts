// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WaitlistJoin from "@/emails/WaitlistJoin";

export const runtime = "edge";

const FROM = process.env.WAITLIST_FROM || "Teilen <notificaciones@teilen.cl>";
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

    // 🔐 Validaciones de entorno para detectar fallos típicos en Pages
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Falta RESEND_API_KEY en el entorno de producción" },
        { status: 500 }
      );
    }
    if (!FROM.includes("@")) {
      return NextResponse.json(
        { error: "WAITLIST_FROM inválido. Debe ser un remitente verificado" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipients = NOTIFY_TO ? [email, NOTIFY_TO] : [email];
    const baseUrl = getBaseUrl(req);

    const payload = {
      from: FROM,
      to: recipients,
      subject: "¡Nuevo registro en la lista de espera de Teilen!",
      react: WaitlistJoin({
        email,
        createdAt: new Date().toISOString(),
        baseUrl,
      }),
    } as const;

    const result = await resend.emails.send(payload);

    if (result.error) {
      // 👇 Queda en logs de Cloudflare y lo devolvemos para ver el detalle (temporal)
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: String(result.error) },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Waitlist API error:", e);
    return NextResponse.json(
      { error: e?.message ?? "Error inesperado" },
      { status: 500 }
    );
  }
}
