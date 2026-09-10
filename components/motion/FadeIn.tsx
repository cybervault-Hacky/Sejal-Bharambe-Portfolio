"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens, revealDefaults, reducedMotionConfig } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = motionTokens.duration.medium,
  className,
  once = true,
  amount = revealDefaults.amount,
  direction = "up",
  distance = motionTokens.distance.medium,
}: FadeInProps) {
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

    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    };

    return {
      hidden: {
        opacity: 0,
        ...directionMap[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay, duration, direction, distance]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeInImmediate({
  children,
  delay = 0,
  duration = motionTokens.duration.medium,
  className,
  direction = "up",
  distance = motionTokens.distance.medium,
}: Omit<FadeInProps, "once" | "amount">) {
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

    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      none: {},
    };

    return {
      hidden: {
        opacity: 0,
        ...directionMap[direction],
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay, duration, direction, distance]);

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
