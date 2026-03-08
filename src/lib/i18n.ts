export const SUPPORTED_LOCALES = ["es", "en", "de", "pr", "ut", "fr"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
const LOCALE_ALIASES: Record<string, Locale> = {
  pt: "pr",
  it: "ut",
};

type LocalizedUseCase = {
  title: string;
  description: string;
  bullets: string[];
};

type Messages = {
  language: {
    select: string;
    names: Record<Locale, string>;
  };
  navbar: {
    links: {
      premium: string;
      how: string;
      features: string;
      screens: string;
    };
    qrLabel: string;
    qrShort: string;
    downloadApp: string;
    login: string;
    openMenu: string;
    menuTitle: string;
    closeMenu: string;
    close: string;
    qrTitle: string;
    qrDescription: string;
  };
  footer: {
    stores: {
      appStoreAria: string;
      googlePlayAria: string;
      appStoreAlt: string;
      googlePlayAlt: string;
    };
    brandDescription: string;
    newsletterAria: string;
    emailPlaceholder: string;
    join: string;
    columns: {
      product: string;
      useCases: string;
      help: string;
      company: string;
    };
    links: {
      product: string[];
      help: {
        center: string;
        contact: string;
        faq: string;
      };
      company: {
        about: string;
        blog: string;
        press: string;
        jobs: string;
        legal: string;
      };
      legal: {
        privacy: string;
        terms: string;
        cookies: string;
      };
    };
    useCases: LocalizedUseCase[];
    useCaseModal: {
      label: string;
      startWithCase: string;
      close: string;
    };
    instagram: string;
  };
};

const baseMessages: Record<"es" | "en" | "pr", Messages> = {
  es: {
    language: {
      select: "Seleccionar idioma",
      names: {
        es: "Español",
        en: "English",
        de: "Deutsch",
        pr: "Português",
        ut: "Italiano",
        fr: "Français",
      },
    },
    navbar: {
      links: {
        premium: "Premium",
        how: "Cómo funciona",
        features: "Características",
        screens: "Pantallas",
      },
      qrLabel: "Escanea el código QR para descargar",
      qrShort: "QR",
      downloadApp: "Descargar app",
      login: "Iniciar sesión",
      openMenu: "Abrir menú",
      menuTitle: "Menú",
      closeMenu: "Cerrar menú",
      close: "Cerrar",
      qrTitle: "Escanea con tu cámara",
      qrDescription: "Detectamos tu sistema automáticamente",
    },
    footer: {
      stores: {
        appStoreAria: "Descargar en App Store",
        googlePlayAria: "Obtener en Google Play",
        appStoreAlt: "Disponible en App Store",
        googlePlayAlt: "Disponible en Google Play",
      },
      brandDescription: "La forma moderna de dividir gastos con amigos, pareja y equipos. Claro, rápido y sin drama.",
      newsletterAria: "Suscripción a novedades",
      emailPlaceholder: "Tu correo",
      join: "Unirme",
      columns: {
        product: "Producto",
        useCases: "Casos de uso",
        help: "Ayuda",
        company: "Empresa",
      },
      links: {
        product: [
          "Estadísticas claras de gasto",
          "Solicitudes de pago fáciles",
          "Seguimiento automático",
          "Divide gastos de grupo",
          "Tarjeta virtual gratis",
        ],
        help: {
          center: "Centro de ayuda",
          contact: "Contáctanos",
          faq: "Preguntas frecuentes",
        },
        company: {
          about: "Sobre Teilen",
          blog: "Blog",
          press: "Prensa",
          jobs: "Empleos",
          legal: "Documentos legales",
        },
        legal: {
          privacy: "Privacidad",
          terms: "Términos",
          cookies: "Cookies",
        },
      },
      useCases: [
        {
          title: "Para parejas",
          description: "Lleven el control sin mezclarlo con las finanzas personales.",
          bullets: [
            "Crea un grupo “Nosotros” y registra arriendo, súper y suscripciones.",
            "Divide gastos al 50/50 o con porcentajes distintos según ingresos.",
            "Ve saldos claros y liquida con un clic sin perder el historial.",
          ],
        },
        {
          title: "Vacaciones en grupo",
          description: "Organiza viajes sin pelear por quién pagó qué.",
          bullets: [
            "Grupo “Viaje a Medellín”: sube vuelos, Airbnb y traslados.",
            "Define cuotas iguales o por persona (ej. alguien se queda menos días).",
            "Recibe un saldo único por cada integrante para cerrar el viaje.",
          ],
        },
        {
          title: "Compañeros de piso",
          description: "Arriendo, cuentas y compras comunes siempre equilibradas.",
          bullets: [
            "Gastos fijos (luz, agua, internet) y variables (limpieza, insumos).",
            "Asigna quién pagó y cuánto le toca a cada roomie.",
            "Liquidación mensual automática con recordatorios claros.",
          ],
        },
        {
          title: "Cuentas de restaurante",
          description: "Evita la calculadora grupal y los cobros cruzados.",
          bullets: [
            "Saca foto del total y reparte por persona o por ítem.",
            "Incluye propina e impuestos sin perder proporciones.",
            "Recibe QR/links para que cada quien pague su parte al instante.",
          ],
        },
        {
          title: "Freelancers",
          description: "Separa gastos del proyecto y cobra sin confusión.",
          bullets: [
            "Crea un proyecto y registra gastos reembolsables y tus honorarios.",
            "Adjunta recibos y marca qué corresponde cobrar al cliente.",
            "Genera un saldo consolidado para enviar en tu factura.",
          ],
        },
      ],
      useCaseModal: {
        label: "Caso de uso",
        startWithCase: "Empezar con este caso",
        close: "Cerrar",
      },
      instagram: "Instagram",
    },
  },
  en: {
    language: {
      select: "Select language",
      names: {
        es: "Spanish",
        en: "English",
        de: "German",
        pr: "Portuguese",
        ut: "Italian",
        fr: "French",
      },
    },
    navbar: {
      links: {
        premium: "Premium",
        how: "How it works",
        features: "Features",
        screens: "Screens",
      },
      qrLabel: "Scan the QR code to download",
      qrShort: "QR",
      downloadApp: "Download app",
      login: "Log in",
      openMenu: "Open menu",
      menuTitle: "Menu",
      closeMenu: "Close menu",
      close: "Close",
      qrTitle: "Scan with your camera",
      qrDescription: "We detect your system automatically",
    },
    footer: {
      stores: {
        appStoreAria: "Download on the App Store",
        googlePlayAria: "Get it on Google Play",
        appStoreAlt: "Available on the App Store",
        googlePlayAlt: "Available on Google Play",
      },
      brandDescription: "The modern way to split expenses with friends, partners and teams. Clear, fast and drama-free.",
      newsletterAria: "News subscription",
      emailPlaceholder: "Your email",
      join: "Join",
      columns: {
        product: "Product",
        useCases: "Use cases",
        help: "Help",
        company: "Company",
      },
      links: {
        product: [
          "Clear spending insights",
          "Simple payment requests",
          "Automatic tracking",
          "Split group expenses",
          "Free virtual card",
        ],
        help: {
          center: "Help center",
          contact: "Contact us",
          faq: "FAQ",
        },
        company: {
          about: "About Teilen",
          blog: "Blog",
          press: "Press",
          jobs: "Jobs",
          legal: "Legal documents",
        },
        legal: {
          privacy: "Privacy",
          terms: "Terms",
          cookies: "Cookies",
        },
      },
      useCases: [
        {
          title: "For couples",
          description: "Stay in control without mixing shared and personal finances.",
          bullets: [
            "Create a “Us” group and track rent, groceries and subscriptions.",
            "Split 50/50 or assign custom percentages based on income.",
            "See clear balances and settle in one tap without losing history.",
          ],
        },
        {
          title: "Group trips",
          description: "Plan travel without arguing about who paid what.",
          bullets: [
            "Create a “Trip to Medellin” group for flights, Airbnb and transport.",
            "Use equal shares or custom splits (for shorter stays, for example).",
            "Get one final balance per member to close the trip cleanly.",
          ],
        },
        {
          title: "Roommates",
          description: "Rent, bills and shared purchases always balanced.",
          bullets: [
            "Track fixed bills (electricity, water, internet) and variable purchases.",
            "Assign who paid and how much each roommate owes.",
            "Run monthly settlements with clear reminders.",
          ],
        },
        {
          title: "Restaurant bills",
          description: "Skip messy calculators and cross-payments.",
          bullets: [
            "Capture the total and split by person or by item.",
            "Include tips and taxes while preserving proportions.",
            "Share QR/links so everyone pays their part instantly.",
          ],
        },
        {
          title: "Freelancers",
          description: "Separate project expenses and bill clients clearly.",
          bullets: [
            "Create a project and track reimbursable expenses plus fees.",
            "Attach receipts and mark what should be invoiced to the client.",
            "Generate a consolidated balance to include in your invoice.",
          ],
        },
      ],
      useCaseModal: {
        label: "Use case",
        startWithCase: "Start with this case",
        close: "Close",
      },
      instagram: "Instagram",
    },
  },
  pr: {
    language: {
      select: "Selecionar idioma",
      names: {
        es: "Espanhol",
        en: "Inglês",
        de: "Alemão",
        pr: "Português",
        ut: "Italiano",
        fr: "Francês",
      },
    },
    navbar: {
      links: {
        premium: "Premium",
        how: "Como funciona",
        features: "Recursos",
        screens: "Telas",
      },
      qrLabel: "Escaneie o código QR para baixar",
      qrShort: "QR",
      downloadApp: "Baixar app",
      login: "Entrar",
      openMenu: "Abrir menu",
      menuTitle: "Menu",
      closeMenu: "Fechar menu",
      close: "Fechar",
      qrTitle: "Escaneie com sua câmera",
      qrDescription: "Detectamos seu sistema automaticamente",
    },
    footer: {
      stores: {
        appStoreAria: "Baixar na App Store",
        googlePlayAria: "Obter no Google Play",
        appStoreAlt: "Disponível na App Store",
        googlePlayAlt: "Disponível no Google Play",
      },
      brandDescription: "A forma moderna de dividir despesas com amigos, casal e equipes. Claro, rápido e sem drama.",
      newsletterAria: "Assinatura de novidades",
      emailPlaceholder: "Seu e-mail",
      join: "Participar",
      columns: {
        product: "Produto",
        useCases: "Casos de uso",
        help: "Ajuda",
        company: "Empresa",
      },
      links: {
        product: [
          "Estatísticas claras de gastos",
          "Solicitações de pagamento fáceis",
          "Acompanhamento automático",
          "Divida gastos em grupo",
          "Cartão virtual grátis",
        ],
        help: {
          center: "Central de ajuda",
          contact: "Fale conosco",
          faq: "Perguntas frequentes",
        },
        company: {
          about: "Sobre a Teilen",
          blog: "Blog",
          press: "Imprensa",
          jobs: "Empregos",
          legal: "Documentos legais",
        },
        legal: {
          privacy: "Privacidade",
          terms: "Termos",
          cookies: "Cookies",
        },
      },
      useCases: [
        {
          title: "Para casais",
          description: "Mantenham o controle sem misturar com finanças pessoais.",
          bullets: [
            "Crie um grupo “Nós” e registre aluguel, mercado e assinaturas.",
            "Divida 50/50 ou com porcentagens diferentes conforme a renda.",
            "Veja saldos claros e quite com um clique sem perder histórico.",
          ],
        },
        {
          title: "Viagens em grupo",
          description: "Organize viagens sem discussão sobre quem pagou o quê.",
          bullets: [
            "Grupo “Viagem para Medellín”: registre voos, Airbnb e traslados.",
            "Defina cotas iguais ou por pessoa (ex.: alguém fica menos dias).",
            "Receba um saldo final por integrante para fechar a viagem.",
          ],
        },
        {
          title: "Colegas de apartamento",
          description: "Aluguel, contas e compras comuns sempre equilibrados.",
          bullets: [
            "Despesas fixas (luz, água, internet) e variáveis (limpeza, insumos).",
            "Defina quem pagou e quanto cada roommate deve.",
            "Fechamento mensal automático com lembretes claros.",
          ],
        },
        {
          title: "Contas de restaurante",
          description: "Evite calculadora de grupo e cobranças cruzadas.",
          bullets: [
            "Tire foto do total e divida por pessoa ou por item.",
            "Inclua gorjeta e impostos sem perder proporções.",
            "Compartilhe QR/links para cada pessoa pagar na hora.",
          ],
        },
        {
          title: "Freelancers",
          description: "Separe gastos do projeto e cobre sem confusão.",
          bullets: [
            "Crie um projeto e registre gastos reembolsáveis e honorários.",
            "Anexe recibos e marque o que deve ser cobrado do cliente.",
            "Gere um saldo consolidado para enviar na fatura.",
          ],
        },
      ],
      useCaseModal: {
        label: "Caso de uso",
        startWithCase: "Começar com este caso",
        close: "Fechar",
      },
      instagram: "Instagram",
    },
  },
};

const messages: Record<Locale, Messages> = {
  ...baseMessages,
  de: {
    ...baseMessages.en,
    language: {
      select: "Sprache auswählen",
      names: {
        es: "Spanisch",
        en: "Englisch",
        de: "Deutsch",
        pr: "Portugiesisch",
        ut: "Italienisch",
        fr: "Französisch",
      },
    },
    navbar: {
      links: {
        premium: "Premium",
        how: "So funktioniert's",
        features: "Funktionen",
        screens: "Screens",
      },
      qrLabel: "QR-Code scannen zum Herunterladen",
      qrShort: "QR",
      downloadApp: "App herunterladen",
      login: "Anmelden",
      openMenu: "Menü öffnen",
      menuTitle: "Menü",
      closeMenu: "Menü schließen",
      close: "Schließen",
      qrTitle: "Mit deiner Kamera scannen",
      qrDescription: "Wir erkennen dein System automatisch",
    },
    footer: {
      stores: {
        appStoreAria: "Im App Store herunterladen",
        googlePlayAria: "Bei Google Play holen",
        appStoreAlt: "Im App Store verfügbar",
        googlePlayAlt: "Bei Google Play verfügbar",
      },
      brandDescription:
        "Die moderne Art, Ausgaben mit Freunden, Partnern und Teams zu teilen. Klar, schnell und ohne Drama.",
      newsletterAria: "Newsletter-Anmeldung",
      emailPlaceholder: "Deine E-Mail",
      join: "Beitreten",
      columns: {
        product: "Produkt",
        useCases: "Anwendungsfälle",
        help: "Hilfe",
        company: "Unternehmen",
      },
      links: {
        product: [
          "Klare Ausgabenübersicht",
          "Einfache Zahlungsanfragen",
          "Automatische Verfolgung",
          "Gruppenausgaben teilen",
          "Kostenlose virtuelle Karte",
        ],
        help: {
          center: "Hilfe-Center",
          contact: "Kontakt",
          faq: "FAQ",
        },
        company: {
          about: "Über Teilen",
          blog: "Blog",
          press: "Presse",
          jobs: "Jobs",
          legal: "Rechtliche Dokumente",
        },
        legal: {
          privacy: "Datenschutz",
          terms: "Bedingungen",
          cookies: "Cookies",
        },
      },
      useCases: [
        {
          title: "Für Paare",
          description: "Behalte den Überblick, ohne gemeinsame und private Finanzen zu vermischen.",
          bullets: [
            "Erstelle eine Gruppe „Wir“ und erfasse Miete, Einkäufe und Abos.",
            "Teile 50/50 oder mit individuellen Prozentsätzen nach Einkommen.",
            "Sieh klare Salden und gleiche mit einem Klick aus.",
          ],
        },
        {
          title: "Gruppenreisen",
          description: "Reisen planen ohne Streit darüber, wer was bezahlt hat.",
          bullets: [
            "Erstelle eine Gruppe „Reise nach Medellín“ für Flüge, Airbnb und Transport.",
            "Nutze gleiche Anteile oder individuelle Aufteilungen (z. B. bei kürzerem Aufenthalt).",
            "Erhalte einen finalen Saldo pro Person, um die Reise sauber abzuschließen.",
          ],
        },
        {
          title: "WGs",
          description: "Miete, Rechnungen und gemeinsame Einkäufe immer im Gleichgewicht.",
          bullets: [
            "Erfasse feste Kosten (Strom, Wasser, Internet) und variable Ausgaben.",
            "Lege fest, wer bezahlt hat und wie viel jede Person schuldet.",
            "Monatlicher Ausgleich mit klaren Erinnerungen.",
          ],
        },
        {
          title: "Restaurantrechnungen",
          description: "Kein Chaos mit Taschenrechnern und gegenseitigen Zahlungen.",
          bullets: [
            "Erfasse den Gesamtbetrag und teile pro Person oder pro Position.",
            "Inklusive Trinkgeld und Steuern bei korrekten Anteilen.",
            "Teile QR/Links, damit jede Person sofort ihren Anteil bezahlt.",
          ],
        },
        {
          title: "Freelancer",
          description: "Projektkosten trennen und Kund:innen klar abrechnen.",
          bullets: [
            "Erstelle ein Projekt und erfasse erstattbare Ausgaben plus Honorare.",
            "Hänge Belege an und markiere, was dem Kunden berechnet wird.",
            "Erzeuge einen konsolidierten Saldo für deine Rechnung.",
          ],
        },
      ],
      useCaseModal: {
        label: "Anwendungsfall",
        startWithCase: "Mit diesem Fall starten",
        close: "Schließen",
      },
      instagram: "Instagram",
    },
  },
  ut: {
    ...baseMessages.en,
    language: {
      select: "Seleziona lingua",
      names: {
        es: "Spagnolo",
        en: "Inglese",
        de: "Tedesco",
        pr: "Portoghese",
        ut: "Italiano",
        fr: "Francese",
      },
    },
    navbar: {
      links: {
        premium: "Premium",
        how: "Come funziona",
        features: "Funzionalità",
        screens: "Schermate",
      },
      qrLabel: "Scansiona il QR per scaricare",
      qrShort: "QR",
      downloadApp: "Scarica app",
      login: "Accedi",
      openMenu: "Apri menu",
      menuTitle: "Menu",
      closeMenu: "Chiudi menu",
      close: "Chiudi",
      qrTitle: "Scansiona con la tua fotocamera",
      qrDescription: "Rileviamo automaticamente il tuo sistema",
    },
    footer: {
      stores: {
        appStoreAria: "Scarica su App Store",
        googlePlayAria: "Scarica su Google Play",
        appStoreAlt: "Disponibile su App Store",
        googlePlayAlt: "Disponibile su Google Play",
      },
      brandDescription:
        "Il modo moderno per dividere spese con amici, partner e team. Chiaro, veloce e senza drammi.",
      newsletterAria: "Iscrizione alle novità",
      emailPlaceholder: "La tua email",
      join: "Iscrivimi",
      columns: {
        product: "Prodotto",
        useCases: "Casi d'uso",
        help: "Aiuto",
        company: "Azienda",
      },
      links: {
        product: [
          "Panoramica chiara delle spese",
          "Richieste di pagamento semplici",
          "Monitoraggio automatico",
          "Dividi spese di gruppo",
          "Carta virtuale gratuita",
        ],
        help: {
          center: "Centro assistenza",
          contact: "Contattaci",
          faq: "FAQ",
        },
        company: {
          about: "Su Teilen",
          blog: "Blog",
          press: "Stampa",
          jobs: "Lavoro",
          legal: "Documenti legali",
        },
        legal: {
          privacy: "Privacy",
          terms: "Termini",
          cookies: "Cookie",
        },
      },
      useCases: [
        {
          title: "Per coppie",
          description: "Tieni tutto sotto controllo senza mescolare finanze personali e condivise.",
          bullets: [
            "Crea un gruppo “Noi” e registra affitto, spesa e abbonamenti.",
            "Dividi 50/50 o con percentuali personalizzate in base al reddito.",
            "Vedi saldi chiari e regola tutto con un tocco.",
          ],
        },
        {
          title: "Viaggi di gruppo",
          description: "Organizza viaggi senza discutere su chi ha pagato cosa.",
          bullets: [
            "Crea un gruppo “Viaggio a Medellín” per voli, Airbnb e trasporti.",
            "Usa quote uguali o divisioni personalizzate (es. permanenze diverse).",
            "Ottieni un saldo finale per ogni persona per chiudere tutto.",
          ],
        },
        {
          title: "Coinquilini",
          description: "Affitto, bollette e acquisti comuni sempre bilanciati.",
          bullets: [
            "Registra costi fissi (luce, acqua, internet) e variabili.",
            "Assegna chi ha pagato e quanto deve ogni coinquilino.",
            "Chiusura mensile con promemoria chiari.",
          ],
        },
        {
          title: "Conti al ristorante",
          description: "Niente più calcoli infiniti e pagamenti incrociati.",
          bullets: [
            "Inserisci il totale e dividi per persona o per voce.",
            "Includi mancia e tasse mantenendo le proporzioni.",
            "Condividi QR/link così ognuno paga subito la sua parte.",
          ],
        },
        {
          title: "Freelance",
          description: "Separa i costi del progetto e fattura senza confusione.",
          bullets: [
            "Crea un progetto e registra spese rimborsabili e compensi.",
            "Allega ricevute e segna cosa addebitare al cliente.",
            "Genera un saldo consolidato da includere in fattura.",
          ],
        },
      ],
      useCaseModal: {
        label: "Caso d'uso",
        startWithCase: "Inizia con questo caso",
        close: "Chiudi",
      },
      instagram: "Instagram",
    },
  },
  fr: {
    ...baseMessages.en,
    language: {
      select: "Choisir la langue",
      names: {
        es: "Espagnol",
        en: "Anglais",
        de: "Allemand",
        pr: "Portugais",
        ut: "Italien",
        fr: "Français",
      },
    },
    navbar: {
      links: {
        premium: "Premium",
        how: "Comment ça marche",
        features: "Fonctionnalités",
        screens: "Écrans",
      },
      qrLabel: "Scannez le QR pour télécharger",
      qrShort: "QR",
      downloadApp: "Télécharger l'app",
      login: "Se connecter",
      openMenu: "Ouvrir le menu",
      menuTitle: "Menu",
      closeMenu: "Fermer le menu",
      close: "Fermer",
      qrTitle: "Scannez avec votre caméra",
      qrDescription: "Nous détectons votre système automatiquement",
    },
    footer: {
      stores: {
        appStoreAria: "Télécharger sur l'App Store",
        googlePlayAria: "Obtenir sur Google Play",
        appStoreAlt: "Disponible sur l'App Store",
        googlePlayAlt: "Disponible sur Google Play",
      },
      brandDescription:
        "La façon moderne de partager les dépenses avec amis, partenaires et équipes. Clair, rapide et sans drame.",
      newsletterAria: "Abonnement aux nouveautés",
      emailPlaceholder: "Votre e-mail",
      join: "Rejoindre",
      columns: {
        product: "Produit",
        useCases: "Cas d'usage",
        help: "Aide",
        company: "Entreprise",
      },
      links: {
        product: [
          "Vision claire des dépenses",
          "Demandes de paiement simples",
          "Suivi automatique",
          "Partage des dépenses de groupe",
          "Carte virtuelle gratuite",
        ],
        help: {
          center: "Centre d'aide",
          contact: "Contactez-nous",
          faq: "FAQ",
        },
        company: {
          about: "À propos de Teilen",
          blog: "Blog",
          press: "Presse",
          jobs: "Emplois",
          legal: "Documents légaux",
        },
        legal: {
          privacy: "Confidentialité",
          terms: "Conditions",
          cookies: "Cookies",
        },
      },
      useCases: [
        {
          title: "Pour les couples",
          description: "Gardez le contrôle sans mélanger finances personnelles et partagées.",
          bullets: [
            "Créez un groupe « Nous » et enregistrez loyer, courses et abonnements.",
            "Partagez 50/50 ou avec des pourcentages personnalisés selon les revenus.",
            "Voyez des soldes clairs et régularisez en un clic.",
          ],
        },
        {
          title: "Voyages en groupe",
          description: "Organisez vos voyages sans disputes sur qui a payé quoi.",
          bullets: [
            "Créez un groupe « Voyage à Medellín » pour vols, Airbnb et transports.",
            "Utilisez un partage égal ou personnalisé (séjours plus courts, par exemple).",
            "Obtenez un solde final par personne pour clôturer proprement.",
          ],
        },
        {
          title: "Colocation",
          description: "Loyer, factures et achats communs toujours équilibrés.",
          bullets: [
            "Suivez les charges fixes (électricité, eau, internet) et variables.",
            "Indiquez qui a payé et combien chaque colocataire doit.",
            "Règlement mensuel avec rappels clairs.",
          ],
        },
        {
          title: "Addition au restaurant",
          description: "Fini les calculs interminables et les paiements croisés.",
          bullets: [
            "Entrez le total et répartissez par personne ou par article.",
            "Incluez pourboires et taxes sans perdre les proportions.",
            "Partagez QR/liens pour que chacun paie sa part immédiatement.",
          ],
        },
        {
          title: "Freelances",
          description: "Séparez les frais du projet et facturez clairement.",
          bullets: [
            "Créez un projet et suivez frais remboursables et honoraires.",
            "Ajoutez les justificatifs et marquez ce qui doit être facturé au client.",
            "Générez un solde consolidé à inclure dans votre facture.",
          ],
        },
      ],
      useCaseModal: {
        label: "Cas d'usage",
        startWithCase: "Commencer avec ce cas",
        close: "Fermer",
      },
      instagram: "Instagram",
    },
  },
};

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase().slice(0, 2);
  if (SUPPORTED_LOCALES.includes(normalized as Locale)) {
    return normalized as Locale;
  }
  return LOCALE_ALIASES[normalized] ?? null;
}

export function isSupportedLocale(value: string): value is Locale {
  return normalizeLocale(value) !== null;
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
