---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
  - _bmad-output/planning-artifacts/product-brief-portfolio-2026-03-13.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2026-03-13'
project_name: 'portfolio'
user_name: 'Ben'
date: '2026-03-13'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The PRD defines 27 functional requirements across 6 categories. Architecturally, these decompose into:

- **Content Presentation (FR1–FR7):** Static HTML rendering of value proposition, case studies, skills, and about section. The 3D hero (FR5) is the only section requiring client-side JavaScript hydration. WebGL fallback (FR6) requires a detection and degradation strategy. Console.log easter egg (FR7) is trivially implemented at build time.
- **Contact & Conversion (FR8–FR12):** Form state management (React island), dual-path radio selector, client-side validation, submission to a form provider API, email notification relay. The form is one of only two React hydration points in the entire site.
- **Navigation & Structure (FR13–FR15):** Persistent nav with scroll-triggered glassmorphism effect. Requires minimal client-side JS (IntersectionObserver) — not a React island. Mobile hamburger menu requires JS for open/close state.
- **SEO & Discoverability (FR16–FR20):** All build-time concerns — Astro sitemap integration, robots.txt, JSON-LD `Person` schema, OG/Twitter Card meta, image alt text. Zero runtime implications.
- **Case Study System (FR21–FR23):** Astro Content Collections with Markdown/MDX files and defined schemas. Adding a case study = adding a `.mdx` file. No component changes required.
- **Performance (FR24–FR25):** R3F island loads only with WebGL support and viewport visibility (`client:visible`). Non-hero pages have zero React runtime.
- **Content Management (FR26–FR27):** Content Collections for case studies, centralised config file for site metadata.

**Non-Functional Requirements:**

| Category | Architectural Impact |
|---|---|
| **Performance** | LCP ≤ 2.5s, Lighthouse ≥ 90 on all pages including R3F hero. JS budget: ≤ 200KB gzipped (hero page), ≤ 10KB (non-hero). Forces island architecture with aggressive code splitting. |
| **Accessibility** | WCAG 2.1 AA. Semantic HTML structure, keyboard navigation, `prefers-reduced-motion` support, `aria-hidden` on decorative 3D. Verified by axe-core + manual testing. |
| **Reliability** | Fully static CDN-served. No server runtime. Form provider SLA ≥ 99.9%. |
| **Security** | No auth, no session state, no user data storage. Contact form handled by third-party provider. HTTPS enforced by hosting platform. CSP headers at edge. |
| **Maintainability** | New case study ≤ 30 min. Metadata update ≤ 15 min (single config file). Auto-deploy on `git push main`. |

**Scale & Complexity:**

- Primary domain: Static web application (MPA)
- Complexity level: Low — no database, no auth, no multi-tenancy, no real-time features, no regulated compliance
- Estimated architectural components: 15 UI components, 2 React hydration islands, 1 content collection, 1 form provider integration
- Traffic expectation: Low volume (portfolio), CDN-served — no scaling concerns

### Technical Constraints & Dependencies

1. **Astro island architecture** — React components hydrate only at explicit `client:*` boundaries. 3D and form are the two islands. Everything else is zero-JS static HTML.
2. **React Three Fiber bundle size** — R3F + drei + Three.js is the largest dependency (~150KB gzipped). Must be code-split and lazy-loaded behind `client:visible`.
3. **Fontshare fonts** — Clash Display + Satoshi self-hosted as WOFF2 subsets (~45KB total). Must use `font-display: swap`.
4. **Free-tier hosting** — Vercel or Netlify free tier. Build limits and bandwidth are generous for a portfolio but constrain CI complexity.
5. **No CMS at MVP** — Content lives in the repo as Markdown/MDX. CMS migration is a Phase 3 concern.
6. **Solo developer** — Ben is building alongside university and full-time employment. Architecture must be simple enough for one person to maintain.

### Cross-Cutting Concerns Identified

- **Performance budgeting** permeates every decision — the 3D hero must not compromise Lighthouse scores. This affects component architecture (island boundaries), asset loading (lazy, deferred), and animation strategy (GPU-only transforms).
- **SEO** touches every page template — title tags, meta descriptions, structured data, semantic HTML, image optimization all implemented at the Astro page/layout level.
- **Accessibility** is not a bolt-on — it's built into semantic structure, focus management, motion preferences, contrast ratios, and touch targets from day one.
- **CMS-readiness** means content is structured (Content Collections with schemas) even though no CMS is deployed. The content layer is architecturally separated from the presentation layer.

