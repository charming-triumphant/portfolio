---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
---

# portfolio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for portfolio, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

**Content Presentation**
- FR1: Visitors can read Ben's value proposition and professional positioning from the homepage within 5 seconds of arrival without scrolling.
- FR2: Visitors can view a structured case study that follows a problem / approach / build / outcome narrative.
- FR3: Visitors can scan Ben's primary technical skills and current stack in a dedicated skills section.
- FR4: Visitors can read Ben's professional background, location, and availability signal in an about section.
- FR5: Visitors can observe the 3D interactive hero scene on the homepage (desktop and capable mobile devices).
- FR6: Visitors on devices without WebGL support receive a non-broken, readable homepage (graceful fallback).
- FR7: Visitors can inspect a console.log easter egg message in browser developer tools.

**Contact & Conversion**
- FR8: Visitors can submit a project enquiry via a contact form with fields: name, email, enquiry type (project / role-collaboration), and message.
- FR9: Visitors can identify two distinct contact paths from the contact section — one oriented toward project work, one toward employment/collaboration — from a single contact entry point.
- FR10: The contact section is accessible from the homepage via navigation and via in-page CTAs (minimum two distinct scroll-trigger points in the homepage).
- FR11: Contact form submission results in a confirmation message displayed to the visitor.
- FR12: Ben receives contact form submissions as email notifications (via form provider or serverless function).

**Navigation & Structure**
- FR13: Visitors can navigate between all major sections of the site via a persistent navigation element (header nav or mobile hamburger).
- FR14: Each page has a unique, descriptive title and meta description for search engines.
- FR15: The homepage is accessible at the root domain (`/`) and the about, case studies, and contact sections are reachable from it.

**SEO & Discoverability**
- FR16: The site generates a sitemap at build time listing all public pages.
- FR17: A `robots.txt` file is present and does not block crawling.
- FR18: The homepage contains structured data (JSON-LD `Person` schema) with Ben's name, job title, location, and social profile links.
- FR19: All pages include Open Graph and Twitter Card metadata enabling rich previews when shared on social platforms.
- FR20: All images include descriptive `alt` text.

**Case Study System**
- FR21: Adding a new case study requires only creating a new content file (no component code changes).
- FR22: Each case study page is pre-rendered as static HTML at build time.
- FR23: Case studies are linked from the homepage and from a case studies index (if more than one exists).

**Performance**
- FR24: The 3D hero island loads only when the user's browser supports WebGL and the hero section is in the viewport.
- FR25: Non-hero pages contain no runtime JavaScript except that required for the contact form.

**Content Management (CMS-readiness)**
- FR26: All case study content is stored in content collection files with defined schemas, separating content from presentation.
- FR27: Site configuration (nav links, social URLs, personal metadata) is centralised in a single config file, not distributed across components.

### NonFunctional Requirements

**Performance**
- NFR1: Page load (LCP) ≤ 2.5 seconds on simulated mobile 4G.
- NFR2: Lighthouse Performance score ≥ 90 on all pages, including homepage with active R3F hero.
- NFR3: Lighthouse SEO score ≥ 95 on all pages.
- NFR4: Lighthouse Accessibility score ≥ 90 on all pages.
- NFR5: Cumulative Layout Shift (CLS) < 0.1 across all pages.
- NFR6: Total JS payload (homepage with R3F) ≤ 200KB gzipped.
- NFR7: Total JS payload (non-hero pages) ≤ 10KB gzipped.

**Accessibility**
- NFR8: Semantic HTML on all pages: correct use of `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<h1>`–`<h3>` hierarchy.
- NFR9: All interactive elements (links, buttons, form fields) keyboard-accessible.
- NFR10: Color contrast ratios meet WCAG 2.1 AA (minimum 4.5:1 for body text, 3:1 for large text).
- NFR11: Contact form labels programmatically associated with inputs (`<label for>` or `aria-labelledby`).
- NFR12: 3D hero must not auto-play animation that could trigger vestibular disorders — respect `prefers-reduced-motion` media query.

**Reliability**
- NFR13: Site is fully static and served from CDN edge nodes — no server to go down.
- NFR14: Contact form provider must have a documented uptime SLA ≥ 99.9%.
- NFR15: Zero broken links or 404s at launch.

**Security**
- NFR16: Contact form does not expose Ben's personal email address in page source.
- NFR17: HTTPS enforced on all routes.
- NFR18: Content Security Policy headers configured at hosting layer to prevent XSS.

**Maintainability**
- NFR19: Adding a new case study ≤ 30 minutes for Ben working alone.
- NFR20: Updating personal metadata (skills, bio, social links) ≤ 15 minutes (single config file change).
- NFR21: Deploying an update: automatic on `git push` to `main` branch.

### Additional Requirements

