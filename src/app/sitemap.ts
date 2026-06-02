import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const staticRoutes = [
  "",
  "/dividir-gastos",
  "/gastos-compartidos",
  "/control-de-gastos",
  "/recordatorios",
  "/metas-de-ahorro",
  "/centro-de-ayuda",
  "/contacto",
  "/cookies",
  "/premium",
  "/terminos",
  "/privacidad",
  "/preguntas-frecuentes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString();
  return staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastmod,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
