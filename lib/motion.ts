/**
 * Motion Design Tokens - Centralized, restrained, premium
 * Inspired by Apple, Linear, Vercel, Raycast, Stripe
 * 
 * Philosophy:
 * - Micro interaction: 150-250ms
 * - UI transition: 250-400ms
 * - Section reveal: 500-800ms
 * - Hero entrance: 700-1200ms
 */

export const motionTokens = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    medium: 0.4,
    slow: 0.6,
    slower: 0.8,
    hero: 1.0,
  },
  ease: {
    // Standard, controlled, natural
    standard: [0.25, 0.1, 0.25, 1] as const,
    // Apple/Linear style - smooth out
    out: [0.16, 1, 0.3, 1] as const,
    // Smooth in-out
    smooth: [0.65, 0, 0.35, 1] as const,
    // Emphasized out
    outExpo: [0.16, 1, 0.3, 1] as const,
    // Gentle
    gentle: [0.25, 0.1, 0.25, 1] as const,
  },
  spring: {
    // Subtle, premium - not bouncy
    subtle: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
    smooth: {
      type: "spring" as const,
      stiffness: 200,
      damping: 25,
      mass: 1,
    },
    snappy: {
      type: "spring" as const,
      stiffness: 400,
      damping: 35,
      mass: 0.8,
    },
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.12,
  },
  distance: {
    small: 8,
    medium: 16,
    large: 24,
    xl: 32,
  },
  scale: {
    subtle: 0.97,
    small: 0.98,
    medium: 1.01,
    large: 1.02,
  },
} as const;

// Lenis configuration - responsive, controlled, natural, slightly weighted
export const lenisConfig = {
  lerp: 0.08, // Slightly weighted, responsive
  duration: 1.2,
  smoothWheel: true,
  smoothTouch: false, // Disable on touch for performance
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
};

// Viewport reveal defaults
export const revealDefaults = {
  amount: 0.2, // Trigger when 20% enters viewport
  once: true,
  margin: "0px 0px -10% 0px", // Slight early trigger
};

// Reduced motion fallbacks
export const reducedMotionConfig = {
  duration: 0.01,
  ease: "linear" as const,
  distance: 0,
  scale: 1,
};
