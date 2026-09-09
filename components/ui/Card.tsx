import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated" | "outlined" | "interactive";
  padding?: "none" | "sm" | "default" | "lg";
}

const variantClasses = {
  default: "bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-[var(--shadow-xs)]",
  glass: "glass-card",
  elevated: "bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] shadow-[var(--shadow-elevated)]",
  outlined: "border border-[hsl(var(--border))] bg-transparent",
  interactive: "bg-[hsl(var(--surface))] border border-[hsl(var(--border))] shadow-[var(--shadow-xs)] hover:bg-[hsl(var(--surface-elevated))] hover:border-[hsl(var(--border-strong))] hover:shadow-[var(--shadow-md)] hover:translate-y-[-2px] transition-all duration-250 ease-out cursor-pointer",
} as const;

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  default: "p-6",
  lg: "p-8",
} as const;

export function Card({
  className,
  variant = "default",
  padding = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)]",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props} />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[17px] font-semibold leading-tight tracking-tight text-[hsl(var(--foreground))]",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-4", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-3 pt-5", className)} {...props} />
  );
}

export function CardBadge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[hsl(var(--foreground-secondary))]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
