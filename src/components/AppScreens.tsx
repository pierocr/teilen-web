import Image from "next/image";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
};

export function AppScreens({
  images,
  title,
  subtitle,
}: Props) {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const imgs = images.length ? images : ["/screens/1.png","/screens/2.png","/screens/3.png","/screens/4.png"];
  const resolvedTitle = title ?? home.appScreens.title;
  const resolvedSubtitle = subtitle ?? home.appScreens.subtitle;

  return (
    <section id="screens" className="mx-auto max-w-6xl px-5 py-20 fhd:py-24 fhd:px-8">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
          {home.appScreens.badge}
        </span>
        <h2 className="mt-5 text-3xl font-bold text-slate-900 md:text-5xl fhd:text-6xl">{resolvedTitle}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 md:text-lg fhd:max-w-3xl fhd:text-xl">{resolvedSubtitle}</p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4 fhd:gap-10">
        {imgs.slice(0, 4).map((src) => (
          <PhoneScreen key={src} src={src} alt={home.appScreens.imageAlt} />
        ))}
      </div>
    </section>
  );
}

function PhoneScreen({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex items-center justify-center rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_20px_55px_rgba(15,23,42,0.1)]">
      <div className="device-frame shadow-soft">
        <div className="device-notch" aria-hidden />
        <div className="device-screen">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 45vw, (max-width: 1024px) 45vw, 22vw"
            className="object-cover"
          />
        </div>
        <div className="device-buttons" aria-hidden />
      </div>
    </div>
  );
}
