---
target: Verena homepage (src/components/verena/VerenaHomepage.tsx)
total_score: 25
p0_count: 2
p1_count: 1
timestamp: 2026-11-06T14-58-58Z
slug: src-components-verena-verenahomepage-tsx
---
# Verena Homepage — Design Critique

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Clear loading/success states on the Analyze form, but the 900ms instant "Scan started" misrepresents a process the FAQ itself says takes longer. |
| 2 | Match Between System & Real World | 3 | Plain-English finding copy ("Color contrast ratio below 4.5:1") is strong; "credits" as a pricing unit is an invented abstraction needing its own FAQ entry. |
| 3 | User Control and Freedom | 2 | Scan Tools carousel has an explicit pause button; the logo marquee and Analyze-mockup loop autoplay indefinitely with no pause (WCAG 2.2.2 gap). |
| 4 | Consistency and Standards | 1 | Three different severity vocabularies in one scroll (DEFICIT/WARNING/VERIFIED vs. "X issues found" vs. "EXPOSED"/"APPLICABLE"), plus 4 of 11 "trusted by" logos are placeholder SVGs mislabeled with real company names. |
| 5 | Error Prevention | 3 | Domain input validates format with inline `role="alert"`, `aria-invalid`, `aria-describedby` — solid. |
| 6 | Recognition Rather Than Recall | 3 | Nav dropdowns carry descriptive subtext; tool tabs pair icon + label. |
| 7 | Flexibility and Efficiency of Use | 3 | Full keyboard roving-tabindex support on the Scan Tools tablist is a genuine accessibility win. |
| 8 | Aesthetic and Minimalist Design | 1 | A confirmed white-text-on-white-card bug makes every finding in the Six Areas accordion unreadable below 1024px, on top of a templated three-card "Getting Started" section and a reused backdrop image across three sections. |
| 9 | Help Users Recognize/Diagnose/Recover from Errors | 3 | Error copy is specific and calm, in the brand's non-alarm palette rather than red. |
| 10 | Help and Documentation | 3 | The FAQ is thorough and directly answers this audience's known skepticism (overlay widgets, authorization, installation). |
| **Total** | | **25/40** | **Mid-band: real strengths undercut by one trust-credibility problem and one genuine rendering bug.** |

## Anti-Patterns Verdict

**Does this look AI-generated?** Mostly no — then one serious crack.

**LLM assessment**: The page avoids the obvious tells (no gradient-on-black, no hero-metric template, no glassmorphism). The `StatementBand` compliance-flow diagram and the specific, evidenced finding cards show real product fluency, not templated filler. The one clear AI-slop tell is `GettingStartedSection`: three identical icon-circle-over-heading-over-body cards, the single most reflexive "AI landing page" pattern on the site. The bigger failure isn't aesthetic slop, though, it's **trust-slop**: real, recognizable logos (Airbnb, PayPal, Spotify) captioned "Trusted by 1000+ website owners" sitting directly under a "We're in Beta" banner.

**Deterministic scan**: Unavailable — the bundled detector script (`detect.mjs`) is missing from this environment. This finding stands on the manual design review and browser evidence pass below instead.

**Browser evidence (independent technical pass)**: Confirms and sharpens the trust-slop finding with a hard fact the design review couldn't see from markup alone: `verenaHomepage.data.ts:56-59` maps four generic placeholder SVGs (`company-logo-a.svg` through `-d.svg`) to `alt` text naming specific real companies — "Adobe," "Airtasker," "Amplitude," "Atlassian" — mixed in with genuinely-named real logo files (`company-airbnb.svg`, `company-paypal.svg`, etc.). That's 4 of 11 "trusted by" logos that are fabricated, not just unverifiable. The same pass also caught something the design review missed entirely: a real rendering bug, not a judgment call. In `SixAreasSection.tsx`, the mobile accordion body is nested inside a container colored white for the (correct, desktop) active-row header, so `AreaDetailCard`'s title/description text inherits white-on-white and disappears on a white card, for all 6 areas, below the 1024px breakpoint. Lighthouse's automated accessibility audit scored 100/100 and missed this entirely, because axe only tested the desktop viewport where the bug doesn't render — proof that the manual cross-breakpoint pass mattered here.

**Visual overlays**: Not generated this run (no live-server injection pass was performed); findings above come from direct screenshot/DOM inspection at desktop (1440px), tablet (820px), and ~500px mobile widths instead.

## Overall Impression

The content strategy and most of the custom illustration work (the compliance-flow diagram, the evidenced finding cards, the motion-reduction discipline) are genuinely above the AI-landing-page bar and hit the brief's "calm authority" register. But two things actively undermine the product's core pitch — trustworthiness around AI-assisted legal/compliance judgment — in ways a skeptical visitor would notice fast: fabricated social proof two scrolls into the page, and a section of the product's actual core content (the six compliance areas) going invisible on mobile and tablet. The single biggest opportunity is fixing those two before anything else; they're both more damaging to this specific audience's trust than any visual-polish issue on the page.

