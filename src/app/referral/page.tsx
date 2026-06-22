import ReferralClient from "./ReferralClient";
import type { Metadata } from "next";
import { SOCIAL_IMAGE } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

const title = "Te invitaron a Teilen | Divide gastos sin enredos";
const description =
  "Únete con este enlace para compartir gastos, organizar cuentas y saber claramente quién debe qué.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "/referral",
  },
  openGraph: {
    type: "website",
    url: "/referral",
    siteName: "Teilen",
    title,
    description,
    locale: "es_CL",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Teilen: gastos compartidos sin enredos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SOCIAL_IMAGE],
  },
};

export default function ReferralPage() {
  return <ReferralClient />;
}
