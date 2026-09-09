import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "accent" | "glass" | "success" | "warning" | "technical";
  size?: "sm" | "default" | "lg";
}

const variantClasses = {
  default: "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] border border-transparent",
  secondary: "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground-secondary))] border border-[hsl(var(--border))]",
  outline: "border border-[hsl(var(--border))] text-[hsl(var(--foreground-secondary))] bg-transparent hover:border-[hsl(var(--border-strong))]",
  accent: "bg-[hsl(var(--accent-secondary))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))]",
  glass: "glass-subtle text-[hsl(var(--foreground-secondary))] border border-[hsl(var(--border))]/50",
  success: "bg-[hsl(var(--success-muted))] text-[hsl(var(--success))] border border-[hsl(var(--success))/20]",
  warning: "bg-[hsl(var(--warning-muted))] text-[hsl(var(--warning))] border border-[hsl(var(--warning))/20]",
  technical: "bg-[hsl(var(--surface))] text-[hsl(var(--foreground-tertiary))] border border-[hsl(var(--border-subtle))] font-mono tracking-wide text-[11px]",
} as const;

const sizeClasses = {
  sm: "px-2 py-0.5 text-[11px] rounded-[var(--radius-full)]",
  default: "px-2.5 py-1 text-xs rounded-[var(--radius-full)]",
  lg: "px-3 py-1.5 text-[13px] rounded-[var(--radius-full)]",
} as const;

export function Badge({
  className,
  variant = "secondary",
  size = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 font-medium transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}

export function TechBadge({ children, className, ...props }: BadgeProps) {
  return (
    <Badge variant="technical" size="sm" className={cn("uppercase", className)} {...props}>
      {children}
    </Badge>
  );
}

export function StatusBadge({
  status,
  children,
  ...props
}: BadgeProps & { status?: "active" | "inactive" | "new" | "beta" }) {
  const statusMap = {
    active: "success" as const,
    inactive: "secondary" as const,
    new: "default" as const,
    beta: "warning" as const,
  };

  return (
    <Badge variant={status ? statusMap[status] : "secondary"} size="sm" {...props}>
      {status && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </Badge>
  );
}
