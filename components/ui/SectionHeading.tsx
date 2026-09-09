"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  animate?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  size = "default",
  className,
  titleClassName,
  descriptionClassName,
  animate = true,
}: SectionHeadingProps) {
  const { isReducedMotion } = useMotion();

  if (!animate) {
    return (
      <div
        className={cn(
          "max-w-3xl",
          align === "center" && "mx-auto text-center",
          align === "left" && "text-left",
          className
        )}
      >
        {label && (
          <div className={cn("mb-4 flex", align === "center" ? "justify-center" : "justify-start")}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
              {label}
            </span>
          </div>
        )}

        <h2
          className={cn(
            "font-bold tracking-tight text-[hsl(var(--foreground))] text-balance",
            size === "default" && "text-[var(--text-4xl)] md:text-[var(--text-5xl)] leading-[var(--leading-tight)]",
            size === "large" && "text-[var(--text-5xl)] md:text-[var(--text-6xl)] leading-[var(--leading-tight)]",
            titleClassName
          )}
        >
          {title}
        </h2>

        {description && (
          <p
            className={cn(
              "mt-4 text-pretty",
              size === "default" && "text-[var(--text-base)] md:text-[var(--text-lg)] leading-[var(--leading-relaxed)]",
              size === "large" && "text-[var(--text-lg)] md:text-[var(--text-xl)] leading-[var(--leading-relaxed)]",
              "text-[hsl(var(--foreground-secondary))]",
              align === "center" && "mx-auto",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" as never }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: isReducedMotion ? 0 : 0.12,
            delayChildren: isReducedMotion ? 0 : 0.05,
          },
        },
      }}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {label && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: isReducedMotion ? 0.01 : 0.5,
                ease: motionTokens.ease.out,
              },
            },
          }}
          className={cn("mb-4 flex", align === "center" ? "justify-center" : "justify-start")}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 px-3 py-1 text-[11px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
            {label}
          </span>
        </motion.div>
      )}

      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: isReducedMotion ? 0.01 : 0.6,
              ease: motionTokens.ease.out,
            },
          },
        }}
        className={cn(
          "font-bold tracking-tight text-[hsl(var(--foreground))] text-balance",
          size === "default" && "text-[var(--text-4xl)] md:text-[var(--text-5xl)] leading-[var(--leading-tight)]",
          size === "large" && "text-[var(--text-5xl)] md:text-[var(--text-6xl)] leading-[var(--leading-tight)]",
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: isReducedMotion ? 0.01 : 0.5,
                ease: motionTokens.ease.out,
              },
            },
          }}
          className={cn(
            "mt-4 text-pretty",
            size === "default" && "text-[var(--text-base)] md:text-[var(--text-lg)] leading-[var(--leading-relaxed)]",
            size === "large" && "text-[var(--text-lg)] md:text-[var(--text-xl)] leading-[var(--leading-relaxed)]",
            "text-[hsl(var(--foreground-secondary))]",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))]",
        className
      )}
    >
      {children}
    </span>
  );
}
