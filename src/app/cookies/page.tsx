import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Conoce cómo Teilen utiliza cookies, almacenamiento local, píxeles y tecnologías similares, y cómo puedes gestionar tus preferencias.",
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
    title: "1. Alcance de esta política",
    paragraphs: [
      "Esta Política de Cookies explica cómo Teilen utiliza cookies, almacenamiento local, píxeles, identificadores, SDK y tecnologías similares cuando visitas nuestro sitio web, utilizas la aplicación o interactúas con nuestros servicios digitales.",
      "Esta política debe leerse junto con nuestros Términos y Condiciones y nuestra Política de Privacidad, donde explicamos con mayor detalle cómo tratamos datos personales.",
      "Algunas tecnologías son necesarias para que Teilen funcione correctamente. Otras nos ayudan a medir rendimiento, recordar preferencias, mejorar la experiencia o entender el uso agregado del servicio.",
    ],
  },
  {
    title: "2. Qué son las cookies y tecnologías similares",
    paragraphs: [
      "Las cookies son pequeños archivos que se almacenan en tu navegador o dispositivo para reconocerlo, recordar información o habilitar determinadas funcionalidades.",
      "También podemos utilizar tecnologías similares, como almacenamiento local del navegador, etiquetas, píxeles, eventos de analítica, identificadores de sesión, registros técnicos y SDK integrados en aplicaciones.",
      "En esta política usamos el término cookies para referirnos de forma general a todas estas tecnologías, salvo que indiquemos expresamente lo contrario.",
    ],
  },
  {
    title: "3. Categorías de cookies que podemos utilizar",
    paragraphs: [
      "Utilizamos cookies propias y de terceros para finalidades específicas. Algunas son estrictamente necesarias y otras pueden depender de la configuración disponible en tu navegador, dispositivo o futuras herramientas de preferencia que habilitemos.",
    ],
    bullets: [
      {
        title: "Cookies estrictamente necesarias",
        description:
          "Permiten operar el sitio y la aplicación, mantener sesiones, autenticar usuarios, prevenir abusos, recordar acciones esenciales y proteger la seguridad de la plataforma.",
      },
      {
        title: "Cookies funcionales o de preferencia",
        description:
          "Permiten recordar configuraciones como idioma, región, estado de instalación, preferencias visuales, formularios parcialmente completados o ajustes de experiencia.",
      },
      {
        title: "Cookies de analítica y rendimiento",
        description:
          "Nos ayudan a medir visitas, eventos, rendimiento, errores, origen de tráfico y uso agregado para mejorar Teilen y detectar problemas técnicos.",
      },
      {
        title: "Cookies de comunicación y soporte",
        description:
          "Pueden ayudarnos a gestionar formularios, solicitudes de contacto, correos transaccionales, reportes de errores o interacciones con canales de soporte.",
      },
      {
        title: "Cookies de marketing o medición promocional",
        description:
          "Podrían utilizarse para medir campañas, descargas, conversiones o efectividad de comunicaciones, siempre bajo criterios de proporcionalidad y de acuerdo con la normativa aplicable.",
      },
    ],
  },
  {
    title: "4. Cookies propias y de terceros",
    paragraphs: [
      "Las cookies propias son gestionadas directamente por Teilen para operar el servicio, recordar preferencias, mantener sesiones o realizar mediciones internas.",
      "Las cookies de terceros son gestionadas por proveedores que nos prestan servicios de infraestructura, analítica, autenticación, comunicaciones, monitoreo, soporte, tiendas de aplicaciones o medición de campañas.",
      "Estos terceros pueden tratar información conforme a sus propias políticas cuando actúan como responsables independientes. Cuando actúan como proveedores de Teilen, deben usar la información conforme a nuestras instrucciones y para las finalidades contratadas.",
    ],
  },
  {
    title: "5. Información que pueden recopilar",
    paragraphs: [
      "Dependiendo de la tecnología utilizada, las cookies pueden recopilar o almacenar información como identificadores de sesión, dirección IP aproximada, tipo de navegador, sistema operativo, dispositivo, páginas visitadas, eventos de interacción, origen de tráfico, errores, fecha y hora de acceso, preferencias y estado de autenticación.",
      "Cuando esta información permita identificar directa o indirectamente a una persona, será tratada como dato personal conforme a nuestra Política de Privacidad y a la legislación aplicable.",
    ],
  },
  {
    title: "6. Finalidades de uso",
    paragraphs: [
      "Utilizamos cookies y tecnologías similares para finalidades limitadas y relacionadas con la prestación y mejora de Teilen.",
    ],
    bullets: [
      {
        title: "Operación del servicio",
        description:
          "Mantener sesiones, recordar acciones, permitir navegación, autenticar usuarios, prevenir fallos y habilitar funciones esenciales.",
      },
      {
        title: "Seguridad",
        description:
          "Detectar abuso, accesos no autorizados, actividad sospechosa, tráfico anómalo, errores críticos o intentos de vulnerar la plataforma.",
      },
      {
        title: "Preferencias",
        description:
          "Recordar idioma, región, configuraciones visuales, estado de instalación y otras decisiones que facilitan el uso del sitio o la aplicación.",
      },
      {
        title: "Analítica",
        description:
          "Comprender el uso agregado, medir rendimiento, identificar pantallas con errores, priorizar mejoras y evaluar la calidad del servicio.",
      },
      {
        title: "Comunicaciones",
        description:
          "Medir interacciones con formularios, enlaces, campañas, descargas o comunicaciones relevantes sobre Teilen.",
      },
    ],
  },
  {
    title: "7. Duración de las cookies",
    paragraphs: [
      "Algunas cookies son de sesión y se eliminan cuando cierras el navegador o finaliza la sesión. Otras son persistentes y pueden permanecer por más tiempo para recordar preferencias, mantener seguridad, medir rendimiento o cumplir finalidades técnicas.",
      "La duración específica puede variar según el proveedor, navegador, dispositivo, configuración del usuario o cambios técnicos del servicio. Procuramos limitar la conservación al tiempo necesario para las finalidades descritas.",
    ],
  },
  {
    title: "8. Cómo gestionar o desactivar cookies",
    paragraphs: [
      "Puedes bloquear, eliminar o limitar cookies desde la configuración de tu navegador o dispositivo. La mayoría de los navegadores permite revisar cookies almacenadas, eliminarlas por sitio, bloquear cookies de terceros o configurar avisos antes de aceptarlas.",
      "Si desactivas cookies estrictamente necesarias, algunas funciones de Teilen podrían no operar correctamente, incluyendo inicio de sesión, seguridad, navegación, preferencias o continuidad de determinadas acciones.",
      "También puedes gestionar ciertas preferencias desde herramientas de terceros, como configuraciones de privacidad del navegador, controles de seguimiento del sistema operativo o paneles de exclusión ofrecidos por proveedores de analítica y publicidad.",
    ],
  },
  {
    title: "9. Relación con la Política de Privacidad",
    paragraphs: [
      "El uso de cookies puede implicar tratamiento de datos personales. En esos casos, aplican las reglas, derechos, bases de tratamiento, medidas de seguridad y canales de contacto descritos en nuestra Política de Privacidad.",
      "Si tienes dudas sobre el tratamiento de tus datos o deseas ejercer derechos de privacidad, puedes escribirnos a contacto@teilen.cl indicando el asunto Privacidad.",
    ],
  },
  {
    title: "10. Actualizaciones de esta política",
    paragraphs: [
      "Podemos actualizar esta Política de Cookies cuando incorporemos nuevas funcionalidades, modifiquemos proveedores, ajustemos tecnologías, mejoremos controles de privacidad o cambien las exigencias legales aplicables.",
      "La versión vigente será la publicada en esta página, con indicación de la fecha de última actualización. Si los cambios son sustanciales, procuraremos informarlos mediante el sitio web, la aplicación, correo electrónico u otro medio razonable.",
    ],
  },
  {
    title: "11. Contacto",
    paragraphs: [
      "Si necesitas más detalles sobre el uso de cookies o tecnologías similares, escríbenos a contacto@teilen.cl indicando el asunto Cookies.",
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
            Este documento explica de forma clara qué cookies y tecnologías similares puede utilizar
            Teilen, para qué finalidades se emplean y cómo puedes gestionarlas desde tu navegador,
            dispositivo o configuración disponible.
          </p>
          <p className="mt-6 text-sm font-medium text-slate-500">
            Última actualización: 5 de julio de 2026
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
