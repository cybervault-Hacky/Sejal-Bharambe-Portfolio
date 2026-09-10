"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { AIFocusArea } from "@/types/ai";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 20 20",
  fill: "none",
  "aria-hidden": true as const,
};

/**
 * Minimal technical icons per AI work area (custom SVG - no emoji,
 * no icon library). Mapped by area id so data stays free of markup.
 */
const areaIcons: Record<string, React.ReactNode> = {
  "ai-app-development": (
    <svg {...iconProps}>
      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5.8" cy="6" r="0.8" fill="currentColor" />
      <path d="M7 12l1.8 1.8L12 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "llm-api-integration": (
    <svg {...iconProps}>
      <path d="M8 3v4M12 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 7h7v2.5a3.5 3.5 0 01-7 0V7z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "ai-assisted-workflows": (
    <svg {...iconProps}>
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 5h4a3 3 0 013 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 15H9a3 3 0 01-3-3v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "ai-project-management": (
    <svg {...iconProps}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.2 6.8l-2.1 4.3-4.3 2.1 2.1-4.3 4.3-2.1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
};

export interface AICapabilityCardProps {
  area: AIFocusArea;
}

export function AICapabilityCard({ area }: AICapabilityCardProps) {
  const { isReducedMotion, isMobile } = useMotion();

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
      <Card variant="glass" className="group h-full p-6 transition-all duration-300 md:p-7">
        <div className="flex flex-col gap-5 h-full">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground-secondary))] transition-colors duration-300 group-hover:text-[hsl(var(--foreground))]">
              {areaIcons[area.id] ?? null}
            </div>
            <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
              {area.title}
            </h3>
          </div>

          <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
            {area.description}
          </p>

          <div className="mt-auto space-y-4 pt-1">
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                Technologies
              </p>
              <div className="flex flex-wrap gap-1.5">
                {area.technologies.map((tech) => (
                  <Badge key={tech} variant="technical" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
                Context
              </p>
              <div className="flex flex-wrap gap-1.5">
                {area.context.map((item) => (
                  <Badge key={item} variant="secondary" size="sm">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
