/**
 * Utility functions
 * Foundation for consistent styling and helpers
 */

/**
 * Merge class names - handles conditional classes
 * Ready for future expansion with tailwind-merge and clsx
 * Currently lightweight implementation to avoid extra deps in Phase 1
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format date for display
 */
export function formatDate(date: string): string {
  return date;
}

/**
 * Check if external link
 */
export function isExternalLink(href: string): boolean {
  return href.startsWith("http") || href.startsWith("//");
}

/**
 * Resolve an in-page anchor hash for the given pathname.
 * On the homepage keep "#section" (Lenis smooth-scroll handles it);
 * on subroutes navigate to the homepage anchor "/#section" so
 * hash navigation works from any page.
 */
export function resolveAnchorHash(hash: string, pathname: string): string {
  if (!hash.startsWith("#")) return hash;
  return pathname === "/" ? hash : `/${hash}`;
}

/**
 * Derive a short display value from a link href.
 * "https://www.linkedin.com/in/x" -> "linkedin.com/in/x"
 * "mailto:a@b.com" -> "a@b.com"
 * Keeps contact presentation data-driven from the centralized profile
 * values instead of duplicating display strings in components.
 */
export function linkDisplayValue(href: string): string {
  return href
    .replace(/^mailto:/i, "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "");
}

/**
 * Delay utility for animation readiness
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Slugify string for IDs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
