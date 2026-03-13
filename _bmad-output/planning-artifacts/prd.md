---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['_bmad-output/planning-artifacts/product-brief-portfolio-2026-03-13.md', '_bmad-output/brainstorming/brainstorming-session-2026-03-13-001.md']
workflowType: 'prd'
status: 'complete'
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'low'
  projectContext: 'greenfield'
---

# Product Requirements Document — Portfolio Website

**Author:** Ben
**Date:** 2026-03-13
**Status:** Complete

---

## Executive Summary

Ben's portfolio website is a personal brand platform engineered to function as a long-term consulting and freelance inbound lead generation engine. The primary objective is not job applications — it is making Ben discoverable by the right people so that contracts and opportunities arrive without active outreach. The north star: *"I didn't apply for that contract — they found me."*

Ben is a final-year CS + Marketing dual-degree student (graduating 2027) based in Tauranga, NZ, currently employed as a full-stack developer building medical practice software using PHP, Laravel, and Vue.js. This dual background — technical depth combined with marketing and communication literacy — is the core differentiator and must be expressed through the site's architecture, copy, and visual identity, not merely stated in an about section.

The target market is NZ-centric with remote-first secondary reach: Tauranga-primary, Auckland/Hamilton/Wellington secondary, NZ-wide remote tertiary. Two audiences share the site simultaneously — freelance/consulting clients (greenfield web projects, SME operators) and hiring managers at remote-first companies seeking full-stack developers. Both audiences are served by the same content through dual-audience writing and self-segmenting contact paths.

The site is Version 1.0 of what will eventually become Ben's consulting agency web presence. Every architecture decision must preserve the evolutionary path from portfolio → agency without a rebuild.

### What Makes This Special

Six differentiators separate this site from every other graduate portfolio:

1. **The CS + Marketing bridge** — Ben is fluent in both code and persuasion. The copy doesn't sound like a developer wrote it without knowing how to sell. This is demonstrated through case study narratives, not claimed in an about section.
2. **Performance+3D Paradox as own case study** — The site itself (Astro + React Three Fiber, Lighthouse 90+, animated 3D hero) is the primary portfolio artefact. Shipping impressive 3D that scores near-perfect performance is the proof of capability.
3. **Minimalist 3D hero (Synthesis D)** — Clean, considered, tasteful WebGL scene that signals design maturity, not "I found a Three.js tutorial." The technical sophistication is implied by how it feels, not by overwhelming the viewer.
4. **NZ regional SEO targeting** — "web developer Tauranga," "freelance developer New Zealand" — minimal competition, high-intent searches from exactly the audience Ben wants to reach.
5. **Dual-audience contact architecture** — Two self-segmenting call-to-action paths. One for clients ("Let's build your next project"), one for employers/collaborators ("Discuss a role or collaboration"). One headline: "Let's build something together."
6. **Agency-ready content architecture** — CMS-ready structure (Astro content collections) without deploying a CMS. When Ben's consulting pipeline grows, the site scales to agency without rewiring the codebase.

## Project Classification

| Field | Value |
|---|---|
| **Project Type** | Web App — Static MPA with React Three Fiber interactive islands |
| **Domain** | General — Personal brand / professional portfolio |
| **Complexity** | Low — No regulated industry, no multi-tenancy, no compliance requirements |
| **Project Context** | Greenfield — Net new product, no existing codebase |
| **Tech Stack** | Astro + React Three Fiber + Tailwind CSS |
| **Hosting** | Vercel or Netlify (free tier for MVP) |
| **Domain** | `ben[lastname].dev` (register immediately) |

---

## Success Criteria

### User Success

**Freelance/consulting clients (primary):**
- A visitor landing from a Google search for "web developer Tauranga" or "freelance developer NZ" can identify Ben's value proposition and reach the contact form within 60 seconds of arrival.
- A prospective client reading a case study can answer: "What was the problem? What did Ben build? What was the outcome?" — without ambiguity.
- Contact form completion results in a response from Ben within 24 hours (operational, not a site requirement, but the contact experience sets the expectation).

**Remote hiring managers (secondary):**
- A hiring manager arriving from a LinkedIn profile or referral can locate Ben's tech stack, current role, and at least one code-adjacent case study within 90 seconds.
- Downloading a CV (if surfaced) requires no more than one click from the homepage.

**Recruiters:**
- Ben's skills, stack, and location are scannable in under 30 seconds. No hunting.

