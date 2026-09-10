"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { CanvasWrapper } from "@/components/3d/CanvasWrapper";
import { ShowcaseLoadingFallback } from "@/components/3d/LoadingFallback";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

const ShowcaseScene = dynamic(
  () => import("@/components/3d/ShowcaseScene").then((mod) => mod.ShowcaseScene),
  {
    ssr: false,
    loading: () => <ShowcaseLoadingFallback />,
  }
);

export function Showcase3D() {
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <Section id="showcase" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))] overflow-hidden">
      <SectionHeading
        label="3D Laboratory"
        title="Interactive engineering visualization."
        description="Premium WebGL experience built with Three.js + React Three Fiber + Drei. Isolated architecture, client-only, performance-aware, reduced-motion safe, WebGL fallback included."
        align="left"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.1} className="h-full">
          <Card variant="glass" padding="none" className="overflow-hidden min-h-[480px] lg:min-h-[560px] group h-full">
            <div className="relative h-full min-h-[480px] lg:min-h-[560px] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border-subtle))] z-10 bg-[hsl(var(--surface))]/40 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                  </div>
                  <span className="text-[11px] font-mono text-[hsl(var(--foreground-tertiary))]">/components/3d/ShowcaseScene.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="glass" size="sm" className="gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Interactive
                  </Badge>
                  <Badge variant="technical" size="sm">R3F • Drei</Badge>
                </div>
              </div>

              {/* 3D Canvas */}
              <div className="flex-1 relative bg-[hsl(var(--background-secondary))]/50 overflow-hidden">
                <div className="absolute inset-0 grid-dot opacity-[0.02]" />
                <CanvasWrapper variant="showcase" className="h-full w-full border-0 rounded-none bg-transparent shadow-none min-h-[400px] lg:min-h-[480px]">
                  <ShowcaseScene />
                </CanvasWrapper>

                {/* Ambient with parallax */}
                <Parallax offset={isMobile ? 0 : 12} className="absolute top-[20%] right-[15%] pointer-events-none">
                  <div className="h-[250px] w-[250px] rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.06),transparent_70%)] blur-[30px]" />
                </Parallax>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface))]/40 backdrop-blur-sm text-[11px] font-mono text-[hsl(var(--foreground-tertiary))] z-10">
                <span className="flex items-center gap-2">
                  <span>Three.js 0.176 • R3F 9.7 • Drei 10.7</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">DPR {isMobile ? "1→1.25" : "1→1.5"} • No post-processing</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  Real-time WebGL
                </span>
              </div>
            </div>
          </Card>
        </Reveal>

        <Stagger staggerDelay={0.1} delay={0.2} className="flex flex-col gap-4">
          <motion.div
            whileHover={isReducedMotion ? {} : { y: -1 }}
            transition={{ duration: 0.2, ease: motionTokens.ease.out }}
          >
            <Card variant="default" className="p-6">
              <h3 className="text-[13px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] mb-4">Architecture Highlights</h3>
              <div className="space-y-4">
                {[
                  { title: "AI Engineering Core", desc: "Central icosahedron + translucent shell + inner core, layered precision" },
                  { title: "Orbital System", desc: "2-3 torus rings, slow rotation 0.04-0.1, pause mobile/reduced" },
                  { title: "Technical Nodes", desc: "4-8 nodes API/AI/DATA/WEB/SYSTEM, hover emissive scale 1.2, generic labels" },
                  { title: "Connection Lines", desc: "Thin low-opacity lines 0.15-0.25, elegant not network graph" },
                  { title: "Isolated Performance", desc: "CanvasWrapper client-only, lazy IntersectionObserver, DPR 1→1.5 desktop 1→1.25 mobile" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium text-[hsl(var(--foreground))]">{item.title}</p>
                      <p className="text-[12px] text-[hsl(var(--foreground-tertiary))] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            whileHover={isReducedMotion ? {} : { y: -1 }}
            transition={{ duration: 0.2, ease: motionTokens.ease.out }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-[13px] font-medium text-[hsl(var(--foreground))] mb-3">Performance Strategy</h3>
              <div className="space-y-3 text-[12px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                <div className="flex justify-between py-1.5 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[hsl(var(--foreground-tertiary))] uppercase tracking-wide text-[11px]">Geometry</span>
                  <span className="font-mono">Low-poly icosahedron 1-2 subdiv</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[hsl(var(--foreground-tertiary))] uppercase tracking-wide text-[11px]">Materials</span>
                  <span className="font-mono">Standard/Physical, no heavy transmission</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[hsl(var(--foreground-tertiary))] uppercase tracking-wide text-[11px]">Lights</span>
                  <span className="font-mono">4 directional + ambient, no shadows</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[hsl(var(--border-subtle))]">
                  <span className="text-[hsl(var(--foreground-tertiary))] uppercase tracking-wide text-[11px]">Animation</span>
                  <span className="font-mono">useFrame direct, no setState/frame</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[hsl(var(--foreground-tertiary))] uppercase tracking-wide text-[11px]">Mobile</span>
                  <span className="font-mono">Reduced rings/nodes, DPR 1.25, no pointer</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <Card variant="outlined" className="p-4 border-dashed">
            <p className="text-[11px] font-mono text-[hsl(var(--foreground-tertiary))] leading-relaxed">
              {"// Future: GLB replacement without rewrite"}<br />
              {"<ModelWithFallback modelPath='/models/core.glb' fallback={<CoreObject />} />"}<br />
              <span className="text-[hsl(var(--foreground-secondary))]">No fake assets — procedural built with primitives</span>
            </p>
          </Card>
        </Stagger>
      </div>
    </Section>
  );
}
