"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function Experience() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="experience" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Experience"
        title="Professional journey building products and systems."
        description="Timeline architecture is ready. Real experience data will be populated from CV in content phase. No fabricated companies or roles."
        align="left"
      />

      <Stagger staggerDelay={0.12} delay={0.2} className="mt-12 grid gap-6">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
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
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center text-[12px] font-bold text-[hsl(var(--foreground-tertiary))]">
                      {i}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">Role Title • TODO</h3>
                      <p className="text-[13px] text-[hsl(var(--foreground-secondary))]">Company Name • TODO • Location • Date Range</p>
                    </div>
                  </div>

                  <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))] max-w-[600px]">
                    Experience description placeholder — will contain real achievements and responsibilities from CV. Premium timeline design with subtle hover and glass effects.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Next.js", "AI", "Node.js"].map((tech) => (
                      <Badge key={tech} variant="technical" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:text-right">
                  <Badge variant="secondary" size="sm" className="w-fit">
                    Full-time
                  </Badge>
                  <span className="text-[12px] text-[hsl(var(--foreground-tertiary))]">2023 — Present</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <Reveal delay={0.1}>
          <Card variant="outlined" className="p-6 border-dashed">
            <div className="flex items-center gap-3 text-[13px] text-[hsl(var(--foreground-tertiary))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
              Additional experience entries will be added via data/experience.ts without rewriting UI. Scalable architecture.
            </div>
          </Card>
        </Reveal>
      </Stagger>
    </Section>
  );
}
