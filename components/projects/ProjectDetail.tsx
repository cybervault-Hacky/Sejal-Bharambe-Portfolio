"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProjectVisual } from "./ProjectVisual";
import { projectCategoryLabels } from "@/data/projects";
import type { Project } from "@/types/project";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export interface ProjectDetailProps {
  project: Project;
  prev: Project | null;
  next: Project | null;
}

/**
 * ProjectDetail - concise, factual case-study presentation (1-2 screens)
 * h1 = project name; h2 = major content groups
 * External links render only when real URLs exist
 */
export function ProjectDetail({ project, prev, next }: ProjectDetailProps) {
  const { isReducedMotion } = useMotion();
  const label = project.label ?? projectCategoryLabels[project.category];

  const neighborClasses =
    "group flex items-center gap-4 rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 p-5 backdrop-blur-sm transition-all duration-200 hover:border-[hsl(var(--border-strong))] hover:bg-[hsl(var(--surface))]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]";

  return (
    <div className="w-full overflow-x-hidden">
      <Container className="py-10 md:py-16">
        {/* Back navigation */}
        <Reveal>
          <nav aria-label="Breadcrumb">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-sm text-[13px] font-medium text-[hsl(var(--foreground-secondary))] transition-colors duration-200 hover:text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All Projects
            </Link>
          </nav>
        </Reveal>

        {/* Header */}
        <div className="mt-8 max-w-3xl md:mt-12">
          <Reveal delay={0.05}>
            <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
              {label}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-3 text-[36px] font-bold leading-[1.05] tracking-[-0.02em] text-[hsl(var(--foreground))] md:text-[48px]">
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-[640px] text-pretty text-[16px] leading-relaxed text-[hsl(var(--foreground-secondary))] md:text-[17px]">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="technical" size="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Project visual - premium identity treatment */}
        <Reveal delay={0.25} className="mt-8 md:mt-10">
          <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/20 backdrop-blur-sm">
            <ProjectVisual
              project={project}
              label={label}
              size="detail"
              className="max-h-none"
            />
          </div>
        </Reveal>

        {/* Capabilities + Engineering focus */}
        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <Card variant="glass" className="h-full p-6 md:p-8">
              <h2 className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                Capabilities
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.capabilities.map((cap) => (
                  <li key={cap}>
                    <Badge variant="secondary" size="default">
                      <span
                        className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]"
                        aria-hidden="true"
                      />
                      {cap}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card variant="default" className="h-full p-6 md:p-8">
              <h2 className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                Engineering focus
              </h2>
              <ul className="mt-4 space-y-3">
                {project.engineeringFocus.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]"
                  >
                    <span
                      className="mt-[8px] h-1 w-1 flex-shrink-0 rounded-full bg-[hsl(var(--foreground-tertiary))]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>

        {/* Real links only - never render fake URLs */}
        {(project.githubUrl || project.liveUrl) && (
          <Reveal delay={0.2} className="mt-6 flex flex-wrap gap-3">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isReducedMotion ? {} : { y: -1 }}
                transition={{ duration: 0.2, ease: motionTokens.ease.out }}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] px-6 text-[14px] font-medium text-[hsl(var(--foreground))] transition-colors duration-200 hover:border-[hsl(var(--border-strong))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
              >
                GitHub
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isReducedMotion ? {} : { y: -1 }}
                transition={{ duration: 0.2, ease: motionTokens.ease.out }}
                className="inline-flex h-11 items-center justify-center rounded-full bg-[hsl(var(--foreground))] px-6 text-[14px] font-medium text-[hsl(var(--background))] transition-colors duration-200 hover:bg-[hsl(var(--foreground))/90] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
              >
                Live Demo
              </motion.a>
            )}
          </Reveal>
        )}

        {/* Previous / next project navigation */}
        <Reveal delay={0.15} className="mt-10 md:mt-14">
          <nav aria-label="Project navigation">
            <div className="grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link href={`/projects/${prev.id}`} className={neighborClasses}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0 text-[hsl(var(--foreground-tertiary))] transition-colors duration-200 group-hover:text-[hsl(var(--foreground))]"
                    aria-hidden="true"
                  >
                    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                      Previous
                    </span>
                    <span className="mt-0.5 block truncate text-[15px] font-semibold text-[hsl(var(--foreground))]">
                      {prev.name}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" aria-hidden="true" />
              )}
              {next && (
                <Link
                  href={`/projects/${next.id}`}
                  className={`${neighborClasses} justify-end text-right`}
                >
                  <span className="min-w-0 text-right">
                    <span className="block text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                      Next
                    </span>
                    <span className="mt-0.5 block truncate text-[15px] font-semibold text-[hsl(var(--foreground))]">
                      {next.name}
                    </span>
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="flex-shrink-0 text-[hsl(var(--foreground-tertiary))] transition-colors duration-200 group-hover:text-[hsl(var(--foreground))]"
                    aria-hidden="true"
                  >
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>
          </nav>
        </Reveal>
      </Container>
    </div>
  );
}
