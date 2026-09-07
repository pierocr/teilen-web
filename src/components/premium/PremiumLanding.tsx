"use client";

import Link from "next/link";
import { useLocale } from "@/components/LanguageProvider";
import { MarketingIcon } from "@/components/marketing/MarketingIcon";
import { useMarketingDownload } from "@/components/marketing/PublicSiteFrame";
import { getMarketingCopy } from "@/lib/marketing-copy";
import { PremiumPriceCards } from "./PremiumPriceCards";
import { getPremiumCopy } from "./premium-copy";
import styles from "./premium-marketing.module.css";

export function PremiumLanding() {
  const { locale } = useLocale();
  const marketing = getMarketingCopy(locale);
  const copy = getPremiumCopy(locale);
  const download = useMarketingDownload();

  return (
    <div className={styles.page} lang={locale}>
      <div className={styles.wrap}>
        <section className={styles.hero} aria-labelledby="premium-title">
          <div className={styles.heroCopy}>
            <h1 id="premium-title" className={styles.heroTitle}>{copy.heroTitle}</h1>
            <p className={styles.heroIntro}>{copy.heroIntro}</p>
            <div className={styles.heroActions}>
              <a href="#modalidades" className={styles.button}>{copy.billingLink}<MarketingIcon /></a>
              <a href="#comparar" className={styles.textLink}>{copy.compareLink}<MarketingIcon name="down" /></a>
            </div>
            <p className={styles.availability}>{marketing.available}</p>
          </div>

          <aside className={styles.membership} aria-label={marketing.premiumTitle}>
            <div className={styles.membershipTop}>
              <span className={styles.membershipBrand}>teilen<span>Premium</span></span>
              <span className={styles.badge}>{marketing.premiumBadge}</span>
            </div>
            <p className={styles.membershipTitle}>{marketing.premiumValue}</p>
            <ul className={styles.benefitList}>
              {marketing.premiumFeatures.map((feature) => (
                <li key={feature}><span className={styles.checkCircle}><MarketingIcon name="check" /></span>{feature}</li>
              ))}
            </ul>
            <div className={styles.membershipBottom}>
              <span aria-hidden="true" className={styles.membershipMark}>✳</span>
              <p>{marketing.premiumIntro}</p>
            </div>
          </aside>
        </section>

        <section id="comparar" className={styles.comparison} aria-labelledby="premium-comparison-title">
          <div className={styles.sectionHeader}>
            <h2 id="premium-comparison-title" className={styles.heading}>{copy.comparisonTitle}</h2>
            <p className={styles.sectionIntro}>{copy.comparisonIntro}</p>
          </div>
          <div className={styles.tableFrame}>
            <table className={styles.comparisonTable}>
              <caption className={styles.visuallyHidden}>{copy.comparisonTitle}</caption>
              <thead>
                <tr>
                  <th scope="col">{copy.featureLabel}</th>
                  <th scope="col">{marketing.freeTitle}</th>
                  <th scope="col" className={styles.premiumHeading}>{marketing.premiumTitle}</th>
                </tr>
              </thead>
              <tbody>
                {copy.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.free}</td>
                    <td className={styles.premiumCell}><span><MarketingIcon name="check" />{row.premium}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>{marketing.planNote}</p>
          <button type="button" className={styles.freeLink} onClick={download}>{marketing.freeCta}<MarketingIcon /></button>
        </section>

        <PremiumPriceCards onDownload={download} />

        <section className={styles.activation} aria-labelledby="premium-activation-title">
          <h2 id="premium-activation-title" className={styles.activationTitle}>{copy.activateTitle}</h2>
          <ol className={styles.activationSteps}>
            {copy.activateSteps.map((step, index) => (
              <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
            ))}
          </ol>
        </section>
        <div className={styles.support}>
          <p>{copy.supportLabel}</p>
          <Link href="/contacto" className={styles.textLink}>{copy.supportCta}<MarketingIcon /></Link>
        </div>
      </div>
    </div>
  );
}
