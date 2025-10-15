"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DownloadModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const url = useMemo(() => {
    if (typeof window === "undefined") return "https://www.teilen.cl";
    return `${window.location.origin}`;
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const submitEmail = async () => {
    if (!isValidEmail(email)) {
      alert("Ingresa un correo válido.");
      return;
    }
    try {
      setSending(true);

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("send-error");

      setDone(true);
    } catch {
      // Fallback para no perder el contacto
      const mail = `mailto:hola@teilen.cl?subject=${encodeURIComponent(
        "Lista de espera — Teilen"
      )}&body=${encodeURIComponent(
        `Hola equipo Teilen,\n\nQuiero que me avisen cuando la app esté disponible.\n\nMi correo: ${email}\n\n¡Gracias!`
      )}`;
      window.location.href = mail;
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full border border-black/10 px-3 py-1 text-sm hover:bg-black/5"
        >
          ✕
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
            Beta cerrada
          </span>
        </div>

        <h2 className="mt-3 text-center text-3xl md:text-4xl font-bold">
          Aún no disponible para descarga
        </h2>
        <p className="mt-3 text-center text-black/70">
          Estamos afinando los últimos detalles de{" "}
          <span className="text-brand font-semibold">Teilen</span> con un grupo
          reducido de usuarios. Muy pronto abriremos el acceso público en App
          Store y Play Store. Déjanos tu correo y te avisamos apenas lancemos.
        </p>

        {/* Ilustración QR deshabilitado */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <div className="relative">
            <div className="rounded-2xl bg-white p-3 shadow-soft border border-black/10 opacity-40">
              <QRCodeCanvas value={url} size={160} includeMargin />
            </div>
            <div className="absolute inset-0 grid place-items-center">
              <span className="rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white">
                Próximamente
              </span>
            </div>
          </div>
          <p className="text-xs text-black/50">
            El enlace de descarga se habilitará al abrir el acceso público.
          </p>
        </div>

        {/* Lista de espera */}
        <div className="mt-8 rounded-2xl border border-black/10 bg-neutral-50 p-4">
          {done ? (
            <p className="text-center text-sm text-black/70">
              ¡Listo! Te avisaremos apenas esté disponible. 💚
            </p>
          ) : (
            <>
              <p className="text-sm text-black/70 text-center">
                Déjanos tu correo para notificarte en el lanzamiento.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                <label className="sr-only" htmlFor="waitlist-email">
                  Correo electrónico
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  inputMode="email"
                  placeholder="tu@email.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none ring-0 focus:border-black/20"
                />
                <button
                  onClick={submitEmail}
                  disabled={sending}
                  className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-60"
                >
                  {sending ? "Enviando..." : "Avisarme"}
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-black/45">
                Usaremos tu correo solo para avisarte del lanzamiento.
              </p>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-black/50">
          Gracias por apoyar este proyecto. ✨
        </p>
      </div>
    </div>
  );
}
