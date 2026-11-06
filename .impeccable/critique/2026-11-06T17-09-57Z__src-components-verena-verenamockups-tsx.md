---
target: six AreaDetailCard widgets (VerenaMockups.tsx)
total_score: 20
p0_count: 0
p1_count: 2
timestamp: 2026-11-06T17-09-57Z
slug: src-components-verena-verenamockups-tsx
---
## Target
Six redesigned `AreaDetailCard` widgets in "Six areas. One website review." (Verena homepage) — `src/components/verena/VerenaMockups.tsx`, data in `verenaHomepage.data.ts`, rendered by `sections/SixAreasSection.tsx`. Live at http://localhost:52846.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Cookie-tracker consent state is `aria-hidden`, invisible to assistive tech; active-tab state otherwise clear |
| 2 | Match System / Real World | 2/4 | A score of 88 is painted the same alarm-red as a 61; a higher number reads as worse |
| 3 | User Control and Freedom | 3/4 | Single reversible click between areas; no deep-link per area |
| 4 | Consistency and Standards | 2/4 | Status copy mixes count-based ("3 issues found") and qualitative ("Needs review") phrasing; accordion buttons carry both `aria-pressed` and `aria-expanded` (no standard pattern combines both) |
| 5 | Error Prevention | 1/4 | The "Suggested fix" CTA renders as a plain `<span>` — no `onClick`/`role`/`tabIndex` — unreachable by keyboard on 4 of 6 cards; cookie toggles mimic a real iOS switch with no functional or disabled-state cue |
| 6 | Recognition Rather Than Recall | 2/4 | No six-up overview; comparing two areas requires memorizing the previous score before opening the next |
| 7 | Flexibility and Efficiency | 2/4 | Single-open accordion only; no "expand all" or comparison view |
| 8 | Aesthetic and Minimalist Design | 3/4 | Flat hairline-divider finding list successfully avoids nested-card clutter; restrained single-accent palette |
| 9 | Error Recovery | 2/4 | Not applicable (no error states in a read-only showcase); neutral |
| 10 | Help and Documentation | 1/4 | No explanation anywhere of what "score," "DEFICIT/WARNING/VERIFIED," or audit labels like "CAN-SPAM Review" mean |
| **Total** | | **20/40** | **Acceptable — significant improvements needed before users are happy** |

## Anti-Patterns Verdict

**LLM assessment**: Low risk of reading as AI-generated overall. The things that usually give it away — six identical templates, decorative gradient blobs, an accent color smeared everywhere, generic filler copy — are specifically absent. Each area's hero visual (contrast swatches, text diff, tracker list, email preview, cited claim) is genuinely bespoke, finding copy is concrete and evidence-grounded ("Current ratio 3.1:1," "CCPA §1798.100"), and the single-accent discipline (blue only on the CTA) is the opposite of typical over-saturation. The one tell: the cookie-tracker toggles are a classic "looks like a real component but isn't wired up" signal — closer to an unfinished prototype than a shipped product.

**Deterministic scan**: the bundled `detect.mjs` engine (`detect-antipatterns.mjs`) is missing from this skill install — no CLI findings were produced. This is a tooling gap, not a clean-scan result; treat the manual evidence below as its substitute, not as confirmation the file is otherwise clean.

