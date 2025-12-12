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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 1200],
    qualities: [75, 85],
    // unoptimized: true, // solo si lo necesitas en Cloudflare Pages
  },
  // typescript: { ignoreBuildErrors: true }, // opcional si te frenara por TS
};

export default nextConfig;
