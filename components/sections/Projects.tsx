"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { featuredProjects, projectCategoryLabels } from "@/data/projects";
import type { Project } from "@/types/project";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

/** Initials for the monogram — no fake screenshots exist yet */
function projectMonogram(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Projects() {
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <Section id="projects" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Projects"
        title="Featured projects — e-learning, e-commerce and AI."
        description="Three products built end to end: a 3-role e-learning platform, a customized blouse ordering experience, and an AI resume builder with ATS optimization."
        align="left"
      />

      <Stagger staggerDelay={0.1} delay={0.2} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project: Project) => (
          <motion.div
            key={project.id}
            whileHover={
              isReducedMotion || isMobile
                ? {}
                : {
                    y: -4,
                    scale: 1.01,
                    transition: { duration: 0.25, ease: motionTokens.ease.out },
                  }
            }
            whileTap={isReducedMotion ? {} : { scale: 0.99 }}
            className="h-full"
          >
            <Card variant="interactive" className="group flex flex-col p-0 overflow-hidden h-full">
              {/* Header visual - monogram on premium background (real screenshots in later phases) */}
              <div className="relative aspect-[16/10] w-full bg-[hsl(var(--surface-elevated))] border-b border-[hsl(var(--border))] overflow-hidden">
                <div className="absolute inset-0 grid-dot opacity-[0.04]" />
                <div className="absolute inset-0 gradient-mesh opacity-30" />
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
                  whileHover={isReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.4, ease: motionTokens.ease.out }}
                  aria-hidden="true"
                >
                  <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-sm)]">
                    <span className="text-[14px] font-bold text-[hsl(var(--foreground-tertiary))]">
                      {projectMonogram(project.name)}
                    </span>
                  </div>
                  <span className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
                    {projectCategoryLabels[project.category]}
                  </span>
                </motion.div>
                <div className="absolute top-3 left-3">
                  <Badge variant="glass" size="sm">
                    {projectCategoryLabels[project.category]}
                  </Badge>
                </div>
                {project.category === "ai" && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="default" size="sm">
                      AI
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <CardHeader className="p-0">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-[16px]">{project.name}</CardTitle>
                    {project.year && (
                      <span className="text-[11px] text-[hsl(var(--foreground-tertiary))] font-mono">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-0 pt-4 flex-1">
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 3).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]"
                      >
                        <span className="mt-[7px] h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="p-0 pt-5 mt-auto flex-col items-stretch gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="technical" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {/* Links only render when real URLs exist - no fake links */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex gap-2 w-full">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 flex-1 items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] px-3 text-[13px] font-medium text-[hsl(var(--foreground))] transition-colors hover:border-[hsl(var(--border-strong))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))]"
                        >
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-8 flex-1 items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-[hsl(var(--border))] bg-transparent px-3 text-[13px] font-medium text-[hsl(var(--foreground-secondary))] transition-colors hover:border-[hsl(var(--border-strong))] hover:text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))]"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

export function FeaturedProjects() {
  return <Projects />;
}