---

## Starter Template Evaluation

### Primary Technology Domain

Static web application (MPA) based on the PRD's explicit technology decisions: Astro + React Three Fiber + Tailwind CSS.

### Starter Options Considered

The PRD explicitly specifies the technology stack. The primary question is which Astro starter template provides the best foundation.

**Option 1: `create astro@latest` — Official Astro CLI (empty template)**
- Provides: Astro project scaffolding, TypeScript config, basic project structure
- Does not provide: Tailwind, React integration, any components
- Pros: Cleanest starting point, no code to remove, full control
- Cons: Requires manual addition of integrations

**Option 2: `create astro@latest` with blog template**
- Provides: Content Collections preset, layout patterns, Markdown rendering
- Cons: Blog-specific structure would need significant modification for portfolio use case

**Option 3: Custom community portfolio starter**
- Cons: Opinionated component code that would need rewriting; risk of outdated dependencies

### Selected Starter: Official Astro CLI (Empty Template)

**Rationale for Selection:**
The empty template is correct for this project because:
1. The portfolio has a specific and unique design system — no starter provides the right visual foundation
2. The component set is small (15 components) and custom — a starter's prefab components would be liabilities
3. Integrations (React, Tailwind, sitemap) are added with single Astro CLI commands — no benefit to a pre-configured template
4. Ben's skill level (intermediate, working professionally with Vue/Laravel) means the setup cost of an empty template is minimal

**Initialization Command:**

```bash
npm create astro@latest portfolio -- --template minimal --typescript strict
cd portfolio
npx astro add react
npx astro add tailwind
npx astro add sitemap
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- TypeScript in strict mode — type safety for content schemas and component props
- Node.js runtime for build process only (no server runtime)

**Styling Solution:**
- Tailwind CSS via `@astrojs/tailwind` integration — utility-first, purged at build time, Astro-native

**Build Tooling:**
- Vite (built into Astro) — fast HMR in development, optimized production builds
- Astro CLI for build, dev server, preview

**Testing Framework:**
- Not provided by starter — added separately (Vitest for unit tests, Playwright for E2E)

**Code Organization:**
- `src/pages/` for file-based routing
- `src/layouts/` for page templates
- `src/components/` for reusable UI
- `src/content/` for Content Collections
- `public/` for static assets

**Development Experience:**
- Hot Module Replacement via Vite
- TypeScript autocompletion and type checking
- Astro Dev Toolbar for island debugging

**Note:** Project initialization using this command should be the first implementation story.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Framework architecture (Astro MPA + React islands) — decided in PRD
- Styling system (Tailwind CSS) — decided in PRD
- 3D runtime (React Three Fiber + drei) — decided in PRD
- Content architecture (Astro Content Collections) — decided in PRD
- Hosting platform (Vercel or Netlify) — decided in PRD

**Important Decisions (Shape Architecture):**
- Form submission provider
- Testing framework selection
- Font loading strategy
- Image optimization approach
- Animation library selection

**Deferred Decisions (Post-MVP):**
- CMS selection (Phase 3)
- Analytics provider
- Blog/writing infrastructure
- Booking integration

### Frontend Architecture

**Framework: Astro v5.x (latest stable)**

- Static Site Generation (SSG) — all pages pre-rendered to HTML at build time
- File-based routing via `src/pages/`
- Island architecture: React components hydrate only at `client:visible` or `client:load` boundaries
- Zero JavaScript shipped by default on any page where no islands exist

**3D Runtime: React Three Fiber v9.x + @react-three/drei v10.x + Three.js r171+**

- R3F Canvas is a single React island, rendered only in the hero section
- `client:visible` directive ensures Three.js bundle is not fetched until hero enters viewport
- Scene: `IcosahedronGeometry` + `MeshTransmissionMaterial` (glass effect, no textures)
- Lighting: Single `directionalLight` + `ambientLight` — no HDRI, no environment presets
- Performance guards: `dpr={[1, 2]}`, `frameloop="demand"`, mobile-safe material settings (`samples={4}`, `resolution={512}`)
- Wrapped in `<Suspense>` with CSS gradient fallback for CLS prevention
- WebGL detection: check `navigator.userAgent` or `HTMLCanvasElement.prototype.getContext('webgl2')` — if unavailable, render static gradient only

**Animation: Framer Motion v12.x**

- Used exclusively for scroll-triggered entrance animations (`whileInView`)
- GPU-composited properties only: `opacity` and `transform`
- `viewport={{ once: true }}` — animate once, never re-animate on re-scroll
- Stagger pattern: parent `staggerChildren: 0.06` (60ms), children `opacity + translateY`
- `AnimatePresence` for contact form success/error state transitions
- `prefers-reduced-motion` respected: animations disabled entirely
- Framer Motion is only imported in React island components (`<SectionReveal />`, `<ContactForm />`)

**State Management: None (React local state only)**

No global state library needed. The only stateful interactions are:
1. Contact form (local `useState` in `<ContactForm />`)
2. Mobile nav open/close (vanilla JS `<script>` in Astro `<Nav />` component)
3. Nav scroll state (IntersectionObserver in vanilla JS `<script>`)

### Content Architecture

**Astro Content Collections with Zod schemas:**

```
src/content/
├── config.ts          # Collection definitions + Zod schemas
└── projects/
    └── portfolio-site.mdx
