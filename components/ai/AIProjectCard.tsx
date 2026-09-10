"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types/project";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export interface AIProjectCardProps {
  project: Project;
}

/**
 * AIProjectCard - connects the AI Engineering section to the
 * AI project (Resumint) using only established project data.
 * Navigates to the existing /projects/[slug] route.
 */
export function AIProjectCard({ project }: AIProjectCardProps) {
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <motion.div
      whileHover={
        isReducedMotion || isMobile
          ? {}
          : {
              y: -2,
              transition: { duration: 0.25, ease: motionTokens.ease.out },
            }
      }
      className="h-full"
    >
      <Card variant="interactive" className="group flex h-full flex-col overflow-hidden p-0">
        {/* Identity visual with AI badge */}
        <div className="relative overflow-hidden border-b border-[hsl(var(--border))]">
          <ProjectVisual project={project} label={project.label} size="card" />
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="glass" size="sm">
              AI Project
            </Badge>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="accent" size="sm">
              AI
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-[18px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
            {project.name}
          </h3>
          <p className="mt-1 text-[13px] text-[hsl(var(--foreground-tertiary))]">
            {project.label}
          </p>

          <p className="mt-3 text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="technical" size="sm">
                {tech}
              </Badge>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <Link
              href={`/projects/${project.id}`}
              className="inline-flex items-center gap-2 rounded-sm text-[13px] font-medium text-[hsl(var(--foreground))] transition-colors duration-200 hover:text-[hsl(var(--foreground-secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
            >
              Explore project
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
