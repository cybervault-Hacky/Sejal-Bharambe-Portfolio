/**
 * 3D Scene placeholder
 * Foundation for future Three.js / React Three Fiber scenes
 * Phase 1: Structure only, no heavy 3D logic
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CanvasWrapper } from "./CanvasWrapper";

export interface SceneProps {
  className?: string;
  /** Scene variant for different sections */
  variant?: "hero" | "background" | "interactive";
  /** Enable controls - future */
  enableControls?: boolean;
}

export function Scene({
  className,
  variant = "background",
  enableControls: _enableControls = false,
}: SceneProps) {
  return (
    <CanvasWrapper
      className={cn(
        variant === "hero" && "min-h-[500px] md:min-h-[600px]",
        variant === "background" && "absolute inset-0 -z-10",
        variant === "interactive" && "min-h-[400px]",
        className
      )}
      fallback={<SceneFallback variant={variant} />}
    >
      {/* 
        Future Phase 2 implementation:
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
          </Suspense>
          {enableControls && <OrbitControls enableZoom={false} />}
        </Canvas>
      */}
      <SceneFallback variant={variant} />
    </CanvasWrapper>
  );
}

function SceneFallback({ variant }: { variant: SceneProps["variant"] }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] p-4">
        <div className="h-8 w-8 rounded-full bg-[hsl(var(--muted))] animate-pulse" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-[hsl(var(--foreground))]">
          3D Scene • {variant}
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-[250px]">
          Three.js • React Three Fiber • Drei • GLTF ready. 
          Architecture isolated for performance.
        </p>
      </div>
      <div className="flex gap-2 text-[10px] text-[hsl(var(--muted-foreground-secondary))]">
        <span className="px-2 py-1 rounded bg-[hsl(var(--muted))]">Three.js</span>
        <span className="px-2 py-1 rounded bg-[hsl(var(--muted))]">R3F</span>
        <span className="px-2 py-1 rounded bg-[hsl(var(--muted))]">Drei</span>
      </div>
    </div>
  );
}

/**
 * Ambient lighting component placeholder
 * Will be implemented with actual Three.js lights
 */
export function AmbientLighting() {
  return null;
}

/**
 * Camera setup placeholder
 */
export function CameraSetup() {
  return null;
}
