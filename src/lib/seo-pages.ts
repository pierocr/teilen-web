export type SeoLandingPageContent = {
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  badge: string;
  highlights: string[];
  sections: {
    title: string;
    text: string;
  }[];
};

export const seoLandingPages = {
  dividirGastos: {
    path: "/dividir-gastos",
    title: "App para dividir gastos en Chile",
    metaTitle: "App para dividir gastos",
    description:
      "Teilen App te ayuda a dividir gastos con amigos, pareja, familia o compañeros desde una app chilena simple para iOS y Android.",
    badge: "Dividir gastos",
    highlights: [
      "Divide cuentas compartidas de forma clara.",
      "Registra quién pagó y quién participa.",
      "Revisa saldos y pagos desde la app.",
      "Disponible para usuarios en Chile desde iOS y Android.",
    ],
    sections: [
      {
        title: "Cuentas claras",
        text: "Agrega cada gasto compartido y deja que Teilen organice los saldos para que todos puedan revisar la información desde una vista simple.",
      },
      {
        title: "Para grupos reales",
        text: "Úsala en viajes, salidas, cuentas del hogar, compras familiares o planes con amigos donde necesitas dividir cuentas sin hojas de cálculo.",
      },
      {
        title: "También personal",
        text: "Además de gastos compartidos, puedes controlar gastos personales, crear recordatorios y avanzar en metas de ahorro.",
      },
    ],
  },
  gastosCompartidos: {
    path: "/gastos-compartidos",
    title: "Organizar gastos compartidos con Teilen App",
    metaTitle: "Gastos compartidos",
    description:
      "Organiza gastos compartidos, cuentas del hogar, viajes y salidas con Teilen App, una app chilena de finanzas personales.",
    badge: "Gastos compartidos",
    highlights: [
      "Crea grupos para viajes, hogar, pareja o amigos.",
      "Ordena compras, servicios y suscripciones compartidas.",
      "Mantén un historial claro de gastos y pagos.",
      "Conecta gastos compartidos con recordatorios y recurrentes.",
    ],
    sections: [
      {
        title: "Grupos ordenados",
        text: "Crea espacios para cada grupo y registra los gastos asociados a ese contexto, sin mezclar cuentas personales con cuentas compartidas.",
      },
      {
        title: "Saldos visibles",
        text: "Teilen App centraliza gastos, pagos y actividad para que cada participante pueda entender cómo va el grupo.",
      },
      {
        title: "Uso cotidiano",
        text: "Funciona para arriendo, servicios, supermercado, viajes, restaurantes, panoramas y compras que se pagan entre varias personas.",
      },
    ],
  },
  controlDeGastos: {
    path: "/control-de-gastos",
    title: "Control de gastos personales con Teilen App",
    metaTitle: "Control de gastos",
    description:
      "Controla gastos personales, revisa movimientos y organiza tus finanzas desde Teilen App, una app chilena para iOS y Android.",
    badge: "Control de gastos",
    highlights: [
      "Registra gastos personales desde una app simple.",
      "Revisa movimientos y actividad mensual.",
      "Combina control personal con cuentas compartidas.",
      "Agrega recordatorios para pagos importantes.",
    ],
    sections: [
      {
        title: "Finanzas personales",
        text: "Teilen App permite registrar movimientos propios y revisar tu historial para entender mejor cómo se comportan tus gastos.",
      },
      {
        title: "Cuentas y pagos",
        text: "Usa recordatorios y gastos recurrentes para mantener a la vista pagos mensuales, suscripciones, servicios y compromisos importantes.",
      },
      {
        title: "Metas conectadas",
        text: "El control de gastos personales se complementa con metas de ahorro para convertir tus objetivos en avances visibles.",
      },
    ],
  },
  recordatorios: {
    path: "/recordatorios",
    title: "Recordatorios de pago en Teilen App",
    metaTitle: "Recordatorios de pago",
    description:
      "Crea recordatorios de pago para cuentas importantes, vencimientos y gastos recurrentes desde Teilen App.",
    badge: "Recordatorios",
    highlights: [
      "Crea recordatorios para próximos vencimientos.",
      "Organiza servicios, suscripciones y pagos mensuales.",
      "Úsalos para gastos personales o cuentas compartidas.",
      "Revisa qué viene esta semana desde la app.",
    ],
    sections: [
      {
        title: "Pagos a la vista",
        text: "Mantén tus cuentas importantes en un lugar claro para revisar fechas, compromisos y próximos vencimientos.",
      },
      {
        title: "Gastos recurrentes",
        text: "Combina recordatorios con gastos recurrentes para organizar pagos que se repiten cada mes.",
      },
      {
        title: "Para Chile",
        text: "Teilen App está pensada para usuarios en Chile que quieren ordenar cuentas del hogar, servicios, TAG, créditos y suscripciones.",
      },
    ],
  },
  metasDeAhorro: {
    path: "/metas-de-ahorro",
    title: "Metas de ahorro con Teilen App",
    metaTitle: "Metas de ahorro",
    description:
      "Crea metas de ahorro, registra avances y revisa cuánto falta para tus objetivos desde Teilen App.",
    badge: "Metas de ahorro",
    highlights: [
      "Crea objetivos de ahorro personalizados.",
      "Registra avances y revisa el monto faltante.",
      "Acompaña tus metas con control de gastos personales.",
      "Úsala para viajes, vivienda, auto o fondo de emergencia.",
    ],
    sections: [
      {
        title: "Objetivos visibles",
        text: "Convierte tus metas de ahorro en avances concretos para revisar cuánto llevas y cuánto falta para completarlas.",
      },
      {
        title: "Ahorro cotidiano",
        text: "Puedes conectar tus objetivos con una mejor organización de gastos personales, recordatorios y pagos frecuentes.",
      },
      {
        title: "Desde la app",
        text: "Teilen App reúne metas, gastos compartidos y control personal en una experiencia disponible para iOS y Android.",
      },
    ],
  },
} satisfies Record<string, SeoLandingPageContent>;

export const relatedSeoLinks = [
  { label: "Dividir gastos", href: "/dividir-gastos" },
  { label: "Gastos compartidos", href: "/gastos-compartidos" },
  { label: "Control de gastos", href: "/control-de-gastos" },
  { label: "Recordatorios", href: "/recordatorios" },
  { label: "Metas de ahorro", href: "/metas-de-ahorro" },
];
