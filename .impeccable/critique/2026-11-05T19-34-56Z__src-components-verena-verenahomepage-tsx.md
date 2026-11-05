---
target: src/components/verena/VerenaHomepage.tsx
total_score: 28
p0_count: 3
p1_count: 3
timestamp: 2026-11-05T19-34-56Z
slug: src-components-verena-verenahomepage-tsx
---
# Design Health Score

| # | Heuristic | Score /4 | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Hero scan goes loading → "Scan started" → silently reverts to idle (~2.3s window) with no real outcome |
| 2 | Match Between System & Real World | 2 | "Trusted by 1000+ website owners" sits next to a beta-stage product footer claim |
| 3 | User Control & Freedom | 3 | No way to dismiss/retry the hero scan result once it reverts |
| 4 | Consistency & Standards | 3 | Color/focus tokens are disciplined; border-radius sprawls across ~8 unscaled values |
| 5 | Error Prevention | 3 | Domain input validates well; no guard against the Free + "+Human" price contradiction |
| 6 | Recognition Rather Than Recall | 3 | Pricing grid, nav previews, FAQ categories all surface options directly |
| 7 | Flexibility & Efficiency of Use | 3 | Full keyboard nav (arrow/Home/End) and autoplay pause/resume on tabbed sections |
| 8 | Aesthetic & Minimalist Design | 2 | Distinctive palette/type, but section shape is the generic AI-SaaS template PRODUCT.md disavows |
| 9 | Error Recovery | 3 | Inline validation uses `role="alert"` + `aria-describedby` correctly |
| 10 | Help & Documentation | 3 | FAQ is thorough (12 Q&As, 5 categories) and speaks directly to the audience's named skepticism |

**Total: 28/40 — Good** (low end of band)

# Anti-Patterns Verdict

- **LLM/manual assessment**: AI-slop risk is moderate, not severe. Typography (Bricolage Grotesque), the committed ink-purple/cobalt palette, and disciplined `prefers-reduced-motion` gating keep this off the worst end of the spectrum. But the section sequence — logo wall → dark animated-diagram statement → 3-step → tabbed showcase → orbiting-avatar trust band → pricing grid → FAQ accordion → photo CTA — is the exact generic AI-SaaS template shape PRODUCT.md names as an anti-reference, and the "Trusted by 1000+" fabricated-looking logo wall is a textbook borrowed-credibility move for a brand whose entire pitch is *not* doing that.
- **Deterministic scan**: unavailable. `node detect.mjs --json src/components/verena/VerenaHomepage.tsx` returned `Error: bundled detector not found` (exit 1) — this is a persistent local installation gap in the skill, not a result about your code, and is consistent with every prior run of this detector this session. Proceeded via full manual code review instead.
- **Visual overlays**: not performed. `chrome-devtools-mcp` could not open a page against the live dev server (`http://localhost:52846`, confirmed running) — "The browser is already running for .../chrome-profile. Use --isolated..." — a pre-existing profile-lock limitation in this environment, not something fixable from the available tool surface. No overlay/injection evidence is claimed anywhere in this report. All findings below are grounded in direct source reads of `VerenaHomepage.tsx` (3,689 lines, read in full) and `PRODUCT.md`, with line numbers cited so you can verify each one directly.

# Overall Impression

The page is well-crafted at the component level — motion discipline, accessible severity indicators, keyboard-navigable tabs — but it undermines its own brand thesis at exactly the moments that matter most to its stated audience. PRODUCT.md describes visitors who are "specifically wary of unsupervised AI making legal judgment calls" and skeptical of "instant compliance" silver-bullet marketing. The page then opens its second section with a "Trusted by 1000+" claim next to recognizable brand logos (Airbnb, PayPal, Spotify, Adobe...) that appear nowhere else as real customers, lets its highest-anxiety interaction (typing your real URL) resolve to an ambiguous non-outcome that contradicts its own FAQ, and represents its single most differentiating trust feature (a real human attorney backstop) with anonymous stock-photo avatars. None of this is a craft problem — it's a trust-engineering problem, and trust is this product's entire pitch. The pricing section (recently rebuilt into a real comparison grid) is the strongest structural element on the page; the rest would benefit from the same "make it real, not templated" treatment.

# What's Working

