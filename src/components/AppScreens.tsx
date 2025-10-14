"use client";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
};

export function AppScreens({
  images,
  title = "Mira cómo luce Teilen",
  subtitle = "Interfaz limpia y moderna — optimizada para que dividir gastos sea realmente simple.",
}: Props) {
  const imgs = images.length ? images : ["/screens/1.png","/screens/2.png","/screens/3.png","/screens/4.png"];

  return (
    <section id="screens" className="mx-auto max-w-6xl px-5 py-24">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
        <p className="mt-3 text-black/60 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      {/* 1 col con scroll en mobile, 2 cols en md, 4 cols en lg+ */}
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2">
        {imgs.slice(0, 4).map((src, i) => (
          <FloatingPhone key={src} src={src} delay={i * 0.06} />
        ))}
      </div>
    </section>
  );
}

function FloatingPhone({ src, delay = 0 }: { src: string; delay?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-30, 30], [6, -6]);
  const rotateY = useTransform(mx, [-30, 30], [-6, 6]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, delay }}
      className="relative flex items-center justify-center snap-center"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        mx.set(e.clientX - (r.left + r.width / 2));
        my.set(e.clientY - (r.top + r.height / 2));
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <div className="absolute -inset-6 rounded-[2.2rem] bg-black/10 blur-2xl" />
      <motion.div style={{ rotateX, rotateY }} className="device-frame shadow-soft" >
        <div className="device-notch" aria-hidden />
        <div className="device-screen">
          <Image src={src} alt="Captura de pantalla de Teilen" fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover" />
        </div>
        <div className="device-buttons" aria-hidden />
      </motion.div>
    </motion.div>
  );
}
