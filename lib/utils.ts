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
