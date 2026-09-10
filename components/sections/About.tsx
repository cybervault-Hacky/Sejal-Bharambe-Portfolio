"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { getCurrentRole } from "@/data/experience";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function About() {
  const { isReducedMotion } = useMotion();
  const currentRole = getCurrentRole();

  return (
    <Section id="about" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            label="About"
            title="Full stack developer building scalable, AI-powered products."
            description="Full Stack Developer and AI Project Manager with 2+ years of experience across AI-powered applications, healthcare platforms, e-commerce and workflow systems."
            size="default"
          />

          <Reveal delay={0.1} className="flex flex-col gap-4 max-w-[560px]">
            <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
              I build full-stack applications with Java, Spring Boot, React, Next.js
              and TypeScript — from REST APIs and authentication to deployment. My
              work spans AI-powered applications, healthcare platforms, e-commerce
              applications and workflow systems, with a focus on scalable,
              production-ready systems.
            </p>
            <p className="text-[15px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
              As an AI Project Manager at Indiation Innovation, I&apos;ve led
              delivery of LinkedIn Scheduler and Wurqe — managing deployments,
              working directly with clients and shipping enterprise features, while
              integrating OpenAI and DeepSeek APIs into real product workflows.
            </p>
          </Reveal>

          <Stagger staggerDelay={0.06} delay={0.2} className="flex flex-wrap gap-2 pt-2">
            {["Full-Stack Development", "AI Integration", "Scalable Systems", "Enterprise Delivery"].map((item) => (
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
                <Badge variant="glass" size="sm">{profile.yearsOfExperience}+ Years</Badge>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between gap-4 py-2 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Experience</span>
                  <span className="text-[13px] text-[hsl(var(--foreground))] font-medium">{profile.yearsOfExperience}+ Years</span>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Focus</span>
                  <span className="text-[13px] text-[hsl(var(--foreground))] font-medium">Full-Stack + AI</span>
                </div>
                <div className="flex justify-between gap-4 py-2 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Location</span>
                  <span className="text-[13px] text-[hsl(var(--foreground-secondary))] text-right">{profile.location}</span>
                </div>
                <div className="flex justify-between gap-4 py-2">
                  <span className="text-[12px] tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Current</span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-[hsl(var(--foreground))] text-right">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                    {currentRole ? `${currentRole.role} — ${currentRole.company}` : "AI Project Manager"}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={isReducedMotion ? {} : { y: -2, transition: { duration: 0.25, ease: motionTokens.ease.out } }}
          >
            <Card variant="default" className="p-6">
              <h4 className="text-[13px] font-medium tracking-wide uppercase text-[hsl(var(--foreground-tertiary))] mb-3">Core Strengths</h4>
              <div className="space-y-3">
                {[
                  { title: "Full-Stack Delivery", desc: "REST APIs, authentication, CRUD and admin modules" },
                  { title: "AI Integration", desc: "OpenAI and DeepSeek APIs in product features" },
                  { title: "Client-Facing Work", desc: "Enterprise features, deployments and client collaboration" },
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
