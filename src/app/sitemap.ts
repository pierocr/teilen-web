import type { MetadataRoute } from "next";

const baseUrl = "https://www.teilen.cl";

const staticRoutes = [
  "",
  "/centro-de-ayuda",
  "/contacto",
  "/cookies",
  "/terminos",
  "/privacidad",
  "/preguntas-frecuentes",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastmod = new Date().toISOString();
  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: lastmod,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
