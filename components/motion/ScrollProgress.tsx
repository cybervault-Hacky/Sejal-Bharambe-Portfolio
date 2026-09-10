"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useMotion } from "./MotionProvider";
import { cn } from "@/lib/utils";

export interface ScrollProgressProps {
  className?: string;
  height?: number; // 1-2px recommended
  color?: string;
  position?: "top" | "bottom";
  showInHeader?: boolean;
}

export function ScrollProgress({
  className,
  height = 2,
  color = "hsl(var(--foreground))",
  position = "top",
  showInHeader = false,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const { isReducedMotion } = useMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (isReducedMotion) {
    return null;
  }

  if (showInHeader) {
    return (
      <motion.div
        className={cn(
          "absolute left-0 w-full origin-left",
          position === "top" ? "top-0" : "bottom-0",
          className
        )}
        style={{
          height,
          backgroundColor: color,
          scaleX,
        }}
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 z-[60] origin-left",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{
        height,
        backgroundColor: color,
        scaleX,
      }}
    />
  );
}

export function ScrollProgressInHeader({ className, height = 1 }: { className?: string; height?: number }) {
  return <ScrollProgress className={className} height={height} showInHeader position="bottom" />;
}
