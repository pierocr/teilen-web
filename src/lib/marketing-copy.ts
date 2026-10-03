import type { Locale } from "./i18n";
import { englishMarketing } from "./marketing-locales/en";
import { germanMarketing } from "./marketing-locales/de";
import { portugueseMarketing } from "./marketing-locales/pt";
import { italianMarketing } from "./marketing-locales/it";
import { frenchMarketing } from "./marketing-locales/fr";

export const spanishMarketing = {
  nav: ["La app", "Cómo funciona", "Planes", "Ayuda"],
  download: "Descargar app", freeDownload: "Descargar gratis", how: "Así funciona", menu: "Abrir menú", closeMenu: "Cerrar menú",
  hero: ["Menos cuentas.", "Más planes.", "Más vida."],
  intro: "Divide los gastos en grupo y ordena tus finanzas personales. Todo en Teilen, para que lo importante siga siendo disfrutar.",
  available: "Disponible en iOS y Android", pillars: ["Gastos compartidos", "Finanzas personales", "Metas de ahorro"],
  dinner: "Cena con amigos", dinnerDetail: "4 personas · $12.000 c/u", example: "Ejemplo ilustrativo en pesos chilenos",
  sharingTitle: "Compartir es fácil.\nLas cuentas también.", sharingIntro: "Del primer café al último día de viaje, cada gasto tiene su lugar.",
  cases: [
    {tab: "Con amigos", title: "El viaje se disfruta.\nLos gastos se comparten.", description: "Crea un grupo, agrega lo que pagó cada persona y deja que Teilen calcule los saldos.", steps: ["Crea un grupo e invita", "Agrega y divide los gastos", "Revisa quién le debe a quién"], details: ["Comparte el enlace o el QR de tu grupo con quienes se suman al plan.", "Registra quién pagó y reparte en partes iguales, porcentajes o montos personalizados.", "Consulta los saldos y registra los pagos que realicen para dejar las cuentas claras."], link: "Explorar gastos compartidos", href: "/gastos-compartidos", group: "Escapada al sur", people: "3 personas", rows: ["Cabaña", "Supermercado", "Bencina"], payers: ["Pagó Cami", "Pagó Nico", "Pagaste tú"], amounts: [90000,30000,15000], total: "Total del grupo", resultLabel: "A cada persona le corresponde", result: 45000},
    {tab: "En pareja", title: "Más equipo.\nMenos ‘¿quién pagó?’.", description: "Desde el arriendo hasta esa cena especial. Tengan a mano los gastos y los saldos que comparten.", steps: ["Creen su espacio compartido", "Repartan a su manera", "Mantengan las cuentas claras"], details: ["Un grupo para la casa, las vacaciones o el proyecto que tienen en común.", "Dividan cada gasto en partes iguales, por porcentaje o con montos personalizados.", "Revisen juntos los movimientos y registren los pagos realizados."], link: "Descubrir cómo dividir gastos", href: "/dividir-gastos", group: "Nuestra casa", people: "2 personas", rows: ["Supermercado", "Cena del viernes", "Internet"], payers: ["Pagó Dani", "Pagaste tú", "Pagó Dani"], amounts: [60000,40000,20000], total: "Total compartido", resultLabel: "Al dividir en partes iguales", result: 60000},
    {tab: "Con roomies", title: "Compartan la casa.\nTambién la tranquilidad.", description: "Arriendo, servicios y compras comunes en un solo lugar. Cada persona sabe qué pagó y cuánto le toca.", steps: ["Inviten a toda la casa", "Anoten los gastos comunes", "Consulten el saldo de cada uno"], details: ["Creen un grupo y compartan su enlace de invitación.", "Agreguen los gastos y elijan quiénes participan en cada uno.", "El historial compartido ayuda a resolver dudas sin buscar entre mensajes."], link: "Organizar los gastos de casa", href: "/gastos-compartidos", group: "Depto compartido", people: "3 personas", rows: ["Arriendo", "Electricidad", "Internet"], payers: ["Pagó Fran", "Pagó Alex", "Pagaste tú"], amounts: [450000,30000,30000], total: "Total de la casa", resultLabel: "A cada persona le corresponde", result: 170000},
    {tab: "Para ti", title: "Tu mes,\ncon todo más claro.", description: "Registra ingresos y gastos personales, revisa tus categorías y da seguimiento a tus metas de ahorro.", steps: ["Registra tus movimientos", "Mira en qué estás gastando", "Avanza hacia tus metas"], details: ["Lleva tus ingresos y gastos personales en tu propio espacio.", "Consulta tu actividad y las estadísticas para entender mejor tu mes.", "Crea una meta y registra tus aportes para ver tu progreso."], link: "Explorar finanzas personales", href: "/control-de-gastos", group: "Mis gastos del mes", people: "Mi espacio personal", rows: ["Supermercado", "Transporte", "Cafés y salidas"], payers: ["Alimentación", "Movilidad", "Tiempo libre"], amounts: [90000,30000,15000], total: "Total registrado", resultLabel: "Gastos personales organizados", result: 135000},
  ],
  calculator: "Pruébalo con tu próximo plan", amountLabel: "Total del gasto (CLP)", peopleLabel: "Personas", perPerson: "por persona", calculatorHint: "Reparto en partes iguales. Para otros acuerdos, elige porcentajes o montos en la app.", invalid: "Ingresa un monto válido y entre 2 y 100 personas.", remainder: "El reparto no es exacto en pesos: algunas personas pagan $1 más para completar el total.",
  featuresTitle: "Tu dinero,\ncon más claridad.", featuresIntro: "Lo compartido y lo personal, en una sola app.", goalTitle: "Haz espacio para\ntu próximo gran plan.", goalDescription: "Registra tus gastos personales y sigue tus metas de ahorro.", goalName: "Viaje al sur", goalOf: "de", goalExample: "Ejemplo de una meta", goalLink: "Conocer las metas de ahorro",
  features: [
    {title: "Menos tecleo, más tiempo", description: "Escanea tus boletas con IA y revisa los datos antes de guardar.", href: "/dividir-gastos"},
    {title: "Que una cuenta no te sorprenda", description: "Organiza gastos recurrentes y recordatorios de vencimiento.", href: "/recordatorios"},
    {title: "Entiende en qué gastas", description: "Consulta tu actividad, categorías y reportes.", href: "/control-de-gastos"},
  ],
  life: "La vida pasa fuera\nde una planilla.", lifeIntro: "Hagan más planes. Teilen les ayuda con las cuentas.",
  plansTitle: "Empieza gratis.\nCrece a tu ritmo.", plansIntro: "Elige cómo quieres organizarte.", freeTitle: "Teilen Gratis", freeIntro: "Para empezar a ordenar tus cuentas.", freeFeatures: ["Gastos compartidos y personales", "Hasta 3 grupos activos", "Metas de ahorro", "Hasta 3 escaneos de boletas con IA al mes"], freeCta: "Empezar gratis",
  premiumTitle: "Teilen Premium", premiumBadge: "Más posibilidades", premiumIntro: "Para quienes quieren ir un paso más allá.", premiumValue: "Tu siguiente nivel", premiumPriceMonthly: "CLP $3.980 / mes", premiumPriceMonthlyUsd: "≈ US$4,15 / mes", premiumPriceAnnual: "o CLP $19.990 / año · ≈ US$21", premiumFeatures: ["Grupos y escaneos ilimitados", "Reportes en PDF y Excel", "Gastos recurrentes y cuotas", "Seguimiento de inversiones"], premiumCta: "Conocer Premium", planNote: "Los valores en USD son referenciales y pueden variar según el tipo de cambio. Las suscripciones se gestionan en App Store o Google Play.",
  faqTitle: "Todo claro,\ndesde el principio.", faqMore: "Ver todas las preguntas", faqs: [
    {question: "¿Qué puedo hacer con Teilen?", answer: "Puedes dividir gastos con amigos, pareja o roomies; registrar ingresos y gastos personales; crear recordatorios y seguir metas de ahorro. Todo desde una misma app."},
    {question: "¿Es gratis?", answer: "Sí. El plan Gratis incluye gastos personales, hasta 5 gastos compartidos al día, hasta 3 grupos activos, metas de ahorro, hasta 3 escaneos de boletas con IA al mes y hasta 3 recordatorios. Premium amplía esos límites y añade funciones avanzadas. Revisa los límites y precios vigentes dentro de la app."},
    {question: "¿Teilen mueve mi dinero?", answer: "No. Teilen organiza tus gastos, calcula saldos y permite registrar pagos que ya realizaste. Las transferencias las haces por el medio que acuerdes con las otras personas. Las metas y las inversiones son registros de seguimiento, no cuentas de custodia."},
    {question: "¿Está disponible para iOS y Android?", answer: "Sí. Descarga Teilen desde App Store o Google Play. Puedes compartir un grupo con personas que usen cualquiera de los dos sistemas."},
  ],
  closingTitle: "Tu próximo plan\nempieza con Teilen.", closingIntro: "Las cuentas claras. La vida por delante.",
  footerDescription: "Lo que compartes y lo que es tuyo. Tus cuentas, más claras con Teilen.", footerHeadings: ["Producto", "Ayuda", "Legal"], footerProduct: ["Dividir gastos", "Gastos compartidos", "Finanzas personales", "Metas de ahorro", "Premium"], footerHelp: ["Centro de ayuda", "Preguntas frecuentes", "Contacto"], footerLegal: ["Privacidad", "Términos y condiciones", "Cookies"], madeIn: "Hecho en Chile, para tus planes.", allRights: "Todos los derechos reservados.",
};

export type MarketingCopy = typeof spanishMarketing;
const marketingByLocale: Record<Locale, MarketingCopy> = {
  es: spanishMarketing,
  en: englishMarketing,
  de: germanMarketing,
  pt: portugueseMarketing,
  it: italianMarketing,
  fr: frenchMarketing,
};

export function getMarketingCopy(locale: Locale): MarketingCopy {
  return marketingByLocale[locale];
}
