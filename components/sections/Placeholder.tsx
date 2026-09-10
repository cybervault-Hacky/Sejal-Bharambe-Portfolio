import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface PlaceholderSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  status?: "foundation" | "planned" | "in-progress" | "premium";
  className?: string;
}

const statusConfig = {
  foundation: { label: "Foundation Ready", variant: "secondary" as const },
  planned: { label: "Planned for Phase 3+", variant: "secondary" as const },
  "in-progress": { label: "In Progress", variant: "default" as const },
  premium: { label: "Premium • Phase 2", variant: "glass" as const },
};

export function PlaceholderSection({
  id,
  title,
  subtitle = "Premium Design System",
  description,
  status = "premium",
  className,
}: PlaceholderSectionProps) {
  const statusInfo = statusConfig[status];

  return (
    <Section id={id} spacing="lg" className={cn("border-t border-[hsl(var(--border-subtle))]", className)}>
      <SectionHeading label={subtitle} title={title} description={description} />

      <Card variant="glass" className="max-w-3xl p-6 md:p-8 mt-8">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-[15px] font-semibold tracking-tight text-[hsl(var(--foreground))]">{title} Section</h3>
          <Badge variant={statusInfo.variant} size="sm">{statusInfo.label}</Badge>
        </div>
        <p className="text-[14px] leading-relaxed text-[hsl(var(--foreground-secondary))] mb-6">
          This section&apos;s architecture is prepared. Premium visual system applied. Content will be implemented in future phases without rewriting UI.
        </p>
        <ul className="space-y-2.5 text-[13px] text-[hsl(var(--foreground-secondary))]">
          <li className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
            Data model in <code className="px-1.5 py-0.5 rounded bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[11px] font-mono">types/</code>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
            Content in <code className="px-1.5 py-0.5 rounded bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[11px] font-mono">data/</code>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
            Component in <code className="px-1.5 py-0.5 rounded bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[11px] font-mono">components/sections/</code>
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
            Premium glass, responsive, accessible
          </li>
        </ul>
      </Card>
    </Section>
  );
}

export function FoundationOverview() {
  return (
    <Section spacing="lg" className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="glass" className="mb-6 gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Phase 2 • Premium Visual System
        </Badge>
        <h1 className="text-[36px] font-bold tracking-[-0.02em] leading-[1.1] text-[hsl(var(--foreground))] md:text-[48px] lg:text-[56px] text-balance">
          Premium design system
          <span className="block mt-2 text-[hsl(var(--foreground-secondary))] text-[20px] md:text-[24px] font-medium tracking-[-0.01em]">
            Production-ready • Glassmorphism • Technical
          </span>
        </h1>
        <p className="mt-6 text-[16px] leading-relaxed text-[hsl(var(--foreground-secondary))] md:text-[17px] text-pretty">
          Transformed foundation into high-end engineering portfolio. Dark-first, restrained accents, layered depth, and refined micro-interactions.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 text-left">
          {[
            { label: "Visual", value: "Dark Premium" },
            { label: "System", value: "Glass + Tokens" },
            { label: "Type", value: "Hierarchy" },
            { label: "Ready", value: "Phase 3 Anim" },
          ].map((item) => (
            <Card key={item.label} variant="glass" className="p-4">
              <p className="text-[10px] text-[hsl(var(--foreground-tertiary))] uppercase tracking-widest font-medium">{item.label}</p>
              <p className="mt-1 text-[13px] font-medium text-[hsl(var(--foreground))]">{item.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}
