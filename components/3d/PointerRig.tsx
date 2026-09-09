"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMotion } from "@/components/motion/MotionProvider";

export interface PointerRigProps {
  objectRef: React.RefObject<THREE.Group | null>;
  strength?: number; // 0.08 to 0.15 rad
  disabledOnMobile?: boolean;
}

export function PointerRig({
  objectRef,
  strength = 0.12,
  disabledOnMobile = true,
}: PointerRigProps) {
  const { isReducedMotion, isMobile } = useMotion();
  const pointer = React.useRef({ x: 0, y: 0 });
  const targetRotation = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (isReducedMotion || (disabledOnMobile && isMobile)) return;
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      pointer.current.x = x;
      pointer.current.y = y;

      // Restrained rotation
      targetRotation.current.y = x * strength;
      targetRotation.current.x = y * strength * 0.7;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isReducedMotion, isMobile, disabledOnMobile, strength]);

  useFrame((_, delta) => {
    if (!objectRef.current) return;
    if (isReducedMotion || (disabledOnMobile && isMobile)) return;

    const lerpFactor = Math.min(delta * 2.5, 1);

    objectRef.current.rotation.y = THREE.MathUtils.lerp(
      objectRef.current.rotation.y,
      targetRotation.current.y,
      lerpFactor
    );
    objectRef.current.rotation.x = THREE.MathUtils.lerp(
      objectRef.current.rotation.x,
      targetRotation.current.x,
      lerpFactor
    );
  });

  return null;
}

export function usePointerRotation(strength: number = 0.12) {
  const { isReducedMotion, isMobile } = useMotion();
  const pointer = React.useRef({ x: 0, y: 0 });
  const target = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (isReducedMotion || isMobile) return;
    if (typeof window === "undefined") return;

    const handleMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.x = x;
      pointer.current.y = y;
      target.current.y = x * strength;
      target.current.x = y * strength * 0.7;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isReducedMotion, isMobile, strength]);

  return target;
}
