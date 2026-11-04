import { useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";

type Status = "exposed" | "gap" | "applicable" | "unchecked";

const STATUS_META: Record<Status, { label: string; dot: string; soft: string }> = {
  exposed: { label: "Exposed", dot: "var(--la-exposed)", soft: "var(--la-exposed-soft)" },
  gap: { label: "Gaps found", dot: "var(--la-gap)", soft: "var(--la-gap-soft)" },
  applicable: { label: "Applicable", dot: "var(--la-applicable)", soft: "var(--la-applicable-soft)" },
  unchecked: { label: "Not yet checked", dot: "var(--la-neutral)", soft: "var(--la-neutral-soft)" },
};

const AREAS: { n: string; name: string; status: Status; detail: string }[] = [
  { n: "01", name: "Accessibility", status: "gap", detail: "WCAG 2.1 AA — alt text, contrast, keyboard navigation, screen-reader structure." },
  { n: "02", name: "Terms of Service", status: "applicable", detail: "Governing law, liability limits, and clauses that no longer match how the site actually works." },
  { n: "03", name: "Privacy Policy", status: "exposed", detail: "Disclosed data practices checked against what the site's own code and trackers actually do." },
  { n: "04", name: "Cookies & Trackers", status: "gap", detail: "Consent before load, a working withdrawal path, and an accurate list of who gets your visitors' data." },
  { n: "05", name: "Commercial Email", status: "applicable", detail: "CAN-SPAM basics: working unsubscribe, accurate sender identity, honest subject lines." },
  { n: "06", name: "Marketing Claims", status: "unchecked", detail: "Testimonials, guarantees, and comparisons checked against what can actually be substantiated." },
];

const STATUS_COUNTS = AREAS.reduce<Record<Status, number>>(
  (acc, area) => {
    acc[area.status] += 1;
    return acc;
  },
  { exposed: 0, gap: 0, applicable: 0, unchecked: 0 },
);

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
    a: "Verena is in beta and says so on every finding. Each one cites the specific clause or standard it's measuring against, so you or your attorney can verify it in under a minute.",
  },
  {
    q: "Does a clean scan mean my site is legally compliant?",
    a: "A clean scan is a strong signal, not a certificate. Verena files what it can verify from the outside; it doesn't replace counsel for anything that depends on facts about your business it can't observe from your website alone.",
  },
  {
    q: "Do I need a developer to apply the fixes?",
    a: "For code-level findings, Verena hands you a patch your developer can review and merge. For document findings, you get a redline you or +Human can finalize directly.",
  },
  {
    q: "What does +Human actually add?",
    a: "A standing relationship with a licensed attorney at Invictus Counsel who reviews anything Verena flags as needing judgment and co-signs the recommendation.",
  },
  {
    q: "How often does Verena re-scan my site?",
    a: "Continuously in the background on paid plans — Verena watches for shipped changes and re-files affected findings automatically.",
  },
] as const;

function CheckIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SealIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M13.5 20.5l4 4 9-9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VerenaLiveAudit() {
  const [domain, setDomain] = useState("");
  const [filed, setFiled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeArea, setActiveArea] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    wrap.classList.add("la-js-enhanced");
    let cancelled = false;
    let revert: (() => void) | undefined;

    (async () => {
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".la-stage",
              start: "top top",
              end: "+=3200",
              scrub: 0.6,
              pin: true,
              anticipatePin: 1,
            },
          });

          tl.to(".la-overlay", { opacity: 0.6, duration: 1 }, 0)
            .to(".la-callout", { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, 0.15)
            .to(".la-card-front", { scaleY: 0, duration: 0.55 }, "flip")
            .set(".la-card-front", { visibility: "hidden" })
            .set(".la-card-back", { visibility: "visible", scaleY: 0 }, "flip")
            .to(".la-card-back", { scaleY: 1, duration: 0.55 }, "flip+=0.55")
            .to(".la-overlay", { opacity: 0, duration: 0.8 }, "flip+=0.3")
            .fromTo(".la-status-fill", { scaleX: 0 }, { scaleX: 1, duration: 1.1, stagger: 0.08, transformOrigin: "left" }, "report")
            .fromTo(".la-finding", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, "report+=0.4")
            .to(".la-inline-cta", { opacity: 1, y: 0, duration: 0.5 }, "report+=1.1")
            .to(".la-finding", { opacity: 0, scale: 0.85, duration: 0.5, stagger: 0.05 }, "disperse")
            .fromTo(
              ".la-feature-tile",
              { opacity: 0, scale: 0.85 },
              { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 },
              "disperse+=0.15",
            );
        }, wrap);

        revert = () => ctx.revert();
      } catch {
        if (!cancelled) wrap.classList.remove("la-js-enhanced");
      }
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!domain.trim()) return;
    setFiled(true);
  }

  return (
    <div ref={wrapRef} className="la">
      <style>{`
        .la {
          --la-paper: oklch(99.3% 0.002 255);
          --la-paper-line: oklch(91.5% 0.006 255);
          --la-ink: oklch(15% 0.012 260);
          --la-ink-soft: oklch(42% 0.012 260);
          --la-ink-faint: oklch(58% 0.01 260);
          --la-exposed: oklch(56% 0.17 27);
          --la-exposed-soft: oklch(94.5% 0.035 27);
          --la-gap: oklch(63% 0.14 70);
          --la-gap-soft: oklch(94.5% 0.035 72);
          --la-applicable: oklch(49% 0.1 155);
          --la-applicable-soft: oklch(93.5% 0.028 155);
          --la-neutral: oklch(55% 0.01 260);
          --la-neutral-soft: oklch(93% 0.006 260);
          --la-header-h: 72px;
          --la-radius-sm: 10px;
          --la-radius-md: 16px;
          --la-radius-lg: 24px;
          --la-shadow: 0 1px 2px oklch(20% 0.01 260 / 6%), 0 16px 40px -14px oklch(20% 0.01 260 / 16%);
          --la-serif: "Bricolage Grotesque", var(--la-sans);
          --la-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
          --la-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
          background: var(--la-paper);
          color: var(--la-ink);
          font-family: var(--la-sans);
        }
        .la :is(h1, h2, h3, .la-serif) { font-family: var(--la-serif); font-weight: 600; }
        .la .la-mono { font-family: var(--la-mono); font-variant-numeric: tabular-nums; }
        .la .la-elevated { box-shadow: var(--la-shadow); }

        .la-reveal {
          opacity: 0;
          transform: translateY(10px);
          animation: la-reveal 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes la-reveal { to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .la-reveal { animation: none; opacity: 1; transform: none; }
        }

        .la-underline {
          background-image: linear-gradient(var(--la-ink), var(--la-ink));
          background-position: 0 100%;
          background-repeat: no-repeat;
          background-size: 0% 1px;
          transition: background-size 220ms ease-out;
        }
        .la-underline:hover, .la-underline:focus-visible { background-size: 100% 1px; }

        /* Pinned stage: default = resolved, static, accessible without JS */
        .la-stage {
          position: relative;
          height: auto;
          padding: 4.5rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .la-stage-inner {
          width: 100%;
          max-width: 56rem;
          display: grid;
          gap: 2rem;
          justify-items: center;
        }
        .la-overlay {
          position: absolute;
          inset: 0;
          background: var(--la-ink);
          opacity: 0;
          pointer-events: none;
        }
        .la-callout { display: none; }

        .la-window-shell { position: relative; width: 100%; max-width: 30rem; overflow: hidden; }
        .la-card-shell { position: relative; width: 100%; }
        .la-card-front { display: none; }
        .la-card-back { display: block; }

        .la-status-bar { display: flex; height: 0.65rem; width: 100%; border-radius: 999px; overflow: hidden; background: var(--la-paper-line); }
        .la-status-fill { transform: scaleX(1); transform-origin: left; }

        .la-finding { opacity: 1; transform: none; }
        .la-inline-cta { opacity: 1; transform: none; }
        .la-feature-tile { opacity: 1; transform: none; }

        /* JS-enhanced: pre-animation start state, driven by GSAP ScrollTrigger from here */
        .la-js-enhanced .la-stage { height: 100vh; padding-top: calc(var(--la-header-h) + 1.5rem); }
        .la-js-enhanced .la-callout {
          display: block;
          opacity: 0;
          transform: translateY(8px);
        }
        .la-js-enhanced .la-card-front { display: block; visibility: visible; }
        .la-js-enhanced .la-card-back { visibility: hidden; }
        .la-js-enhanced .la-status-fill { transform: scaleX(0); }
        .la-js-enhanced .la-finding { opacity: 0; transform: translateY(14px); }
        .la-js-enhanced .la-inline-cta { opacity: 0; transform: translateY(10px); }
        .la-js-enhanced .la-feature-tile { opacity: 0; transform: scale(0.85); }

        .la-faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .la-faq-body.is-open { grid-template-rows: 1fr; }
        @media (prefers-reduced-motion: reduce) {
          .la-faq-body { transition: none; }
        }

        .la-btn {
          transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 180ms cubic-bezier(0.22, 1, 0.36, 1), background-color 180ms cubic-bezier(0.22, 1, 0.36, 1),
            color 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .la-btn:hover { transform: translateY(-1px); }
        .la-btn:active { transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .la-btn { transition: opacity 180ms ease, background-color 180ms ease, color 180ms ease; }
          .la-btn:hover { transform: none; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Persistent header — always visible, never pinned over */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b"
        style={{ height: "var(--la-header-h)", borderColor: "var(--la-paper-line)", background: "color-mix(in oklab, var(--la-paper) 94%, transparent)", backdropFilter: "blur(8px)" }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-6">
          <a href="#top" className="la-serif text-lg font-semibold tracking-tight" style={{ color: "var(--la-ink)" }}>
            Verena
          </a>
          <nav className="hidden items-center gap-7 text-[0.9rem] font-medium md:flex" style={{ color: "var(--la-ink-soft)" }}>
            <a className="la-underline" href="#coverage">Coverage</a>
            <a className="la-underline" href="#human">+Human</a>
            <a className="la-underline" href="#pricing">Pricing</a>
            <a className="la-underline" href="#faq">FAQ</a>
          </nav>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href="#after-story"
              className="la-underline hidden text-[0.88rem] font-medium sm:inline-block"
              style={{ color: "var(--la-ink-soft)" }}
            >
              See a sample report
            </a>
            <a
              href="#scan-input"
              className="la-btn shrink-0 rounded-full px-5 py-2.5 text-[0.88rem] font-semibold text-white hover:opacity-85"
              style={{ background: "var(--la-ink)" }}
            >
              Start a scan
            </a>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: "var(--la-header-h)" }}>
        <p className="sr-only">
          This page walks through a real example: Verena scans a client site, finds a missing cookie-consent
          withdrawal option, compiles a compliance report across six areas, and those six areas become the six
          things Verena checks continuously. A persistent &quot;Start a scan&quot; button stays available the
          whole time, and the same content continues below without the animation if you prefer not to scroll
          through it.
        </p>

        {/* Hero */}
        <section id="top" className="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-20">
          <div className="la-reveal max-w-[62ch]">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1"
              style={{ borderColor: "var(--la-exposed-soft)", background: "var(--la-exposed-soft)" }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--la-exposed)" }} />
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--la-exposed)" }}>
                One real finding · six areas scanned at once
              </span>
            </div>
            <h1 className="text-[3rem] leading-[1.02] tracking-tight sm:text-[4rem]" style={{ textWrap: "balance" }}>
              Watch Verena turn one finding into a standing compliance record.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.08rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
              Scroll to see a real scan unfold: a flagged finding, a generated report, and the six areas
              Verena watches on every site. Or skip straight to the scan.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#scan-input"
                className="la-btn shrink-0 rounded-full px-5 py-2.5 text-[0.92rem] font-semibold text-white hover:opacity-85"
                style={{ background: "var(--la-ink)" }}
              >
                Start a scan
              </a>
              <a
                href="#after-story"
                className="la-btn shrink-0 rounded-full border px-5 py-2.5 text-[0.92rem] font-semibold hover:bg-[var(--la-ink)] hover:text-white"
                style={{ borderColor: "var(--la-ink)", color: "var(--la-ink)" }}
              >
                See a sample report
              </a>
            </div>
            <a href="#after-story" className="la-underline mt-5 inline-block text-[0.92rem] font-medium" style={{ color: "var(--la-ink)" }}>
              Skip the story ↓
            </a>

            <form id="scan-form" onSubmit={handleSubmit} className="mt-10 max-w-md">
              <label htmlFor="scan-input" className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                Run a scan
              </label>
              <div
                className="la-elevated flex items-center gap-2 rounded-full border p-1.5 pl-5"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-paper)" }}
              >
                <input
                  id="scan-input"
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
                  className="w-full bg-transparent text-[1rem] outline-none"
                  style={{ color: "var(--la-ink)" }}
                />
                <button
                  type="submit"
                  className="la-btn shrink-0 rounded-full px-5 py-2.5 text-[0.88rem] font-semibold text-white hover:opacity-85"
                  style={{ background: "var(--la-ink)" }}
                >
                  Scan →
                </button>
              </div>
              <p className="mt-3 text-[0.82rem]" style={{ color: "var(--la-ink-faint)" }} role="status">
                {filed
                  ? `Filed. Results for ${domain.trim()} land in your inbox in about 90 seconds.`
                  : "Free. About 90 seconds. No account required to see results."}
              </p>
            </form>
          </div>
        </section>

        {/* Pinned story stage */}
        <section className="la-stage" aria-hidden="true">
          <div className="la-overlay" />
          <div className="la-stage-inner">
            <div className="la-callout la-mono" style={{ color: "var(--la-ink-faint)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Checking cookie consent flow…
            </div>

            <div className="la-window-shell la-elevated" style={{ borderRadius: "var(--la-radius-lg)" }}>
              <div
                className="la-window-chrome flex items-center gap-3 border border-b-0 px-4 py-3"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-neutral-soft)", borderRadius: "var(--la-radius-lg) var(--la-radius-lg) 0 0" }}
              >
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(75% 0.14 27)" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(80% 0.13 85)" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(75% 0.13 155)" }} />
                </span>
                <span
                  className="la-mono mx-auto rounded-full px-3 py-0.5 text-[0.7rem]"
                  style={{ background: "var(--la-paper)", color: "var(--la-ink-faint)" }}
                >
                  verena.ai/scan
                </span>
              </div>
            <div className="la-card-shell">
              <div
                className="la-elevated la-card-front border p-6"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-paper)", borderRadius: "0 0 var(--la-radius-lg) var(--la-radius-lg)" }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--la-paper-line)" }}>
                  <span className="la-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                    Analyzing hirestepx.com
                  </span>
                  <span className="la-mono rounded-full px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wide" style={{ background: STATUS_META.exposed.soft, color: STATUS_META.exposed.dot }}>
                    In progress
                  </span>
                </div>
                <p className="la-mono mt-4 text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                  Privacy · Cookies &amp; Trackers
                </p>
                <h3 className="la-serif mt-1.5 text-[1.15rem] leading-snug" style={{ textWrap: "balance" }}>
                  Cookie banner has no way to withdraw consent once given.
                </h3>
                <p className="la-mono mt-2 text-[0.78rem]" style={{ color: "var(--la-ink-faint)" }}>
                  Cal. Civ. Code §1798.135(a)(5)
                </p>
              </div>

              <div
                className="la-elevated la-card-back border p-6"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-paper)", borderRadius: "0 0 var(--la-radius-lg) var(--la-radius-lg)" }}
              >
                <p className="la-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                  High Level Compliance Report
                </p>
                <h3 className="la-serif mt-1 text-[1.3rem]">hirestepx.com</h3>

                <div className="la-status-bar mt-5">
                  {(Object.keys(STATUS_COUNTS) as Status[]).map((status) =>
                    STATUS_COUNTS[status] > 0 ? (
                      <div
                        key={status}
                        className="la-status-fill"
                        style={{ width: `${(STATUS_COUNTS[status] / AREAS.length) * 100}%`, background: STATUS_META[status].dot }}
                      />
                    ) : null,
                  )}
                </div>
                <div className="la-mono mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.72rem]" style={{ color: "var(--la-ink-faint)" }}>
                  {(Object.keys(STATUS_COUNTS) as Status[]).map((status) => (
                    <span key={status}>
                      {STATUS_META[status].label} · {STATUS_COUNTS[status]}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {AREAS.map((area) => (
                    <div
                      key={area.n}
                      className="la-finding flex items-center gap-2 rounded-xl border px-2.5 py-2"
                      style={{ borderColor: "var(--la-paper-line)" }}
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: STATUS_META[area.status].dot }} />
                      <span className="text-[0.78rem] leading-tight" style={{ color: "var(--la-ink-soft)" }}>
                        {area.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div>

            <a
              href="#scan-input"
              className="la-inline-cta la-underline inline-flex items-center gap-2 text-[0.95rem] font-medium"
              style={{ color: "var(--la-ink)" }}
            >
              See this for your site <span aria-hidden="true">→</span>
            </a>

            <div className="mt-2 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              {AREAS.map((area) => (
                <div
                  key={area.n}
                  className="la-feature-tile rounded-2xl border p-3 text-center"
                  style={{ borderColor: "var(--la-paper-line)", background: STATUS_META[area.status].soft }}
                >
                  <span className="text-[0.82rem] font-medium" style={{ color: "var(--la-ink)" }}>
                    {area.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage — the real content the story set up */}
        <section id="after-story" className="border-t" style={{ borderColor: "var(--la-paper-line)" }}>
          <div id="coverage" className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-[56ch]">
              <span
                className="la-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]"
                style={{ background: "var(--la-neutral-soft)", color: "var(--la-ink-soft)" }}
              >
                Coverage
              </span>
              <h2 className="mt-4 text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                Six areas, scanned continuously.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
                Every finding above is a live example of what Verena watches on every site, every time.
              </p>
            </div>

            <div className="mt-10 grid gap-3 lg:grid-cols-[20rem_1fr] lg:gap-10">
              <div role="tablist" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
                {AREAS.map((area, index) => {
                  const active = activeArea === index;
                  return (
                    <button
                      key={area.n}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveArea(index)}
                      className="la-btn flex shrink-0 items-center gap-3 rounded-xl px-4 py-3.5 text-left"
                      style={{ background: active ? "var(--la-neutral-soft)" : "transparent" }}
                    >
                      <span className="la-mono text-[0.78rem]" style={{ color: active ? STATUS_META[area.status].dot : "var(--la-ink-faint)" }}>
                        {area.n}
                      </span>
                      <span className="la-serif whitespace-nowrap text-[0.98rem]" style={{ color: active ? "var(--la-ink)" : "var(--la-ink-soft)", fontWeight: active ? 600 : 500 }}>
                        {area.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                role="tabpanel"
                className="la-elevated border p-8 sm:p-10"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-paper)", borderRadius: "var(--la-radius-md)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="la-mono text-[0.75rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                    {AREAS[activeArea].n} · {AREAS[activeArea].name}
                  </span>
                  <span
                    className="la-mono shrink-0 rounded-full px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wide"
                    style={{ background: STATUS_META[AREAS[activeArea].status].soft, color: STATUS_META[AREAS[activeArea].status].dot }}
                  >
                    {STATUS_META[AREAS[activeArea].status].label}
                  </span>
                </div>
                <p className="la-serif mt-5 max-w-[46ch] text-[1.4rem] leading-snug" style={{ textWrap: "balance" }}>
                  {AREAS[activeArea].detail}
                </p>
                <a
                  href="#scan-input"
                  className="la-underline mt-7 inline-flex items-center gap-2 text-[0.92rem] font-medium"
                  style={{ color: "var(--la-ink)" }}
                >
                  Check this on your site <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* +Human */}
        <section id="human" className="border-t" style={{ borderColor: "var(--la-paper-line)", background: "var(--la-applicable-soft)" }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-[56ch]">
              <span
                className="la-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]"
                style={{ background: "var(--la-paper)", color: "var(--la-applicable)" }}
              >
                +Human
              </span>
              <h2 className="mt-4 text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                AI drafts. A human signs.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
                The finding you just watched get filed still goes through a licensed attorney before any fix
                is presented as a recommendation.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <div className="la-elevated border p-7" style={{ background: "var(--la-paper)", borderColor: "var(--la-paper-line)", borderRadius: "var(--la-radius-md)" }}>
                <span className="la-mono text-[0.7rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                  Drafted by Verena
                </span>
                <p className="la-serif mt-3 text-[1.1rem] leading-snug">
                  "Cookie banner has no way to withdraw consent once given."
                </p>
                <p className="mt-4 text-[0.88rem]" style={{ color: "var(--la-ink-soft)" }}>
                  Proposed: a one-line consent toggle, added to the cookie settings panel.
                </p>
              </div>
              <div className="la-elevated border p-7" style={{ background: "var(--la-paper)", borderColor: "var(--la-paper-line)", borderRadius: "var(--la-radius-md)" }}>
                <div className="flex items-center gap-2.5">
                  <SealIcon className="h-5 w-5" style={{ color: "var(--la-applicable)" }} />
                  <span className="la-mono text-[0.7rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                    Co-signed by Invictus Counsel
                  </span>
                </div>
                <p className="la-serif mt-3 text-[1.1rem] leading-snug">
                  "Confirmed required under §1798.135(a)(5). Fix is ready to ship."
                </p>
                <p className="mt-4 text-[0.88rem]" style={{ color: "var(--la-ink-soft)" }}>
                  R. Alvarez, Esq. · reviewed in 11 minutes
                </p>
              </div>
            </div>

            <a href="#pricing" className="mt-9 inline-flex items-center gap-2 text-[0.95rem] font-medium" style={{ color: "var(--la-ink)" }}>
              Add +Human to any plan <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-t" style={{ borderColor: "var(--la-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-[56ch]">
              <span
                className="la-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]"
                style={{ background: "var(--la-neutral-soft)", color: "var(--la-ink-soft)" }}
              >
                Pricing
              </span>
              <h2 className="mt-4 text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                Priced like a tool, not a retainer.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
                Every plan covers all six areas. Higher tiers add scanning credits for larger or faster-changing sites.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PRICING.map((row) => {
                const featured = row.tier === "Professional";
                return (
                  <div
                    key={row.tier}
                    className="la-elevated relative flex flex-col border p-7"
                    style={{
                      borderColor: featured ? "var(--la-ink)" : "var(--la-paper-line)",
                      borderWidth: featured ? "1.5px" : "1px",
                      background: "var(--la-paper)",
                      borderRadius: "var(--la-radius-md)",
                    }}
                  >
                    {featured ? (
                      <span
                        className="la-mono absolute -top-3 left-6 rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-wide text-white"
                        style={{ background: "var(--la-ink)" }}
                      >
                        Most popular
                      </span>
                    ) : null}
                    <p className="la-serif text-[1.05rem]">{row.tier}</p>
                    <p className="la-mono mt-3 text-[2rem] leading-none">
                      {row.price}
                      <span className="text-[0.82rem] font-normal" style={{ color: "var(--la-ink-faint)" }}>{row.unit}</span>
                    </p>
                    <div
                      className="mt-5 flex items-center gap-2 border-t pt-4"
                      style={{ borderColor: "var(--la-paper-line)" }}
                    >
                      <CheckIcon className="h-3.5 w-3.5 shrink-0" style={{ color: featured ? "var(--la-ink)" : "var(--la-ink-faint)" }} />
                      <span className="la-mono text-[0.88rem]" style={{ color: "var(--la-ink-soft)" }}>{row.credits}</span>
                    </div>
                    <p className="mt-3 text-[0.88rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>{row.note}</p>
                    <a
                      href="#scan-input"
                      className={`la-btn mt-6 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-[0.85rem] font-semibold ${
                        featured ? "text-white" : "border hover:bg-[var(--la-ink)] hover:text-white"
                      }`}
                      style={featured ? { background: "var(--la-ink)" } : { borderColor: "var(--la-ink)", color: "var(--la-ink)" }}
                    >
                      Choose {row.tier}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t" style={{ borderColor: "var(--la-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <span
              className="la-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]"
              style={{ background: "var(--la-neutral-soft)", color: "var(--la-ink-soft)" }}
            >
              FAQ
            </span>
            <h2 className="mt-4 max-w-[40ch] text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
              Questions worth asking before you trust a scan.
            </h2>

            <div className="mt-10 border-t" style={{ borderColor: "var(--la-paper-line)" }}>
              {FAQS.map((item, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={item.q} className="border-b" style={{ borderColor: "var(--la-paper-line)" }}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="la-serif text-[1.08rem]" style={{ color: "var(--la-ink)" }}>{item.q}</span>
                      <span
                        className="la-mono shrink-0 text-[1.1rem] transition-transform duration-200"
                        style={{ color: "var(--la-ink-faint)", transform: isOpen ? "rotate(45deg)" : "none" }}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    <div className={`la-faq-body${isOpen ? " is-open" : ""}`}>
                      <div className="overflow-hidden">
                        <p className="max-w-[62ch] pb-5 text-[0.95rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
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

        {/* Final CTA */}
        <section className="border-t" style={{ borderColor: "var(--la-paper-line)", background: "var(--la-ink)" }}>
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[48ch]">
              <h2 className="la-serif text-[1.9rem] text-white" style={{ textWrap: "balance" }}>
                Run the same scan on your own site.
              </h2>
              <p className="mt-2 text-[0.98rem]" style={{ color: "oklch(85% 0.01 260)" }}>
                Free, about 90 seconds, no account required to see results.
              </p>
            </div>
            <a
              href="#scan-input"
              className="la-btn flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-[0.95rem] font-semibold hover:opacity-90"
              style={{ background: "white", color: "var(--la-ink)" }}
            >
              <CheckIcon className="h-4 w-4" />
              Start a scan
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t" style={{ borderColor: "var(--la-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="max-w-[62ch] text-[0.82rem] leading-relaxed" style={{ color: "var(--la-ink-faint)" }}>
              Verena is in beta and can make mistakes. A clean scan is a strong signal, not legal certification
              — for anything load-bearing, use +Human. Verena is built by Invictus AI; +Human reviews are
              provided by attorneys at Invictus Counsel.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--la-paper-line)" }}>
              <span className="la-serif text-[0.95rem]" style={{ color: "var(--la-ink)" }}>Verena</span>
              <nav className="flex flex-wrap gap-6 text-[0.82rem]" style={{ color: "var(--la-ink-faint)" }}>
                <a className="la-underline" href="#privacy">Privacy</a>
                <a className="la-underline" href="#terms">Terms</a>
                <a className="la-underline" href="#status">Status</a>
              </nav>
              <span className="la-mono text-[0.78rem]" style={{ color: "var(--la-ink-faint)" }}>
                © {new Date().getFullYear()} Invictus AI
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
