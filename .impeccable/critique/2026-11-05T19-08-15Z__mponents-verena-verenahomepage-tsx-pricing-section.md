---
target: Pricing section — VerenaHomepage.tsx
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-11-05T19-08-15Z
slug: mponents-verena-verenahomepage-tsx-pricing-section
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Toggle→price update is live and `aria-live="polite"`; no confirmation step after clicking a plan CTA (acceptable if it navigates onward). |
| 2 | Match System / Real World | 3 | "Credits/month" language is plain, but nothing in the section ties a credit count to a real-world unit (e.g. "~1 scan ≈ X credits"). |
| 3 | User Control and Freedom | 3 | +Human toggle is instantly reversible; no destructive or hard-to-undo actions in this section. |
| 4 | Consistency and Standards | 2 | This section still uses `gap-4 sm:gap-16` between heading and table, now inconsistent with the FAQ section directly below it, which was just tightened to `sm:gap-8`. |
| 5 | Error Prevention | 4 | No form inputs; nothing to get wrong. |
| 6 | Recognition Rather Than Recall | 2 | Features render as free-wrapping pill tags per row instead of aligned columns, so comparing what changes between tiers requires reading and remembering each row in full. |
| 7 | Flexibility and Efficiency | 3 | The +Human add-on toggle gives real configurability without complicating the base choice. |
| 8 | Aesthetic and Minimalist Design | 3 | The bordered-row format (not a card grid) is genuinely distinctive, but 4 tiers × toggle × wrapping pills reads dense on desktop widths. |
| 9 | Error Recovery | 4 | N/A — no error states exist in this section. |
| 10 | Help and Documentation | 2 | No inline "compare plans" or credit-equivalence help; the only cross-reference lives in the FAQ, not in the pricing section itself. |
| **Total** | | **29/40** | **Good — solid foundation, held back by comparison difficulty and a stray inconsistency** |

#### Anti-Patterns Verdict

**LLM assessment**: This section avoids the worst AI-slop tell for pricing: it is **not** a grid of identical cards (the shared design laws explicitly ban that). Using a single bordered list of horizontal rows, with the featured "Professional" plan solid-filled in ink-purple rather than a generic "Most Popular" ribbon, is a legitimately bespoke choice. No gradient text, no glassmorphism, no hero-metric template. The main anti-pattern risk is structural, not decorative: 4 flat tiers with free-flowing feature pills is the easy "list everything" default rather than a considered comparison, and it reproduces a common pricing-page failure (hard to compare, not hard to look at).

**Deterministic scan**: Unavailable — `detect.mjs`'s bundled detector module is missing from this skill install (confirmed again this run via a direct invocation: exit code 1, "bundled detector not found"). This matches the prior full-page critique's finding; it is a gap in the skill install, not a signal about this section.

**Visual evidence**: Reviewed via a full-page render of the live `VerenaHomepage` component (desktop width). The pricing block renders as designed: white bordered container, ink-purple highlight on Professional, consistent plan rows, correctly restored CTA/FAQ sections around it.

#### Overall Impression

The pricing section's structural choice (a bordered comparison list instead of a card grid) is the right instinct and already clears the bar most AI-generated pricing sections don't. The gap is in making that list actually comparable: four tiers, each with a free-text feature list and an optional add-on toggle, ask a first-time visitor to hold a lot in working memory to figure out what actually changes between plans. The single biggest opportunity is turning the feature pills into a real comparison surface (shared rows, presence/absence per tier) rather than per-row prose tags.

#### What's Working

1. **Not a card grid.** The single bordered list with `divide-y` rows is a deliberate, uncommon structural choice for a pricing section and reads as considered, not templated.
2. **Live, accessible price math.** The `+Human review` toggle updates the total price instantly, uses `role="switch"`/`aria-checked`/`aria-label`, and the price region is `aria-live="polite"` — correct behavior and correct semantics together.
3. **Honest framing on the Free tier.** "No credit card required. Enough to see what Verena finds." is calm, specific, and matches the brand's "calm authority, not alarm" principle — no artificial urgency copy anywhere in the section.

#### Priority Issues

**[P1] No way to compare tiers at a glance**
- Why it matters: Each row's features render as independent wrapping pill tags ("Everything in Starter", "Up to 10 websites", …) rather than a shared set of comparison rows. A visitor has to read all four feature lists fully and hold them in memory to figure out what actually changes between Starter and Professional — this is exactly the "Recognition Rather Than Recall" and "Working Memory" failure these heuristics flag.
- Fix: Define one canonical feature list (4-6 rows: websites, scan frequency, support tier, review areas, etc.) and render it as a true table/grid with a check, a value, or a dash per plan column, so a single horizontal scan answers "what do I get more of."
- Suggested command: `$impeccable layout`

