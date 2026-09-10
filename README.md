# Sejal Bharambe — Portfolio

Premium portfolio website for **Software Developer + AI Engineer** with 2+ years of professional experience.

> **Phase 6 — Advanced Projects & Experience Showcase** — Premium project showcase with featured treatment, accessible category filters, static case-study routes (`/projects/[slug]`) and an enhanced experience timeline. All content data-driven from `data/`, no invented facts.

## Tech Stack

- **Framework:** Next.js 15.5.25 (App Router)
- **Language:** TypeScript 5.8 strict
- **Styling:** Tailwind CSS 4.1 + Design Tokens (premium dark-first)
- **UI:** React 19
- **Animation:** Framer Motion 12.43 + Lenis 1.3.26 smooth scrolling
- **3D:** Three.js 0.176.0 + @react-three/fiber 9.7.0 + @react-three/drei 10.7.8
- **Linting:** ESLint 9 + eslint-config-next
- **Package Manager:** npm

## Project Architecture

```
portfolio/
├── app/
│   ├── globals.css        # Tailwind + tokens + premium utilities
│   ├── layout.tsx         # Root layout with MotionProvider + ScrollProgress + SEO
│   ├── page.tsx           # Premium homepage with all sections
│   ├── icon.svg           # Favicon
│   ├── not-found.tsx
│   └── projects/[slug]/   # Project case-study routes - SSG, data-driven, per-page metadata + not-found boundary
├── components/
│   ├── layout/            # Header (scroll state + active nav), Footer, Navigation (active + mobile)
│   ├── sections/          # Hero (3D integrated), About, Experience (timeline + expandable), Projects (featured + filters), AIEngineering, Skills, Education, Showcase3D (interactive), Contact
│   ├── projects/          # ProjectVisual (monogram/image identity), ProjectCard (default/featured), ProjectFilters (accessible), ProjectDetail (case-study view)
│   ├── ui/                # Button (primary/secondary/glass...), Card (glass/elevated/interactive), Badge, Container, Section, SectionHeading, GlassSurface, Divider, IconButton, Link, Background (AmbientGlow/Grid/Noise/GradientMesh)
│   ├── motion/            # MotionProvider (Lenis single instance + reduced-motion), FadeIn, Reveal, Stagger, MotionSection, ScaleIn, SlideIn, Parallax, Magnetic, ScrollProgress, PageEntrance
│   └── 3d/                # CanvasWrapper (client-only, DPR, WebGL check), HeroScene, ShowcaseScene, CoreObject (AI Engineering Core), TechOrbit (rings/nodes/lines), Lighting, CameraRig, PointerRig, ScrollRig, Environment, ModelLoader (GLB/GLTF), ModelPlaceholder, ErrorBoundary, LoadingFallback
├── data/                  # profile, projects, experience, skills, ai, credentials (real CV data)
├── lib/                   # utils, constants, seo, motion tokens (duration/ease/spring/stagger/distance/scale + lenisConfig)
├── types/                 # Strict interfaces: profile, project, experience, skill, ai, credentials, common (SocialLink)
├── public/
│   ├── images/            # Portfolio images
│   ├── models/            # GLB/GLTF models (architecture ready, no fake assets)
│   ├── icons/             # Favicons
│   └── resume/            # Resume PDF
├── styles/
│   └── tokens.css         # Premium design tokens: background/surface/foreground/border/accent/success/warning/error, glass, radius xs-2xl, shadows xs-2xl/glass/elevated, spacing 3xs-8xl, typography 3xs-8xl, leading/tracking/weights, container, header, z-index, ease/duration
├── next.config.ts         # optimizePackageImports: framer-motion, lenis, three...
├── tailwind.config.ts     # Mapped all tokens
├── postcss.config.mjs
├── eslint.config.mjs      # Flat config with FlatCompat next/core-web-vitals + next/typescript
└── tsconfig.json          # Strict, no any, paths @/*
```

### Architecture Principles

- **Component-driven:** UI primitives separated from sections, motion isolated, 3D isolated
- **Data-driven:** Content from `data/` files, not hardcoded JSX, scalable via data only
- **Separation of concerns:** UI / data / utils / types / 3D / motion / animation logic isolated
- **Client-only boundaries:** Server page → Client 3D wrapper → R3F Canvas → Scene, browser APIs guarded
- **Performance:** 3D isolated, lazy IntersectionObserver, DPR 1→1.5 desktop 1→1.25 mobile, low-poly, no setState/frame, one global scroll controller

## 3D Architecture

**Stack:** Three.js 0.176.0 + React Three Fiber 9.7.0 + Drei 10.7.8

