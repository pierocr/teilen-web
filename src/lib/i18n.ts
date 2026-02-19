export const SUPPORTED_LOCALES = ["es", "en", "pt"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

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

const messages: Record<Locale, Messages> = {
  es: {
    language: {
      select: "Seleccionar idioma",
      names: {
        es: "Español",
        en: "English",
        pt: "Português",
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
        pt: "Portuguese",
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
  pt: {
    language: {
      select: "Selecionar idioma",
      names: {
        es: "Espanhol",
        en: "Inglês",
        pt: "Português",
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

export function isSupportedLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
