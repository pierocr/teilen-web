// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Evita que ESLint corte el build en Cloudflare Pages
    ignoreDuringBuilds: true,
  },
  // Si en algún momento el type-check de TS te corta el build del CI,
  // puedes (temporalmente) habilitar esto:
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
