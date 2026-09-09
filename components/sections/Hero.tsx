"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { profile } from "@/data/profile";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { PageEntranceItem, PageEntranceStagger } from "@/components/motion/PageEntrance";
import { ScaleIn } from "@/components/motion/ScaleIn";

export function Hero() {
  const { isReducedMotion, isMobile } = useMotion();

  // Split headline for staggered reveal - accessible
  const headlineWords = ["Software", "Developer"];

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
        {/* Ambient glows with parallax */}
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
              {/* Status */}
              <PageEntranceItem delay={0} distance={16}>
                <div className="flex items-center gap-3">
                  <Badge variant="glass" className="gap-2 pl-2 pr-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] tracking-wide">Available for new opportunities</span>
                  </Badge>
                  <span className="hidden sm:inline-flex text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
                    {profile.yearsOfExperience}+ Years Experience
                  </span>
                </div>
              </PageEntranceItem>

              {/* Headline - staggered words */}
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
                      + AI Engineer
                    </span>
                  </PageEntranceItem>
                </h1>

                <PageEntranceItem delay={0.45} distance={16}>
                  <p className="max-w-[560px] text-[17px] leading-relaxed text-[hsl(var(--foreground-secondary))] md:text-[18px] text-pretty">
                    Building production-ready full-stack applications and AI-powered solutions.
                    Focused on clean architecture, premium user experiences, and intelligent systems.
                  </p>
                </PageEntranceItem>
              </div>

              {/* Meta */}
              <PageEntranceItem delay={0.55} distance={12}>
                <div className="flex flex-wrap items-center gap-3 text-[13px]">
                  {["Full-Stack Development", "AI Agents & Solutions", "Modern Web Technologies"].map((label, idx) => (
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

              {/* CTAs with magnetic */}
              <PageEntranceItem delay={0.65} distance={12}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Magnetic strength={0.15}>
                    <Button variant="primary" size="lg" className="rounded-full px-7 group">
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
                      >
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </motion.svg>
                    </Button>
                  </Magnetic>
                  <Magnetic strength={0.12}>
                    <Button variant="secondary" size="lg" className="rounded-full px-7">
                      Download Resume
                    </Button>
                  </Magnetic>
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

              {/* Experience indicator */}
              <PageEntranceItem delay={0.75} distance={12}>
                <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[hsl(var(--border-subtle))] pt-8 max-w-[520px]">
                  {[
                    { value: `${profile.yearsOfExperience}+`, label: "Years Experience" },
                    { value: "Full-Stack", label: "Development" },
                    { value: "AI", label: "Engineering" },
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

            {/* Visual placeholder - future 3D with scale + parallax */}
            <ScaleIn delay={0.5} duration={1.0} scale={0.97} className="relative lg:h-[560px] flex items-center justify-center">
              <Parallax offset={isMobile ? 0 : 10} direction="up" className="relative w-full max-w-[520px]">
                <motion.div
                  initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.97, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: isReducedMotion ? 0.01 : 1.0,
                    delay: isReducedMotion ? 0 : 0.6,
                    ease: motionTokens.ease.out,
                  }}
                  whileHover={isReducedMotion || isMobile ? {} : { y: -2, scale: 1.01 }}
                  className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-[var(--radius-2xl)] overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/40 backdrop-blur-xl shadow-[var(--shadow-elevated)]"
                >
                  {/* Inner grid */}
                  <div className="absolute inset-0 grid-dot opacity-[0.03]" />
                  <div className="absolute inset-0 gradient-mesh opacity-40" />

                  {/* Content */}
                  <div className="relative h-full flex flex-col p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                      </div>
                      <span className="text-[10px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium px-2 py-1 rounded-full border border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface))]">
                        3D Showcase • Phase 4
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center gap-6 py-8">
                      <motion.div
                        initial={isReducedMotion ? {} : { scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: isReducedMotion ? 0 : 0.8, duration: 0.5, ease: motionTokens.ease.out }}
                        className="relative"
                      >
                        <div className="h-24 w-24 rounded-[var(--radius-xl)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-lg)]">
                          <div className="h-12 w-12 rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] flex items-center justify-center text-[hsl(var(--background))] font-bold text-[16px]">
                            SB
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        </div>
                      </motion.div>

                      <div className="text-center space-y-2">
                        <p className="text-[14px] font-medium text-[hsl(var(--foreground))]">Interactive 3D Scene</p>
                        <p className="text-[12px] leading-relaxed text-[hsl(var(--foreground-tertiary))] max-w-[260px]">
                          Three.js • R3F • Drei • GLTF models will be integrated here. Premium interactive experience.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {["Three.js", "R3F", "Drei"].map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: isReducedMotion ? 0 : 0.9 + i * 0.05,
                              duration: 0.3,
                              ease: motionTokens.ease.out,
                            }}
                            className="text-[10px] px-2.5 py-1 rounded-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground-tertiary))] font-mono"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[hsl(var(--foreground-tertiary))]">
                      <span className="font-mono">portfolio • hero • v2</span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-[hsl(var(--foreground-tertiary))]" />
                        Ready for Phase 4
                      </span>
                    </div>
                  </div>

                  {/* Ambient glow inside */}
                  <Parallax offset={isMobile ? 0 : 8} className="absolute top-[20%] right-[20%]">
                    <div className="h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.06),transparent_70%)] blur-[20px] pointer-events-none" />
                  </Parallax>
                </motion.div>
              </Parallax>

              {/* Floating cards with subtle entrance */}
              <motion.div
                initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: isReducedMotion ? 0 : 1.0, duration: 0.6, ease: motionTokens.ease.out }}
                className="absolute -top-4 -right-4 hidden lg:flex h-16 w-[180px] rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 backdrop-blur-xl shadow-[var(--shadow-lg)] p-3 items-center gap-3"
              >
                <div className="h-8 w-8 rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] text-[hsl(var(--background))] flex items-center justify-center text-[11px] font-bold">AI</div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-[hsl(var(--foreground))] leading-none">AI Agents</span>
                  <span className="text-[10px] text-[hsl(var(--foreground-tertiary))]">Intelligent systems</span>
                </div>
              </motion.div>

              <motion.div
                initial={isReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, x: -8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: isReducedMotion ? 0 : 1.1, duration: 0.6, ease: motionTokens.ease.out }}
                className="absolute -bottom-6 -left-6 hidden lg:flex h-14 w-[200px] rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--surface))]/80 backdrop-blur-xl shadow-[var(--shadow-lg)] p-3 items-center gap-3"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[12px] text-[hsl(var(--foreground-secondary))]">Building premium experiences</span>
              </motion.div>
            </ScaleIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