**All visitors:**
- The site loads fast enough that no visitor abandons due to performance. Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID/INP < 200ms on mobile 4G.
- No visitor encounters a broken layout, 404, or missing image at launch.

### Business Success

| Metric | Target | Timeframe | Measurement |
|---|---|---|---|
| First inbound freelance enquiry | ≥ 1 | Within 6 months of launch | Contact form / direct email |
| Google ranking — "web developer Tauranga" | Page 1 | Within 12 months | Google Search Console |
| Google ranking — "Ben [lastname]" (name search) | Position 1 | Within 3 months | Google Search Console |
| Monthly organic impressions | ≥ 500 | Within 6 months | Google Search Console |
| Lighthouse Performance score | ≥ 90 | At launch | Lighthouse CI |
| Lighthouse SEO score | ≥ 95 | At launch | Lighthouse CI |
| Lighthouse Accessibility score | ≥ 90 | At launch | Lighthouse CI |

**Vanity metrics to ignore:** total pageviews, social shares, "bounce rate" (single-page visits from a portfolio are not bounces — they may have gotten what they came for).

### Technical Success

- Lighthouse Performance ≥ 90 on mobile (3D hero must not tank this — R3F island is lazy-loaded and limited to hero section only).
- Zero render-blocking resources in the critical path.
- All pages pre-rendered as static HTML (Astro default) — no client-side routing required for SEO-critical pages.
- Core Web Vitals pass Google's "Good" threshold across all pages.
- Structured data (JSON-LD) on the homepage: `Person` schema with name, jobTitle, url, sameAs links.
- Zero console errors in production.

### Measurable Outcomes

- North star achieved when Ben receives a contract enquiry he did not initiate.
- SEO foundation validated when Google Search Console shows impressions for "web developer Tauranga" or equivalent regional queries.
- Design quality validated when an unsolicited third party compliments the site's visual identity (qualitative, but a real signal).

---

## User Journeys

### Journey 1 — David (Freelance Client, NZ SME Operations Manager)

David runs a 12-person waste management logistics company in Tauranga. He uses spreadsheets for job scheduling and knows it's killing efficiency. His business partner mentioned getting a custom app built. He Googles "web developer Tauranga" on a Tuesday afternoon.

**Opening scene:** Ben's site appears in the top 5 results. The title tag reads something like "Ben [Lastname] — Full-Stack Web Developer, Tauranga NZ." David clicks.

