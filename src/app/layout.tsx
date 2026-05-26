import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/Toaster";
import { PWAInstaller } from "@/components/PWAInstaller";
import { LanguageProvider } from "@/components/LanguageProvider";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.teilen.cl"),

  applicationName: "Teilen",

  title: {
    default: "Teilen | Divide gastos, organiza cuentas y alcanza tus metas",
    template: "%s | Teilen",
  },

  description:
    "Teilen te ayuda a dividir gastos, crear recordatorios, programar gastos recurrentes y seguir metas de ahorro desde una app simple para iOS y Android.",

  keywords: [
    "dividir gastos",
    "dividir cuentas",
    "gastos compartidos",
    "gastos personales",
    "gastos recurrentes",
    "recordatorios de pago",
    "metas de ahorro",
    "app para dividir gastos",
    "app de gastos personales",
    "finanzas personales",
    "cuentas compartidas",
    "Chile",
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
      { url: "/logo_teilen.webp", type: "image/webp", sizes: "192x192" },
    ],
    apple: [{ url: "/logo_teilen.webp", sizes: "180x180", type: "image/webp" }],
  },

  openGraph: {
    type: "website",
    url: "https://www.teilen.cl",
    siteName: "Teilen",
    title: "Teilen | Divide gastos, organiza cuentas y alcanza tus metas",
    description:
      "Divide gastos, crea recordatorios, programa gastos recurrentes y sigue metas de ahorro desde una app simple para iOS y Android.",
    locale: "es_CL",
    images: [
      {
        url: "/teilen-og2.webp",
        secureUrl: "https://www.teilen.cl/teilen-og2.webp",
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Teilen | Divide gastos, organiza cuentas y alcanza tus metas",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Teilen | Divide gastos, organiza cuentas y alcanza tus metas",
    description:
      "La app para dividir gastos, organizar cuentas, programar recordatorios y seguir metas de ahorro.",
    images: ["/teilen-og2.webp"],
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

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Teilen",
  },

  formatDetection: {
    telephone: false,
  },

  other: {
    "mobile-web-app-capable": "yes",
    "application-name": "Teilen",
    "apple-mobile-web-app-title": "Teilen",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#019a57" },
    { media: "(prefers-color-scheme: dark)", color: "#019a57" },
  ],
};

const GA_MEASUREMENT_ID = "G-KZ0R9BG6N5";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Teilen",
    url: "https://www.teilen.cl",
    logo: "https://www.teilen.cl/logo_teilen.webp",
    sameAs: ["https://www.instagram.com/teilen.app/"],
    description:
      "Teilen ayuda a organizar gastos compartidos, gastos personales, recordatorios y metas financieras desde una app simple.",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contacto@teilen.cl",
        contactType: "customer support",
        availableLanguage: ["es", "en", "de", "pr", "ut", "fr"],
      },
    ],
  };

  const webSiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Teilen",
    alternateName: "Teilen | Divide gastos, organiza cuentas y alcanza tus metas",
    url: "https://www.teilen.cl",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.google.com/search?q=site:teilen.cl+{search_term_string}",
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
      "Teilen permite dividir gastos compartidos, registrar gastos personales, crear recordatorios, programar gastos recurrentes y seguir metas de ahorro.",
    inLanguage: ["es", "en", "de", "pr", "ut", "fr"],
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
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Saltar al contenido principal
          </a>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationStructuredData),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(webSiteStructuredData),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(appStructuredData),
            }}
          />

          <main id="main-content">{children}</main>
          <Toaster />
          <PWAInstaller />
        </LanguageProvider>
      </body>
    </html>
  );
}

