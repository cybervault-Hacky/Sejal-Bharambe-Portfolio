import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "glass" | "link" | "default";
  size?: "sm" | "default" | "lg" | "icon";
  isLoading?: boolean;
}

const variantClasses = {
  // Primary - premium white on dark, restrained
  primary:
    "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-1px] active:translate-y-[0px] active:shadow-[var(--shadow-xs)]",
  default:
    "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-1px] active:translate-y-[0px]",
  // Secondary - surface with border
  secondary:
    "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-hover))] hover:border-[hsl(var(--border-strong))] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)]",
  // Outline - transparent with border
  outline:
    "border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground-secondary))] hover:bg-[hsl(var(--surface))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--border-strong))]",
  // Ghost - minimal
  ghost:
    "bg-transparent text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface))]",
  // Glass - premium glassmorphism
  glass:
    "glass-button text-[hsl(var(--foreground))] hover:text-[hsl(var(--foreground))] shadow-[var(--shadow-glass)]",
  // Link
  link: "text-[hsl(var(--foreground-secondary))] underline-offset-4 hover:underline hover:text-[hsl(var(--foreground))] bg-transparent",
} as const;

const sizeClasses = {
  sm: "h-8 px-3 text-[13px] rounded-[var(--radius-sm)]",
  default: "h-10 px-5 py-2 text-[14px] rounded-[var(--radius-md)]",
  lg: "h-11 px-7 text-[14px] rounded-[var(--radius-md)]",
  icon: "h-10 w-10 rounded-[var(--radius-md)]",
} as const;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium tracking-[-0.01em]",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
          "disabled:pointer-events-none disabled:opacity-50",
          "active:scale-[0.98]",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
