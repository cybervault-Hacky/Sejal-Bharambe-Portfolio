"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useMotion } from "./MotionProvider";

export interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  offset?: number; // -10 to 10 recommended
  direction?: "up" | "down";
  disabledOnMobile?: boolean;
}

export function Parallax({
  children,
  className,
  offset = 10,
  direction = "up",
  disabledOnMobile = true,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { isReducedMotion, isMobile } = useMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Disable parallax for reduced motion or mobile if requested
  const shouldDisable = isReducedMotion || (disabledOnMobile && isMobile);

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldDisable ? [0, 0] : direction === "up" ? [offset, -offset] : [-offset, offset]
  );

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  if (shouldDisable) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

export interface ParallaxContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Container that provides parallax context
export function ParallaxContainer({ children, className }: ParallaxContainerProps) {
  return <div className={className}>{children}</div>;
}

// Hook for custom parallax values
export function useParallaxValue(
  offset: number = 10,
  direction: "up" | "down" = "up"
): { ref: React.RefObject<HTMLDivElement | null>; y: MotionValue<number> } {
  const ref = React.useRef<HTMLDivElement>(null);
  const { isReducedMotion, isMobile } = useMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const shouldDisable = isReducedMotion || isMobile;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldDisable ? [0, 0] : direction === "up" ? [offset, -offset] : [-offset, offset]
  );

  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
  });

  return { ref, y: smoothY };
}
