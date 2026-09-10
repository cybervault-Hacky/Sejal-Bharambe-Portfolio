"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { navigationLinks, socialLinks } from "@/data/profile";
import { motion, AnimatePresence } from "framer-motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { motionTokens } from "@/lib/motion";

export interface NavigationProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  onLinkClick?: () => void;
  activeSection?: string;
}

export function Navigation({
  className,
  orientation = "horizontal",
  onLinkClick,
  activeSection = "home",
}: NavigationProps) {
  const { isReducedMotion } = useMotion();

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        orientation === "horizontal"
          ? "flex items-center gap-1"
          : "flex flex-col gap-2",
        className
      )}
    >
      {navigationLinks.map((link) => {
        const sectionId = link.href.replace("#", "");
        const isActive = activeSection === sectionId;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "group relative inline-flex items-center rounded-[var(--radius-md)] px-3 py-2 text-[13px] font-medium tracking-[-0.01em] transition-all duration-200",
              isActive
                ? "text-[hsl(var(--foreground))] bg-[hsl(var(--surface))]/80 border border-[hsl(var(--border))]/60"
                : "text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface))]/80 border border-transparent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
              orientation === "vertical" && "text-[18px] px-4 py-3"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="relative flex items-center gap-2">
              {isActive && !isReducedMotion && (
                <motion.span
                  layoutId="active-indicator"
                  className="h-1 w-1 rounded-full bg-[hsl(var(--foreground))]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && isReducedMotion && (
                <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground))]" />
              )}
              {link.label}
            </span>
            {!isActive && (
              <span className="absolute -bottom-0.5 left-3 right-3 h-px w-0 bg-[hsl(var(--foreground))] transition-all duration-300 group-hover:w-[calc(100%-24px)] opacity-0 group-hover:opacity-100" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavigation({
  className,
  activeSection = "home",
}: {
  className?: string;
  activeSection?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isReducedMotion } = useMotion();

  // Prevent body scroll when menu open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className={cn("md:hidden", className)}>
      <motion.button
        whileTap={isReducedMotion ? {} : { scale: 0.95 }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative z-50 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)]",
          "border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 backdrop-blur-md",
          "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))]",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))]"
        )}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <div className="flex flex-col gap-1.5">
          <motion.span
            animate={isOpen ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.2, ease: motionTokens.ease.out }}
            className="block h-0.5 w-4 bg-current"
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.15 }}
            className="block h-0.5 w-4 bg-current"
          />
          <motion.span
            animate={isOpen ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.2, ease: motionTokens.ease.out }}
            className="block h-0.5 w-4 bg-current"
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: isReducedMotion ? 0.01 : 0.25, ease: motionTokens.ease.out }}
            className={cn(
              "fixed inset-0 z-40 flex flex-col",
              "bg-[hsl(var(--background))]/90 backdrop-blur-2xl",
              "pt-20"
            )}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{
                duration: isReducedMotion ? 0.01 : 0.35,
                ease: motionTokens.ease.out,
                delay: isReducedMotion ? 0 : 0.05,
              }}
              className="flex flex-1 flex-col px-6 py-8"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: isReducedMotion ? 0 : 0.06,
                      delayChildren: isReducedMotion ? 0 : 0.1,
                    },
                  },
                }}
                className="flex flex-col gap-1"
              >
                {navigationLinks.map((link) => {
                  const sectionId = link.href.replace("#", "");
                  const isActive = activeSection === sectionId;

                  return (
                    <motion.div
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: isReducedMotion ? 0.01 : 0.4,
                            ease: motionTokens.ease.out,
                          },
                        },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-[var(--radius-lg)] px-4 py-3 text-[20px] font-medium tracking-tight transition-colors",
                          isActive
                            ? "bg-[hsl(var(--surface))]/80 text-[hsl(var(--foreground))] border border-[hsl(var(--border))]"
                            : "text-[hsl(var(--foreground-secondary))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface))]/60"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-[hsl(var(--foreground))]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isReducedMotion ? 0 : 0.4, duration: isReducedMotion ? 0.01 : 0.3 }}
                className="mt-auto border-t border-[hsl(var(--border-subtle))] pt-8"
              >
                <p className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium mb-3">
                  Connect
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[hsl(var(--foreground-secondary))] px-3 py-1.5 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--border-strong))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
