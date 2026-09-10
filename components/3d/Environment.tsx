"use client";

import { useMotion } from "@/components/motion/MotionProvider";

export function Environment({ variant: _variant = "hero" }: { variant?: "hero" | "showcase" }) {
  const { isMobile: _isMobile } = useMotion();

  // Minimal environment - no HDR for performance, use CSS background system
  return null;
}

export function FogEnvironment() {
  const { isMobile } = useMotion();

  if (isMobile) return null;

  return null;
}
