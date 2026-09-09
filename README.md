# Sejal Bharambe — Portfolio

Premium portfolio website for **Software Developer + AI Engineer** with 2+ years of professional experience.

> **Phase 1 — Foundation & Architecture** — Production-ready foundation prepared for premium UI, animations, and 3D experience in later phases.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 + Design Tokens
- **UI:** React 19
- **Linting:** ESLint 9 + eslint-config-next
- **Package Manager:** npm

**Prepared for future phases:**
- Framer Motion (animations)
- Three.js + React Three Fiber + Drei (3D)
- Lenis / Smooth scrolling
- Glassmorphism UI system

## Project Architecture

```
portfolio/
├── app/
│   ├── globals.css        # Tailwind + tokens + base styles
│   ├── layout.tsx         # Root layout with SEO & a11y
│   ├── page.tsx           # Foundation placeholder homepage
│   └── not-found.tsx      # 404 handling
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (placeholder in Phase 1)
│   ├── ui/                # Reusable UI primitives (Button, Card, etc)
│   └── 3d/                # Isolated 3D architecture (R3F ready)
├── data/                  # Data-driven content (profile, projects, etc)
├── lib/                   # Utilities, constants, SEO helpers
├── types/                 # Strict TypeScript interfaces
├── public/
│   ├── images/            # Portfolio images (future)
│   ├── models/            # GLTF/GLB models (future)
│   ├── icons/             # Icons & favicons
│   └── resume/            # Resume PDF
├── styles/
│   └── tokens.css         # Design token foundation
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── tsconfig.json
```

### Architecture Principles

- **Component-driven:** UI primitives separated from sections
- **Data-driven:** Content from `data/` files, not hardcoded JSX
- **Separation of concerns:** UI / data / utils / types / 3D / animation logic isolated
- **Scalability:** Add projects/agents by editing data files
- **Performance:** 3D isolated to prevent whole app becoming client-side, lazy loading ready

## Data Models

Types prepared for:

- **Profile:** name, title, summary, location, email, github, linkedin, resume, yearsOfExperience
- **Project:** id, name, description, category, technologies, highlights, githubUrl, liveUrl, featured, image
- **Experience:** company, role, startDate, endDate, description, achievements, technologies
- **Skill:** name, category, icon, level
- **AI Agent:** id, name, description, capabilities, technologies, tools, architecture, githubUrl, liveUrl, featured

All data files contain TODO placeholders — no fake data invented in Phase 1.

## Design Tokens (Foundation)

Prepared in `styles/tokens.css` and `tailwind.config.ts`:

- Background, Foreground, Muted, Border, Surface, Accent
- Radius (sm, md, lg, xl, full)
- Shadows (soft, medium, large, glow)
- Glass surfaces (ready for Phase 2)
- Spacing scale
- Dark theme primary, light theme support prepared

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

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Deployment

Frontend-only, no backend/database/auth.

Deployable as static frontend to:

- Vercel (recommended for Next.js)
- Netlify
- Cloudflare Pages
- Any static hosting with Node support

Build output is optimized via Next.js.

## Future Phases Overview

### Phase 2 — Premium UI & Visual System
- Glassmorphism UI
- Gradient backgrounds, ambient lighting
- Typography system
- Premium dark theme polish

### Phase 3 — Animations & Interactions
- Framer Motion integration
- Scroll-triggered animations
- Page transitions
- Micro-interactions, parallax, smooth scrolling (Lenis)

### Phase 4 — 3D Experience
- Three.js + R3F + Drei setup
- GLTF/GLB models
- Interactive 3D hero / background
- Performance-optimized canvas

### Phase 5 — Content & Sections
- Projects showcase
- Experience timeline
- Skills visualization
- AI Agents showcase
- Resume integration
- Contact with external service if needed

### Phase 6 — Polish
- SEO optimization
- Performance audit
- Accessibility audit
- Analytics

## Accessibility Foundation

- Semantic HTML
- Proper heading hierarchy
- Skip to content link
- Keyboard accessible navigation
- Focus states
- Reduced motion support
- Meaningful alt text ready

## Performance Principles

- Server components by default
- 3D components isolated as client-only
- Lazy loading for 3D via IntersectionObserver
- Optimized images (AVIF/WebP)
- No unnecessary dependencies
- No huge assets in Phase 1

## Git & Security

- `.gitignore` covers env files, build outputs, heavy 3D assets
- No secrets committed
- No `.env` files in repo
- `.env.example` will be added only if needed in future phases

## License

Private portfolio — All rights reserved.

---

**Phase 1 Status:** Foundation complete, verified via `npm run dev`, `npm run build`, `npm run lint`. Ready for Phase 2.
