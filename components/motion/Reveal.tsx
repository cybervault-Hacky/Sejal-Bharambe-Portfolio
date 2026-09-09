"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens, revealDefaults, reducedMotionConfig } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({
  children,
  delay = 0,
  duration = motionTokens.duration.slow,
  className,
  once = true,
  amount = revealDefaults.amount,
  direction = "up",
  distance = motionTokens.distance.large,
  as = "div",
}: RevealProps) {
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
    <MotionComponent
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

export function RevealOnScroll(props: RevealProps) {
  return <Reveal {...props} />;
}
