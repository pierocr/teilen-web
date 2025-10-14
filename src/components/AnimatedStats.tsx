"use client";
import { motion } from "framer-motion";

const items = [
  { label: "Grupos activos", value: "1.2K+" },
  { label: "Gastos liquidados", value: "$120M+" },
  { label: "Usuarios felices", value: "15K+" },
];

export function AnimatedStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-3xl bg-white p-6 shadow-soft border border-black/10"
        >
          <div className="text-4xl font-semibold">{it.value}</div>
          <div className="mt-1 text-black/60">{it.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
