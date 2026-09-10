"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { education, certifications, achievements } from "@/data/credentials";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

function CredentialCardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
      {children}
    </h3>
  );
}

export function Education() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="education" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <SectionHeading
        label="Education & Credentials"
        title="Education, certifications and milestones."
        description="Academic background, professional certifications and career highlights."
        align="left"
      />

      <Stagger staggerDelay={0.1} delay={0.2} className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* Education */}
        <motion.div
          whileHover={isReducedMotion ? {} : { y: -2, transition: { duration: 0.25, ease: motionTokens.ease.out } }}
          className="h-full"
        >
          <Card variant="glass" className="p-6 h-full">
            <CredentialCardTitle>Education</CredentialCardTitle>
            <div className="mt-5 flex flex-col gap-5">
              {education.map((ed) => (
                <div key={ed.institution} className="flex flex-col gap-1.5">
                  <p className="text-[15px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    {ed.degree}
                  </p>
                  <p className="text-[13px] text-[hsl(var(--foreground-secondary))]">{ed.field}</p>
                  <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-tertiary))] break-words">
                    {ed.institution}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Badge variant="secondary" size="sm">
                      {ed.year}
                    </Badge>
                    {ed.score && (
                      <Badge variant="glass" size="sm">
                        {ed.score}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Certifications */}
        <motion.div
          whileHover={isReducedMotion ? {} : { y: -2, transition: { duration: 0.25, ease: motionTokens.ease.out } }}
          className="h-full"
        >
          <Card variant="glass" className="p-6 h-full">
            <CredentialCardTitle>Certifications</CredentialCardTitle>
            <div className="mt-5 flex flex-col gap-5">
              {certifications.map((cert) => (
                <div key={cert.title} className="flex flex-col gap-1.5">
                  <p className="text-[15px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    {cert.title}
                  </p>
                  <p className="text-[13px] text-[hsl(var(--foreground-secondary))]">{cert.issuer}</p>
                  <div className="flex items-center gap-2 pt-1.5">
                    <Badge variant="secondary" size="sm">
                      {cert.year}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          whileHover={isReducedMotion ? {} : { y: -2, transition: { duration: 0.25, ease: motionTokens.ease.out } }}
          className="h-full"
        >
          <Card variant="glass" className="p-6 h-full">
            <CredentialCardTitle>Achievements</CredentialCardTitle>
            <ul className="mt-5 flex flex-col gap-4">
              {achievements.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">{item.title}</p>
                    <p className="mt-1 text-[11px] font-mono text-[hsl(var(--foreground-tertiary))]">{item.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </Stagger>
    </Section>
  );
}
