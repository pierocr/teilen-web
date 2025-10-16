import { NextResponse } from "next/server";

export const runtime = "edge";

// ---------- ENV / Config ----------
const RAW_FROM =
  process.env.WAITLIST_FROM ?? "Teilen <notificaciones@teilen.cl>";
// Quita comillas envolventes y espacios accidentales
const FROM = RAW_FROM.trim().replace(/^["']|["']$/g, "");

const RAW_TO =
  process.env.WAITLIST_NOTIFY_TO ?? process.env.WAITLIST_TO ?? "";
// Soporta múltiples correos separados por coma
const EXTRA_TO = RAW_TO.split(",")
  .map((s) => s.trim().replace(/^["']|["']$/g, ""))
  .filter(Boolean);

const RESEND_API_URL = "https://api.resend.com/emails";

// ---------- Helpers edge-safe ----------
function getBaseUrl(req: Request) {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const host = req.headers.get("host");
  const proto =
    req.headers.get("x-forwarded-proto") ||
    (host && host.includes("localhost") ? "http" : "https");
  return host ? `${proto}://${host}` : "https://teilen.cl";
}

function formatUtcLabel(date: Date) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const mm = String(date.getUTCMinutes()).padStart(2, "0");
  return `${d}-${m}-${y}, ${hh}:${mm} UTC`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------- Plantilla HTML (logo nuevo + texto de marca) ----------
function renderHtml({
  baseUrl,
  email,
  createdAtLabel,
}: {
  baseUrl: string;
  email: string;
  createdAtLabel: string;
}) {
  const logo = `${baseUrl}/logo_teilen.png`; // <- nuevo logo
  const hero = `${baseUrl}/hero.jpg`;
  const emailEsc = escapeHtml(email);

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nuevo registro en lista de espera · Teilen</title>
  <style>
    @media (prefers-color-scheme: dark){.bg-page{background:#0b0f0e!important}}
  </style>
</head>
<body style="margin:0;background:#f5f7f9" class="bg-page">
  <div style="padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Inter,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0"
          style="max-width:560px;background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(1,154,87,0.15);overflow:hidden;">
          
          <!-- Hero -->
          <tr><td style="padding:0;line-height:0">
            <img src="${hero}" alt="Teilen - Comparte y administra gastos" width="560" height="180" style="width:100%;height:auto;display:block;border:0" />
          </td></tr>

          <!-- Header: logo + texto de marca -->
          <tr><td style="padding:16px 24px 0">
            <table role="presentation" width="100%" style="border-collapse:collapse">
              <tr>
                <td style="vertical-align:middle;width:38px">
                  <img src="${logo}" alt="Logo Teilen" width="38" height="38" style="display:block;border:0;width:38px;height:38px" />
                </td>
                <td style="vertical-align:middle;padding-left:10px">
                  <p style="margin:0;font-size:20px;font-weight:800;letter-spacing:.2px;color:#019a57">Teilen</p>
                </td>
              </tr>
            </table>
          </td></tr>

          <!-- Título + texto -->
          <tr><td style="padding:0 24px 8px">
            <h1 style="margin:10px 0 8px;font-size:24px;line-height:30px;color:#0f1720">¡Bienvenido a la lista de espera!</h1>
            <p style="margin:0 0 8px;font-size:15px;line-height:22px;color:#334155">
              Gracias por registrarte para acceder anticipadamente a <b>Teilen</b>, la forma más simple y moderna de dividir,
              compartir y administrar tus gastos con tu gente.
            </p>
          </td></tr>

          <!-- Info encuadrada -->
          <tr><td style="padding:0 24px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="border:1px solid #e6eef0;border-radius:12px;background:#f8fbfa;overflow:hidden;">
              <tr>
                <td style="padding:12px 16px;border-bottom:1px dashed #e6eef0">
                  <span style="color:#64748b;font-size:13px;display:inline-block;width:160px">Email</span>
                  <a href="mailto:${emailEsc}" style="color:#0f1720;font-size:14px;font-weight:600;text-decoration:underline">${emailEsc}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;border-bottom:1px dashed #e6eef0">
                  <span style="color:#64748b;font-size:13px;display:inline-block;width:160px">Fecha de registro</span>
                  <span style="color:#0f1720;font-size:14px;font-weight:600">${createdAtLabel}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;">
                  <span style="color:#64748b;font-size:13px;display:inline-block;width:160px">Estado</span>
                  <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:#e9f8f1;color:#0a7e4a;font-size:12px;font-weight:700;border:1px solid #bdebd5">
                    En lista de espera
                  </span>
                </td>
              </tr>
            </table>
          </td></tr>

          <!-- CTA -->
          <tr><td style="padding:8px 24px 0">
            <a href="https://teilen.cl"
               style="display:block;text-align:center;background:#019a57;color:#ffffff;text-decoration:none;padding:12px 16px;border-radius:12px;font-size:15px;font-weight:700">
              Conoce más de Teilen
            </a>
            <p style="margin:10px 0 0;font-size:13px;color:#486174">
              ¿Te entusiasma? Invita a tus amigos; mientras más se sumen, antes liberaremos acceso.
            </p>
          </td></tr>

          <tr><td style="padding:20px 24px">
            <hr style="border:none;border-top:1px solid #ecf2f3;margin:0" />
          </td></tr>

          <!-- Legal -->
          <tr><td style="padding:0 24px 24px">
            <p style="margin:0;font-size:12px;color:#708494">
              Este es un correo transaccional. Si no reconoces este registro, escríbenos a
              <a href="mailto:soporte@teilen.cl" style="color:#019a57">soporte@teilen.cl</a>.
            </p>
            <p style="margin:10px 0 0;font-size:12px;color:#93a4af">© ${new Date().getFullYear()} Teilen · Santiago de Chile</p>
          </td></tr>

        </table>
      </td></tr>
    </table>

    <!-- Preheader oculto -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">
      Gracias por unirte a la lista de espera de Teilen.
    </div>
  </div>
</body>
</html>`;
}

// ---------- Handler ----------
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Falta RESEND_API_KEY" }, { status: 500 });
    }

    const baseUrl = getBaseUrl(req);
    const createdAtLabel = formatUtcLabel(new Date());
    const html = renderHtml({ baseUrl, email, createdAtLabel });

    // Siempre al usuario + opcional lista extra
    const to = [email, ...EXTRA_TO];

    const resp = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM, // debe ser remitente verificado en Resend
        to,
        subject: "¡Nuevo registro en la lista de espera de Teilen!",
        html,
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      return NextResponse.json(
        { error: `Resend ${resp.status}: ${txt}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Error inesperado" },
      { status: 500 }
    );
  }
}
