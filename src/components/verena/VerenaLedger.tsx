import { useState, type CSSProperties, type FormEvent } from "react";

const AREAS = [
  {
    n: "01",
    name: "Accessibility",
    detail: "WCAG 2.1 AA — alt text, contrast, keyboard navigation, screen-reader structure.",
  },
  {
    n: "02",
    name: "Terms of Service",
    detail: "Governing law, liability limits, and clauses that no longer match how the site actually works.",
  },
  {
    n: "03",
    name: "Privacy Policy",
    detail: "Disclosed data practices checked against what the site's own code and trackers actually do.",
  },
  {
    n: "04",
    name: "Cookies & Trackers",
    detail: "Consent before load, a working withdrawal path, and an accurate list of who gets your visitors' data.",
  },
  {
    n: "05",
    name: "Commercial Email",
    detail: "CAN-SPAM basics: working unsubscribe, accurate sender identity, honest subject lines.",
  },
  {
    n: "06",
    name: "Marketing Claims",
    detail: "Testimonials, guarantees, and comparisons checked against what can actually be substantiated.",
  },
] as const;

const STEPS = [
  {
    n: "01",
    title: "Scan",
    body: "Point Verena at your domain. Agents crawl every page and cross-reference six bodies of law at once.",
  },
  {
    n: "02",
    title: "Draft, then review",
    body: "Each finding ships with a proposed fix — developer-ready code, or a redlined document revision. Anything that calls for judgment, not pattern-matching, routes through +Human to a licensed attorney at Invictus Counsel before it reaches you.",
  },
  {
    n: "03",
    title: "Monitor",
    body: "Verena watches the site afterward and re-files findings automatically, so the record stays current instead of going stale the day after the scan.",
  },
] as const;

const PRICING = [
  { tier: "Free", price: "$0", unit: "", credits: "500 credits", note: "One scan, enough to see what's there." },
  { tier: "Starter", price: "$99", unit: "/mo", credits: "5,000 credits", note: "A site with regular content changes." },
  { tier: "Professional", price: "$299", unit: "/mo", credits: "25,000 credits", note: "Multiple sites or frequent re-scans." },
  { tier: "Enterprise", price: "$999", unit: "/mo", credits: "125,000 credits", note: "Portfolios and agencies of record." },
] as const;

const FAQS = [
  {
    q: "Is this really AI making legal decisions about my site?",
    a: "No. Verena's agents find and draft — they match your site's actual behavior against statute and propose a fix. Anything that requires legal judgment rather than pattern-matching is routed through +Human to a licensed attorney at Invictus Counsel before it's presented to you as a recommendation.",
  },
  {
    q: "What happens if Verena gets something wrong?",
    a: "Verena is in beta and says so on every finding. Each one is written to be checked, not trusted blindly — it cites the specific clause or standard it's measuring against, so you or your attorney can verify it in under a minute.",
  },
  {
    q: "Does a clean scan mean my site is legally compliant?",
    a: "A clean scan is a strong signal, not a certificate. Verena files what it can verify from the outside; it doesn't replace counsel for anything that depends on facts about your business it can't observe from your website alone.",
  },
  {
    q: "Do I need a developer to apply the fixes?",
    a: "For code-level findings, Verena hands you a patch your developer can review and merge — it doesn't push changes to your site on its own. For document findings, you get a redline you or +Human can finalize directly.",
  },
  {
    q: "What does +Human actually add?",
    a: "A standing relationship with a licensed attorney at Invictus Counsel who reviews anything Verena flags as needing judgment, co-signs the recommendation, and is reachable when a finding is more nuanced than a standard fix.",
  },
  {
    q: "How often does Verena re-scan my site?",
    a: "Continuously in the background on paid plans — Verena watches for shipped changes and re-files affected findings automatically, rather than waiting for you to remember to run it again.",
  },
] as const;

function SealIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="20" cy="20" r="13.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M13.5 20.5l4 4 9-9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MarkIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M4 12.5l5.5 5.5L20 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VerenaLedger() {
  const [domain, setDomain] = useState("");
  const [filed, setFiled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!domain.trim()) return;
    setFiled(true);
  }

  return (
    <main className="ledger">
      <style>{`
        .ledger {
          --paper: oklch(98.2% 0.009 85);
          --paper-line: oklch(89% 0.012 80);
          --ink: oklch(23% 0.018 262);
          --ink-soft: oklch(46% 0.018 262);
          --ink-faint: oklch(64% 0.014 262);
          --accent: oklch(33% 0.06 164);
          --accent-soft: oklch(93.5% 0.028 164);
          --accent-line: oklch(70% 0.07 164);
          --clay: oklch(58% 0.1 55);
          --clay-soft: oklch(94.5% 0.03 58);
          --serif: "Ledger Serif", "Newsreader", "Iowan Old Style", Georgia, serif;
          --mono: "Ledger Mono", "IBM Plex Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
          --sans: "Inter", ui-sans-serif, system-ui, sans-serif;
          background: var(--paper);
          color: var(--ink);
          font-family: var(--sans);
        }
        .ledger :is(h1, h2, h3, .ledger-serif) { font-family: var(--serif); }
        .ledger .ledger-mono { font-family: var(--mono); font-variant-numeric: tabular-nums; }

        .ledger-reveal {
          opacity: 0;
          transform: translateY(10px);
          animation: ledger-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes ledger-reveal {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ledger-reveal { animation: none; opacity: 1; transform: none; }
        }

        .ledger-faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ledger-faq-body.is-open { grid-template-rows: 1fr; }
        @media (prefers-reduced-motion: reduce) {
          .ledger-faq-body { transition: none; }
        }

        .ledger-underline {
          background-image: linear-gradient(var(--accent-line), var(--accent-line));
          background-position: 0 100%;
          background-repeat: no-repeat;
          background-size: 0% 1px;
          transition: background-size 220ms ease-out;
        }
        .ledger-underline:hover, .ledger-underline:focus-visible {
          background-size: 100% 1px;
        }
      `}</style>

      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b" style={{ borderColor: "var(--paper-line)", background: "color-mix(in oklab, var(--paper) 92%, transparent)", backdropFilter: "blur(6px)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <a href="#top" className="ledger-serif text-lg font-medium tracking-tight" style={{ color: "var(--ink)" }}>
            Verena
          </a>
          <nav className="hidden items-center gap-7 text-[0.9rem] md:flex" style={{ color: "var(--ink-soft)" }}>
            <a className="ledger-underline" href="#how-it-works">How it works</a>
            <a className="ledger-underline" href="#coverage">Coverage</a>
            <a className="ledger-underline" href="#human">+Human</a>
            <a className="ledger-underline" href="#pricing">Pricing</a>
            <a className="ledger-underline" href="#faq">FAQ</a>
          </nav>
          <div className="flex items-center gap-5">
            <a href="#login" className="hidden text-[0.9rem] sm:inline" style={{ color: "var(--ink-soft)" }}>
              Log in
            </a>
            <a
              href="#top"
              className="rounded-sm px-4 py-2 text-[0.9rem] font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--ink)" }}
            >
              Start a scan
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div className="ledger-reveal">
            <p className="ledger-mono mb-5 text-[0.75rem] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
              Filed continuously · Six areas, one scan
            </p>
            <h1 className="text-[2.6rem] leading-[1.08] font-medium tracking-tight sm:text-[3.2rem]" style={{ textWrap: "balance" }}>
              A standing compliance record for your website.
            </h1>
            <p className="mt-6 max-w-[48ch] text-[1.08rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Verena's AI agents scan accessibility, privacy, cookies, terms, email, and
              marketing claims — then draft the fix. A licensed attorney signs off on
              anything that needs judgment, not just pattern-matching.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 max-w-md">
              <label htmlFor="ledger-domain" className="ledger-mono mb-2 block text-[0.72rem] uppercase tracking-[0.12em]" style={{ color: "var(--ink-faint)" }}>
                Run a scan
              </label>
              <div className="flex items-stretch gap-0 border-b-2 pb-2" style={{ borderColor: "var(--ink)" }}>
                <input
                  id="ledger-domain"
                  name="domain"
                  type="text"
                  autoComplete="url"
                  inputMode="url"
                  placeholder="example.com"
                  value={domain}
                  onChange={(event) => {
                    setDomain(event.target.value);
                    setFiled(false);
                  }}
                  className="ledger-serif w-full bg-transparent text-[1.15rem] italic outline-none placeholder:not-italic"
                  style={{ color: "var(--ink)" }}
                />
                <button
                  type="submit"
                  className="shrink-0 pl-4 text-[0.95rem] font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  Scan →
                </button>
              </div>
              <p className="mt-3 text-[0.82rem]" style={{ color: "var(--ink-faint)" }} role="status">
                {filed
                  ? `Filed. Results for ${domain.trim()} land in your inbox in about 90 seconds.`
                  : "Free. About 90 seconds. No account required to see results."}
              </p>
            </form>
          </div>

          <div className="ledger-reveal" style={{ animationDelay: "120ms" }}>
            <div className="border p-5 sm:p-6" style={{ borderColor: "var(--paper-line)" }}>
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--paper-line)" }}>
                <span className="ledger-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--ink-faint)" }}>
                  Finding 004 · filed automatically
                </span>
                <span
                  className="ledger-mono rounded-sm px-2 py-0.5 text-[0.68rem] uppercase tracking-wide"
                  style={{ background: "var(--clay-soft)", color: "var(--clay)" }}
                >
                  Needs fix
                </span>
              </div>

              <p className="ledger-mono mt-4 text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--ink-faint)" }}>
                Privacy · Cookies &amp; Trackers
              </p>
              <h3 className="ledger-serif mt-1.5 text-[1.2rem] leading-snug" style={{ textWrap: "balance" }}>
                Cookie banner has no way to withdraw consent once given.
              </h3>
              <p className="ledger-mono mt-2 text-[0.78rem]" style={{ color: "var(--ink-faint)" }}>
                Cal. Civ. Code §1798.135(a)(5)
              </p>

              <div className="mt-5 border-t pt-4" style={{ borderColor: "var(--paper-line)" }}>
                <div className="flex items-start gap-2.5 text-[0.85rem]" style={{ color: "var(--ink-soft)" }}>
                  <MarkIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <span>Drafted by Verena — a one-line consent toggle, added to your cookie settings panel.</span>
                </div>
                <div className="mt-2.5 flex items-start gap-2.5 text-[0.85rem]" style={{ color: "var(--ink-soft)" }}>
                  <SealIcon className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <span>Co-signed by R. Alvarez, Invictus Counsel — fix is ready to ship.</span>
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-[50ch] text-[0.85rem] leading-relaxed" style={{ color: "var(--ink-faint)" }}>
              Verena is in beta and can make mistakes — every finding is written so you
              or your attorney can check it, not so you have to take it on faith. A
              clean scan is a strong signal, not a certificate.
            </p>
          </div>
        </div>
      </section>

      {/* Six areas */}
      <section id="coverage" className="border-t" style={{ borderColor: "var(--paper-line)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-[56ch]">
            <h2 className="text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
              One scan, six areas of exposure.
            </h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Most tools cover one of these and call it compliance software. Verena
              files all six in a single pass, every time.
            </p>
          </div>

          <ul className="mt-10 border-t" style={{ borderColor: "var(--paper-line)" }}>
            {AREAS.map((area) => (
              <li
                key={area.n}
                className="flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-baseline sm:gap-6 sm:py-6"
                style={{ borderColor: "var(--paper-line)" }}
              >
                <span className="ledger-mono shrink-0 text-[0.85rem]" style={{ color: "var(--accent)" }}>
                  {area.n}
                </span>
                <span className="ledger-serif shrink-0 text-[1.1rem] sm:w-[13.5rem]" style={{ color: "var(--ink)" }}>
                  {area.name}
                </span>
                <span className="text-[0.95rem] leading-relaxed sm:max-w-[48ch]" style={{ color: "var(--ink-soft)" }}>
                  {area.detail}
                </span>
                <span
                  className="ledger-mono text-[0.68rem] uppercase tracking-wide sm:ml-auto"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Scanned continuously
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t" style={{ borderColor: "var(--paper-line)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-[40ch] text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
            How a finding gets filed.
          </h2>

          <div className="relative mt-12 ml-1 border-l pl-8 sm:pl-10" style={{ borderColor: "var(--paper-line)" }}>
            {STEPS.map((step, index) => (
              <div key={step.n} className={index === 0 ? "relative pb-12" : "relative py-12"}>
                <span
                  className="ledger-mono absolute top-0 -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full text-[0.75rem] sm:-left-[3.15rem]"
                  style={{ background: "var(--paper)", border: "1px solid var(--paper-line)", color: "var(--ink-faint)" }}
                >
                  {step.n}
                </span>
                <h3 className="ledger-serif text-[1.3rem]">{step.title}</h3>
                <p className="mt-2 max-w-[56ch] text-[0.98rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* +Human */}
      <section id="human" className="border-t" style={{ borderColor: "var(--paper-line)", background: "var(--accent-soft)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-[56ch]">
            <p className="ledger-mono mb-3 text-[0.75rem] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
              +Human
            </p>
            <h2 className="text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
              AI drafts. A human signs.
            </h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Pattern-matching gets a finding most of the way there. The judgment
              calls — the part that actually carries legal risk — go to a licensed
              attorney at Invictus Counsel before anything reaches you.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm sm:grid-cols-2" style={{ background: "var(--paper-line)" }}>
            <div className="p-7" style={{ background: "var(--paper)" }}>
              <span className="ledger-mono text-[0.7rem] uppercase tracking-[0.1em]" style={{ color: "var(--ink-faint)" }}>
                Drafted by Verena
              </span>
              <p className="ledger-serif mt-3 text-[1.1rem] leading-snug">
                "Privacy policy lists a data processor that's no longer called by any
                script on the live site."
              </p>
              <p className="mt-4 text-[0.88rem]" style={{ color: "var(--ink-soft)" }}>
                Proposed: remove the processor from §4.2, or confirm it's still in use
                server-side.
              </p>
            </div>
            <div className="p-7" style={{ background: "var(--paper)" }}>
              <div className="flex items-center gap-2.5">
                <SealIcon className="h-5 w-5" style={{ color: "var(--accent)" }} />
                <span className="ledger-mono text-[0.7rem] uppercase tracking-[0.1em]" style={{ color: "var(--ink-faint)" }}>
                  Co-signed by Invictus Counsel
                </span>
              </div>
              <p className="ledger-serif mt-3 text-[1.1rem] leading-snug">
                "Confirmed unused — safe to remove. No further disclosure required."
              </p>
              <p className="mt-4 text-[0.88rem]" style={{ color: "var(--ink-soft)" }}>
                R. Alvarez, Esq. · reviewed in 11 minutes
              </p>
            </div>
          </div>

          <a
            href="#pricing"
            className="mt-9 inline-flex items-center gap-2 text-[0.95rem] font-medium"
            style={{ color: "var(--ink)" }}
          >
            Add +Human to any plan
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t" style={{ borderColor: "var(--paper-line)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-[56ch]">
            <h2 className="text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
              Priced like a tool, not a retainer.
            </h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              Every plan covers all six areas. Higher tiers add scanning credits for
              larger or faster-changing sites.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b text-[0.72rem] uppercase tracking-[0.1em]" style={{ borderColor: "var(--ink)", color: "var(--ink-faint)" }}>
                  <th className="pb-3 font-normal">Plan</th>
                  <th className="pb-3 font-normal">Price</th>
                  <th className="pb-3 font-normal">Scanning credits</th>
                  <th className="pb-3 font-normal">Best for</th>
                  <th className="pb-3 font-normal text-right">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {PRICING.map((row) => (
                  <tr key={row.tier} className="border-b" style={{ borderColor: "var(--paper-line)" }}>
                    <td className="ledger-serif py-5 text-[1.05rem]">{row.tier}</td>
                    <td className="ledger-mono py-5 text-[1.05rem]">
                      {row.price}
                      <span className="text-[0.8rem]" style={{ color: "var(--ink-faint)" }}>{row.unit}</span>
                    </td>
                    <td className="ledger-mono py-5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>{row.credits}</td>
                    <td className="py-5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>{row.note}</td>
                    <td className="py-5 text-right">
                      <a href="#top" className="ledger-underline text-[0.88rem] font-medium" style={{ color: "var(--ink)" }}>
                        Choose {row.tier}
                      </a>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="ledger-serif py-5 text-[1.05rem]">+Human</td>
                  <td className="ledger-mono py-5 text-[1.05rem]" style={{ color: "var(--ink-faint)" }}>Custom</td>
                  <td className="ledger-mono py-5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>Add-on, any plan</td>
                  <td className="py-5 text-[0.9rem]" style={{ color: "var(--ink-soft)" }}>
                    Standing attorney review through Invictus Counsel.
                  </td>
                  <td className="py-5 text-right">
                    <a href="#human" className="ledger-underline text-[0.88rem] font-medium" style={{ color: "var(--ink)" }}>
                      Learn more
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t" style={{ borderColor: "var(--paper-line)" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="max-w-[40ch] text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
            Questions worth asking before you trust a scan.
          </h2>

          <div className="mt-10 border-t" style={{ borderColor: "var(--paper-line)" }}>
            {FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q} className="border-b" style={{ borderColor: "var(--paper-line)" }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="ledger-serif text-[1.08rem]" style={{ color: "var(--ink)" }}>
                      {item.q}
                    </span>
                    <span
                      className="ledger-mono shrink-0 text-[1.1rem] transition-transform duration-200"
                      style={{ color: "var(--ink-faint)", transform: isOpen ? "rotate(45deg)" : "none" }}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div className={`ledger-faq-body${isOpen ? " is-open" : ""}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[62ch] pb-5 text-[0.95rem] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--paper-line)" }}>
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="max-w-[62ch] text-[0.82rem] leading-relaxed" style={{ color: "var(--ink-faint)" }}>
            Verena is in beta and can make mistakes. A clean scan is a strong signal,
            not legal certification — for anything load-bearing, use +Human. Verena
            is built by Invictus AI; +Human reviews are provided by attorneys at
            Invictus Counsel.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--paper-line)" }}>
            <span className="ledger-serif text-[0.95rem]" style={{ color: "var(--ink)" }}>Verena</span>
            <nav className="flex flex-wrap gap-6 text-[0.82rem]" style={{ color: "var(--ink-faint)" }}>
              <a className="ledger-underline" href="#privacy">Privacy</a>
              <a className="ledger-underline" href="#terms">Terms</a>
              <a className="ledger-underline" href="#status">Status</a>
            </nav>
            <span className="ledger-mono text-[0.78rem]" style={{ color: "var(--ink-faint)" }}>
              © {new Date().getFullYear()} Invictus AI
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
