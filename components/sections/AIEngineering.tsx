"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { aiFocusAreas } from "@/data/ai";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function AIEngineering() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="ai" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="AI Engineering"
        title="AI in production — from LLM APIs to project delivery."
        description="Developing AI-powered solutions with OpenAI and DeepSeek APIs, and leading AI-focused product delivery as an AI Project Manager."
        align="left"
      />

      <Stagger staggerDelay={0.12} delay={0.2} className="mt-12 grid gap-6 lg:grid-cols-2">
        {aiFocusAreas.map((area) => (
          <motion.div
            key={area.id}
            whileHover={
              isReducedMotion
                ? {}
                : {
                    y: -2,
                    transition: { duration: 0.25, ease: motionTokens.ease.out },
                  }
            }
          >
            <Card variant="glass" className="p-6 md:p-8 group transition-all duration-300 h-full">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
                    <span className="text-[12px] font-bold text-[hsl(var(--foreground))]">AI</span>
                  </div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    {area.title}
                  </h3>
                </div>

                <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                  {area.description}
                </p>

                <div className="mt-auto space-y-4 pt-1">
                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.technologies.map((tech) => (
                        <Badge key={tech} variant="technical" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium mb-2">
                      Context
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.context.map((item) => (
                        <Badge key={item} variant="secondary" size="sm">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <Card variant="outlined" className="mt-6 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                LLM APIs integrated in real product work:{" "}
                <span className="font-medium text-[hsl(var(--foreground))]">OpenAI</span> and{" "}
                <span className="font-medium text-[hsl(var(--foreground))]">DeepSeek</span> —
                powering AI features from resume generation to content optimization.
              </span>
            </div>
            <Badge variant="secondary" size="sm" className="w-fit">
              OpenAI API • DeepSeek API
            </Badge>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}

// Backwards-compatible export name
export { AIEngineering as Agents };
