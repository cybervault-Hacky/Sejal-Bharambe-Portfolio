"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { experiences, totalYearsOfExperience } from "@/data/experience";
import type { Experience as ExperienceType } from "@/types/experience";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

const typeLabels: Record<NonNullable<ExperienceType["type"]>, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
  freelance: "Freelance",
};

export function Experience() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="experience" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Experience"
        title="From full-stack internships to AI project management."
        description={`${totalYearsOfExperience}+ years of professional experience across four roles — building products, integrating AI, and delivering for clients.`}
        align="left"
      />

      <Stagger staggerDelay={0.12} delay={0.2} className="mt-12 grid gap-6">
        {experiences.map((exp, i) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            whileHover={
              isReducedMotion
                ? {}
                : {
                    y: -2,
                    transition: { duration: 0.25, ease: motionTokens.ease.out },
                  }
            }
          >
            <Card variant="glass" className="p-6 md:p-8 group transition-all duration-300">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1 space-y-4 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center text-[12px] font-bold text-[hsl(var(--foreground-tertiary))] flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                        {exp.role}
                      </h3>
                      <p className="text-[13px] text-[hsl(var(--foreground-secondary))] break-words">
                        {exp.company}
                        {exp.focus && (
                          <span className="text-[hsl(var(--foreground-tertiary))]">
                            {" "}
                            — {exp.focus}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))] max-w-[640px]">
                    {exp.description}
                  </p>

                  {exp.achievements.length > 0 && (
                    <ul className="space-y-2 max-w-[640px]">
                      {exp.achievements.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]"
                        >
                          <span className="mt-[7px] h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="technical" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col gap-2 md:text-right md:flex-shrink-0">
                  {exp.type && (
                    <Badge variant="secondary" size="sm" className="w-fit">
                      {typeLabels[exp.type]}
                    </Badge>
                  )}
                  <span className="text-[12px] text-[hsl(var(--foreground-tertiary))]">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}
