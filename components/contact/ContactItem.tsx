"use client";

import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { SocialLink } from "@/types/common";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export type ContactIcon = SocialLink["icon"];

/**
 * Minimal custom SVG icons - no emoji, no icon library.
 * Brand marks (GitHub / LinkedIn) use the recognizable standard glyphs.
 */
const icons: Record<ContactIcon, React.ReactNode> = {
  email: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 6l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  phone: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.2 3.5h3.1l1.5 3.7-1.9 1.4a11.5 11.5 0 005.5 5.5l1.4-1.9 3.7 1.5v3.1c0 .8-.7 1.5-1.5 1.4C8.5 17.9 2.1 11.5 2.8 5c0-.8.6-1.5 1.4-1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

export interface ContactItemProps {
  icon: ContactIcon;
  label: string;
  /** Display value (email address, phone number, profile path) */
  value: string;
  href: string;
  external?: boolean;
  /** Short action hint - doubles as screen-reader context */
  action: string;
  /** Primary channel gets stronger glass */
  primary?: boolean;
}

/**
 * ContactItem - reusable contact entry
 * icon + label + value + action; correct protocol per channel
 * (mailto:, tel:, external links open safely in a new tab)
 */
export function ContactItem({
  icon,
  label,
  value,
  href,
  external = false,
  action,
  primary = false,
}: ContactItemProps) {
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={
        isReducedMotion || isMobile
          ? {}
          : {
              y: -2,
              transition: { duration: 0.25, ease: motionTokens.ease.out },
            }
      }
      className="group block rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
    >
      <Card
        variant={primary ? "default" : "glass"}
        className="flex h-full items-center gap-4 p-5 transition-all duration-300 group-hover:border-[hsl(var(--border-strong))]"
      >
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground-secondary))] transition-colors duration-300 group-hover:text-[hsl(var(--foreground))]"
          aria-hidden="true"
        >
          {icons[icon]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-medium uppercase tracking-widest text-[hsl(var(--foreground-tertiary))]">
              {label}
            </p>
            {primary && (
              <Badge variant="glass" size="sm">
                Primary
              </Badge>
            )}
          </div>
          {/* Safe wrapping for long email addresses on narrow screens */}
          <p className="mt-0.5 text-[14px] font-medium text-[hsl(var(--foreground))] wrap-anywhere break-all">
            {value}
          </p>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          <span className="hidden text-[11px] tracking-wide text-[hsl(var(--foreground-tertiary))] sm:inline">
            {action}
          </span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 16 16"
            fill="none"
            className="text-[hsl(var(--foreground-tertiary))] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--foreground))]"
            aria-hidden="true"
          >
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Card>
    </motion.a>
  );
}
