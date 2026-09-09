"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens, revealDefaults, reducedMotionConfig } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function MotionSection({
  children,
  className,
  id,
  delay = 0,
  once = true,
  amount = revealDefaults.amount,
  as = "section",
}: MotionSectionProps) {
  const { isReducedMotion } = useMotion();
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

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
      hidden: { opacity: 0, y: motionTokens.distance.large },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: motionTokens.duration.slow,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay]);

  return (
    <MotionComponent
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: revealDefaults.margin as never }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

export interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function MotionItem({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionItemProps) {
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
      up: { y: motionTokens.distance.medium },
      down: { y: -motionTokens.distance.medium },
      left: { x: motionTokens.distance.medium },
      right: { x: -motionTokens.distance.medium },
      none: {},
    };

    return {
      hidden: { opacity: 0, ...dirMap[direction] },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: motionTokens.duration.medium,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay, direction]);

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
