"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DownloadModal({ open, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState(""); // honeypot anti-bot
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const submitEmail = async () => {
    setError(null);
    if (!isValidEmail(email)) {
      setError("Ingresa un correo válido.");
      return;
    }
    // si el honeypot trae algo, cancelamos silenciosamente
    if (trap.trim() !== "") {
      setDone(true);
      return;
    }

    try {
      setSending(true);
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, trap }),
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(`waitlist ${res.status} ${msg}`);
      }
      setDone(true);
    } catch (err) {
      console.error(err);
      setError("Ups, no pudimos registrar tu correo. Intenta nuevamente en unos minutos.");
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
      <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl bg-white p-6 sm:p-7 fhd:p-8 shadow-2xl">
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

        <h2 className="mt-4 text-center text-2xl md:text-3xl fhd:text-4xl font-semibold">
          La app aún está en beta privada
        </h2>
        <p className="mt-2 text-center text-sm md:text-base text-black/70 leading-6">
          Estamos terminando los últimos ajustes. Déjanos tu correo y te avisamos
          en cuanto puedas descargar Teilen.
        </p>

        {/* Lista de espera */}
        <div className="mt-6 rounded-2xl border border-black/10 bg-neutral-50 p-4 fhd:p-5">
          {done ? (
            <p className="text-center text-sm text-black/70" role="status" aria-live="polite">
              ¡Listo! Te avisaremos apenas esté disponible. 💚
            </p>
          ) : (
            <>
              <p className="text-sm fhd:text-base text-black/70 text-center">
                Déjanos tu correo y te avisamos cuando abramos la descarga.
              </p>

              {/* Honeypot escondido para bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />

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
                  onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                  className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 fhd:py-3.5 outline-none ring-0 focus:border-black/20"
                  aria-invalid={!!error}
                />
                <button
                  onClick={submitEmail}
                  disabled={sending}
                  className="rounded-xl bg-black px-5 fhd:px-6 py-3 fhd:py-3.5 text-white text-sm md:text-base fhd:text-lg font-medium disabled:opacity-60"
                >
                  {sending ? "Enviando..." : "Avisarme"}
                </button>
              </div>

              {error && (
                <p className="mt-2 text-center text-[12px] text-red-600" role="alert">
                  {error}
                </p>
              )}

              <p className="mt-2 text-center text-[11px] fhd:text-xs text-black/45">
                Solo te escribiremos cuando la app esté lista.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