```

**Schema definition (in `config.ts`):**

```typescript
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { projects };
```

Adding a new case study: create `src/content/projects/new-project.mdx` with valid frontmatter → auto-detected at build time, type-checked against schema.

### Contact Form & Submission

**Provider: Formspree (free tier — 50 submissions/month)**

Rationale:
- No server runtime needed — POST to Formspree API endpoint
- Free tier is sufficient for portfolio volume (50/month)
- Email notification built-in
- No infrastructure to maintain
- Alternative: Netlify Forms (if hosting on Netlify — zero-config form handling baked into the platform)

**Implementation:**
- `<ContactForm />` is a React island (`client:visible`)
- Form POSTs to `https://formspree.io/f/{form_id}` via `fetch()`
- Client-side HTML5 validation (required fields, email format)
- Submit state managed via local `useState`: `idle` | `submitting` | `success` | `error`
- Success replaces form with confirmation message via `AnimatePresence`
- Error shows inline message with retry option

**Security:**
- Formspree handles spam filtering (honeypot + reCAPTCHA optional)
- Ben's email never exposed in page source — Formspree acts as relay
- CSRF not applicable (no session state)

### Infrastructure & Deployment

**Hosting: Vercel (primary recommendation) or Netlify**

| Decision | Choice | Rationale |
|---|---|---|
| Platform | Vercel | Zero-config Astro deployment, edge CDN, free tier generous for portfolio, `astro build` detected automatically |
| Deploy trigger | `git push main` | Auto-deploy via GitHub integration — no manual deployment |
| Preview deploys | Enabled | Every PR gets a preview URL for visual review before merge |
| Environment | Single environment (production) | No staging needed for a solo-developer portfolio |
| Custom domain | `ben[lastname].dev` | Configured in Vercel dashboard, automatic SSL |
| Headers | Configured in `vercel.json` or `netlify.toml` | CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |

**CI/CD Pipeline:**

No dedicated CI pipeline for MVP. Vercel's built-in build system handles:
- `astro check` (TypeScript type checking)
- `astro build` (static site generation)
- Deployment to edge CDN

Post-MVP addition: GitHub Actions for Lighthouse CI on PR preview deploys.

### Testing Strategy

**Unit Tests: Vitest v3.x**

- Test content schema validation (Zod schemas)
- Test utility functions (if any)
- Test form validation logic
- Located at `src/__tests__/` or co-located as `*.test.ts`

**E2E Tests: Playwright v1.x**

- Test critical user paths: homepage load → scroll → contact form submit
- Test WebGL fallback rendering
- Test mobile navigation (hamburger open/close)
- Test `prefers-reduced-motion` behavior
- Located at `tests/e2e/`

**Visual/Performance Testing:**

- Lighthouse CI in GitHub Actions (post-MVP)
- Manual axe-core audit pre-launch

### SEO Implementation

**Build-time SEO (zero runtime cost):**

