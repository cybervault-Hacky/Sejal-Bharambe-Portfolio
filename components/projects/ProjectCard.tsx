"use client";

import * as React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "./ProjectVisual";
import { projectCategoryLabels } from "@/data/projects";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  variant?: "default" | "featured";
  className?: string;
}

/**
 * ProjectCard - premium, link-first project presentation
 * The whole card is a real <a> to /projects/[slug] (keyboard accessible).
 * No fake external links - real URLs only render when they exist.
 */
export function ProjectCard({
  project,
  variant = "default",
  className,
}: ProjectCardProps) {
  const label = project.label ?? projectCategoryLabels[project.category];
  const isAi = project.category === "ai" || project.category === "ai-agent";
  const capabilityCount = variant === "featured" ? 5 : 3;

  return (
    <a
      href={`/projects/${project.id}`}
      aria-label={`View ${project.name} — ${label}`}
      className={cn(
        "group block h-full rounded-[var(--radius-lg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
        className
      )}
    >
      <Card
        variant="interactive"
        className={cn(
          "group h-full flex flex-col overflow-hidden p-0",
          variant === "featured" && "lg:flex-row"
        )}
      >
        {/* Visual + identity overlays */}
        <div
          className={cn(
            "relative overflow-hidden border-b border-[hsl(var(--border))]",
            variant === "featured" && "lg:w-[46%] lg:border-b-0 lg:border-r"
          )}
        >
          <ProjectVisual
            project={project}
            label={label}
            size={variant === "featured" ? "featured" : "card"}
          />
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="glass" size="sm">
              {label}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 z-10 flex gap-1.5">
            {variant === "featured" && (
              <Badge variant="default" size="sm">
                Featured
              </Badge>
            )}
            {isAi && (
              <Badge variant="accent" size="sm">
                AI
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <CardTitle
              className={variant === "featured" ? "text-[22px]" : "text-[16px]"}
            >
              {project.name}
            </CardTitle>
            {project.year && (
              <span className="text-[11px] text-[hsl(var(--foreground-tertiary))] font-mono">
                {project.year}
              </span>
            )}
          </div>
          <CardDescription className="mt-2">
            {project.description}
          </CardDescription>

          {/* Technology */}
          <div className="mt-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))] mb-2">
              Technology
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="technical" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="mt-4">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))] mb-2">
              Capabilities
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.capabilities.slice(0, capabilityCount).map((cap) => (
                <Badge key={cap} variant="secondary" size="sm">
                  <span
                    className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]"
                    aria-hidden="true"
                  />
                  {cap}
                </Badge>
              ))}
            </div>
          </div>

          {/* Footer - internal navigation affordance (always real) */}
          <div className="mt-auto flex items-center gap-2 pt-5">
            <span className="text-[13px] font-medium text-[hsl(var(--foreground))]">
              View project
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="text-[hsl(var(--foreground-tertiary))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--foreground))]"
              aria-hidden="true"
            >
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </Card>
    </a>
  );
}
