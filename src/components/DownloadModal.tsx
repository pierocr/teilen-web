"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/seo";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function DownloadModal({ open, onClose }: Props) {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    // A native modal keeps keyboard focus inside and makes the page behind it inert.
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-3xl overflow-y-auto overscroll-contain rounded-[28px] border border-white/70 bg-white p-0 text-slate-900 shadow-[0_24px_100px_rgba(15,23,42,0.3)] backdrop:bg-slate-950/65 backdrop:backdrop-blur-sm"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom
        ) {
          onClose();
        }
      }}
    >
      <div className="relative p-6 sm:p-9">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={home.downloadModal.close}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-950"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="mb-6 flex items-center gap-3 pr-12">
          <Image src="/logo_teilen.png" alt="Teilen" width={44} height={44} className="h-11 w-11" />
          <span className="text-sm font-semibold text-emerald-700">{home.downloadModal.badge}</span>
        </div>

        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 id={titleId} className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {home.downloadModal.title}
            </h2>
            <p id={descriptionId} className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {home.downloadModal.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE_URL}
                aria-label={home.stores.appStoreAria}
                className="inline-flex rounded-lg transition hover:opacity-80"
                rel="noopener"
              >
                <Image
                  src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                  alt={home.stores.appStoreAlt}
                  width={144}
                  height={48}
                  className="h-12 w-36"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                aria-label={home.stores.googlePlayAria}
                className="inline-flex rounded-lg transition hover:opacity-80"
                rel="noopener"
              >
                <Image
                  src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                  alt={home.stores.googlePlayAlt}
                  width={162}
                  height={48}
                  className="h-12 w-[162px]"
                />
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-5 text-center">
            <div className="mx-auto w-fit rounded-2xl bg-white p-3">
              <Image
                src="/qr-download.png"
                alt={home.downloadModal.qrAlt}
                width={224}
                height={224}
                className="h-auto w-48 max-w-full"
              />
            </div>
            <p className="mt-4 text-sm font-bold text-emerald-900">{home.page.cta.qrTitle}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{home.downloadModal.badge}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}