- `<SEOHead />` Astro component generates `<title>`, `<meta>`, OG tags, Twitter Cards per page
- JSON-LD `Person` schema on homepage (inline `<script type="application/ld+json">`)
- `@astrojs/sitemap` generates `sitemap-index.xml` at build time
- `public/robots.txt` — static file, allows all crawling
- `<Image />` component (Astro built-in) for automatic format conversion (WebP/AVIF), sizing, and `alt` enforcement
- Canonical URLs via `Astro.url` in `<SEOHead />`
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>` with proper heading hierarchy

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (Astro + React + Tailwind + sitemap)
2. Design tokens in `tailwind.config.mjs` (colors, typography, spacing)
3. Layout components (`<Nav />`, `<Footer />`, `<SEOHead />`)
4. Content structure (Content Collections schema + first case study)
5. Page templates (homepage layout with sections)
6. Static sections (`<Hero />` wrapper, `<SkillsSection />`, `<AboutSection />`, `<ProofBar />`)
7. R3F hero island (`<HeroScene />`)
8. Contact form island (`<ContactSection />`, `<ContactForm />`, `<PathSelector />`)
9. Animation layer (`<SectionReveal />` wrapping all sections)
10. SEO (JSON-LD, OG tags, robots.txt, sitemap config)
11. Accessibility audit + fixes
12. Performance audit + optimization
13. Deploy + domain configuration

**Cross-Component Dependencies:**
- `<HeroScene />` depends on: R3F, drei, Three.js — isolated bundle, no shared state
- `<ContactForm />` depends on: Framer Motion (AnimatePresence), Formspree endpoint — isolated bundle
- `<SectionReveal />` depends on: Framer Motion — shared with ContactForm in React island bundle
- All Astro components share: Tailwind utility classes (build-time, no runtime dependency)
- `<SEOHead />` depends on: site config file and page-specific frontmatter

---

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 14 areas where AI agents could make different choices. All resolved below.

### Naming Patterns

**File Naming:**
- Components: PascalCase — `HeroScene.tsx`, `ContactForm.tsx`, `SectionReveal.tsx`
- Astro components: PascalCase — `Nav.astro`, `Footer.astro`, `CaseStudyCard.astro`
- Pages: kebab-case — `index.astro`, `case-study/[slug].astro`
- Content files: kebab-case — `portfolio-site.mdx`
- Config files: kebab-case — `tailwind.config.mjs`, `astro.config.mjs`
- Utility files: camelCase — `siteConfig.ts`, `getProjects.ts`
- Test files: same name as source + `.test` — `ContactForm.test.tsx`, `siteConfig.test.ts`

**Code Naming:**
- React components: PascalCase — `export function HeroScene() {}`
- Functions/utilities: camelCase — `export function getFormattedDate(date: Date)`
- Variables: camelCase — `const isNavScrolled = false`
- Constants: SCREAMING_SNAKE_CASE — `const FORM_ENDPOINT = '...'`
- TypeScript types/interfaces: PascalCase — `interface ProjectFrontmatter {}`
- CSS custom properties: kebab-case — `--color-accent`
- Tailwind custom tokens: kebab-case — `bg-surface`, `text-muted`

**Content Naming:**
- Collection names: plural kebab-case — `projects`
- Frontmatter fields: camelCase — `title`, `summary`, `featured`, `publishDate`
- Slugs: kebab-case auto-derived from filename

### Structure Patterns

**Component Organization: By type, not by feature**

```
src/components/
├── layout/         # Nav, Footer, SEOHead
├── sections/       # Hero, AboutSection, SkillsSection, ContactSection, ProofBar
├── ui/             # Button, SkillBadge, PathSelector, SectionReveal
├── cards/          # CaseStudyCard
└── three/          # HeroScene (R3F components)
```

Rationale: With only 15 components, feature-based organization creates unnecessary nesting. Type-based groups are immediately scannable.

**Component File Structure (React):**

```tsx
// 1. Imports (external → internal → types)
import { motion } from 'framer-motion';
import type { ComponentProps } from './types';

// 2. Constants
const ANIMATION_DURATION = 0.2;

// 3. Component
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // hooks first
  // derived state
  // handlers
  // render
  return (...);
}
```

**Component File Structure (Astro):**

```astro
---
// 1. Imports
import Button from '../ui/Button.astro';

// 2. Props interface
interface Props {
  title: string;
}

// 3. Destructure props
const { title } = Astro.props;

// 4. Data fetching / computation
const projects = await getCollection('projects');
---

<!-- 5. Template -->
<section>
  <h2>{title}</h2>
</section>

<!-- 6. Scoped styles (if needed beyond Tailwind) -->
<style>
  /* component-scoped styles only */
