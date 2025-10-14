"use client";

import { useEffect, useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DownloadModal({ open, onClose }: Props) {
  // Construimos la URL absoluta al endpoint de descarga
  const url = useMemo(() => {
    if (typeof window === "undefined") return "https://teilen.cl";
    return `${window.location.origin}/api/download`;
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

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

        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Obtén la app de <span className="text-brand">Teilen</span>
        </h2>
        <p className="mt-3 text-center text-black/70">
          Escanea el código QR para descargar.
        </p>

        <div className="mt-6 flex items-center justify-center">
          <div className="rounded-2xl bg-white p-3 shadow-soft border border-black/10">
            <QRCodeCanvas value={url} size={200} includeMargin />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <a
            href="/api/download"
            className="rounded-xl bg-black text-white px-4 py-3 text-center"
          >
            Abrir en este dispositivo
          </a>
          <button
            className="rounded-xl border border-black/10 px-4 py-3 hover:bg-black/5"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              alert("Link copiado ✅");
            }}
          >
            Copiar link
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Descarga Teilen: ${url}`
            )}`}
            target="_blank"
            className="rounded-xl border border-black/10 px-4 py-3 text-center hover:bg-black/5"
          >
            Enviar por WhatsApp
          </a>
        </div>

        <p className="mt-4 text-center text-xs text-black/50">
          Al abrir desde iOS te llevamos al App Store; en Android al Play Store.
        </p>
      </div>
    </div>
  );
}
