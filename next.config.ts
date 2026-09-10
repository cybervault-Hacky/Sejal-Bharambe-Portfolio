import type { NextConfig } from "next";

/**
 * Security headers - safe, non-breaking set for all environments.
 *
 * Deliberately NOT set here (Phase 10 production configuration):
 * - Content-Security-Policy: requires production chunk hashing and
 *   careful allowlisting (fonts, inline styles, 3D/WebGL context);
 *   a broken CSP would take the site down.
 * - Strict-Transport-Security: only valid once a production HTTPS
 *   domain is verified and deployed.
 * - X-Frame-Options / frame-ancestors: would block iframe-based
 *   preview/proxy environments until the production host is final.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  // Frontend-only static optimization readiness
  // Keep server-renderable by default, isolate client components
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // Image optimization foundation for portfolio images
  images: {
    formats: ["image/avif", "image/webp"],
    // No remote image sources - all assets are local to /public
    remotePatterns: [],
  },

  // Performance: optimize motion libs
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
};

export default nextConfig;