</style>

<!-- 7. Client-side script (if needed) -->
<script>
  // vanilla JS only — no React here
</script>
```

**Test Organization:**

```
src/__tests__/          # Unit tests (Vitest)
├── components/
├── utils/
└── content/
tests/
└── e2e/                # E2E tests (Playwright)
    ├── homepage.spec.ts
    ├── contact-form.spec.ts
    └── navigation.spec.ts
```

### Format Patterns

**Import Order (enforced by ESLint):**
1. Node built-ins (`node:path`)
2. External packages (`react`, `framer-motion`, `three`)
3. Astro integrations (`astro:content`)
4. Internal aliases (`@/components/...`, `@/utils/...`)
5. Relative imports (`./types`, `../Button`)
6. Type-only imports (`import type { ... }`)

**Path Aliases (in `tsconfig.json`):**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

Usage: `import Nav from '@/components/layout/Nav.astro'` — absolute from `src/`.

**Date Handling:**
- Content frontmatter: `date: 2026-03-13` (YAML date)
- Display: formatted with `Intl.DateTimeFormat('en-NZ', { year: 'numeric', month: 'long' })` — no date library needed

**Environment Variables:**
- Prefix: `PUBLIC_` for client-exposed vars (Astro convention)
- File: `.env` (local, gitignored), `.env.example` (committed, documented)
- Usage: `import.meta.env.PUBLIC_FORMSPREE_ID`

### Communication Patterns

**No event system needed.** This is a static site with two isolated React islands. There is no inter-component communication requirement.

- `<HeroScene />` is self-contained — no props, no events, no shared state
- `<ContactForm />` manages its own form state internally
- `<SectionReveal />` is a pure wrapper — props in, animation out
- `<Nav />` uses vanilla JS IntersectionObserver — no React state

**If an edge case arises:** Use Astro's `<script>` with `CustomEvent` on `document` — not React context or global state.

### Process Patterns

**Error Handling:**

| Context | Pattern |
|---|---|
| Build errors | Astro + TypeScript catch at build time — type errors fail the build |
| Content schema errors | Zod validation in Content Collections — invalid frontmatter fails the build with a clear error message |
| Form submission errors | `try/catch` around `fetch()` in `<ContactForm />` — error state shown inline, retry available |
| WebGL unavailability | Feature detection before R3F mount — render static gradient fallback |
| 404 pages | Custom `src/pages/404.astro` with personality copy and link back to homepage |

**Loading State Patterns:**

| Component | Loading Approach |
|---|---|
| R3F hero | CSS gradient placeholder → `<Suspense fallback={<GradientPlaceholder />}>` → scene fades in |
| Contact form | "Send it" button → "Sending..." with disabled state → success/error |
| Page transitions | None for MVP (Astro MPA, full page loads). Phase 2: Astro View Transitions API |

**Image Handling:**
- All images processed through Astro `<Image />` component
- Automatic format conversion to WebP/AVIF
- `width` and `height` always specified (prevents CLS)
- `loading="lazy"` on all images except above-the-fold
- Images stored in `src/assets/images/` (processed by Vite) or `public/` (served as-is for OG images)

### Enforcement Guidelines

**All AI Agents MUST:**

1. Use TypeScript strict mode — no `any` types, no `@ts-ignore`
2. Follow the file naming conventions above — PascalCase components, kebab-case pages/content
3. Use path aliases (`@/`) for all imports from `src/` — no `../../../` chains
4. Keep Astro components as the default — only use React when client-side interactivity is required
5. Never add `client:load` to an Astro island — use `client:visible` for lazy hydration
6. Use Tailwind utility classes for all styling — no inline `style` attributes, no CSS modules
7. Respect the 15-component inventory — do not create new components without explicit justification
8. Test all interactive components with `prefers-reduced-motion: reduce` enabled
9. Run `astro check` before committing — zero TypeScript errors allowed

**Pattern Enforcement:**
- TypeScript strict mode catches type violations at build time
- ESLint + Prettier configured for consistent formatting
- Astro's Content Collections enforce frontmatter schemas via Zod
- Vercel build must pass before deploy — `astro check && astro build`

### Pattern Examples

**Good Example — Astro component with React island:**
```astro
---
// ContactSection.astro
import ContactForm from '@/components/ui/ContactForm';
import SectionReveal from '@/components/ui/SectionReveal';
---

