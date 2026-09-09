"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMotion } from "@/components/motion/MotionProvider";
import { OrbitalSystem, TechnicalNodes, ConnectionLines } from "./TechOrbit";

export interface CoreObjectProps {
  variant?: "hero" | "showcase";
  enableRotation?: boolean;
  enablePointer?: boolean;
}

export function CoreObject({
  variant = "hero",
  enableRotation = true,
  enablePointer: _enablePointer = true,
}: CoreObjectProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const coreRef = React.useRef<THREE.Mesh>(null);
  const shellRef = React.useRef<THREE.Mesh>(null);
  const innerCoreRef = React.useRef<THREE.Mesh>(null);
  const { isReducedMotion, isMobile } = useMotion();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (isReducedMotion) return;

    // Very slow controlled rotation - not high speed
    if (enableRotation) {
      const speed = variant === "hero" ? 0.08 : 0.05;
      const mobileFactor = isMobile ? 0.5 : 1;
      
      groupRef.current.rotation.y += delta * speed * mobileFactor * 0.3;
      
      if (coreRef.current) {
        coreRef.current.rotation.y += delta * speed * mobileFactor * 0.5;
        coreRef.current.rotation.x += delta * speed * mobileFactor * 0.2;
      }

      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.y -= delta * speed * mobileFactor * 0.8;
        innerCoreRef.current.rotation.x -= delta * speed * mobileFactor * 0.3;
      }
    }

    // Subtle breathing
    if (shellRef.current) {
      const breathe = Math.sin(state.clock.elapsedTime * 0.5) * 0.02 + 1;
      shellRef.current.scale.setScalar(breathe);
    }
  });

  const coreSize = variant === "hero" ? 0.7 : 0.9;
  const shellSize = coreSize * 1.35;

  return (
    <group ref={groupRef}>
      {/* Inner core - precision geometric */}
      <mesh ref={innerCoreRef}>
        <icosahedronGeometry args={[coreSize * 0.6, 1]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.8}
          emissive="#0a0a0a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Central core - main geometric object */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[coreSize, 2]} />
        <meshStandardMaterial
          color="#2a2a2a"
          roughness={0.4}
          metalness={0.7}
          emissive="#1a1a1a"
          emissiveIntensity={0.15}
          flatShading={false}
        />
      </mesh>

      {/* Wireframe overlay for technical feel */}
      <mesh>
        <icosahedronGeometry args={[coreSize * 1.01, 1]} />
        <meshBasicMaterial
          color="#3a3a3a"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Translucent shell - glass-like protective layer */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[shellSize, 2]} />
        <meshPhysicalMaterial
          color="#fafafa"
          roughness={0.15}
          metalness={0.1}
          transmission={0.2}
          thickness={0.5}
          transparent
          opacity={0.08}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbital system */}
      <OrbitalSystem variant={variant} />

      {/* Technical nodes */}
      <TechnicalNodes variant={variant} />

      {/* Connection lines */}
      <ConnectionLines variant={variant} />

      {/* Central emissive accent - very subtle */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#fafafa"
          emissive="#ffffff"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
}

export function HeroCore() {
  return <CoreObject variant="hero" enableRotation enablePointer />;
}

export function ShowcaseCore() {
  return <CoreObject variant="showcase" enableRotation enablePointer />;
}