**From Architecture — Starter Template & Infrastructure:**
- ARCH-1: Project initialised using `npm create astro@latest portfolio -- --template minimal --typescript strict` followed by adding React, Tailwind, and Sitemap integrations via `npx astro add`
- ARCH-2: TypeScript strict mode — no `any` types, no `@ts-ignore`
- ARCH-3: Hosting on Vercel with auto-deploy on `git push main`, preview deploys on PRs
- ARCH-4: Formspree (free tier, 50 submissions/month) as contact form provider — POST to `https://formspree.io/f/{form_id}` via `fetch()`
- ARCH-5: Vitest for unit tests, Playwright for E2E tests
- ARCH-6: Content Collections with Zod schemas for case studies
- ARCH-7: Path aliases (`@/`) for all imports from `src/` — no `../../../` chains
- ARCH-8: `client:visible` directive on all React islands (never `client:load`)
- ARCH-9: ESLint + Prettier configured for consistent formatting
- ARCH-10: Only 2 React hydration islands: HeroScene and ContactForm (+SectionReveal shares Framer Motion bundle)
- ARCH-11: Exactly 15 components — do not create new components without justification
- ARCH-12: CSP and security headers configured in `vercel.json`
- ARCH-13: `.env` for Formspree form ID (`PUBLIC_FORMSPREE_ID`), `.env.example` committed
- ARCH-14: Implementation sequence defined: init → tokens → layouts → content → pages → sections → R3F → form → animation → SEO → a11y → perf → deploy

**From Architecture — Component & Code Patterns:**
- ARCH-15: Component file naming: PascalCase for components, kebab-case for pages/content, camelCase for utilities
- ARCH-16: Component organization by type (layout/, sections/, ui/, cards/, three/) not by feature
- ARCH-17: Astro components as default — only React when client-side interactivity is required
- ARCH-18: Import order enforced: Node builtins → external → Astro integrations → internal aliases → relative → type-only
- ARCH-19: Error handling: try/catch on fetch in ContactForm, WebGL feature detection before R3F mount, Zod schema validation at build
- ARCH-20: Custom `src/pages/404.astro` with personality copy

**From UX Design — Visual & Interaction:**
- UX-1: Dark editorial design direction ("Direction B") — `#09090B` base, zinc surface layers, blue accent
- UX-2: Color system with 10 semantic tokens (background, surface, surface-hover, border, text-primary, text-secondary, text-muted, accent, success, error)
- UX-3: Typography: Clash Display (display/headings), Satoshi (body), JetBrains Mono (code) — all self-hosted WOFF2 subsets (~45KB total)
- UX-4: Font loading with `font-display: swap`
- UX-5: Spacing system based on 8px unit with defined tokens (space-1 through space-16)
- UX-6: Max content width 1200px, side padding 24px mobile / 48px tablet / 64px desktop

**From UX Design — Responsive & Accessibility:**
- UX-7: Mobile-first design — layouts designed for 375px first, enhanced for larger screens
- UX-8: 4 breakpoints: mobile (<640px), tablet (640–1023px), desktop (≥1024px), wide (≥1280px)
- UX-9: Fluid typography with `clamp()` for hero and section titles
- UX-10: Touch targets minimum 44×44px on all interactive elements
- UX-11: Focus ring: 2px solid accent, 2px offset on all interactive elements
- UX-12: Skip link ("Skip to content") as first focusable element
- UX-13: `prefers-reduced-motion`: disable all Framer Motion animations, R3F rotation, nav blur transition
- UX-14: `aria-hidden="true"` on decorative 3D hero scene
- UX-15: `aria-live="polite"` on form confirmation region

**From UX Design — Animation & Interaction Patterns:**
- UX-16: Scroll-triggered section entrance: opacity 0→1 + translateY 20px→0, 200ms ease-out, `once: true`
- UX-17: Child stagger: 60ms per child via Framer Motion `staggerChildren`
- UX-18: Card hover: translateY(-4px) lift + shadow increase, 150ms ease-out
- UX-19: Nav glassmorphism: transparent → backdrop-filter blur(12px) + rgba(9,9,11,0.8) on scroll, 200ms
- UX-20: Form success: AnimatePresence swap, 300ms ease-in-out
- UX-21: Hero R3F rotation: continuous slow rotation, `frameloop="demand"`, no cursor reactivity
- UX-22: GPU-composited properties only for all animations (transform + opacity)

**From UX Design — Component Specifications:**
- UX-23: Button hierarchy: Primary (accent bg, white text), Secondary (transparent + accent border), Ghost (no border, underline hover)
- UX-24: Form: visible labels, surface background, accent focus ring, placeholder in text-muted, 24px field spacing
- UX-25: Nav: sticky top, name left, [Work][About][Contact CTA] right, "Available for work" green dot badge
- UX-26: Case study card: muted sequence number (01, 02), title, one-line summary, tech badges, full-card click target
- UX-27: Contact headline: "Let's build something together", dual-path selector, "Send it" CTA, inline confirmation with visitor's name
- UX-28: Skills section: three confidence tiers ("Ship in" / "Build in" / "Learning") — no progress bars
- UX-29: 404 page: personality copy with link back to homepage + glass icosahedron at reduced opacity
- UX-30: Console.log easter egg: personality-driven message in dev tools
- UX-31: Proof bar below hero: Lighthouse scores strip

