"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ModelPlaceholderProps {
  className?: string;
  modelPath?: string;
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

export function useModelLoader(_path: string) {
  return {
    model: null,
    isLoading: false,
    error: null,
  };
}

// Premium static fallback matching Phase 2 design
export function PremiumStaticFallback({ variant = "hero" }: { variant?: "hero" | "showcase" }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center gap-6 p-8 text-center overflow-hidden",
        "rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 backdrop-blur-xl",
        variant === "hero" && "aspect-[4/3] lg:aspect-[4/5] min-h-[400px]",
        variant === "showcase" && "min-h-[400px] lg:min-h-[480px]"
      )}
    >
      <div className="absolute inset-0 grid-dot opacity-[0.03]" />
      <div className="absolute inset-0 gradient-mesh opacity-20" />

      <div className="relative flex flex-col items-center gap-4">
        <div className="h-20 w-20 rounded-[var(--radius-xl)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-lg)]">
          <span className="text-[18px] font-bold text-[hsl(var(--foreground))]">SB</span>
        </div>
        <div className="space-y-1">
          <p className="text-[14px] font-medium text-[hsl(var(--foreground))]">Interactive 3D Experience</p>
          <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
            AI Engineering Core • Procedural
          </p>
        </div>
      </div>
    </div>
  );
}
