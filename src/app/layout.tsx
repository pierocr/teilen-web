import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/Toaster";
import { PWAInstaller } from "@/components/PWAInstaller";
import { LanguageProvider } from "@/components/LanguageProvider";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_URL,
  SOCIAL_IMAGE,
  absoluteUrl,
  mobileApplicationJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
} from "@/lib/seo";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "Teilen App",

  title: {
    default: DEFAULT_TITLE,
    template: "%s | Teilen",
  },

  description: DEFAULT_DESCRIPTION,

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
    "app de finanzas personales",
    "Teilen App",
    "finanzas personales",
    "cuentas compartidas",
    "Chile",
  ],

  category: "finance",
  authors: [{ name: "Teilen", url: SITE_URL }],
  creator: "Teilen",
  publisher: "Teilen",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icons/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/icons/manifest-icon-192.maskable.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/apple-icon-180.png", sizes: "180x180", type: "image/png" }],
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Teilen",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "es_CL",
    images: [
      {
        url: SOCIAL_IMAGE,
        secureUrl: absoluteUrl(SOCIAL_IMAGE),
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: DEFAULT_TITLE,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SOCIAL_IMAGE],
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
  width: "device-width",
  initialScale: 1,
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
  const organizationStructuredData = organizationJsonLd();
  const webSiteStructuredData = webSiteJsonLd();
  const appStructuredData = mobileApplicationJsonLd();

  return (
    <html lang="es-CL">
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
