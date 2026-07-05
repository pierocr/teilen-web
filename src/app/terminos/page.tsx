import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Lee los términos que regulan el acceso, uso, responsabilidades y condiciones aplicables al servicio de Teilen.",
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
    title: "1. Aceptación y alcance",
    paragraphs: [
      "Estos Términos y Condiciones regulan el acceso y uso de Teilen, incluyendo nuestro sitio web, aplicación, funcionalidades, contenidos, comunicaciones y servicios relacionados.",
      "Al crear una cuenta, acceder o utilizar Teilen, declaras haber leído y aceptado estos Términos, junto con la Política de Privacidad, la Política de Cookies y cualquier condición adicional que informemos para funcionalidades específicas.",
      "Si no estás de acuerdo con estos Términos, debes abstenerte de crear una cuenta o dejar de utilizar Teilen. El uso continuado del servicio después de una actualización implica la aceptación de la versión vigente, salvo que la ley exija una aceptación expresa.",
    ],
  },
  {
    title: "2. Descripción de Teilen",
    paragraphs: [
      "Teilen es una plataforma tecnológica diseñada para ayudar a personas y grupos a registrar, organizar, dividir y dar seguimiento a gastos personales o compartidos.",
      "El servicio puede incluir herramientas para crear grupos, registrar gastos, calcular saldos, generar resúmenes, enviar recordatorios, coordinar reembolsos, administrar metas o acceder a funcionalidades complementarias.",
      "Teilen no es una entidad bancaria, institución financiera, procesador de pagos ni asesor financiero, contable, tributario o legal. Los cálculos, saldos y reportes disponibles en la plataforma son herramientas de organización y dependen de la información ingresada por los usuarios.",
    ],
  },
  {
    title: "3. Elegibilidad y cuentas",
    paragraphs: [
      "Debes tener al menos 18 años y capacidad legal suficiente para usar Teilen. Al registrarte, declaras que la información entregada es verdadera, actual, completa y que estás autorizado para utilizar el servicio.",
      "Eres responsable de mantener la confidencialidad de tus credenciales, proteger tus dispositivos, cerrar sesión en equipos compartidos y notificarnos inmediatamente cualquier acceso no autorizado o actividad sospechosa.",
      "Podemos rechazar, suspender o cerrar cuentas cuando existan indicios razonables de uso indebido, fraude, suplantación, incumplimiento de estos Términos, riesgo para otros usuarios o exigencia legal.",
    ],
  },
  {
    title: "4. Uso permitido y obligaciones del usuario",
    paragraphs: [
      "Debes utilizar Teilen de buena fe, de manera lícita y conforme a estos Términos. Eres responsable de la información que ingresas, de las decisiones que tomas con base en ella y de contar con autorización para compartir datos de terceros cuando corresponda.",
      "Está prohibido:",
    ],
    bullets: [
      {
        title: "Uso indebido o fraudulento",
        description:
          "Registrar información falsa, manipular saldos, suplantar identidades, crear cuentas no autorizadas o usar Teilen para obtener beneficios indebidos.",
      },
      {
        title: "Interferencia técnica",
        description:
          "Modificar, descompilar, escanear o intentar vulnerar la seguridad de la plataforma o de nuestros sistemas.",
      },
      {
        title: "Violaciones legales",
        description:
          "Utilizar Teilen para actividades ilegales, lavado de activos, financiamiento ilícito, evasión tributaria, fraude o incumplimiento de normativa aplicable.",
      },
      {
        title: "Uso abusivo",
        description:
          "Enviar spam, acosar a otros usuarios, publicar contenido ofensivo, discriminatorio, difamatorio, amenazante o que vulnere derechos de terceros.",
      },
      {
        title: "Extracción no autorizada",
        description:
          "Extraer datos de forma automatizada, revender el servicio, utilizar bots no autorizados o intentar eludir limitaciones técnicas, comerciales o de seguridad.",
      },
    ],
  },
  {
    title: "5. Información y contenido ingresado por usuarios",
    paragraphs: [
      "Los gastos, nombres de grupos, descripciones, montos, comentarios, participantes y demás información que ingreses en Teilen son responsabilidad de quien los registra o comparte.",
      "No reclamamos propiedad sobre tu contenido. Sin embargo, nos otorgas una licencia limitada, no exclusiva y necesaria para alojarlo, procesarlo, mostrarlo a los usuarios autorizados, respaldarlo, transmitirlo técnicamente y operar la plataforma.",
      "Debes evitar ingresar datos sensibles o información innecesaria de terceros. Si compartes información de otras personas, declaras contar con autorización suficiente para hacerlo y aceptas responder por cualquier reclamo derivado de ese uso.",
    ],
  },
  {
    title: "6. Planes, precios, pagos y funcionalidades premium",
    paragraphs: [
      "Teilen puede ofrecer funcionalidades gratuitas, de prueba, promocionales o de pago. Cuando existan cobros, informaremos las características esenciales, precio, impuestos aplicables, periodicidad, forma de pago, renovación, cancelación y demás condiciones relevantes antes de la contratación.",
      "Los pagos pueden ser procesados por plataformas de terceros, tiendas de aplicaciones u otros proveedores. En esos casos, también se aplicarán sus propios términos, políticas, comisiones, procedimientos de facturación, reembolsos y soporte.",
      "Podemos modificar, incorporar o retirar planes y funcionalidades, respetando las condiciones contratadas, los derechos adquiridos y las normas obligatorias de protección al consumidor que resulten aplicables.",
    ],
  },
  {
    title: "7. Servicios de terceros e integraciones",
    paragraphs: [
      "Teilen puede operar junto a servicios externos, como proveedores de autenticación, infraestructura, analítica, correo electrónico, tiendas de aplicaciones, enlaces de descarga o herramientas de soporte.",
      "No controlamos los servicios de terceros ni somos responsables por su disponibilidad, seguridad, contenido, cambios, interrupciones o condiciones comerciales, salvo en aquello que la ley disponga expresamente.",
      "Cuando accedas a sitios, aplicaciones o servicios de terceros desde Teilen, debes revisar sus propios términos y políticas antes de utilizarlos.",
    ],
  },
  {
    title: "8. Propiedad intelectual",
    paragraphs: [
      "El contenido visual, marcas, logotipos, código y documentación de Teilen son propiedad de Teilen o de nuestros licenciantes. No puedes utilizar nuestra identidad de marca sin autorización escrita.",
      "Estos Términos no te transfieren derechos de propiedad intelectual sobre Teilen. Te otorgamos una autorización limitada, revocable, no exclusiva, no transferible y no sublicenciable para usar el servicio conforme a estos Términos.",
      "Se permite mencionar o enlazar Teilen de manera razonable, siempre que no se genere confusión, no se sugiera patrocinio o asociación inexistente y no se dañe nuestra reputación o derechos.",
    ],
  },
  {
    title: "9. Disponibilidad, cambios y versiones beta",
    paragraphs: [
      "Hacemos esfuerzos razonables para mantener Teilen disponible, seguro y actualizado. Sin embargo, el servicio puede verse afectado por mantenimientos, actualizaciones, errores, interrupciones de terceros, incidentes de seguridad, fuerza mayor o limitaciones técnicas.",
      "Algunas funcionalidades pueden ofrecerse en versión beta, piloto, experimental o con disponibilidad limitada por región, dispositivo, sistema operativo, plan o invitación. Estas funcionalidades pueden modificarse o descontinuarse sin previo aviso cuando sea necesario.",
      "Podemos actualizar, mejorar, restringir o retirar funcionalidades para proteger la seguridad, cumplir la ley, mejorar la experiencia, corregir errores o adaptar el servicio a nuevas necesidades.",
    ],
  },
  {
    title: "10. Garantías y limitación de responsabilidad",
    paragraphs: [
      "Teilen se proporciona en la medida disponible y permitida por la ley. No garantizamos que el servicio sea ininterrumpido, libre de errores, compatible con todos los dispositivos o suficiente para una finalidad específica no informada expresamente.",
      "Los saldos, cálculos, reportes y recordatorios dependen de los datos ingresados por los usuarios. Debes revisar la información antes de tomar decisiones, realizar pagos, exigir reembolsos o usarla para fines contables, tributarios o legales.",
      "En la medida permitida por la legislación aplicable, Teilen no será responsable por daños indirectos, lucro cesante, pérdida de datos, errores derivados de información ingresada por usuarios, conflictos entre miembros de un grupo o fallas atribuibles a servicios de terceros.",
      "Nada en estos Términos limita derechos irrenunciables que la legislación aplicable, incluyendo normas de protección al consumidor cuando correspondan, otorgue a los usuarios.",
    ],
  },
  {
    title: "11. Privacidad, cookies y seguridad",
    paragraphs: [
      "El tratamiento de datos personales se rige por nuestra Política de Privacidad. El uso de cookies y tecnologías similares se regula en nuestra Política de Cookies.",
      "Aplicamos medidas razonables de seguridad, pero también debes proteger tus credenciales, mantener actualizados tus dispositivos y avisarnos si detectas accesos no autorizados o actividad sospechosa.",
    ],
  },
  {
    title: "12. Suspensión, cierre y eliminación de cuenta",
    paragraphs: [
      "Puedes dejar de utilizar Teilen o solicitar el cierre de tu cuenta conforme a los mecanismos disponibles en la aplicación o escribiendo a contacto@teilen.cl.",
      "Podemos suspender o cerrar cuentas, restringir funcionalidades o eliminar contenido cuando exista incumplimiento de estos Términos, riesgo de seguridad, requerimiento legal, uso abusivo, fraude, afectación a terceros o imposibilidad operativa de prestar el servicio.",
      "El cierre de una cuenta no elimina obligaciones pendientes ni afecta derechos que hayan nacido antes de la terminación, incluyendo pagos, reclamos, investigaciones, cumplimiento legal, conservación de registros permitida o defensa de derechos.",
    ],
  },
  {
    title: "13. Modificaciones de estos Términos",
    paragraphs: [
      "Podemos actualizar estos Términos para reflejar cambios en el servicio, nuevas funcionalidades, ajustes comerciales, exigencias legales, mejoras de seguridad o buenas prácticas.",
      "Cuando los cambios sean sustanciales, procuraremos informarlos mediante el sitio web, la aplicación, correo electrónico u otro medio razonable. La versión vigente será la publicada en esta página, con indicación de su fecha de última actualización.",
      "Si no estás de acuerdo con una modificación, debes dejar de utilizar Teilen y, si corresponde, cancelar tu cuenta antes de que la nueva versión resulte aplicable.",
    ],
  },
  {
    title: "14. Legislación aplicable y resolución de controversias",
    paragraphs: [
      "Estos Términos se rigen por las leyes de la República de Chile, sin perjuicio de las normas imperativas que resulten aplicables por el lugar de residencia del usuario o por la naturaleza de la relación jurídica.",
      "Cualquier controversia relacionada con Teilen se someterá a los tribunales competentes de Chile, salvo que una norma obligatoria establezca otro mecanismo o jurisdicción. Si tienes la calidad de consumidor, estos Términos no restringen los derechos que te otorgue la Ley N° 19.496 sobre protección de los derechos de los consumidores u otra normativa aplicable.",
    ],
  },
  {
    title: "15. Contacto",
    paragraphs: [
      "Si necesitas aclarar alguna sección de estos Términos, reportar un problema o realizar una solicitud formal, escríbenos a contacto@teilen.cl indicando el asunto Términos.",
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
            Este documento establece las reglas legales aplicables al acceso y uso de Teilen,
            incluyendo responsabilidades del usuario, límites del servicio, planes, propiedad
            intelectual, privacidad y resolución de controversias.
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
