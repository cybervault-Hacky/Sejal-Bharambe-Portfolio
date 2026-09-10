"use client";

import * as React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export interface ModelLoaderProps {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Reusable GLB/GLTF loader abstraction
 * Supports future external models without rewriting app
 * No fake files - only loads if real asset exists
 */
export function ModelLoader({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  onLoad,
}: ModelLoaderProps) {
  const gltf = useGLTF(path, true) as unknown as { scene: THREE.Group };

  React.useEffect(() => {
    if (gltf?.scene) {
      onLoad?.();
    }
  }, [gltf, onLoad]);

  if (!gltf?.scene) {
    return null;
  }

  return (
    <primitive
      object={gltf.scene.clone()}
      position={position}
      rotation={rotation}
      scale={typeof scale === "number" ? [scale, scale, scale] : scale}
    />
  );
}

// Preload helper for future use
export function preloadModel(path: string) {
  useGLTF.preload(path);
}

// Hook for checking if model exists
export function useModelExists(path: string): boolean {
  const [exists, setExists] = React.useState(false);

  React.useEffect(() => {
    fetch(path, { method: "HEAD" })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [path]);

  return exists;
}

// Fallback for when model not available - uses procedural CoreObject
export interface ModelWithFallbackProps extends Omit<ModelLoaderProps, "path"> {
  modelPath: string;
  fallback: React.ReactNode;
}

export function ModelWithFallback({
  modelPath,
  fallback,
  ...props
}: ModelWithFallbackProps) {
  const exists = useModelExists(modelPath);

  if (!exists) {
    return <>{fallback}</>;
  }

  return (
    <React.Suspense fallback={fallback}>
      <ModelLoader path={modelPath} {...props} />
    </React.Suspense>
  );
}
