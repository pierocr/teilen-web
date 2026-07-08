"use client";

import { useLocale } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n";
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

const PREMIUM_COPY: Record<
  Locale,
  {
    discount: string;
    title: string;
    description: string;
    nowOff: string;
    period: Record<BillingPeriod, string>;
    features: string[];
    cta: string;
    note: string;
    plans: PremiumPlan[];
  }
> = {
  es: {
    discount: "50% de descuento",
    title: "Planes y precios claros siempre.",
    description:
      "Elige el plan que mejor calza contigo y desbloquea más control, reportes y funciones avanzadas para ordenar tus gastos sin límites.",
    nowOff: "Ahora 50% off",
    period: { month: "mes", year: "año" },
    features: ["Grupos ilimitados", "Reportes y exportación", "Gastos recurrentes", "Funciones con IA"],
    cta: "Descarga la app y suscríbete",
    note:
      "Referencias en dólares solo orientativas. El cobro final depende de App Store o Google Play, impuestos y moneda de tu cuenta.",
    plans: [
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
    ],
  },
  en: {
    discount: "50% discount",
    title: "Clear plans and prices.",
    description: "Choose the plan that fits you best and unlock more control, reports, and advanced tools.",
    nowOff: "Now 50% off",
    period: { month: "month", year: "year" },
    features: ["Unlimited groups", "Reports and export", "Recurring expenses", "AI features"],
    cta: "Download the app and subscribe",
    note: "USD references are approximate. Final charges depend on App Store or Google Play, taxes, and your account currency.",
    plans: [
      { id: "monthly", title: "Monthly Premium", description: "Ideal for trying Premium without a yearly commitment.", price: "$3.990", originalPrice: "$7.980", period: "month", usdReference: "Approx. ref. US$4/month" },
      { id: "annual", title: "Annual Premium", description: "The best value for using Teilen all year.", price: "$19.990", originalPrice: "$39.980", period: "year", badge: "Best value", usdReference: "Approx. ref. US$21/year", equivalent: "Approx. $1.666/month" },
    ],
  },
  de: {
    discount: "50% Rabatt",
    title: "Klare Pläne und Preise.",
    description: "Wähle den passenden Plan und schalte mehr Kontrolle, Berichte und erweiterte Funktionen frei.",
    nowOff: "Jetzt 50% Rabatt",
    period: { month: "Monat", year: "Jahr" },
    features: ["Unbegrenzte Gruppen", "Berichte und Export", "Wiederkehrende Ausgaben", "KI-Funktionen"],
    cta: "App herunterladen und abonnieren",
    note: "USD-Angaben sind nur Näherungswerte. Die finale Abbuchung hängt von App Store oder Google Play, Steuern und Kontowährung ab.",
    plans: [
      { id: "monthly", title: "Premium monatlich", description: "Ideal, um Premium ohne Jahresbindung zu testen.", price: "$3.990", originalPrice: "$7.980", period: "month", usdReference: "Ca. US$4/Monat" },
      { id: "annual", title: "Premium jährlich", description: "Der beste Wert für Teilen das ganze Jahr.", price: "$19.990", originalPrice: "$39.980", period: "year", badge: "Bester Wert", usdReference: "Ca. US$21/Jahr", equivalent: "Ca. $1.666/Monat" },
    ],
  },
  pt: {
    discount: "50% de desconto",
    title: "Planos e preços claros.",
    description: "Escolha o plano ideal e desbloqueie mais controle, relatórios e funções avançadas.",
    nowOff: "Agora 50% off",
    period: { month: "mês", year: "ano" },
    features: ["Grupos ilimitados", "Relatórios e exportação", "Despesas recorrentes", "Funções com IA"],
    cta: "Baixe o app e assine",
    note: "Referências em dólares são aproximadas. A cobrança final depende da App Store ou Google Play, impostos e moeda da sua conta.",
    plans: [
      { id: "monthly", title: "Premium mensal", description: "Ideal para testar Premium sem compromisso anual.", price: "$3.990", originalPrice: "$7.980", period: "month", usdReference: "Ref. aprox. US$4/mês" },
      { id: "annual", title: "Premium anual", description: "O melhor valor para usar Teilen o ano todo.", price: "$19.990", originalPrice: "$39.980", period: "year", badge: "Mais conveniente", usdReference: "Ref. aprox. US$21/ano", equivalent: "Equivale aprox. a $1.666/mês" },
    ],
  },
  it: {
    discount: "50% di sconto",
    title: "Piani e prezzi chiari.",
    description: "Scegli il piano più adatto e sblocca più controllo, report e funzioni avanzate.",
    nowOff: "Ora 50% off",
    period: { month: "mese", year: "anno" },
    features: ["Gruppi illimitati", "Report ed esportazione", "Spese ricorrenti", "Funzioni IA"],
    cta: "Scarica l'app e abbonati",
    note: "I riferimenti in dollari sono approssimativi. L'addebito finale dipende da App Store o Google Play, tasse e valuta dell'account.",
    plans: [
      { id: "monthly", title: "Premium mensile", description: "Ideale per provare Premium senza impegno annuale.", price: "$3.990", originalPrice: "$7.980", period: "month", usdReference: "Rif. circa US$4/mese" },
      { id: "annual", title: "Premium annuale", description: "Il miglior valore per usare Teilen tutto l'anno.", price: "$19.990", originalPrice: "$39.980", period: "year", badge: "Più conveniente", usdReference: "Rif. circa US$21/anno", equivalent: "Circa $1.666/mese" },
    ],
  },
  fr: {
    discount: "50% de réduction",
    title: "Des plans et prix clairs.",
    description: "Choisissez le plan qui vous convient et débloquez plus de contrôle, rapports et fonctions avancées.",
    nowOff: "Maintenant -50%",
    period: { month: "mois", year: "an" },
    features: ["Groupes illimités", "Rapports et export", "Dépenses récurrentes", "Fonctions IA"],
    cta: "Télécharger l'app et s'abonner",
    note: "Les références en dollars sont approximatives. Le montant final dépend de l'App Store ou Google Play, des taxes et de la devise du compte.",
    plans: [
      { id: "monthly", title: "Premium mensuel", description: "Idéal pour tester Premium sans engagement annuel.", price: "$3.990", originalPrice: "$7.980", period: "month", usdReference: "Réf. env. US$4/mois" },
      { id: "annual", title: "Premium annuel", description: "Le meilleur rapport qualité-prix pour utiliser Teilen toute l'année.", price: "$19.990", originalPrice: "$39.980", period: "year", badge: "Plus avantageux", usdReference: "Réf. env. US$21/an", equivalent: "Env. $1.666/mois" },
    ],
  },
};

