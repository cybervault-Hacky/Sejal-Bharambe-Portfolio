"use client";

import * as React from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { useMotion } from "@/components/motion/MotionProvider";
import { LoadingFallback } from "./LoadingFallback";
import { ErrorBoundary } from "./ErrorBoundary";

export interface CanvasWrapperProps extends Omit<CanvasProps, "children"> {
  children?: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  lazy?: boolean;
  dpr?: number | [number, number];
  variant?: "hero" | "showcase" | "minimal";
  enableWebGLCheck?: boolean;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch {
    return false;
  }
}

function WebGLFallback({ variant: _variant = "hero" }: { variant?: CanvasWrapperProps["variant"] }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 backdrop-blur-xl">
      <div className="absolute inset-0 grid-dot opacity-[0.03]" />
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="relative flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-[var(--radius-xl)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-lg)]">
          <span className="text-[16px] font-bold text-[hsl(var(--foreground))]">SB</span>
        </div>
        <div className="space-y-1">
          <p className="text-[14px] font-medium text-[hsl(var(--foreground))]">Interactive 3D Experience</p>
          <p className="text-[12px] text-[hsl(var(--foreground-tertiary))] max-w-[260px] leading-relaxed">
            WebGL not available. Premium static fallback — portfolio fully usable.
          </p>
        </div>
      </div>
    </div>
  );
}

export function CanvasWrapper({
  children,
  className,
  fallback,
  lazy = true,
  dpr,
  variant = "hero",
  enableWebGLCheck = true,
  gl,
  camera,
  ...canvasProps
}: CanvasWrapperProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(!lazy);
  const [webGLSupported, setWebGLSupported] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { isMobile } = useMotion();

  React.useEffect(() => {
    setIsMounted(true);
    if (enableWebGLCheck) {
      setWebGLSupported(checkWebGLSupport());
    }
  }, [enableWebGLCheck]);

  // Intersection Observer for lazy loading
  React.useEffect(() => {
    if (!lazy || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isVisible]);

  // DPR control: Desktop 1→1.5/2, Mobile 1→1.25
  const calculatedDpr = React.useMemo(() => {
    if (dpr) return dpr;
    if (isMobile) return [1, 1.25] as [number, number];
    return [1, 1.5] as [number, number];
  }, [dpr, isMobile]);

  if (!isMounted || !isVisible) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden",
          "bg-[hsl(var(--surface))]/20 border border-[hsl(var(--border-subtle))] rounded-[var(--radius-2xl)]",
          variant === "hero" && "aspect-[4/3] lg:aspect-[4/5]",
          variant === "showcase" && "min-h-[400px] lg:min-h-[480px]",
          className
        )}
      >
        {fallback ?? <LoadingFallback variant={variant} />}
      </div>
    );
  }

  if (!webGLSupported) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full",
          variant === "hero" && "aspect-[4/3] lg:aspect-[4/5] min-h-[400px]",
          variant === "showcase" && "min-h-[400px] lg:min-h-[480px]",
          className
        )}
      >
        <WebGLFallback variant={variant} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--background-secondary))]/30",
        "shadow-[var(--shadow-elevated)]",
        variant === "hero" && "aspect-[4/3] lg:aspect-[4/5] min-h-[400px]",
        variant === "showcase" && "min-h-[400px] lg:min-h-[480px]",
        className
      )}
    >
      <ErrorBoundary fallback={<WebGLFallback variant={variant} />}>
        <React.Suspense fallback={fallback ?? <LoadingFallback variant={variant} />}>
          <Canvas
            dpr={calculatedDpr}
            camera={{
              position: [0, 0, 5],
              fov: isMobile ? 50 : 45,
              near: 0.1,
              far: 100,
              ...(camera as object),
            }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: "high-performance",
              stencil: false,
              depth: true,
              ...gl,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(new THREE.Color("#0a0a0a"), 0);
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.0;
            }}
            style={{ background: "transparent" }}
            {...canvasProps}
          >
            {children}
          </Canvas>
        </React.Suspense>
      </ErrorBoundary>

      {/* Accessibility label */}
      <span className="sr-only">
        Interactive 3D visualization of a software and AI engineering system. Decorative, not required for understanding portfolio content.
      </span>
    </div>
  );
}

export function withClientOnly<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ClientOnlyComponent(props: P) {
    const [hasMounted, setHasMounted] = React.useState(false);

    React.useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) {
      return null;
    }

    return <Component {...props} />;
  };
}

// Hook for WebGL detection
export function useWebGLSupport(): boolean {
  const [supported, setSupported] = React.useState(true);

  React.useEffect(() => {
    setSupported(checkWebGLSupport());
  }, []);

  return supported;
}
