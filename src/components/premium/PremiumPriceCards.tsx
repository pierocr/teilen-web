"use client";

import { UNIVERSAL_DOWNLOAD_URL } from "@/lib/seo";

type BillingPeriod = "month" | "year";

type PremiumPlan = {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice: string;
  period: BillingPeriod;
  badge?: string;
  usdReference: string;
  equivalent?: string;
};

type PremiumPriceCardsProps = {
  onDownload: () => void;
  variant?: "light" | "dark";
};

const premiumPlans: PremiumPlan[] = [
  {
    id: "monthly",
    title: "Premium mensual",
    description: "Ideal para probar Premium sin compromiso anual.",
    price: "$3.990",
    originalPrice: "$7.980",
    period: "month",
    usdReference: "Ref. aprox. US$4/mes",
  },
  {
    id: "annual",
    title: "Premium anual",
    description: "El mejor valor para usar Teilen todo el año.",
    price: "$19.990",
    originalPrice: "$39.980",
    period: "year",
    badge: "Más conveniente",
    usdReference: "Ref. aprox. US$21/año",
    equivalent: "Equivale aprox. a $1.666/mes",
  },
];

const premiumFeatures = [
  "Grupos ilimitados",
  "Reportes y exportación",
  "Gastos recurrentes",
  "Funciones con IA",
];

function getPeriodLabel(period: BillingPeriod) {
  return period === "year" ? "año" : "mes";
}

export function PremiumPriceCards({ onDownload, variant = "light" }: PremiumPriceCardsProps) {
  const isDark = variant === "dark";
  const shellClass = isDark
    ? "border-white/10 bg-white/[0.04] text-white"
    : "border-emerald-200 bg-white text-slate-950";
  const mutedClass = isDark ? "text-white/68" : "text-slate-600";
  const subtleClass = isDark ? "border-white/10 bg-white/[0.05]" : "border-emerald-100 bg-emerald-50/55";

  return (
    <div className={`rounded-[28px] border p-4 shadow-[0_18px_52px_rgba(15,23,42,0.08)] ${shellClass} sm:p-5`}>
      <div className="flex flex-col gap-4">
        <div className={`rounded-3xl border p-5 ${subtleClass}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#009d63] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-white">
              Teilen Premium
            </span>
            <span className="rounded-full bg-[#009d63]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#009d63]">
              50% de descuento
            </span>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Planes y precios claros siempre.
              </h3>
              <p className={`mt-2 text-sm leading-6 sm:text-base ${mutedClass}`}>
                Elige el plan que mejor calza contigo y desbloquea más control, reportes y funciones avanzadas para
                ordenar tus gastos sin límites.
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
              {premiumPlans.map((plan) => (
                <article
                  key={plan.id}
                  className={`relative overflow-hidden rounded-2xl border p-3 sm:rounded-3xl sm:p-4 ${
                    plan.badge
                      ? "border-[#009d63] bg-[#009d63] text-white shadow-[0_18px_44px_rgba(0,157,99,0.22)]"
                      : isDark
                        ? "border-white/10 bg-white/[0.045]"
                        : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={plan.badge ? "min-w-0 sm:pr-24 lg:pr-0" : "min-w-0"}>
                      <p className="text-sm font-extrabold leading-tight sm:text-base">{plan.title}</p>
                      <p className={`mt-1 hidden text-xs leading-5 sm:block ${plan.badge ? "text-white/80" : mutedClass}`}>
                        {plan.description}
                      </p>
                    </div>
                    {plan.badge && (
                      <span className="shrink-0 rounded-full bg-white px-2 py-1 text-[8px] font-black uppercase tracking-[0.12em] text-[#007a4d] sm:absolute sm:right-3 sm:top-3 sm:px-2.5 sm:text-[10px] sm:tracking-[0.16em]">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-bold sm:mt-4 sm:gap-2 sm:text-sm">
                    <span className={plan.badge ? "text-white/60 line-through" : `${mutedClass} line-through`}>
                      {plan.originalPrice}
                    </span>
                    <span
                      className={
                        plan.badge
                          ? "rounded-full bg-white/16 px-2 py-0.5 text-white"
                          : "rounded-full bg-emerald-50 px-2 py-0.5 text-[#009d63]"
                      }
                    >
                      Ahora 50% off
                    </span>
                  </div>

                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-3xl font-black tracking-tight sm:text-4xl">{plan.price}</span>
                    <span className={`pb-1 text-sm font-bold ${plan.badge ? "text-white/75" : mutedClass}`}>
                      / {getPeriodLabel(plan.period)}
                    </span>
                  </div>

                  {plan.equivalent && (
                    <p className={`mt-1 text-xs font-bold ${plan.badge ? "text-white/78" : "text-[#009d63]"}`}>
                      {plan.equivalent}
                    </p>
                  )}
                  <p className={`mt-2 text-[11px] font-semibold ${plan.badge ? "text-white/58" : mutedClass}`}>
                    {plan.usdReference}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={`rounded-3xl border p-4 ${subtleClass}`}>
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <ul className="grid gap-2 text-sm font-bold sm:grid-cols-2 lg:grid-cols-4">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#009d63] text-[11px] text-white">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              rel="noopener"
              className="w-full rounded-2xl bg-[#009d63] px-5 py-3 text-center text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,157,99,0.24)] transition hover:-translate-y-0.5 hover:bg-[#008a57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009d63] sm:hidden"
            >
              Descarga la app y suscríbete
            </a>
            <button
              type="button"
              onClick={onDownload}
              className="hidden w-full rounded-2xl bg-[#009d63] px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,157,99,0.24)] transition hover:-translate-y-0.5 hover:bg-[#008a57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009d63] sm:block lg:w-auto"
            >
              Descarga la app y suscríbete
            </button>
          </div>
          <p className={`mt-3 text-[11px] leading-5 ${mutedClass}`}>
            Referencias en dólares solo orientativas. El cobro final depende de App Store o Google Play, impuestos y
            moneda de tu cuenta.
          </p>
        </div>
      </div>
    </div>
  );
}
