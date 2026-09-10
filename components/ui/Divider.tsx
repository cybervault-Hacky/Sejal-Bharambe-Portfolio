import * as React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "subtle" | "strong";
}

const variantClasses = {
  default: "bg-[hsl(var(--border))]",
  subtle: "bg-[hsl(var(--border-subtle))]",
  strong: "bg-[hsl(var(--border-strong))]",
} as const;

export function Divider({
  className,
  orientation = "horizontal",
  variant = "default",
  ...props
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        variantClasses[variant],
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
}

export function DividerWithLabel({
  children,
  className,
  ...props
}: DividerProps & { children?: React.ReactNode }) {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      <Divider className="flex-1" />
      {children && (
        <span className="text-[var(--text-2xs)] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
          {children}
        </span>
      )}
      <Divider className="flex-1" />
    </div>
  );
}
