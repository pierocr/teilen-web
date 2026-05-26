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
    id: "groups",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3.5 20a4.5 4.5 0 0 1 9 0M13 18.5a3.8 3.8 0 0 1 7.5 0"
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
        <path
          d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h3"
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
    id: "recurring",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M17 3v4h-4M7 21v-4h4M18.6 9A7 7 0 0 0 6.4 6.4L4 8.8M5.4 15A7 7 0 0 0 17.6 17.6L20 15.2"
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
    id: "reminders",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M8 3v3M16 3v3M4 8h16M5 5h14v15H5zM8 12h4M8 16h7"
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
    id: "goals",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8Zm0-4a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0-4 6-6"
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
    id: "currency",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M7 7h10M7 17h10M8 7c2 0 3 2 3 5s-1 5-3 5M16 7c-2 0-3 2-3 5s1 5 3 5M12 4v16"
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
    id: "notifications",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6">
        <path
          d="M18 9a6 6 0 0 0-12 0v4l-2 3h16l-2-3V9ZM10 19a2 2 0 0 0 4 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  },
];

export default function FeaturesShowcase() {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
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

  return (
    <section
      id="caracteristicas"
      ref={rootRef}
      className="relative mx-auto max-w-7xl px-5 py-10 sm:py-20 fhd:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="aurora-gradient absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 blur-[50px] opacity-60" />
      </div>

      <div className="mb-7 sm:mb-14">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
          {home.features.badge}
        </span>
        <h2 className="mt-4 text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:mt-5 sm:text-5xl fhd:text-6xl">
          {home.features.title}
          <span className="mt-2 block text-sm font-normal leading-6 text-slate-600 sm:mt-3 sm:text-xl fhd:text-2xl">
            {home.features.subtitle}
          </span>
        </h2>
      </div>

      <div>
        <ul
          className={`grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 fhd:gap-7`}
          data-inview={inView ? "true" : "false"}
        >
          {localizedFeatures.map((f, i) => (
            <li
              key={f.id}
              style={{ viewTransitionName: `feat-${f.id}` }}
              className="group relative"
            >
              <div
                className="card-3d overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_12px_34px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 sm:rounded-3xl sm:p-5 sm:shadow-[0_16px_45px_rgba(15,23,42,0.08)]"
                style={{
                  transitionDelay: `${i * 70}ms`
                }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                  <div className="feature-icon">
                    {f.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-tight tracking-tight sm:text-lg">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
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
