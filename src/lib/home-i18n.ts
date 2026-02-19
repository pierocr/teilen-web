import { type Locale } from "@/lib/i18n";

type HomeMessages = {
  stores: {
    appStoreAria: string;
    googlePlayAria: string;
    appStoreAlt: string;
    googlePlayAlt: string;
  };
  hero: {
    badge: string;
    words: string[];
    titlePrefix: string;
    titleSuffix: string;
    description: string;
    demoButton: string;
    availability: string;
  };
  animatedStats: {
    badge: string;
    title: string;
    description: string;
    cards: {
      title: string;
      chipLabel: string;
      chipRight: string;
      chipSub: string;
      emoji: string;
      img: string;
    }[];
  };
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    steps: {
      title: string;
      desc: string;
      img: string;
    }[];
  };
  features: {
    badge: string;
    title: string;
    subtitle: string;
    videoAriaLabel: string;
    unsupportedVideoText: string;
    items: {
      id: string;
      title: string;
      desc: string;
      pill?: string;
    }[];
  };
  appScreens: {
    badge: string;
    title: string;
    subtitle: string;
    imageAlt: string;
  };
  downloadModal: {
    close: string;
    badge: string;
    title: string;
    description: string;
    highlights: {
      title: string;
      description: string;
    }[];
    markets: string;
    phoneImageAlt: string;
    qrAlt: string;
    qrLabel: string;
  };
  page: {
    faq: {
      badge: string;
      title: string;
      description: string;
      items: {
        question: string;
        answer: string;
      }[];
    };
    cta: {
      badge: string;
      title: string;
      description: string;
      availability: string;
      qrTitle: string;
      qrDescription: string;
      qrAlt: string;
    };
    testimonials: {
      badge: string;
      title: string;
      description: string;
      starsLabel: string;
      items: {
        quote: string;
        author: string;
        context: string;
      }[];
    };
  };
};

