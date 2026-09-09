"use client";

import * as React from "react";
import { useMotion } from "@/components/motion/MotionProvider";

export interface LightingProps {
  variant?: "hero" | "showcase" | "minimal";
}

export function Lighting({ variant = "hero" }: LightingProps) {
  const { isMobile } = useMotion();

  // Mobile reduction: fewer lights, lower intensity
  const intensityMultiplier = isMobile ? 0.7 : 1;

  return (
    <>
      {/* Ambient - soft base */}
      <ambientLight intensity={0.4 * intensityMultiplier} color="#ffffff" />

      {/* Key light - soft directional, creates depth */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8 * intensityMultiplier}
        color="#ffffff"
        castShadow={false}
      />

      {/* Fill light - subtle opposite */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.3 * intensityMultiplier}
        color="#a0a0b0"
      />

      {/* Rim light - silhouette separation */}
      <directionalLight
        position={[0, -5, -5]}
        intensity={0.4 * intensityMultiplier}
        color="#c0c0d0"
      />

      {/* Hemisphere for natural ambient */}
      <hemisphereLight
        args={["#ffffff", "#0a0a0a", 0.3 * intensityMultiplier]}
      />

      {/* Point light for subtle highlight - hero only */}
      {variant === "hero" && !isMobile && (
        <pointLight
          position={[2, 2, 2]}
          intensity={0.5 * intensityMultiplier}
          color="#ffffff"
          distance={10}
          decay={2}
        />
      )}

      {/* Showcase: slightly richer */}
      {variant === "showcase" && !isMobile && (
        <>
          <pointLight
            position={[-2, 3, 2]}
            intensity={0.4 * intensityMultiplier}
            color="#d0d0e0"
            distance={12}
          />
          <spotLight
            position={[0, 8, 0]}
            angle={0.3}
            penumbra={0.8}
            intensity={0.3 * intensityMultiplier}
            color="#ffffff"
            castShadow={false}
          />
        </>
      )}
    </>
  );
}

export function SoftLighting() {
  return <Lighting variant="minimal" />;
}
