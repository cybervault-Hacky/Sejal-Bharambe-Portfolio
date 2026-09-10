import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * robots.txt - public portfolio: allow normal crawling.
 * No private/development paths exist to exclude.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
