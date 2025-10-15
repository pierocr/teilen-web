// src/app/api/waitlist/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge"; // Ideal para Cloudflare Pages

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

async function sendWithResend({
  to,
  from,
  replyTo,
  subject,
  html,
  text,
}: {
  to: string[];
  from: string;      // "Nombre <correo@teilen.cl>"
  replyTo?: string;  // correo del interesado
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY missing");

  // Resend requiere un email plano en `from`, y opcionalmente `from_name`
  const match = from.match(/^(.*)<\s*([^>]+)\s*>$/);
  const from_email = match ? match[2].trim() : from;
  const from_name = match ? match[1].trim() : undefined;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from_email,
      ...(from_name ? { from_name } : {}),
      to,
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
    }

    const TO = (process.env.WAITLIST_TO || "hola@teilen.cl")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const FROM =
      process.env.WAITLIST_FROM || "Teilen <notificaciones@teilen.cl>";

    const subject = "Nuevo registro en lista de espera · Teilen";
    const text = `Nuevo interesado en la beta pública:\n\nEmail: ${email}\nFecha: ${new Date().toISOString()}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Helvetica,Arial,sans-serif;line-height:1.55">
        <h2 style="margin:0 0 8px">Nuevo registro en lista de espera</h2>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${email}</p>
        <p style="margin:0 0 8px"><strong>Fecha:</strong> ${new Date().toLocaleString("es-CL")}</p>
      </div>
    `;

    await sendWithResend({
      to: TO,
      from: FROM,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("waitlist/resend error:", err);
    return NextResponse.json(
      { error: "No se pudo enviar el correo" },
      { status: 500 }
    );
  }
}
