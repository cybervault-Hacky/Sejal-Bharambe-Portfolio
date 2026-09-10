"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

const skillGroups = [
  { label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend", skills: ["Node.js", "API Design", "System Architecture"] },
  { label: "AI / ML", skills: ["AI Agents", "LangChain", "RAG", "LLMs"] },
  { label: "Tools", skills: ["Git", "Docker", "Vercel", "Performance"] },
];

export function Skills() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="skills" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Skills"
        title="Technologies and tools I work with."
        description="Grouped skills architecture with categories and levels. Real skills from CV will replace placeholders in content phase. No invented expertise."
        align="left"
      />

      <Stagger staggerDelay={0.1} delay={0.2} className="mt-12 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
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
              <Stagger staggerDelay={0.05} delay={0.1} className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" size="default" className="group hover:border-[hsl(var(--border-strong))] transition-colors">
                    <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] group-hover:bg-[hsl(var(--foreground))] transition-colors" />
                    {skill}
                  </Badge>
                ))}
              </Stagger>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <Card variant="glass" className="mt-6 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-[14px] font-semibold text-[hsl(var(--foreground))]">Data-driven skill system</h4>
              <p className="text-[13px] text-[hsl(var(--foreground-secondary))] mt-1">
                Skills grouped by category, with levels and featured flags. Add via <code className="px-1 py-0.5 rounded bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[11px] font-mono">data/skills.ts</code>
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="technical" size="sm">Scalable</Badge>
              <Badge variant="technical" size="sm">Filterable</Badge>
              <Badge variant="technical" size="sm">Accessible</Badge>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
