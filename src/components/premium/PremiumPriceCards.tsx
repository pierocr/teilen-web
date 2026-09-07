"use client";

import { useLocale } from "@/components/LanguageProvider";
import { MarketingIcon } from "@/components/marketing/MarketingIcon";
import { getMarketingCopy } from "@/lib/marketing-copy";
import { getPremiumCopy } from "./premium-copy";
import styles from "./premium-marketing.module.css";

type PremiumPriceCardsProps = {
  onDownload: () => void;
};

export function PremiumPriceCards({ onDownload }: PremiumPriceCardsProps) {
  const { locale } = useLocale();
  const marketing = getMarketingCopy(locale);
  const copy = getPremiumCopy(locale);
  const plans = [
    { title: copy.monthlyTitle, description: copy.monthlyDescription, annual: false },
    { title: copy.annualTitle, description: copy.annualDescription, annual: true },
  ];

  return (
    <section id="modalidades" className={styles.billing} aria-labelledby="premium-billing-title">
      <div className={styles.billingHeader}>
        <h2 id="premium-billing-title" className={styles.heading}>{copy.billingTitle}</h2>
        <p>{copy.billingIntro}</p>
      </div>
      <div className={styles.billingGrid}>
        {plans.map((plan) => (
          <article key={plan.title} className={`${styles.planCard} ${plan.annual ? styles.annualCard : ""}`}>
            <div className={styles.planTop}>
              <span className={styles.planLabel}>{marketing.premiumTitle}</span>
              <span className={styles.planIcon}><MarketingIcon name={plan.annual ? "calendar" : "receipt"} /></span>
            </div>
            <h3 className={styles.planTitle}>{plan.title}</h3>
            <p className={styles.planDescription}>{plan.description}</p>
            <div className={styles.planPrice}><span>{copy.priceLabel}</span><MarketingIcon name="arrow" /></div>
            <button
              type="button"
              className={`${styles.button} ${plan.annual ? styles.limeButton : styles.outlineButton}`}
              onClick={onDownload}
              aria-label={`${copy.priceCta}: ${plan.title}`}
            >
              {copy.priceCta}<MarketingIcon />
            </button>
          </article>
        ))}
      </div>
      <p className={styles.billingNote}>{copy.billingNote}</p>
    </section>
  );
}