<section id="contact" class="py-24 px-6 md:px-12 lg:px-16">
  <SectionReveal client:visible>
    <h2 class="font-display text-4xl font-semibold text-primary mb-8">
      Let's build something together
    </h2>
    <ContactForm client:visible />
  </SectionReveal>
</section>
```

**Anti-Pattern — unnecessary React hydration:**
```astro
---
// DON'T: Making a static component a React island
import SkillBadge from '@/components/ui/SkillBadge'; // This is React
---
<SkillBadge client:load label="TypeScript" /> <!-- WRONG: No interactivity needed -->
```

Correct: `SkillBadge` should be an Astro component — zero JS shipped.

---

## Project Structure & Boundaries

### Requirements Mapping

**FR1–FR7 (Content Presentation) → `src/pages/`, `src/components/sections/`, `src/content/`**
- Static page templates render all content sections
- Content Collections store case study data
- `<HeroScene />` (R3F island) handles FR5 (3D hero)
- WebGL fallback logic handles FR6

**FR8–FR12 (Contact & Conversion) → `src/components/ui/ContactForm.tsx`, `src/components/sections/ContactSection.astro`**
- React island for form state management
- Formspree integration for submission relay
- Inline confirmation via `AnimatePresence`

**FR13–FR15 (Navigation) → `src/components/layout/Nav.astro`, `src/layouts/`**
- Astro layout wraps all pages with consistent nav/footer
- Nav scroll behavior via vanilla JS `<script>`

**FR16–FR20 (SEO) → `src/components/layout/SEOHead.astro`, `astro.config.mjs`, `public/`**
- SEO component generates all meta tags per page
- Sitemap integration in Astro config
- robots.txt as static file

**FR21–FR23 (Case Studies) → `src/content/projects/`, `src/pages/case-study/`**
- Content Collections with Zod schema
- Dynamic route `[slug].astro` for case study pages
- Index query on homepage

**FR24–FR27 (Performance + CMS-readiness) → Architecture-level (island boundaries, Content Collections)**
- `client:visible` on R3F and form islands
- Config centralised in `src/config/site.ts`

### Complete Project Directory Structure

```
portfolio/
├── .github/
│   └── copilot-instructions.md
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── og/
│       └── default.png                    # OG image for social sharing
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── ClashDisplay-Semibold.woff2
│   │   │   ├── ClashDisplay-Medium.woff2
│   │   │   ├── Satoshi-Regular.woff2
│   │   │   ├── Satoshi-Medium.woff2
│   │   │   ├── Satoshi-Bold.woff2
│   │   │   └── JetBrainsMono-Regular.woff2
│   │   └── images/
│   │       └── ben-photo.webp             # About section photo (if used)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.astro
│   │   │   ├── Footer.astro
│   │   │   └── SEOHead.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── AboutSection.astro
│   │   │   ├── SkillsSection.astro
│   │   │   ├── ContactSection.astro
│   │   │   └── ProofBar.astro
│   │   ├── cards/
│   │   │   └── CaseStudyCard.astro
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── SkillBadge.astro
│   │   │   ├── SectionReveal.tsx          # React (Framer Motion)
│   │   │   ├── ContactForm.tsx            # React (form state)
│   │   │   └── PathSelector.tsx           # React (radio group)
│   │   └── three/
│   │       └── HeroScene.tsx              # React (R3F Canvas)
│   ├── config/
│   │   └── site.ts                        # Centralised site metadata & nav config
│   ├── content/
│   │   ├── config.ts                      # Collection definitions + Zod schemas
│   │   └── projects/
│   │       └── portfolio-site.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro               # HTML shell, SEOHead, Nav, Footer
│   │   └── CaseStudyLayout.astro          # Case study page template
│   ├── pages/
│   │   ├── index.astro                    # Homepage
│   │   ├── case-study/
│   │   │   └── [slug].astro              # Dynamic case study pages
│   │   └── 404.astro                      # Custom 404
│   ├── styles/
│   │   └── global.css                     # @font-face declarations, Tailwind @layer base
│   └── __tests__/
│       ├── content/
│       │   └── schema.test.ts
│       └── utils/
│           └── siteConfig.test.ts
├── tests/
│   └── e2e/
│       ├── homepage.spec.ts
│       ├── contact-form.spec.ts
│       └── navigation.spec.ts
├── .env.example                           # PUBLIC_FORMSPREE_ID=your_form_id
├── .gitignore
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

