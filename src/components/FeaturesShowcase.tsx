"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

type Feature = {
  id: string;
  icon: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "scan",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M4 7V5a1 1 0 0 1 1-1h2M20 7V5a1 1 0 0 0-1-1h-2M4 17v2a1 1 0 0 0 1 1h2M20 17v2a1 1 0 0 1-1 1h-2M7 8h10M7 12h10M7 16h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "pay",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M3 7h18v10H3zM3 10h18M7 15h4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "rules",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 7a3 3 0 110-6 3 3 0 010 6zM4 22a4 4 0 014-4h8a4 4 0 014 4M3 10h6M15 10h6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
  {
    id: "audit",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M3 12l6 6L21 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "personal",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 7v5l3.5 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14.5l-2.5 2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
];

export default function FeaturesShowcase() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const localizedFeatures = FEATURES.map((feature) => ({
    ...feature,
    ...(home.features.items.find((item) => item.id === feature.id) ?? {
      title: feature.id,
      desc: "",
    }),
  }));

  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // Lazy load video only when it's near viewport
  useEffect(() => {
    if (!videoRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoadVideo(true);
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before visible
    );
    io.observe(videoRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="caracteristicas"
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-5 py-20 sm:py-24 fhd:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora-gradient absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 blur-[50px] opacity-60" />
      </div>

      <div className="mb-10 sm:mb-14">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
          {home.features.badge}
        </span>
        <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl fhd:text-6xl">
          {home.features.title}
          <span className="mt-3 block text-lg font-normal text-slate-600 sm:text-xl fhd:text-2xl">
            {home.features.subtitle}
          </span>
        </h2>
      </div>

      <div className="grid items-start gap-10 fhd:gap-12 lg:grid-cols-2">
        <div className="relative lg:sticky lg:top-28">
          <div className="mx-auto w-fit rounded-[2.8rem] border border-slate-100 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
            <div className="phone-frame group mx-auto w-[200px] sm:w-[240px] md:w-[280px] fhd:w-[320px]">
            <video
              ref={videoRef}
              className="phone-screen"
              {...(shouldLoadVideo && { src: "/videos/teilen-demo.mp4" })}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-label={home.features.videoAriaLabel}
            >
              {home.features.unsupportedVideoText}
            </video>
            <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] ring-1 ring-black/10 shadow-2xl" />
          </div>
          </div>
        </div>

        <ul
          className={`grid gap-4 sm:gap-6 fhd:gap-7`}
          data-inview={inView ? "true" : "false"}
        >
          {localizedFeatures.map((f, i) => (
            <li
              key={f.id}
              style={{ viewTransitionName: `feat-${f.id}` }}
              className="group relative"
            >
              <div
                className="card-3d overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500"
                style={{
                  transitionDelay: `${i * 70}ms`
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="feature-icon">
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {f.title}
                      </h3>
                      {f.pill && (
                        <span className="badge">{f.pill}</span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {f.desc}
                    </p>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-10 animate-pulse-slow bg-[conic-gradient(var(--tw-gradient-stops))] from-emerald-300/20 via-teal-400/10 to-emerald-300/20" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
