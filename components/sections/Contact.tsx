"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { linkDisplayValue } from "@/lib/utils";
import { ContactItem } from "@/components/contact/ContactItem";
import type { ContactIcon } from "@/components/contact/ContactItem";
import { ResumeCard } from "@/components/contact/ResumeCard";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { motion } from "framer-motion";

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
  // All contact data comes from the centralized profile values
  const contactItems: {
    icon: ContactIcon;
    label: string;
    value: string;
    href: string;
    external: boolean;
    action: string;
    primary?: boolean;
  }[] = [
    {
      icon: "email",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      external: false,
      action: "Opens your email app",
      primary: true,
    },
    {
      icon: "phone",
      label: "Phone",
      value: profile.phone ?? "",
      href: `tel:${(profile.phone ?? "").replace(/\s/g, "")}`,
      external: false,
      action: "Opens your phone",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: linkDisplayValue(profile.linkedin),
      href: profile.linkedin,
      external: true,
      action: "Connect on LinkedIn",
    },
    {
      icon: "github",
      label: "GitHub",
      value: linkDisplayValue(profile.github),
      href: profile.github,
      external: true,
      action: "View GitHub profile",
    },
  ];

  return (
    <Section id="contact" spacing="lg" className="border-t border-[hsl(var(--border-subtle))]">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Invitation + CTAs + professional summary */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            label="Contact"
            title="Let's connect."
            description="Have a project, opportunity or idea worth discussing? Reach out directly — email is the fastest way to reach me."
            size="default"
          />

          {/* CTA hierarchy: Email (primary) > LinkedIn > GitHub */}
          <Reveal delay={0.25} className="flex max-w-[520px] flex-wrap gap-3">
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

          {/* Resume / professional summary - CTAs gated on a real asset */}
          <Reveal delay={0.35} className="max-w-[560px]">
            <ResumeCard />
          </Reveal>
        </div>

        {/* Direct contact channels - semantic address, no form, no backend */}
        <Reveal delay={0.2} className="h-full">
          <address className="not-italic flex h-full flex-col justify-start">
            <Stagger staggerDelay={0.1} delay={0.15} className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <motion.div key={item.label} className="h-full">
                  <ContactItem {...item} />
                </motion.div>
              ))}
            </Stagger>
          </address>
        </Reveal>
      </div>
    </Section>
  );
}
