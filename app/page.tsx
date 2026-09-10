/**
 * Homepage - Phase 3 Premium Animation & Interaction System
 * Professional engineering portfolio with motion, smooth scrolling, and refined interactions
 */

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Agents } from "@/components/sections/Agents";
import { Skills } from "@/components/sections/Skills";
import { Showcase3D } from "@/components/sections/Showcase3D";
import { Contact } from "@/components/sections/Contact";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero - with page entrance animation */}
      <Hero />

      {/* Design system verification - premium with stagger */}
      <Section spacing="sm" background="secondary" className="border-y border-[hsl(var(--border-subtle))]">
        <Container>
          <div className="flex flex-col gap-8">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="glass" size="sm" className="gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Animation System • Phase 3
                </Badge>
                <span className="text-[11px] tracking-widest uppercase text-[hsl(var(--foreground-tertiary))] font-medium">
                  Framer Motion + Lenis • Verified
                </span>
              </div>
              <span className="text-[12px] text-[hsl(var(--foreground-tertiary))]">
                Premium motion • Scroll progress • Active nav • Reduced-motion safe
              </span>
            </Reveal>

            <Stagger staggerDelay={0.08} delay={0.1} className="grid gap-4 md:grid-cols-3">
              <Card variant="glass" className="p-5 h-full hover:translate-y-[-2px] transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-[var(--radius-sm)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center text-[11px]">✓</div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Framer Motion + Lenis
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                  Centralized motion architecture, single Lenis instance, scroll progress, active section detection.
                </p>
              </Card>

              <Card variant="glass" className="p-5 h-full hover:translate-y-[-2px] transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-[var(--radius-sm)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center text-[11px]">✓</div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Reveal & Stagger
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                  Viewport-triggered reveals, 15-25% trigger, once, 50-100ms stagger, opacity + y transform.
                </p>
              </Card>

              <Card variant="glass" className="p-5 h-full hover:translate-y-[-2px] transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-[var(--radius-sm)] bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center text-[11px]">✓</div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Micro-interactions
                  </h3>
                </div>
                <p className="text-[13px] leading-relaxed text-[hsl(var(--foreground-secondary))]">
                  Hover lift, magnetic CTA, glass depth, button press, parallax subtle, reduced-motion safe.
                </p>
              </Card>
            </Stagger>

            <Reveal delay={0.2} className="flex flex-wrap gap-2">
              {[
                "Framer Motion 12",
                "Lenis 1.3",
                "Scroll Progress 1px",
                "Active Section",
                "Magnetic 4-8px",
                "Parallax -10→10px",
                "Reduced Motion",
                "Mobile Optimized",
                "No Layout Shift",
              ].map((tag) => (
                <Badge key={tag} variant="secondary" size="sm">
                  {tag}
                </Badge>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* About - Professional summary placeholder */}
      <About />

      {/* Experience - Timeline */}
      <Experience />

      {/* Featured Projects */}
      <Projects />

      {/* AI / Agents */}
      <Agents />

      {/* Skills */}
      <Skills />

      {/* 3D Showcase - Architecture (placeholder remains) */}
      <Showcase3D />

      {/* Contact */}
      <Contact />
    </div>
  );
}
