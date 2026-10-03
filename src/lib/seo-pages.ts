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
    title: "Dividir gastos. Seguir disfrutando.",
    metaTitle: "App para dividir gastos",
    description:
      "La cena, el viaje o las cuentas de la casa. Divide gastos con amigos, pareja o roomies y deja que Teilen calcule cuánto le corresponde a cada uno.",
    badge: "Dividir gastos",
    highlights: [
      "Reparte en partes iguales, por monto o por porcentaje.",
      "Asigna los productos de una boleta a cada persona.",
      "Revisa cuánto debes y cuánto te deben.",
      "Guarda el historial de gastos y pagos del grupo.",
    ],
    sections: [
      {
        title: "El plan empieza con un grupo",
        text: "Crea un grupo para el viaje, la casa o tus salidas. Añade participantes e invítalos por enlace o QR para reunir los gastos en un mismo lugar.",
      },
      {
        title: "Cada persona, su parte",
        text: "Registra quién pagó y elige cómo repartir el gasto. Puedes dividir por igual, ingresar montos, usar porcentajes o añadir el detalle de lo que consumió cada persona.",
      },
      {
        title: "Un saldo que todos entienden",
        text: "Teilen calcula las cuentas pendientes del grupo. Cuando se paguen por transferencia, efectivo u otro medio, registra el pago en la app y conserva el historial.",
      },
    ],
  },
  gastosCompartidos: {
    path: "/gastos-compartidos",
    title: "Compartan los planes. Aclaren las cuentas.",
    metaTitle: "Gastos compartidos",
    description:
      "Organiza los gastos compartidos de tu casa, tu pareja o tu próximo viaje. Todo lo que pagaron y lo que queda por saldar, en un solo grupo.",
    badge: "Gastos compartidos",
    highlights: [
      "Crea grupos para viajes, hogar, pareja o amigos.",
      "Reparte compras, servicios y suscripciones como necesites.",
      "Mantén un historial claro de gastos y pagos.",
      "Añade notas, categorías y comprobantes a tus gastos.",
    ],
    sections: [
      {
        title: "Un espacio para cada plan",
        text: "Arriendo y supermercado en el grupo de la casa. Alojamiento y bencina en el del viaje. Organiza cada contexto con sus integrantes, gastos y saldo.",
      },
      {
        title: "Menos mensajes preguntando",
        text: "Consulta quién pagó, cuánto le corresponde a cada persona y qué falta saldar. El historial reúne los gastos y los pagos registrados para que la información esté a mano.",
      },
      {
        title: "Más herramientas con Premium",
        text: "Programa gastos recurrentes y cuotas, crea grupos sin límite y exporta reportes en PDF y Excel. Las funciones Premium se activan desde la app.",
      },
    ],
  },
  controlDeGastos: {
    path: "/control-de-gastos",
    title: "Entiende tus gastos. Organiza tu mes.",
    metaTitle: "Control de gastos",
    description:
      "Lleva el control de tus gastos e ingresos personales, revisa tus categorías y sigue las cuentas compartidas. Una vista más clara de la plata que registras.",
    badge: "Control de gastos",
    highlights: [
      "Registra ingresos y gastos con sus categorías.",
      "Define tu presupuesto general para el mes.",
      "Consulta estadísticas y compara tus meses.",
      "Complementa tu registro personal con gastos compartidos.",
    ],
    sections: [
      {
        title: "Empieza por lo cotidiano",
        text: "Anota tus ingresos y gastos con fecha, descripción y categoría. Puedes consultar tus movimientos, filtrar el historial y volver al detalle cuando lo necesites.",
      },
      {
        title: "Dale contexto a tus números",
        text: "Define un presupuesto mensual y revisa cuánto llevas gastado. Las estadísticas y las comparaciones entre meses te ayudan a reconocer patrones en los movimientos registrados.",
      },
      {
        title: "Tu información, a mano",
        text: "Revisa tus finanzas personales y los reportes de tus grupos desde la misma app. Con Premium puedes exportar tu resumen personal en PDF y los reportes de grupo en PDF y Excel.",
      },
    ],
  },
  recordatorios: {
    path: "/recordatorios",
    title: "Tus cuentas a tiempo. Tu cabeza más libre.",
    metaTitle: "Recordatorios de pago",
    description:
      "Crea recordatorios para el arriendo, internet, tarjetas o suscripciones. Ten a la vista tus próximos vencimientos y elige cuándo recibir avisos.",
    badge: "Recordatorios",
    highlights: [
      "Organiza cada cuenta por nombre y categoría.",
      "Define su fecha, frecuencia y monto estimado opcional.",
      "Activa los avisos que te ayuden a recordar.",
      "Consulta próximos vencimientos y cuentas vencidas.",
    ],
    sections: [
      {
        title: "Cada cuenta tiene su lugar",
        text: "Añade el nombre, la categoría y el vencimiento. Puedes organizar cuentas mensuales, quincenales, semanales, anuales o de una sola vez, e incluir un monto de referencia.",
      },
      {
        title: "Un aviso cuando lo necesitas",
        text: "Elige la anticipación disponible en tu plan y activa las notificaciones del dispositivo. Premium añade más opciones de anticipación y recordatorios ilimitados.",
      },
      {
        title: "Listo para el siguiente ciclo",
        text: "Revisa los vencimientos de la semana y actualiza la fecha al siguiente ciclo cuando corresponda. Los recordatorios organizan tus fechas; no realizan pagos ni crean movimientos de dinero.",
      },
    ],
  },
  metasDeAhorro: {
    path: "/metas-de-ahorro",
    title: "Ese plan que tienes, cada vez más cerca.",
    metaTitle: "Metas de ahorro",
    description:
      "Un viaje, tu próximo auto o un fondo de emergencia. Ponle nombre a tu meta de ahorro, registra tus aportes y mira cuánto has avanzado.",
    badge: "Metas de ahorro",
    highlights: [
      "Define un objetivo y el monto que quieres alcanzar.",
      "Registra tus aportes y retiros en cada meta.",
      "Consulta tu progreso y cuánto te falta.",
      "Crea metas de ahorro desde el plan gratuito.",
    ],
    sections: [
      {
        title: "Dale forma a tu próximo plan",
        text: "Crea una meta con nombre, categoría y monto objetivo. Puedes organizar un viaje, una compra importante o un fondo para imprevistos, y seguir cada propósito por separado.",
      },
      {
        title: "Cada aporte cuenta",
        text: "Cuando apartes dinero para tu meta, registra el aporte en Teilen. Añade también los retiros para que tu progreso refleje los movimientos que has registrado.",
      },
      {
        title: "Mira cuánto has avanzado",
        text: "Consulta el monto registrado, tu porcentaje de avance y lo que falta para llegar al objetivo. Teilen te ayuda a llevar el seguimiento; tu dinero permanece donde tú lo guardas.",
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
