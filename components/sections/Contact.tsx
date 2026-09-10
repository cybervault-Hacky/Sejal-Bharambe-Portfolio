"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

const ctaBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 sm:px-7 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]";

const ctaVariants = {
  primary:
    "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-1px] active:translate-y-[0px]",
  secondary:
    "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-hover))] hover:border-[hsl(var(--border-strong))] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
} as const;

function ContactCta({
  href,
  variant,
  external = false,
  children,
}: {
  href: string;
  variant: keyof typeof ctaVariants;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={ctaBase + " " + ctaVariants[variant]}
    >
      {children}
    </a>
  );
}

export function Contact() {
  const { isReducedMotion } = useMotion();

  return (
    <Section id="contact" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            label="Contact"
            title="Let's build something meaningful."
            description="Have a full-stack project, an AI initiative, or a role to discuss? Email is the fastest way to reach me."
            size="default"
          />

          <Stagger staggerDelay={0.1} delay={0.2} className="flex flex-col gap-4 max-w-[480px]">
            {/* Email - primary channel */}
            <motion.div
              whileHover={isReducedMotion ? {} : { y: -1, transition: { duration: 0.2, ease: motionTokens.ease.out } }}
            >
              <Card variant="default" className="p-5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <span className="text-[14px]">✉️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-[14px] text-[hsl(var(--foreground))] font-medium mt-0.5 break-all hover:text-[hsl(var(--foreground-secondary))] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
                  >
                    {profile.email}
                  </a>
                </div>
                <Badge variant="glass" size="sm" className="flex-shrink-0">Primary</Badge>
              </Card>
            </motion.div>

            {/* GitHub / LinkedIn / Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "GitHub",
                  value: "github.com/sejal-bharambe",
                  href: profile.github,
                  external: true,
                },
                {
                  label: "LinkedIn",
                  value: "sejal-bharambe-5988a720b",
                  href: profile.linkedin,
                  external: true,
                },
                {
                  label: "Phone",
                  value: profile.phone ?? "",
                  href: `tel:${(profile.phone ?? "").replace(/\s/g, "")}`,
                  external: false,
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={isReducedMotion ? {} : { y: -1 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-label={`${item.label}: ${item.label === "Phone" ? item.value : "open profile"}`}
                    className="group block h-full rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] w-full"
                  >
                    <Card variant="glass" className="p-4 h-full">
                      <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
                        {item.label}
                      </p>
                      <p className="text-[13px] text-[hsl(var(--foreground-secondary))] mt-1 truncate group-hover:text-[hsl(var(--foreground))] transition-colors">
                        {item.value}
                      </p>
                    </Card>
                  </a>
                </motion.div>
              ))}
            </div>
          </Stagger>

          <Reveal delay={0.3} className="flex flex-wrap gap-3 pt-2">
            <Magnetic strength={0.15}>
              <ContactCta href={`mailto:${profile.email}`} variant="primary">
                Email Me
              </ContactCta>
            </Magnetic>
            <Magnetic strength={0.12}>
              <ContactCta href={profile.linkedin} variant="secondary" external>
                LinkedIn
              </ContactCta>
            </Magnetic>
            <Magnetic strength={0.12}>
              <ContactCta href={profile.github} variant="secondary" external>
                GitHub
              </ContactCta>
            </Magnetic>
          </Reveal>
        </div>

        {/* Where I can help - real capabilities, no fake form */}
        <Reveal delay={0.2}>
          <motion.div
            whileHover={isReducedMotion ? {} : { y: -2 }}
            transition={{ duration: 0.25, ease: motionTokens.ease.out }}
            className="h-full"
          >
            <Card variant="glass" className="p-6 md:p-8 h-full">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Where I can help
                  </h3>
                  <Badge variant="secondary" size="sm">{profile.yearsOfExperience}+ Years</Badge>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      title: "Full-Stack Development",
                      desc: "Java, Spring Boot, React and Next.js — REST APIs, authentication, CRUD and admin modules, built to be deployed.",
                    },
                    {
                      title: "AI-Powered Applications",
                      desc: "OpenAI and DeepSeek API integrations — AI generation, content and ATS optimization in real product workflows.",
                    },
                    {
                      title: "Product Delivery",
                      desc: "Scoping, deployments, client collaboration and enterprise features — from first spec to release.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-[14px] font-medium text-[hsl(var(--foreground))]">{item.title}</p>
                        <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))] mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-2 border-t border-[hsl(var(--border-subtle))]">
                  <p className="text-[11px] tracking-wide text-[hsl(var(--foreground-tertiary))] uppercase font-medium">
                    Location
                  </p>
                  <p className="text-[13px] text-[hsl(var(--foreground-secondary))] mt-1">
                    {profile.location}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