const homeMessages: Record<Locale, HomeMessages> = {
  es: {
    stores: {
      appStoreAria: "Descargar Teilen en App Store",
      googlePlayAria: "Descargar Teilen en Google Play",
      appStoreAlt: "Disponible en App Store",
      googlePlayAlt: "Disponible en Google Play",
    },
    hero: {
      badge: "App para dividir gastos",
      words: ["dividir", "compartir", "administrar"],
      titlePrefix: "La forma de",
      titleSuffix: "tus gastos en grupo",
      description:
        "Ve tu saldo en tiempo real, reparte cuentas en segundos y liquida deudas sin discusiones. Todo desde una sola app.",
      demoButton: "Ver experiencia Teilen",
      availability: "Disponible en Chile y el mundo",
    },
    animatedStats: {
      badge: "Experiencia Teilen",
      title: "Manejar tu dinero nunca fue tan fácil",
      description:
        "Organiza grupos, divide y controla tus gastos en un solo lugar. Claro, rápido y pensado para uso real.",
      cards: [
        {
          title: "Gastos mensuales",
          chipLabel: "Pizza en Ñuñoa",
          chipRight: "−$5490",
          chipSub: "Ayer, 09:02",
          emoji: "🍕",
          img: "/demo/card-1.webp",
        },
        {
          title: "Vacaciones",
          chipLabel: "Vuelo",
          chipRight: "-$1.200.000",
          chipSub: "Hoy, 11:28",
          emoji: "✈️",
          img: "/demo/card-2.webp",
        },
        {
          title: "Junta de amigas",
          chipLabel: "Cafetería Providencia",
          chipRight: "−$25.000",
          chipSub: "Vie, 16:45",
          emoji: "☕",
          img: "/demo/card-3.webp",
        },
      ],
    },
    howItWorks: {
      badge: "Cómo funciona",
      title: "¿Cómo funciona?",
      description: "Todo lo que necesitas para dividir sin complicaciones.",
      steps: [
        {
          title: "Crea tu grupo",
          desc: "Invita a tus amigos o familiares a unirse a tu grupo mediante un enlace o código QR.",
          img: "/images/how-group.webp",
        },
        {
          title: "Agrega tus gastos",
          desc: "Elige quién pagó y divídelo de distintas formas: igual, porcentual o personalizada.",
          img: "/images/how-scan.webp",
        },
        {
          title: "Notificación de todos tus gastos",
          desc: "Cada vez que realices un gasto, todos los miembros del grupo serán notificados al instante.",
          img: "/images/how-pay.webp",
        },
      ],
    },
    features: {
      badge: "Características",
      title: "Potentes, pero fáciles.",
      subtitle: "Todo lo que de verdad usa la gente.",
      videoAriaLabel: "Demo de la aplicación Teilen",
      unsupportedVideoText: "Tu navegador no soporta video HTML5.",
      items: [
        {
          id: "scan",
          title: "Escáner de boletas con IA",
          desc: "Detecta ítems, impuestos y propinas. Divide en segundos.",
        },
        {
          id: "pay",
          title: "Pagos simples",
          desc: "Enlaza tu método favorito y liquida al instante.",
        },
        {
          id: "rules",
          title: "Grupos & reglas",
          desc: "Crea grupos, define porcentajes y lleva el historial.",
        },
        {
          id: "audit",
          title: "Auditoría en tiempo real",
          desc: "Transparencia total del quién-pagó-qué y cuándo.",
        },
        {
          id: "personal",
          title: "Control de gastos personales",
          desc: "Presupuesta tus gastos, clasifica compras y recibe alertas inteligentes.",
        },
      ],
    },
    appScreens: {
      badge: "Pantallas",
      title: "Mira cómo luce Teilen",
      subtitle: "Interfaz limpia y moderna, optimizada para que dividir gastos sea realmente simple.",
      imageAlt: "Captura de pantalla de Teilen",
    },
    downloadModal: {
      close: "Cerrar",
      badge: "Disponible en iOS y Android",
      title: "Comparte gastos y ordena tus finanzas personales desde un mismo lugar",
      description:
        "Disfruta Teilen desde Chile hacia el mundo: grupos, viajes, parejas y equipos pueden sincronizar cada movimiento sin depender de hojas de cálculo.",
      highlights: [
        {
          title: "Balances vivos",
          description: "Cada abono y gasto se refleja al instante para que nadie pierda de vista el saldo real.",
        },
        {
          title: "Recordatorios humanos",
          description: "Automatiza avisos amables y evita perseguir a tus amigos por WhatsApp.",
        },
        {
          title: "Pagos ordenados",
          description: "Calculamos la mejor ruta para liquidar sin transferencias innecesarias.",
        },
      ],
      markets: "Chile · Latinoamérica · Resto del mundo",
      phoneImageAlt: "Pantalla principal de Teilen mostrando saldos y grupos",
      qrAlt: "QR para descargar Teilen",
      qrLabel: "Descarga aquí",
    },
    page: {
      faq: {
        badge: "Preguntas frecuentes",
        title: "Resuelve tus dudas antes de descargar Teilen",
        description:
          "Respondemos lo que más nos consultan sobre compartir gastos, saldar cuentas y organizar grupos para que pruebes Teilen con confianza.",
        items: [
          {
            question: "¿Qué hace diferente a Teilen frente a otras apps para dividir gastos?",
            answer:
              "Teilen está pensada para el mercado chileno: permite registrar gastos en pesos, dividirlos en partes iguales o personalizadas, enviar recordatorios y exportar reportes claros para tu grupo.",
          },
          {
            question: "¿Sirve para viajes, parejas o grupos de roomies?",
            answer:
              "Sí. Puedes crear distintos grupos, invitar a tus contactos y llevar el detalle de cada compra, reembolso y saldo pendiente en tiempo real.",
          },
          {
            question: "¿Cómo se liquidan los saldos en Teilen?",
            answer:
              "La app calcula automáticamente quién le debe a quién y te muestra la mejor ruta de pagos para dejar el grupo en cero sin cálculos manuales.",
          },
        ],
      },
      cta: {
        badge: "Descarga Teilen",
        title: "Disponible en iOS y Android para Chile y el mundo",
        description:
          "Lleva la app líder para compartir gastos, dividir pagos y ordenar tus finanzas personales sin importar dónde estés. Gratis, segura y con un diseño listo para tus grupos.",
        availability: "App global para compartir gastos · Sin costo de descarga",
        qrTitle: "Escanea con tu cámara",
        qrDescription: "Elige el sistema operativo que quieras, nosotros detectamos tu store automáticamente.",
        qrAlt: "Código QR de descarga universal de Teilen",
      },
      testimonials: {
        badge: "Reseñas",
        title: "Lo que dice nuestra comunidad",
        description: "Testimonios reales de usuarios piloto que ya están usando Teilen para dividir gastos sin drama.",
        starsLabel: "5 de 5 estrellas",
        items: [
          {
            quote:
              "“Con Teilen logramos ordenar el arriendo y los servicios del depto. El resumen es transparente y todos quedamos tranquilos con lo que toca pagar.”",
            author: "Constanza R.",
            context: "Ñuñoa · Convive con 3 roomies",
          },
          {
            quote:
              "“Para nuestro viaje a Chiloé fue ideal. Cada gasto quedó registrado al tiro y al final bastó un par de clics para saldar entre el grupo completo.”",
            author: "Diego M.",
            context: "Valparaíso · Viajes en grupo",
          },
          {
            quote:
              "“Con mi pareja nos organizamos mejor: la app recuerda quién pagó cada cosa y evita esos malos ratos por las cuentas de la casa.”",
            author: "Camila & Seba",
            context: "Santiago Centro · Pareja joven",
          },
          {
            quote:
              "“Soy tesorera de un club deportivo y Teilen nos permitió llevar los aportes y reembolsos con claridad. Los socios quedan informados al instante.”",
            author: "María José L.",
            context: "Providencia · Club amateur",
          },
        ],
      },
    },
  },
  en: {
    stores: {
      appStoreAria: "Download Teilen on the App Store",
      googlePlayAria: "Download Teilen on Google Play",
      appStoreAlt: "Available on the App Store",
      googlePlayAlt: "Available on Google Play",
    },
    hero: {
      badge: "Expense splitting app",
      words: ["split", "share", "manage"],
      titlePrefix: "The way to",
      titleSuffix: "manage your group expenses",
      description:
        "See balances in real time, split bills in seconds, and settle debts without arguments. All in one app.",
      demoButton: "See the Teilen experience",
      availability: "Available in Chile and worldwide",
    },
    animatedStats: {
      badge: "Teilen experience",
      title: "Managing money has never been easier",
      description:
        "Create groups, split, and track expenses in one place. Clear, fast, and built for real life.",
      cards: [
        {
          title: "Monthly expenses",
          chipLabel: "Pizza in Nunoa",
          chipRight: "−$5490",
          chipSub: "Yesterday, 09:02",
          emoji: "🍕",
          img: "/demo/card-1.webp",
        },
        {
          title: "Vacation",
          chipLabel: "Flight",
          chipRight: "-$1,200,000",
          chipSub: "Today, 11:28",
          emoji: "✈️",
          img: "/demo/card-2.webp",
        },
        {
          title: "Friends meetup",
          chipLabel: "Providencia cafe",
          chipRight: "−$25,000",
          chipSub: "Fri, 16:45",
          emoji: "☕",
          img: "/demo/card-3.webp",
        },
      ],
    },
    howItWorks: {
      badge: "How it works",
      title: "How does it work?",
      description: "Everything you need to split expenses without hassle.",
      steps: [
        {
          title: "Create your group",
          desc: "Invite friends or family to join your group using a link or QR code.",
          img: "/images/how-group.webp",
        },
        {
          title: "Add expenses",
          desc: "Choose who paid and split amounts equally, by percentage, or custom.",
          img: "/images/how-scan.webp",
        },
        {
          title: "Instant notifications",
          desc: "Every time an expense is added, everyone in the group gets notified immediately.",
          img: "/images/how-pay.webp",
        },
      ],
    },
    features: {
      badge: "Features",
      title: "Powerful, yet simple.",
      subtitle: "Everything people actually use.",
      videoAriaLabel: "Teilen app demo",
      unsupportedVideoText: "Your browser does not support HTML5 video.",
      items: [
        {
          id: "scan",
          title: "AI receipt scanner",
          desc: "Detects items, taxes, and tips. Split in seconds.",
        },
        {
          id: "pay",
          title: "Simple payments",
          desc: "Link your preferred method and settle instantly.",
        },
        {
          id: "rules",
          title: "Groups and rules",
          desc: "Create groups, set percentages, and keep history.",
        },
        {
          id: "audit",
          title: "Real-time audit",
          desc: "Full transparency on who paid what and when.",
        },
        {
          id: "personal",
          title: "Personal spending control",
          desc: "Plan spending, classify purchases, and get smart alerts.",
        },
      ],
    },
    appScreens: {
      badge: "Screens",
      title: "See how Teilen looks",
      subtitle: "A clean modern interface designed to make expense splitting truly simple.",
      imageAlt: "Teilen app screen",
    },
    downloadModal: {
      close: "Close",
      badge: "Available on iOS and Android",
      title: "Share expenses and organize your personal finances in one place",
      description:
        "Use Teilen from Chile to the world: groups, trips, couples, and teams can sync every move without spreadsheets.",
      highlights: [
        {
          title: "Live balances",
          description: "Every payment and expense updates instantly so everyone sees the real balance.",
        },
        {
          title: "Human reminders",
          description: "Automate friendly reminders and stop chasing friends on WhatsApp.",
        },
        {
          title: "Organized payments",
          description: "We calculate the best settlement route to avoid unnecessary transfers.",
        },
      ],
      markets: "Chile · Latin America · Rest of the world",
      phoneImageAlt: "Teilen home screen showing balances and groups",
      qrAlt: "QR to download Teilen",
      qrLabel: "Download here",
    },
    page: {
      faq: {
        badge: "Frequently asked questions",
        title: "Get your doubts resolved before downloading Teilen",
        description:
          "Answers to the top questions about sharing expenses, settling balances, and organizing groups so you can try Teilen with confidence.",
        items: [
          {
            question: "What makes Teilen different from other expense splitting apps?",
            answer:
              "Teilen is built for Chile and beyond: track expenses in local currency, split equally or custom, send reminders, and export clear reports for your group.",
          },
          {
            question: "Does it work for trips, couples, or roommates?",
            answer:
              "Yes. You can create multiple groups, invite contacts, and track every purchase, reimbursement, and pending balance in real time.",
          },
          {
            question: "How are balances settled in Teilen?",
            answer:
              "The app automatically calculates who owes whom and shows the most efficient payment path to bring the group back to zero.",
          },
        ],
      },
      cta: {
        badge: "Download Teilen",
        title: "Available on iOS and Android for Chile and the world",
        description:
          "Use the leading app for shared expenses, payment splitting, and personal finance organization wherever you are. Free, secure, and built for groups.",
        availability: "Global app for shared expenses · Free to download",
        qrTitle: "Scan with your camera",
        qrDescription: "Choose your preferred operating system and we will detect your store automatically.",
        qrAlt: "Universal QR download code for Teilen",
      },
      testimonials: {
        badge: "Reviews",
        title: "What our community says",
        description:
          "Real testimonials from pilot users already using Teilen to split expenses without the drama.",
        starsLabel: "5 out of 5 stars",
        items: [
          {
            quote:
              "“With Teilen we finally organized rent and utility bills in our apartment. The summary is clear and everyone knows exactly what to pay.”",
            author: "Constanza R.",
            context: "Nunoa · Lives with 3 roommates",
          },
          {
            quote:
              "“It was perfect for our Chiloe trip. Every expense was recorded instantly, and in the end a couple of taps were enough to settle everything.”",
            author: "Diego M.",
            context: "Valparaiso · Group travel",
          },
          {
            quote:
              "“My partner and I are much more organized now: the app remembers who paid for each thing and avoids awkward money moments at home.”",
            author: "Camila & Seba",
            context: "Downtown Santiago · Young couple",
          },
          {
            quote:
              "“I manage finances for a local sports club, and Teilen helped us track contributions and reimbursements clearly. Members stay informed instantly.”",
            author: "Maria Jose L.",
            context: "Providencia · Amateur club",
          },
        ],
      },
    },
  },
  pt: {
    stores: {
      appStoreAria: "Baixar Teilen na App Store",
      googlePlayAria: "Baixar Teilen no Google Play",
      appStoreAlt: "Disponível na App Store",
      googlePlayAlt: "Disponível no Google Play",
    },
    hero: {
      badge: "App para dividir despesas",
      words: ["dividir", "compartilhar", "organizar"],
      titlePrefix: "A forma de",
      titleSuffix: "organizar suas despesas em grupo",
      description:
        "Veja saldos em tempo real, divida contas em segundos e quite dívidas sem discussões. Tudo em um só app.",
      demoButton: "Ver experiência Teilen",
      availability: "Disponível no Chile e no mundo",
    },
    animatedStats: {
      badge: "Experiência Teilen",
      title: "Gerenciar dinheiro nunca foi tão fácil",
      description:
        "Organize grupos, divida e controle despesas em um só lugar. Claro, rápido e pensado para uso real.",
      cards: [
        {
          title: "Despesas mensais",
          chipLabel: "Pizza em Nunoa",
          chipRight: "−$5490",
          chipSub: "Ontem, 09:02",
          emoji: "🍕",
          img: "/demo/card-1.webp",
        },
        {
          title: "Férias",
          chipLabel: "Voo",
          chipRight: "-$1.200.000",
          chipSub: "Hoje, 11:28",
          emoji: "✈️",
          img: "/demo/card-2.webp",
        },
        {
          title: "Encontro com amigas",
          chipLabel: "Cafeteria Providencia",
          chipRight: "−$25.000",
          chipSub: "Sex, 16:45",
          emoji: "☕",
          img: "/demo/card-3.webp",
        },
      ],
    },
    howItWorks: {
      badge: "Como funciona",
      title: "Como funciona?",
      description: "Tudo o que você precisa para dividir sem complicação.",
      steps: [
        {
          title: "Crie seu grupo",
          desc: "Convide amigos ou família para entrar no grupo com link ou QR code.",
          img: "/images/how-group.webp",
        },
        {
          title: "Adicione despesas",
          desc: "Escolha quem pagou e divida de forma igual, percentual ou personalizada.",
          img: "/images/how-scan.webp",
        },
        {
          title: "Notificações instantâneas",
          desc: "Sempre que uma despesa for registrada, todos no grupo são avisados na hora.",
          img: "/images/how-pay.webp",
        },
      ],
    },
    features: {
      badge: "Recursos",
      title: "Poderoso, mas simples.",
      subtitle: "Tudo o que as pessoas realmente usam.",
      videoAriaLabel: "Demo do app Teilen",
      unsupportedVideoText: "Seu navegador não suporta vídeo HTML5.",
      items: [
        {
          id: "scan",
          title: "Scanner de recibos com IA",
          desc: "Detecta itens, impostos e gorjetas. Divide em segundos.",
        },
        {
          id: "pay",
          title: "Pagamentos simples",
          desc: "Conecte seu método favorito e quite na hora.",
        },
        {
          id: "rules",
          title: "Grupos e regras",
          desc: "Crie grupos, defina porcentagens e mantenha o histórico.",
        },
        {
          id: "audit",
          title: "Auditoria em tempo real",
          desc: "Transparência total de quem pagou o quê e quando.",
        },
        {
          id: "personal",
          title: "Controle de gastos pessoais",
          desc: "Planeje gastos, classifique compras e receba alertas inteligentes.",
        },
      ],
    },
    appScreens: {
      badge: "Telas",
      title: "Veja como a Teilen é",
      subtitle: "Interface limpa e moderna para tornar a divisão de despesas realmente simples.",
      imageAlt: "Tela do app Teilen",
    },
    downloadModal: {
      close: "Fechar",
      badge: "Disponível para iOS e Android",
      title: "Compartilhe despesas e organize suas finanças pessoais em um só lugar",
      description:
        "Use a Teilen do Chile para o mundo: grupos, viagens, casais e equipes podem sincronizar cada movimento sem planilhas.",
      highlights: [
        {
          title: "Saldos ao vivo",
          description: "Cada pagamento e despesa atualiza na hora para todos verem o saldo real.",
        },
        {
          title: "Lembretes humanos",
          description: "Automatize lembretes amigáveis e pare de cobrar amigos no WhatsApp.",
        },
        {
          title: "Pagamentos organizados",
          description: "Calculamos a melhor rota de quitação sem transferências desnecessárias.",
        },
      ],
      markets: "Chile · América Latina · Resto do mundo",
      phoneImageAlt: "Tela inicial da Teilen mostrando saldos e grupos",
      qrAlt: "QR para baixar Teilen",
      qrLabel: "Baixe aqui",
    },
    page: {
      faq: {
        badge: "Perguntas frequentes",
        title: "Tire suas dúvidas antes de baixar a Teilen",
        description:
          "Respondemos as principais dúvidas sobre compartilhar despesas, quitar saldos e organizar grupos para você testar a Teilen com confiança.",
        items: [
          {
            question: "O que torna a Teilen diferente de outros apps para dividir despesas?",
            answer:
              "A Teilen foi pensada para o Chile e além: registre gastos, divida igualmente ou de forma personalizada, envie lembretes e exporte relatórios claros para o grupo.",
          },
          {
            question: "Funciona para viagens, casais ou roommates?",
            answer:
              "Sim. Você pode criar vários grupos, convidar contatos e acompanhar compras, reembolsos e saldos pendentes em tempo real.",
          },
          {
            question: "Como os saldos são liquidados na Teilen?",
            answer:
              "O app calcula automaticamente quem deve para quem e mostra o caminho de pagamento mais eficiente para zerar o grupo.",
          },
        ],
      },
      cta: {
        badge: "Baixe a Teilen",
        title: "Disponível para iOS e Android no Chile e no mundo",
        description:
          "Use o app líder para despesas compartilhadas, divisão de pagamentos e organização financeira onde você estiver. Gratuito, seguro e feito para grupos.",
        availability: "App global para despesas compartilhadas · Download gratuito",
        qrTitle: "Escaneie com sua câmera",
        qrDescription: "Escolha o sistema operacional que preferir e detectamos sua loja automaticamente.",
        qrAlt: "QR universal de download da Teilen",
      },
      testimonials: {
        badge: "Avaliações",
        title: "O que nossa comunidade diz",
        description:
          "Depoimentos reais de usuários piloto que já usam a Teilen para dividir despesas sem drama.",
        starsLabel: "5 de 5 estrelas",
        items: [
          {
            quote:
              "“Com a Teilen conseguimos organizar aluguel e contas do apartamento. O resumo é claro e todos sabem quanto pagar.”",
            author: "Constanza R.",
            context: "Nunoa · Mora com 3 roommates",
          },
          {
            quote:
              "“Foi perfeito para nossa viagem a Chiloe. Cada gasto foi registrado na hora e no final bastaram alguns cliques para quitar tudo.”",
            author: "Diego M.",
            context: "Valparaiso · Viagens em grupo",
          },
          {
            quote:
              "“Eu e meu parceiro estamos bem mais organizados: o app lembra quem pagou cada coisa e evita momentos desconfortáveis com contas da casa.”",
            author: "Camila & Seba",
            context: "Centro de Santiago · Casal jovem",
          },
          {
            quote:
              "“Sou tesoureira de um clube esportivo e a Teilen nos ajudou a controlar aportes e reembolsos com clareza. Os membros ficam informados na hora.”",
            author: "Maria Jose L.",
            context: "Providencia · Clube amador",
          },
        ],
      },
    },
  },
};

export function getHomeMessages(locale: Locale): HomeMessages {
  return homeMessages[locale];
}
