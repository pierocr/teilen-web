import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Resuelve dudas comunes sobre Teilen: creación de grupos, seguridad de tus datos, planes y compatibilidad.",
  alternates: {
    canonical: "/preguntas-frecuentes",
  },
};

type FAQ = {
  question: string;
  answer: string[];
};

const faqs: FAQ[] = [
  {
    question: "¿Teilen es gratis?",
    answer: [
      "Actualmente Teilen está en fase de acceso anticipado y todas las funcionalidades disponibles son gratuitas.",
      "En el futuro podríamos lanzar planes premium opcionales con herramientas avanzadas, pero siempre habrá una versión gratuita para dividir gastos sin complicaciones.",
    ],
  },
  {
    question: "¿Cómo invito a otras personas a mi grupo?",
    answer: [
      "Desde la app, abre el grupo que deseas compartir y toca “Invitar”. Puedes enviar un enlace mágico, usar correo electrónico o compartir un código QR.",
      "Los invitados recibirán instrucciones para crear cuenta (si aún no tienen) y se unirán automáticamente con los permisos que definas.",
    ],
  },
  {
    question: "¿Qué pasa con mis datos si cierro mi cuenta?",
    answer: [
      "Puedes solicitar la eliminación de tu cuenta desde la sección de privacidad o escribiendo a contacto@teilen.cl (asunto: Eliminación de cuenta).",
      "Eliminaremos o anonimizaremos tus datos dentro de plazos razonables, salvo la información que debamos mantener por obligaciones legales.",
    ],
  },
  {
    question: "¿Puedo usar Teilen sin conexión?",
    answer: [
      "Puedes registrar gastos sin conexión temporal. La app guardará los cambios y los sincronizará automáticamente cuando recuperes conexión a internet.",
      "Recomendamos conectarte cuanto antes para mantener los saldos del grupo actualizados para todos.",
    ],
  },
  {
    question: "¿En qué plataformas está disponible?",
    answer: [
      "Estamos desarrollando las apps para iOS y Android. Además puedes acceder a la versión web desde el navegador.",
      "Suscríbete en la app para recibir las invitaciones beta y las novedades de lanzamiento oficial.",
    ],
  },
  {
    question: "¿Cómo reporto un problema o sugerencia?",
    answer: [
      "Desde la app, abre el Centro de ayuda y selecciona “Enviar feedback”. También puedes escribirnos a contacto@teilen.cl con capturas y descripción detallada.",
      "Leemos cada mensaje y priorizamos las mejoras de acuerdo a impacto y demanda.",
    ],
  },
];

export default function FAQPage() {
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
            Ayuda
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Preguntas frecuentes
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Encuentra respuestas a las dudas más comunes sobre Teilen. Si no ves tu pregunta, pasa
            por el Centro de ayuda o escríbenos directamente.
          </p>
          <p className="mt-6 text-sm font-medium text-slate-500">
            Última actualización: 21 de noviembre de 2024
          </p>
        </header>

        <section className="mt-14 divide-y divide-slate-200 rounded-3xl border border-slate-100 bg-white/80 shadow-sm">
          {faqs.map((faq, index) => (
            <article key={faq.question} className="p-6 md:p-8">
              <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                {index + 1}. {faq.question}
              </h2>
              <div className="mt-4 space-y-3 text-base leading-7 text-slate-600">
                {faq.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </section>

        <aside className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-900">¿Todavía sin respuesta?</h3>
          <p className="mt-3 text-base leading-7 text-emerald-900/80">
            Explora el{" "}
            <Link
              href="/centro-de-ayuda"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              Centro de ayuda
            </Link>{" "}
            o escríbenos a{" "}
            <a
              href="mailto:contacto@teilen.cl"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>
            . Queremos que dividir gastos sea tan simple como debería ser.
          </p>
        </aside>
      </article>
    </div>
  );
}
