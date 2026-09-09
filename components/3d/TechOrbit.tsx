"use client";

import * as React from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMotion } from "@/components/motion/MotionProvider";

export interface TechOrbitProps {
  radius?: number;
  thickness?: number;
  speed?: number;
  color?: string;
  opacity?: number;
  rotation?: [number, number, number];
}

export function TechOrbit({
  radius = 1.8,
  thickness = 0.01,
  speed = 0.1,
  color = "#2a2a2a",
  opacity = 0.6,
  rotation = [0, 0, 0],
}: TechOrbitProps) {
  const orbitRef = React.useRef<THREE.Group>(null);
  const { isReducedMotion, isMobile } = useMotion();

  useFrame((_, delta) => {
    if (!orbitRef.current) return;
    if (isReducedMotion || isMobile) return;

    orbitRef.current.rotation.y += delta * speed * 0.1;
    orbitRef.current.rotation.z += delta * speed * 0.05;
  });

  return (
    <group ref={orbitRef} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, thickness, 8, 64]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export function OrbitalSystem({ variant = "hero" }: { variant?: "hero" | "showcase" }) {
  const { isMobile, isReducedMotion } = useMotion();

  // Mobile reduction: fewer rings
  const rings = isMobile
    ? [
        { radius: 1.6, speed: 0.08, rotation: [0.5, 0, 0] as [number, number, number], opacity: 0.5 },
        { radius: 2.1, speed: -0.05, rotation: [0, 0.3, 0.2] as [number, number, number], opacity: 0.3 },
      ]
    : [
        { radius: 1.5, speed: 0.1, rotation: [0.4, 0, 0] as [number, number, number], opacity: 0.6 },
        { radius: 2.0, speed: -0.06, rotation: [0.2, 0.5, 0.1] as [number, number, number], opacity: 0.4 },
        { radius: 2.5, speed: 0.04, rotation: [0.1, 0.2, 0.6] as [number, number, number], opacity: 0.25 },
      ];

  return (
    <group>
      {rings.map((ring, idx) => (
        <TechOrbit
          key={idx}
          radius={ring.radius}
          speed={isReducedMotion ? 0 : ring.speed}
          rotation={ring.rotation}
          opacity={ring.opacity}
          thickness={variant === "hero" ? 0.008 : 0.012}
        />
      ))}
    </group>
  );
}

export interface TechnicalNodeProps {
  position: [number, number, number];
  size?: number;
  color?: string;
  label?: string;
  emissive?: boolean;
}

export function TechnicalNode({
  position,
  size = 0.06,
  color = "#fafafa",
  label: _label,
  emissive = false,
}: TechnicalNodeProps) {
  const nodeRef = React.useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  const { isReducedMotion, isMobile } = useMotion();

  useFrame((state) => {
    if (!nodeRef.current || isReducedMotion) return;
    
    // Subtle pulse
    const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 + 1;
    nodeRef.current.scale.setScalar(hovered ? 1.2 : pulse);
  });

  return (
    <group position={position}>
      <mesh
        ref={nodeRef}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive || hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 0.5 : emissive ? 0.3 : 0}
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Connection point glow */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[size * 2, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
          />
        </mesh>
      )}
    </group>
  );
}

export function TechnicalNodes({ variant = "hero" }: { variant?: "hero" | "showcase" }) {
  const { isMobile } = useMotion();

  const nodes = isMobile
    ? [
        { position: [1.5, 0.8, 0] as [number, number, number], label: "API" },
        { position: [-1.2, -0.9, 0.5] as [number, number, number], label: "AI" },
        { position: [0, 1.6, -0.3] as [number, number, number], label: "DATA" },
      ]
    : [
        { position: [1.8, 0.9, 0.2] as [number, number, number], label: "API" },
        { position: [-1.6, -1.0, 0.6] as [number, number, number], label: "AI" },
        { position: [0.3, 1.9, -0.4] as [number, number, number], label: "DATA" },
        { position: [-0.8, 1.2, 1.1] as [number, number, number], label: "WEB" },
        { position: [1.0, -1.5, -0.7] as [number, number, number], label: "SYSTEM" },
        { position: [-1.3, 0.4, -1.2] as [number, number, number], label: "CLOUD" },
      ];

  // Showcase has more nodes
  const showcaseNodes = variant === "showcase" && !isMobile
    ? [
        ...nodes,
        { position: [2.0, -0.5, 0.8] as [number, number, number], label: "DB" },
        { position: [-1.8, 1.4, -0.6] as [number, number, number], label: "ML" },
      ]
    : nodes;

  return (
    <group>
      {showcaseNodes.map((node, idx) => (
        <TechnicalNode
          key={idx}
          position={node.position}
          label={node.label}
          size={variant === "hero" ? 0.05 : 0.06}
          emissive={idx === 0}
        />
      ))}
    </group>
  );
}

export function ConnectionLines({ variant = "hero" }: { variant?: "hero" | "showcase" }) {
  const { isMobile, isReducedMotion } = useMotion();

  if (isMobile) return null;

  const connections = [
    { start: [0, 0, 0] as [number, number, number], end: [1.8, 0.9, 0.2] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [-1.6, -1.0, 0.6] as [number, number, number] },
    { start: [0, 0, 0] as [number, number, number], end: [0.3, 1.9, -0.4] as [number, number, number] },
  ];

  if (variant === "showcase") {
    connections.push(
      { start: [1.8, 0.9, 0.2] as [number, number, number], end: [0.3, 1.9, -0.4] as [number, number, number] },
      { start: [-1.6, -1.0, 0.6] as [number, number, number], end: [1.0, -1.5, -0.7] as [number, number, number] }
    );
  }

  return (
    <group>
      {connections.map((conn, idx) => {
        const points = [new THREE.Vector3(...conn.start), new THREE.Vector3(...conn.end)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <primitive
            key={idx}
            object={
              new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                  color: "#2a2a2a",
                  transparent: true,
                  opacity: isReducedMotion ? 0.15 : 0.25,
                })
              )
            }
          />
        );
      })}
    </group>
  );
}
