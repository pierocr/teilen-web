import type { Locale } from "@/lib/i18n";

export type PremiumCopy = {
  heroTitle: string;
  heroIntro: string;
  compareLink: string;
  billingLink: string;
  comparisonTitle: string;
  comparisonIntro: string;
  featureLabel: string;
  included: string;
  premiumOnly: string;
  rows: { label: string; free: string; premium: string }[];
  billingTitle: string;
  billingIntro: string;
  monthlyTitle: string;
  monthlyDescription: string;
  annualTitle: string;
  annualDescription: string;
  monthlyPrice: string;
  monthlyUsd: string;
  annualPrice: string;
  annualUsd: string;
  priceCta: string;
  billingNote: string;
  activateTitle: string;
  activateSteps: string[];
  supportLabel: string;
  supportCta: string;
};

const premiumCopy: Record<Locale, PremiumCopy> = {
  es: {
    heroTitle: "Más posibilidades.\nLa misma claridad.",
    heroIntro:
      "Organiza tus gastos con más libertad. Premium amplía tus límites y suma herramientas para llevar tus cuentas a tu manera.",
    compareLink: "Comparar planes",
    billingLink: "Ver modalidades",
    comparisonTitle: "Elige cómo quieres organizarte.",
    comparisonIntro:
      "Empieza con las herramientas esenciales o amplía tu experiencia con Premium.",
    featureLabel: "Funcionalidad",
    included: "Incluido",
    premiumOnly: "Con Premium",
    rows: [
      { label: "Gastos compartidos y personales", free: "Incluidos", premium: "Incluidos" },
      { label: "Metas de ahorro", free: "Incluidas", premium: "Incluidas" },
      { label: "Grupos", free: "Hasta 10", premium: "Ilimitados" },
      { label: "Escaneos con IA", free: "10 escaneos", premium: "Ilimitados" },
      { label: "Recordatorios", free: "Con límites", premium: "Ilimitados" },
      { label: "Gastos recurrentes y cuotas", free: "Con Premium", premium: "Incluidos" },
      { label: "Exportaciones PDF y CSV", free: "Con Premium", premium: "Incluidas" },
      { label: "Seguimiento de inversiones", free: "Con Premium", premium: "Incluido" },
    ],
    billingTitle: "Mensual o anual. Tú eliges.",
    billingIntro:
      "Las dos modalidades incluyen todos los beneficios de Premium. Consulta el precio vigente en la app antes de suscribirte.",
    monthlyTitle: "Mensual",
    monthlyDescription: "Todos los beneficios de Premium, con facturación mensual.",
    annualTitle: "Anual",
    annualDescription: "Todos los beneficios de Premium, con facturación anual.",
    monthlyPrice: "CLP $3.980",
    monthlyUsd: "≈ US$4,15 al mes",
    annualPrice: "CLP $19.990",
    annualUsd: "≈ US$21 al año",
    priceCta: "Descargar app",
    billingNote:
      "La suscripción se renueva automáticamente. Puedes gestionarla o cancelarla desde App Store o Google Play, según dónde la hayas contratado.",
    activateTitle: "Tu siguiente paso empieza en la app.",
    activateSteps: [
      "Descarga y abre Teilen",
      "Entra a Premium en la app",
      "Revisa el precio y elige tu modalidad",
    ],
    supportLabel: "¿Dudas sobre el plan?",
    supportCta: "Contáctanos",
  },
  en: {
    heroTitle: "More possibilities.\nThe same clarity.",
    heroIntro:
      "Organize your expenses with more freedom. Premium gives you higher limits and more tools to manage your money your way.",
    compareLink: "Compare plans",
    billingLink: "View billing options",
    comparisonTitle: "Choose how you get organized.",
    comparisonIntro:
      "Start with the essentials or get more from Teilen with Premium.",
    featureLabel: "Feature",
    included: "Included",
    premiumOnly: "With Premium",
    rows: [
      { label: "Shared and personal expenses", free: "Included", premium: "Included" },
      { label: "Savings goals", free: "Included", premium: "Included" },
      { label: "Groups", free: "Up to 10", premium: "Unlimited" },
      { label: "AI scans", free: "10 scans", premium: "Unlimited" },
      { label: "Reminders", free: "Limited", premium: "Unlimited" },
      { label: "Recurring expenses and installments", free: "With Premium", premium: "Included" },
      { label: "PDF and CSV exports", free: "With Premium", premium: "Included" },
      { label: "Investment tracking", free: "With Premium", premium: "Included" },
    ],
    billingTitle: "Monthly or annual. Your choice.",
    billingIntro:
      "Both options include all Premium benefits. Check the current price in the app before subscribing.",
    monthlyTitle: "Monthly",
    monthlyDescription: "All Premium benefits, billed monthly.",
    annualTitle: "Annual",
    annualDescription: "All Premium benefits, billed annually.",
    monthlyPrice: "CLP $3,980",
    monthlyUsd: "≈ US$4.15 per month",
    annualPrice: "CLP $19,990",
    annualUsd: "≈ US$21 per year",
    priceCta: "Download app",
    billingNote:
      "Your subscription renews automatically. Manage or cancel it through the App Store or Google Play, depending on where you subscribed.",
    activateTitle: "Your next step starts in the app.",
    activateSteps: [
      "Download and open Teilen",
      "Go to Premium in the app",
      "Check the price and choose your billing option",
    ],
    supportLabel: "Questions about the plan?",
    supportCta: "Contact us",
  },
  de: {
    heroTitle: "Mehr Möglichkeiten.\nDie gleiche Klarheit.",
    heroIntro:
      "Organisiere deine Ausgaben mit mehr Freiheit. Premium erweitert deine Limits und bietet dir mehr Werkzeuge, um deine Finanzen nach deinen Vorstellungen zu verwalten.",
    compareLink: "Pläne vergleichen",
    billingLink: "Zahlungsintervalle ansehen",
    comparisonTitle: "Organisiere dich so, wie es zu dir passt.",
    comparisonIntro:
      "Starte mit den wichtigsten Funktionen oder nutze mit Premium noch mehr Möglichkeiten.",
    featureLabel: "Funktion",
    included: "Enthalten",
    premiumOnly: "Mit Premium",
    rows: [
      { label: "Gemeinsame und persönliche Ausgaben", free: "Enthalten", premium: "Enthalten" },
      { label: "Sparziele", free: "Enthalten", premium: "Enthalten" },
      { label: "Gruppen", free: "Bis zu 10", premium: "Unbegrenzt" },
      { label: "Scans mit KI", free: "10 Scans", premium: "Unbegrenzt" },
      { label: "Erinnerungen", free: "Begrenzt", premium: "Unbegrenzt" },
      { label: "Wiederkehrende Ausgaben und Raten", free: "Mit Premium", premium: "Enthalten" },
      { label: "Exporte als PDF und CSV", free: "Mit Premium", premium: "Enthalten" },
      { label: "Anlagen im Überblick", free: "Mit Premium", premium: "Enthalten" },
    ],
    billingTitle: "Monatlich oder jährlich. Du entscheidest.",
    billingIntro:
      "Beide Optionen enthalten alle Vorteile von Premium. Den aktuellen Preis findest du vor dem Abschluss in der App.",
    monthlyTitle: "Monatlich",
    monthlyDescription: "Alle Vorteile von Premium, monatlich abgerechnet.",
    annualTitle: "Jährlich",
    annualDescription: "Alle Vorteile von Premium, jährlich abgerechnet.",
    monthlyPrice: "3.980 CLP",
    monthlyUsd: "≈ 4,15 US$ pro Monat",
    annualPrice: "19.990 CLP",
    annualUsd: "≈ 21 US$ pro Jahr",
    priceCta: "App laden",
    billingNote:
      "Dein Abo verlängert sich automatisch. Du kannst es im App Store oder bei Google Play verwalten oder kündigen, je nachdem, wo du es abgeschlossen hast.",
    activateTitle: "Dein nächster Schritt beginnt in der App.",
    activateSteps: [
      "Lade Teilen herunter und öffne die App",
      "Öffne Premium in der App",
      "Prüfe den Preis und wähle dein Zahlungsintervall",
    ],
    supportLabel: "Fragen zum Plan?",
    supportCta: "Kontaktiere uns",
  },
  pt: {
    heroTitle: "Mais possibilidades.\nA mesma clareza.",
    heroIntro:
      "Organize suas despesas com mais liberdade. O Premium amplia seus limites e traz mais ferramentas para cuidar das suas contas do seu jeito.",
    compareLink: "Comparar planos",
    billingLink: "Ver modalidades",
    comparisonTitle: "Escolha como se organizar.",
    comparisonIntro:
      "Comece com as ferramentas essenciais ou aproveite mais recursos com o Premium.",
    featureLabel: "Recurso",
    included: "Incluído",
    premiumOnly: "Com Premium",
    rows: [
      { label: "Despesas compartilhadas e pessoais", free: "Incluídas", premium: "Incluídas" },
      { label: "Metas de economia", free: "Incluídas", premium: "Incluídas" },
      { label: "Grupos", free: "Até 10", premium: "Ilimitados" },
      { label: "Digitalizações com IA", free: "10 digitalizações", premium: "Ilimitadas" },
      { label: "Lembretes", free: "Com limites", premium: "Ilimitados" },
      { label: "Despesas recorrentes e parcelas", free: "Com Premium", premium: "Incluídas" },
      { label: "Exportações em PDF e CSV", free: "Com Premium", premium: "Incluídas" },
      { label: "Acompanhamento de investimentos", free: "Com Premium", premium: "Incluído" },
    ],
    billingTitle: "Mensal ou anual. Você escolhe.",
    billingIntro:
      "As duas modalidades incluem todos os benefícios do Premium. Confira o preço atual no app antes de assinar.",
    monthlyTitle: "Mensal",
    monthlyDescription: "Todos os benefícios do Premium, com cobrança mensal.",
    annualTitle: "Anual",
    annualDescription: "Todos os benefícios do Premium, com cobrança anual.",
    monthlyPrice: "CLP $3.980",
    monthlyUsd: "≈ US$4,15 por mês",
    annualPrice: "CLP $19.990",
    annualUsd: "≈ US$21 por ano",
    priceCta: "Baixar app",
    billingNote:
      "A assinatura é renovada automaticamente. Você pode gerenciá-la ou cancelá-la pela App Store ou pelo Google Play, conforme a loja em que assinou.",
    activateTitle: "Seu próximo passo começa no app.",
    activateSteps: [
      "Baixe e abra o Teilen",
      "Acesse o Premium no app",
      "Confira o preço e escolha sua modalidade",
    ],
    supportLabel: "Dúvidas sobre o plano?",
    supportCta: "Fale conosco",
  },
  it: {
    heroTitle: "Più possibilità.\nLa stessa chiarezza.",
    heroIntro:
      "Organizza le tue spese con più libertà. Premium amplia i tuoi limiti e aggiunge strumenti per gestire i tuoi conti a modo tuo.",
    compareLink: "Confronta i piani",
    billingLink: "Scopri le modalità",
    comparisonTitle: "Scegli come organizzarti.",
    comparisonIntro:
      "Inizia con gli strumenti essenziali o scopri più possibilità con Premium.",
    featureLabel: "Funzionalità",
    included: "Incluso",
    premiumOnly: "Con Premium",
    rows: [
      { label: "Spese condivise e personali", free: "Incluse", premium: "Incluse" },
      { label: "Obiettivi di risparmio", free: "Inclusi", premium: "Inclusi" },
      { label: "Gruppi", free: "Fino a 10", premium: "Illimitati" },
      { label: "Scansioni con IA", free: "10 scansioni", premium: "Illimitate" },
      { label: "Promemoria", free: "Con limiti", premium: "Illimitati" },
      { label: "Spese ricorrenti e rate", free: "Con Premium", premium: "Incluse" },
      { label: "Esportazioni PDF e CSV", free: "Con Premium", premium: "Incluse" },
      { label: "Monitoraggio degli investimenti", free: "Con Premium", premium: "Incluso" },
    ],
    billingTitle: "Mensile o annuale. Scegli tu.",
    billingIntro:
      "Entrambe le modalità includono tutti i vantaggi di Premium. Controlla il prezzo attuale nell’app prima di abbonarti.",
    monthlyTitle: "Mensile",
    monthlyDescription: "Tutti i vantaggi di Premium, con fatturazione mensile.",
    annualTitle: "Annuale",
    annualDescription: "Tutti i vantaggi di Premium, con fatturazione annuale.",
    monthlyPrice: "CLP $3.980",
    monthlyUsd: "≈ US$4,15 al mese",
    annualPrice: "CLP $19.990",
    annualUsd: "≈ US$21 all’anno",
    priceCta: "Scarica l’app",
    billingNote:
      "L’abbonamento si rinnova automaticamente. Puoi gestirlo o annullarlo dall’App Store o da Google Play, in base allo store in cui lo hai sottoscritto.",
    activateTitle: "Il tuo prossimo passo inizia nell’app.",
    activateSteps: [
      "Scarica e apri Teilen",
      "Accedi a Premium nell’app",
      "Controlla il prezzo e scegli la modalità",
    ],
    supportLabel: "Domande sul piano?",
    supportCta: "Contattaci",
  },
  fr: {
    heroTitle: "Plus de possibilités.\nToujours aussi clair.",
    heroIntro:
      "Organisez vos dépenses avec plus de liberté. Premium élargit vos limites et vous offre plus d’outils pour gérer vos comptes à votre façon.",
    compareLink: "Comparer les offres",
    billingLink: "Voir les formules",
    comparisonTitle: "Choisissez votre façon de vous organiser.",
    comparisonIntro:
      "Commencez avec les outils essentiels ou profitez de plus de possibilités avec Premium.",
    featureLabel: "Fonctionnalité",
    included: "Inclus",
    premiumOnly: "Avec Premium",
    rows: [
      { label: "Dépenses partagées et personnelles", free: "Incluses", premium: "Incluses" },
      { label: "Objectifs d’épargne", free: "Inclus", premium: "Inclus" },
      { label: "Groupes", free: "Jusqu’à 10", premium: "Illimités" },
      { label: "Scans avec IA", free: "10 scans", premium: "Illimités" },
      { label: "Rappels", free: "Limités", premium: "Illimités" },
      { label: "Dépenses récurrentes et paiements échelonnés", free: "Avec Premium", premium: "Inclus" },
      { label: "Exports PDF et CSV", free: "Avec Premium", premium: "Inclus" },
      { label: "Suivi des investissements", free: "Avec Premium", premium: "Inclus" },
    ],
    billingTitle: "Mensuel ou annuel. À vous de choisir.",
    billingIntro:
      "Les deux formules comprennent tous les avantages de Premium. Consultez le prix actuel dans l’app avant de vous abonner.",
    monthlyTitle: "Mensuel",
    monthlyDescription: "Tous les avantages de Premium, avec une facturation mensuelle.",
    annualTitle: "Annuel",
    annualDescription: "Tous les avantages de Premium, avec une facturation annuelle.",
    monthlyPrice: "3 980 CLP",
    monthlyUsd: "≈ 4,15 $US par mois",
    annualPrice: "19 990 CLP",
    annualUsd: "≈ 21 $US par an",
    priceCta: "Télécharger l’app",
    billingNote:
      "Votre abonnement se renouvelle automatiquement. Vous pouvez le gérer ou le résilier depuis l’App Store ou Google Play, selon la boutique où vous l’avez souscrit.",
    activateTitle: "La suite commence dans l’app.",
    activateSteps: [
      "Téléchargez et ouvrez Teilen",
      "Accédez à Premium dans l’app",
      "Consultez le prix et choisissez votre formule",
    ],
    supportLabel: "Des questions sur l’offre ?",
    supportCta: "Contactez-nous",
  },
};

export function getPremiumCopy(locale: Locale): PremiumCopy {
  return premiumCopy[locale];
}
