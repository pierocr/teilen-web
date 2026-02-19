import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo Teilen protege tus datos personales y garantiza la seguridad de tu información financiera y de tus grupos.",
  alternates: {
    canonical: "/privacidad",
  },
};

type Section = {
  title: string;
  paragraphs: string[];
  bullets?: { title: string; description: string }[];
};

const sections: Section[] = [
  {
    title: "1. Introducción",
    paragraphs: [
      "En Teilen nos comprometemos a proteger tu privacidad y a manejar tus datos personales de forma responsable. Esta Política describe qué información recopilamos, por qué lo hacemos y cómo puedes ejercer tus derechos.",
      "Si tienes preguntas o necesitas aclaraciones, puedes escribirnos en cualquier momento y estaremos felices de ayudarte.",
    ],
  },
  {
    title: "2. Información que recopilamos",
    paragraphs: [
      "Recopilamos datos que nos permiten prestarte un servicio seguro y confiable. Estos datos pueden obtenerse cuando creas una cuenta, interactúas con la app o nos contactas para recibir soporte.",
    ],
    bullets: [
      {
        title: "Datos de identificación",
        description:
          "Nombre y apellidos, número de teléfono, correo electrónico y país de residencia.",
      },
      {
        title: "Información de cuenta y uso",
        description:
          "Grupos creados, gastos registrados, roles dentro de cada grupo y preferencias de notificaciones.",
      },
      {
        title: "Datos de transacciones",
        description:
          "Montos, descripciones, participantes y fechas de gastos o reembolsos que ingresas en Teilen.",
      },
      {
        title: "Soporte y comunicaciones",
        description:
          "Mensajes que envías a nuestro equipo, grabaciones de llamadas (cuando corresponda) y respuestas a encuestas o investigación de experiencia.",
      },
      {
        title: "Información técnica",
        description:
          "Datos del dispositivo (modelo, sistema operativo, versión de la app), dirección IP aproximada y eventos técnicos necesarios para mantener la plataforma segura y performante.",
      },
    ],
  },
  {
    title: "3. Cómo usamos tu información",
    paragraphs: [
      "Utilizamos tus datos personales solo cuando tenemos una base legal válida y con propósitos específicos:",
    ],
    bullets: [
      {
        title: "Prestar y mejorar el servicio",
        description:
          "Permitir que registres gastos, invites a otras personas, hagas seguimiento de saldos y recibas notificaciones relevantes.",
      },
      {
        title: "Seguridad y prevención de fraude",
        description:
          "Monitorear comportamientos sospechosos, detectar accesos no autorizados y resguardar la integridad de la plataforma.",
      },
      {
        title: "Comunicación contigo",
        description:
          "Responder tus solicitudes de soporte, enviarte avisos sobre cambios importantes, recordatorios o novedades estrictamente relacionadas con Teilen.",
      },
      {
        title: "Análisis y producto",
        description:
          "Generar métricas agregadas para entender el uso de la app, lanzar nuevas funcionalidades y mejorar tu experiencia.",
      },
      {
        title: "Cumplimiento legal",
        description:
          "Dar respuesta a requerimientos regulatorios o judiciales cuando las autoridades competentes lo soliciten conforme a la ley aplicable.",
      },
    ],
  },
  {
    title: "4. Con quién compartimos los datos",
    paragraphs: [
      "No vendemos tu información personal. Podemos compartir ciertos datos con proveedores que nos ayudan a operar Teilen, siempre bajo contratos que protegen tu privacidad.",
      "Estos proveedores incluyen servicios de infraestructura en la nube, herramientas de análisis, canales de comunicación y plataformas de soporte. Compartimos solo lo necesario para que presten el servicio contratado y están obligados a usar la información exclusivamente para esos fines.",
      "Si la ley nos obliga, podremos compartir información con autoridades competentes tras verificar la solicitud. En todos los casos evaluamos cuidadosamente cada requerimiento y solo entregamos lo estrictamente necesario.",
    ],
  },
  {
    title: "5. Conservación y eliminación",
    paragraphs: [
      "Guardamos tus datos mientras mantengas tu cuenta activa o según sea necesario para cumplir los propósitos descritos en esta política.",
      "Cuando solicites eliminar tu cuenta, borraremos o anonimizaremos tus datos dentro de plazos razonables, salvo que debamos conservar cierta información para cumplir obligaciones legales, resolver disputas o mantener registros financieros.",
    ],
  },
  {
    title: "6. Tus derechos de privacidad",
    paragraphs: [
      "Dependiendo de tu país de residencia, puedes ejercer los siguientes derechos sobre tus datos personales:",
    ],
    bullets: [
      {
        title: "Acceso",
        description: "Solicitar una copia de los datos que tenemos sobre ti.",
      },
      {
        title: "Rectificación",
        description: "Actualizar información incorrecta o incompleta.",
      },
      {
        title: "Eliminación",
        description: "Pedir que borremos tus datos cuando ya no sean necesarios.",
      },
      {
        title: "Oposición y limitación",
        description:
          "Restringir temporalmente el tratamiento o rechazar ciertos usos, cuando la legislación lo permita.",
      },
      {
        title: "Portabilidad",
        description:
          "Recibir tus datos en un formato estructurado y legible, o solicitar que los enviemos a otro proveedor.",
      },
    ],
  },
  {
    title: "7. Seguridad",
    paragraphs: [
      "Aplicamos medidas técnicas y organizativas para proteger tu información, incluyendo cifrado en tránsito, controles de acceso internos, monitoreo de seguridad y procesos de respuesta ante incidentes.",
      "Aunque trabajamos para garantizar la seguridad de la información, ningún sistema es infalible. Te recomendamos mantener tus dispositivos actualizados, usar contraseñas seguras y reportar cualquier actividad sospechosa a nuestro equipo.",
    ],
  },
  {
    title: "8. Uso por menores de edad",
    paragraphs: [
      "Teilen está dirigido a personas mayores de 18 años. Si detectamos que un menor ha creado una cuenta o nos ha proporcionado datos personales sin autorización de sus representantes, tomaremos las medidas necesarias para eliminar esta información.",
    ],
  },
  {
    title: "9. Cambios a esta política",
    paragraphs: [
      "Podemos actualizar esta Política de Privacidad para reflejar mejoras en el servicio, cambios regulatorios o ajustes internos.",
      "Cuando realicemos modificaciones sustanciales, te avisaremos mediante la app, correo electrónico o a través de nuestro sitio web, indicando la fecha en que comienza a regir la versión modificada.",
    ],
  },
  {
    title: "10. Cómo contactarnos",
    paragraphs: [
      "Si deseas ejercer tus derechos, realizar una consulta o presentar un reclamo relacionado con tu privacidad, escríbenos y te responderemos a la brevedad.",
    ],
  },
];

export default function PrivacyPage() {
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
            Política de Privacidad de Teilen
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Tu confianza es lo más importante. Por eso mantenemos procesos claros sobre cómo
            protegemos y usamos tu información mientras divides gastos con tu equipo, amigos o
            familia.
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
          <h3 className="text-lg font-semibold text-emerald-900">
            ¿Necesitas hablar con alguien de Teilen?
          </h3>
          <p className="mt-3 text-base leading-7 text-emerald-900/80">
            Escríbenos a{" "}
            <a
              href="mailto:contacto@teilen.cl"
              className="font-semibold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-900"
            >
              contacto@teilen.cl
            </a>{" "}
            o desde la app en la sección de soporte. Responderemos lo antes posible para ayudarte.
          </p>
        </aside>
      </article>
    </div>
  );
}
