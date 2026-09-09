import * as React from "react";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "glass" | "outline";
  size?: "sm" | "default" | "lg";
}

const variantClasses = {
  default: "bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-hover))] border border-[hsl(var(--border))]",
  ghost: "text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface))]",
  glass: "glass-button text-[hsl(var(--foreground))]",
  outline: "border border-[hsl(var(--border))] bg-transparent hover:bg-[hsl(var(--surface))] text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))]",
} as const;

const sizeClasses = {
  sm: "h-8 w-8",
  default: "h-10 w-10",
  lg: "h-12 w-12",
} as const;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
