"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL, PLAY_STORE_URL, breadcrumbJsonLd } from "@/lib/seo";
import styles from "./SeoFeatureLanding.module.css";

const DownloadModal = dynamic(() =>
  import("./DownloadModal").then((module) => module.DownloadModal),
);

type RelatedLink = { label: string; href: string };

type SeoFeatureLandingProps = {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  sections: { title: string; text: string }[];
  relatedLinks: RelatedLink[];
  currentPath: string;
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeatureVisual({ currentPath }: { currentPath: string }) {
  if (currentPath === "/metas-de-ahorro") {
    return (
      <figure className={`${styles.visual} ${styles.exampleVisual}`}>
        <div className={styles.exampleCard}>
          <span className={styles.exampleEyebrow}>MI META DE AHORRO</span>
          <div className={styles.goalIcon} aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="m7 24 5-7 5 4 8-13M19 8h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Tu próximo viaje</h2>
          <p className={styles.goalAmount}>$450.000</p>
          <p className={styles.exampleMuted}>registrados de una meta de $750.000</p>
          <div className={styles.goalProgress} role="img" aria-label="60% de la meta registrada"><span /></div>
          <div className={styles.progressLabels}><strong>60% de tu meta</strong><span>Te faltan $300.000</span></div>
          <div className={styles.exampleDivider} />
          <p className={styles.exampleLabel}>Últimos aportes registrados</p>
          <div className={styles.contribution}><span>Aporte al viaje</span><strong>+$80.000</strong></div>
          <div className={styles.contribution}><span>Aporte al viaje</span><strong>+$40.000</strong></div>
        </div>
        <figcaption>Ejemplo ilustrativo · Tú registras tus avances.</figcaption>
      </figure>
    );
  }

  if (currentPath === "/recordatorios") {
    return (
      <figure className={`${styles.visual} ${styles.exampleVisual}`}>
        <div className={styles.exampleCard}>
          <span className={styles.exampleEyebrow}>TUS RECORDATORIOS</span>
          <h2>Lo que viene.<br />A la vista.</h2>
          <p className={styles.reminderIntro}>Tus cuentas, sus fechas y un poco más de tranquilidad.</p>
          {[
            { day: "08", title: "Internet hogar", category: "Servicios", amount: "$24.990" },
            { day: "10", title: "Arriendo", category: "Hogar", amount: "$380.000" },
            { day: "15", title: "Gimnasio", category: "Suscripciones", amount: "$29.990" },
          ].map((reminder) => (
            <div key={reminder.title} className={styles.reminder}>
              <div className={styles.calendarDay} aria-label={`${reminder.day} de septiembre`}><strong>{reminder.day}</strong><span>SEP</span></div>
              <div className={styles.reminderCopy}><strong>{reminder.title}</strong><span>{reminder.category}</span></div>
              <span className={styles.reminderAmount}>{reminder.amount}</span>
            </div>
          ))}
          <p className={styles.reminderNote}>Elige cuándo quieres recibir tus avisos.</p>
        </div>
        <figcaption>Ejemplo ilustrativo · Importes y fechas de referencia.</figcaption>
      </figure>
    );
  }

  const isReport = currentPath === "/control-de-gastos";
  return (
    <figure className={styles.visual}>
      <div className={styles.screenFrame}>
        <Image
          src={isReport ? "/screens/imagen_reporte.png" : "/screens/imagen_grupo.png"}
          alt={isReport
            ? "Reporte de un grupo en Teilen con total del mes, movimientos y distribución de gastos por categoría"
            : "Detalle de un grupo de viaje en Teilen con saldo, registro de pagos y gastos compartidos"}
          width={852}
          height={isReport ? 1846 : 1847}
          sizes="(max-width: 600px) 228px, 264px"
          priority
          className={styles.screenImage}
        />
      </div>
      <figcaption>{isReport ? "Así se ve un reporte de grupo en Teilen." : "Un grupo, todos los gastos y las cuentas claras."}</figcaption>
    </figure>
  );
}

export function SeoFeatureLanding({ badge, title, description, highlights, sections, relatedLinks, currentPath }: SeoFeatureLandingProps) {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: badge, path: currentPath },
  ]);

  return (
    <div className={styles.page}>
      <article className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">{badge}</span>
        </nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={() => setDownloadOpen(true)}>Descargar Teilen <ArrowIcon /></button>
              <a href="#como-funciona" className={styles.textLink}>Cómo funciona <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.storeNote}>Empieza gratis en <a href={APP_STORE_URL}>iOS</a> y <a href={PLAY_STORE_URL}>Android</a>.</p>
          </div>
          <FeatureVisual currentPath={currentPath} />
        </header>

        <section className={styles.highlights} aria-labelledby="highlights-title">
          <h2 id="highlights-title">Menos vueltas.<br />Más claridad.</h2>
          <ul>
            {highlights.map((item) => (
              <li key={item}>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="como-funciona" className={styles.benefits} aria-labelledby="benefits-title">
          <p className={styles.eyebrow}>ASÍ DE SIMPLE</p>
          <h2 id="benefits-title">Una forma más fácil de organizarte.</h2>
          <ol className={styles.benefitRows}>
            {sections.map((section, index) => (
              <li key={section.title}>
                <span className={styles.rowNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{section.title}</h3>
                <p>{section.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.downloadSection} aria-labelledby="download-title">
          <div>
            <p className={styles.eyebrow}>TU DÍA A DÍA, MÁS SIMPLE</p>
            <h2 id="download-title">Empieza con una cuenta más clara.</h2>
            <p>Descarga Teilen y organiza tu primer gasto, recordatorio o meta.</p>
          </div>
          <div className={styles.downloadActions}>
            <button type="button" className={styles.primaryButton} onClick={() => setDownloadOpen(true)}>Empezar gratis <ArrowIcon /></button>
            <Link href="/premium" className={styles.textLink}>Explorar Premium <ArrowIcon /></Link>
          </div>
        </section>

        <section className={styles.related} aria-labelledby="related-title">
          <div>
            <p className={styles.eyebrow}>SIGUE EXPLORANDO</p>
            <h2 id="related-title">Hay más en Teilen.</h2>
          </div>
          <div className={styles.relatedLinks}>
            {relatedLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowIcon /></Link>)}
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      </article>
      {downloadOpen ? <DownloadModal open={downloadOpen} onClose={() => setDownloadOpen(false)} /> : null}
    </div>
  );
}