- **Motion discipline is genuinely, consistently honored.** Every animated element — marquee, flow diagram, orbiting avatars, toggles, hero spinner, stage transitions — is gated behind `prefers-reduced-motion` (verified at multiple sites across `index.css` and `VerenaHomepage.tsx`, e.g. lines 852, 1679, 2040, 2231, 2273). This is a named design principle in PRODUCT.md and it's actually implemented everywhere, not just in the hero.
- **The previously-flagged fabricated compliance badges are confirmed removed.** No ISO 27001 / SOC 2 / GDPR / HIPAA badge claims exist anywhere in the current file — a real fix from the last round that held.
- **Severity never relies on color alone.** `SeverityTag`, `FindingIcon`, and `ScoreRing` all pair color with text labels or distinct icon shapes (lines ~1195-1300), correctly implementing the "never rely on color alone" accessibility principle from PRODUCT.md.
- **The new pricing comparison grid is the best-structured section on the page.** Real side-by-side feature rows, a single clear "Recommended" tier, Enterprise pulled out into its own contact bar, full `role="switch"`/`aria-checked`/`aria-live` on the +Human toggle. This is the shape the rest of the page should aspire to.

# Priority Issues

**P0 — Fabricated-looking social proof at the second scroll position.** "Trusted by 1000+ website owners" (line 2756) sits beside a marquee of real, recognizable company logos — Airbnb, PayPal, Spotify, Adobe, Atlassian, Booking.com, Postman, Fivetran, Outreach (`COMPANY_LOGOS`, lines 59-73; rendered ~2716-2753) — for a product whose own footer describes it as beta. This was flagged in the prior full-page critique and is still present. Confirmed independently: four of the twelve logo assets (`company-logo-a/b/c/d.svg`) are generic placeholder shapes whose `alt` text nonetheless names real brands, so even the logo art doesn't match what it claims to be. For an audience PRODUCT.md explicitly describes as skeptical of "instant compliance" marketing theater, this is the single most trust-breaking element on the page.
*Fix:* remove the claim and logo wall until there are real, nameable customers; `$impeccable clarify` on the trust-strip copy, or `$impeccable distill` to decide whether the section should exist at all pre-launch.

**P0 — "Start free with +Human" pricing contradiction.** Toggling the +Human add-on on the Free tier changes the CTA to "Start free with +Human" while the price updates to $49 — "free" directly beside a $49 charge, a reproducible, screenshot-able contradiction at the exact moment a skeptical visitor is deciding whether to trust the pricing at all.
*Fix:* swap the CTA copy when the add-on is active (e.g. "Continue with +Human — $49/mo") instead of keeping the word "free." `$impeccable clarify src/components/verena/VerenaHomepage.tsx`.

