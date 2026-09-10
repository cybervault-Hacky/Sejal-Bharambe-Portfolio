import type { NextConfig } from "next";

/**
 * Security headers - safe, non-breaking set for all environments.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/**
 * Production-only hardening (applied when NODE_ENV=production, i.e.
 * `next build` / `next start`) so development and preview tooling is
 * never constrained.
 *
 * CSP notes (audited against the actual application, Phase 10):
 * - The app loads NO external resources: no CDNs, no third-party fonts
 *   (system font stack), no remote images, no analytics, no iframes.
 *   All scripts/styles/images are same-origin.
 * - `script-src 'unsafe-inline'` is required: the Next.js App Router
 *   inlines RSC flight-data scripts (`self.__next_f.push(...)`) whose
 *   hashes change per page - static hashing is impractical.
 * - `style-src 'unsafe-inline'` covers inline style attributes
 *   (skill bars, 3D wrappers) and injected <style> tags.
 * - `connect-src 'self'`: 3D assets (models) load from /models only.
 *
 * Frame protection: `frame-ancestors` is deliberately NOT set here -
 * this deployment/preview architecture embeds the app in an iframe,
 * and 'none' would blank the page. Configure
 * `frame-ancestors 'none'` (or the required allowlist) at the verified
 * production domain/hosting level.
 */
const isProduction = process.env.NODE_ENV === "production";

const productionHeaders = isProduction
  ? [
      // HTTPS is verified on the deployed origin before release
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "upgrade-insecure-requests",
        ].join("; "),
      },
    ]
  : [];

const nextConfig: NextConfig = {
  // Frontend-only static optimization readiness
  // Keep server-renderable by default, isolate client components
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, ...productionHeaders],
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
