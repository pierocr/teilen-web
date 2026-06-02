import { SeoFeatureLanding } from "@/components/SeoFeatureLanding";
import { relatedSeoLinks, seoLandingPages } from "@/lib/seo-pages";
import { createPageMetadata } from "@/lib/seo";

const page = seoLandingPages.gastosCompartidos;

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: page.path,
});

export default function GastosCompartidosPage() {
  return (
    <SeoFeatureLanding
      {...page}
      currentPath={page.path}
      relatedLinks={relatedSeoLinks.filter((link) => link.href !== page.path)}
    />
  );
}
