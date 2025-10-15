import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <- evita que ESLint corte el build en Cloudflare
  },
  images: {
    remotePatterns: [
      // { protocol: "https", hostname: "TU-CDN.com" },
    ],
    // unoptimized: true, // solo si lo necesitas en Cloudflare Pages
  },
  // typescript: { ignoreBuildErrors: true }, // opcional si te frenara por TS
};

export default nextConfig;
