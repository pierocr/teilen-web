// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  // Base para que las URLs relativas (como la imagen OG) se resuelvan absolutas
  metadataBase: new URL("https://www.teilen.cl"),

  title: {
    default: "Teilen — Cambia la forma de dividir gastos",
    template: "%s | Teilen",
  },
  description: "Divide y paga sin fricción.",

  openGraph: {
    type: "website",
    url: "https://www.teilen.cl",
    siteName: "Teilen",
    title: "Teilen — Cambia la forma de dividir gastos",
    description:
      "Divide cuentas con amigos y familia de forma simple, rápida y sin fricción.",
    locale: "es_CL",
    images: [
      {
        url: "/teilen-og.jpg", // coloca este archivo en /public
        width: 1200,
        height: 630,
        alt: "Personas usando Teilen para dividir la cuenta",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Teilen — Cambia la forma de dividir gastos",
    description:
      "La manera moderna de dividir y pagar en grupo. Registra gastos y salda con un toque.",
    images: ["/teilen-og.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${font.className} min-h-dvh antialiased`}>
        {/* OJO: ya no ponemos <Navbar /> aquí */}
        <main>{children}</main>
        {/* Si tienes <Footer />, déjalo aquí debajo */}
      </body>
    </html>
  );
}
