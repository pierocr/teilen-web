"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import type { MarketingCopy } from "@/lib/marketing-copy";
import { MarketingIcon as Icon } from "./MarketingIcon";

const caseIcons = ["users", "heart", "home", "user"];
const rowIcons = ["home", "receipt", "wallet"];

const money = (amount: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(amount);

export function InteractiveUseCases({ copy }: { copy: MarketingCopy }) {
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

    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="como-funciona" className="m-wrap m-section m-how">
      <div className="m-section-heading">
        <h2>{copy.sharingTitle}</h2>
        <p>{copy.sharingIntro}</p>
      </div>
      <div className="m-tabs" role="tablist" aria-label={copy.sharingTitle.replace(/\n/g, " ")}>
        {copy.cases.map((item, index) => (
          <button
            key={item.tab}
            id={`case-tab-${index}`}
            type="button"
            ref={(node) => { tabRefs.current[index] = node; }}
            role="tab"
            aria-selected={selected === index}
            aria-controls="case-panel"
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => onKey(event, index)}
          >
            <Icon name={caseIcons[index]} />
            {item.tab}
          </button>
        ))}
      </div>
      <div key={selected} id="case-panel" role="tabpanel" tabIndex={0} aria-labelledby={`case-tab-${selected}`} className="m-case-panel">
        <div className="m-case-copy">
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <div className="m-steps">
            {active.steps.map((step, index) => (
              <details key={step}>
                <summary>
                  <span className="m-step-number">0{index + 1}</span>
                  {step}
                  <Icon name="chevron" />
                </summary>
                <p>{active.details[index]}</p>
              </details>
            ))}
          </div>
          <Link href={active.href} className="m-text-link">
            {active.link}
            <Icon />
          </Link>
        </div>
        <div className="m-demo">
          <div className="m-demo-card">
            <div className="m-demo-heading">
              <div>
                <h4>{active.group}</h4>
                <span><Icon name={caseIcons[selected]} />{active.people}</span>
              </div>
              <span className="m-demo-logo"><Image src="/logo_teilen.webp" width={32} height={32} alt="" /></span>
            </div>
            <div className="m-demo-rows">
              {active.rows.map((row, index) => (
                <div className="m-demo-row" key={row}>
                  <span className="m-icon-circle"><Icon name={rowIcons[index]} /></span>
                  <div><strong>{row}</strong><small>{active.payers[index]}</small></div>
                  <b>{money(active.amounts[index])}</b>
                </div>
              ))}
            </div>
            <div className="m-demo-total"><span>{active.total}</span><strong>{money(active.amounts.reduce((a, b) => a + b, 0))}</strong></div>
            <div className="m-demo-result"><span>{active.resultLabel}</span><strong>{money(active.result)}</strong></div>
          </div>
          <p className="m-caption m-example-note">{copy.example}</p>
        </div>
      </div>
      <SplitCalculator copy={copy} />
    </section>
  );
}

function SplitCalculator({ copy }: { copy: MarketingCopy }) {
  const [amount, setAmount] = useState("48000");
  const [people, setPeople] = useState("4");
  const total = Number(amount);
  const count = Number(people);
  const valid = amount !== "" && people !== "" && Number.isSafeInteger(total) && total >= 0 && total <= 1_000_000_000 && Number.isInteger(count) && count >= 2 && count <= 100;
  const remainder = valid && total % count !== 0;

  return (
    <div className="m-calculator">
      <h3>{copy.calculator}</h3>
      <div className="m-calculator-fields">
        <label>{copy.amountLabel}<input type="number" inputMode="numeric" min={0} max={1_000_000_000} step={1} value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby="split-help" /></label>
        <label>{copy.peopleLabel}<input type="number" inputMode="numeric" min={2} max={100} step={1} value={people} onChange={(event) => setPeople(event.target.value)} aria-describedby="split-help" /></label>
        <span className="m-equals" aria-hidden="true">=</span>
        <output aria-live="polite" aria-atomic="true"><strong>{valid ? money(Math.floor(total / count)) : "—"}</strong><span>{copy.perPerson}</span></output>
      </div>
      <p id="split-help" className="m-caption">{!valid ? copy.invalid : remainder ? copy.remainder : copy.calculatorHint}</p>
    </div>
  );
}
