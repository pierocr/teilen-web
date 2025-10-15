import { NextResponse } from "next/server";
import { Resend } from "resend";
import WaitlistJoin from "@/emails/WaitlistJoin";

export const runtime = "edge";

// Remitente verificado en Resend
const FROM = process.env.WAITLIST_FROM || "Teilen <notificaciones@teilen.cl>";

// Acepta cualquiera de los dos nombres de env por comodidad
const NOTIFY_TO =
  process.env.WAITLIST_NOTIFY_TO || process.env.WAITLIST_TO || "";

function getBaseUrl(req: Request) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const host = req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (host && host.includes("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : "https://teilen.cl";
}

// Edge-safe: formatea fecha en UTC sin Intl.*
function formatUtcLabel(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  return `${d}-${m}-${y}, ${hh}:${mm} UTC`;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Falta RESEND_API_KEY en el entorno" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const recipients = NOTIFY_TO ? [email, NOTIFY_TO] : [email];
    const baseUrl = getBaseUrl(req);

    const createdAt = new Date();
    const createdAtLabel = formatUtcLabel(createdAt); // <- string listo para el email

    const resp = await resend.emails.send({
      from: FROM,
      to: recipients,
      subject: "¡Nuevo registro en la lista de espera de Teilen!",
      react: WaitlistJoin({
        email,
        createdAtISO: createdAt.toISOString(),
        createdAtLabel, // <- usamos este en la plantilla
        baseUrl,
      }),
    });

    if (resp.error) {
      // útil mientras depuramos; luego puedes ocultarlo
      console.error("Resend error:", resp.error);
      return NextResponse.json({ error: String(resp.error) }, { status: 500 });
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