### FR Coverage Map

- FR1: Epic 2 — Value proposition visible within 5 seconds on homepage
- FR2: Epic 3 — Structured case study with problem/approach/build/outcome narrative
- FR3: Epic 4 — Technical skills section with confidence tiers
- FR4: Epic 4 — Professional background, location, and availability in about section
- FR5: Epic 2 — 3D interactive hero scene (R3F glass icosahedron)
- FR6: Epic 2 — WebGL fallback for unsupported devices
- FR7: Epic 2 — Console.log easter egg in dev tools
- FR8: Epic 5 — Contact form with name, email, enquiry type, message
- FR9: Epic 5 — Dual contact paths (project vs role/collaboration)
- FR10: Epic 5 — Contact accessible via nav CTA and in-page CTAs
- FR11: Epic 5 — Inline confirmation message on form submission
- FR12: Epic 5 — Email notifications via Formspree
- FR13: Epic 1 — Persistent navigation (header nav + mobile hamburger)
- FR14: Epic 1 — Unique page titles and meta descriptions
- FR15: Epic 1 — Homepage at root, sections reachable from it
- FR16: Epic 6 — Build-time sitemap generation
- FR17: Epic 6 — robots.txt present
- FR18: Epic 6 — JSON-LD Person schema on homepage
- FR19: Epic 6 — Open Graph and Twitter Card metadata
- FR20: Epic 6 — Descriptive alt text on all images
- FR21: Epic 3 — New case study = new content file only
- FR22: Epic 3 — Case study pages pre-rendered as static HTML
- FR23: Epic 3 — Case studies linked from homepage and index
- FR24: Epic 2 — R3F island loads only with WebGL + viewport visibility
- FR25: Epic 5 — Non-hero pages have no JS except contact form
- FR26: Epic 3 — Content Collections with Zod schemas
- FR27: Epic 1 — Centralised site config file

## Epic List

### Epic 1: Project Foundation & Site Shell
Visitors can land on a professional, navigable website with a consistent dark editorial design system, responsive layout, and working navigation — the technical and visual foundation for everything that follows.
**FRs covered:** FR13, FR14, FR15, FR27

### Epic 2: Hero & First Impression
Visitors immediately see a striking 3D glass icosahedron hero scene and Ben's value proposition within 5 seconds, establishing credibility and taste before any content is read. Includes WebGL fallback, proof bar, and console.log easter egg.
**FRs covered:** FR1, FR5, FR6, FR7, FR24

### Epic 3: Case Studies & Portfolio Content
Visitors can explore detailed case studies that prove Ben's capabilities through structured problem/approach/build/outcome narratives. Adding a new case study requires only creating a new MDX file.
**FRs covered:** FR2, FR21, FR22, FR23, FR26

### Epic 4: Skills & About
Visitors can scan Ben's tech stack (with honest confidence tiers) and professional background, including location and availability — Mark gets his 30-second scan, Sophie confirms stack match.
**FRs covered:** FR3, FR4

### Epic 5: Contact & Conversion
Visitors can contact Ben through a dual-path contact form ("I have a project" / "Hiring or collaborating") with inline personalized confirmation — completing the trust-to-action conversion funnel.
**FRs covered:** FR8, FR9, FR10, FR11, FR12, FR25

### Epic 6: SEO & Discoverability
Ben's site appears in Google search for "web developer Tauranga" and regional queries, with rich social sharing previews on LinkedIn and Twitter.
**FRs covered:** FR16, FR17, FR18, FR19, FR20

### Epic 7: Polish, Performance & Launch Readiness
The site delivers a polished, accessible, performant experience across all devices — scroll-reveal animations, Lighthouse ≥90, WCAG 2.1 AA compliance, and all quality gates passed for launch.
**FRs covered:** Cross-cutting (NFR1–NFR21, UX-16–UX-22, ARCH-5, ARCH-12)

---

## Epic 1: Project Foundation & Site Shell

Visitors can land on a professional, navigable website with a consistent dark editorial design system, responsive layout, and working navigation — the technical and visual foundation for everything that follows.

### Story 1.1: Initialize Astro Project & Deploy to Vercel

As a developer,
I want a fully configured Astro project with React, Tailwind CSS, and Sitemap integrations deployed to Vercel,
So that I have a working CI/CD pipeline and technical foundation from day one.

**Acceptance Criteria:**

