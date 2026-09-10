"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { aiFocusAreas, aiProviders, aiSection, aiProjectSlug } from "@/data/ai";
import { getProjectById } from "@/data/projects";
import { getCurrentRole } from "@/data/experience";
import { AICapabilityCard } from "@/components/ai/AICapabilityCard";
import { AIProviderCard } from "@/components/ai/AIProviderCard";
import { AIWorkflow } from "@/components/ai/AIWorkflow";
import { AIProjectCard } from "@/components/ai/AIProjectCard";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { useMotion } from "@/components/motion/MotionProvider";
import { resolveAnchorHash } from "@/lib/utils";

export function AIEngineering() {
  const { isReducedMotion } = useMotion();
  const pathname = usePathname();

  const aiProject = getProjectById(aiProjectSlug) ?? null;
  const currentRole = getCurrentRole();
  const currentRoleIsAi = currentRole ? /AI/i.test(currentRole.role) : false;

  return (
    <Section id="ai" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))]">
      {/* Hero row - headline + conceptual integration flow */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <SectionHeading
          label={aiSection.label}
          title={aiSection.title}
          description={aiSection.description}
          align="left"
        />
        <Reveal delay={0.2} className={isReducedMotion ? "" : "lg:justify-self-end"}>
          <AIWorkflow className="w-full max-w-[420px] lg:mx-auto" />
        </Reveal>
      </div>

      {/* Capability overview */}
      <Stagger staggerDelay={0.1} delay={0.2} className="mt-14 grid gap-6 md:grid-cols-2">
        {aiFocusAreas.map((area) => (
          <AICapabilityCard key={area.id} area={area} />
        ))}
      </Stagger>

      {/* AI technology layer - CV-supported LLM API experience */}
      <Reveal delay={0.15} className="mt-14">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
          AI Technology Layer
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {aiProviders.map((provider) => (
            <AIProviderCard key={provider.name} provider={provider} />
          ))}
        </div>
      </Reveal>

      {/* AI project + current AI role context */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {aiProject && (
          <Reveal delay={0.1} className="h-full">
            <AIProjectCard project={aiProject} />
          </Reveal>
        )}

        {currentRole && (
          <Reveal delay={0.2} className="h-full">
            <Card variant="glass" className="group flex h-full flex-col p-6 transition-all duration-300 md:p-7">
              <div className="flex flex-col gap-5 h-full">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                    Current Role
                  </p>
                </div>

                <div>
                  <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    {currentRole.role}
                  </h3>
                  <p className="mt-1 text-[13px] text-[hsl(var(--foreground-secondary))] break-words">
                    {currentRole.company}
                  </p>
                  {currentRole.focus && (
                    <p className="mt-2 text-[12px] text-[hsl(var(--foreground-tertiary))] break-words">
                      {currentRole.focus}
                    </p>
                  )}
                </div>

                <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                  {currentRoleIsAi
                    ? "AI-powered product development and project leadership."
                    : "Product development and delivery."}
                </p>

                <div className="mt-auto pt-1">
                  <a
                    href={resolveAnchorHash("#experience", pathname)}
                    className="inline-flex items-center gap-2 rounded-sm text-[13px] font-medium text-[hsl(var(--foreground))] transition-colors duration-200 hover:text-[hsl(var(--foreground-secondary))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
                  >
                    View experience
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

// Backwards-compatible export name
export { AIEngineering as Agents };
