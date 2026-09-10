import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Frontend-only static optimization readiness
  // Keep server-renderable by default, isolate client components
  reactStrictMode: true,
  poweredByHeader: false,

  // Image optimization foundation for portfolio images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Performance: optimize motion libs
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
};

export default nextConfig;
