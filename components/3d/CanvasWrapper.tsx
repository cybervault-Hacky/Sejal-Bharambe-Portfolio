/**
 * 3D Canvas Wrapper
 * Isolated client component to prevent entire app becoming client-side
 * Prepared for @react-three/fiber integration in Phase 2+
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CanvasWrapperProps {
  children?: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  /** Enable lazy loading for performance */
  lazy?: boolean;
}

/**
 * Placeholder for future R3F Canvas
 * Currently renders fallback - will be replaced with actual Canvas in Phase 2
 * 
 * Architecture principle: Keep 3D isolated so static content remains server-renderable
 */
export function CanvasWrapper({
  children,
  className,
  fallback,
  lazy = true,
}: CanvasWrapperProps) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(!lazy);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Intersection Observer for lazy loading - performance optimization
  React.useEffect(() => {
    if (!lazy || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isVisible]);

  if (!isMounted || !isVisible) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full min-h-[300px] flex items-center justify-center",
          "bg-[hsl(var(--surface))]/30 border border-[hsl(var(--border))]/30 rounded-[var(--radius-lg)]",
          className
        )}
      >
        {fallback ?? (
          <div className="text-center p-8">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">3D Canvas</p>
            <p className="text-xs text-[hsl(var(--muted-foreground-secondary))] mt-1">
              Ready for Three.js • R3F • Drei
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full", className)}
    >
      {children ?? fallback}
    </div>
  );
}

/**
 * Dynamic import helper for 3D components
 * Usage in future:
 * const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
 */
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
