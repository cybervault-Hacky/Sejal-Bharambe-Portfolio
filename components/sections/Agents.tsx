"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function Agents() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="agents" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="AI Engineering"
        title="AI agents and intelligent systems."
        description="Dedicated showcase for AI-powered solutions. Architecture supports capabilities, tools, technologies, and architectures. No fake agents invented in Phase 2."
        align="left"
      />

      <Stagger staggerDelay={0.12} delay={0.2} className="mt-12 grid gap-6 lg:grid-cols-2">
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
            <Card variant="glass" className="p-6 md:p-8 group transition-all duration-300 h-full">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center">
                      <span className="text-[14px] font-bold text-[hsl(var(--foreground))]">AI</span>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">AI Agent • TODO {i}</h3>
                      <p className="text-[12px] text-[hsl(var(--foreground-tertiary))] font-mono">agent-{i} • architecture: multi-agent</p>
                    </div>
                  </div>
                  <Badge variant="glass" size="sm">Prototype</Badge>
                </div>

                <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                  AI agent description placeholder. Will contain real capabilities, tools, and technical architecture from professional work. Premium glass card with subtle hover.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium mb-2">Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["Tool Use", "RAG", "Memory", "Reasoning"].map((cap) => (
                        <Badge key={cap} variant="secondary" size="sm">
                          {cap}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium mb-2">Technologies</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["LangChain", "OpenAI", "Pinecone", "Next.js"].map((tech) => (
                        <Badge key={tech} variant="technical" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" size="sm" className="flex-1">GitHub</Button>
                  <Button variant="ghost" size="sm" className="flex-1">Architecture</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={0.2}>
        <Card variant="outlined" className="mt-6 p-5 border-dashed">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
              <span className="text-[13px] text-[hsl(var(--foreground-tertiary))]">
                Add agents via <code className="px-1.5 py-0.5 rounded bg-[hsl(var(--surface))] border border-[hsl(var(--border))] text-[11px] font-mono">data/agents.ts</code> — UI scales automatically
              </span>
            </div>
            <Badge variant="secondary" size="sm">Scalable Data-Driven</Badge>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
