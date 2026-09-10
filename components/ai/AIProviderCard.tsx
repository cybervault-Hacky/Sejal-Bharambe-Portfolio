"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { AIProvider } from "@/types/ai";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export interface AIProviderCardProps {
  provider: AIProvider;
}

/**
 * AIProviderCard - technical-layer presentation of a CV-supported
 * LLM API provider. No model names, no keys, no metrics.
 * The mark is an abstract node glyph (not a brand logo).
 */
export function AIProviderCard({ provider }: AIProviderCardProps) {
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
      <Card
        variant="outlined"
        className="group h-full p-6 transition-all duration-300 hover:border-[hsl(var(--border-strong))] md:p-7"
      >
        <div className="flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]"
                aria-hidden="true"
              >
                {/* Abstract node glyph */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3" className="text-[hsl(var(--foreground-secondary))]" />
                  <ellipse cx="9" cy="9" rx="7" ry="3.5" stroke="currentColor" strokeWidth="1" className="text-[hsl(var(--foreground-tertiary))] transition-transform duration-500 group-hover:rotate-45" style={{ transformOrigin: "center" }} />
                </svg>
              </div>
              <h3 className="text-[16px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                {provider.name}
              </h3>
            </div>
            <Badge variant="technical" size="sm">
              {provider.category}
            </Badge>
          </div>

          <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
            {provider.description}
          </p>

          <div className="mt-auto flex items-center gap-2 pt-1">
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
              {provider.name} APIs
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