## What's Working

1. **The `StatementBand` compliance-flow diagram** is a custom, product-specific editorial illustration (pages in → six-area review → plain-English findings / developer guidance / optional +Human), not a generic bento grid — it's the clearest execution of the Arc/Stripe register the brand brief asks for.
2. **The Accessibility finding card** (`REVIEW_AREAS[0]`) shows an exact contrast ratio (3.1:1 vs. the 4.5:1 AA minimum) and a specific suggested-fix hex code instead of vague "issues found" language — concrete evidence is exactly what builds competence-trust with an audience wary of unsupervised AI judgment calls.
3. **Motion-reduction discipline**: 20 separate `prefers-reduced-motion` media-query blocks in `index.css` neutralize every keyframe animation, and every JS-driven interval (hero typing effect, avatar orbit, getting-started loop) checks `matchMedia` before running. This is rare, thorough follow-through on the brand's own stated motion principle.
4. **Zero broken requests, zero accessible-name gaps**: all 68 network requests return 200/304, and all 74 interactive elements tested carry a real accessible name. The underlying engineering discipline is solid; the two critical issues below are specific, fixable defects, not a systemic quality problem.

## Priority Issues

**[P0] Fabricated social proof via mislabeled placeholder logos**
- **What**: `TrustedBySection` captions a logo marquee "Trusted by 1000+ website owners." Of the 11 logos shown, 7 are real company files (Airbnb, PayPal, Booking.com, Spotify, Postman, Fivetran, Outreach) but 4 are generic placeholder SVGs (`company-logo-a.svg`...`-d.svg`) whose `alt` text names specific real companies that never provided those logos — "Adobe," "Airtasker," "Amplitude," "Atlassian."
- **Why it matters**: This is exactly the "flashy, trust-undermining AI marketing" this audience is primed to reject, placed two scrolls after a banner admitting the product is in beta. It's also implied-endorsement/trademark exposure for four companies with no relationship to Verena.
- **Fix**: Replace with real beta customers (even a handful, named) or remove the section until genuine logos exist. Delete the 4 fabricated entries regardless of the rest of the decision.
- **File**: `src/components/verena/sections/TrustedBySection.tsx`; data: `src/components/verena/verenaHomepage.data.ts:54-68`.
- **Suggested command**: `/impeccable clarify` (copy/content truthfulness) or direct edit.

**[P0] Invisible content: white-on-white text in the Six Areas mobile/tablet accordion**
- **What**: Below the 1024px breakpoint, every one of the 6 compliance-area accordion panels renders its finding titles and descriptions as white text on a white card — content is present in the DOM but invisible to sighted users.
- **Why it matters**: Six Areas is core product content (the actual compliance categories Verena scans for), broken specifically for mobile and tablet visitors, which is likely the majority of this audience. Lighthouse's own accessibility score (100/100) didn't catch it because the automated run only tests desktop width — a reminder that passing scores don't guarantee the page works.
- **Fix**: `AreaDetailCard` (`src/components/verena/VerenaMockups.tsx:264,266,281,282`) needs its own explicit text color instead of inheriting from the ink-purple-colored ancestor wrapper in `SixAreasSection.tsx:42,78-97`. The desktop variant (`SixAreasSection.tsx:102-108`) already renders correctly because it sits outside that wrapper — mirror its color handling for the mobile accordion body.
- **File**: `src/components/verena/sections/SixAreasSection.tsx:42,78-97` and `src/components/verena/VerenaMockups.tsx:264,266,281,282`.
- **Suggested command**: `/impeccable adapt` (responsive-breakpoint defect) or direct edit.

