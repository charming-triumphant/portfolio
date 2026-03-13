---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-portfolio-2026-03-13.md
date: 2026-03-13
author: Ben
---

# UX Design Specification — portfolio

**Author:** Ben
**Date:** 2026-03-13

---

## Project Understanding

### Project Vision

Ben's portfolio is a personal brand platform engineered to function as a long-term inbound engine for freelance/consulting work and remote employment opportunities in the NZ market. The defining characteristic: the site is self-referential — it is simultaneously the product being built and the primary portfolio artefact demonstrating capability. Every technical decision documented in building it becomes evidence of skill. North star: "I didn't apply for that — they found me."

### Target Users

**David** — SME operations manager, Tauranga. Discovers via "web developer Tauranga" Google search on mobile. Needs to understand Ben's value proposition and reach contact within 60 seconds. Responds to plain-language problem/outcome case studies and fast local search relevance.

**Sophie** — Head of Engineering, Auckland SaaS startup. Technical evaluator arriving by referral. Needs architectural decision-making evidence, not just project listings. Responds to specificity: "here's why Astro was chosen over Next.js" carries more weight than a skills badge.

**Mark** — IT recruiter, Auckland. 30-second scan: location, stack, contact. All three must be immediately visible without hunting. Needs a "Download CV" path.

**Jasmine** — Creative Director, NZ agency. Judges typography and layout before reading a word. Needs evidence of genuine design taste — not a template, not "a developer who tried to design."

### Key Design Challenges

1. **Performance + 3D Paradox:** The R3F hero must achieve Lighthouse ≥ 90 while delivering a visually impressive first impression. This is solved through island architecture (`client:visible`), pixel ratio capping (`dpr={[1, 2]}`), and scene material choices that require zero texture assets. `MeshTransmissionMaterial` with `samples={4}` and `resolution={512}` on mobile keeps the scene visually compelling while staying mobile-safe. The Canvas component lives in its own React tree, lazy-imported at the Astro `client:visible` boundary — meaning Three.js does not block the initial HTML parse at all. A static CSS/gradient placeholder renders until R3F hydrates, preventing layout shift (CLS).
2. **Dual-audience legibility:** The same page must speak to David (plain language, outcomes) and Sophie (technical depth, architectural reasoning) without code-switching or segmenting the experience. The solution is layered reading: the headline speaks to David, the subhead reassures Sophie, the case study opens for David and deepens for Sophie.
3. **Single case study launch:** The site itself must be compelling as a portfolio piece before any other projects are documented — achieved by treating the construction process as the case study narrative, including Lighthouse scores, R3F performance decisions, and architectural tradeoffs as documented evidence.
4. **Scan vs exploration tension:** Mark needs 30-second scans; Jasmine rewards deep exploration. Information architecture serves both by establishing a clear visual hierarchy that doesn't hide depth behind the scannable layer.

### Design Opportunities

1. **Ownable dark editorial aesthetic:** No competing NZ developer portfolio combines dark + 3D + quality copy. This visual direction is immediately differentiated in the regional market.
2. **Self-validating credibility:** Documenting the site's own Lighthouse scores, R3F performance decisions, and architectural tradeoffs makes every capability claim simultaneously verifiable.
3. **Typography as first signal:** A considered display typeface (Clash Display or Syne) signals design intent before a word is read — visually separating this from default-Inter portfolios before any content is evaluated.
4. **Personality compounding:** Console.log easter egg, micro-copy, 404 page, button labels — each small personality signal compounds into a memorable identity that templates cannot replicate.

### Hero Scene Direction — "Quiet Confidence. Made Deliberately."

**Emotional brief (cross-validated by UX, Architecture, and Design Thinking perspectives):**
The feeling when a visitor sees the hero is: *"this person has taste, and they made it themselves."* Not "wow, 3D" — the wrong impression. The quieter recognition that deliberate choices were made. This distinguishes from templates and cursor-reactive "please be impressed" scenes.

**Technical implementation of this feeling:**
- Geometry: `IcosahedronGeometry` with `MeshTransmissionMaterial` (glass/crystal refraction)
- Lighting: Single `<directionalLight>` + `<ambientLight>` — **no HDRI / `<Environment>` preset** (removing HDRI loader reduces drei bundle; one controlled light source reads as more confident than a borrowed environment)
- Motion: Slow continuous rotation on a clock interval — **no cursor reactivity**
- `frameloop="demand"` with a rotation interval — near-zero idle GPU cost; only re-renders when rotation ticks
- Mobile: `samples={4}`, `resolution={512}` on `MeshTransmissionMaterial` to protect Lighthouse score on mid-range devices
- `<Canvas dpr={[1, 2]}>` — pixel ratio capped to prevent 4K retina GPU spike
- Wrapped in `<Suspense>` with CSS gradient placeholder to prevent CLS during hydration

---

## Core User Experience

### Defining Experience

The portfolio is not a "use frequently" product — it is a **trust artifact**. The entire experience is in service of one moment: a visitor's decision to reach out. Every section earns the visitor's next 10 seconds before earning their full attention. The site's job is to build trust fast enough that the contact decision feels obvious, not effortful.

**Mental model:** Evidence → Context → Invitation
- *Evidence* — The hero's visual quality, load speed, and opening headline. The visitor has already made a pre-verbal judgment about Ben before reading a word.
- *Context* — The case study and about section. The visitor now understands why the evidence is what it is.
- *Invitation* — Contact. Reached when the visitor has already decided. Never requested before trust is established.

**The ONE critical user action:** A visitor arrives, orients within 5 seconds, moves to the content that resolves their specific question, and contacts Ben. The full site is a funnel with one conversion goal and no competing calls to action.

