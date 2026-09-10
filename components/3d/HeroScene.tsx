"use client";

import * as React from "react";
import * as THREE from "three";
import { CoreObject } from "./CoreObject";
import { Lighting } from "./Lighting";
import { CameraRig } from "./CameraRig";
import { PointerRig } from "./PointerRig";
import { useMotion, useScrollProgress } from "@/components/motion/MotionProvider";

export function HeroScene() {
  const groupRef = React.useRef<THREE.Group>(null);
  const scrollProgress = useScrollProgress();
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <>
      <Lighting variant="hero" />
      <CameraRig
        position={[0, 0, 5]}
        fov={isMobile ? 50 : 45}
        enablePointer={!isReducedMotion && !isMobile}
        enableScroll={!isReducedMotion}
        scrollProgress={scrollProgress * 0.3}
      />

      <group ref={groupRef}>
        <CoreObject variant="hero" enableRotation={!isReducedMotion} enablePointer={!isReducedMotion && !isMobile} />
        {!isReducedMotion && !isMobile && (
          <PointerRig objectRef={groupRef} strength={0.12} disabledOnMobile />
        )}
      </group>

      {/* Subtle fog for depth - disabled mobile */}
      {!isMobile && <fog attach="fog" args={["#0a0a0a", 8, 15]} />}
    </>
  );
}

export function HeroSceneWrapper() {
  return <HeroScene />;
}
