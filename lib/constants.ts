/**
 * Site constants and configuration
 * Centralized for easy maintenance
 */

export const SITE_CONFIG = {
  name: "Sejal Bharambe Portfolio",
  title: "Sejal Bharambe — Software Developer + AI Engineer",
  description:
    "Software Developer with 2+ years of professional experience building full-stack applications and AI-powered solutions.",
  url: "https://sejalbharambe.dev",
  ogImage: "/images/og-image.jpg",
  links: {
    github: "TODO",
    linkedin: "TODO",
    email: "TODO",
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
