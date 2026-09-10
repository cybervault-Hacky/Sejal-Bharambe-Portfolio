import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { projects } from "@/data/projects";

/**
 * sitemap.xml - only real, public routes.
 * Project routes are generated from the central data source
 * (data/projects.ts) - no duplicated or invented entries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_CONFIG.url}/projects/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
