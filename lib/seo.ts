/**
 * SEO utilities and metadata foundation
 * Prepared for advanced SEO in later phases
 */

import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title = SITE_CONFIG.title,
  description = SITE_CONFIG.description,
  image = SITE_CONFIG.ogImage,
  url = SITE_CONFIG.url,
  noIndex = false,
}: SeoProps = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: [
      "Software Developer",
      "AI Engineer",
      "Full Stack Developer",
      "Next.js",
      "React",
      "TypeScript",
      "AI Agents",
      "Portfolio",
      "Sejal Bharambe",
    ],
    authors: [{ name: "Sejal Bharambe" }],
    creator: "Sejal Bharambe",
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@sejalbharambe",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/icons/apple-touch-icon.png",
    },
    metadataBase: new URL(SITE_CONFIG.url),
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
