"use client";

import * as React from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Parallax } from "@/components/motion/Parallax";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useMotion } from "@/components/motion/MotionProvider";

export function Showcase3D() {
  const { isReducedMotion, isMobile } = useMotion();

  return (
    <Section id="showcase" spacing="lg" background="secondary" className="border-t border-[hsl(var(--border-subtle))] overflow-hidden">
      <SectionHeading
        label="3D Experience"
        title="Interactive visual showcase."
        description="3D architecture is isolated for performance. Canvas wrapper with lazy loading, Suspense-ready model placeholders, and dynamic import helpers prepared. Assets go in /public/models/."
        align="left"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.1}>
          <Card variant="glass" padding="none" className="overflow-hidden min-h-[400px] lg:min-h-[480px] group">
            <div className="relative h-full min-h-[400px] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[hsl(var(--border-subtle))]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--border-strong))]" />
                  </div>
                  <span className="text-[11px] font-mono text-[hsl(var(--foreground-tertiary))]">/components/3d/Scene.tsx</span>
                </div>
                <Badge variant="glass" size="sm">Phase 4 • R3F + Drei</Badge>
              </div>

              {/* Canvas placeholder with parallax */}
              <div className="flex-1 relative flex items-center justify-center p-8 bg-[hsl(var(--background-secondary))]/50 overflow-hidden">
                <div className="absolute inset-0 grid-dot opacity-[0.03]" />
                <div className="absolute inset-0 gradient-mesh opacity-20" />

                <Parallax offset={isMobile ? 0 : 12} className="relative flex flex-col items-center gap-5 text-center">
                  <motion.div
                    whileHover={isReducedMotion ? {} : { scale: 1.02, y: -2 }}
                    transition={{ duration: 0.3, ease: motionTokens.ease.out }}
                    className="h-20 w-20 rounded-[var(--radius-xl)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center shadow-[var(--shadow-lg)]"
                  >
                    <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[hsl(var(--foreground))] flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--background))]">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.div>
                  <div className="space-y-2">
                    <p className="text-[15px] font-medium text-[hsl(var(--foreground))]">3D Canvas • Isolated Architecture</p>
                    <p className="text-[12px] leading-relaxed text-[hsl(var(--foreground-tertiary))] max-w-[320px]">
                      Lazy loaded via IntersectionObserver. Client-only to keep static content server-renderable. Performance optimized.
                    </p>
                  </div>
                  <Stagger staggerDelay={0.05} delay={0.2} className="flex gap-2">
                    {["Three.js", "React Three Fiber", "Drei", "GLTF"].map((tech) => (
                      <Badge key={tech} variant="technical" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </Stagger>
                </Parallax>

                {/* Ambient with parallax */}
                <Parallax offset={isMobile ? 0 : 15} className="absolute top-[30%] left-[20%]">
                  <div className="h-[200px] w-[200px] rounded-full bg-[radial-gradient(circle,hsla(0,0%,100%,0.05),transparent_70%)] blur-[20px]" />
                </Parallax>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-4 border-t border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface))]/30 text-[11px] font-mono text-[hsl(var(--foreground-tertiary))]">
                <span>CanvasWrapper • lazy + suspense</span>
                <span className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  Ready for models in /public/models/
                </span>
              </div>
            </div>
          </Card>
        </Reveal>

        <Stagger staggerDelay={0.12} delay={0.2} className="flex flex-col gap-4">
          <motion.div
            whileHover={isReducedMotion ? {} : { y: -1 }}
            transition={{ duration: 0.2, ease: motionTokens.ease.out }}
          >
            <Card variant="default" className="p-6">
              <h4 className="text-[13px] font-medium tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] mb-4">Architecture Highlights</h4>
              <div className="space-y-4">
                {[
                  { title: "Isolated Client Components", desc: "3D doesn't make entire app client-side" },
                  { title: "Lazy Loading", desc: "IntersectionObserver triggers load" },
                  { title: "Suspense Ready", desc: "Model placeholders with fallback" },
                  { title: "Performance", desc: "Dynamic imports, no huge assets in Phase 2" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground-tertiary))] flex-shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium text-[hsl(var(--foreground))]">{item.title}</p>
                      <p className="text-[12px] text-[hsl(var(--foreground-tertiary))]">{item.desc}</p>
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
              <h4 className="text-[13px] font-medium text-[hsl(var(--foreground))] mb-3">Future Implementation</h4>
              <div className="rounded-[var(--radius-md)] bg-[hsl(var(--background))] border border-[hsl(var(--border-subtle))] p-3 font-mono text-[11px] leading-relaxed text-[hsl(var(--foreground-tertiary))]">
                <div className="text-[hsl(var(--foreground-secondary))]">{"// Phase 4"}</div>
                <div>{"const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })"}</div>
                <div className="mt-2 text-[hsl(var(--foreground-secondary))]">{"// Canvas with lights, model, controls"}</div>
                <div>{"<Canvas camera={{`{ position: [0,0,5] }`}}>"}</div>
                <div>{"  <Model />"}</div>
                <div>{"</Canvas>"}</div>
              </div>
            </Card>
          </motion.div>
        </Stagger>
      </div>
    </Section>
  );
}
