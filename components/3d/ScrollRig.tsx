"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMotion, useScrollProgress } from "@/components/motion/MotionProvider";

export interface ScrollRigProps {
  objectRef: React.RefObject<THREE.Group | null>;
  enabled?: boolean;
}

export function ScrollRig({ objectRef, enabled = true }: ScrollRigProps) {
  const scrollProgress = useScrollProgress();
  const { isReducedMotion } = useMotion();

  useFrame((_, delta) => {
    if (!objectRef.current) return;
    if (!enabled || isReducedMotion) return;

    const lerpFactor = Math.min(delta * 1.5, 1);

    // Subtle scroll-linked rotation - not huge
    const targetY = scrollProgress * 0.3; // Max 0.3 rad

    objectRef.current.rotation.y = THREE.MathUtils.lerp(
      objectRef.current.rotation.y,
      objectRef.current.rotation.y + targetY * 0.01,
      lerpFactor
    );

    // Very subtle vertical shift
    const targetPosY = scrollProgress * 0.2 - 0.1;
    objectRef.current.position.y = THREE.MathUtils.lerp(
      objectRef.current.position.y,
      targetPosY,
      lerpFactor
    );
  });

  return null;
}

export function useScrollProgressValue() {
  const progress = useScrollProgress();
  const { isReducedMotion } = useMotion();

  const ref = React.useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current || isReducedMotion) return;
    
    const lerpFactor = Math.min(delta * 1.5, 1);
    const targetY = progress * 0.2;
    
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetY,
      lerpFactor
    );
  });

  return { ref, progress };
}