**P0 — The hero's highest-anxiety interaction resolves to nothing, and contradicts the FAQ.** Submitting a URL in the hero form runs a `setTimeout` state machine (loading → "Scan started" → idle) with no real account creation or redirect, and "Scan started" directly contradicts the FAQ's own answer that "Entering an address here does not start an analysis." This is the first moment a visitor commits something real (their own site's URL) and it ends in ambiguity instead of reassurance — the opposite of what a "calm authority" brand needs at its riskiest moment.
*Fix:* either make the next real step explicit ("We'll email you when your first report is ready") or stop implying a scan "started." Notably, `src/components/verena/VerenaRedesignedHero.tsx` — an existing, unwired exploration already in this repo (`tempo/designs/canvases/5-0-redesign/`) — already solves this with a concrete, honest partial-result card ("3 of 12 checks complete," a real finding, a blurred locked second finding, "See all 12 findings — create free account") instead of a silent revert. That pattern is worth lifting into production. `$impeccable craft` to build the real flow.

**P1 — "+Human" trust section uses anonymous stock photography for the product's core differentiator.** The orbiting-avatar section uses generic stock headshots to represent "a professional person who takes responsibility for supervising my work" (per the FAQ). PRODUCT.md names human-in-the-loop as "a trust feature, not a footnote," but anonymous decorative faces are the opposite of concrete credibility. The same `VerenaRedesignedHero.tsx` exploration points at a better direction: a named "Supervised by Invictus Counsel · countersigned" credential card placed directly under the hero rather than buried near pricing.
*Fix:* replace orbiting stock photos with something concrete — a real supervising attorney/firm credential, or at minimum move the claim higher up the page with specific, verifiable language. `$impeccable craft` or `$impeccable delight` depending on how far you want to take it.

**P1 — Final CTA is a tonal departure at the most memorable position in the scroll.** The closing section pairs a travel/lifestyle photo (a backpacker pointing at mountains) with "Explore what your website is missing." Per the peak-end rule, this is the last thing visitors remember, and it breaks from the ink-purple/cobalt "calm authority" register built everywhere else in the page.
*Fix:* replace with on-brand imagery, or drop the photo and close on typography/color alone. `$impeccable quieter` or `$impeccable layout` on that section.

**P1 — FAQ and pricing describe two different mental models.** The FAQ describes "two types" of plans — "Standard" and "+Human" — as parallel plan families, while the actual pricing UI models +Human as a toggle across all tiers; no tier is named "Standard." A visitor who reads both will find they don't match.
*Fix:* align the FAQ copy to the toggle model, or vice versa. `$impeccable clarify`.

**P2 — Border-radius has no scale.** At least 8 distinct radius values are used across conceptually similar containers (24px, 20px, 16px, 16(2xl), 14px, 10px, 8px, 4px) with no evident role-based logic.
*Fix:* collapse to a 3-step radius scale tied to component role (e.g. card / control / chip). `$impeccable layout`.

**P2 — "Six areas" section exceeds comfortable choice count, worse on mobile.** Six simultaneous accordion rows is already past the ~4-item guideline; on mobile all six expand into full ~420px detail cards stacked inline instead of the desktop's single shared panel, producing a long, repetitive scroll exactly where scroll fatigue is highest.
*Fix:* progressive disclosure or a lighter mobile summary view. `$impeccable adapt`.

**P3 — Dead links across every trust-sensitive action.** Nine `href="#"` instances span nav items, "Log in," "Talk to founder," "Explore +Human," footer links, and social icons. A skeptical visitor clicking around to verify legitimacy hits dead ends everywhere.
*Fix:* wire to real or clearly-labeled placeholder destinations before launch. `$impeccable harden`.

# Persona Red Flags

**Jordan — first-time, skeptical, anxious visitor:**
- Scrolls past the hero straight into "Trusted by 1000+ website owners" next to Airbnb/PayPal/Spotify logos — plants doubt before any real value has been shown.
- Types their real company URL (their single most vulnerable action on the page) and gets "Scan started," which silently reverts to "Analyze" within ~2.3 seconds with no explanation.
- If they then open the FAQ item "Do I need an account before I can analyze my site?" they'll read "Entering an address here does not start an analysis" — directly contradicting what the button just told them.

**Casey — mobile visitor:**
- The "Six areas" section stacks six full ~420px accordion detail cards inline instead of the desktop's single shared panel — a long, heavy, repetitive scroll.
- Pricing switches to three stacked cards, each repeating the full 6-row feature list — more scrolling and re-reading to compare tiers than desktop's side-by-side grid affords.
- FAQ category tabs scroll horizontally with the scrollbar hidden and no visual affordance that a 5th category exists off-screen.

**Riley — skeptical stress-tester:**
- Clicks "Log in," "Talk to founder," "Explore +Human," any footer link, any social icon — all `href="#"` — and concludes within seconds that parts of this isn't a real, finished product.
- Toggles "+Human review" on the Free tier and gets "Start free with +Human" at $49 — an easily reproduced, screenshot-able contradiction to point to.
- Cross-references the FAQ's "two types of plans" language against the actual pricing grid and finds no "Standard" plan exists as described.

# Minor Observations

- Two independent autoplay cadences (hero loop and tool-tab loop) exist for visually similar showcase patterns with no shared timing token.
- Header logo `<img>` lacks explicit `width`/`height` while the footer's identical logo sets both — inconsistent CLS-safety handling for the same asset.
- The Analyze button's `aria-label` duplicates its own visible text content — redundant but harmless markup.
- Toggling +Human on Free shows "$49" with no "/mo" suffix (Free's `period` is empty) even though the toggle's own subtext says "+$49/mo" for the same number in the same card.
- Nav dropdown item descriptions sit around ~4.8:1 contrast — technically AA-passing but with little margin; worth a direct check at actual render size.
- The remediation callout's accent-on-tint text color is close enough to the 4.5:1 AA floor to warrant a direct contrast check rather than an assumption.
- The animated compliance flow diagram is a fairly technical, engineering-diagram-style visual for an audience PRODUCT.md explicitly says wants "delegation, not education."
- Two different human-contact CTA phrasings exist at different price points ("Talk to founder" vs. "Talk to sales") — confirm this is a deliberate tone shift and not drift.
- The hero/CTA success window is only ~2.3 seconds total — easy to miss if a user glances away right after submitting.
- Six distinct `rounded-full` pill/button variants use slightly different internal padding without an obvious size-token system tying them together.
- The pricing comparison table's "Credits / month" row applies a monthly-cadence label to Free's one-time starter credit grant, which the Free plan's own copy and the FAQ frame differently.

# Questions to Consider

1. If the "Trusted by" logo wall is aspirational rather than factual, what would earned credibility look like instead — a real beta-usage number, one named case study, or genuinely nothing until it's true? Does an audience this specifically primed against social-proof theater need a logo wall at all?
2. PRODUCT.md names the human backstop as the single most differentiating trust feature, yet it's rendered as anonymous stock photography in an abstract orbit. What would it look like to make the human the most *concrete* thing on the page instead of the most templated?
3. What is actually supposed to happen when someone submits a real URL in the hero? If this is a placeholder for a real signup/email flow, should the UI say so plainly rather than simulating a full "started" state that silently reverts — turning the page's highest-anxiety moment into its most reassuring instead of its most ambiguous?
