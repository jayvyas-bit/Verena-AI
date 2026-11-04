# Verena Hero Redesign — Research

Research and planning for the verena.ai hero redesign, done as a multi-persona pass
(lead designer, content strategist, CEO, CPO, frontend/backend engineer) before any
build work resumed. Read `06-confidence-and-gaps.md` first — it's the honest
calibration of what below is actually verified vs. inferred.

## Contents

| File | Covers |
|---|---|
| [00-verena-current-state.md](./00-verena-current-state.md) | What verena.ai actually says and sells today (fetched directly, not inferred) |
| [01-audience-emotion.md](./01-audience-emotion.md) | The emotional state of Verena's target user |
| [02-tech-company-benchmarks.md](./02-tech-company-benchmarks.md) | Design/UX benchmarks from top tech companies |
| [03-global-startups.md](./03-global-startups.md) | Where Verena sits among AI-agent / compliance startups |
| [04-competitors.md](./04-competitors.md) | Direct and adjacent competitors, by tier |
| [05-proposed-plan.md](./05-proposed-plan.md) | The proposed redesign plan, derived from the above |
| [06-confidence-and-gaps.md](./06-confidence-and-gaps.md) | What's solid, what's inference, what's unverified — read this before acting on pricing or competitive claims |
| [07-design-styles-and-component-systems.md](./07-design-styles-and-component-systems.md) | Three ultra-modern design style options, paired component systems (shadcn/ui, Magic UI, Aceternity UI, Tailark), and a recommendation |
| [08-post-login-product-ui.md](./08-post-login-product-ui.md) | Screenshots and analysis of the actual logged-in product UI (Artifacts/compliance report, Activities log, +Human onboarding chat) |
| [09-option-3-scroll-storytelling.md](./09-option-3-scroll-storytelling.md) | Design brief for a third homepage option: a scroll-driven "live audit" narrative, with its CTA and audit revision trail |
| [sources.md](./sources.md) | Every source link surfaced during research |

Reference screenshots for 08 live in `./screenshots/post-login/`.

## Status

Research complete. Plan proposed, not yet approved for build. No code or canvas
changes were made as part of this research phase, per instruction.

## Related code (already built, pre-dates this research)

- `src/components/verena/VerenaHero.tsx` — the hero component, built to the
  `#2D000F` / `#FCF56F` brief before this research pass.
- `tempo/designs/canvases/website-design/` — canvas previewing the hero.
- `src/App.tsx` — has a temporary `/redesign` route for browser verification;
  not yet decided whether to keep, fold into the real site flow, or remove.
