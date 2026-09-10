"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface WorkflowNode {
  label: string;
  icon: React.ReactNode;
}

const iconProps = {
  width: 14,
  height: 14,
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": true as const,
};

/**
 * AIWorkflow - conceptual integration flow visual
 *
 * APPLICATION -> AI INTEGRATION -> LLM API -> APPLICATION EXPERIENCE
 *
 * Decorative and generic on purpose: it illustrates how AI work
 * fits into product development, not a specific production
 * architecture. Entirely aria-hidden - all content is carried
 * by the surrounding text.
 */
export function AIWorkflow({ className }: { className?: string }) {
  const nodes: WorkflowNode[] = [
    {
      label: "Application",
      icon: (
        <svg {...iconProps}>
          <rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
          <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="4.4" cy="4.8" r="0.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "AI Integration",
      icon: (
        <svg {...iconProps}>
          <path d="M5 3v3M11 3v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M4 6h8v2a4 4 0 01-4 4v0a4 4 0 01-4-4V6z" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 12v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "LLM API",
      icon: (
        <svg {...iconProps}>
          <path d="M5.5 4.5L2.5 8l3 3.5M10.5 4.5l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "Application Experience",
      icon: (
        <svg {...iconProps}>
          <path d="M8 2.5l1.4 3 3.1.4-2.3 2.2.6 3.1L8 9.8l-2.8 1.4.6-3.1L3.5 5.9l3.1-.4L8 2.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="relative flex flex-col items-center rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/30 p-8 backdrop-blur-sm md:p-10">
        {/* Subtle technical background */}
        <div className="absolute inset-0 rounded-[var(--radius-2xl)] grid-dot opacity-[0.04]" />
        <div className="absolute inset-0 rounded-[var(--radius-2xl)] gradient-mesh opacity-25" />

        <div className="relative flex flex-col items-center">
          {nodes.map((node, i) => (
            <React.Fragment key={node.label}>
              <div className="flex h-12 w-full max-w-[220px] items-center justify-center gap-2.5 rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] px-4 text-[hsl(var(--foreground-secondary))]">
                <span className="text-[hsl(var(--foreground-tertiary))]" aria-hidden="true">
                  {node.icon}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-secondary))]">
                  {node.label}
                </span>
              </div>
              {i < nodes.length - 1 && (
                <div className="relative h-10 w-px overflow-visible bg-[hsl(var(--border-subtle))]">
                  {/* Decorative pulse travelling down the connector */}
                  <span className="ai-flow-pulse absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Clarifies the visual is conceptual, not a production diagram */}
      <p className="mt-3 text-center text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
        Conceptual integration flow
      </p>
    </div>
  );
}