**Given** no project exists yet
**When** the Astro project is initialized with `npm create astro@latest portfolio -- --template minimal --typescript strict`
**Then** the project builds without errors with TypeScript strict mode enabled
**And** React integration is added via `npx astro add react`
**And** Tailwind CSS integration is added via `npx astro add tailwind`
**And** Sitemap integration is added via `npx astro add sitemap`
**And** path aliases (`@/*` → `src/*`) are configured in `tsconfig.json`
**And** ESLint and Prettier are configured with Astro presets
**And** `.env.example` is created with `PUBLIC_FORMSPREE_ID=your_form_id`
**And** `.gitignore` excludes `node_modules/`, `dist/`, `.env`
**And** the project is deployed to Vercel with auto-deploy on `git push main`
**And** `vercel.json` includes CSP, X-Frame-Options, X-Content-Type-Options, and Referrer-Policy headers

### Story 1.2: Implement Design Tokens & Global Styles

As a developer,
I want all design tokens (colors, typography, spacing, breakpoints) configured in Tailwind and custom fonts loaded,
So that every component built from this point uses a consistent, dark editorial design system.

**Acceptance Criteria:**

**Given** the Astro project is initialized
**When** `tailwind.config.mjs` is configured
**Then** semantic color tokens are defined: `background` (#09090B), `surface` (#18181B), `surface-hover` (#27272A), `border` (#27272A), `text-primary` (#FAFAFA), `text-secondary` (#A1A1AA), `text-muted` (#71717A), `accent` (#3B82F6), `accent-hover` (#2563EB), `success` (#22C55E), `error` (#EF4444)
**And** font families are configured: `display` (Clash Display), `body` (Satoshi), `mono` (JetBrains Mono)
**And** custom font sizes are defined: `display` (4.5rem), `h1` (3rem), `h2` (2rem), `h3` (1.5rem), `body` (1.125rem), `body-small` (1rem), `caption` (0.875rem)
**And** spacing scale uses 8px base unit with custom tokens (space-1 through space-16)
**And** breakpoints are defined: mobile (<640px), tablet (640px), desktop (1024px), wide (1280px)
**And** `src/styles/global.css` includes `@font-face` declarations for Clash Display (Semibold, Medium), Satoshi (Regular, Medium, Bold), and JetBrains Mono (Regular) as self-hosted WOFF2 subsets
**And** `font-display: swap` is set on all font faces
**And** combined font payload is ≤ 45KB

### Story 1.3: Create Base Layout, SEO Head & Site Configuration

As a visitor,
I want every page to have a consistent HTML structure with proper semantic markup, unique page titles, and meta descriptions,
So that the site feels professional and search engines can index each page correctly.

**Acceptance Criteria:**

**Given** the design system is configured
**When** any page is visited
**Then** the page renders within `BaseLayout.astro` providing `<html>`, `<head>`, `<body>`, `<main>` structure
**And** semantic HTML elements are used: `<header>`, `<main>`, `<footer>`, `<nav>`
**And** `SEOHead.astro` renders unique `<title>` and `<meta name="description">` per page from page frontmatter
**And** a centralised site config file exists at `src/config/site.ts` containing nav links, social URLs, personal metadata, and site-wide defaults (FR27)
**And** the homepage is accessible at the root domain `/` (FR15)
**And** the HTML document uses lang="en"

### Story 1.4: Build Navigation with Mobile Hamburger & Glassmorphism

As a visitor,
I want a persistent navigation bar with clear links to all sections and a prominent Contact button,
So that I can navigate between sections from any point on the page without scrolling back to the top.

**Acceptance Criteria:**

**Given** a visitor is on any page
**When** the page loads
**Then** a sticky `Nav.astro` component is rendered at the top of the page
**And** desktop layout shows: name/logo left, [Work] [About] [Contact] right, where Contact is styled as a primary button
**And** an "Available for work" green dot badge is visible in the nav
**And** on scroll, the nav transitions from transparent to `backdrop-filter: blur(12px)` with `rgba(9,9,11,0.8)` background within 200ms ease-out
**And** the scroll detection uses IntersectionObserver, not a scroll event listener
**And** on mobile (<640px), the nav displays a hamburger icon + Contact CTA button
**And** tapping the hamburger opens a full-screen overlay with centered navigation links
**And** the mobile menu traps focus when open and returns focus to the hamburger on close
**And** all nav interactive elements have a minimum touch target of 44×44px
**And** keyboard navigation works correctly (Tab to all links, Enter to activate, Escape to close mobile menu)

### Story 1.5: Create Footer & Custom 404 Page

As a visitor,
I want a consistent footer on every page and a friendly 404 page if I navigate to a non-existent URL,
So that I always have a way to find social links and never hit a dead end.

**Acceptance Criteria:**

**Given** a visitor is on any page
**When** they scroll to the bottom
**Then** a `Footer.astro` component is rendered with social links, copyright, and a link back to the homepage
**And** social links open in new tabs with `rel="noopener noreferrer"`

**Given** a visitor navigates to a URL that does not exist
**When** the 404 page renders
**Then** a custom `404.astro` page displays personality-driven copy (e.g., "Well, this page doesn't exist — but I do.")
**And** the 404 page includes a clear link back to the homepage
**And** the 404 page uses the BaseLayout for consistent navigation access

---

## Epic 2: Hero & First Impression

Visitors immediately see a striking 3D glass icosahedron hero scene and Ben's value proposition within 5 seconds, establishing credibility and taste before any content is read. Includes WebGL fallback, proof bar, and console.log easter egg.

### Story 2.1: Create Hero Section with Value Proposition

As a visitor,
I want to see a clear headline communicating who Ben is and what he does within 5 seconds of landing on the homepage,
So that I immediately understand his value proposition without scrolling.

**Acceptance Criteria:**

**Given** a visitor lands on the homepage
**When** the page loads
**Then** a `Hero.astro` section is the first visible content below the nav
**And** a headline is displayed using the `display` font (Clash Display, 600 weight) communicating Ben's role and positioning
**And** a subheadline provides secondary context for technical visitors
**And** the value proposition is legible and complete within 5 seconds without scrolling (FR1)
**And** a CSS gradient placeholder (matching the dark editorial palette) is rendered for the 3D scene area to prevent CLS
**And** the hero section is full-viewport height on desktop and appropriately sized on mobile
**And** hero typography uses fluid scaling: `clamp(2.5rem, 5vw + 1rem, 4.5rem)` for the headline

### Story 2.2: Implement 3D HeroScene with React Three Fiber

As a visitor on a WebGL-capable device,
I want to see a tasteful, slowly rotating glass icosahedron in the hero section,
So that the site immediately communicates design sophistication and technical capability.

**Acceptance Criteria:**

**Given** a visitor's browser supports WebGL
**When** the hero section enters the viewport
**Then** `HeroScene.tsx` is loaded via `client:visible` directive (FR24)
**And** the scene renders an `IcosahedronGeometry` with `MeshTransmissionMaterial` (glass/crystal refraction effect)
**And** lighting consists of a single `directionalLight` + `ambientLight` — no HDRI or Environment presets
**And** the scene rotates slowly on a continuous interval with `frameloop="demand"` — no cursor reactivity
**And** `Canvas` is configured with `dpr={[1, 2]}` to cap pixel ratio
**And** mobile material settings use `samples={4}` and `resolution={512}` for performance
**And** the component is wrapped in `<Suspense>` with the CSS gradient fallback
**And** the scene has `aria-hidden="true"` as it is purely decorative (UX-14)
**And** no Three.js or R3F JavaScript is loaded on non-hero pages

**Given** the user has `prefers-reduced-motion: reduce` enabled
**When** the hero renders
**Then** the R3F scene renders static (rotation disabled) or is replaced with the static gradient fallback

**Given** the visitor's browser does NOT support WebGL
**When** the homepage loads
**Then** a static CSS gradient fallback is displayed instead of the R3F Canvas (FR6)
**And** the page remains fully readable and functional

### Story 2.3: Create Proof Bar & Console Easter Egg

As a visitor,
I want to see measurable proof of the site's quality (Lighthouse scores) below the hero, and discover a personality-driven easter egg in the browser console,
So that credibility is immediately evidenced and the site feels like it was made by a real person.

**Acceptance Criteria:**

**Given** a visitor scrolls past the hero section
**When** the proof bar section is visible
**Then** `ProofBar.astro` displays Lighthouse score metrics (Performance, SEO, Accessibility) in a horizontal strip
**And** each score uses `aria-label` for screen reader accessibility (e.g., "Lighthouse Performance score: 95 out of 100")
**And** the proof bar uses the `surface` background with `caption`-sized text

**Given** a visitor opens the browser developer console
**When** the homepage has loaded
**Then** a `console.log` message is displayed with personality-driven copy (FR7)
**And** the message is injected via a build-time `<script>` tag in BaseLayout

---

## Epic 3: Case Studies & Portfolio Content

Visitors can explore detailed case studies that prove Ben's capabilities through structured problem/approach/build/outcome narratives. Adding a new case study requires only creating a new MDX file.

### Story 3.1: Set Up Content Collections & Case Study Schema

As a developer,
I want a type-safe content schema for case studies using Astro Content Collections and Zod,
So that every case study file is validated at build time and structured consistently.

**Acceptance Criteria:**

**Given** the project has Astro configured
**When** `src/content/config.ts` is created
**Then** a `projects` collection is defined with a Zod schema requiring: `title` (string), `summary` (string), `date` (date), `tags` (string array), `featured` (boolean, default false), `draft` (boolean, default false), `order` (number)
**And** the schema is exported and registered with Astro's Content Collections (FR26)
**And** a case study file with invalid frontmatter causes a build error with a clear message
**And** content files live at `src/content/projects/*.mdx`

### Story 3.2: Create First Case Study & Case Study Page Template

As a visitor,
I want to read a detailed case study for the portfolio site itself, following a problem/approach/build/outcome narrative,
So that I can evaluate Ben's technical thinking, architectural decisions, and ability to deliver.

**Acceptance Criteria:**

**Given** a visitor navigates to a case study page (e.g., `/case-study/portfolio-site`)
**When** the page loads
**Then** the case study is rendered using `CaseStudyLayout.astro`
**And** the content follows the problem → approach → build → outcome narrative structure (FR2)
**And** the page is pre-rendered as static HTML at build time (FR22)
**And** the dynamic route lives at `src/pages/case-study/[slug].astro`
**And** the page uses BaseLayout for consistent nav/footer

**Given** a developer wants to add a new case study
**When** they create a new `.mdx` file in `src/content/projects/`
**Then** the new case study is automatically detected and rendered without any component code changes (FR21)

### Story 3.3: Build Case Study Cards & Homepage Integration

As a visitor,
I want to see case study cards on the homepage that summarize each project at a glance,
So that I can quickly identify relevant work and click through to explore further.

**Acceptance Criteria:**

**Given** a visitor is on the homepage
**When** they scroll to the case studies section
**Then** `CaseStudyCard.astro` components are rendered for each non-draft, featured case study
**And** each card displays: a muted sequence number (01, 02, 03), project title, one-line summary, and tech badge row
**And** the entire card is wrapped in an `<a>` tag linking to the full case study page (full-card click target)
**And** case studies are queried from Content Collections via `getCollection('projects')` at build time (FR23)
**And** cards link from the homepage and from a case studies index if more than one exists (FR23)

**Given** a visitor hovers over a case study card (desktop)
**When** the cursor enters the card area
**Then** the card lifts with `translateY(-4px)` and shadow increases within 150ms ease-out

---

## Epic 4: Skills & About

Visitors can scan Ben's tech stack (with honest confidence tiers) and professional background, including location and availability — Mark gets his 30-second scan, Sophie confirms stack match.

### Story 4.1: Build Skills Section with Confidence Tiers

As a visitor,
I want to scan Ben's technical skills organized by confidence level rather than fake progress bars,
So that I can quickly evaluate his stack fit for my needs with honest signal.

**Acceptance Criteria:**

**Given** a visitor scrolls to the skills section on the homepage
**When** the section is visible
**Then** `SkillsSection.astro` renders skills grouped into three confidence tiers: "Ship in" (production-ready), "Build in" (proficient), "Learning" (actively developing)
**And** each skill is rendered as a `SkillBadge.astro` component
**And** primary stack items include a reasoning sentence (e.g., "I chose Astro for this site because...")
**And** skills include at minimum: PHP, Laravel, Vue.js, React, Astro, TypeScript, Tailwind CSS, Three.js/R3F
**And** the section uses the `h1` font for the section title and `caption` styled badges
**And** the layout is responsive: wrapping badge grid on mobile, clean rows on desktop

### Story 4.2: Build About Section with Background & Availability

As a visitor,
I want to read Ben's professional background, location, university context, and current availability,
So that I know where he's based, what he's currently doing, and whether to reach out.

**Acceptance Criteria:**

**Given** a visitor scrolls to the about section on the homepage
**When** the section is visible
**Then** `AboutSection.astro` renders Ben's professional background in first-person voice
**And** the section clearly states: Tauranga-based location, CS + Marketing dual degree (University of Waikato, graduating 2027), current full-stack developer role (medical practice software, PHP/Laravel/Vue.js), and availability signal ("open to NZ-wide remote")
**And** the desktop layout uses an asymmetric 60/40 split (text and visual element/photo)
**And** the mobile layout stacks content vertically
**And** the copy tone is warm, direct, and specific — not generic or superlative-laden
**And** the section references content from the centralised site config where appropriate

---

## Epic 5: Contact & Conversion

Visitors can contact Ben through a dual-path contact form ("I have a project" / "Hiring or collaborating") with inline personalized confirmation — completing the trust-to-action conversion funnel.

### Story 5.1: Build Contact Form with Dual-Path Selector

As a visitor,
I want to fill out a simple contact form and select whether I have a project or want to discuss a role,
So that I can reach out to Ben with the right context and my enquiry is properly categorized.

**Acceptance Criteria:**

**Given** a visitor scrolls to the contact section
**When** the section is visible
**Then** `ContactSection.astro` renders with the headline "Let's build something together"
**And** `ContactForm.tsx` is loaded as a React island via `client:visible`
**And** the form contains: Name (text, required), Email (email, required), Message (textarea, required), and Path selector (FR8)
**And** `PathSelector.tsx` renders as a radio group with two options: "I have a project" and "Hiring or collaborating" (FR9)
**And** all form labels are visible (no floating labels) and programmatically associated with inputs via `<label htmlFor>` (NFR11)
**And** fields have `surface` background, `border` border, `accent` focus ring (2px)
**And** required fields show an asterisk in `text-muted`
**And** client-side HTML5 validation enforces required fields and email format
**And** the submit button reads "Send it" (not "Submit") and meets 44×44px touch target minimum
**And** field spacing is 24px between fields

### Story 5.2: Integrate Formspree & Inline Confirmation

As a visitor,
I want to receive immediate inline confirmation after submitting the contact form, and know Ben will get my message,
So that I feel confident my enquiry was received without being redirected away.

**Acceptance Criteria:**

**Given** a visitor has filled out the contact form with valid data
**When** they click "Send it"
**Then** the button text changes to "Sending..." with a subtle pulse animation and the button is disabled
**And** the form POSTs to `https://formspree.io/f/${PUBLIC_FORMSPREE_ID}` via `fetch()` (FR12)
**And** the Formspree form ID is read from `import.meta.env.PUBLIC_FORMSPREE_ID` (ARCH-4, ARCH-13)
**And** on success, the form is replaced with a confirmation message: "Thanks [name] — I'll reply within 24 hours" using Framer Motion `AnimatePresence` (FR11)
**And** the confirmation region has `aria-live="polite"` for screen reader announcement (UX-15)
**And** Ben's personal email address is never exposed in page source (NFR16)

**Given** the form submission fails (network error, Formspree error)
**When** the error response is received
**Then** an inline error message is displayed with `error` color
**And** the error state shows a retry option
**And** the form fields retain the visitor's input

### Story 5.3: Add Contact Entry Points Across the Site

As a visitor,
I want to be able to reach the contact section from multiple points on the page,
So that I can act immediately when I decide to reach out, without hunting for the contact form.

**Acceptance Criteria:**

**Given** a visitor is on the homepage
**When** they want to contact Ben
**Then** the "Contact" button in the nav links to `#contact` and smooth-scrolls to the contact section (FR10)
**And** a mid-page availability block or CTA exists between content sections (e.g., between case studies and about) linking to `#contact` (FR10)
**And** the contact section itself has a visible plain-text email below the form
**And** non-hero pages ship no runtime JavaScript except that required for the contact form (FR25)
**And** contact is reachable from any point with maximum one click or one scroll action

---

## Epic 6: SEO & Discoverability

Ben's site appears in Google search for "web developer Tauranga" and regional queries, with rich social sharing previews on LinkedIn and Twitter.

### Story 6.1: Implement SEO Foundation & Structured Data

As Ben,
I want my site to have proper sitemap, robots.txt, structured data, and canonical URLs,
So that Google can crawl, understand, and rank my pages for regional developer searches.

**Acceptance Criteria:**

**Given** the site is built
**When** the build completes
**Then** `@astrojs/sitemap` generates a `sitemap-index.xml` listing all public pages (FR16)
**And** `public/robots.txt` is present and allows all crawling (FR17)
**And** the homepage contains a `<script type="application/ld+json">` block with JSON-LD `Person` schema including: name, jobTitle, url, location (Tauranga, NZ), and sameAs links to social profiles (FR18)
**And** all pages include canonical URLs via `Astro.url` in SEOHead
**And** Lighthouse SEO score is ≥ 95 on all pages (NFR3)

### Story 6.2: Implement Social Sharing Metadata & Image Optimization

As Ben,
I want rich previews when my site is shared on LinkedIn, Twitter, or other platforms, and all images to have proper alt text,
So that shared links look professional and images are accessible.

**Acceptance Criteria:**

**Given** a page is shared on a social platform
**When** the platform fetches metadata
**Then** `SEOHead.astro` renders Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type` (FR19)
**And** Twitter Card tags are rendered: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image` (FR19)
**And** a default OG image exists at `public/og/default.png` (branded graphic)
**And** all `<img>` elements on the site include descriptive `alt` text (FR20)
**And** images are processed through Astro's `<Image />` component for automatic format conversion (WebP/AVIF) and sizing
**And** all images below the fold use `loading="lazy"`
**And** all images specify `width` and `height` to prevent CLS

---

## Epic 7: Polish, Performance & Launch Readiness

The site delivers a polished, accessible, performant experience across all devices — scroll-reveal animations, Lighthouse ≥90, WCAG 2.1 AA compliance, and all quality gates passed for launch.

### Story 7.1: Implement Scroll-Reveal Animations

As a visitor,
I want subtle, polished scroll-triggered animations as sections enter the viewport,
So that the site feels deliberate and considered — building trust through visual quality.

**Acceptance Criteria:**

**Given** a visitor scrolls down the page
**When** a section enters the viewport
**Then** `SectionReveal.tsx` wraps the section and triggers entrance animation: `opacity: 0 → 1` + `translateY(20px → 0)` over 200ms with `ease-out` easing (UX-16)
**And** child elements within a section stagger at 60ms intervals via Framer Motion `staggerChildren` (UX-17)
**And** `viewport={{ once: true }}` ensures each section animates only once — never re-animates on re-scroll
**And** all animations use GPU-composited properties only: `transform` and `opacity` — never `width`, `height`, `top`, `left` (UX-22)
**And** SectionReveal is applied to all major content sections (hero content, case studies, skills, about, contact)

### Story 7.2: Implement Motion Accessibility & Skip Navigation

As a visitor with motion sensitivity or who uses assistive technology,
I want all animations to respect my preferences and the site to be fully navigable via keyboard,
So that I can use the site comfortably regardless of disability or preference.

**Acceptance Criteria:**

**Given** a visitor has `prefers-reduced-motion: reduce` enabled
**When** any page loads
**Then** all Framer Motion animations are disabled (set `initial={false}` on motion components) (UX-13)
**And** the R3F hero scene renders static (no rotation) or displays the gradient fallback
**And** the nav glassmorphism blur transition is instant (no animation)
**And** card hover lift effects are instant

**Given** a keyboard user visits any page
**When** they press Tab for the first time
**Then** a "Skip to content" link appears as the first focusable element and jumps focus to `<main>` (UX-12)
**And** all interactive elements display a visible focus ring: `2px solid accent` with `2px offset` (UX-11)
**And** focus rings are never removed via `outline: none`
**And** the form confirmation region announces to screen readers via `aria-live="polite"` (UX-15)
**And** all touch targets meet the 44×44px minimum (UX-10)

### Story 7.3: Performance Optimization & Lighthouse Audit

As Ben,
I want the site to achieve Lighthouse Performance ≥ 90 on all pages including the R3F hero,
So that the Performance+3D Paradox is resolved and the site loads fast on David's mobile 4G.

**Acceptance Criteria:**

**Given** the complete site is built and deployed
**When** Lighthouse is run on mobile simulation
**Then** LCP is ≤ 2.5 seconds on all pages (NFR1)
**And** Lighthouse Performance score is ≥ 90 on all pages including the homepage with R3F hero (NFR2)
**And** CLS is < 0.1 across all pages (NFR5)
**And** total JS payload on the homepage (with R3F) is ≤ 200KB gzipped (NFR6)
**And** total JS payload on non-hero pages is ≤ 10KB gzipped (NFR7)
**And** there are zero render-blocking resources in the critical path
**And** there are zero console errors in production
**And** fonts load with `font-display: swap` preventing invisible text flash

### Story 7.4: Testing Setup & Security Configuration

As a developer,
I want unit tests, E2E tests, and proper security headers in place,
So that the site is protected against regressions and common web vulnerabilities.

**Acceptance Criteria:**

**Given** the project is set up
**When** test infrastructure is configured
**Then** Vitest is configured (`vitest.config.ts`) with tests at `src/__tests__/` (ARCH-5)
**And** at minimum: content schema validation tests verify Zod schemas reject invalid frontmatter
**And** at minimum: form validation logic is tested
**And** Playwright is configured (`playwright.config.ts`) with tests at `tests/e2e/` (ARCH-5)
**And** at minimum: homepage load → scroll → contact form submission E2E test exists
**And** at minimum: WebGL fallback rendering E2E test exists
**And** at minimum: mobile navigation (hamburger open/close) E2E test exists
**And** `vercel.json` includes security headers: Content-Security-Policy, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy (strict-origin-when-cross-origin) (ARCH-12, NFR18)
**And** HTTPS is enforced on all routes (NFR17)

### Story 7.5: Final Launch Preparation & Cross-Browser Verification

As Ben,
I want the site to pass all quality gates and be verified across browsers and devices before public launch,
So that no visitor encounters a broken layout, missing image, or accessibility failure.

**Acceptance Criteria:**

**Given** all previous epics and stories are complete
**When** the final audit is performed
**Then** Lighthouse SEO score is ≥ 95 on all pages (NFR3)
**And** Lighthouse Accessibility score is ≥ 90 on all pages (NFR4)
**And** the site renders correctly in Chrome, Safari, Firefox, and Edge (latest versions)
**And** zero broken links or 404s exist across the site (NFR15)
**And** the contact form provider (Formspree) is configured and tested with a real submission
**And** the custom domain (`ben[lastname].dev`) is configured and serving over HTTPS
**And** the `prefers-reduced-motion` behavior is verified on a real device
**And** a manual keyboard-only navigation test confirms all content is reachable and all forms are submittable
**And** the site is deployed to production and publicly accessible
