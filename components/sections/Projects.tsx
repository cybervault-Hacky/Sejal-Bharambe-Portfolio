"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function Projects() {
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <Section id="projects" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          label="Projects"
          title="Selected work — production applications and systems."
          description="Scalable showcase ready. Projects added via data/projects.ts. Supports categories, featured, technologies, highlights, GitHub and live URLs."
          className="mb-0"
        />
        <Reveal delay={0.2} className="hidden md:block">
          <Button variant="ghost" size="sm" className="w-fit">
            View all projects
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </Reveal>
      </div>

      <Stagger staggerDelay={0.1} delay={0.2} className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
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
              {/* Image placeholder */}
              <div className="relative aspect-[16/10] w-full bg-[hsl(var(--surface-elevated))] border-b border-[hsl(var(--border))] overflow-hidden">
                <div className="absolute inset-0 grid-dot opacity-[0.04]" />
                <div className="absolute inset-0 gradient-mesh opacity-30" />
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
                  whileHover={isReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.4, ease: motionTokens.ease.out }}
                >
                  <div className="h-12 w-12 rounded-[var(--radius-lg)] bg-[hsl(var(--surface))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-sm)]">
                    <span className="text-[14px] font-bold text-[hsl(var(--foreground-tertiary))]">{i}</span>
                  </div>
                  <span className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Project Image • TODO</span>
                </motion.div>
                <div className="absolute top-3 left-3">
                  <Badge variant="glass" size="sm">Featured</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" size="sm">Full Stack</Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <CardHeader className="p-0">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-[16px]">Project Name • TODO</CardTitle>
                    <span className="text-[11px] text-[hsl(var(--foreground-tertiary))] font-mono">2024</span>
                  </div>
                  <CardDescription className="mt-2 line-clamp-2">
                    Short description placeholder for project. Will contain real project details from CV/GitHub. Premium card with hover lift and glass effects.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-0 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "TypeScript", "Tailwind", "AI"].map((tech) => (
                      <Badge key={tech} variant="technical" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-0 pt-5 mt-auto">
                  <div className="flex gap-2 w-full">
                    <Button variant="secondary" size="sm" className="flex-1">
                      GitHub
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      Live Demo
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={0.2} className="mt-8 flex justify-center md:hidden">
        <Button variant="secondary" size="default" className="rounded-full">
          View all projects
        </Button>
      </Reveal>
    </Section>
  );
}

export function FeaturedProjects() {
  return <Projects />;
}
