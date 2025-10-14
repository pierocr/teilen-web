"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = { children: React.ReactNode; className?: string };

/**
 * ScrollFold: un panel blanco que "sube" cuando empiezas a hacer scroll desde el Hero.
 * Redondea esquinas y añade sombra a medida que progresa el scroll.
 */
export function ScrollFold({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Anima desde que la parte superior del panel toca el viewport hasta que se fija
  const { scrollYProgress } = useScroll({
    target: ref,
    // Ajusta estos offsets si quieres que arranque antes/después
    offset: ["start end", "start start"],
  });

  const radius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    ["0 0 0 rgba(0,0,0,0)", "0 25px 60px rgba(0,0,0,.18)"]
  );

  return (
    <section ref={ref} className={`relative ${className}`}>
      {/* Parte sticky que sube */}
      <div className="sticky top-0 z-10">
        <motion.div
          style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius, boxShadow: shadow }}
          className="mx-auto max-w-6xl bg-white"
        >
          <div className="px-5 pt-12 pb-10 md:pt-16 md:pb-14">
            {children}
          </div>
        </motion.div>
      </div>

      {/* Espaciador para que el sticky tenga "recorrido" de scroll */}
      <div className="h-[60vh]" />
    </section>
  );
}
