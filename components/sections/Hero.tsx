"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useMotion } from "@/components/motion/MotionProvider";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { PageEntranceItem, PageEntranceStagger } from "@/components/motion/PageEntrance";
import { ScaleIn } from "@/components/motion/ScaleIn";
import { CanvasWrapper } from "@/components/3d/CanvasWrapper";
import { HeroLoadingFallback } from "@/components/3d/LoadingFallback";

// Dynamic import for 3D scene - client only, no SSR
const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <HeroLoadingFallback />,
  }
);

const ctaBase =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-7 text-[14px] font-medium tracking-[-0.01em] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--foreground))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))]";

const ctaVariants = {
  primary:
    "bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))/90] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:translate-y-[-1px] active:translate-y-[0px]",
  secondary:
    "bg-[hsl(var(--surface-elevated))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--surface-hover))] hover:border-[hsl(var(--border-strong))] shadow-[var(--shadow-xs)] hover:shadow-[var(--shadow-sm)] active:scale-[0.98]",
} as const;

function HeroCta({
  href,
  variant,
  children,
}: {
  href: string;
  variant: keyof typeof ctaVariants;
  children: React.ReactNode;
}) {
  return <a href={href} className={cn(ctaBase, ctaVariants[variant])}>{children}</a>;
}

export function Hero() {
  const { isReducedMotion, isMobile } = useMotion();
  const headlineWords = ["Software", "Developer"];
  const currentRole = "AI Project Manager · Indiation Innovation";

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden border-b border-[hsl(var(--border-subtle))]"
    >
      {/* Background system with subtle parallax */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[hsl(var(--background))]" />
        <div className="absolute inset-0 gradient-mesh opacity-60" />
        <div className="absolute inset-0 grid-dot opacity-[0.02]" />
        <Parallax offset={20} direction="up" className="absolute top-[-20%] left-[10%]">
          <div className="h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.06),transparent_70%)] blur-[40px]" />
        </Parallax>
        <Parallax offset={15} direction="down" className="absolute bottom-[-10%] right-[5%]">
          <div className="h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.04),transparent_70%)] blur-[50px]" />
        </Parallax>
      </div>

      <Container className="relative">
        <div className="flex min-h-[calc(100vh-var(--header-height))] flex-col justify-center py-16 md:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Content */}
            <PageEntranceStagger
              initialDelay={0.1}
              staggerDelay={0.12}
              className="flex flex-col gap-8"
            >
              <PageEntranceItem delay={0} distance={16}>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="glass" className="gap-2 pl-2 pr-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] tracking-wide">{currentRole}</span>
                  </Badge>
                  <span className="hidden sm:inline-flex text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
                    {profile.yearsOfExperience}+ Years Experience
                  </span>
                </div>
              </PageEntranceItem>

              <div className="flex flex-col gap-5">
                <h1 className="text-[40px] font-bold tracking-[-0.02em] leading-[0.95] text-[hsl(var(--foreground))] md:text-[56px] lg:text-[64px] text-balance">
                  <span className="inline-flex flex-wrap gap-x-3">
                    {headlineWords.map((word, i) => (
                      <PageEntranceItem
                        key={word}
                        delay={0.15 + i * 0.08}
                        distance={20}
                        className="inline-block"
                      >
                        <span className="inline-block">{word}</span>
                      </PageEntranceItem>
                    ))}
                  </span>
                  <PageEntranceItem delay={0.35} distance={16} className="block">
                    <span className="block text-[hsl(var(--foreground-secondary))] font-medium tracking-[-0.01em] mt-1">
                      + {profile.titleSecondary}
                    </span>
                  </PageEntranceItem>
                </h1>

                <PageEntranceItem delay={0.45} distance={16}>
                  <p className="max-w-[560px] text-[17px] leading-relaxed text-[hsl(var(--foreground-secondary))] md:text-[18px] text-pretty">
                    Building scalable software experiences and AI-powered products
                    — {profile.yearsOfExperience}+ years across full-stack, healthcare,
                    e-commerce and workflow applications.
                  </p>
                </PageEntranceItem>
              </div>

              <PageEntranceItem delay={0.55} distance={12}>
                <div className="flex flex-wrap items-center gap-3 text-[13px]">
                  {["Full-Stack Development", "AI Project Management", "AI-Powered Applications"].map((label, idx) => (
                    <motion.span
                      key={label}
                      initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: isReducedMotion ? 0.01 : 0.4,
                        delay: isReducedMotion ? 0 : 0.6 + idx * 0.06,
                        ease: motionTokens.ease.out,
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/60 px-3 py-1.5 text-[hsl(var(--foreground-secondary))] backdrop-blur-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
                      {label}
                    </motion.span>
                  ))}
                </div>
              </PageEntranceItem>

              <PageEntranceItem delay={0.65} distance={12}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Magnetic strength={0.15}>
                    <HeroCta href="#projects" variant="primary">
                      View Projects
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="opacity-80"
                        initial={isReducedMotion ? {} : { x: 0 }}
                        whileHover={isReducedMotion ? {} : { x: 2 }}
                        transition={{ duration: 0.2 }}
                        aria-hidden="true"
                      >
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </HeroCta>
                  </Magnetic>
                  {profile.resume ? (
                    <Magnetic strength={0.12}>
                      <HeroCta href={profile.resume} variant="secondary">
                        Download Resume
                      </HeroCta>
                    </Magnetic>
                  ) : (
                    <Magnetic strength={0.12}>
                      <HeroCta href="#contact" variant="secondary">
                        Get in touch
                      </HeroCta>
                    </Magnetic>
                  )}
                  <div className="hidden sm:flex items-center gap-3 pl-4">
                    <div className="h-8 w-px bg-[hsl(var(--border))]" />
                    <motion.span
                      initial={isReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: isReducedMotion ? 0 : 0.9, duration: 0.4 }}
                      className="text-[12px] text-[hsl(var(--foreground-tertiary))] tracking-wide"
                    >
                      Scroll to explore
                    </motion.span>
                  </div>
                </div>
              </PageEntranceItem>

              <PageEntranceItem delay={0.75} distance={12}>
                <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[hsl(var(--border-subtle))] pt-8 max-w-[520px]">
                  {[
                    { value: `${profile.yearsOfExperience}+`, label: "Years Experience" },
                    { value: "Full-Stack", label: "Development" },
                    { value: "AI", label: "Project Management" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: isReducedMotion ? 0.01 : 0.5,
                        delay: isReducedMotion ? 0 : 0.8 + idx * 0.08,
                        ease: motionTokens.ease.out,
                      }}
                      className="flex flex-col gap-1"
                    >
                      <span className="text-[24px] font-semibold tracking-tight text-[hsl(var(--foreground))] leading-none">
                        {stat.value}
                      </span>
                      <span className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </PageEntranceItem>
            </PageEntranceStagger>

            {/* 3D Visual - HeroScene integrated */}
            <ScaleIn delay={0.5} duration={1.0} scale={0.97} className="relative lg:h-[560px] flex items-center justify-center">
              <Parallax offset={isMobile ? 0 : 10} direction="up" className="relative w-full max-w-[520px]">
                <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden">
                  {/* Glass container preserved */}
                  <div className="absolute inset-0 rounded-[var(--radius-2xl)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/20 backdrop-blur-sm" />
                  
                  {/* Header preserved */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-5 border-b border-[hsl(var(--border-subtle))]/50">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium px-2 py-1 rounded-full border border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface))]/80 backdrop-blur-sm">
                      AI Core • Interactive
                    </span>
                  </div>

                  {/* 3D Canvas */}
                  <div className="absolute inset-0 pt-[52px]">
                    <CanvasWrapper variant="hero" className="h-full w-full border-0 rounded-none bg-transparent shadow-none">
                      <HeroScene />
                    </CanvasWrapper>
                  </div>

                  {/* Footer preserved */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between p-4 border-t border-[hsl(var(--border-subtle))]/50 bg-[hsl(var(--surface))]/20 backdrop-blur-sm text-[11px] text-[hsl(var(--foreground-tertiary))]">
                    <span className="font-mono">AI • ENGINEERING • CORE</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                      Interactive • Drag to explore
                    </span>
                  </div>

                  {/* Ambient glow inside */}
                  <Parallax offset={isMobile ? 0 : 8} className="absolute top-[20%] right-[20%] pointer-events-none">
                    <div className="h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.06),transparent_70%)] blur-[20px]" />
                  </Parallax>
                </div>
              </Parallax>

              {/* Floating cards preserved */}
              <motion.div
                initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: isReducedMotion ? 0 : 1.0, duration: 0.6, ease: motionTokens.ease.out }}
                className="absolute -top-4 -right-4 hidden lg:flex h-16 w-[180px] rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 backdrop-blur-xl shadow-[var(--shadow-lg)] p-3 items-center gap-3"
              >
                <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] text-[hsl(var(--background))] flex items-center justify-center text-[11px] font-bold">AI</div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[hsl(var(--foreground))] leading-none">AI Engineering</span>
                  <span className="text-[10px] text-[hsl(var(--foreground-tertiary))]">OpenAI • DeepSeek</span>
                </div>
              </motion.div>

              <motion.div
                initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: isReducedMotion ? 0 : 1.1, duration: 0.6, ease: motionTokens.ease.out }}
                className="absolute -bottom-6 -left-6 hidden lg:flex h-14 w-[200px] rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 backdrop-blur-xl shadow-[var(--shadow-lg)] p-3 items-center gap-3"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[12px] text-[hsl(var(--foreground-secondary))]">Real-time WebGL • R3F</span>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
