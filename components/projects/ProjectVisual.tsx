import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export type ProjectVisualSize = "card" | "featured" | "detail";

/**
 * ProjectVisual - reusable project identity treatment
 *
 * - Renders the real image when `project.image` is set (future screenshots)
 * - Falls back to a premium monogram identity (clearly NOT a screenshot)
 * - Consistent aspect ratios, responsive, decorative content aria-hidden
 */

const sizeClasses: Record<ProjectVisualSize, string> = {
  card: "aspect-[16/10]",
  featured: "aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px]",
  detail: "aspect-[16/9] max-h-[420px]",
};

const monogramTileClasses: Record<ProjectVisualSize, string> = {
  card: "h-12 w-12",
  featured: "h-16 w-16",
  detail: "h-20 w-20",
};

const monogramTextClasses: Record<ProjectVisualSize, string> = {
  card: "text-[14px]",
  featured: "text-[20px]",
  detail: "text-[28px]",
};

/** Two-letter monogram for the project identity (SO / AQ / RE) */
export function projectMonogram(name: string): string {
  return name.slice(0, 2).toUpperCase();
}

export interface ProjectVisualProps {
  project: Project;
  /** Small identity caption under the monogram */
  label?: string;
  size?: ProjectVisualSize;
  className?: string;
}

export function ProjectVisual({
  project,
  label,
  size = "card",
  className,
}: ProjectVisualProps) {
  if (project.image) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[hsl(var(--surface-elevated))]",
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={project.image}
          alt={`${project.name} interface preview`}
          fill
          priority={size === "detail"}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  // Monogram fallback - project identity treatment, not a screenshot
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden bg-[hsl(var(--surface-elevated))]",
        sizeClasses[size],
        className
      )}
    >
      {/* Existing ambient utilities - grid + gradient mesh, restrained */}
      <div className="absolute inset-0 grid-dot opacity-[0.04]" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      {/* Subtle identity lighting */}
      <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.05),transparent_70%)] blur-2xl" />
      <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.03),transparent_70%)] blur-2xl" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <div
          className={cn(
            "flex items-center justify-center rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))] shadow-[var(--shadow-sm)]",
            monogramTileClasses[size]
          )}
        >
          <span
            className={cn(
              "font-bold tracking-tight text-[hsl(var(--foreground-secondary))]",
              monogramTextClasses[size]
            )}
          >
            {projectMonogram(project.name)}
          </span>
        </div>
        {label && (
          <span className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
