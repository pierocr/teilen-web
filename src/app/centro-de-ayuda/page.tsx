import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Centro de Ayuda",
  description:
    "Explora guías rápidas y recursos para usar Teilen como un experto. Encuentra respuestas sobre grupos, gastos y saldos.",
};

type Guide = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

const quickGuides: Guide[] = [
  {
    title: "Crear tu primer grupo",
    description: "Aprende a invitar a tus amigos, asignar roles y mantener todo organizado desde el día uno.",
    href: "#crear-grupo",
    badge: "Básico",
  },
  {
    title: "Registrar gastos como un pro",
    description: "Cómo dividir montos exactos, porcentajes personalizados y agregar comprobantes claros.",
    href: "#registrar-gastos",
    badge: "Intermedio",
  },
  {
    title: "Cerrar un ciclo y saldar saldos",
    description: "Consejos para evitar dobles pagos, solicitar reembolsos y mantener las cuentas limpias.",
    href: "#saldos",
    badge: "Tips",
  },
];

const helpTopics: { id: string; title: string; content: string[] }[] = [
  {
    id: "crear-grupo",
    title: "Crear y gestionar grupos",
    content: [
      "Ve a la pantalla principal y toca “Nuevo grupo”. Elige un nombre, foto opcional y define si es para pareja, amigos, viaje u otro contexto.",
      "Invita a compañeros usando su correo, número de teléfono o un enlace mágico generado por Teilen.",
      "Define permisos: puedes dar acceso para registrar gastos, solo visualizar o administrar saldos.",
    ],
  },
  {
    id: "registrar-gastos",
    title: "Registrar gastos y compartir comprobantes",
    content: [
      "Selecciona el grupo, presiona “Nuevo gasto” e ingresa el monto, la fecha y la categoría.",
      "Decide si el gasto se divide en partes iguales, por porcentaje o asignando montos personalizados.",
      "Adjunta recibos o fotos para mantener trazabilidad y agrega notas para recordar detalles importantes.",
    ],
  },
  {
    id: "saldos",
    title: "Saldos, reembolsos y ciclos",
    content: [
      "La tarjeta de resumen muestra quién debe a quién en tiempo real. Puedes filtrar por miembro o por rango de fechas.",
      "Cuando estés listo para cerrar el ciclo, toca “Sugerir pagos” y Teilen generará la forma más eficiente de saldar.",
      "Los pagos registrados quedan marcados como “Pendiente” hasta que todos los participantes confirmen el movimiento.",
    ],
  },
];

export default function HelpCenterPage() {
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
            Centro de Ayuda de Teilen
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Guías prácticas y recomendaciones para aprovechar Teilen al máximo. Encuentra respuestas
            rápidas o profundiza en los temas que más te interesan.
          </p>
          <p className="mt-6 text-sm font-medium text-slate-500">
            ¿Necesitas soporte directo? Escríbenos a{" "}
            <a
              href="mailto:contacto@teilen.cl"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>{" "}
            o desde la app.
          </p>
        </header>

        <section className="mt-14">
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Guías rápidas</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {quickGuides.map((guide) => (
              <a
                key={guide.title}
                href={guide.href}
                className="group rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                {guide.badge ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {guide.badge}
                  </span>
                ) : null}
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{guide.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition group-hover:gap-3">
                  Ver guía <span aria-hidden>→</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-12">
          {helpTopics.map((topic) => (
            <article key={topic.id} id={topic.id} className="rounded-3xl border border-slate-100 bg-white/80 p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{topic.title}</h2>
              <ul className="mt-6 space-y-4 text-base leading-7 text-slate-600">
                {topic.content.map((paragraph) => (
                  <li key={paragraph} className="rounded-2xl bg-slate-50/60 p-4 text-slate-700">
                    {paragraph}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <aside className="mt-16 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-emerald-900">¿No encontraste lo que buscabas?</h3>
          <p className="mt-3 text-base leading-7 text-emerald-900/80">
            Escríbenos desde la app o envía un correo a{" "}
            <a
              href="mailto:contacto@teilen.cl"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>{" "}
            y uno de nuestros especialistas te ayudará a resolverlo.
          </p>
        </aside>
      </article>
    </div>
  );
}
