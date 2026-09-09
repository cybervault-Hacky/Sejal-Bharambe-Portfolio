"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { motionTokens, revealDefaults, reducedMotionConfig } from "@/lib/motion";
import { useMotion } from "./MotionProvider";

export interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Stagger({
  children,
  staggerDelay = motionTokens.stagger.normal,
  delay = 0,
  className,
  once = true,
  amount = revealDefaults.amount,
  direction = "up",
  distance = motionTokens.distance.medium,
  as = "div",
}: StaggerProps) {
  const { isReducedMotion } = useMotion();
  const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

  const containerVariants: Variants = React.useMemo(() => {
    if (isReducedMotion) {
      return {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.01,
            delayChildren: delay,
          },
        },
      };
    }

    return {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, staggerDelay, delay]);

  const itemVariants: Variants = React.useMemo(() => {
    if (isReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: reducedMotionConfig.duration },
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
          duration: motionTokens.duration.medium,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, direction, distance]);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: revealDefaults.margin as never }}
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </MotionComponent>
  );
}

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerItem({ children, className, delay = 0 }: StaggerItemProps) {
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
      hidden: { opacity: 0, y: motionTokens.distance.medium },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: motionTokens.duration.medium,
          delay,
          ease: motionTokens.ease.out,
        },
      },
    };
  }, [isReducedMotion, delay]);

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

// Direct stagger container for manual control
export function StaggerContainer({
  children,
  staggerDelay = motionTokens.stagger.normal,
  delay = 0,
  className,
  once = true,
  amount = revealDefaults.amount,
}: Omit<StaggerProps, "direction" | "distance" | "as">) {
  const { isReducedMotion } = useMotion();

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isReducedMotion ? 0.01 : staggerDelay,
        delayChildren: delay,
      },
    },
  };

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
