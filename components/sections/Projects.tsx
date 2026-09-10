"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, projectCategoryLabels, projectFilterOrder } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import type { ProjectFilterOption } from "@/components/projects/ProjectFilters";
import type { ProjectCategory } from "@/types/project";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

/** Filters derived from the real project categories present in the data */
const buildFilterOptions = (): ProjectFilterOption[] => {
  const options: ProjectFilterOption[] = [
    { id: "all", label: "All", count: projects.length },
  ];
  for (const category of projectFilterOrder) {
    if (!projects.some((p) => p.category === category)) continue;
    options.push({
      id: category,
      label: projectCategoryLabels[category],
      count: projects.filter((p) => p.category === category).length,
    });
  }
  return options;
};

export function Projects() {
  const { isReducedMotion, isMobile } = useMotion();
  const [filter, setFilter] = React.useState<string>("all");

  const filterOptions = React.useMemo(buildFilterOptions, []);
  const featuredProject = projects.find((p) => p.featured) ?? null;
  const showFeatured = filter === "all" && featuredProject !== null;

  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === (filter as ProjectCategory));

  const gridProjects = visibleProjects.filter((p) => !showFeatured || p !== featuredProject);

  return (
    <Section id="projects" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Projects"
        title="Featured projects — e-learning, e-commerce and AI."
        description="Three products built end to end: a 3-role e-learning platform, a customized blouse ordering experience, and an AI resume builder with ATS optimization."
        align="left"
      />

      <div className="mt-10">
        <ProjectFilters
          options={filterOptions}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {/* Featured project treatment */}
        {showFeatured && featuredProject && (
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: isReducedMotion ? 0.01 : 0.6,
              ease: motionTokens.ease.out,
            }}
          >
            <ProjectCard project={featuredProject} variant="featured" />
          </motion.div>
        )}

        {/* Project grid */}
        <Stagger
          staggerDelay={0.1}
          delay={showFeatured ? 0.3 : 0.2}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {gridProjects.map((project) => (
            <motion.div
              key={`${filter}-${project.id}`}
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
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

export function FeaturedProjects() {
  return <Projects />;
}
