import * as React from "react";
import { cn } from "@/lib/utils";

export interface AmbientGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  position?: string;
}

export function AmbientGlow({
  className,
  variant = "primary",
  size = "md",
  position,
  style,
  ...props
}: AmbientGlowProps) {
  const sizeClasses = {
    sm: "w-[300px] h-[300px]",
    md: "w-[500px] h-[500px]",
    lg: "w-[700px] h-[700px]",
    xl: "w-[900px] h-[900px]",
  };

  const variantClasses = {
    primary: "ambient-glow--primary",
    secondary: "ambient-glow--secondary",
    accent: "ambient-glow--accent",
  };

  return (
    <div
      className={cn(
        "ambient-glow",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={{
        ...style,
        ...(position ? {} : {}),
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

export function GridBackground({
  className,
  variant = "subtle",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "subtle" | "dot" }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        variant === "subtle" ? "grid-subtle opacity-[0.03]" : "grid-dot opacity-[0.04]",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export function NoiseTexture({
  className,
  opacity = 0.015,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { opacity?: number }) {
  return (
    <div
      className={cn("noise absolute inset-0 pointer-events-none", className)}
      style={{ opacity } as React.CSSProperties}
      aria-hidden="true"
      {...props}
    />
  );
}

export function GradientMesh({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "strong" }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        variant === "default" ? "gradient-mesh" : "gradient-mesh-strong",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

export function BackgroundSystem({
  children,
  className,
  showGrid = true,
  showGlow = true,
  showNoise = true,
  showMesh = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  showGrid?: boolean;
  showGlow?: boolean;
  showNoise?: boolean;
  showMesh?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {showMesh && <GradientMesh />}
      {showGrid && <GridBackground />}
      {showGlow && (
        <>
          <AmbientGlow variant="primary" size="lg" className="top-[-10%] left-[10%]" />
          <AmbientGlow variant="secondary" size="md" className="bottom-[20%] right-[10%]" />
        </>
      )}
      {showNoise && <NoiseTexture />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