**[P1] Four visible tiers plus a binary add-on exceeds a comparable decision point**
- Why it matters: The cognitive-load guidance caps pricing tiers at 3 for a single decision point; this section shows 4, and the `+Human` toggle doubles the effective price points per tier (8 total outcomes) with only one plan visually marked as the "right" choice.
- Fix: Consider the global-standard pattern of capping self-serve tiers at 3 (Free, Starter, Professional) and converting Enterprise into a "contact sales" row instead of a priced tier (see alternative concept below).
- Suggested command: `$impeccable distill`

**[P2] Pricing section's heading-to-table spacing now contradicts the FAQ section right below it**
- Why it matters: This section still uses `gap-4 sm:gap-16` between the heading and the pricing table. The FAQ section immediately after it was just tightened to `sm:gap-8`. Two adjacent sections on the same page now use different vertical rhythm for structurally the same "heading, then content" pattern — a direct Consistency and Standards violation that's easy to spot scrolling past both.
- Fix: Match the FAQ's `sm:gap-8` (or pick one shared rhythm value and apply it to both).
- Suggested command: `$impeccable layout`

**[P2] The featured plan's highlight is color-only**
- Why it matters: "Professional" is marked as recommended purely by filling its row with ink-purple and white text. There's no text label ("Recommended", "Most popular") confirming *why* it looks different, which is a weaker signal for a low-vision user or anyone skimming on a washed-out screen.
- Fix: Add a small inline kicker ("Recommended") next to the plan name on the featured row, not just a color change.
- Suggested command: `$impeccable colorize` or `$impeccable layout`

**[P3] Enterprise shows a flat $999/month next to bespoke-sounding features**
- Why it matters: "Custom review areas" and "Dedicated account manager" read as sales-assisted, negotiated features, but they're priced like a fixed self-serve SKU. This is a minor internal tension, not a trust problem, but it's a missed lead-capture opportunity (no path to actually talk to someone before committing to a number).
- Fix: Consider "Contact sales" for Enterprise instead of a fixed price, per the alternative concept below.
- Suggested command: `$impeccable clarify`

#### Persona Red Flags

**Jordan (confused first-timer, the named PRODUCT.md audience)**: Jordan scrolls the pricing table looking for "which one is for me." The only guidance is that Professional is colored differently — nothing tells Jordan *why*. Jordan also has no sense of how far "500 credits" or "5,000 credits" actually goes without leaving the section to check the FAQ, which this exact persona is least likely to do.

**Riley (deliberate stress tester)**: Riley toggles `+Human` on and off rapidly across all four rows to see if anything breaks. Mechanically it holds up (price recomputes correctly, `touched` state gates the toggle animation cleanly) — no red flag found here, which is worth noting as a genuine strength.

**Casey (distracted mobile user)**: Below `lg`, each plan row collapses to a vertical stack (name → price → feature pills → toggle → CTA). That's workable one-handed, but four full stacked rows plus a toggle and button each means a lot of scrolling to reach Enterprise, with no sticky "compare" anchor or jump link back up if Casey gets lost mid-scroll.

#### Minor Observations

- The `+Human review` subtext ("+$49/mo · attorney-supervised") is the clearest articulation on the whole page of what the add-on actually is — consider surfacing this phrasing elsewhere instead of only inside the toggle.
- Price typography (30px) and plan name (20px) are both `bricolage` with similar weight; a slightly larger price or lighter plan-name weight would sharpen the scan path straight to the number.
- No visible "all plans include" footer line (e.g., cancel anytime, evidence-backed findings) — would reduce anxiety for the Free→Starter conversion moment.

#### Questions to Consider

1. If the feature pills became a real comparison grid, would three tiers (Free, Starter, Professional) plus a "Talk to sales" Enterprise row convert better than four fully-priced options competing for attention?
2. Professional is marked "featured" by color alone — would naming the actual reason ("Most teams start here", "Best for ongoing review") do more work than a color-only cue?
3. The `+Human` add-on is the brand's single most important trust differentiator (human-in-the-loop) per PRODUCT.md, but it's represented as a small, off-by-default toggle. Should it be more structurally prominent in the pricing section itself, not just available as an opt-in?