**Structure:**
- `CanvasWrapper` — client-only, mounted check, lazy IntersectionObserver 15% threshold, WebGL detection via canvas.getContext, DPR control mobile 1→1.25 desktop 1→1.5, gl antialias (!mobile), alpha, high-performance, toneMapping ACESFilmic, loading fallback, error boundary, accessibility sr-only label
- `HeroScene` / `ShowcaseScene` — dynamic import ssr:false, loading fallback, isolated
- `CoreObject` — AI Engineering Core: inner core icosahedron 0.6×, central core icosahedron 0.7-0.9, wireframe overlay 0.08 opacity, translucent shell MeshPhysicalMaterial transmission 0.2 opacity 0.08, orbital rings, technical nodes, connection lines, central emissive accent, slow rotation 0.05-0.08, breathing shell
- `TechOrbit` — OrbitalSystem 2-3 torus rings radius 1.5-2.5 thickness 0.008-0.012 opacity 0.25-0.6 slow rotation 0.04-0.1, TechnicalNodes 4-8 generic labels API/AI/DATA/WEB/SYSTEM/CLOUD/DB/ML size 0.05-0.06 emissive, hover scale 1.2 emissive 0.5, ConnectionLines thin LineBasicMaterial opacity 0.15-0.25
- `Lighting` — ambient 0.4, key directional 0.8, fill 0.3 cool, rim 0.4, hemisphere 0.3, point 0.5 hero, spot 0.3 showcase, mobile intensity 0.7×, no shadows
- `CameraRig` — perspective FOV 45-50 responsive, position 0,0,5-6, smooth lerp delta*2, pointer offset 0.15/0.1 restrained, scroll offset 0.3, lookAt 0,0,0
- `PointerRig` — pointer -1→1, target rotation y x*0.12, x y*0.08, lerp delta*2.5, disabled touch/reduced
- `ScrollRig` — scrollProgress 0→1 subtle rotation 0.3 rad + pos y 0.2
- `Environment` — minimal, CSS background provides atmosphere, no HDR for performance
- `ModelLoader` — useGLTF abstraction, ModelWithFallback checks exists via fetch HEAD, preload helper, Suspense fallback, no fake files
- `ErrorBoundary` — catches WebGL errors, premium static fallback, doesn't break rest of portfolio
- `LoadingFallback` — glass container, grid-dot, gradient-mesh, SB mark pulse, dots bounce, WEBGL•R3F•DREI label
- `PremiumStaticFallback` — same visual language for WebGL unavailable

**Performance Strategy:**
- Low-poly icosahedron 1-2 subdiv, not high-poly
- MeshStandardMaterial / MeshPhysicalMaterial limited transmission (one shell only)
- 4 lights, no shadows, no post-processing (no bloom/DOF)
- DPR limited 1→1.5 desktop, 1→1.25 mobile, not window.devicePixelRatio unlimited
- useFrame direct transforms, no setState every frame, no React re-render loop
- Frustum culling default, object reuse, instancing where useful, simple materials
- Mobile reduction: fewer rings (2 vs 3), fewer nodes (3 vs 6-8), no connection lines, no pointer rig, lower DPR, no expensive transparent effects, reduced animation 0.5×

**Reduced-Motion:**
- Integrates MotionProvider isReducedMotion via matchMedia
- Disables continuous rotation, parallax, pointer, orbital, scroll-driven, shows static or premium fallback
- Content readable without WebGL

**WebGL Fallback:**
- Detection via canvas.getContext('webgl'), if unavailable → premium static fallback matching Phase 2 glass design (SB mark, grid, gradient, message)
- ErrorBoundary catches crashes, fallback same visual language, no stack traces, portfolio remains fully usable
- Canvas aria-hidden decorative or accessible label, no focus trap

**Visual Language:**
- Near-black #0a0a0a, graphite #1a1a1a-2a2a2a, frosted translucent shell 0.08 opacity, soft white highlights, desaturated cool accents #9fa0a8, subtle emissive, no neon rainbow, integrated with existing UI

**Concept — AI Engineering Core:**
```
                 technical node
                      ○
                      |
              ────────┼────────
            /         │         \
         ○            ◎            ○
            \       CORE        /
              ───────┼────────
                     │
                  orbit
```
Central precision object: geometric core + layered translucent shell + orbital rings + technical nodes + connection lines + emissive accents — visualization of modern software/AI system, lightweight, original not generic spinning sphere.

## Motion System

- **Framer Motion 12** + **Lenis 1.3** single instance, centralized MotionProvider
- **Tokens:** duration fast 0.15 normal 0.25 medium 0.4 slow 0.6 hero 1.0, ease out [0.16,1,0.3,1] Apple/Linear, stagger fast 0.05 normal 0.08, distance 8/16/24, scale subtle 0.97
- **Lenis:** lerp 0.08 weighted natural, duration 1.2, smoothWheel true, smoothTouch false, wheelMultiplier 1, touchMultiplier 1.5, anchor offset -80 header, pushState hash
- **Components:** FadeIn, Reveal (20% amount once), Stagger (50-100ms), MotionSection, ScaleIn (0.97→1), SlideIn, Parallax (-10→10px spring), Magnetic (4-8px max strength 0.15 spring 300/20), ScrollProgress (1px top useScroll+spring), PageEntrance (stagger 0.08 opacity+y 16)
- **Hero:** Background immediate → Header → Status badge → Headline words stagger → Supporting → Meta badges → CTA magnetic → Experience indicators → Visual ScaleIn → Floating cards
- **Performance:** transform/opacity/filter only, IntersectionObserver, viewport APIs, RAF, cleanup, one global scroll controller

