"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { motionTokens } from "@/lib/motion";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const displayName = profile.name !== "TODO: Name from CV" ? profile.name : "Sejal Bharambe";
  const { isReducedMotion } = useMotion();

  return (
    <footer
      className={cn(
        "w-full border-t border-[hsl(var(--border-subtle))]",
        "bg-[hsl(var(--background-secondary))]",
        "relative overflow-hidden",
        className
      )}
    >
      {/* Subtle top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent" />

      <Container className="py-12 md:py-16">
        <Reveal className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.5, ease: motionTokens.ease.out }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] text-[hsl(var(--background))] text-[13px] font-bold">
                SB
              </span>
              <span className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                {displayName}
              </span>
            </div>
            <p className="max-w-[320px] text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
              Software Developer + AI Engineer with {profile.yearsOfExperience}+ years building full-stack products and AI-powered solutions.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] text-[hsl(var(--foreground-tertiary))] tracking-wide">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.5, delay: isReducedMotion ? 0 : 0.1, ease: motionTokens.ease.out }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Footer navigation">
              {[
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "AI Agents", href: "#agents" },
                { label: "Skills", href: "#skills" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] transition-colors duration-200 w-fit link-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.5, delay: isReducedMotion ? 0 : 0.15, ease: motionTokens.ease.out }}
            className="flex flex-col gap-4"
          >
            <h4 className="text-[11px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "GitHub", href: profile.github !== "TODO: GitHub URL" ? profile.github : "#" },
                { label: "LinkedIn", href: profile.linkedin !== "TODO: LinkedIn URL" ? profile.linkedin : "#" },
                { label: "Email", href: profile.email !== "TODO: Email" ? `mailto:${profile.email}` : "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[14px] text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] transition-colors duration-200 inline-flex items-center gap-2 w-fit group"
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                >
                  <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] group-hover:bg-[hsl(var(--foreground))] transition-colors" />
                  {item.label}
                </a>
              ))}
            </div>

            <motion.div
              whileHover={isReducedMotion ? {} : { y: -1 }}
              transition={{ duration: 0.2 }}
              className="mt-4 p-3 rounded-[var(--radius-md)] bg-[hsl(var(--surface))]/60 border border-[hsl(var(--border-subtle))] backdrop-blur-sm"
            >
              <p className="text-[11px] tracking-wide text-[hsl(var(--foreground-tertiary))] uppercase font-medium">
                Location
              </p>
              <p className="text-[13px] text-[hsl(var(--foreground-secondary))] mt-1">
                {profile.location !== "TODO: Location" ? profile.location : "Available worldwide • Remote"}
              </p>
            </motion.div>
          </motion.div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12 flex flex-col gap-4 border-t border-[hsl(var(--border-subtle))] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[12px] text-[hsl(var(--foreground-tertiary))]">
            © {currentYear} {displayName}. Built with Next.js, Tailwind CSS, Framer Motion, Lenis.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[hsl(var(--foreground-tertiary))]">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              Phase 3 • Animation System
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Frontend-only • No tracking</span>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
