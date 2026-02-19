export const runtime = "edge";

import type { Metadata } from "next";
import { PremiumLanding } from "@/components/premium/PremiumLanding";

export const metadata: Metadata = {
  title: "Teilen Premium",
  description:
    "Explora todos los beneficios de Teilen Premium: grupos ilimitados, reportes exportables y control total de tus gastos. Activa la suscripción desde la app.",
  alternates: {
    canonical: "/premium",
  },
};

export default function PremiumPage() {
  return <PremiumLanding />;
}
