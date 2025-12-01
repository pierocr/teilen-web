import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <- evita que ESLint corte el build en Cloudflare
  },
  images: {
    remotePatterns: [
      // Avatares/portadas servidas desde Supabase Storage
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    // unoptimized: true, // solo si lo necesitas en Cloudflare Pages
  },
  // typescript: { ignoreBuildErrors: true }, // opcional si te frenara por TS
};

export default nextConfig;
