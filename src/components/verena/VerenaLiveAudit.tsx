import { useLayoutEffect, useRef, useState, type FormEvent } from "react";

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SealIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M13.5 20.5l4 4 9-9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VerenaLiveAudit() {
  const [domain, setDomain] = useState("");
  const [filed, setFiled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
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
          --la-paper: oklch(98.3% 0.006 90);
          --la-paper-line: oklch(90% 0.01 90);
          --la-ink: oklch(22% 0.015 260);
          --la-ink-soft: oklch(45% 0.015 260);
          --la-ink-faint: oklch(62% 0.012 260);
          --la-exposed: oklch(55% 0.15 25);
          --la-exposed-soft: oklch(94% 0.03 25);
          --la-gap: oklch(62% 0.12 70);
          --la-gap-soft: oklch(94% 0.03 72);
          --la-applicable: oklch(48% 0.09 155);
          --la-applicable-soft: oklch(93% 0.025 155);
          --la-neutral: oklch(55% 0.01 260);
          --la-neutral-soft: oklch(92% 0.006 260);
          --la-header-h: 72px;
          --la-serif: "Source Serif 4", "Iowan Old Style", Georgia, serif;
          --la-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
          --la-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
          background: var(--la-paper);
          color: var(--la-ink);
          font-family: var(--la-sans);
        }
        .la :is(h1, h2, h3, .la-serif) { font-family: var(--la-serif); }
        .la .la-mono { font-family: var(--la-mono); font-variant-numeric: tabular-nums; }

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

        .la-card-shell { position: relative; width: 100%; max-width: 30rem; }
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
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Persistent header — always visible, never pinned over */}
      <header
        className="fixed inset-x-0 top-0 z-50 border-b"
        style={{ height: "var(--la-header-h)", borderColor: "var(--la-paper-line)", background: "color-mix(in oklab, var(--la-paper) 94%, transparent)", backdropFilter: "blur(8px)" }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-6">
          <a href="#top" className="la-serif text-lg font-medium tracking-tight" style={{ color: "var(--la-ink)" }}>
            Verena
          </a>
          <nav className="hidden items-center gap-7 text-[0.9rem] md:flex" style={{ color: "var(--la-ink-soft)" }}>
            <a className="la-underline" href="#coverage">Coverage</a>
            <a className="la-underline" href="#human">+Human</a>
            <a className="la-underline" href="#pricing">Pricing</a>
            <a className="la-underline" href="#faq">FAQ</a>
          </nav>
          <a
            href="#scan-input"
            className="shrink-0 rounded-sm px-4 py-2 text-[0.9rem] font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--la-ink)" }}
          >
            Start a scan
          </a>
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
            <p className="la-mono mb-5 text-[0.75rem] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--la-exposed)" }}>
              One real finding · six areas scanned at once
            </p>
            <h1 className="text-[2.6rem] leading-[1.08] font-medium tracking-tight sm:text-[3.2rem]" style={{ textWrap: "balance" }}>
              Watch Verena turn one finding into a standing compliance record.
            </h1>
            <p className="mt-6 max-w-[52ch] text-[1.08rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
              Scroll to see a real scan unfold: a flagged finding, a generated report, and the six areas
              Verena watches on every site. Or skip straight to the scan.
            </p>
            <a href="#after-story" className="la-underline mt-5 inline-block text-[0.92rem] font-medium" style={{ color: "var(--la-ink)" }}>
              Skip the story ↓
            </a>

            <form id="scan-form" onSubmit={handleSubmit} className="mt-10 max-w-md">
              <label htmlFor="scan-input" className="la-mono mb-2 block text-[0.72rem] uppercase tracking-[0.12em]" style={{ color: "var(--la-ink-faint)" }}>
                Run a scan
              </label>
              <div className="flex items-stretch gap-0 border-b-2 pb-2" style={{ borderColor: "var(--la-ink)" }}>
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
                  className="w-full bg-transparent text-[1.05rem] outline-none"
                  style={{ color: "var(--la-ink)" }}
                />
                <button type="submit" className="shrink-0 pl-4 text-[0.95rem] font-medium" style={{ color: "var(--la-exposed)" }}>
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

            <div className="la-card-shell">
              <div
                className="la-card-front border p-6"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-paper)" }}
              >
                <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--la-paper-line)" }}>
                  <span className="la-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--la-ink-faint)" }}>
                    Analyzing hirestepx.com
                  </span>
                  <span className="la-mono rounded-sm px-2 py-0.5 text-[0.68rem] uppercase tracking-wide" style={{ background: STATUS_META.exposed.soft, color: STATUS_META.exposed.dot }}>
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
                className="la-card-back border p-6"
                style={{ borderColor: "var(--la-paper-line)", background: "var(--la-paper)" }}
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
                      className="la-finding flex items-center gap-2 rounded-sm border px-2.5 py-2"
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

              <a
                href="#scan-input"
                className="la-inline-cta la-underline mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium"
                style={{ color: "var(--la-ink)" }}
              >
                See this for your site <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="mt-2 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
              {AREAS.map((area) => (
                <div
                  key={area.n}
                  className="la-feature-tile rounded-sm border p-3 text-center"
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
              <h2 className="text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
                Six areas, scanned continuously.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
                Every finding above is a live example of what Verena watches on every site, every time.
              </p>
            </div>

            <ul className="mt-10 border-t" style={{ borderColor: "var(--la-paper-line)" }}>
              {AREAS.map((area) => (
                <li
                  key={area.n}
                  className="flex flex-col gap-2 border-b py-5 sm:flex-row sm:items-baseline sm:gap-6 sm:py-6"
                  style={{ borderColor: "var(--la-paper-line)" }}
                >
                  <span className="la-mono shrink-0 text-[0.85rem]" style={{ color: STATUS_META[area.status].dot }}>
                    {area.n}
                  </span>
                  <span className="la-serif shrink-0 text-[1.1rem] sm:w-[13.5rem]" style={{ color: "var(--la-ink)" }}>
                    {area.name}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed sm:max-w-[48ch]" style={{ color: "var(--la-ink-soft)" }}>
                    {area.detail}
                  </span>
                  <span
                    className="la-mono rounded-sm px-2 py-0.5 text-[0.68rem] uppercase tracking-wide sm:ml-auto"
                    style={{ background: STATUS_META[area.status].soft, color: STATUS_META[area.status].dot }}
                  >
                    {STATUS_META[area.status].label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* +Human */}
        <section id="human" className="border-t" style={{ borderColor: "var(--la-paper-line)", background: "var(--la-applicable-soft)" }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-[56ch]">
              <p className="la-mono mb-3 text-[0.75rem] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--la-applicable)" }}>
                +Human
              </p>
              <h2 className="text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
                AI drafts. A human signs.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
                The finding you just watched get filed still goes through a licensed attorney before any fix
                is presented as a recommendation.
              </p>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-sm sm:grid-cols-2" style={{ background: "var(--la-paper-line)" }}>
              <div className="p-7" style={{ background: "var(--la-paper)" }}>
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
              <div className="p-7" style={{ background: "var(--la-paper)" }}>
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
              <h2 className="text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
                Priced like a tool, not a retainer.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-relaxed" style={{ color: "var(--la-ink-soft)" }}>
                Every plan covers all six areas. Higher tiers add scanning credits for larger or faster-changing sites.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b text-[0.72rem] uppercase tracking-[0.1em]" style={{ borderColor: "var(--la-ink)", color: "var(--la-ink-faint)" }}>
                    <th className="pb-3 font-normal">Plan</th>
                    <th className="pb-3 font-normal">Price</th>
                    <th className="pb-3 font-normal">Scanning credits</th>
                    <th className="pb-3 font-normal">Best for</th>
                    <th className="pb-3 font-normal text-right">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING.map((row) => (
                    <tr key={row.tier} className="border-b" style={{ borderColor: "var(--la-paper-line)" }}>
                      <td className="la-serif py-5 text-[1.05rem]">{row.tier}</td>
                      <td className="la-mono py-5 text-[1.05rem]">
                        {row.price}
                        <span className="text-[0.8rem]" style={{ color: "var(--la-ink-faint)" }}>{row.unit}</span>
                      </td>
                      <td className="la-mono py-5 text-[0.9rem]" style={{ color: "var(--la-ink-soft)" }}>{row.credits}</td>
                      <td className="py-5 text-[0.9rem]" style={{ color: "var(--la-ink-soft)" }}>{row.note}</td>
                      <td className="py-5 text-right">
                        <a href="#scan-input" className="la-underline text-[0.88rem] font-medium" style={{ color: "var(--la-ink)" }}>
                          Choose {row.tier}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t" style={{ borderColor: "var(--la-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="max-w-[40ch] text-[1.9rem] font-medium tracking-tight sm:text-[2.2rem]" style={{ textWrap: "balance" }}>
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
              <h2 className="la-serif text-[1.7rem] text-white" style={{ textWrap: "balance" }}>
                Run the same scan on your own site.
              </h2>
              <p className="mt-2 text-[0.98rem]" style={{ color: "oklch(85% 0.01 260)" }}>
                Free, about 90 seconds, no account required to see results.
              </p>
            </div>
            <a
              href="#scan-input"
              className="flex shrink-0 items-center gap-2 rounded-sm px-5 py-3 text-[0.95rem] font-medium"
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
