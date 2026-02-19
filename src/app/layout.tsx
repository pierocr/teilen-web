import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { cookies } from "next/headers";
import { Toaster } from "@/components/Toaster";
import { PWAInstaller } from "@/components/PWAInstaller";
import { LanguageProvider } from "@/components/LanguageProvider";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

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
    default: "Teilen – Dividir cuentas es fácil",
    template: "%s | Teilen",
  },

  description:
    "Divide gastos compartidos, ordena presupuestos y salda cuentas fácilmente con amigos, pareja o roomies. Teilen hace dividir cuentas simple y sin drama.",

  keywords: [
    "dividir gastos",
    "dividir cuentas",
    "app gastos compartidos",
    "finanzas en pareja",
    "gastos entre amigos",
    "app para roomies",
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
      { url: "/logo_teilen.webp", type: "image/webp", sizes: "192x192" },
    ],
    apple: [{ url: "/logo_teilen.webp", sizes: "180x180", type: "image/webp" }],
  },

  openGraph: {
    type: "website",
    url: "https://www.teilen.cl",
    siteName: "Teilen",
    title: "Teilen – Dividir cuentas es fácil",
    description:
      "Organiza gastos, salda cuentas y mantén tus finanzas compartidas claras desde el primer día con Teilen.",
    locale: "es_CL",
    images: [
      {
        url: "/teilen-og2.webp",
        secureUrl: "https://www.teilen.cl/teilen-og2.webp",
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: "Teilen – Dividir cuentas es fácil",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Teilen – Dividir cuentas es fácil",
    description:
      "La app para dividir gastos compartidos, automatizar saldos y organizar finanzas en grupo.",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("teilen_locale")?.value ?? "es";
  const initialLocale: Locale = isSupportedLocale(localeCookie) ? localeCookie : "es";
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Teilen",
    url: "https://www.teilen.cl",
    logo: "https://www.teilen.cl/logo_teilen.webp",
    sameAs: ["https://www.instagram.com/teilen.app/"],
    description:
      "Teilen es la plataforma para dividir gastos, coordinar finanzas compartidas y saldar cuentas sin fricción.",
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
    alternateName: "Teilen – Dividir cuentas es fácil",
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
      "Teilen permite dividir gastos compartidos, mantener presupuestos grupales y saldar cuentas de forma transparente.",
    inLanguage: "es",
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
        <LanguageProvider initialLocale={initialLocale}>
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
