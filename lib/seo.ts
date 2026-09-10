/**
 * SEO utilities and metadata foundation
 *
 * - Factual, route-appropriate titles and descriptions
 * - Canonical URLs are relative paths resolved against metadataBase
 *   (SITE_CONFIG.url) - no duplicated or dev-environment URLs
 * - Branded OG image: /images/og-image.jpg (1200x630, generated from
 *   factual portfolio information only - no metrics, logos, or claims)
 */

import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface SeoProps {
  title?: string;
  description?: string;
  /** Canonical path (resolved against metadataBase) - defaults to homepage */
  canonicalPath?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  canonicalPath = "/",
  noIndex = false,
}: SeoProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: [
      "Sejal Bharambe",
      "Software Developer",
      "AI Engineer",
      "AI Project Manager",
      "Full Stack Developer",
      "Next.js",
      "React",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Portfolio",
    ],
    authors: [{ name: "Sejal Bharambe" }],
    creator: "Sejal Bharambe",
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      // Relative path - Next resolves it against metadataBase, so the
      // configured site URL stays in exactly one place (SITE_CONFIG.url)
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalPath,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          // Relative - resolved against metadataBase (SITE_CONFIG.url)
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-image.jpg"],
    },
    icons: {
      // Favicon is provided by app/icon.svg (Next.js file convention)
      icon: "/icon.svg",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
