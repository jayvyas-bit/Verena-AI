# 09 — Option 3: "The Live Audit" (scroll-storytelling homepage)

Status: **proposed, not approved for build**. No code or canvas changes have been made for this option. This is the confirmed design brief after one round of audit and revision; see the audit trail at the bottom.

## Concept

A scroll-driven homepage that performs the product instead of describing it: one real site gets scanned, flipped into a report, and that report becomes the feature list, while a persistent path to convert stays visible the entire time.

This is the third of three homepage candidates:
- **Option 1** (production, `VerenaHeroInteractive`): maroon `#2D000F` + yellow `#FCF56F` + cream, Fraunces + Instrument Sans.
- **Option 2** (`VerenaLedger`, `/option-2`): OKLCH paper/ink/pine/clay, Newsreader + IBM Plex Mono.
- **Option 3** (this doc, not built): Restrained neutrals everywhere, with the real product's own status-bar colors (exposed/gap/applicable, sourced from [08-post-login-product-ui.md](./08-post-login-product-ui.md)) as the only saturated accent, confined to the pinned narrative stage.

## 1. Narrative arc, with a CTA touchpoint in every act

| Act | What happens | Mechanic | Conversion touchpoint |
|---|---|---|---|
| **Hero** | One real "finding card," waiting | Static | Header "Start a scan" CTA live from frame one. "Skip the story ↓" link beside the scroll cue. |
| **1 — Analysis** | Audit call-outs annotate the card, scrubbed to scroll; stage dims | Pinned, continuous scrub | Header CTA stays visible and clickable throughout — pinning the stage never pins-and-hides the nav. |
| **2 — Flip** | Card rotates to reveal the report's header | Pinned, continuous scrub | Same persistent header CTA. |
| **3 — Report assembles** | Status bar fills by color, finding cards appear; stage brightens to full light | Pinned, threshold-triggered | Inline CTA appears beside the finished report: "See this for your site →" |
| **4 — Disperse** | Finding cards undock and become the six feature tiles | Pinned, FLIP-animated | — |
| **+Human → Footer** | Normal static document from here | None | Pricing/FAQ nav links jump directly here, bypassing acts 1–4 entirely for anyone who doesn't want the story. |

This is the fix for the original draft's biggest flaw: there is no longer a single CTA gating the end of the page. A visitor can convert in the first second (header), right after the payoff moment (inline), or by skipping straight to pricing (nav) — the story is optional texture on top of an always-open path, not a precondition for one.

## 2. Visual system

- **Color**: Restrained paper/ink base throughout; the only saturated color on the page is the real product's own status-bar palette (exposed/gap/applicable), appearing exclusively during Act 3. No new brand hue — the differentiator is restraint plus one honest, functional burst of color, not a fourth palette.
- **Theme**: light, consistent with Options 1 and 2. Scene sentence: *"A founder evaluating vendors on a weekday afternoon, several tabs open, skeptical of compliance-fear marketing, reading on a laptop before asking a lawyer anything."* Stage dims a few steps during Act 1 (uncertainty), returns to full light the instant the report resolves (clarity) — brightness itself carries the emotional beat.
- **Typography**: Inter stays the UI/body face (already the project-wide `--font-sans`, keeping nav/buttons/footer consistent across all three homepage candidates). Editorial moments (act headlines, report title) use **Source Serif 4** — distinct from Option 1's Fraunces and Option 2's Newsreader, reading closer to technical writing than lifestyle branding. Status chips and data labels use **JetBrains Mono**, distinct from Option 2's IBM Plex Mono.

## 3. Technical architecture and performance budget

- The reduced-motion state is the real HTML default, not a fallback bolted on after. Every act renders its resolved end-state in plain, accessible markup first; the scroll-scrubbed timeline is a progressive enhancement layered on top via GSAP + ScrollTrigger. A failed script load, a reduced-motion preference, and a no-JS environment all land on the same tested, correct page.
- GSAP + ScrollTrigger (~30KB gzipped) loads via dynamic `import()` triggered when the hero enters the viewport, not in the critical bundle — never blocks first paint or the header CTA's interactivity.
- Only `transform`/`opacity`/`clip-path` animate during scrub (GPU-friendly, no layout thrash on every scroll frame).

## 4. Accessibility

- **Keyboard**: header CTA stays in natural tab order at every scroll position — `position: sticky` doesn't remove it from DOM flow, and z-index must never let the pinned stage visually cover it.
- **Screen readers**: a visually-hidden, logically-ordered text equivalent of the narrative sits in the DOM for anyone not perceiving the animation (the pattern data-journalism scrollytelling uses for sticky-graphic sections).
- **Reduced motion**: collapses to the static default described in §3 — no separate design needed.

## 5. Maintenance decision

The report's visual language is a one-time homage to the real post-login product UI, captured as static marketing-owned components, not a live import from product code. Decoupled on purpose: a future product redesign won't silently stale this page, at the cost of a manual refresh here if the real UI changes meaningfully. Worth revisiting in 6–12 months.

## 6. Mobile

Desktop Scrollytelling and Mobile Stacked-Reveal are two separate deliverables sharing the same copy and data, not one responsive layout — a near-second build/test/copy-sync surface, priced in up front rather than discovered mid-build.

## 7. Effort vs. Options 1 and 2

This is the highest-effort of the three homepage candidates: a custom pinned timeline, a near-separate mobile build, and real motion QA, versus Option 1/2's single static layouts. A legitimate cost to weigh against its originality before locking it in as *the* homepage.

## 8. Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Story gates conversion | High | Persistent CTA system, §1 |
| GSAP bundle delays interactivity | Medium | Dynamic import, code-split, loads on hero viewport entry |
| Product UI drifts from this homage | Low-medium | Explicit static-snapshot decision, scheduled manual review |
| Mobile doubles build/QA surface | Medium | Scoped and budgeted as its own workstream |
| Fast-scroll skips/glitches the scrub | Medium | Clamp progress 0–1, test scrollbar-fling and trackpad-flick in QA |

## 9. Success metrics

- Time-to-first-CTA-visibility: 0 (visible in hero, no scroll required).
- Scroll-depth-to-CTA-click-through rate, benchmarked against Options 1 and 2.
- Completion rate of the full story (Acts 1–4) among visitors who don't convert via the header CTA first.

## Revision trail

1. **Initial brief** (produced via `impeccable shape` methodology): full 10-section brief, scroll mechanic researched and specced (GSAP ScrollTrigger over CSS scroll-driven animations or bare Framer Motion), but CTA placed only at the end of the page, after FAQ.
2. **User correction**: "homepage should show a path, not a blocker" — the single end-of-page CTA made the story gate conversion. Fixed by adding a persistent header CTA, a contextual inline CTA after the report resolves, and an explicit "Skip the story ↓" affordance (now §1).
3. **Self-audit** (8 categories, scored): flagged conversion design, technical feasibility (bundle weight), maintenance risk (product-UI coupling), mobile cost, and accessibility (keyboard focus order) as gaps. Overall 7/10 as submitted, 8/10 with the CTA fix alone.
4. **This document**: resolves the remaining four audit gaps explicitly (§3 bundle/lazy-load plan, §4 keyboard/screen-reader specifics, §5 maintenance framing, §6 mobile cost framing), plus §7–9 (honest effort comparison, risk register, success metrics) not present in the original brief.

## Next step

Build is still blocked on explicit user sign-off. Nothing in `src/App.tsx`, `tempo/designs/canvases/3-0/`, or a new component file should change until this brief is confirmed.