**Manual deterministic evidence** (computed directly from the literal hex/opacity/Tailwind values in source, in place of a blocked live-browser read — see Run Notes):
- **Confirmed, WCAG contrast**: `INK` (#210c37) at 50% alpha on white ≈ **3.48:1**, below the 4.5:1 AA floor for small text. Recurs in all six cards via `area.auditLabel` (VerenaMockups.tsx:298) plus four of five `AreaVisual` label variants (lines 218, 243, 265, 269, 282).
- **Confirmed, borderline**: `INK` at 60% alpha (finding-detail text, line 318, used in all 18 finding rows) ≈ 4.81:1 — passes today but with almost no margin.
- **Confirmed, semantics**: the "Suggested fix" CTA (lines 332–337) is a `<span>`, not a button or link — no keyboard path to it, no accessible role, despite being the visually dominant call-to-action on 4 of 6 cards.
- **Confirmed, semantics**: the cookie-tracker consent toggle (lines 245–254) is `aria-hidden="true"` with no sibling text stating consented/not — the one data point it exists to convey is invisible to screen readers.
- **Confirmed, semantics**: `SixAreasSection.tsx:48–49` sets both `aria-pressed` and `aria-expanded` on each accordion trigger — not a standard ARIA combination, and `aria-controls` (line 30) targets a panel that is `display:none` below `lg` (line 106), i.e. invisible to the accessibility tree on the exact viewport where it doesn't apply.
- **Plausible, unconfirmed** (would need live `getBoundingClientRect`): the `focus-visible:ring-offset-2` on the accordion buttons may be clipped by the row's `overflow-hidden` ancestor (SixAreasSection.tsx:36), since there's no margin for the ring to render into.

No false positives to report — nothing here came from a tool that needed second-guessing.

**Visual overlays**: not available this run. Both review channels lost browser access to a shared Chrome profile lock held by a concurrent session (see Run Notes); no `[Human]` overlay was injected, and none is claimed.

## Overall Impression

The craft is real: five bespoke hero visuals instead of one repeated template, concrete evidence-grounded copy, and a disciplined flat/single-accent palette that avoids the nested-card and gradient-smear traps most redesigns fall into. But two things undercut "easy to understand" directly: a score of 88 is painted the same alarm color as a 61 (so the two most prominent signals in the card disagree about which result is actually better), and two different elements — the cookie toggle and the CTA pill — visually promise interactivity that isn't there, in ways that are also invisible to assistive technology. The biggest missed opportunity for "value for users": the product's whole pitch is "one review, six areas," yet the six scores can never be seen on screen together.

## What's Working

1. **Bespoke per-area hero visuals.** Five distinct, domain-appropriate mini-visualizations (contrast swatches, text diff, tracker list, email preview, cited claim) instead of a repeated card template — the strongest differentiator in the section.
2. **Flat, hairline-divider finding list.** No nested card backgrounds, no box-in-a-box (VerenaMockups.tsx:305–322); lets the icon/severity/text hierarchy do the work without visual noise.
3. **Evidence-grounded finding copy.** "Current ratio 3.1:1," "Required under CCPA §1798.100," "Meta Pixel collects data undisclosed to visitors" — reads like a real audit report, which is the single biggest driver of perceived product value.

## Priority Issues

**[P1] Score and color actively contradict each other.**
- **What**: Accessibility scores 88 but is colored with `STATUS_COLORS.deficit` (the most alarming red), while Privacy Policy scores a lower 74 but gets the gentler `.warning` amber (verenaHomepage.data.ts:128 vs 192). `ScoreNumeral` (VerenaMockups.tsx:159–170) uses this color for both the numeral's context and the progress-bar fill.
- **Why it matters**: A score of 88 reads as "good" in virtually every percentage-based mental model. Coloring it like a failing grade means the two most prominent signals on the card disagree — a direct hit against "easy to understand."
- **Fix**: Derive `statusColor` from score bands (e.g. ≥85 green, 70–84 amber, <70 red) so the number and the color always agree.
- **Suggested command**: `impeccable polish`

**[P1] Two elements mimic real controls but are inert and invisible to assistive tech.**
- **What**: The cookie-tracker toggle (VerenaMockups.tsx:245–254) renders a pixel-accurate iOS-style switch with `aria-hidden="true"`, no `onClick`, and no text alternative for its consent state. The "Suggested fix" CTA (lines 332–337) renders as a plain `<span>` — the visually dominant action on 4 of 6 cards — with no `onClick`, `role`, or `tabIndex`, making it unreachable by keyboard entirely.
- **Why it matters**: The toggle borrows the single most recognizable tappable affordance in modern UI; a visitor who tries it and gets nothing will quietly downgrade trust in the one widget meant to demonstrate the product works. Both failures are also real WCAG violations (1.3.1 Info and Relationships; 2.1.1 Keyboard; 4.1.2 Name, Role, Value) — a conspicuous place for an accessibility-auditing product to ship its own accessibility bugs.
- **Fix**: Restyle the toggle as an explicit static status chip ("Blocked"/"Allowed" text) rather than a switch metaphor it can't fulfill, or add visually-hidden state text for assistive tech. Make the CTA a real `<button>`/`<a>` even if it's currently decorative, or visually de-emphasize it so it doesn't read as clickable.
- **Suggested command**: `impeccable audit`

**[P2] No way to compare scores across all six areas at once.**
- **What**: The collapsed accordion rows (SixAreasSection.tsx) show only status text and a colored icon; the numeric score exists only inside the single open `AreaDetailCard`.
- **Why it matters**: The product's pitch is "one review, six areas," yet its own showcase never lets a visitor see all six results together — a textbook working-memory violation that works directly against "easy to scan" and undersells the comprehensive value proposition.
- **Fix**: Add a compact six-up score strip above or beside the accordion, with click-to-drill-in preserved as-is.
- **Suggested command**: `impeccable craft`

**[P2] Meta text fails AA contrast in every card.**
- **What**: `INK` at 50% opacity (≈3.48:1) is used for the audit label on all six cards (VerenaMockups.tsx:298) plus four of the five hero-visual label variants — well under the 4.5:1 AA floor for text this size.
- **Why it matters**: This is the single most-repeated contrast failure in the surface area — it appears on every card, not an edge case.
- **Fix**: Raise to at least 60–65% opacity, or use a fixed muted color with a verified contrast ratio instead of alpha-blended ink.
- **Suggested command**: `impeccable audit`

**[P2] Inconsistent status phrasing and conflicting ARIA states on the accordion triggers.**
- **What**: `area.status` mixes count-based ("3 issues found") and qualitative ("Needs review") phrasing across the six areas. Separately, each trigger button sets both `aria-pressed` and `aria-expanded` (SixAreasSection.tsx:48–49, not a standard combined pattern), and `aria-controls="area-detail-panel"` (line 30) names a panel that's hidden on mobile, where the real content expands inline instead.
- **Why it matters**: Mixed phrasing forces re-reading instead of pattern-matching across six rows, hurting scannability. The ARIA conflict produces inconsistent screen-reader announcements and, on mobile, references a control relationship that's simply wrong.
- **Fix**: Standardize status phrasing to one convention across all six areas. Pick one ARIA pattern (disclosure: `aria-expanded` only) and point `aria-controls` at the actual expanding region for the current breakpoint.
- **Suggested command**: `impeccable audit`

## Persona Red Flags

**Jordan (Confused First-Timer)**:
- Sees "88" rendered in alarm-red within the first few seconds — the gut-check "is this good or bad?" fails immediately because the number and color disagree.
- Audit labels ("WCAG 2.2 AA Audit," "GDPR / CCPA Review," "CAN-SPAM Review") have zero inline explanation — pure jargon for a non-technical small-business buyer, Verena's most plausible entry-level customer.
- Taps a cookie toggle expecting to "see what Verena finds," gets silence, and may conclude the whole report is a static illustration rather than a real product.

**Casey (Distracted Mobile User)**:
- Tapping a collapsed row opens a 420px-tall block inline — a large, sudden layout push that can disorient a one-handed, interrupted user who has to scroll to find where the content landed.
- Comparing two areas means repeated taps plus scroll-back-up, since the accordion is single-open and nothing stays pinned.
- The collapsed row never shows the numeric score, only status text, so there's no way to skim-scan while half-attentive.

**Sam (Accessibility-Dependent User)** — chosen deliberately, since accessibility auditing is this product's core pitch, making a11y bugs here especially credibility-damaging:
- The cookie-tracker toggles are `aria-hidden="true"` with no text alternative — the one data point they exist to convey is completely invisible.
- The "Suggested fix" CTA, the dominant action on 4 of 6 cards, cannot be reached by keyboard at all.
- The accordion buttons' double `aria-pressed`/`aria-expanded` state and mobile-mismatched `aria-controls` target produce inconsistent or incorrect announcements across screen readers and touch + VoiceOver/TalkBack.

## Minor Observations

- The accent blue leaks slightly outside the "CTA-only" discipline: the Marketing Claims citation footnote marker (`<sup>`, VerenaMockups.tsx:278) is also accent-colored, diluting the "blue = action" signal.
- Terms of Service and Marketing Claims share the identical status copy "No issues found" — harmless, but means the title alone differentiates them when scanning quickly.
- `SeverityTag` is plain colored text with no background (VerenaMockups.tsx:150–157), while the collapsed-row status badges use filled pill chips for the same kind of information — a small internal inconsistency in how "status" is represented.
- The `ScoreNumeral` progress bar is only 2px tall × 40px wide — likely too subtle at normal viewing distance to register as a meaningful indicator rather than decoration (unconfirmed, would want a live screenshot).
- Terms of Service is the only area with `visual: null`, making its card noticeably shorter than the other five; on the desktop sticky panel this causes a height jump when switching to/from that one area.
- `activeArea` defaults to index 0 (Accessibility, the most alarming red-coded card) and the section has no closing/summary beat after the six areas, missing a peak-end opportunity to close on a confident, synthesizing note.

## Questions to Consider

1. If the whole point of this section is "one review, six areas," why can a visitor never see all six scores on screen at the same time?
2. What would the card look like if the score and the color always agreed — would the colored badge even be necessary once the number told the truth on its own?
3. If the cookie toggles and the CTA pill can't actually be interacted with, what are they for — would the card feel more honest if it dropped the live-control metaphor entirely in favor of a clearly-illustrative treatment?
