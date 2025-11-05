import Image from "next/image";

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
};

export function AppScreens({
  images,
  title = "Mira cómo luce Teilen",
  subtitle = "Interfaz limpia y moderna — optimizada para que dividir gastos sea realmente simple.",
}: Props) {
  const imgs = images.length ? images : ["/screens/1.png","/screens/2.png","/screens/3.png","/screens/4.png"];

  return (
    <section id="screens" className="mx-auto max-w-6xl px-5 py-24 fhd:py-28 fhd:px-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl fhd:text-6xl font-bold">{title}</h2>
        <p className="mt-3 text-black/60 max-w-2xl fhd:max-w-3xl mx-auto text-base md:text-lg fhd:text-xl">{subtitle}</p>
      </div>

      {/* Grid adaptable: 2 cols en mobile, 2 en tablet, 4 en desktop */}
      <div className="mt-12 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4 fhd:gap-10">
        {imgs.slice(0, 4).map((src) => (
          <PhoneScreen key={src} src={src} />
        ))}
      </div>
    </section>
  );
}

function PhoneScreen({ src }: { src: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="device-frame shadow-soft">
        <div className="device-notch" aria-hidden />
        <div className="device-screen">
          <Image
            src={src}
            alt="Captura de pantalla de Teilen"
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
