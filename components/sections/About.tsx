"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function About() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="about" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            label="About"
            title="Software developer focused on premium products and intelligent systems."
            description="Professional summary will be populated from CV in content phase. Architecture supports data-driven content without hardcoding."
            size="default"
          />

          <Reveal delay={0.1} className="flex flex-col gap-4 max-w-[560px]">
            <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
              Content coming in Phase 5 — this section will contain professional summary, core strengths, and approach to building production-ready applications.
            </p>
            <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-tertiary))]">
              Placeholder maintains premium visual structure while awaiting real CV data. No fabricated information.
            </p>
          </Reveal>

          <Stagger staggerDelay={0.06} delay={0.2} className="flex flex-wrap gap-2 pt-2">
            {["Clean Architecture", "Performance Focused", "AI Integration", "User Experience"].map((item) => (
              <Badge key={item} variant="secondary" size="sm">
                {item}
              </Badge>
            ))}
          </Stagger>
        </div>

        <Stagger staggerDelay={0.12} delay={0.2} className="flex flex-col gap-4">
          <motion.div
            whileHover={isReducedMotion ? {} : { y: -2, transition: { duration: 0.25, ease: motionTokens.ease.out } }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))]">Profile Overview</h3>
                <Badge variant="glass" size="sm">Phase 5</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Experience</span>
                  <span className="text-[13px] text-[hsl(var(--foreground))] font-medium">{profile.yearsOfExperience}+ Years</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Focus</span>
                  <span className="text-[13px] text-[hsl(var(--foreground))] font-medium">Full-Stack + AI</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Location</span>
                  <span className="text-[13px] text-[hsl(var(--foreground-secondary))]">{profile.location.includes("TODO") ? "Remote / Global" : profile.location}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--foreground))]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={isReducedMotion ? {} : { y: -2, transition: { duration: 0.25, ease: motionTokens.ease.out } }}
          >
            <Card variant="default" className="p-6">
              <h4 className="text-[13px] font-medium tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] mb-3">Core Principles</h4>
              <div className="space-y-3">
                {[
                  { title: "Production-ready", desc: "Scalable, maintainable, tested" },
                  { title: "Performance-first", desc: "Fast, optimized, efficient" },
                  { title: "User-centric", desc: "Premium experiences, accessible" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium text-[hsl(var(--foreground))]">{item.title}</p>
                      <p className="text-[12px] text-[hsl(var(--foreground-tertiary))]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Stagger>
      </div>
    </Section>
  );
}
