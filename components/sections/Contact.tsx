"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Magnetic } from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function Contact() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="contact" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            label="Contact"
            title="Let's build something premium together."
            description="Contact section foundation with accessibility and form readiness. External services only when genuinely required. No backend in Phase 2."
            size="default"
          />

          <Stagger staggerDelay={0.1} delay={0.2} className="flex flex-col gap-4 max-w-[480px]">
            <motion.div
              whileHover={isReducedMotion ? {} : { y: -1, transition: { duration: 0.2, ease: motionTokens.ease.out } }}
            >
              <Card variant="default" className="p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center">
                  <span className="text-[14px]">✉️</span>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Email</p>
                  <p className="text-[14px] text-[hsl(var(--foreground))] font-medium mt-0.5">
                    {profile.email.includes("TODO") ? "Available upon request" : profile.email}
                  </p>
                </div>
                <Badge variant="glass" size="sm">Primary</Badge>
              </Card>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={isReducedMotion ? {} : { y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <Card variant="glass" className="p-4 h-full">
                  <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">GitHub</p>
                  <p className="text-[13px] text-[hsl(var(--foreground-secondary))] mt-1 truncate">
                    {profile.github.includes("TODO") ? "github.com/username" : profile.github}
                  </p>
                </Card>
              </motion.div>
              <motion.div
                whileHover={isReducedMotion ? {} : { y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <Card variant="glass" className="p-4 h-full">
                  <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">LinkedIn</p>
                  <p className="text-[13px] text-[hsl(var(--foreground-secondary))] mt-1 truncate">
                    {profile.linkedin.includes("TODO") ? "linkedin.com/in/username" : profile.linkedin}
                  </p>
                </Card>
              </motion.div>
            </div>
          </Stagger>

          <Reveal delay={0.3} className="flex gap-3 pt-2">
            <Magnetic strength={0.15}>
              <Button variant="primary" size="lg" className="rounded-full px-7">
                Get in touch
              </Button>
            </Magnetic>
            <Magnetic strength={0.12}>
              <Button variant="secondary" size="lg" className="rounded-full px-7">
                View resume
              </Button>
            </Magnetic>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <motion.div
            whileHover={isReducedMotion ? {} : { y: -2 }}
            transition={{ duration: 0.25, ease: motionTokens.ease.out }}
          >
            <Card variant="glass" className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold tracking-tight text-[hsl(var(--foreground))]">Send a message</h3>
                  <Badge variant="secondary" size="sm">Phase 6 • Form + Service</Badge>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Name</label>
                    <div className="h-11 w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 px-4 flex items-center text-[13px] text-[hsl(var(--foreground-tertiary))]">
                      Your name • form ready for integration
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Email</label>
                    <div className="h-11 w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 px-4 flex items-center text-[13px] text-[hsl(var(--foreground-tertiary))]">
                      your@email.com
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Message</label>
                    <div className="h-24 w-full rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 p-4 text-[13px] text-[hsl(var(--foreground-tertiary))]">
                      Tell me about your project...
                    </div>
                  </div>
                </div>

                <Button variant="primary" size="lg" className="w-full rounded-full" disabled>
                  Send message • Coming in Phase 6
                </Button>

                <p className="text-[11px] text-center text-[hsl(var(--foreground-tertiary))] leading-relaxed">
                  No backend in Phase 2. Form will integrate with external service only when genuinely required. Privacy focused.
                </p>
              </div>
            </Card>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