**[P1] Anonymous stock photography on the highest-leverage trust section**
- **What**: `HumanSection`'s orbiting avatars are unlabeled Unsplash stock photos with no names or credentials attached to the "+Human" legal backup message.
- **Why it matters**: The brief's own design principle says human-in-the-loop should be a visible trust feature; illustrating it with the least credible imagery on the page undercuts the one section built to reassure this specific audience about AI making legal judgment calls.
- **Fix**: Use named, credentialed Invictus Counsel attorneys, or drop the decorative orbit for a credentials-forward static layout.
- **File**: `src/components/verena/sections/HumanSection.tsx` (avatar rendering); data: `verenaHomepage.data.ts:290-297`.
- **Suggested command**: `/impeccable craft` (rebuild this section's content/layout together).

**[P2] Touch targets below the WCAG 2.5.8 minimum on mobile and tablet**
- **What**: The four "Show Reports & Evidence / AI-Drafted Document Changes / Developer-Ready Code Suggestions / Monitoring & Rechecks" buttons measure 20×20px at both ~500px and 820px widths — under the 24×24px AA minimum. Primary nav items also shrink to 20px tall at 820px.
- **Why it matters**: Small, inconsistent tap targets on a site marketing accessibility auditing as its core product is a specific, visible contradiction for anyone who checks.
- **Fix**: Raise these to at least 24×24px (ideally 40px+) at both breakpoints.
- **File**: components rendering those four toggle buttons (within `src/components/verena/VerenaMockups.tsx` / `SixAreasSection.tsx` tree) and `SiteHeader.tsx` nav items at the 820px breakpoint.
- **Suggested command**: `/impeccable adapt`.

**[P2] Over-explaining before the trust/pricing payoff, with inconsistent severity vocabulary along the way**
- **What**: Four back-to-back explanatory sections (`StatementBand`, `GettingStartedSection`, `ScanToolsSection`, `SixAreasSection`) run before `HumanSection`/`PricingSection`, and across them the same concept is labeled three different ways: DEFICIT/WARNING/VERIFIED, "X issues found"/"Needs review"/"No issues found," and "EXPOSED"/"APPLICABLE."
- **Why it matters**: Directly contradicts the brief's own persona framing ("want delegation, not education, time-poor, avoidant") and breaks the "calm authority, not alarm" tone — "EXPOSED" in particular reads more alarmist than the rest of the page.
- **Fix**: Cut or merge one of the four explanatory sections (GettingStarted's 3-step recap duplicates StatementBand's diagram and ScanTools' progression); standardize every status chip on the existing `SEVERITY_META` constant.
- **File**: `src/components/verena/VerenaHomepage.tsx` (section order); `verenaHomepage.data.ts:123-286` (REVIEW_AREAS statuses) vs. `:507-511` (SEVERITY_META).
- **Suggested command**: `/impeccable distill`.

## Persona Red Flags

**The anxious, time-poor, AI-skeptical small-business owner, walking through "enter my URL to scan":**

- **Second scroll, before engaging**: sees "Trusted by 1000+ website owners" next to Airbnb/PayPal/Adobe logos, directly under a "We're in Beta" banner — the first thing that reads as inflated, and now (per the evidence pass) it actually is partly fabricated.
- **At the input itself**: no "we only read your public pages, nothing is installed" reassurance near the form — that answer is buried in the FAQ, three scrolls away from the moment of typing a real company domain.
- **Clicking Analyze**: "Analyzing" → "Scan started" resolves in under a second, for a process the FAQ says takes longer — exactly the "instant compliance" silver-bullet theater this brand explicitly positions against.
- **Looking for "who's actually checking this"**: the human-backup message doesn't arrive until section 7 of 11, illustrated with nameless orbiting stock photos — the opposite of reassurance for someone specifically worried about unsupervised AI making legal calls.
- **On a phone, opening the Six Areas detail for "Accessibility"**: the finding title and description are blank. For a product whose entire pitch is "we catch what you can't see," a sighted mobile visitor hitting literally-invisible text is the worst possible version of that bug.
- **At pricing**: asked to reason in "credits," a unit requiring its own FAQ entry, before being able to judge affordability.

## Minor Observations

- Five smaller instances of the Verena wordmark logo (header duplicates, footer, 114×24 down to 57×12px) use `alt=""` while two others use `alt="Verena"` — inconsistent treatment of the same meaningful logo.
- `cta-explorer.webp` (hiker at sunset) is the last visual beat before the footer and reads closer to a travel ad than a legal-compliance product — a tonally weak closing note right before the page ends.
- The footer's honest beta disclaimer ("Verena is in beta. Check important results before you act on them.") is also the smallest, lowest-contrast text on the page, despite likely being one of the most trust-building lines on the site.
- "Talk to founder" (scrappy, early framing) sits two sections above "Trusted by 1000+ website owners" (enterprise-scale framing) — contradictory claims in the same scroll.
- The same `gradientBackdrop` image is reused across Hero, Six Areas, and Scan Tools — noticeable repetition within one session.
- Two lazy-loaded images (`image-19.webp` ×8 uses, `cta-explorer.webp` ×1) render without explicit `width`/`height`, risking layout shift on slow connections.
- `charset` meta declaration is missing/too-late in `index.html`'s `<head>` (Lighthouse Best Practices flag).
- No `llms.txt` or AI-catalog manifest present (Lighthouse's "Agentic Browsing" category, 50/100) — low-stakes today, but worth tracking as that category matures.

## Questions to Consider

1. What if the trust section led with a handful of real, named beta customers instead of a bigger, partly-fabricated "1000+" claim — would a smaller, verifiable number build more trust with this exact skeptical persona than a bigger, unverifiable one?
2. What if "+Human" wasn't a dedicated section seven scrolls down but a single credentialed line surfaced in the hero itself, since the brief says human-in-the-loop should be load-bearing from frame one, not a footnote?
3. What if the Analyze button's outcome matched the FAQ's own honesty about variable completion time, a realistic "Setting up your review, we'll email you" instead of an instant "Scan started", would that cost polish, or would it be the strongest differentiator against the "instant compliance" competitors this brand explicitly positions against?
