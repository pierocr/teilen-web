// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  // Base para que las URLs relativas (como la imagen OG) se resuelvan absolutas
  metadataBase: new URL("https://www.teilen.cl"),

  applicationName: "Teilen",
  title: {
    default: "Teilen | Divide gastos compartidos sin drama",
    template: "%s · Teilen",
  },
  description:
    "Teilen es la app para dividir gastos compartidos, ordenar presupuestos y saldar cuentas con amigos, pareja o roomies en segundos.",
  keywords: [
    "dividir gastos",
    "app dividir cuentas",
    "app finanzas en pareja",
    "gastos entre amigos",
    "app para roomies",
    "balanza de gastos",
    "control de gastos grupales",
  ],
  category: "finance",
  authors: [{ name: "Teilen", url: "https://www.teilen.cl" }],
  creator: "Teilen",
  publisher: "Teilen",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo_teilen.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/logo_teilen.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    url: "https://www.teilen.cl",
    siteName: "Teilen",
    title: "Teilen | Divide gastos compartidos sin drama",
    description:
      "Organiza grupos, registra gastos y liquida saldos al instante. Teilen simplifica las finanzas compartidas desde el primer registro.",
    locale: "es_CL",
    images: [
      {
        url: "/teilen-og.png",
        secureUrl: "https://www.teilen.cl/teilen-og.png",
        width: 1024,
        height: 1024,
        type: "image/png",
        alt: "Personas usando Teilen para dividir la cuenta",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Teilen | Divide gastos compartidos sin drama",
    description:
      "La app para dividir cuentas, automatizar reembolsos y mantener presupuestos grupales claros.",
    images: ["/teilen-og.png"],
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

const GA_MEASUREMENT_ID = "G-KZ0R9BG6N5";

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
      "Teilen es la plataforma para dividir gastos, coordinar finanzas grupales y saldar cuentas sin fricción.",
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

  const appStructuredData = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: "Teilen",
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
    url: "https://www.teilen.cl",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CLP",
    },
    description:
      "Teilen permite dividir gastos compartidos, mantener presupuestos grupales y saldar cuentas de forma transparente.",
    inLanguage: "es",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "126",
    },
    publisher: {
      "@type": "Organization",
      name: "Teilen",
      url: "https://www.teilen.cl",
    },
  };

  return (
    <html lang="es">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appStructuredData) }}
        />
        <main>{children}</main>
        {/* Si tienes <Footer />, déjalo aquí debajo */}
      </body>
    </html>
  );
}
