"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { groupedSkills } from "@/data/skills";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function Skills() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="skills" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Skills"
        title="Technologies and tools I work with."
        description="Grouped by domain — languages, frontend, backend, databases, auth, cloud/devops and tools. Proficiency values are self-assessed."
        align="left"
      />

      <Stagger staggerDelay={0.08} delay={0.2} className="mt-12 grid gap-6 md:grid-cols-2">
        {groupedSkills.map((group) => (
          <motion.div
            key={group.category}
            whileHover={
              isReducedMotion
                ? {}
                : { y: -1, transition: { duration: 0.2, ease: motionTokens.ease.out } }
            }
          >
            <Card variant="default" className="p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[13px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
                  {group.label}
                </h3>
                <span className="text-[11px] text-[hsl(var(--foreground-tertiary))] font-mono">
                  {group.skills.length} skills
                </span>
              </div>
              <ul className="space-y-2.5">
                {group.skills.map((skill) => (
                  <li key={`${group.category}-${skill.name}`} className="flex items-center gap-3">
                    <span className="flex-1 min-w-0 text-[13px] text-[hsl(var(--foreground-secondary))] truncate">
                      {skill.name}
                    </span>
                    <span
                      className="h-1 w-14 sm:w-20 rounded-full bg-[hsl(var(--surface-elevated))] overflow-hidden flex-shrink-0"
                      aria-hidden="true"
                    >
                      <span
                        className="block h-full rounded-full bg-[hsl(var(--foreground-tertiary))]"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </span>
                    <span className="w-7 text-right text-[11px] font-mono text-[hsl(var(--foreground-tertiary))] flex-shrink-0">
                      {skill.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <p className="mt-6 text-[12px] leading-relaxed text-[hsl(var(--foreground-tertiary))]">
          Proficiency values are self-assessed — a personal indicator, not a
          standardized or certified measurement.
        </p>
      </Reveal>
    </Section>
  );
}