### Platform Strategy

- **Primary:** Responsive web — statically served, CDN-distributed
- **Critical device context:** David (highest-value persona) arrives from a Google search on mobile. Mobile is not a secondary experience — touch-first interactions are the primary design constraint
- **Input:** Touch-first with full mouse/keyboard support. No hover-only interactions for critical content.
- **Browser:** Modern evergreen (Chrome, Safari, Firefox, Edge) + graceful WebGL degradation (static visual fallback if no WebGL support)
- **Offline:** Not required — static CDN serving ensures consistent fast load across visits

### Effortless Interactions

| Interaction | Target |
|---|---|
| Landing and orienting | Who Ben is and what he does is clear within 5 seconds without scrolling |
| Navigating to a case study | One tap/click from anywhere; no hunting |
| Reading a case study | Narrative flow: problem → approach → build → outcome. Each case study card has a visible summary line for scanners; full depth for explorers |
| Reaching contact | Never more than one scroll or one click away from any section |
| Submitting contact form | Three fields + path selector; inline confirmation; no redirect |
| Finding CV download | Contextual in About and Contact sections — not in primary nav (nav stays clean; "Contact" is the single nav CTA) |

**Where we eliminate friction competitors create:**
- Contact buried in footers → our three-point contact architecture (nav CTA, mid-page block, dedicated section)
- Forms with 8+ fields and redirects → 3 fields, inline "sent to [email]" confirmation
- Hover-only states that break on mobile → all critical interactions accessible on touch
- Portfolios with no scan layer → each section has a summary line readable in under 5 seconds

### Critical Success Moments

1. **The 5-second trust check** — Does the homepage feel like it was made by someone competent before the visitor has read anything? Visual quality, load speed, and headline tone establish trustworthiness first. Data (location, stack) is secondary to feeling.
2. **The scan layer test** — Can Mark locate location, stack, and contact in 30 seconds without the page requiring him to read everything? Each section has an entry point visible at scroll speed.
3. **The case study credibility check** — Does Sophie read the case study and think "this person makes architectural decisions, not just builds tickets"? The technical reasoning (why Astro, how R3F was made performant, what was traded off) is the make-or-break content.
4. **Jasmine's 3-second layout test** — Does the typography + spacing + color palette pass "could a designer have made this?" before the first line is read? A pre-verbal judgment that determines whether she reads at all.
5. **The contact form moment** — Does submitting feel like reaching a real person? The confirmation copy ("Thanks — I'll reply within 24 hours") matters as much as the form fields.

### Experience Principles

1. **Trust is built before value is explained** — The site's visual competence, load speed, and opening tone signal trustworthiness before any case study content is read. Evidence precedes argument.
2. **The experience sequences as Evidence → Context → Invitation** — The visitor's trust is earned before their action is requested. The IA reflects this: hero → case study → about → contact, not arbitrary section ordering.
3. **Clarity before cleverness** — Every section earns the visitor's next 10 seconds before it earns their full attention. No section assumes the previous was read.
4. **Proof over claims** — Every statement of capability is adjacent to something that demonstrates it. "I build fast sites" sits next to a Lighthouse score. "I write clear copy" is evident from the copy itself.
5. **Scan first, depth second** — The visual hierarchy enables Mark's 30-second scan without hiding Jasmine's five-minute exploration. Every section has a summary line (scan layer) and available depth (exploration layer). Depth is designed in, not bolted on.
6. **The hero is the stake in the ground, not the whole tent** — The 3D scene makes one confident first impression, then steps back. The rest of the site is clean, fast, and even more polished than the hero — not competing with it.
7. **Contact is never more than one action away** — Persistent nav CTA, mid-page availability block, and dedicated contact section ensure a visitor who decides to reach out at any moment can act immediately.
8. **Restraint is the design statement** — One 3D moment, one accent color, one display typeface, one personality easter egg. Doing less, better, is the proof of taste.

---

## Desired Emotional Response

### Primary Emotional Goals

**The feeling a visitor should have when leaving the site:**
*"That was different. I know what I'd be getting if I called this person."*

Not "wow" — wow fades. The lasting emotion is **quiet certainty**. The visitor doesn't leave buzzing; they leave oriented. They have a clear picture of who Ben is, what he values, and what working with him would look like. That clarity is what converts.

**Per persona:**