### Integration Boundaries

**React Island Boundary 1: `<HeroScene />`**
- Entry: `<Hero.astro>` renders `<HeroScene client:visible />`
- Scope: R3F Canvas, Three.js geometry, materials, lighting, rotation logic
- Dependencies: `@react-three/fiber`, `@react-three/drei`, `three`
- Communication: None — fully self-contained, decorative only
- Fallback: WebGL detection in `<Hero.astro>` — if no WebGL, render CSS gradient div instead of mounting HeroScene

**React Island Boundary 2: `<ContactForm />` + `<PathSelector />`**
- Entry: `<ContactSection.astro>` renders `<ContactForm client:visible />`
- Scope: Form state, validation, submission, success/error UX
- Dependencies: `framer-motion` (AnimatePresence for state transitions), `fetch` API
- Communication: POST to Formspree API — no internal app communication
- Data flow: User input → local state → fetch POST → response → state update → UI transition

**React Island Boundary 3: `<SectionReveal />`**
- Entry: Multiple Astro section components render `<SectionReveal client:visible>`
- Scope: Framer Motion `whileInView` animation wrapper
- Dependencies: `framer-motion`
- Communication: None — pure animation wrapper, children passed through
- Bundle: Shares Framer Motion with ContactForm (same React runtime chunk)

**Static Boundary: Everything else**
- All Astro components (Nav, Footer, SEOHead, sections, cards, badges, buttons)
- Zero JavaScript shipped for these components
- Nav scroll behavior: vanilla JS `<script>` using IntersectionObserver — not a React island
- Mobile hamburger: vanilla JS `<script>` toggle — not a React island

