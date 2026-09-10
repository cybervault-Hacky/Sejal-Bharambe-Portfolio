"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { experiences, totalYearsOfExperience } from "@/data/experience";
import type { Experience as ExperienceType } from "@/types/experience";
import { Stagger } from "@/components/motion/Stagger";
import { motion, AnimatePresence } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";

const typeLabels: Record<NonNullable<ExperienceType["type"]>, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  contract: "Contract",
  internship: "Internship",
  freelance: "Freelance",
};

export function Experience() {
  const { isReducedMotion } = useMotion();
  // First (current) role expanded by default - deterministic SSR state
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({
    0: true,
  });

  return (
    <Section id="experience" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Experience"
        title="From full-stack internships to AI project management."
        description={`${totalYearsOfExperience}+ years of professional experience across four roles — building products, integrating AI, and delivering for clients.`}
        align="left"
      />

      <div className="relative mt-12">
        {/* Timeline line */}
        <div
          aria-hidden="true"
          className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-[hsl(var(--border-strong))] via-[hsl(var(--border-subtle))] to-transparent"
        />

        <Stagger staggerDelay={0.12} delay={0.2} className="flex flex-col gap-6 md:gap-7">
          {experiences.map((exp, i) => {
            const isOpen = Boolean(expanded[i]);
            const isCurrent = exp.endDate.toLowerCase() === "present";

            return (
              <motion.div key={`${exp.company}-${exp.role}`} className="relative pl-9 md:pl-12">
                {/* Role marker on the timeline */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-9 h-[11px] w-[11px] rounded-full border-2 bg-[hsl(var(--background-secondary))]",
                    isCurrent
                      ? "border-emerald-500"
                      : "border-[hsl(var(--border-strong))]"
                  )}
                >
                  {isCurrent && (
                    <span className="absolute -inset-[7px] rounded-full bg-emerald-500/15 animate-pulse" />
                  )}
                </span>

                <Card variant="glass" className="p-6 md:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      {/* Date + employment type */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                          {exp.startDate} — {exp.endDate}
                        </p>
                        {exp.type && (
                          <Badge variant="secondary" size="sm">
                            {typeLabels[exp.type]}
                          </Badge>
                        )}
                      </div>

                      <h3 className="mt-2.5 text-[18px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                        {exp.role}
                      </h3>
                      <p className="mt-0.5 text-[14px] text-[hsl(var(--foreground-secondary))] break-words">
                        {exp.company}
                      </p>

                      {/* Project / context reference */}
                      {exp.focus && (
                        <div className="mt-3">
                          <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                            Project context
                          </p>
                          <p className="mt-1 text-[13px] text-[hsl(var(--foreground-secondary))] break-words">
                            {exp.focus}
                          </p>
                        </div>
                      )}

                      <p className="mt-3 text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))] max-w-[640px]">
                        {exp.description}
                      </p>

                      {/* Technical focus */}
                      {exp.technologies.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="technical" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Expandable responsibilities */}
                      {exp.achievements.length > 0 && (
                        <>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`experience-details-${i}`}
                            onClick={() =>
                              setExpanded((prev) => ({ ...prev, [i]: !isOpen }))
                            }
                            className="mt-5 inline-flex items-center gap-2 rounded-sm text-[13px] font-medium text-[hsl(var(--foreground-secondary))] transition-colors duration-200 hover:text-[hsl(var(--foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
                          >
                            {isOpen ? "Hide responsibilities" : "View responsibilities"}
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 16 16"
                              fill="none"
                              className={cn(
                                "transition-transform duration-200",
                                isOpen && "rotate-180"
                              )}
                              aria-hidden="true"
                            >
                              <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                key="details"
                                id={`experience-details-${i}`}
                                initial={
                                  isReducedMotion
                                    ? { opacity: 1, height: "auto" }
                                    : { opacity: 0, height: 0 }
                                }
                                animate={{ opacity: 1, height: "auto" }}
                                exit={
                                  isReducedMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, height: 0 }
                                }
                                transition={{
                                  duration: isReducedMotion ? 0.01 : 0.35,
                                  ease: motionTokens.ease.out,
                                }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-4 max-w-[640px] space-y-2 border-l border-[hsl(var(--border-subtle))] pl-4">
                                  {exp.achievements.map((item) => (
                                    <li
                                      key={item}
                                      className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
