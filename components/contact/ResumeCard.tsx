"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { profile } from "@/data/profile";
import { getCurrentRole } from "@/data/experience";
import { education } from "@/data/credentials";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

const ctaBase =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-[13px] font-medium tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]";

const ctaVariants = {
  primary:
    "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-1px] active:translate-y-[0px]",
  secondary:
    "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-hover))] hover:border-[hsl(var(--border-strong))] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
} as const;

/**
 * ResumeCard - concise professional summary (facts only)
 *
 * All values come from the centralized data layer. The View/Download
 * CTAs render ONLY when a real resume asset exists (profile.resume);
 * no fake resume file is ever created or linked.
 */
export function ResumeCard() {
  const { isReducedMotion, isMobile } = useMotion();
  const currentRole = getCurrentRole();
  const topEducation = education[0];

  const facts: { label: string; value: string }[] = [];
  if (currentRole) {
    facts.push({ label: "Current role", value: currentRole.role });
    facts.push({ label: "Organization", value: currentRole.company });
  }
  if (topEducation) {
    facts.push({ label: "Education", value: `B.E. ${topEducation.field}` });
    facts.push({ label: "Graduation", value: topEducation.year });
  }
  facts.push({ label: "Location", value: profile.location });

  return (
    <motion.div
      whileHover={
        isReducedMotion || isMobile
          ? {}
          : {
              y: -2,
              transition: { duration: 0.25, ease: motionTokens.ease.out },
            }
      }
      className="h-full"
    >
      <Card variant="default" className="h-full p-6 md:p-7">
        <div className="flex flex-col gap-5 h-full">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
              Resume
            </p>
            <h3 className="mt-2 text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))] break-words">
              {profile.cvTitle}
            </h3>
            <p className="mt-1 text-[13px] text-[hsl(var(--foreground-secondary))]">
              {profile.yearsOfExperience}+ years of professional experience
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-[13px] text-[hsl(var(--foreground-secondary))] break-words">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Resume CTAs - only when a real asset exists */}
          {profile.resume && (
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <a href={profile.resume} className={ctaBase + " " + ctaVariants.primary}>
                View Resume
              </a>
              <a
                href={profile.resume}
                download
                className={ctaBase + " " + ctaVariants.secondary}
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