export function PremiumPriceCards({ onDownload, variant = "light" }: PremiumPriceCardsProps) {
  const { locale } = useLocale();
  const copy = PREMIUM_COPY[locale];
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
              {copy.discount}
            </span>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {copy.title}
              </h3>
              <p className={`mt-2 text-sm leading-6 sm:text-base ${mutedClass}`}>
                {copy.description}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
              {copy.plans.map((plan) => (
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
                      {copy.nowOff}
                    </span>
                  </div>

                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-3xl font-black tracking-tight sm:text-4xl">{plan.price}</span>
                    <span className={`pb-1 text-sm font-bold ${plan.badge ? "text-white/75" : mutedClass}`}>
                      / {copy.period[plan.period]}
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
              {copy.features.map((feature) => (
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
              {copy.cta}
            </a>
            <button
              type="button"
              onClick={onDownload}
              className="hidden w-full rounded-2xl bg-[#009d63] px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(0,157,99,0.24)] transition hover:-translate-y-0.5 hover:bg-[#008a57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009d63] sm:block lg:w-auto"
            >
              {copy.cta}
            </button>
          </div>
          <p className={`mt-3 text-[11px] leading-5 ${mutedClass}`}>
            {copy.note}
          </p>
        </div>
      </div>
    </div>
  );
}
