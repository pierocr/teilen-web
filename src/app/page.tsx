import { Hero } from "@/components/Hero";
import AnimatedStats from "@/components/AnimatedStats";
import { HowItWorks } from "@/components/HowItWorks";
import { AppScreens } from "@/components/AppScreens";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Footer from "@/components/Footer"; // ⬅️ nuevo

const testimonials = [
  {
    quote:
      "“Con Teilen logramos ordenar el arriendo y los servicios del depto. El resumen es transparente y todos quedamos tranquilos con lo que toca pagar.”",
    author: "Constanza R.",
    context: "Ñuñoa · Convive con 3 roomies",
  },
  {
    quote:
      "“Para nuestro viaje a Chiloé fue ideal. Cada gasto quedó registrado al tiro y al final bastó un par de clics para saldar entre el grupo completo.”",
    author: "Diego M.",
    context: "Valparaíso · Viajes en grupo",
  },
  {
    quote:
      "“Con mi pareja nos organizamos mejor: la app recuerda quién pagó cada cosa y evita esos malos ratos por las cuentas de la casa.”",
    author: "Camila & Seba",
    context: "Santiago Centro · Pareja joven",
  },
  {
    quote:
      "“Soy tesorera de un club deportivo y Teilen nos permitió llevar los aportes y reembolsos con claridad. Los socios quedan informados al instante.”",
    author: "María José L.",
    context: "Providencia · Club amateur",
  },
];

export default function Page() {
  return (
    <>
      {/* Hero con Navbar overlay */}
      <Hero />

      {/* Métricas */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <AnimatedStats />
      </section>

      {/* Cómo funciona */}
      <section id="how" className="scroll-mt-24">
        <HowItWorks />
      </section>

      {/* Características — versión moderna con mockup + animaciones CSS */}
      <section id="features" className="scroll-mt-24">
        <FeaturesShowcase />
      </section>

      {/* Screens de la app: 4 en fila en desktop */}
      <section id="screens" className="scroll-mt-24">
        <AppScreens
          images={[
            "/screens/home.png",
            "/screens/grupos.png",
            "/screens/gasto.png",
            "/screens/actividad.png",
          ]}
        />
      </section>

      {/* CTA final */}
{/*       <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="rounded-3xl p-10 text-center shadow-soft bg-white/80">
          <h3 className="text-2xl md:text-3xl font-semibold">
            ¿Listo para dividir gastos sin drama?
          </h3>
          <p className="mt-3 text-black/70">
            Pronto en iOS y Android. Regístrate para el acceso anticipado.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#waitlist" className="btn-primary">
              Unirme a la lista
            </a>
            <a href="#features" className="btn-outline hover:bg-black/5">
              Ver características
            </a>
          </div>
        </div>
      </section> 
      
      Agrego esto para hacer un commit*/}

      {/* Reseñas */}
      <section className="relative mx-auto max-w-6xl px-5 pb-24 pt-10">
        <div
          className="absolute inset-x-10 -top-10 h-40 rounded-full bg-emerald-200/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative rounded-3xl border border-white/60 bg-white/80 p-10 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Reseñas
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
                Lo que dice la comunidad en Chile
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600 max-w-xl">
                Testimonios reales de usuarios piloto que ya están usando Teilen para dividir gastos
                sin drama.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item) => (
              <article
                key={item.author}
                className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <svg
                      key={starIndex}
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="h-4 w-4 fill-current"
                    >
                      <path d="M10 1.5l2.47 5.02 5.53.8-4 3.9.94 5.48L10 13.92l-4.94 2.78.94-5.48-4-3.9 5.53-.8L10 1.5z" />
                    </svg>
                  ))}
                  <span className="sr-only">5 de 5 estrellas</span>
                </div>
                <p className="mt-4 text-base leading-7 text-slate-700">{item.quote}</p>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-900">{item.author}</p>
                  <p className="text-xs uppercase tracking-wide text-emerald-700">{item.context}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer global */}
      <Footer />
    </>
  );
}
