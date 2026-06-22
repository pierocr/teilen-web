import type { Metadata } from "next";

export const SITE_URL = "https://teilen.cl";
export const BRAND_NAME = "Teilen";
export const BRAND_ALTERNATE_NAME = "Teilen App";
export const APP_STORE_URL = "https://apps.apple.com/cl/app/teilen/id6754208104";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pierocr.teilenapp";
export const UNIVERSAL_DOWNLOAD_URL = `${SITE_URL}/api/download`;
export const SOCIAL_IMAGE = "/teilen-og-2026.webp";
export const INSTAGRAM_URL = "https://www.instagram.com/teilen.app/";

export const DEFAULT_TITLE = "Teilen App | Divide gastos, organiza cuentas y alcanza tus metas";
export const DEFAULT_DESCRIPTION =
  "Teilen es una app chilena para dividir gastos, organizar cuentas compartidas, crear recordatorios, programar gastos recurrentes y seguir metas de ahorro desde iOS y Android.";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      siteName: BRAND_NAME,
      title,
      description,
      locale: "es_CL",
      images: [
        {
          url: SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          type: "image/webp",
          alt: DEFAULT_TITLE,
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
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    alternateName: BRAND_ALTERNATE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/logo_teilen.png"),
    sameAs: [INSTAGRAM_URL],
    areaServed: {
      "@type": "Country",
      name: "Chile",
      identifier: "CL",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "contacto@teilen.cl",
        contactType: "customer support",
        availableLanguage: ["Spanish"],
      },
    ],
    description:
      "Teilen es una app chilena de finanzas personales para dividir gastos, organizar cuentas compartidas, crear recordatorios y seguir metas de ahorro.",
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    alternateName: BRAND_ALTERNATE_NAME,
    url: SITE_URL,
    inLanguage: "es-CL",
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
  };
}

export function mobileApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: BRAND_NAME,
    alternateName: BRAND_ALTERNATE_NAME,
    url: SITE_URL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS, Android",
    areaServed: "CL",
    inLanguage: "es-CL",
    image: absoluteUrl(SOCIAL_IMAGE),
    downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
    sameAs: [APP_STORE_URL, PLAY_STORE_URL, INSTAGRAM_URL],
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
    },
    description: DEFAULT_DESCRIPTION,
  };
}
