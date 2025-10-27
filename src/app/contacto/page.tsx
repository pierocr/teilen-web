import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contáctanos",
  description:
    "Comunícate con el equipo de Teilen. Encuentra los canales oficiales de soporte, colaboraciones y prensa.",
};

type ContactChannel = {
  title: string;
  description: string;
  subject: string;
};

const contactChannels: ContactChannel[] = [
  {
    title: "Soporte a usuarios",
    description:
      "¿Problemas con un grupo, un saldo o la app? Escríbenos y el equipo de soporte responderá en menos de 24 horas hábiles.",
    subject: "Soporte Teilen",
  },
  {
    title: "Negocios y alianzas",
    description:
      "Si deseas integrar Teilen en tus productos o explorar una alianza comercial, este es el canal para conversar con nuestro equipo.",
    subject: "Alianzas Teilen",
  },
  {
    title: "Prensa y medios",
    description:
      "Solicitudes de entrevistas, recursos de marca, notas de prensa o media kit para artículos y reportajes.",
    subject: "Prensa Teilen",
  },
];

const officeInfo = [
  { label: "Horario de atención", value: "Lunes a viernes, 09:00 a 18:00 (GMT-3)" },
  { label: "Ubicación", value: "Remoto desde Santiago, Chile" },
  { label: "Correo oficial", value: "contacto@teilen.cl", href: "mailto:contacto@teilen.cl" },
];

export default function ContactPage() {
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
            Contáctanos
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Estamos para apoyarte. Elige el canal apropiado y envíanos un correo a contacto@teilen.cl
            con el asunto sugerido para que podamos ayudarte rápido.
          </p>
          <p className="mt-6 text-sm font-medium text-slate-500">
            También puedes escribirnos desde la app en la sección de Soporte para hacer seguimiento
            a tus mensajes.
          </p>
        </header>

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          {contactChannels.map((channel) => (
            <article
              key={channel.title}
              className="rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-slate-900">{channel.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{channel.description}</p>
              <div className="mt-5 space-y-3">
                <a
                  href={`mailto:contacto@teilen.cl?subject=${encodeURIComponent(channel.subject)}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                >
                  Escribir a contacto@teilen.cl <span aria-hidden>→</span>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Información útil</h2>
          <dl className="mt-6 grid gap-6 md:grid-cols-3">
            {officeInfo.map((info) => (
              <div key={info.label} className="rounded-2xl bg-slate-50/60 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {info.label}
                </dt>
                {info.href ? (
                  <dd className="mt-2 text-base leading-7 text-slate-600">
                    <a
                      href={info.href}
                      className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {info.value}
                    </a>
                  </dd>
                ) : (
                  <dd className="mt-2 text-base leading-7 text-slate-600">{info.value}</dd>
                )}
              </div>
            ))}
          </dl>
        </section>

        <aside className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-900">¿Respuesta urgente?</h3>
          <p className="mt-3 text-base leading-7 text-emerald-900/80">
            Escríbenos con el asunto “Urgente” a{" "}
            <a
              href="mailto:contacto@teilen.cl?subject=Urgente"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>{" "}
            y priorizaremos tu caso de inmediato.
          </p>
        </aside>
      </article>
    </div>
  );
}
