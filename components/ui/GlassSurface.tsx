import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "strong" | "subtle" | "panel" | "card";
  blur?: "default" | "strong" | "subtle" | "none";
  border?: boolean;
}

const variantClasses = {
  default: "glass",
  strong: "glass-strong",
  subtle: "glass-subtle",
  panel: "glass-panel",
  card: "glass-card",
} as const;

export function GlassSurface({
  className,
  variant = "default",
  border = true,
  children,
  ...props
}: GlassSurfaceProps) {
  return (
    <div
      className={cn(
        variantClasses[variant],
        !border && "border-transparent",
        "rounded-[var(--radius-lg)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({
  className,
  children,
  ...props
}: GlassSurfaceProps) {
  return (
    <GlassSurface variant="card" className={cn("p-6", className)} {...props}>
      {children}
    </GlassSurface>
  );
}

export function GlassPanel({
  className,
  children,
  ...props
}: GlassSurfaceProps) {
  return (
    <GlassSurface variant="panel" className={cn("p-8", className)} {...props}>
      {children}
    </GlassSurface>
  );
}

export function GlassButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: GlassSurfaceProps["variant"] }) {
  return (
    <button className={cn("glass-button rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium", className)} {...props}>
      {children}
    </button>
  );
}
