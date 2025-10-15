import { Hero } from "@/components/Hero";
import AnimatedStats from "@/components/AnimatedStats";
import { HowItWorks } from "@/components/HowItWorks";
import { AppScreens } from "@/components/AppScreens";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import Footer from "@/components/Footer"; // ⬅️ nuevo

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

      {/* Footer global */}
      <Footer />
    </>
  );
}
