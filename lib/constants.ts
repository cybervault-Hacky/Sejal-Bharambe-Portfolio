/**
 * Site constants and configuration
 * Centralized for easy maintenance
 * Links populated from the CV (Phase 5)
 */

export const SITE_CONFIG = {
  name: "Sejal Bharambe Portfolio",
  title: "Sejal Bharambe — Software Developer + AI Engineer",
  description:
    "AI Project Manager and Full Stack Developer with 2+ years of experience building full-stack and AI-powered applications with Java, Spring Boot, React, Next.js and TypeScript.",
  // Centralized site URL - single source for metadataBase, canonical,
  // Open Graph and sitemap. NOTE: domain ownership/liveness is NOT verified
  // in this repository; finalizing the production domain is a Phase 10 task.
  url: "https://sejalbharambe.dev",
  links: {
    github: "https://github.com/sejal-bharambe",
    linkedin: "https://www.linkedin.com/in/sejal-bharambe-5988a720b",
    email: "sejalbharambe2003@gmail.com",
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION_CONFIG = {
  // Ready for Framer Motion integration in Phase 2
  duration: {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
  },
  easing: {
    easeOut: [0.16, 1, 0.3, 1],
    easeInOut: [0.65, 0, 0.35, 1],
  },
} as const;

export const THEME_CONFIG = {
  defaultTheme: "dark" as const,
  enableSystem: true,
  disableTransitionOnChange: false,
} as const;