| Persona | Target Feeling on Arrival | Target Feeling After Case Study | Target Feeling at Contact |
|---|---|---|---|
| David | "This looks professional — not a student project" | "This person gets what I actually need" | "I feel confident enough to send this" |
| Sophie | "Okay, this one's different" | "This person makes real decisions" | "Worth a conversation" |
| Mark | "Clean, complete, professional" | n/a (scans, doesn't deep-read) | "I have everything I need to reach out" |
| Jasmine | "Someone with actual taste built this" | "There's a real person with a point of view here" | "I want to work with this person" |

### Emotional Journey Mapping

| Stage | Target Emotion | Anti-Emotion to Prevent |
|---|---|---|
| First 3 seconds (pre-scroll) | **Quiet curiosity** — "let me see more" | "Looks like every other portfolio" / immediate disengagement |
| Hero scroll reveal | **Calm impression** — "this is considered" | "Trying too hard" / "tutorial vibes" |
| Reading headline + subhead | **Orientation** — "I know what this person does" | Confusion / ambiguity about what Ben does or who it's for |
| Case study read | **Recognition** — "this person thinks the way I want a developer to think" | Skepticism / "lots of claims, no evidence" |
| About section | **Warmth** — "there's a real person here" | Coldness / impersonal / generic |
| Contact section | **Readiness** — "I know enough to reach out" | Friction / doubt / "is this too formal / too casual?" |
| Form submission | **Relief + confidence** — "that was easy and I believe they'll respond" | Abandonment / uncertainty / "did that actually send?" |
| Return visit | **Familiarity** — "I remember this, it's good" | "Has this been updated? Is this still active?" |

### Micro-Emotions

| Micro-Emotion | Where It Appears |
|---|---|
| **Confidence** | Headline + hero. Visitor's confidence in Ben is built here before anything is read in depth. |
| **Trust** | Case study structure. Problem/build/outcome with evidence — no unsubstantiated claims. |
| **Delight** | Console.log easter egg, 404 page micro-copy, button labels, the loading state copy. Small but compound. |
| **Recognition** | The "CS + Marketing" positioning. Certain visitors will immediately understand the rarity and feel they've found something specific, not generic. |
| **Ease** | Contact flow. Three fields, no friction, inline confirmation — the action the site exists to produce should feel effortless. |

**Emotions to actively prevent:**
- **Skepticism** — occurs when claims outpace evidence. Every capability claim needs adjacent proof.
- **Overwhelm** — occurs when the first viewport is too dense. Restraint in the above-fold layout is functional, not aesthetic.
- **Uncertainty after form submission** — the most common portfolio failure. The inline confirmation must feel warm and specific, not generic.
- **The "is this still active?" doubt** — prevented by a last-updated micro-signal and copy that sounds like a present-tense person, not a frozen artifact.

### Design Implications

| Target Emotion | UX Design Approach |
|---|---|
| Quiet first impression | Hero scene uses `frameloop="demand"`, slow rotation, no cursor reactivity. It doesn't demand attention — it rewards it. |
| Trust from structure | Case studies follow the same problem → approach → build → outcome template every time. Consistency is itself a trust signal. |
| Warmth in About | First-person voice, specific details (Tauranga, medical practice context, university timeline), one specific human detail beyond credentials. |
| Delight from personality | Console.log easter egg is delivered in a voice that sounds like Ben wrote it at 11pm. Not corporate. Not try-hard. |
| Readiness at contact | The contact headline ("Let's build something together") is an invitation, not a transaction. The form copy asks, not demands. |
| Relief after submission | Inline confirmation uses the visitor's first name if provided: "Thanks [name] — I'll reply within 24 hours." Personal, not generic. |
| Confidence in scannability | Skills section uses confidence tiers rather than fake progress bars: "Ship in" / "Build in" / "Learning" — honest and memorable. |

### Emotional Design Principles

1. **The visitor's feeling precedes the copy** — The site establishes an emotional register (calm confidence, dark editorial aesthetic, unhurried layout) before a single word is processed. Design earns the right for the copy to be believed.
2. **Delight is earned through restraint** — One easter egg, not five. The console.log moment lands because nothing else is trying to be clever. Delight requires contrast.
3. **Evidence triggers trust, not claims** — "Lighthouse 95+" next to the case study is more emotionally powerful than "I build performant sites" in an about section.
4. **The contact moment is the emotional climax** — The entire site's emotional arc terminates at the decision to reach out. Every prior section is pre-work for that moment. The contact section cannot be an afterthought in copy, layout, or confirmation experience.
5. **"Last updated" is an emotional signal** — A subtle date or "last active" indicator prevents the fear that this site is a ghost. The portfolio must feel *inhabited*.

---

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

#### 1. Linear (linear.app) — The benchmark for dark editorial product sites
- **Dark background as signal, not style** — `#0F0F10` base communicates seriousness and craft. Not "dark mode" as a toggle — dark as a considered aesthetic choice.
- **Typography hierarchy with restraint** — One display typeface, large headline, generous line height, nothing crowding anything else. Whitespace is part of the design.
- **Scroll-triggered entrance animations** — Sections reveal with subtle `opacity: 0 → 1` + `translateY(16px → 0)` on IntersectionObserver. Consistent, never surprising, always fast (150–250ms). The Framer Motion `whileInView` pattern.
- **The "proof bar"** — A row of logos or metrics just below the hero. For Ben: Lighthouse scores bar or "built with" tech row.
- **Anti-pattern avoided:** Linear never uses particle effects or 3D — it doesn't need them. Ben uses 3D exactly once (hero only) and operates at Linear-level restraint everywhere else.

**Transferable:** Dark base color, whitespace as layout element, scroll-reveal animations (consistent timing), metrics/proof bar below hero.

#### 2. Stripe (stripe.com) — Dual-audience copy mastery
- **Headline serves the non-technical user** — Business owners understand it. Engineers respect it.
- **Subhead layers technical credibility** — Secondary line introduces APIs, SDKs, and developer language. Engineers nod; non-engineers don't notice.
- **Progressive disclosure in features** — Each feature card has a one-line summary (scan layer) and expandable depth (exploration layer). The "summary line" pattern — every section has a summary + invitation to go deeper.
- **The gradient hero** — One visual moment that defines the brand without requiring 3D. Ben's equivalent is the glass icosahedron.

**Transferable:** Layered headline/subhead for dual audiences, feature cards with scan + depth layers, one branded visual moment as brand anchor.

#### 3. Paco Coursey (paco.me) — Gold standard developer portfolio
- **Minimal navigation** — Name on left, small nav on right.
- **Typography does all the work** — No images above the fold. Typeface choice and sizing hierarchy is the first proof of taste.
- **Case study as prose, not presentation** — Written technical narratives with code samples inline. Exactly what Sophie needs.
- **Personality through micro-copy** — Direct, dry, specific voice. No superlatives. Every word earns its place.

**Transferable:** Minimal nav (name + 3 links + CTA), typography-first hierarchy, case studies as written technical narratives, dry-specific voice.

#### 4. Josh W. Comeau (joshwcomeau.com) — Personality + technical depth
- **"Friendly expert" tone** — Copy reads like a knowledgeable friend, not a consultant pitching.
- **Interactive React islands** — Elements that let you poke at a concept inline.
- **Honest about process** — Documents thinking including dead ends. Model for Ben's self-referential case study.
- **Color as personality** — One accent color, used consistently and sparingly.

**Transferable:** "Friendly expert" copy voice, one accent color used sparingly, case studies that include process + decision rationale.

#### 5. Framer (framer.com) — Scroll animation choreography
- **Staggered reveal pattern** — Content enters in waves. Parent triggers, children stagger at 60–80ms intervals.
- **Exit animations are minimal** — Simpler, faster than entrance animations. Prevents seasick feeling.
- **Performance discipline** — Animations are GPU-composited (`transform`, `opacity` only — never `top`, `left`, `width`, `height`).

**Transferable:** 60–80ms child stagger, `transform`+`opacity` only animations, asymmetric enter/exit, section-level orchestration.

### Transferable UX Patterns

**Navigation:**
- `Name → [Work] [About] [Contact CTA]` — minimal, left-anchored name, right-anchored navigation, "Contact" is a button not a link
- Sticky nav with `backdrop-filter: blur(12px)` + `background: rgba(9,9,11,0.8)` on scroll

**Scroll Animation:**
- Section entrance: `opacity: 0 → 1` + `translateY(20px → 0)`, duration 200ms, easing `ease-out`
- Staggered children: 60–80ms per child via Framer Motion `staggerChildren`
- GPU-safe only: `transform` and `opacity` exclusively
- `prefers-reduced-motion` respected at CSS media query level

**Case Study Card:**
- Large muted sequence number (01, 02, 03)
- Project title in medium weight
- One-line summary (scan layer)
- Tech badge row
- Hover: `translateY(-4px)` lift + subtle shadow increase

**Contact:**
- Headline: "Let's build something together"
- Two-path selector: "I have a project" / "I'm hiring or collaborating"
- Three fields: Name, Email, Message
- CTA: "Send it" (not "Submit")
- Inline confirmation: "Thanks [name] — I'll reply within 24 hours"
- Visible plain-text email below the form

**Skills/Stack (anti-skills-bar):**
- Three confidence tiers: **Ship in** / **Build in** / **Learning**
- Reasoning sentence next to primary stack: "I chose Astro for this site because..."

### Anti-Patterns to Avoid

| Anti-Pattern | Why |
|---|---|
| Fake skill progress bars (PHP: 87%) | Meaningless, unprovable, makes developers cringe |
| "I am a passionate developer" opening | Every portfolio says this. Meaningless. |
| Full-screen loading spinner | Kills LCP and first impression |
| Cursor sparkle/trail effects | Distracting, unprofessional |
| Multiple 3D scenes per project | Complexity without payoff; violates restraint principle |
| "Hire me" as headline | Positions as supplicant, not peer |
| Skills section as logo soup | No reasoning = no differentiation |
| Auto-playing ambient sound | Alienates corporate/open-office visitors |
| Page redirects on form submit | Breaks flow, loses context |
| Hover-only critical navigation | Breaks on touch devices |

### Design Inspiration Strategy

**Adopt directly:**
- Linear's dark base palette and typographic restraint
- Paco Coursey's minimal nav structure and written case study format
- Stripe's dual-audience headline/subhead layering
- Framer's `transform`+`opacity`-only scroll animations at 60–80ms stagger
- Josh Comeau's "friendly expert" voice and one-accent-color discipline

**Adapt for Ben's context:**
- Linear's proof bar → Lighthouse score strip ("Performance 95 · SEO 100 · Accessibility 92") below hero
- Stripe's progressive disclosure → case study cards with summary line for scanners, full page for explorers
- Paco's typography-first approach → adapted with Clash Display or Syne as display face

**Deliberately reject:**
- Any pattern requiring the visitor to "discover" how to navigate
- Any visual effect adding more than 50KB to the bundle without a clear emotional payoff

---

## Design System Choice

### Decision: Custom Design System with Tailwind CSS

**Choice:** Custom design system built on Tailwind CSS utility classes — no component library (no MUI, Chakra, Ant Design).

**Rationale:**
1. **Visual uniqueness is non-negotiable** — This is a design portfolio. Using a recognizable component library (Material Design, Chakra UI) would immediately signal "this developer used a library, not designed a system." Jasmine would notice. Sally would notice. The portfolio IS the case study.
2. **Tailwind is already in the stack** — The PRD specifies Tailwind CSS as the styling approach. Astro has first-class Tailwind support. No additional dependencies.
3. **Small component surface area** — A portfolio site needs ~15 components total. A full design system library is over-engineered for this scope.
4. **Design tokens in Tailwind config** — All color, spacing, typography, and animation values are defined once in `tailwind.config.mjs` and referenced everywhere. This IS the design system.
5. **Zero runtime CSS cost** — Tailwind purges unused styles at build time. The CSS payload will be < 10KB gzipped for the entire site.

### Design Token Architecture

All design decisions are centralized in the Tailwind config as a single source of truth:

```
tailwind.config.mjs
├── colors (semantic tokens: background, surface, text, accent, muted)
├── fontFamily (display, body)
├── fontSize (custom scale: hero, h1, h2, h3, body, small, caption)
├── spacing (8px base unit)
├── animation (entrance reveals, rotation, stagger)
├── screens (breakpoints)
└── extend.boxShadow, extend.backdropBlur (nav glassmorphism)
```

---

## Defining Core Experience

### The Defining Interaction

**Core interaction:** "I scrolled past the hero, read one case study headline, and knew this person was worth contacting."

This is not a feature-rich product. The defining experience is **trust transfer through progressive revelation**. Each scroll-step transfers a small amount of trust:

1. Hero visual → "this person has taste"
2. Headline → "this person knows what they do"
3. Case study card summary → "this person ships real things"
4. Case study depth → "this person thinks clearly"
5. Contact → "I'm ready"

The user doesn't need to be taught a new pattern. They scroll. Each scroll rewards them with evidence. The experience is a **one-directional trust gradient** — confidence increases monotonically as the visitor moves through the page.

### Experience Mechanics

**Initiation:** Visitor lands (via Google search, LinkedIn link, or direct URL). The page loads fast (LCP < 2.5s). The hero renders with a CSS gradient placeholder immediately, then the R3F glass icosahedron fades in when hydrated.

**Interaction:** Scroll. The visitor scrolls at their own pace. Each section entrance is animated with a subtle reveal (Framer Motion `whileInView`). Content is structured so that each section is self-contained — a visitor who skips from hero to contact still gets enough context from the contact section copy alone.

**Feedback:** The nav shrinks on scroll (glassmorphism blur). The active section is implied by scroll position but not highlighted in nav (no scroll-spy needed for 4-5 sections). The 3D hero stays attached to the top and scrolls away — it doesn't follow.

**Completion:** The contact form submission is the completion event. Inline confirmation: "Thanks [name] — I'll reply within 24 hours." The visitor has accomplished their goal. No redirect, no new page.

### Novel vs. Established Pattern Assessment

**Entirely established patterns.** Nothing here requires user education. Scroll, read, click, submit. The novelty is in the *quality* of execution, not the interaction model. This is correct for a portfolio — the visitor should never have to think about navigation.

---

## Visual Design Foundation

### Color System

**Dark editorial palette — premium, confident, not cold.**

| Token | Value | Usage |
|---|---|---|
| `background` | `#09090B` | Page background — near-black with zinc undertone, avoids cold pure black |
| `surface` | `#18181B` | Cards, case study cards, nav background |
| `surface-hover` | `#27272A` | Card hover states, interactive surfaces |
| `border` | `#27272A` | Subtle dividers, card borders |
| `text-primary` | `#FAFAFA` | Headlines, primary body text |
| `text-secondary` | `#A1A1AA` | Supporting text, meta information, dates |
| `text-muted` | `#71717A` | Captions, placeholder text, sequential numbers |
| `accent` | `#3B82F6` | Primary CTA buttons, links, active states — blue chosen for trust association and accessibility on dark backgrounds |
| `accent-hover` | `#2563EB` | Button hover state |
| `success` | `#22C55E` | Form confirmation, "Available for work" dot |
| `error` | `#EF4444` | Form validation errors |

**Accessibility verification:**
- `text-primary` on `background`: contrast ratio 19.4:1 (AAA)
- `text-secondary` on `background`: contrast ratio 7.1:1 (AA)
- `accent` on `background`: contrast ratio 5.3:1 (AA)
- `accent` on `surface`: contrast ratio 4.5:1 (AA, minimum threshold)

### Typography System

| Token | Font | Weight | Size (desktop) | Usage |
|---|---|---|---|---|
| `display` | Clash Display | 600 (semibold) | 72px / 4.5rem | Hero headline only |
| `h1` | Clash Display | 600 | 48px / 3rem | Section titles |
| `h2` | Clash Display | 500 (medium) | 32px / 2rem | Case study titles, subsection heads |
| `h3` | Satoshi | 700 (bold) | 24px / 1.5rem | Component headings |
| `body` | Satoshi | 400 (regular) | 18px / 1.125rem | Body text, case study prose |
| `body-small` | Satoshi | 400 | 16px / 1rem | Supporting text, card descriptions |
| `caption` | Satoshi | 500 | 14px / 0.875rem | Meta information, dates, tech badges |
| `mono` | JetBrains Mono | 400 | 14px / 0.875rem | Code snippets, tech stack labels |

**Typeface rationale:**
- **Clash Display** (Fontshare, free): Geometric sans-serif with distinctive character. Not overused in developer portfolios. Signals intentional design choice. The `/a` and `/g` letterforms are noticeably different from Inter/Roboto.
- **Satoshi** (Fontshare, free): Modern geometric body face. Excellent readability at body size. Pairs naturally with Clash Display without competing.
- **JetBrains Mono** (free): Developer-recognizable monospace. Used sparingly for code and tech labels.

**Line heights:**
- Display/headings: 1.1 (tight, editorial feel)
- Body text: 1.6 (readable for case study prose)
- Captions: 1.4

**Font loading:** Both Clash Display and Satoshi are self-hosted (not Google Fonts) with `font-display: swap`. Subset to Latin characters only. Combined WOFF2 payload: ~45KB.

### Spacing & Layout Foundation

**Base unit:** 8px. All spacing is multiples of 8.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Inline element gaps (icon + label) |
| `space-2` | 8px | Tight element spacing (badge gaps, form field padding) |
| `space-3` | 16px | Standard element spacing (between paragraphs, card padding) |
| `space-4` | 24px | Component internal spacing |
| `space-5` | 32px | Between components within a section |
| `space-6` | 48px | Between subsections |
| `space-8` | 64px | Between major sections (the "breathing room") |
| `space-12` | 96px | Section top/bottom padding |
| `space-16` | 128px | Hero section vertical padding |

**Layout grid:**
- Max content width: `1200px` (centered)
- Side padding: `24px` mobile, `48px` tablet, `64px` desktop
- Single column layout throughout (no multi-column layouts — a portfolio is read linearly)
- One intentional grid break: the About section uses an asymmetric 60/40 split for text and a visual element (photo or illustration)

### Accessibility Considerations

- All color combinations verified against WCAG 2.1 AA minimum
- Touch targets minimum 44×44px on all interactive elements
- Focus ring: `2px solid accent` with `2px offset` — visible on all interactive elements, never removed
- `prefers-reduced-motion`: all Framer Motion animations and R3F rotation disabled
- `prefers-color-scheme`: not applicable (dark-only is the design decision, not a mode)

---

## Design Direction Decision

### Design Directions Explored

Based on all prior analysis, three directions were considered:

**Direction A — "Dark Minimal" (Linear-inspired):**
Pure dark background, white text, blue accent. Geometric sans-serif typography. Zero embellishment. The Paco Coursey extreme — typography and whitespace do all the work. 3D hero is the single visual moment.

**Direction B — "Dark Editorial" (Stripe-influenced):**
Dark background with subtle gradient accents on section transitions. Warmer text tones. More generous spacing. The 3D hero has a subtle background gradient halo. Cards have hairline borders. Slightly more visual richness.

**Direction C — "Dark Expressive" (Awwwards-inspired):**
Dark background with bold color blocks. Oversized typography. Animated section transitions. Custom cursor. Multiple visual moments. Higher visual density.

### Chosen Direction: Direction B — "Dark Editorial"

**Rationale:**
- Direction A is too minimal for a portfolio that needs to demonstrate design capability — it could read as "I didn't design this, I just removed things."
- Direction C risks the "trying too hard" anti-emotion and adds significant bundle weight for marginal trust gain.
- Direction B occupies the sweet spot: the restraint signals taste (Jasmine's test), the editorial quality signals professionalism (Mark's test), and the subtle warmth prevents coldness (David's test).

### Implementation Approach

- Base: near-black background (`#09090B`) with zinc surface layers
- Section transitions: subtle gradient separator (not a hard line) between major sections, using a radial gradient of the accent color at 3-5% opacity
- Card treatment: `surface` background, 1px `border` border, `surface-hover` on hover with `translateY(-4px)` lift
- Hero: glass icosahedron with a subtle radial accent gradient behind it (barely visible, creates depth)
- Nav: sticky `backdrop-filter: blur(12px)` with `background: rgba(9,9,11,0.8)` — visible glass effect on scroll

---

## User Journey Flows

### Journey 1 — David (Freelance Client Discovery)

```mermaid
flowchart TD
    A[Google: "web developer Tauranga"] --> B[SERP: Ben's site appears]
    B --> C[Click: Title + meta description compelling]
    C --> D[Homepage loads < 2.5s on mobile 4G]
    D --> E[Hero: Headline + 3D scene loads]
    E --> F{5-second decision}
    F -->|Stays| G[Scrolls past hero]
    F -->|Leaves| Z[Bounce - failed 5-second test]
    G --> H[Case study card: reads summary line]
    H --> I{Interested?}
    I -->|Yes| J[Taps into full case study]
    I -->|Scans on| K[Scrolls to About section]
    J --> L[Reads problem/build/outcome]
    L --> K
    K --> M[Sees: Tauranga-based, full-stack, CS+Marketing]
    M --> N[Scrolls to Contact section]
    N --> O[Sees: "Let's build something together"]
    O --> P[Selects: "I have a project"]
    P --> Q[Fills: Name, Email, Message]
    Q --> R[Taps: "Send it"]
    R --> S[Inline confirmation: "Thanks David — I'll reply within 24 hours"]
```

### Journey 2 — Sophie (Technical Evaluation)

```mermaid
flowchart TD
    A[Direct URL from referral] --> B[Homepage loads fast]
    B --> C[Hero: 3D scene, notes the taste]
    C --> D[Scans skills section quickly]
    D --> E{Stack match?}
    E -->|No| Z[Leaves]
    E -->|Yes| F[Opens case study: "Building This Portfolio"]
    F --> G[Reads: Why Astro over Next.js]
    G --> H[Reads: R3F performance budgeting]
    H --> I[Reads: Lighthouse scores + evidence]
    I --> J{Credibility check passed?}
    J -->|Yes| K[Scrolls to Contact]
    J -->|No| Z
    K --> L[Selects: "Hiring or collaborating"]
    L --> M[Submits form]
    M --> N[Shares link with co-founder]
```

### Journey 3 — Mark (Recruiter 30-Second Scan)

```mermaid
flowchart TD
    A[Opens URL from recommendation] --> B[Homepage loads]
    B --> C[Scans hero headline: role + location]
    C --> D[Scrolls to Skills section]
    D --> E[Confirms: PHP/Laravel/Vue.js, React, Astro]
    E --> F[Notes: "Tauranga-based, open to NZ-wide remote"]
    F --> G{Has enough info?}
    G -->|Yes - finds contact| H[Nav CTA: "Contact"]
    G -->|Needs CV| I[Scrolls to About → clicks Download CV]
    H --> J[Submits brief enquiry]
    I --> K[Downloads CV PDF]
    K --> J
```

### Journey Patterns

**Common across all journeys:**
- Entry always lands on homepage (no deep-link first contact expected for MVP)
- The hero section is the first trust-building moment for every persona
- Contact is always reachable via nav CTA (one click from anywhere)
- No journey requires more than 3 scroll-actions to reach contact

**Critical path optimisation:**
- David's journey (most valuable) has the fewest required steps: hero → case study card → contact
- Mark's journey must not require scrolling past non-essential content to find stack and location

### Flow Optimization Principles

1. **Zero dead ends** — Every section ends with a clear next action (scroll hint, CTA, or navigation)
2. **No required deep-reading** — David can convert from the summary layer alone; depth is available but never gating
3. **Contact is omnipresent** — Nav CTA, mid-page availability block, dedicated section = three entry points minimum
4. **The case study card is the conversion pivot** — If the summary line is compelling, David clicks in. If not, he still scrolls to contact. The card must work either way.

---

## Component Strategy

### Component Inventory

This site needs exactly 15 components. No more.

| Component | Type | Astro/React |
|---|---|---|
| `<Nav />` | Layout | Astro (static, no JS needed except blur on scroll) |
| `<Hero />` | Section | Astro wrapper + React island (R3F Canvas) |
| `<HeroScene />` | 3D | React (R3F — `client:visible`) |
| `<SectionReveal />` | Animation | React (Framer Motion `whileInView` wrapper) |
| `<CaseStudyCard />` | Content | Astro |
| `<SkillsSection />` | Content | Astro |
| `<SkillBadge />` | UI | Astro |
| `<AboutSection />` | Content | Astro |
| `<ContactSection />` | Section | Astro wrapper + React island (form state) |
| `<ContactForm />` | Interactive | React (`client:visible` — form state management) |
| `<PathSelector />` | UI | React (radio group: project / collaborate) |
| `<Button />` | UI | Astro (primary/secondary/ghost variants) |
| `<ProofBar />` | Content | Astro (Lighthouse scores strip) |
| `<Footer />` | Layout | Astro |
| `<SEOHead />` | Meta | Astro (JSON-LD, OG tags, meta) |

### Custom Component Specifications

#### `<HeroScene />`
- **Purpose:** Glass icosahedron with slow rotation — the single 3D moment
- **States:** Loading (CSS gradient placeholder), Active (scene rendered), Fallback (static gradient if no WebGL)
- **Props:** None (self-contained)
- **Accessibility:** `aria-hidden="true"` — purely decorative. `prefers-reduced-motion` disables rotation.
- **Performance:** `client:visible`, `dpr={[1, 2]}`, `frameloop="demand"`, `MeshTransmissionMaterial` with mobile-safe parameters

#### `<SectionReveal />`
- **Purpose:** Wraps any section content with scroll-triggered entrance animation
- **Animation:** `opacity: 0 → 1`, `translateY: 20px → 0`, duration 200ms, `ease-out`
- **Props:** `delay` (optional, for stagger), `disabled` (respects `prefers-reduced-motion`)
- **Implementation:** Framer Motion `motion.div` with `whileInView` + `viewport={{ once: true }}`

#### `<ContactForm />`
- **Purpose:** Three-field form with path selector and inline confirmation
- **States:** Default, Submitting, Success, Error
- **Fields:** Name (text), Email (email), Message (textarea), Path (radio: "I have a project" / "Hiring or collaborating")
- **Validation:** Client-side HTML5 validation + required fields. No custom JS validation needed for 3 fields.
- **Submission:** POST to form provider (Formspree or Netlify Forms)
- **Success state:** Replaces form with "Thanks [name] — I'll reply within 24 hours" (Framer Motion `AnimatePresence`)
- **Accessibility:** `<label for>` on all fields, `aria-required`, `aria-invalid` on error, focus moves to success message on submit

#### `<CaseStudyCard />`
- **Purpose:** Clickable card linking to a full case study page
- **Content:** Sequential number (01, 02, 03 in muted display font), title, one-line summary, tech badges
- **States:** Default, Hover (`translateY(-4px)` lift + shadow increase)
- **Link:** Entire card is an `<a>` wrapping all content — full-card click target

#### `<Nav />`
- **Purpose:** Sticky navigation with glassmorphism on scroll
- **Content:** Left: name/logo lockup. Right: [Work] [About] [Contact CTA button]. "Available for work" green dot badge.
- **Scroll behavior:** Transparent on top → `backdrop-filter: blur(12px)` + `rgba(9,9,11,0.8)` background on scroll. Transition: 200ms.
- **Mobile:** Hamburger menu (3-line icon) → full-screen overlay with links centered. Contact CTA always visible.
- **Implementation:** Astro component with minimal `<script>` for scroll detection (IntersectionObserver, not scroll event listener — lighter)

### Component Implementation Strategy

**Phase 1 (MVP — ship first):**
All 15 components. This is the minimum viable set. Nothing is optional.

**Phase 2 (Post-MVP):**
- `<PageTransition />` — Astro View Transitions API, zero additional JS
- `<CursorEffect />` — Desktop only, CSS custom properties driven
- `<DarkModeToggle />` — If dark-only decision is revisited
- `<Timeline />` — "Recently shipped" section

---

## UX Consistency Patterns

### Button Hierarchy

| Variant | Usage | Appearance |
|---|---|---|
| **Primary** | Contact CTA, form submit | `accent` background, white text, rounded-lg, `px-6 py-3` |
| **Secondary** | Case study "Read more", Download CV | Transparent with `accent` border, `accent` text |
| **Ghost** | Nav links, inline text actions | No border, `text-secondary` color, underline on hover |

All buttons: `44px` minimum height (touch target), `font-weight: 500`, `transition: 150ms ease-out` on all state changes.

### Feedback Patterns

| State | Pattern |
|---|---|
| **Form success** | Form replaced with confirmation message via `AnimatePresence`. Green check icon + "Thanks [name] — I'll reply within 24 hours." |
| **Form error** | Red border on invalid field + inline error text below field. Error text uses `error` color. Field shakes subtly (single `translateX` animation). |
| **Loading** | "Send it" button text replaced with "Sending..." + subtle pulse animation. Button disabled. |
| **404 page** | Personality moment: "Well, this page doesn't exist — but I do. [Contact me →]" — with the glass icosahedron scene at reduced opacity as background. |

### Form Patterns

- Labels always visible (no floating labels — they create cognitive load)
- Fields: `surface` background, `border` border, `text-primary` input text
- Focus state: `accent` border ring (2px), no background change
- Placeholder text: `text-muted` color, disappears on focus
- Required indicator: asterisk after label text in `text-muted`
- Error: `error` border + inline error text below field
- Field spacing: `space-4` (24px) between fields

### Navigation Patterns

- **Desktop:** Sticky top bar. Left: name. Right: Work, About, Contact (button). Fixed position, z-index above all content.
- **Mobile:** Sticky top bar. Left: name. Right: hamburger icon + Contact (button). Hamburger opens full-screen overlay.
- **Scroll indicator:** No scroll progress bar. The nav glassmorphism transition from transparent → blurred IS the scroll indicator.
- **Active section:** No visual indicator in nav (scroll spy adds JS complexity for minimal value with only 4-5 sections).

### Animation Patterns

| Pattern | Timing | Easing | Properties |
|---|---|---|---|
| Section entrance | 200ms | `ease-out` | `opacity`, `translateY(20px → 0)` |
| Child stagger | 60ms per child | `ease-out` | Same as entrance |
| Card hover | 150ms | `ease-out` | `translateY(0 → -4px)`, `box-shadow` |
| Nav blur transition | 200ms | `ease-out` | `backdrop-filter`, `background-color` |
| Form success swap | 300ms | `ease-in-out` | `opacity` exit + `opacity` enter via AnimatePresence |
| Hero R3F rotation | Continuous, slow | Linear | `rotation.y += 0.003` per frame demand tick |

**All animations:**
- GPU-composited only: `transform` and `opacity`. Never `width`, `height`, `top`, `left`.
- Disabled entirely when `prefers-reduced-motion: reduce` is active.
- `viewport={{ once: true }}` on all scroll-triggered reveals — animate in once, never re-animate.

---

## Responsive Design & Accessibility

### Responsive Strategy

**Mobile-first design.** Layouts are designed for 375px width first, then enhanced for larger screens. David (primary persona) arrives on mobile — this is the first-class experience.

**Desktop enhancements (not mobile reductions):**
- About section gains 60/40 asymmetric split (stacked on mobile)
- Case study cards may sit side-by-side if 2+ exist (stacked on mobile)
- Nav shows full text links (hamburger on mobile)
- Hero headline scales up via `clamp()` fluid typography

### Breakpoint Strategy

| Breakpoint | Value | Layout Changes |
|---|---|---|
| `mobile` | < 640px | Single column, hamburger nav, stacked cards, compact spacing |
| `tablet` | 640px–1023px | Single column with wider content area, hamburger nav, larger touch targets |
| `desktop` | ≥ 1024px | Full nav, About section 60/40 split, side-by-side case study cards (if 2+), max-width container |
| `wide` | ≥ 1280px | Increased section padding, larger hero typography |

**Fluid typography (clamp):**
- Hero display: `clamp(2.5rem, 5vw + 1rem, 4.5rem)` — scales smoothly without breakpoints
- Section titles: `clamp(1.75rem, 3vw + 0.5rem, 3rem)`
- Body text: fixed at `1.125rem` (18px) — body text should not scale with viewport

### Accessibility Strategy

**WCAG 2.1 AA compliance** — the PRD specifies this, and an accessibility score badge is a trust signal for enterprise-facing personas (Mark's government/enterprise contacts).

**Semantic HTML structure:**
```
<body>
  <header> — <nav>
  <main>
    <section id="hero"> — <h1>
    <section id="work"> — <h2> + <article> per case study
    <section id="about"> — <h2>
    <section id="contact"> — <h2> + <form>
  </main>
  <footer>
</body>
```

**Keyboard navigation:**
- Tab order follows visual order (no `tabindex` reordering)
- Skip link: "Skip to content" as first focusable element, hidden until focused
- All interactive elements focusable with visible focus ring (`2px solid accent`, `2px offset`)
- Mobile hamburger menu traps focus when open, returns focus to hamburger on close
- Contact form fields in logical order, submit button last

**Screen reader considerations:**
- Hero 3D scene: `aria-hidden="true"` (decorative)
- Case study cards: link text is the project title, not "Read more"
- nav links: labeled with `aria-label` where text is terse
- Form confirmation: `aria-live="polite"` region announces success/error to screen readers
- Lighthouse score proof bar: each score uses `aria-label="Lighthouse Performance score: 95 out of 100"`

**Motion accessibility:**
- `prefers-reduced-motion: reduce` disables:
  - All Framer Motion animations (set `initial={false}` on motion components)
  - R3F rotation (scene renders static)
  - Nav blur transition (instant state change)
  - Card hover lift (instant state change)

**Color accessibility beyond contrast:**
- Error states use red border + text label (not color alone)
- Success state uses green icon + text message (not color alone)
- "Available for work" badge uses green dot + text (not color alone)

### Testing Strategy

**Pre-launch checklist:**
- Lighthouse Accessibility score ≥ 90 on all pages
- axe-core automated scan: zero critical or serious violations
- Manual keyboard-only navigation test: all content reachable, all forms submittable
- VoiceOver (macOS/iOS) test: all content announced correctly, landmarks navigable
- `prefers-reduced-motion` test: verify all animations disabled
- Mobile touch target test: all interactive elements ≥ 44×44px
- Color contrast verification via Chrome DevTools accessibility audit
