"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LoadingFallbackProps {
  className?: string;
  message?: string;
  variant?: "hero" | "showcase" | "minimal";
}

export function LoadingFallback({
  className,
  message = "Initializing",
  variant = "hero",
}: LoadingFallbackProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 backdrop-blur-xl",
        variant === "hero" && "aspect-[4/3] lg:aspect-[4/5] min-h-[400px]",
        variant === "showcase" && "min-h-[400px] lg:min-h-[480px]",
        variant === "minimal" && "min-h-[300px]",
        className
      )}
    >
      <div className="absolute inset-0 grid-dot opacity-[0.03]" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="relative flex flex-col items-center gap-5 p-8 text-center">
        <div className="relative">
          <div className="h-20 w-20 rounded-[var(--radius-xl)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-lg)]">
            <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] flex items-center justify-center text-[hsl(var(--background))] font-bold text-[14px] animate-pulse">
              SB
            </div>
          </div>
          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-[13px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
            {message}
          </p>
          <p className="text-[14px] font-medium text-[hsl(var(--foreground))]">
            3D Experience
          </p>
          <div className="flex items-center justify-center gap-1.5 pt-2">
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] animate-bounce" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-6 text-[10px] font-mono text-[hsl(var(--foreground-tertiary))]">
        <span>WEBGL • R3F • DREI</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] animate-pulse" />
          LOADING
        </span>
      </div>
    </div>
  );
}

export function HeroLoadingFallback() {
  return <LoadingFallback variant="hero" message="Initializing" />;
}

export function ShowcaseLoadingFallback() {
  return <LoadingFallback variant="showcase" message="Loading" />;
}
