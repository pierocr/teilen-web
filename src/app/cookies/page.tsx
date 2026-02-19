export const runtime = "edge";

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Descubre qué cookies utiliza Teilen, para qué se usan y cómo puedes gestionar tus preferencias desde la app o el navegador.",
  alternates: {
    canonical: "/cookies",
  },
};

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: { title: string; description: string }[];
};

const sections: Section[] = [
  {
    title: "1. ¿Qué son las cookies?",
    paragraphs: [
      "Las cookies son archivos pequeños que se almacenan en tu dispositivo cuando visitas un sitio o usas una aplicación. Sirven para recordar tus preferencias, mantener tu sesión activa y ofrecerte una experiencia más personalizada.",
      "También utilizamos tecnologías similares como píxeles o almacenamiento local con objetivos comparables a los descritos en esta política.",
    ],
  },
  {
    title: "2. Cookies que utiliza Teilen",
    paragraphs: [
      "Usamos cookies propias y de terceros para diferentes finalidades. La mayoría se puede desactivar desde tu navegador, aunque algunas son esenciales para que la plataforma funcione correctamente.",
    ],
    bullets: [
      {
        title: "Cookies esenciales",
        description:
          "Permiten que la app funcione: inicio de sesión, mantener tu sesión segura y recordar elementos temporales como grupos o gastos recientes.",
      },
      {
        title: "Cookies de preferencia",
        description:
          "Guardan configuraciones como idioma, modo de visualización o características personalizadas de tus grupos.",
      },
      {
        title: "Cookies de análisis",
        description:
          "Nos ayudan a entender cómo se usa Teilen, qué pantallas se visitan y qué funciones podemos mejorar. Recopilan datos agregados y no identifican directamente a los usuarios.",
      },
    ],
  },
  {
    title: "3. Cookies de terceros",
    paragraphs: [
      "Podemos trabajar con proveedores que instalan cookies en tu dispositivo para medir métricas, enviar comunicaciones transaccionales o mostrar materiales promocionales sobre Teilen en otros sitios.",
      "Cada proveedor tiene sus propias políticas de privacidad. Revisamos cuidadosamente los acuerdos y exigimos que usen la información únicamente según nuestras instrucciones.",
    ],
  },
  {
    title: "4. Cómo gestionar tus preferencias",
    paragraphs: [
      "Puedes modificar la configuración de cookies directamente en tu navegador. La mayoría permite bloquear o eliminar cookies existentes y definir niveles de privacidad por sitio.",
      "Si desactivas cookies esenciales, algunas funciones de Teilen podrían dejar de operar correctamente, como mantener la sesión activa o guardar ciertos ajustes.",
    ],
  },
  {
    title: "5. Actualizaciones de esta política",
    paragraphs: [
      "Podemos actualizar la Política de Cookies cuando agreguemos nuevas funcionalidades, modifiquemos proveedores o cambien las regulaciones. Siempre publicaremos la fecha de la última revisión y, si los cambios son sustanciales, te avisaremos oportunamente.",
    ],
  },
  {
    title: "6. Contacto",
    paragraphs: [
      "¿Necesitas más detalles sobre el uso de cookies? Escríbenos y resolveremos tus preguntas.",
    ],
  },
];

export default function CookiesPage() {
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
            Política de Cookies de Teilen
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            En Teilen queremos ser transparentes sobre cómo mejoramos tu experiencia usando cookies
            y tecnologías similares. Aquí encontrarás la información clave para tomar decisiones
            informadas.
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
          <h3 className="text-lg font-semibold text-emerald-900">¿Preguntas sobre cookies?</h3>
          <p className="mt-3 text-base leading-7 text-emerald-900/80">
            Escríbenos a{" "}
            <a
              href="mailto:contacto@teilen.cl"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>{" "}
            y cuéntanos cómo podemos ayudarte, indicando “Cookies” en el asunto.
          </p>
        </aside>
      </article>
    </div>
  );
}
