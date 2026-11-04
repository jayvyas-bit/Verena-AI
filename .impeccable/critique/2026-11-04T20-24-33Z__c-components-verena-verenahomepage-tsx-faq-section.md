---
score: 32
maxScore: 40
p0: 0
p1: 2
p2: 1
p3: 2
timestamp: 2026-11-04T20-24-33Z
slug: c-components-verena-verenahomepage-tsx-faq-section
---
# FAQ Section Critique — "Good questions deserve clear answers."

**Target:** `src/components/verena/VerenaHomepage.tsx` (FAQ section, ~lines 2816-2872), 11 items across 5 categories.
**Register:** brand (marketing/landing page).

## Design Health Score — 32/40 (Good)

| Heuristic | Score /4 | Note |
|---|---|---|
| Visibility of system status | 3 | aria-expanded + chevron rotation correct; no issues |
| Match between system & real world | 4 | plain language, no jargon |
| User control & freedom | 3 | can close any item, but closing is coupled to a single global state |
| Consistency & standards | 2 | breaks WAI-ARIA disclosure pattern (no aria-controls/id pairing) |
| Error prevention | 4 | n/a, no destructive actions |
| Recognition over recall | 3 | category labels aid scanning but fail contrast |
| Flexibility & efficiency | 3 | fine for 11 items; no bulk expand, no deep links |
| Aesthetic & minimalist design | 4 | clean, restrained, on-brand |
| Help recognize/diagnose/recover | 4 | n/a |
| Help and documentation | 2 | no escape hatch / contact CTA when the list doesn't answer the question |

## Anti-Patterns Verdict: CLEAN

No side-stripe borders, no gradient text, no glassmorphism, no hero-metric template, no identical-card-grid, no gratuitous modal. The accordion pattern itself is boring-correct, not AI slop.

## Confirmed via browser (Assessment B, detect.mjs unavailable — bundled detector not found after a real attempt)

- Category label: `rgb(33,12,55)` @ 50% opacity on `rgb(250,250,250)` → **3.44:1 contrast** (browser-measured). Fails WCAG AA (4.5:1); 13px/600-weight does not qualify for the 3:1 large-text exception.
- Answer text: same ink @ 70% opacity → **6.68:1** (browser-measured). Passes AA.
- Accordion buttons: `aria-expanded` present and correct; `aria-controls`/`id` pairing absent on all 12 buttons; no heading element wraps any question.
- Focus ring confirmed on keyboard focus: white 2px + ink 2px ring-offset, clearly visible.
- Accordion state is a single global value: opening an item in one category closes whichever item was open in any other category; clicking the open item closes it, leaving all 11 collapsed with no re-open default.
- Mobile (390×844): clean single-column stack, good tap targets, no overflow. Category-label contrast issue is more visible here since the label stands alone above its items.
- Motion (`.area-accordion-body`, grid-template-rows 0fr→1fr, 350ms cubic-bezier(0.22,1,0.36,1)) correctly gated behind `prefers-reduced-motion`.

## Overall Impression

Structurally sound and visually restrained — this is a FAQ section built with real care about information architecture (5 clear categories, concise answers, FAQPage schema.org markup already wired for rich snippets). It reads as calm and trustworthy, in line with Verena's brand. It falls short of top-tier bars (Stripe, Linear, Attio) on three fronts: items in those products expand independently rather than fighting for one global open slot, each has a visible path to a human when the list doesn't answer the question, and their accordions are wired to the WAI-ARIA disclosure spec precisely (id/aria-controls, heading wrappers) so screen-reader users can navigate by heading. The contrast failure on category labels is the sharpest issue given Verena's own product is an accessibility/compliance scanner — this is a credibility problem, not just a polish one.

## What's Working

- FAQPage schema.org structured data is already correctly wired from `FAQ_ITEMS` — ahead of most startup sites on this.
- Motion is properly restrained and reduced-motion-safe, matching the project's own standard.
- Visible, well-built keyboard focus ring (not suppressed, not just a default outline).
- Clear 5-category taxonomy keeps 11 items scannable instead of one long list.

## Priority Issues

**P1 — Category label fails WCAG AA contrast (3.44:1, needs 4.5:1)**
What: `text-[13px] font-semibold uppercase ... opacity-50` ink on off-white.
Why it matters: PRODUCT.md explicitly mandates WCAG 2.1 AA; Verena sells accessibility/compliance scanning, so a contrast failure in its own FAQ undercuts the pitch directly.
Fix: raise opacity to ~0.75-0.8, or swap to a fixed on-brand muted color tuned for ≥4.5:1 against the section background, then re-verify.

**P1 — Accordion buttons don't follow the ARIA disclosure pattern**
What: no `id`/`aria-controls` pairing between each button and its answer panel; no heading element (`h3`) around the question.
Why it matters: screen-reader users can't jump the FAQ via the Headings list (NVDA/JAWS "H" key), and the button-to-panel relationship isn't programmatically exposed — a standards gap vs. any top-tier FAQ implementation.
Fix: give each panel a stable `id`, point `aria-controls` at it from the button, wrap the question text in `<h3>`.

**P2 — Accordion state is global, not per-item**
What: `openFaq` is a single string; opening a question in any category force-closes whatever was open elsewhere.
Why it matters: loses context when comparing questions across categories; most top-tier FAQ patterns (Stripe, Linear, Attio) let items expand independently.
Fix: track open state as a Set/array of question keys instead of one string.

**P3 — No escape hatch at the end of the FAQ**
What: section ends after the last answer with no "still have questions" path.
Why it matters: Verena's own target user (PRODUCT.md: anxious-but-avoidant SMB owner) is exactly who benefits from a visible next step when their specific question isn't listed; the "Talk to founder" CTA already exists elsewhere on the page but isn't echoed here.
Fix: add a one-line CTA under the last category pointing to the existing "Talk to founder" action.

**P3 — Questions aren't deep-linkable**
What: no URL hash/anchor per question despite FAQPage schema already treating each as a distinct answerable unit.
Why it matters: can't share a link to one specific answer; a missed SEO/UX opportunity top-tier sites capture.
Fix: reuse the ids added for the aria-controls fix as anchors.

## Persona Red Flags

**Sam (accessibility-dependent):** category-label contrast fails AA outright; missing aria-controls/heading wrapper means the FAQ is a "sea of buttons" to a screen reader's heading-navigation shortcut.
**Casey (mobile):** no layout red flags — stacks cleanly at 390px with good tap targets — but the low-contrast category label is more exposed here since it stands alone above each group.
**Riley (stress tester):** clicking the only-open item collapses everything to zero open items; this is a valid (not broken) empty state, no red flag found.

## Minor Observations

- `ChevronIcon` uses `transition-transform duration-300` with default easing, inconsistent with the project's established `cubic-bezier(0.22, 1, 0.36, 1)` used everywhere else for this kind of state change.
- First FAQ item is open by default on load; worth confirming it's actually the most load-bearing question rather than just array order.
