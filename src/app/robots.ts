import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/app/",
          "/login",
          "/actividad",
          "/amigos",
          "/personales",
          "/cuenta",
          "/auth/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: "teilen.cl",
  };
}
