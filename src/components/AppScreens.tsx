import Image from "next/image";
import { useLocale } from "./LanguageProvider";
import { getHomeMessages } from "@/lib/home-i18n";

type Props = {
  images: string[];
  labels?: string[];
  title?: string;
  subtitle?: string;
};

export function AppScreens({
  images,
  labels,
  title,
  subtitle,
}: Props) {
  const { locale } = useLocale();
  const home = getHomeMessages(locale);
  const imgs = images.length ? images : ["/screens/1.png","/screens/2.png","/screens/3.png","/screens/4.png"];
  const resolvedTitle = title ?? home.appScreens.title;
  const resolvedSubtitle = subtitle ?? home.appScreens.subtitle;

  return (
    <section id="screens" className="mx-auto max-w-7xl px-5 py-10 sm:py-20 fhd:py-24 fhd:px-8">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-4 sm:text-[11px] sm:tracking-[0.24em]">
          {home.appScreens.badge}
        </span>
        <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:mt-5 sm:text-3xl md:text-5xl fhd:text-6xl">{resolvedTitle}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base md:text-lg fhd:max-w-3xl fhd:text-xl">{resolvedSubtitle}</p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 min-[390px]:gap-4 sm:mt-12 sm:gap-6 md:gap-8 lg:grid-cols-4 fhd:gap-10">
        {imgs.slice(0, 4).map((src, index) => (
          <PhoneScreen
            key={src}
            src={src}
            alt={labels?.[index] ? `${home.appScreens.imageAlt}: ${labels[index]}` : home.appScreens.imageAlt}
            label={labels?.[index]}
          />
        ))}
      </div>
    </section>
  );
}

function PhoneScreen({ src, alt, label }: { src: string; alt: string; label?: string }) {
  return (
    <figure className="relative flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-[0_14px_36px_rgba(15,23,42,0.1)] sm:rounded-3xl sm:p-4 sm:shadow-[0_20px_55px_rgba(15,23,42,0.1)]">
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
      {label && (
        <figcaption className="mt-3 text-center text-xs font-semibold text-slate-700 sm:text-sm">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
