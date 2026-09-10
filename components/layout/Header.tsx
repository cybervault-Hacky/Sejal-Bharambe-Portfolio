"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { usePathname } from "next/navigation";
import { Navigation, MobileNavigation } from "./Navigation";
import { ScrollProgressInHeader } from "@/components/motion/ScrollProgress";
import { useActiveSection, useMotion } from "@/components/motion/MotionProvider";
import { cn } from "@/lib/utils";
import { resolveAnchorHash } from "@/lib/utils";
import { motion } from "framer-motion";

export interface HeaderProps {
  className?: string;
}

const sectionIds = ["home", "about", "experience", "projects", "ai", "skills", "contact"];

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const activeSection = useActiveSection(sectionIds);
  const { isReducedMotion } = useMotion();
  const pathname = usePathname();

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled
          ? "hsla(var(--background) / 0.84)"
          : "hsla(var(--background) / 0.72)",
        backdropFilter: isScrolled ? "blur(24px)" : "blur(16px)",
        borderColor: isScrolled ? "hsl(var(--border))" : "hsl(var(--border-subtle))",
        boxShadow: isScrolled ? "var(--shadow-glass)" : "none",
      }}
      transition={{
        duration: isReducedMotion ? 0.01 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "sticky top-0 z-header w-full",
        "border-b",
        "supports-[backdrop-filter]:bg-[hsl(var(--background))]/64",
        className
      )}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between">
        {/* Logo / Name */}
        <Link
          href={resolveAnchorHash("#home", pathname)}
          className={cn(
            "group flex items-center gap-3 rounded-[var(--radius-md)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]",
            "transition-all duration-200"
          )}
          aria-label="Home - Sejal Bharambe Portfolio"
        >
          <motion.span
            whileHover={isReducedMotion ? {} : { y: -1, boxShadow: "var(--shadow-md)" }}
            whileTap={isReducedMotion ? {} : { scale: 0.98 }}
            className="relative inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] text-[hsl(var(--background))] text-[13px] font-bold tracking-tight shadow-[var(--shadow-sm)] transition-all duration-200"
          >
            SB
          </motion.span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--foreground-secondary))] transition-colors">
              Sejal Bharambe
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[hsl(var(--foreground-tertiary))] uppercase">
              Developer + AI Engineer
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <Navigation activeSection={activeSection} className="mr-2" />
          <div className="h-5 w-px bg-[hsl(var(--border))] mx-2" />
          <motion.div
            whileHover={isReducedMotion ? {} : { y: -1 }}
            whileTap={isReducedMotion ? {} : { scale: 0.98 }}
          >
            <a
              href={resolveAnchorHash("#contact", pathname)}
              className="inline-flex h-8 items-center justify-center rounded-full px-5 text-[13px] font-medium bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
            >
              Contact
            </a>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={resolveAnchorHash("#contact", pathname)}
            className="inline-flex h-8 items-center justify-center rounded-full px-4 text-[12px] font-medium bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]"
          >
            Contact
          </a>
          <MobileNavigation activeSection={activeSection} />
        </div>
      </Container>

      {/* Scroll progress in header */}
      <ScrollProgressInHeader />

      {/* Subtle bottom glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent opacity-60" />
    </motion.header>
  );
}
