# Proposed plan

Status: **proposed, not yet approved.** No build work should resume on this
until sign-off, per the original request that this phase stay research-only.

1. **Keep the palette direction, keep the read as "grounded authority," not
   "warning."** #2D000F as a serious, confident maroon, #FCF56F as a single
   accent, cream as the calm base — already how `VerenaHero.tsx` is built.
   No change indicated by this research.

2. **Surface the human-in-the-loop signal higher on the page.** The
   audience's specific, named skepticism is trusting *unsupervised AI* with
   legal judgment (`01-audience-emotion.md`). A `+Human` mention near the
   Analyze CTA — not just a nav link — answers that objection at the exact
   moment of hesitation, and matches what Verena already does on its live
   site (`00-verena-current-state.md`).

3. **Sharpen subcopy toward the fragmentation differentiation**, not just
   curiosity. The reference headline ("looks great, but is everything in
   place?") is good for hooking attention; a secondary line naming the
   breadth ("privacy, accessibility, cookies, terms — one scan") directly
   plays against the point-tool fragmentation documented in
   `04-competitors.md`.

4. **Design the social-proof gap honestly, don't fake it.** Verena has zero
   testimonials/logos today. For a beta-stage product, lean into
   transparency as a feature — the existing "can make mistakes" caveat
   language, the sample report, the Invictus Counsel backing — rather than
   inventing trust markers that don't exist yet.

5. **Keep motion restrained and purposeful.** The current build's ambient
   blob drift, pointer parallax, and `prefers-reduced-motion` fallback match
   both the original "not messy" brief and the Linear/Arc benchmark
   direction (`02-tech-company-benchmarks.md`, read as taste reference, not
   spec). No new motion indicated.

6. **Next sections to design after the hero, in priority order:**
   - A plain-English "how it works" step section (already stubbed in
     `VerenaHero.tsx`).
   - A pricing section framed explicitly against point-tool fragmentation
     cost (using Verena's own verified tiers, not the shakier competitor
     numbers).
   - A trust/FAQ block that directly answers "is this really AI, what
     happens if it's wrong" — turning the existing caveat language into a
     visible design element instead of footnote text.

## Known open item from the build phase (unrelated to this research, not yet fixed)
The search `<input>` in `VerenaHero.tsx` has no `id`/`name`/`autocomplete`
attribute — flagged by a live browser console check as a minor accessibility
issue. Worth fixing whenever build resumes.

## Also unresolved
Whether to keep, repurpose, or remove the temporary `/redesign` route added to
`src/App.tsx` for browser verification during the build phase.
