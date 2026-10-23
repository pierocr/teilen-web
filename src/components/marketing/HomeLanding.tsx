"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLocale } from "@/components/LanguageProvider";
import { getMarketingCopy, type MarketingCopy } from "@/lib/marketing-copy";
import { useMarketingDownload } from "./PublicSiteFrame";
import { MarketingIcon as Icon } from "./MarketingIcon";

// This below-the-fold section contains stateful tabs and a calculator. Loading it
// separately keeps that interaction code out of the landing page's initial chunk.
const UseCases = dynamic(() =>
  import("./InteractiveUseCases").then((module) => module.InteractiveUseCases),
);

export function HomeLanding() {
  const { locale } = useLocale();
  const copy = getMarketingCopy(locale);
  const download = useMarketingDownload();
  const faqData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: copy.faqs.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <div className="m-home">
    <section className="m-wrap m-hero" aria-labelledby="hero-title">
      <div className="m-hero-copy">
        <h1 id="hero-title">{copy.hero.map((line, i) => <span key={line} className={i === 2 ? "m-green" : undefined}>{line}</span>)}</h1>
        <p>{copy.intro}</p>
        <div className="m-hero-actions"><button className="m-button" onClick={download}>{copy.freeDownload}<Icon /></button><a className="m-text-link" href="#como-funciona">{copy.how}<Icon name="down" /></a></div>
        <span className="m-caption m-available">{copy.available}</span>
      </div>
      <div className="m-hero-visual">
        <div className="m-hero-photo"><Image src="/images/marketing/terrace.webp" alt="Amigos disfrutando un almuerzo en una terraza de Valparaíso" fill priority sizes="(max-width: 700px) calc(100vw - 40px), 52vw" /></div>
        <div className="m-hero-phone"><div className="m-phone-camera" /><Image src="/screens/imagen_home.png" alt="Pantalla real de Teilen: balance de grupos, saldos y gastos compartidos" width={887} height={1774} sizes="(max-width: 700px) 160px, 230px" /></div>
        <div className="m-dinner"><span className="m-icon-circle"><Icon name="food" /></span><div><span>{copy.dinner}</span><strong>$48.000</strong><small>{copy.dinnerDetail}</small></div></div>
      </div>
    </section>
    <div className="m-wrap m-pillars">{copy.pillars.map((text, i) => <a href={["/gastos-compartidos", "#la-app", "/metas-de-ahorro"][i]} key={text}><Icon name={["users", "wallet", "target"][i]} /><span>{text}</span></a>)}</div>
    <UseCases copy={copy} />
    <section id="la-app" className="m-wrap m-section">
      <div className="m-section-heading"><h2>{copy.featuresTitle}</h2><p>{copy.featuresIntro}</p></div>
      <div className="m-features-grid">
        <article className="m-goal-panel"><h3>{copy.goalTitle}</h3><p>{copy.goalDescription}</p><div className="m-goal-example"><span className="m-goal-icon"><Icon name="mountain" /></span><div><h4>{copy.goalName}</h4><p><strong>$180.000</strong> {copy.goalOf} $300.000</p><div className="m-progress-row"><progress max={300000} value={180000} aria-label={copy.goalName} /><span>60%</span></div><small>{copy.goalExample}</small></div></div><Link href="/metas-de-ahorro" className="m-text-link">{copy.goalLink}<Icon /></Link></article>
        <div className="m-feature-list">{copy.features.map((feature, i) => <Link href={feature.href} className="m-feature-row" key={feature.title}><Icon name={["receipt", "calendar", "chart"][i]} /><div><h3>{feature.title}</h3><p>{feature.description}</p></div><Icon className="m-row-arrow" /></Link>)}</div>
      </div>
      <div className="m-life"><div><h2>{copy.life}</h2><p>{copy.lifeIntro}</p></div><div className="m-life-image"><Image src="/images/marketing/coast.webp" alt="Un grupo de amigos pasea por la costa chilena al atardecer" fill sizes="(max-width: 700px) 100vw, 55vw" /></div></div>
    </section>
    <PlansSection copy={copy} />
    <section className="m-wrap m-section m-faq" id="preguntas"><div><h2>{copy.faqTitle}</h2><Link href="/preguntas-frecuentes" className="m-text-link">{copy.faqMore}<Icon /></Link></div><div className="m-faq-list">{copy.faqs.map(item => <details key={item.question}><summary>{item.question}<Icon name="plus" /></summary><p>{item.answer}</p></details>)}</div></section>
    <ClosingCta copy={copy} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqData).replace(/</g, "\\u003c")}} />
  </div>;
}

export function PlansSection({copy}: {copy: MarketingCopy}) {
  const download = useMarketingDownload();
  return <section id="planes" className="m-wrap m-section m-plans"><div className="m-centered-heading"><h2>{copy.plansTitle}</h2><p>{copy.plansIntro}</p></div><div className="m-plans-grid"><article className="m-plan"><h3>{copy.freeTitle}</h3><p>{copy.freeIntro}</p><div className="m-plan-price">$0</div><ul>{copy.freeFeatures.map(feature=><li key={feature}><span><Icon name="check" /></span>{feature}</li>)}</ul><button className="m-button m-button-outline" onClick={download}>{copy.freeCta}<Icon /></button></article><article className="m-plan m-plan-premium"><div className="m-plan-heading"><h3>{copy.premiumTitle}</h3><span>{copy.premiumBadge}</span></div><p>{copy.premiumIntro}</p><div className="m-plan-value"><strong>{copy.premiumPriceMonthly}</strong><span>{copy.premiumPriceMonthlyUsd}</span><small>{copy.premiumPriceAnnual}</small></div><ul>{copy.premiumFeatures.map(feature=><li key={feature}><span><Icon name="check" /></span>{feature}</li>)}</ul><Link href="/premium" className="m-button m-button-lime">{copy.premiumCta}<Icon /></Link></article></div><p className="m-caption m-plan-note">{copy.planNote}</p></section>;
}

export function ClosingCta({copy}: {copy: MarketingCopy}) {
  const download = useMarketingDownload();
  return <section className="m-wrap m-closing" id="descargar"><div><Image src="/logo_teilen.webp" width={54} height={54} alt="" /><h2>{copy.closingTitle}</h2><p>{copy.closingIntro}</p><button className="m-button m-button-green" onClick={download}>{copy.freeDownload}<Icon /></button><small>{copy.available}</small></div></section>;
}
