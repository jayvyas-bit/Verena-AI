# Post-login product UI — reference screenshots

Confidence: **high** — screenshots of the actual logged-in Verena app, supplied
directly by the user on 2026-11-04. This documents the *product* surface,
distinct from the public marketing site (`00-verena-current-state.md`) and from
the two marketing-site redesign options built so far (`VerenaHeroInteractive`
on `/`, the "ledger" option on `/option-2`). Treat this as the source of truth
for what the logged-in app actually looks like whenever a future task touches
onboarding, the authenticated app shell, or anything downstream of "Start a
scan."

Screenshots live in `./screenshots/post-login/`.

## 1. Artifacts — compliance report (`compliance-report-artifact.png`)

Two-pane app shell: left sidebar (New conversation, Artifacts, Activities,
Notifications, recent conversations list, a pinned "+Human" upsell card, credit
meter, account footer), center list of artifacts, right detail pane showing
the open artifact.

The artifact itself is a generated **"High Level Compliance Report"**, styled
as a formal document, not a dashboard:
- Header: report type eyebrow, title, "Prepared for" block with a logo-style
  monogram, legal entity, entity type ("Sole Proprietor"), website.
- A quoted italic provenance line: "Built from an analysis of
  [https://hirestepx.com] and the facts you confirmed."
- "Organization overview" — legal entity / entity type / website fields, plus
  a plain-English line naming which bodies of law apply and why (ADA, privacy,
  terms, cookies, commercial email, advertising).
- "Website compliance" — a horizontal **segmented status bar** (not a donut or
  bare percentage) breaking six areas into Exposed / Not found / Gaps found /
  Applicable / Not yet checked, each a named color-coded segment with a count,
  plus a one-line methodology disclaimer: "Applicable means the requirement
  applies to your organization and I found what it calls for on your site; it
  does not mean you fully comply with the law." This is the same
  honesty-over-reassurance pattern noted in `00-verena-current-state.md`.
- Per-area findings as left-bordered cards (status color on the left edge),
  each with an "APPLICABLE"-style status pill top-right, a plain finding
  summary, a bolded **Risk:** line, and an "Analyze [area] →" deep link.

Notable: this report UI already uses a card with a colored left border as a
status accent (ADA / Web Accessibility, Terms of Service) — worth remembering
specifically because that pattern is one the `impeccable` skill's absolute
bans flag as a side-stripe border smell in *marketing* UI. In this *product*
report context it reads as a semantic status rail (like a redline margin),
which is a different register than a marketing card — don't reflexively port
it into hero/marketing work, but it's a legitimate pattern for future
dashboard/report-style product screens.

## 2. Activities (`activities-log.png`)

A flat, reverse-chronological **audit log** of everything Verena has done in
the account: "Cookie Analysis," "Checking your cookie compliance" (in
progress, expandable "Show steps (4)"), "Preparing your High Level Compliance
Report," "Analyzing your site," "Getting to know you" (also expandable). Each
row: status icon (check / in-progress ring), title, "Complete/In progress ·
date · time." No cards, no color — just a simple status-icon + text list. This
is the plainest screen in the product; it's the transparency/audit-trail
surface, consistent with the brand's "show the work, don't oversell it" voice.

## 3. "Add +Human" conversation (`add-human-chat.png`)

A chat thread (not a form) for onboarding a +Human supervisor: Verena asks
one question at a time (entity type, headquarters address for the legal
agreement), user replies inline as chat bubbles. Right rail shows:
- A **"Progress"** card for the active task — numbered steps ("Choosing your
  plan" active, "Saving your payment method," "Signing your agreement" both
  pending) — a conversational wizard tracked as a checklist, not a traditional
  multi-step form UI.
- An **"Artifacts"** card scoped to *this* conversation (empty state shown)
  with a link out to artifacts from other conversations.

Also visible here, worth flagging as a product rough edge rather than a
design signal: in this sample transcript Verena repeats the same question
("What is Hirestepx's headquarters address...") after receiving answers it
doesn't parse as a full street address ("Mumbai", then "mumbai, india,
401109," then a nonsense string), without acknowledging the user already
answered differently. Note it here as an observed behavior, not something to
replicate.

## Why this matters for future design work

The marketing site (home page, `/option-2`) sells "an AI agent platform with
a human backstop." These screenshots are what that promise actually looks
like once someone signs up: a **conversational, chat-first product** with
artifacts (generated reports) and an activity log as the two durable record
surfaces, not a traditional SaaS dashboard with charts and settings pages.
Any future "see it in action" marketing moment, product screenshot, or
onboarding flow design should be grounded in this real UI, not invented from
the marketing site's own visual language.
