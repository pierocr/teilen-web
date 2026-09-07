"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { useLocale } from "@/components/LanguageProvider";
import { getMarketingCopy, type MarketingCopy } from "@/lib/marketing-copy";
import { useMarketingDownload } from "./PublicSiteFrame";
import { MarketingIcon as Icon } from "./MarketingIcon";

const money = (amount: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(amount);
const caseIcons = ["users", "heart", "home", "user"];

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
        <div className="m-hero-photo"><Image src="/images/marketing/terrace.webp" alt="Amigos disfrutando un almuerzo en una terraza de Valparaíso" fill priority sizes="(max-width: 700px) 100vw, 52vw" /></div>
        <div className="m-hero-phone"><div className="m-phone-camera" /><Image src="/screens/imagen_home.png" alt="Pantalla real de Teilen: balance de grupos, saldos y gastos compartidos" width={887} height={1774} priority sizes="(max-width: 700px) 160px, 230px" /></div>
        <div className="m-dinner"><span className="m-icon-circle"><Icon name="food" /></span><div><span>{copy.dinner}</span><strong>$48.000</strong><small>{copy.dinnerDetail}</small></div></div>
      </div>
    </section>
    <div className="m-wrap m-pillars">{copy.pillars.map((text, i) => <a href={["#como-funciona", "#la-app", "/metas-de-ahorro"][i]} key={text}><Icon name={["users", "wallet", "target"][i]} /><span>{text}</span></a>)}</div>
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

function UseCases({copy}: {copy: MarketingCopy}) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = copy.cases[selected];
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % copy.cases.length;
    else if (event.key === "ArrowLeft") next = (index + copy.cases.length - 1) % copy.cases.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = copy.cases.length - 1;
    else return;
    event.preventDefault(); setSelected(next); tabRefs.current[next]?.focus();
  };
  return <section id="como-funciona" className="m-wrap m-section m-how">
    <div className="m-section-heading"><h2>{copy.sharingTitle}</h2><p>{copy.sharingIntro}</p></div>
    <div className="m-tabs" role="tablist" aria-label={copy.sharingTitle.replace(/\n/g," ")}>{copy.cases.map((item,i) => <button key={i} id={`case-tab-${i}`} type="button" ref={node => {tabRefs.current[i]=node;}} role="tab" aria-selected={selected === i} aria-controls="case-panel" tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={e => onKey(e,i)}><Icon name={caseIcons[i]} />{item.tab}</button>)}</div>
    <div key={selected} id="case-panel" role="tabpanel" tabIndex={0} aria-labelledby={`case-tab-${selected}`} className="m-case-panel">
      <div className="m-case-copy"><h3>{active.title}</h3><p>{active.description}</p><div className="m-steps">{active.steps.map((step,i) => <details key={step}><summary><span className="m-step-number">0{i+1}</span>{step}<Icon name="chevron" /></summary><p>{active.details[i]}</p></details>)}</div><Link href={active.href} className="m-text-link">{active.link}<Icon /></Link></div>
      <div className="m-demo"><div className="m-demo-card"><div className="m-demo-heading"><div><h4>{active.group}</h4><span><Icon name={caseIcons[selected]} />{active.people}</span></div><span className="m-demo-logo"><Image src="/logo_teilen.webp" width={32} height={32} alt="" /></span></div><div className="m-demo-rows">{active.rows.map((row,i) => <div className="m-demo-row" key={row}><span className="m-icon-circle"><Icon name={["home","receipt","wallet"][i]} /></span><div><strong>{row}</strong><small>{active.payers[i]}</small></div><b>{money(active.amounts[i])}</b></div>)}</div><div className="m-demo-total"><span>{active.total}</span><strong>{money(active.amounts.reduce((a,b)=>a+b,0))}</strong></div><div className="m-demo-result"><span>{active.resultLabel}</span><strong>{money(active.result)}</strong></div></div><p className="m-caption m-example-note">{copy.example}</p></div>
    </div>
    <SplitCalculator copy={copy} />
  </section>;
}

function SplitCalculator({copy}: {copy: MarketingCopy}) {
  const [amount, setAmount] = useState("48000");
  const [people, setPeople] = useState("4");
  const total = Number(amount), count = Number(people);
  const valid = amount !== "" && people !== "" && Number.isSafeInteger(total) && total >= 0 && total <= 1000000000 && Number.isInteger(count) && count >= 2 && count <= 100;
  const remainder = valid && total % count !== 0;
  return <div className="m-calculator"><h3>{copy.calculator}</h3><div className="m-calculator-fields"><label>{copy.amountLabel}<input type="number" inputMode="numeric" min={0} max={1000000000} step={1} value={amount} onChange={e=>setAmount(e.target.value)} aria-describedby="split-help" /></label><label>{copy.peopleLabel}<input type="number" inputMode="numeric" min={2} max={100} step={1} value={people} onChange={e=>setPeople(e.target.value)} aria-describedby="split-help" /></label><span className="m-equals" aria-hidden="true">=</span><output aria-live="polite" aria-atomic="true"><strong>{valid ? money(Math.floor(total/count)) : "—"}</strong><span>{copy.perPerson}</span></output></div><p id="split-help" className="m-caption">{!valid ? copy.invalid : remainder ? copy.remainder : copy.calculatorHint}</p></div>;
}

export function PlansSection({copy}: {copy: MarketingCopy}) {
  const download = useMarketingDownload();
  return <section id="planes" className="m-wrap m-section m-plans"><div className="m-centered-heading"><h2>{copy.plansTitle}</h2><p>{copy.plansIntro}</p></div><div className="m-plans-grid"><article className="m-plan"><h3>{copy.freeTitle}</h3><p>{copy.freeIntro}</p><div className="m-plan-price">$0</div><ul>{copy.freeFeatures.map(feature=><li key={feature}><span><Icon name="check" /></span>{feature}</li>)}</ul><button className="m-button m-button-outline" onClick={download}>{copy.freeCta}<Icon /></button></article><article className="m-plan m-plan-premium"><div className="m-plan-heading"><h3>{copy.premiumTitle}</h3><span>{copy.premiumBadge}</span></div><p>{copy.premiumIntro}</p><div className="m-plan-value">{copy.premiumValue}</div><ul>{copy.premiumFeatures.map(feature=><li key={feature}><span><Icon name="check" /></span>{feature}</li>)}</ul><Link href="/premium" className="m-button m-button-lime">{copy.premiumCta}<Icon /></Link></article></div><p className="m-caption m-plan-note">{copy.planNote}</p></section>;
}

export function ClosingCta({copy}: {copy: MarketingCopy}) {
  const download = useMarketingDownload();
  return <section className="m-wrap m-closing" id="descargar"><div><Image src="/logo_teilen.webp" width={54} height={54} alt="" /><h2>{copy.closingTitle}</h2><p>{copy.closingIntro}</p><button className="m-button m-button-green" onClick={download}>{copy.freeDownload}<Icon /></button><small>{copy.available}</small></div></section>;
}
