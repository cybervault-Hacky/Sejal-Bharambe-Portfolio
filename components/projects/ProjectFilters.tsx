"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/components/motion/MotionProvider";

export interface ProjectFilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface ProjectFiltersProps {
  options: ProjectFilterOption[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

/**
 * ProjectFilters - lightweight, accessible category filter
 * Real buttons with aria-pressed state, animated active pill
 * (Phase 3 layoutId pattern), reduced-motion safe.
 */
export function ProjectFilters({
  options,
  active,
  onChange,
  className,
}: ProjectFiltersProps) {
  const { isReducedMotion } = useMotion();

  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const isActive = active === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-[13px] font-medium",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
              isActive
                ? "text-[hsl(var(--foreground))]"
                : "text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))]"
            )}
          >
            {isActive && !isReducedMotion && (
              <motion.span
                layoutId="project-filter-active"
                className="absolute inset-0 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {isActive && isReducedMotion && (
              <span className="absolute inset-0 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]" />
            )}
            <span className="relative z-10">
              {option.label}
              {typeof option.count === "number" && (
                <span className="ml-1.5 text-[11px] font-mono text-[hsl(var(--foreground-tertiary))]">
                  {option.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