**Rising action:** The homepage loads fast. The 3D hero is visually striking but doesn't slow things down — he's seen sites take 10 seconds on his phone; this isn't that. The headline speaks to him: he doesn't need a developer who can only do templates. Below the hero he sees: "Full-stack developer. I build tools that solve real operational problems." The About section mentions logistics software in the context of past work. He scrolls to a case study on the carbon tracking app (or the team's medical practice scheduling system, anonymised). The case study is written like a story: the problem, the constraint, what was built, the outcome in plain language.

**Climax:** David reads the case study and thinks "this person gets it — they understand what it's like to have a messy workflow and need it fixed." He hits the contact section. The headline: "Let's build something together." There are two obvious paths — one says "I'm looking for a developer for a project." He clicks that. A simple form: name, email, what they need, timeline.

**Resolution:** David submits. He feels confident he's made an enquiry to a real person who will understand what he needs. Ben follows up within 24 hours. David does not regret not calling three agencies.

**Capabilities revealed:** Regional SEO, fast load on mobile, hero value prop, case study with problem/build/outcome structure, dual-path contact with project-focused CTA, contact form.

---

### Journey 2 — Sophie (Remote-First Hiring Manager, Auckland SaaS Startup)

Sophie is Head of Engineering at a 30-person SaaS startup in Auckland building B2B HR software. They're remote-first. She's seen Ben's GitHub profile via a mutual contact. She wants to know if he's worth pursuing for a junior/mid full-stack role.

**Opening scene:** Sophie navigates directly to `ben[lastname].dev`. She's seen a hundred portfolios. Most are either over-designed toy projects or under-designed walls of text.

**Rising action:** The 3D hero catches her eye — tasteful, not trying too hard. She skims the skills section: PHP/Laravel/Vue.js (matches their stack), Astro (shows curiosity), React Three Fiber (unusual — signals self-driven learning). The About section is readable and direct: CS + Marketing degree, currently building medical practice software, interested in greenfield product work.

**Climax:** She opens the case study on the portfolio site itself. It's written as a technical case study — stack decisions, performance budgeting, the reason Astro was chosen over Next.js, the WebGL scene's performance impact and how it was mitigated. This is the credibility signal she needed: he can make architectural decisions, not just implement tickets.

**Resolution:** She clicks "Discuss a role" in the contact section. She leaves her name, email, and a short note about the role. She emails a link to Ben's site to her co-founder with "worth speaking to."

**Capabilities revealed:** Skills/stack section, self-referential technical case study, second contact path (role/collaboration CTA), professional presentation that holds up under scrutiny.

---

### Journey 3 — Mark (Recruiter, Auckland IT Staffing Agency)

Mark receives Ben's name from a developer he placed 18 months ago. He visits the site to do a 30-second scan before reaching out.

**Opening scene:** Homepage. Mark needs: location, stack, availability signal, and contact.

**Rising action:** Skills section is clear. Location is in the page title and About — "Tauranga-based, open to NZ-wide remote." Current role is mentioned (full-stack dev, medical sector). He checks there's a contact email or form easily visible.

**Resolution:** He reaches out via the contact form (or email if visible) with a specific role. Ben's site has given him enough to make a personalised approach rather than a generic blast. Ben can choose whether to respond.

**Capabilities revealed:** Scannable skills section, clear location/availability signal, contact always accessible (not buried), email or contact form as primary contact method.

---

### Journey 4 — Jasmine (Creative Director, NZ Design/Dev Agency)

Jasmine is scouting for a contract developer who can bridge design and code. She's been burned by developers who "can implement a design" but have no taste of their own. A designer she follows liked Ben's site on LinkedIn.

**Opening scene:** Jasmine opens the site expecting the usual. She sees the 3D hero and immediately slows down. The scene is minimal — not a particle explosion, not a spinning logo. It's considered.

**Rising action:** She explores the about section. CS + Marketing — she notes this immediately. The copy on the site is good. It doesn't sound like a developer wrote it. She checks the case study and looks at the process artifacts (if included in Phase 2): wireframes, decision rationale, design system choices. The console.log easter egg on the homepage makes her smile — "made with Astro + R3F ☕" — small signal that there's a person here, not a template.

**Resolution:** Jasmine adds Ben to her "creative dev" shortlist. She uses the collaboration contact path. She's interested in a potential revenue-share engagement on a client project.

**Capabilities revealed:** Visual quality of 3D hero, taste in type and layout, copy quality, CS+Marketing positioning, console.log easter egg, collaboration contact path.

---

### Journey Requirements Summary

| Capability Area | Revealed By |
|---|---|
| Regional SEO (Tauranga, NZ) | David's Google search |
| Mobile performance (fast load, Core Web Vitals) | David's mobile context |
| Hero value proposition (headline) | All journeys — first impression |
| 3D hero scene (visual credibility, taste signal) | Sophie + Jasmine |
| Skills/stack section (scannable) | Sophie + Mark |
| Case studies with problem/build/outcome structure | David + Sophie |
| Self-referential technical case study (site itself) | Sophie |
| About section (background, location, availability) | Sophie + Mark |
| Dual-path contact (project vs role/collaboration) | David + Sophie |
| Contact form | David + Mark |
| Console.log easter egg | Jasmine |
| Process artifacts (wireframes, design decisions) | Jasmine (Phase 2) |

---

## Innovation & Novel Patterns

### Detected Innovation Areas

Two genuine innovation signals are present in this project:

**1. The Performance+3D Paradox — Portfolio as Living Case Study**
Most personal sites either have impressive 3D (and score 40 on Lighthouse) or score 100 (and look flat). Achieving both simultaneously — React Three Fiber island architecture within Astro's static shell, lazy-loaded and scoped to hero only — is a non-trivial engineering and design challenge. The fact that the site itself demonstrates this resolution makes it a self-referential case study. No other portfolio in Ben's market will make this argument credibly because almost none will have attempted it.

Signal detected: "Combining [A + B] for the first time [in this context]" — static-first MPA architecture with WebGL islands for a personal brand site is an unusual combination with meaningful performance implications that, when resolved, become evidence of skill.

**2. The CS + Marketing Dual Lens Applied to Copywriting**
Portfolio copy is universally written by developers who don't know how to write for non-developers. Ben's marketing education means the copy can be written in the voice of a person who understands user needs, business outcomes, and persuasion — while remaining technically credible to engineers. This combination is rare. It means the site reads differently to different audiences without code-switching in an obvious way.

### Validation Approach

- **3D+Performance:** Validated by Lighthouse CI score ≥ 90 at launch with the R3F hero active. If this cannot be achieved, the hero falls back to a CSS/SVG animation — the case study narrative changes to "here's how I approached the tradeoff."
- **Copy quality:** Validated when a non-developer reads the homepage and does not feel excluded, AND when a senior developer reads the case studies and does not feel patronised.

### Risk Mitigation

| Risk | Mitigation |
|---|---|
| R3F hero tanks Lighthouse score | Lazy-load island, limit poly count, use `@react-three/drei` `<Preload />` strategy, test throughout build |
| "Impressive but nothing works" perception | Ship case studies before 3D polish; prioritise content completeness over visual perfection |
| Copy reads as marketing fluff | Use technical specificity in every claim; no adjectives without evidence |

---

## Web App Specific Requirements

### Architecture Overview

Static Multi-Page Application (MPA) built with Astro, using React Three Fiber as an isolated interactive island in the hero section only. All other pages render as static HTML at build time.

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Astro | Zero-JS by default, static HTML output, perfect SEO, island architecture for selective hydration |
| 3D Runtime | React Three Fiber + @react-three/drei | Declarative WebGL, React ecosystem, well-maintained, best DX for this stack |
| Styling | Tailwind CSS | Utility-first, no runtime CSS, Astro-native, fast iteration |
| Content | Astro Content Collections | Type-safe, CMS-ready without a CMS, supports future migration to Contentful/Sanity |
| Hosting | Vercel or Netlify | Free tier sufficient for MVP, zero-config Astro deployment, edge CDN globally |
| Build | Astro CLI + Vite | Built-in, no config required for this use case |

### Browser and Device Support

| Target | Requirement |
|---|---|
| Mobile (iOS Safari, Chrome Android) | Full support — primary discovery device for David persona |
| Desktop (Chrome, Firefox, Safari, Edge) | Full support |
| WebGL support | Required for 3D hero — graceful fallback to static visual if WebGL unavailable |
| JavaScript disabled | All site content readable; R3F island simply doesn't render |

### SEO Requirements

- All pages generate unique `<title>` and `<meta name="description">` tags via Astro frontmatter.
- Homepage includes `Person` JSON-LD structured data schema.
- Sitemap generated at build time (`@astrojs/sitemap` integration).
- `robots.txt` present and correct.
- All images use `<Image />` component (Astro built-in) for automatic optimisation and `alt` text.
- Semantic HTML throughout: `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`.
- Open Graph and Twitter Card meta tags on all pages.
- Canonical URLs on all pages.

### Performance Architecture

- R3F hero island is client-loaded with `client:visible` directive (only hydrates when in viewport).
- No render-blocking scripts in `<head>`.
- Fonts loaded with `font-display: swap` or system font stack until loaded.
- Images use `loading="lazy"` except above-the-fold hero image.
- Total JS bundle for non-hero pages: < 10KB.
- Total JS bundle for hero page including R3F: target < 200KB gzipped.

### Content Architecture (CMS-Ready)

All case studies and project data stored as Markdown/MDX files in `src/content/` using Astro Content Collections with defined schemas. This enables:
- Future migration to a headless CMS (Contentful, Sanity, Tina) without component rewrites.
- Type-safe content authoring in the interim.
- Easy addition of new case studies via new `.mdx` files.

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Experience MVP — the minimum that makes a professional, credible impression and captures inbound interest. The MVP does not need to win design awards; it needs to be polished enough that David, Sophie, and Mark all leave with a positive impression and a clear path to contact Ben.

**Guiding principle from brainstorming:** "Impressive-but-shipped over perfect-but-never-live."

**Solo developer context:** Ben is building this alongside university and full-time employment. MVP scope is deliberately constrained to what can be shipped within a reasonable weekend-sprint commitment without architectural compromise.

### MVP Feature Set (Phase 1)

**Core user journeys supported:** David (freelance enquiry), Sophie (hiring manager assessment), Mark (recruiter scan).

**Must-have capabilities:**

| # | Feature | Justification |
|---|---|---|
| 1 | Domain (`ben[lastname].dev`) registered and pointed | No credibility without owned domain |
| 2 | Homepage with hero headline/value proposition | First impression — 5 seconds to communicate who Ben is |
| 3 | Minimalist 3D hero scene (R3F) with Lighthouse ≥ 90 | Core differentiator; validates the Performance+3D claim |
| 4 | About section with background, location, availability signal | Answers "who is this person" for Sophie and Mark |
| 5 | Skills/stack section (scannable, not exhaustive) | Mark's 30-second scan; Sophie's credibility check |
| 6 | Minimum 1 case study (portfolio site itself) with problem/build/outcome structure | Demonstrates capability without requiring finished external projects |
| 7 | Dual-path contact section ("Let's build something together" headline) | Serves David AND Sophie/Mark without forcing either to feel secondary |
| 8 | Contact form (name, email, message, path selection) | Captures inbound; no friction |
| 9 | SEO foundation: title tags, meta descriptions, sitemap, structured data, OG tags | Enables "web developer Tauranga" discovery path |
| 10 | Console.log easter egg | Costs < 1 hour; personality signal; Jasmine persona delight |
| 11 | Mobile-responsive layout | David uses mobile; non-negotiable |

**Explicitly out of MVP scope:**
- Blog or articles section
- Booking/calendar integration (Calendly etc.)
- Dark/light mode toggle
- Cursor effects
- Page transition animations (beyond basic CSS)
- Second case study (carbon app — not yet built, target Nov 2026)
- Work project case study (requires employer permission — post-MVP when secured)
- Process artifacts / design documentation in case studies
- CV/resume download (can be added as simple PDF link post-launch)

### Phase 2 — Growth (Post-MVP)

Activated once MVP is live, SEO is indexed, and at least one inbound enquiry received:

- Second case study: anonymised work project (medical practice scheduling) — requires employer permission
- CV download link (PDF)
- Case study process artifacts (wireframes, design decisions, architecture diagrams)
- Micro-animations and page transitions (Framer Motion or CSS)
- Custom cursor (desktop only, low priority)
- "Currently working on" / "Recently shipped" timeline section
- Dark/light mode toggle
- Testimonials section (if freelance work begins)

### Phase 3 — Agency Evolution

Activated when consulting pipeline justifies the investment:

- Headless CMS migration (Contentful or Sanity) for content management without code deploys
- Services page (defining consulting offer: web apps, technical audits, MVP development)
- Third case study: carbon tracking app (target build Nov 2026, case study to follow)
- Blog / writing section (SEO amplifier, thought leadership)
- Team/collaborators section (agency signals)
- Booking integration for discovery calls
- Email newsletter opt-in

### Risk Mitigation

| Risk | Mitigation |
|---|---|
| 3D hero vs Lighthouse target conflict | Test Lighthouse throughout; if < 90, reduce scene complexity before launch — never sacrifice score for visual |
| No portfolio projects at launch | The site itself IS case study #1 — document architecture decisions, performance budgeting, stack choices in full detail |
| Scope creep delaying launch | Explicit out-of-scope list above; any addition to MVP requires removing something else |
| Employer refuses work project use | Phase 2 case study becomes Phase 2 anyway; MVP is not blocked |

---

## Functional Requirements

### Content Presentation

- FR1: Visitors can read Ben's value proposition and professional positioning from the homepage within 5 seconds of arrival without scrolling.
- FR2: Visitors can view a structured case study that follows a problem / approach / build / outcome narrative.
- FR3: Visitors can scan Ben's primary technical skills and current stack in a dedicated skills section.
- FR4: Visitors can read Ben's professional background, location, and availability signal in an about section.
- FR5: Visitors can observe the 3D interactive hero scene on the homepage (desktop and capable mobile devices).
- FR6: Visitors on devices without WebGL support receive a non-broken, readable homepage (graceful fallback).
- FR7: Visitors can inspect a console.log easter egg message in browser developer tools.

### Contact & Conversion

- FR8: Visitors can submit a project enquiry via a contact form with fields: name, email, enquiry type (project / role-collaboration), and message.
- FR9: Visitors can identify two distinct contact paths from the contact section — one oriented toward project work, one toward employment/collaboration — from a single contact entry point.
- FR10: The contact section is accessible from the homepage via navigation and via in-page CTAs (minimum two distinct scroll-trigger points in the homepage).
- FR11: Contact form submission results in a confirmation message displayed to the visitor.
- FR12: Ben receives contact form submissions as email notifications (via form provider or serverless function).

### Navigation & Structure

- FR13: Visitors can navigate between all major sections of the site via a persistent navigation element (header nav or mobile hamburger).
- FR14: Each page has a unique, descriptive title and meta description for search engines.
- FR15: The homepage is accessible at the root domain (`/`) and the about, case studies, and contact sections are reachable from it.

### SEO & Discoverability

- FR16: The site generates a sitemap at build time listing all public pages.
- FR17: A `robots.txt` file is present and does not block crawling.
- FR18: The homepage contains structured data (JSON-LD `Person` schema) with Ben's name, job title, location, and social profile links.
- FR19: All pages include Open Graph and Twitter Card metadata enabling rich previews when shared on social platforms.
- FR20: All images include descriptive `alt` text.

### Case Study System

- FR21: Adding a new case study requires only creating a new content file (no component code changes).
- FR22: Each case study page is pre-rendered as static HTML at build time.
- FR23: Case studies are linked from the homepage and from a case studies index (if more than one exists).

### Performance

- FR24: The 3D hero island loads only when the user's browser supports WebGL and the hero section is in the viewport.
- FR25: Non-hero pages contain no runtime JavaScript except that required for the contact form.

### Content Management (CMS-readiness)

- FR26: All case study content is stored in content collection files with defined schemas, separating content from presentation.
- FR27: Site configuration (nav links, social URLs, personal metadata) is centralised in a single config file, not distributed across components.

---

## Non-Functional Requirements

### Performance

- Page load (LCP): ≤ 2.5 seconds on simulated mobile 4G (Chrome DevTools throttling).
- Lighthouse Performance score: ≥ 90 on all pages, including homepage with active R3F hero.
- Lighthouse SEO score: ≥ 95 on all pages.
- Lighthouse Accessibility score: ≥ 90 on all pages.
- Cumulative Layout Shift (CLS): < 0.1 across all pages.
- Total JS payload (homepage with R3F): ≤ 200KB gzipped.
- Total JS payload (non-hero pages): ≤ 10KB gzipped.

### Accessibility

- Semantic HTML on all pages: correct use of `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`, `<h1>`–`<h3>` hierarchy.
- All interactive elements (links, buttons, form fields) keyboard-accessible.
- Color contrast ratios meet WCAG 2.1 AA (minimum 4.5:1 for body text, 3:1 for large text).
- Contact form labels programmatically associated with inputs (`<label for>` or `aria-labelledby`).
- 3D hero must not auto-play animation that could trigger vestibular disorders — respect `prefers-reduced-motion` media query (reduce or disable R3F animation).

### Reliability

- Site is fully static and served from CDN edge nodes — no server to go down during business hours.
- Contact form provider (Netlify Forms, Formspree, or equivalent) must have a documented uptime SLA ≥ 99.9%.
- Zero broken links or 404s at launch (validated by build-time link checker or manual pre-launch audit).

### Security

- No user authentication or session management required.
- Contact form does not expose Ben's personal email address in page source (use form provider middleware).
- No user data stored by the site itself — contact form data handled by third-party provider subject to their privacy policy.
- HTTPS enforced on all routes (handled by Vercel/Netlify automatically).
- Content Security Policy headers configured at hosting layer to prevent XSS (Vercel/Netlify header configuration).

### Maintainability

- Adding a new case study: ≤ 30 minutes for Ben working alone (create MDX file, no component changes).
- Updating personal metadata (skills, bio, social links): ≤ 15 minutes (single config file change).
- Deploying an update: automatic on `git push` to `main` branch via Vercel/Netlify CI integration.
- No build tooling knowledge required for content-only updates (Astro content collections with schema validation surfaces errors clearly).

---

## Appendix: Key Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Primary audience | Freelance/consulting clients | Employment is secondary; Ben is keeping current job |
| Employment timeline on site | Not mentioned | Preserves negotiation flexibility; Ben is open but not urgently seeking |
| Recruiter/developer mode toggle | Rejected | Adds complexity; dual-audience writing achieves same outcome with less overhead |
| Ambient sound | Out of scope | Risk in corporate contexts; no clear upside for target audience |
| Junior/mid labelling | Not self-applied | Confidence-first positioning; let the work and copy convey seniority level |
| Stack for "fancy animations" | Framer Motion (Phase 2) | Not in MVP scope; don't block launch on animation polish |
| Blog | Phase 3 | High effort to populate; SEO benefit comes later; don't launch empty |
| Domain | `ben[lastname].dev` | Register immediately — $12/year investment, high credibility signal |
