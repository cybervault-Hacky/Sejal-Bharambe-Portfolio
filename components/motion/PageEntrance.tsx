"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens, reducedMotionConfig } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export interface PageEntranceProps {
  children: React.ReactNode;
  className?: string;
}

export function PageEntrance({ children, className }: PageEntranceProps) {
  const { isReducedMotion } = useMotion();

  const variants: Variants = React.useMemo(() => {
    if (isReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: reducedMotionConfig.duration },
        },
      };
    }

    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: motionTokens.duration.medium,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface PageEntranceItemProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "none";
  distance?: number;
}

export function PageEntranceItem({
  children,
  delay = 0,
  className,
  direction = "up",
  distance = 16,
}: PageEntranceItemProps) {
  const { isReducedMotion } = useMotion();

  const variants: Variants = React.useMemo(() => {
    if (isReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: reducedMotionConfig.duration, delay },
        },
      };
    }

    const dirMap = {
      up: { y: distance },
      down: { y: -distance },
      none: {},
    };

    return {
      hidden: { opacity: 0, ...dirMap[direction] },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: motionTokens.duration.medium,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay, direction, distance]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered page entrance container
export function PageEntranceStagger({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  className,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}) {
  const { isReducedMotion } = useMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0.01 : staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
