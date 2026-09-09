"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotion } from "./MotionProvider";

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0.1 to 0.5, default 0.2 = 4-8px max
  disabledOnMobile?: boolean;
}

export function Magnetic({
  children,
  className,
  strength = 0.2,
  disabledOnMobile = true,
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { isReducedMotion, isMobile } = useMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
    mass: 0.5,
  });

  const shouldDisable = isReducedMotion || (disabledOnMobile && isMobile);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (shouldDisable || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Limit movement to 4-8px max
      const maxMove = 8;
      const moveX = Math.max(Math.min(deltaX * strength, maxMove), -maxMove);
      const moveY = Math.max(Math.min(deltaY * strength, maxMove), -maxMove);

      x.set(moveX);
      y.set(moveY);
    },
    [shouldDisable, strength, x, y]
  );

  const handleMouseLeave = React.useCallback(() => {
    if (shouldDisable) return;
    x.set(0);
    y.set(0);
  }, [shouldDisable, x, y]);

  if (shouldDisable) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic button wrapper - selective use
export function MagneticButton({
  children,
  className,
  strength = 0.15,
}: MagneticProps) {
  return (
    <Magnetic className={className} strength={strength}>
      {children}
    </Magnetic>
  );
}
