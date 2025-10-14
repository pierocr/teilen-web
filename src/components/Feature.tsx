"use client";
import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  icon?: string;
  /** para escalonar las animaciones desde el padre */
  delay?: number;
};

export function Feature({ title, description, icon, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-black/10 p-6 md:p-7 bg-white shadow-soft"
    >
      {icon ? (
        <div className="h-11 w-11 grid place-content-center rounded-2xl bg-black/5 text-xl">
          {icon}
        </div>
      ) : null}

      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-black/70">{description}</p>
    </motion.div>
  );
}