**External Integration: Formspree**
- Single integration point: `fetch('https://formspree.io/f/${FORM_ID}', { method: 'POST', body: formData })`
- Form ID stored in `.env` as `PUBLIC_FORMSPREE_ID`
- No API key required (public form endpoint with Formspree's built-in spam protection)

**Build-time Integration: Astro Content Collections**
- Content queried at build time via `getCollection('projects')`
- Type-safe: Zod schema validates all frontmatter at build
- No runtime API — content is inlined into static HTML during build

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices work together without conflicts:
- Astro v5 has first-class integrations for React (`@astrojs/react`), Tailwind (`@astrojs/tailwind`), and sitemap (`@astrojs/sitemap`)
- React Three Fiber v9 runs on React 18/19 — compatible with Astro's React integration
- Framer Motion v12 is compatible with React 18/19
- TypeScript strict mode is supported by Astro, React, and all libraries
- Vite (Astro's build tool) handles Three.js tree-shaking and code splitting natively
- Formspree requires no server-side code — compatible with static-only deployment

**Pattern Consistency:**
- PascalCase components, kebab-case pages, camelCase utilities — consistent across all file types
- Path aliases (`@/`) used uniformly — no mixed import styles
- All interactive components use `client:visible` — consistent lazy hydration strategy
- Animation timing (200ms ease-out, 60ms stagger) matches UX specification exactly
- Color tokens from UX spec are mapped 1:1 into Tailwind config

**Structure Alignment:**
- Project structure supports all 15 components from the UX component inventory
- Two React island boundaries are clearly defined (hero, contact)
- Content Collections directory matches the case study system requirements
- Test directories are organized by scope (unit in `src/__tests__/`, E2E in `tests/e2e/`)

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

| FR | Architectural Support | Status |
|---|---|---|
| FR1 (Value proposition) | Homepage template, Hero section | ✅ |
| FR2 (Case studies) | Content Collections + dynamic route | ✅ |
| FR3 (Skills section) | SkillsSection Astro component | ✅ |
| FR4 (About section) | AboutSection Astro component | ✅ |
| FR5 (3D hero) | HeroScene React island (R3F) | ✅ |
| FR6 (WebGL fallback) | Feature detection in Hero.astro | ✅ |
| FR7 (Console easter egg) | Build-time `<script>` in BaseLayout | ✅ |
| FR8 (Contact form) | ContactForm React island + Formspree | ✅ |
| FR9 (Dual contact paths) | PathSelector component | ✅ |
| FR10 (Contact accessibility) | Nav CTA + mid-page + section | ✅ |
| FR11 (Form confirmation) | AnimatePresence success state | ✅ |
| FR12 (Email notification) | Formspree email relay | ✅ |
| FR13 (Navigation) | Nav Astro component | ✅ |
| FR14 (Page titles/meta) | SEOHead component | ✅ |
| FR15 (Homepage routing) | index.astro at `/` | ✅ |
| FR16 (Sitemap) | @astrojs/sitemap integration | ✅ |
| FR17 (robots.txt) | public/robots.txt | ✅ |
| FR18 (JSON-LD) | SEOHead component | ✅ |
| FR19 (OG/Twitter meta) | SEOHead component | ✅ |
| FR20 (Image alt text) | Astro `<Image />` pattern | ✅ |
| FR21 (Add case study) | New .mdx file in content/ | ✅ |
| FR22 (Static case studies) | Astro SSG + dynamic route | ✅ |
| FR23 (Case study links) | Homepage query + index | ✅ |
| FR24 (Lazy R3F loading) | `client:visible` directive | ✅ |
| FR25 (No JS on non-hero) | Astro zero-JS default | ✅ |
| FR26 (Content Collections) | `src/content/` with Zod schemas | ✅ |
| FR27 (Centralised config) | `src/config/site.ts` | ✅ |

**Non-Functional Requirements Coverage:**

| NFR | Architectural Support | Status |
|---|---|---|
| Performance (LCP ≤ 2.5s) | Static HTML, lazy islands, CSS placeholders | ✅ |
| Lighthouse ≥ 90 | Island architecture, font-display swap, image optimization | ✅ |
| JS budget (≤ 200KB hero, ≤ 10KB other) | R3F only in hero island, zero-JS Astro default | ✅ |
| WCAG 2.1 AA | Semantic HTML, contrast ratios, focus rings, motion prefs | ✅ |
| Reliability (CDN, 99.9% form SLA) | Vercel edge CDN, Formspree SLA | ✅ |
| Security (HTTPS, CSP, no email exposure) | Vercel auto-SSL, header config, Formspree relay | ✅ |
| Maintainability (30min case study, 15min metadata) | Content Collections + single config file | ✅ |

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical technology choices documented with specific version ranges
- Implementation patterns comprehensive for a 15-component portfolio
- Naming conventions, file structure, and import patterns fully specified
- Concrete code examples provided for both Astro and React component patterns

**Structure Completeness:**
- Full project tree with every file and directory defined
- All component locations mapped to the UX component inventory
- Integration boundaries clearly specified with dependency lists
- Content schema with Zod validation example provided

**Pattern Completeness:**
- Error handling patterns defined for all contexts (build, content, form, WebGL)
- Loading states specified for R3F hero and contact form
- Image handling pattern defined (Astro `<Image />`, lazy loading, format conversion)
- Animation timing matches UX specification exactly

### Gap Analysis

**No critical gaps identified.**

**Minor refinements for implementation phase:**
- Specific Formspree form ID configuration (created during setup, not an architecture gap)
- Ben's photo asset (optional for About section — layout works without it)
- OG image design (can be a simple branded graphic, created during implementation)
- ESLint/Prettier config specifics (standard Astro preset, configured during project init)

---

## Completion Summary

Ben — the architecture for your portfolio is complete. Here's what we built together:

**Architecture Document Delivered:**
- Full project context analysis mapping all 27 functional requirements to architectural components
- Starter template evaluation with exact initialization commands
- Core architectural decisions covering framework, 3D runtime, animation, content, forms, hosting, testing, and SEO
- Implementation patterns and consistency rules covering naming, structure, format, and process patterns — designed to keep AI agents aligned
- Complete project directory structure with every file and directory mapped
- Requirements coverage validation confirming 100% of PRD functional and non-functional requirements are architecturally supported

**Key Architectural Characteristics:**
- **2 React islands** (hero 3D scene + contact form) — everything else is zero-JS static HTML
- **15 components** — no more, no less, matching the UX specification exactly
- **Astro + R3F + Tailwind** — the stack from your PRD, validated and structured for implementation
- **Formspree** for contact form submission — no server runtime, free tier, email relay
- **Vercel** for hosting — zero-config Astro deployment, edge CDN, auto-deploy on push

This architecture document is now the single source of truth for all technical decisions. Any AI agent implementing stories should reference this document for technology choices, naming conventions, file locations, and component boundaries.
