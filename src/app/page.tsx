import { Hero } from "@/components/Hero";
import { Feature } from "@/components/Feature";
import { AnimatedStats } from "@/components/AnimatedStats";
import { HowItWorks } from "@/components/HowItWorks";
import { AppScreens } from "@/components/AppScreens";

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

      {/* Características (con fade-in escalonado) */}
      <section
        id="features"
        className="scroll-mt-24 mx-auto max-w-6xl px-5 pb-20 md:pb-28"
      >
        <h2 className="text-3xl md:text-5xl font-bold">Características</h2>
        <p className="mt-3 max-w-2xl text-black/70">
          Potentes, pero fáciles. Todo lo que usa realmente la gente.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <Feature
            title="Escanea boletas con IA"
            description="Detecta ítems, impuestos y propinas. Divide en segundos."
            icon="📷"
            delay={0.00}
          />
          <Feature
            title="Pagos simples"
            description="Enlaza tu método favorito y liquida de inmediato."
            icon="👛"
            delay={0.08}
          />
          <Feature
            title="Grupos & reglas"
            description="Crea grupos, define porcentajes y lleva el historial."
            icon="👥"
            delay={0.16}
          />
        </div>
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
      <section className="mx-auto max-w-5xl px-5 pb-24">
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
    </>
  );
}
