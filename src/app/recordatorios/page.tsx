import { SeoFeatureLanding } from "@/components/SeoFeatureLanding";
import { relatedSeoLinks, seoLandingPages } from "@/lib/seo-pages";
import { createPageMetadata } from "@/lib/seo";

const page = seoLandingPages.recordatorios;

export const metadata = createPageMetadata({
  title: page.metaTitle,
  description: page.description,
  path: page.path,
});

export default function RecordatoriosPage() {
  return (
    <SeoFeatureLanding
      {...page}
      currentPath={page.path}
      relatedLinks={relatedSeoLinks.filter((link) => link.href !== page.path)}
    />
  );
}