## Data Models

- **Profile:** name, title, titleSecondary, cvTitle, summary, location, email, phone, github, linkedin, resume (Phase 8), yearsOfExperience
- **SiteMetadata / NavigationLinks / SocialLinks:** SEO, nav and real social links (GitHub, LinkedIn, Email)
- **Project:** id (slug), name, label, description, category, technologies, capabilities, engineeringFocus, githubUrl, liveUrl, featured, image (optional - no fake screenshots), year, status
- **Experience:** company, role, focus (project context), startDate, endDate, description, achievements, technologies, type
- **Skill:** name, category, proficiency (self-assessed 0-100), featured — grouped via `skillGroupOrder`
- **AIFocusArea:** id, title, description, technologies, context — real AI work areas (replaces Phase 1 Agent placeholder; no invented agent names)
- **Education / Certification / Achievement:** degrees, certifications and milestones
- No fake data invented

## Development Setup

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+

### Install
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open http://localhost:3000

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

### Audit
```bash
npm audit
```
Existing 2 vulnerabilities (postcss in next) transitive, not new, not introduced by three.

## Deployment

Frontend-only, no backend/database/auth. Deployable to Vercel (recommended), Netlify, Cloudflare Pages. Build optimized, static prerendered, WebGL fallback ensures usability without WebGL.

## Phases Overview

- **Phase 1 — Foundation:** Next.js 15 + TS strict + Tailwind + ESLint + architecture + data models + SEO + a11y + responsive + performance principles — COMPLETE
- **Phase 2 — Premium Visual System:** Dark-first near-black, glassmorphism strategic, typography hierarchy, color/spacing/container/border/shadow tokens, navigation/footer redesign, button/card/badge/section systems, hero foundation, background system (ambient glow/grid/noise/gradient mesh), micro-interactions, responsive, accessible — COMPLETE `b200066`
- **Phase 3 — Animation & Interaction:** Framer Motion + Lenis, central motion architecture, page entrance, hero motion, section reveal, heading stagger, card stagger, project hover, glass depth, button micro-interactions, magnetic 4-8px, nav scroll state + active detection, mobile nav animation, scroll progress 1px, anchor scrolling, parallax -10→10, reduced-motion, mobile optimized, no layout shift — COMPLETE `ea6837e`
- **Phase 4 — 3D Experience:** Three.js + R3F + Drei, isolated client-only canvas, WebGL detection/fallback/loading/error boundary, AI Engineering Core (icosahedron core + translucent shell + orbital rings + technical nodes + connection lines), materials Standard/Physical, lighting soft key/fill/rim/ambient, camera rig responsive smooth, pointer rig ±0.12 rad damping, scroll rig subtle, hero + showcase scenes, mobile reduction DPR 1.25 no pointer, reduced-motion static, performance budget, no post-processing, no generic template, matches visual language — COMPLETE
- **Phase 5 — Content:** Real CV data — profile, hero, about, experience (4 roles), projects (Sophora, AquaBlouse, Resumint), AI Engineering (real work areas, OpenAI/DeepSeek APIs), skills (self-assessed proficiency), education, certifications, achievements, real contact + social links, SEO content foundation — COMPLETE
- **Phase 6 — Advanced Projects & Experience Showcase:** Featured project treatment (Resumint), premium project cards (category/description/technology/capabilities), accessible category filters (All/AI/E-Learning/E-Commerce), static project case-study routes /projects/[slug] (metadata, prev/next, not-found boundary), ProjectVisual monogram system (image-ready), experience timeline with role markers + project context + expandable responsibilities, subroute-safe anchor navigation — COMPLETE
- **Phase 7+ — NEXT:** AI engineering advanced functionality, resume system, contact service, final SEO/performance/a11y audits, production deployment

## Accessibility

- Semantic HTML, heading hierarchy, skip link, keyboard nav, focus ring 2px foreground, visible focus, reduced-motion support (disables 3D motion/parallax/magnetic), screen-reader, meaningful alt, WebGL decorative aria-hidden or accessible label, no focus trap, no information only inside 3D, content readable without WebGL, fallback premium static

## Performance

- Server components default, 3D isolated client-only, lazy IntersectionObserver 15% threshold, DPR 1→1.5 desktop 1→1.25 mobile, low-poly, simple materials, 4 lights no shadows, no post-processing, no huge textures, useFrame direct no setState/frame, one global scroll controller, optimized imports, AVIF/WebP images, no unnecessary deps, no huge assets

## Git & Security

- .gitignore covers env, build, heavy 3D assets (.blend/.fbx/.obj/.hdr/.exr), no secrets, no .env, .env.example only if needed

## License

Private portfolio — All rights reserved.

---

**Phase 6 Status:** Advanced project showcase and experience timeline integrated, verified via `npm run dev`, `npm run build`, `npm run lint`. Static SSG project routes (`/projects/sophora`, `/projects/aquablouse`, `/projects/resumint`), data-driven, no fabricated facts, no fake URLs or screenshots.
