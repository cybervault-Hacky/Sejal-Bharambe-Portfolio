"use client";

import * as React from "react";
import * as THREE from "three";
import { CoreObject } from "./CoreObject";
import { Lighting } from "./Lighting";
import { CameraRig } from "./CameraRig";
import { PointerRig } from "./PointerRig";
import { useMotion } from "@/components/motion/MotionProvider";

export function ShowcaseScene() {
  const groupRef = React.useRef<THREE.Group>(null);
  const { isReducedMotion, isMobile } = useMotion();
  const [hovered, setHovered] = React.useState(false);

  return (
    <>
      <Lighting variant="showcase" />
      <CameraRig
        position={[0, 0.2, 6]}
        fov={isMobile ? 52 : 42}
        enablePointer={!isReducedMotion && !isMobile}
        enableScroll={false}
      />

      <group
        ref={groupRef}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <CoreObject variant="showcase" enableRotation={!isReducedMotion} enablePointer={!isReducedMotion && !isMobile} />
        {!isReducedMotion && !isMobile && (
          <PointerRig objectRef={groupRef} strength={0.15} disabledOnMobile />
        )}
      </group>

      {!isMobile && <fog attach="fog" args={["#0f0f0f", 10, 18]} />}

      {/* Interactive hint - subtle */}
      {hovered && !isReducedMotion && !isMobile && (
        <group>
          <mesh position={[0, -2.5, 0]}>
            <planeGeometry args={[2, 0.3]} />
            <meshBasicMaterial
              color="#1a1a1a"
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      )}
    </>
  );
}

export function ShowcaseSceneWrapper() {
  return <ShowcaseScene />;
}
