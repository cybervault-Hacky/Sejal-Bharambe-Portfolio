"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMotion } from "@/components/motion/MotionProvider";

export interface CameraRigProps {
  position?: [number, number, number];
  fov?: number;
  enablePointer?: boolean;
  enableScroll?: boolean;
  scrollProgress?: number;
}

export function CameraRig({
  position = [0, 0, 5],
  fov = 45,
  enablePointer = true,
  enableScroll = false,
  scrollProgress = 0,
}: CameraRigProps) {
  const { camera } = useThree();
  const { isReducedMotion, isMobile } = useMotion();
  const pointerRef = React.useRef({ x: 0, y: 0 });
  const targetPosition = React.useRef(new THREE.Vector3(...position));

  // Responsive camera adjustment
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const updateCamera = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: slightly further, higher FOV
        targetPosition.current.set(0, 0, 6);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.fov = 50;
          camera.updateProjectionMatrix();
        }
      } else if (width < 1024) {
        targetPosition.current.set(0, 0, 5.5);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.fov = 47;
          camera.updateProjectionMatrix();
        }
      } else {
        targetPosition.current.set(...position);
        if (camera instanceof THREE.PerspectiveCamera) {
          camera.fov = fov;
          camera.updateProjectionMatrix();
        }
      }
    };

    updateCamera();
    window.addEventListener("resize", updateCamera);
    return () => window.removeEventListener("resize", updateCamera);
  }, [camera, fov, position]);

  // Pointer tracking
  React.useEffect(() => {
    if (isReducedMotion || isMobile || !enablePointer) return;
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize to -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Small movement, restrained
      pointerRef.current.x = x * 0.15;
      pointerRef.current.y = y * 0.1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isReducedMotion, isMobile, enablePointer]);

  useFrame((_, delta) => {
    if (isReducedMotion) return;

    // Smooth camera movement
    const lerpFactor = Math.min(delta * 2, 1);

    // Base position with responsive
    const baseX = targetPosition.current.x;
    const baseY = targetPosition.current.y;
    const baseZ = targetPosition.current.z;

    // Pointer offset - very subtle
    let offsetX = 0;
    let offsetY = 0;

    if (enablePointer && !isMobile) {
      offsetX = pointerRef.current.x;
      offsetY = pointerRef.current.y;
    }

    // Scroll offset - subtle
    let scrollOffsetY = 0;
    let scrollOffsetZ = 0;
    if (enableScroll) {
      scrollOffsetY = scrollProgress * 0.3;
      scrollOffsetZ = scrollProgress * 0.2;
    }

    const targetX = baseX + offsetX;
    const targetY = baseY + offsetY + scrollOffsetY;
    const targetZ = baseZ + scrollOffsetZ;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpFactor);

    // Look at center
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function StaticCamera({
  position = [0, 0, 5],
  fov = 45,
}: {
  position?: [number, number, number];
  fov?: number;
}) {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.set(...position);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
    camera.lookAt(0, 0, 0);
  }, [camera, position, fov]);

  return null;
}
