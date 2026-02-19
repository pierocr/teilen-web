export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Lee las condiciones de uso de Teilen, obligaciones de los usuarios y reglas que rigen el servicio para dividir gastos.",
  alternates: {
    canonical: "/terminos",
  },
};

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: { title: string; description: string }[];
};

const sections: Section[] = [
  {
    title: "1. Aceptación de los términos",
    paragraphs: [
      "Al crear una cuenta, acceder o utilizar Teilen aceptas estos Términos y cualquier política adicional que publiquemos, como la Política de Privacidad y la Política de Cookies.",
      "Si no estás de acuerdo con alguna sección, debes dejar de utilizar el servicio. Podemos modificar estos Términos en cualquier momento y te avisaremos cuando existan cambios significativos.",
    ],
  },
  {
    title: "2. Descripción del servicio",
    paragraphs: [
      "Teilen es una aplicación que ayuda a organizar, dividir y dar seguimiento a gastos grupales. Ofrecemos herramientas para registrar transacciones, compartir resúmenes y coordinar pagos pendientes.",
      "Algunas funcionalidades pueden estar sujetas a versiones beta, periodos de prueba o disponibilidad limitada por región.",
    ],
  },
  {
    title: "3. Elegibilidad y cuentas",
    paragraphs: [
      "Debes tener al menos 18 años para usar Teilen. Al registrarte, confirmas que tienes la capacidad legal para celebrar este acuerdo.",
      "Es tu responsabilidad entregar información veraz, mantener la confidencialidad de tus credenciales y notificar actividades sospechosas. Puedes cerrar tu cuenta en cualquier momento desde la configuración o escribiéndonos.",
    ],
  },
  {
    title: "4. Uso permitido",
    paragraphs: [
      "Queremos que Teilen sea un espacio seguro y confiable. Está prohibido:",
    ],
    bullets: [
      {
        title: "Uso indebido o fraudulento",
        description:
          "Registrar información falsa, suplantar identidades o manipular datos para obtener beneficios indebidos.",
      },
      {
        title: "Interferencia técnica",
        description:
          "Modificar, descompilar, escanear o intentar vulnerar la seguridad de la plataforma o de nuestros sistemas.",
      },
      {
        title: "Violaciones legales",
        description:
          "Utilizar Teilen para actividades ilegales, lavar activos o incumplir normativas financieras y tributarias.",
      },
      {
        title: "Uso abusivo",
        description:
          "Enviar spam, acosar a otros usuarios o compartir contenido ofensivo a través de las herramientas de comunicación.",
      },
    ],
  },
  {
    title: "5. Contenido creado por usuarios",
    paragraphs: [
      "Los datos y descripciones de tus gastos pertenecen a ti y a los miembros de tus grupos. No reclamamos propiedad sobre ese contenido, pero nos otorgas las licencias necesarias para operar la plataforma y mostrar la información a quienes corresponda.",
      "Eres responsable de garantizar que tienes los derechos para compartir la información que ingresas en Teilen.",
    ],
  },
  {
    title: "6. Planes, pagos y terceros",
    paragraphs: [
      "Teilen puede ofrecer funcionalidades gratuitas y de pago. Cuando existan cobros, los detalles de precio, ciclo de facturación y reembolsos se publicarán claramente antes de realizar la compra.",
      "Si utilizas integraciones o servicios de terceros, sus términos y políticas aplicarán además de estos Términos. No somos responsables por la disponibilidad o funcionamiento de servicios externos.",
    ],
  },
  {
    title: "7. Propiedad intelectual",
    paragraphs: [
      "El contenido visual, marcas, logotipos, código y documentación de Teilen son propiedad de Teilen o de nuestros licenciantes. No puedes utilizar nuestra identidad de marca sin autorización escrita.",
      "Se permite el uso limitado para mencionar o enlazar nuestra app, siempre que no se genere confusión ni se sugiera una asociación inexistente.",
    ],
  },
  {
    title: "8. Garantías y responsabilidad",
    paragraphs: [
      "Teilen se proporciona \"tal cual\" sin garantías expresas o implícitas respecto de su disponibilidad o cumplimiento de requisitos específicos. Hacemos esfuerzos razonables para mantener el servicio estable, pero no garantizamos ausencia de errores o interrupciones.",
      "En la medida permitida por la ley, nuestra responsabilidad total frente a cualquier reclamo se limita al monto pagado por ti durante los doce meses anteriores al hecho que dé origen a la responsabilidad.",
    ],
  },
  {
    title: "9. Terminación",
    paragraphs: [
      "Podemos suspender o cerrar cuentas cuando detectemos violaciones graves a estos Términos, conductas fraudulentas o riesgos para otros usuarios.",
      "También puedes dejar de utilizar Teilen en cualquier momento; tu obligación de pagar montos pendientes o cumplir requisitos legales permanecerá vigente.",
    ],
  },
  {
    title: "10. Legislación aplicable",
    paragraphs: [
      "Estos Términos se rigen por las leyes de la República de Chile. Cualquier controversia se resolverá en los tribunales ordinarios de la ciudad de Santiago, sin perjuicio de los derechos que la legislación obligatoria otorgue a los consumidores.",
    ],
  },
  {
    title: "11. Contacto",
    paragraphs: [
      "Si necesitas aclarar alguna sección de estos Términos, escríbenos y te responderemos a la brevedad.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-[-12rem] h-96 w-[32rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-18rem] top-20 h-[28rem] w-[36rem] rounded-full bg-teal-200/30 blur-3xl" />

      <article className="relative mx-auto max-w-5xl px-6 pb-24 pt-24 md:pb-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
          aria-label="Volver al inicio"
        >
          <span aria-hidden>←</span> Volver al inicio
        </Link>

        <header className="mt-10 rounded-3xl border border-white/60 bg-white/80 p-10 shadow-soft backdrop-blur">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Legal
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Términos y Condiciones de Teilen
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            El uso de Teilen implica ciertas reglas y responsabilidades para todos los miembros de
            la comunidad. Léelas con calma para entender cómo te protegemos y qué esperamos de ti.
          </p>
          <p className="mt-6 text-sm font-medium text-slate-500">
            Última actualización: 21 de noviembre de 2024
          </p>
        </header>

        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{section.title}</h2>

              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-base leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className="mt-6 space-y-4 rounded-2xl border border-slate-100 bg-white/70 p-6">
                  {section.bullets.map((item) => (
                    <li key={item.title} className="flex flex-col gap-1 text-slate-600">
                      <span className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                        {item.title}
                      </span>
                      <span className="text-base leading-7 text-slate-600">{item.description}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-900">¿Dudas sobre estos términos?</h3>
          <p className="mt-3 text-base leading-7 text-emerald-900/80">
            Escríbenos a{" "}
            <a
              href="mailto:contacto@teilen.cl"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>{" "}
            indicando “Términos” en el asunto y te ayudaremos a resolver cualquier consulta antes de
            continuar con el servicio.
          </p>
        </aside>
      </article>
    </div>
  );
}
