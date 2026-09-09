/**
 * 3D Model placeholder
 * Structure for future GLTF/GLB models loading
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ModelPlaceholderProps {
  className?: string;
  modelPath?: string;
  /** Model type for future loader */
  type?: "gltf" | "glb" | "fbx" | "primitive";
}

export function ModelPlaceholder({
  className,
  modelPath = "/models/placeholder.glb",
  type = "glb",
}: ModelPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-3",
        "rounded-[var(--radius-lg)] border border-dashed border-[hsl(var(--border))]",
        "bg-[hsl(var(--surface))]/20 p-8",
        className
      )}
    >
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-[hsl(var(--foreground))]">
          3D Model • {type.toUpperCase()}
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
          {modelPath}
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground-secondary))] max-w-[280px]">
          Place GLTF/GLB files in <code className="px-1 py-0.5 bg-[hsl(var(--muted))] rounded">/public/models/</code>
        </p>
      </div>

      <div className="mt-2 flex gap-2">
        <span className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
          Lazy Loaded
        </span>
        <span className="text-[10px] px-2 py-1 rounded-full bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))]">
          Suspense Ready
        </span>
      </div>
    </div>
  );
}

/**
 * Future model loader hook placeholder
 * Will use useGLTF from @react-three/drei
 */
export function useModelLoader(_path: string) {
  // Placeholder - will be implemented with actual loader
  return {
    model: null,
    isLoading: false,
    error: null,
  };
}
