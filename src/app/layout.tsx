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
  description:
    "Teilen es la app chilena para dividir gastos en grupos, ordenar las finanzas compartidas y saldar cuentas sin fricción.",
  keywords: [
    "dividir gastos",
    "app de gastos compartidos",
    "finanzas personales Chile",
    "teilen",
    "dividir cuentas",
    "gastos en pareja",
    "gastos entre amigos",
    "gastos grupales",
  ],
  category: "finance",
  authors: [{ name: "Teilen", url: "https://www.teilen.cl" }],
  creator: "Teilen",
  publisher: "Teilen",
  alternates: {
    canonical: "/",
  },

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
        url: "/teilen-og.png", // coloca este archivo en /public
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Teilen",
    url: "https://www.teilen.cl",
    logo: "https://www.teilen.cl/logo_teilen.png",
    sameAs: ["https://www.instagram.com/teilen.app/"],
    description:
      "Teilen es la plataforma chilena para dividir gastos, coordinar finanzas grupales y saldar cuentas sin fricción.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contacto@teilen.cl",
        contactType: "customer support",
        availableLanguage: ["es-CL", "es"],
      },
    ],
  };

  const webSiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Teilen",
    url: "https://www.teilen.cl",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.google.com/search?q=site:teilen.cl+{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="es">
      <body className={`${font.className} min-h-dvh antialiased`}>
        {/* OJO: ya no ponemos <Navbar /> aquí */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteStructuredData) }}
        />
        <main>{children}</main>
        {/* Si tienes <Footer />, déjalo aquí debajo */}
      </body>
    </html>
  );
}
