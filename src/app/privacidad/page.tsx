import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Conoce cómo Teilen recopila, usa, conserva y protege tus datos personales al utilizar la plataforma.",
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
    title: "1. Alcance y responsable del tratamiento",
    paragraphs: [
      "Esta Política de Privacidad explica cómo Teilen recopila, utiliza, almacena, comunica y protege los datos personales de las personas que visitan nuestro sitio web, crean una cuenta, usan la aplicación o se comunican con nuestro equipo.",
      "Para efectos de esta Política, Teilen actúa como responsable del tratamiento respecto de los datos personales necesarios para operar la plataforma, prestar soporte, resguardar la seguridad del servicio y cumplir obligaciones legales. Puedes contactarnos en contacto@teilen.cl para cualquier consulta relacionada con privacidad.",
      "El tratamiento de datos se realiza conforme a la legislación aplicable en Chile, incluyendo la Ley N° 19.628 sobre protección de la vida privada y sus modificaciones, así como las obligaciones que correspondan cuando entre en vigencia la Ley N° 21.719 sobre protección y tratamiento de datos personales.",
    ],
  },
  {
    title: "2. Datos personales que podemos recopilar",
    paragraphs: [
      "Recopilamos solo la información que resulta necesaria o pertinente para prestar Teilen, mantener la seguridad de la plataforma, mejorar la experiencia de uso y atender solicitudes de los usuarios.",
    ],
    bullets: [
      {
        title: "Datos de identificación y contacto",
        description:
          "Nombre, apellidos, correo electrónico, número de teléfono, país de residencia y otros datos que nos entregues al crear o administrar tu cuenta.",
      },
      {
        title: "Datos de cuenta y autenticación",
        description:
          "Identificadores de usuario, proveedor de inicio de sesión, estado de la cuenta, preferencias, idioma, sesiones y datos técnicos asociados al acceso.",
      },
      {
        title: "Contenido financiero ingresado por usuarios",
        description:
          "Grupos, participantes, montos, conceptos, fechas, saldos, reembolsos, comentarios y otros antecedentes que tú o los miembros de tus grupos registren en Teilen.",
      },
      {
        title: "Comunicaciones y soporte",
        description:
          "Mensajes enviados por formularios, correos electrónicos, solicitudes de ayuda, reportes de errores, respuestas a encuestas y antecedentes necesarios para resolver consultas.",
      },
      {
        title: "Datos técnicos y de uso",
        description:
          "Dirección IP aproximada, identificadores del dispositivo o navegador, sistema operativo, versión de la app, registros de actividad, eventos de rendimiento, errores y datos de analítica.",
      },
      {
        title: "Cookies y tecnologías similares",
        description:
          "Información obtenida mediante cookies, almacenamiento local, píxeles o herramientas equivalentes, conforme a nuestra Política de Cookies.",
      },
    ],
  },
  {
    title: "3. Finalidades y bases del tratamiento",
    paragraphs: [
      "Tratamos tus datos personales para finalidades específicas, explícitas y lícitas. Según el caso, el tratamiento puede fundarse en la ejecución del servicio solicitado, tu consentimiento, el cumplimiento de obligaciones legales, la prevención de fraudes, la seguridad de la plataforma o el interés legítimo de mejorar y proteger Teilen.",
    ],
    bullets: [
      {
        title: "Prestar y mejorar el servicio",
        description:
          "Crear y administrar cuentas, registrar gastos, calcular saldos, gestionar grupos, enviar invitaciones, mostrar historial y habilitar funcionalidades esenciales.",
      },
      {
        title: "Seguridad y prevención de fraude",
        description:
          "Detectar accesos no autorizados, prevenir abusos, investigar actividad sospechosa, proteger cuentas y mantener la integridad técnica de la plataforma.",
      },
      {
        title: "Comunicación contigo",
        description:
          "Responder solicitudes, enviar avisos operacionales, confirmar acciones importantes, informar cambios relevantes y entregar soporte relacionado con Teilen.",
      },
      {
        title: "Análisis y producto",
        description:
          "Medir uso, rendimiento y errores; generar estadísticas agregadas; priorizar mejoras; y evaluar nuevas funcionalidades sin vender tu información personal.",
      },
      {
        title: "Cumplimiento legal",
        description:
          "Atender requerimientos de autoridades competentes, conservar registros cuando corresponda y ejercer o defender derechos conforme a la ley aplicable.",
      },
    ],
  },
  {
    title: "4. Datos financieros y datos sensibles",
    paragraphs: [
      "Teilen permite registrar información financiera de carácter personal, como gastos, montos, participantes, saldos y reembolsos. Esta información se utiliza para entregar las funcionalidades de la plataforma y se muestra a los miembros de los grupos o personas con quienes decidas compartirla.",
      "No necesitamos que ingreses datos sensibles, como información de salud, biometría, origen racial o étnico, opiniones políticas, creencias religiosas, orientación sexual u otros datos especialmente protegidos. Te recomendamos no incluir ese tipo de información en nombres de grupos, descripciones de gastos, comentarios o mensajes.",
    ],
  },
  {
    title: "5. Con quiénes podemos compartir información",
    paragraphs: [
      "No vendemos tus datos personales. Podemos compartir información solo cuando sea necesario para operar Teilen, cumplir la ley o proteger nuestros derechos y los de nuestros usuarios.",
    ],
    bullets: [
      {
        title: "Miembros de tus grupos",
        description:
          "La información de gastos, saldos, participantes y actividad se muestra a las personas que integran los grupos o interacciones que tú creas, aceptas o administras.",
      },
      {
        title: "Proveedores de servicio",
        description:
          "Trabajamos con proveedores de infraestructura, autenticación, base de datos, analítica, correo electrónico, comunicaciones, soporte y monitoreo técnico. Solo acceden a la información necesaria para prestar sus servicios y deben tratarla conforme a nuestras instrucciones.",
      },
      {
        title: "Autoridades competentes",
        description:
          "Podemos entregar información si existe una obligación legal, orden judicial, requerimiento válido de autoridad competente o necesidad de ejercer o defender derechos.",
      },
      {
        title: "Operaciones corporativas",
        description:
          "Si Teilen participa en una reorganización, fusión, adquisición, financiamiento o transferencia de activos, los datos podrían ser revisados o transferidos bajo obligaciones de confidencialidad y protección equivalentes.",
      },
    ],
  },
  {
    title: "6. Transferencias internacionales",
    paragraphs: [
      "Algunos proveedores que usamos para alojar, procesar, analizar o comunicar información pueden encontrarse en Chile o en otros países. Cuando exista una transferencia internacional de datos, adoptaremos medidas razonables para que la información reciba un nivel de protección adecuado, incluyendo contratos, controles de seguridad y limitaciones de finalidad.",
    ],
  },
  {
    title: "7. Conservación y eliminación",
    paragraphs: [
      "Conservamos los datos personales durante el tiempo necesario para cumplir las finalidades descritas en esta Política, mantener tu cuenta, prestar el servicio, resolver solicitudes, prevenir abusos y cumplir obligaciones legales o contractuales.",
      "Cuando solicites eliminar tu cuenta, eliminaremos o anonimizaremos tus datos dentro de un plazo razonable, salvo que debamos conservar cierta información por obligaciones legales, registros de seguridad, prevención de fraude, resolución de disputas, respaldo técnico o defensa de derechos.",
      "Los respaldos de seguridad pueden mantenerse por períodos limitados antes de su eliminación definitiva, de acuerdo con nuestros ciclos técnicos de respaldo y recuperación.",
    ],
  },
  {
    title: "8. Tus derechos de privacidad",
    paragraphs: [
      "Puedes ejercer los derechos que reconozca la legislación aplicable sobre tus datos personales. En Chile, estos derechos incluyen acceso, rectificación, cancelación o supresión, oposición, bloqueo y, cuando corresponda, portabilidad.",
    ],
    bullets: [
      {
        title: "Acceso",
        description:
          "Solicitar confirmación sobre si tratamos tus datos y acceder a una copia de la información disponible.",
      },
      {
        title: "Rectificación",
        description: "Pedir que corrijamos datos inexactos, desactualizados o incompletos.",
      },
      {
        title: "Cancelación o supresión",
        description:
          "Solicitar la eliminación de datos cuando ya no sean necesarios o cuando proceda legalmente.",
      },
      {
        title: "Oposición y bloqueo",
        description:
          "Oponerte a determinados tratamientos o pedir el bloqueo temporal de datos en los casos permitidos por la normativa aplicable.",
      },
      {
        title: "Portabilidad",
        description:
          "Solicitar la entrega de ciertos datos en un formato estructurado y de uso común, cuando este derecho resulte aplicable.",
      },
      {
        title: "Revocación del consentimiento",
        description:
          "Retirar autorizaciones otorgadas para tratamientos basados en consentimiento, sin afectar la licitud del tratamiento realizado previamente.",
      },
    ],
  },
  {
    title: "9. Cómo ejercer tus derechos",
    paragraphs: [
      "Para ejercer derechos o realizar consultas de privacidad, escribe a contacto@teilen.cl indicando el asunto Privacidad. Podremos pedir antecedentes razonables para verificar tu identidad y proteger tu información antes de responder.",
      "Responderemos dentro de los plazos que exija la normativa aplicable. Si una solicitud es incompleta, desproporcionada, afecta derechos de terceros o existe una obligación legal de conservar información, podremos pedir antecedentes adicionales, responder parcialmente o rechazarla fundadamente.",
    ],
  },
  {
    title: "10. Seguridad de la información",
    paragraphs: [
      "Aplicamos medidas técnicas y organizativas razonables para proteger la información, incluyendo cifrado en tránsito, controles de acceso, gestión de sesiones, monitoreo técnico, respaldo, revisión de incidentes y restricciones internas según roles.",
      "Ningún sistema es completamente infalible. Por eso también te pedimos mantener tus dispositivos actualizados, usar credenciales seguras, cerrar sesión en equipos compartidos y avisarnos de inmediato si detectas actividad sospechosa.",
      "En caso de una vulneración de seguridad que pueda afectar tus datos personales, evaluaremos el incidente y adoptaremos las medidas de contención, investigación, mitigación y comunicación que correspondan conforme a la ley aplicable.",
    ],
  },
  {
    title: "11. Menores de edad",
    paragraphs: [
      "Teilen está dirigido a personas mayores de 18 años. Si tomamos conocimiento de que un menor de edad creó una cuenta o nos entregó datos personales sin la autorización correspondiente de sus representantes legales, adoptaremos medidas razonables para eliminar o restringir esa información.",
    ],
  },
  {
    title: "12. Cookies, analítica y medición",
    paragraphs: [
      "Nuestro sitio y aplicación pueden utilizar cookies, almacenamiento local, píxeles y herramientas de analítica para mantener sesiones, recordar preferencias, medir rendimiento, entender uso agregado y mejorar la experiencia. Puedes revisar más detalles en nuestra Política de Cookies.",
      "Algunas herramientas de analítica pueden generar mediciones agregadas sobre visitas, eventos, origen de tráfico o rendimiento. Configuramos estas herramientas con criterios de minimización y finalidad limitada cuando la tecnología lo permite.",
    ],
  },
  {
    title: "13. Cambios a esta Política",
    paragraphs: [
      "Podemos actualizar esta Política de Privacidad para reflejar cambios en Teilen, nuevas funcionalidades, ajustes operacionales, modificaciones regulatorias o mejores prácticas de seguridad y privacidad.",
      "Cuando los cambios sean sustanciales, procuraremos informarlos mediante la aplicación, correo electrónico, sitio web u otro medio razonable, indicando la fecha de entrada en vigencia de la versión actualizada.",
    ],
  },
  {
    title: "14. Contacto",
    paragraphs: [
      "Si deseas ejercer tus derechos, realizar una consulta, reportar un incidente o presentar un reclamo relacionado con privacidad, escríbenos a contacto@teilen.cl. Para acelerar la gestión, incluye el asunto Privacidad y una descripción clara de tu solicitud.",
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
            Este documento describe de forma clara y formal cómo recopilamos, usamos, protegemos y
            conservamos tu información cuando utilizas Teilen para organizar gastos personales o
            compartidos.
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
