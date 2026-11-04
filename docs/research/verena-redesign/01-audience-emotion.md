# Audience emotion

Confidence: **mixed** — the underlying survey data is real; the synthesized
emotional profile is this document's interpretation of that data, not a
directly measured finding. Treat the profile as a hypothesis to validate
against actual Verena users/beta feedback, not as settled fact.

## Who the audience is
Small/mid-sized business owners and solo operators — not compliance
professionals, not developers. The person who built or commissioned the
website, not the person who maintains it.

## What the data says (verified, sourced)
- **82%** of small-business owners personally handle compliance themselves,
  even at firms with 50+ employees — [LegalZoom 2026 survey, via Barchart](https://www.barchart.com/story/news/977876/new-survey-from-legalzoom-reveals-compliance-is-weighing-on-small-businesses-in-2026).
- **33%** say compliance requirements have stopped them pursuing a business
  opportunity.
- **25%** have already received a compliance-related warning, fine, or
  citation.
- Legal/compliance mistakes are the **single biggest startup fear** (31%,
  ahead of funding or hiring) — [BizFilings/Wolters Kluwer survey](https://www.wolterskluwer.com/en/expert-insights/bizfilings-small-business-survey-2020-motivations-challenges-for-first-time-business-owners) (small
  sample, n=173 — directional, not definitive).
- Accessibility-overlay tools (a direct Verena-adjacent category) carry
  documented backlash over whether they deliver real compliance rather than
  the appearance of it — see `04-competitors.md` for the caveat on this claim.

**Bias note:** LegalZoom and BizFilings both sell compliance services, so their
surveys have a commercial interest in finding compliance to be a painful,
widespread problem. The direction of the finding is still plausible and
consistent across two independent sources, but don't treat the exact
percentages as neutral.

## The synthesized profile (interpretation, not a cited finding)
- **Anxious but avoidant** — aware something could be wrong, not inclined to
  go looking for it themselves.
- **Time-poor** — compliance is a side task on top of running the business.
- **Skeptical of silver bullets** — has likely seen "instant compliance"
  marketing before (cookie banners, overlay widgets) and doesn't fully trust
  it.
- **Specifically wary of unsupervised AI** on anything with legal
  consequences — this is *why* Verena's own "+Human" feature and
  caveat-heavy copy exist, and it's a real signal the research supports
  leaning into, not softening.
- **Wants delegation, not education** — the win condition is "someone
  trustworthy handled it," not "I now understand privacy law."

## Design implication
The hero's job is to read as **calm authority**, not alarm. A compliance
product can easily tip into fear-based marketing (red flags, warning icons,
urgency copy) — that would work against this audience's skepticism, not with
it. #2D000F as a grounded, serious maroon (rather than alarm-red) and a cream
base rather than a stark warning palette is the right instinct already
reflected in the built component. The redesign should make the human-backstop
signal visible early, since that's the specific, named trust gap.
