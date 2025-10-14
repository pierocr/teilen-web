import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const font = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap", weight: ["400","500","600","700","800"] });

export const metadata: Metadata = {
  title: "Teilen — Cambia la forma de dividir gastos",
  description: "Divide y paga sin fricción.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${font.className} min-h-dvh antialiased`}>
        {/* OJO: ya no ponemos <Navbar /> aquí */}
        <main>{children}</main>
        {/* Si tienes <Footer />, déjalo aquí debajo */}
      </body>
    </html>
  );
}
