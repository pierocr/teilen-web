import Image from "next/image";
import Link from "next/link";
import {
  APP_STORE_URL,
  PLAY_STORE_URL,
  UNIVERSAL_DOWNLOAD_URL,
  breadcrumbJsonLd,
} from "@/lib/seo";

type RelatedLink = {
  label: string;
  href: string;
};

type SeoFeatureLandingProps = {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  sections: {
    title: string;
    text: string;
  }[];
  relatedLinks: RelatedLink[];
  currentPath: string;
};

export function SeoFeatureLanding({
  badge,
  title,
  description,
  highlights,
  sections,
  relatedLinks,
  currentPath,
}: SeoFeatureLandingProps) {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: title, path: currentPath },
  ]);

  return (
    <div className="relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute -left-24 top-[-12rem] h-96 w-[32rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-18rem] top-20 h-[28rem] w-[36rem] rounded-full bg-teal-200/30 blur-3xl" />

      <article className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-28">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 transition hover:text-emerald-900"
        >
          <span aria-hidden>←</span> Volver al inicio
        </Link>

        <header className="mt-10 grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {badge}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              {description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={APP_STORE_URL}
                aria-label="Descargar Teilen App en App Store"
                className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow"
                rel="noopener"
              >
                <Image
                  src="/Download_on_the_App_Store_Badge_ESMX_RGB_blk_100217.svg"
                  alt="Disponible en App Store para descargar Teilen App"
                  width={174}
                  height={58}
                  className="h-[48px] w-[144px] sm:h-[58px] sm:w-[174px]"
                />
              </a>
              <a
                href={PLAY_STORE_URL}
                aria-label="Descargar Teilen App en Google Play"
                className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-400 hover:shadow"
                rel="noopener"
              >
                <Image
                  src="/GetItOnGooglePlay_Badge_Web_color_Spanish-LATAM.png"
                  alt="Disponible en Google Play para descargar Teilen App"
                  width={196}
                  height={58}
                  className="h-[48px] w-[162px] sm:h-[58px] sm:w-[196px]"
                />
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">Qué puedes hacer con Teilen</h2>
            <ul className="mt-5 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
                      <path d="M7.8 13.4 4.4 10l1.1-1.1 2.3 2.3 6.7-6.7 1.1 1.1-7.8 7.8Z" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </header>

        <section className="mt-14 grid gap-5 md:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{section.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Explora más funcionalidades</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:border-emerald-400 hover:bg-emerald-100"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={UNIVERSAL_DOWNLOAD_URL}
              className="rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Descargar la app
            </a>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      </article>
    </div>
  );
}
