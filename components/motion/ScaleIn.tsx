"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens, revealDefaults, reducedMotionConfig } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export interface ScaleInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  scale?: number;
}

export function ScaleIn({
  children,
  delay = 0,
  duration = motionTokens.duration.slow,
  className,
  once = true,
  amount = revealDefaults.amount,
  scale = motionTokens.scale.subtle,
}: ScaleInProps) {
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

    return {
      hidden: { opacity: 0, scale },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay, duration, scale]);

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

export function ScaleInImmediate({
  children,
  delay = 0,
  duration = motionTokens.duration.slow,
  className,
  scale = motionTokens.scale.subtle,
}: Omit<ScaleInProps, "once" | "amount">) {
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

    return {
      hidden: { opacity: 0, scale },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay, duration, scale]);

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
