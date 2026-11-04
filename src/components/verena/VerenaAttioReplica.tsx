import { useEffect, useRef, useState, type CSSProperties } from "react";

type Status = "exposed" | "gap" | "applicable" | "unchecked";

const STATUS_META: Record<Status, { label: string; dot: string; soft: string }> = {
  exposed: { label: "Exposed", dot: "var(--vr-exposed)", soft: "var(--vr-exposed-soft)" },
  gap: { label: "Gap", dot: "var(--vr-gap)", soft: "var(--vr-gap-soft)" },
  applicable: { label: "Applicable", dot: "var(--vr-applicable)", soft: "var(--vr-applicable-soft)" },
  unchecked: { label: "Unchecked", dot: "var(--vr-neutral)", soft: "var(--vr-neutral-soft)" },
};

const FINDINGS_ROWS: { page: string; risk: number; area: string; status: Status }[] = [
  { page: "/checkout", risk: 72, area: "Cookies & Trackers", status: "exposed" },
  { page: "/blog/returns-policy", risk: 88, area: "Privacy Policy", status: "exposed" },
  { page: "/signup", risk: 61, area: "Commercial Email", status: "gap" },
  { page: "/pricing", risk: 41, area: "Terms of Service", status: "applicable" },
  { page: "/about", risk: 12, area: "Marketing Claims", status: "unchecked" },
];

type TabVisual = "table" | "diff" | "draft" | "report" | "schedule";

const TABS: { n: string; title: string; lede: string; visual: TabVisual }[] = [
  {
    n: "01",
    title: "Scan everything.",
    lede: "Every page, every banner, every footer link — checked against six areas of law in one pass.",
    visual: "table",
  },
  {
    n: "02",
    title: "Catch new gaps.",
    lede: "When a page ships a change, Verena re-reads it and flags exactly what moved out of range.",
    visual: "diff",
  },
  {
    n: "03",
    title: "File the fix.",
    lede: "A drafted fix, cited to the clause it satisfies, ready for a human to approve before it ships.",
    visual: "draft",
  },
  {
    n: "04",
    title: "Prove compliance.",
    lede: "A standing report any auditor, investor, or customer can read and verify in under a minute.",
    visual: "report",
  },
  {
    n: "05",
    title: "Re-check automatically.",
    lede: "Verena doesn't wait to be asked. It watches on a schedule and re-files what changed.",
    visual: "schedule",
  },
];

const SITE_TYPES = ["WordPress", "Shopify", "Webflow", "Squarespace", "Wix", "Custom-built"];

const SCALE_STATS = [
  { label: "SOC 2 Type II", detail: "Audited controls, available under NDA." },
  { label: "Full audit log", detail: "Every scan, finding, and fix, timestamped and exportable." },
  { label: "SSO & SCIM", detail: "Provision and deprovision reviewers through your identity provider." },
  { label: "Role-based access", detail: "Legal sees drafts; engineering sees patches; nobody sees both by accident." },
];

const PROOF_STATS = [
  { value: "6", label: "Areas scanned on every site, every time" },
  { value: "~90s", label: "From submitted domain to first report" },
  { value: "11 min", label: "Average time for +Human to review a finding" },
  { value: "24/7", label: "Continuous monitoring on paid plans" },
];

const CHANGELOG = [
  { title: "Continuous re-scans", detail: "Verena now watches shipped changes instead of waiting for a manual re-run." },
  { title: "Policy diffing", detail: "See exactly which clause changed between two versions of a policy page." },
  { title: "Slack alerts", detail: "New findings post straight to the channel your team already reads." },
  { title: "Audit trail export", detail: "Download the full finding-to-fix history as a signed PDF." },
];

const INTEGRATIONS = ["Slack", "Email", "Jira", "Linear", "Webhooks", "SSO (SAML)", "Zapier", "CSV export"];

const COMPANY_TYPES = [
  "Seed-stage SaaS",
  "Series A fintech",
  "E-commerce platform",
  "Healthtech startup",
  "Dev tools company",
  "B2B marketplace",
  "Consumer app",
  "Legal services",
  "Insurance SaaS",
  "Agency network",
];

function useScrollSpy(count: number, trackRef: React.RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const index = Math.min(count - 1, Math.floor(progress * count));
      setActive(index);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, trackRef]);
  return active;
}

function CheckIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M4 12.5l5.5 5.5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WindowChrome({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-3 border border-b-0 px-4 py-3"
      style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-neutral-soft)", borderRadius: "var(--vr-radius-lg) var(--vr-radius-lg) 0 0" }}
    >
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(75% 0.14 27)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(80% 0.13 85)" }} />
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(75% 0.13 155)" }} />
      </span>
      <span className="vr-mono mx-auto rounded-full px-3 py-0.5 text-[0.7rem]" style={{ background: "var(--vr-paper)", color: "var(--vr-ink-faint)" }}>
        {label}
      </span>
    </div>
  );
}

function TabVisualPanel({ tab }: { tab: (typeof TABS)[number] }) {
  const cardStyle: CSSProperties = {
    borderColor: "var(--vr-paper-line)",
    background: "var(--vr-paper)",
    borderRadius: "var(--vr-radius-md)",
  };

  if (tab.visual === "table") {
    return (
      <div className="vr-elevated border p-5" style={cardStyle}>
        <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
          Findings to review
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[26rem] border-collapse text-left text-[0.82rem]">
            <thead>
              <tr style={{ color: "var(--vr-ink-faint)" }}>
                <th className="pb-2 pr-4 font-medium">Page</th>
                <th className="pb-2 pr-4 font-medium">Risk</th>
                <th className="pb-2 pr-4 font-medium">Area</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {FINDINGS_ROWS.map((row) => (
                <tr key={row.page} className="border-t" style={{ borderColor: "var(--vr-paper-line)" }}>
                  <td className="vr-mono py-2.5 pr-4" style={{ color: "var(--vr-ink)" }}>{row.page}</td>
                  <td className="py-2.5 pr-4">
                    <span
                      className="vr-mono inline-block rounded-full px-2 py-0.5 text-[0.72rem]"
                      style={{ background: STATUS_META[row.status].soft, color: STATUS_META[row.status].dot }}
                    >
                      {row.risk}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4" style={{ color: "var(--vr-ink-soft)" }}>{row.area}</td>
                  <td className="py-2.5" style={{ color: "var(--vr-ink-faint)" }}>{STATUS_META[row.status].label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (tab.visual === "diff") {
    return (
      <div className="vr-elevated border p-6" style={cardStyle}>
        <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
          privacy-policy.html · line 212
        </p>
        <div className="mt-4 space-y-2 text-[0.92rem] leading-relaxed">
          <p className="rounded-md px-3 py-2 line-through" style={{ background: STATUS_META.exposed.soft, color: "var(--vr-ink-soft)" }}>
            We may share data with partners.
          </p>
          <p className="rounded-md px-3 py-2" style={{ background: STATUS_META.applicable.soft, color: "var(--vr-ink)" }}>
            We share data only with the processors listed in Section 4, and you can opt out at any time.
          </p>
        </div>
        <p className="mt-4 text-[0.82rem]" style={{ color: "var(--vr-ink-faint)" }}>Flagged after a content change shipped 11 minutes ago.</p>
      </div>
    );
  }

  if (tab.visual === "draft") {
    return (
      <div className="vr-elevated border p-6" style={cardStyle}>
        <div className="flex items-center justify-between gap-3">
          <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
            Draft fix
          </p>
          <span className="vr-mono rounded-full px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wide" style={{ background: STATUS_META.gap.soft, color: STATUS_META.gap.dot }}>
            Needs review
          </span>
        </div>
        <h4 className="vr-serif mt-3 text-[1.1rem] leading-snug">Cookie banner has no withdrawal option.</h4>
        <p className="mt-3 rounded-lg border p-3 text-[0.86rem] leading-relaxed" style={{ borderColor: "var(--vr-paper-line)", color: "var(--vr-ink-soft)" }}>
          Proposing a one-line consent toggle added to the existing cookie settings panel, satisfying Cal. Civ. Code
          §1798.135(a)(5).
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="vr-btn rounded-[10px] px-4 py-[0.55rem] text-[0.82rem] font-semibold text-white" style={{ background: "var(--vr-ink)" }}>
            Send for review
          </button>
          <button type="button" className="vr-btn vr-btn-outline rounded-[10px] border px-4 py-[0.55rem] text-[0.82rem] font-medium" style={{ borderColor: "var(--vr-paper-line)", color: "var(--vr-ink-soft)" }}>
            Edit
          </button>
          <button type="button" className="vr-btn vr-btn-ghost rounded-[10px] px-4 py-[0.55rem] text-[0.82rem] font-medium" style={{ color: "var(--vr-ink-faint)" }}>
            Save draft
          </button>
        </div>
      </div>
    );
  }

  if (tab.visual === "report") {
    const counts = FINDINGS_ROWS.reduce<Record<Status, number>>(
      (acc, row) => {
        acc[row.status] += 1;
        return acc;
      },
      { exposed: 0, gap: 0, applicable: 0, unchecked: 0 },
    );
    return (
      <div className="vr-elevated border p-6" style={cardStyle}>
        <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
          Compliance report · hirestepx.com
        </p>
        <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--vr-paper-line)" }}>
          {(Object.keys(counts) as Status[]).map((status) =>
            counts[status] > 0 ? (
              <div key={status} style={{ width: `${(counts[status] / FINDINGS_ROWS.length) * 100}%`, background: STATUS_META[status].dot }} />
            ) : null,
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {(Object.keys(counts) as Status[]).map((status) => (
            <div key={status} className="flex items-center gap-2 rounded-lg border px-2.5 py-2" style={{ borderColor: "var(--vr-paper-line)" }}>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: STATUS_META[status].dot }} />
              <span className="text-[0.8rem]" style={{ color: "var(--vr-ink-soft)" }}>
                {STATUS_META[status].label} · {counts[status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="vr-elevated border p-6" style={cardStyle}>
      <div className="flex items-center justify-between gap-3">
        <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
          Scan schedule
        </p>
        <span className="vr-mono rounded-full px-2.5 py-0.5 text-[0.68rem] uppercase tracking-wide" style={{ background: STATUS_META.applicable.soft, color: STATUS_META.applicable.dot }}>
          Continuous
        </span>
      </div>
      <div className="mt-4 space-y-2 text-[0.88rem]">
        {[
          { when: "Today, 3:00 AM", state: "Completed" },
          { when: "Tomorrow, 3:00 AM", state: "Scheduled" },
          { when: "Wed, 3:00 AM", state: "Scheduled" },
        ].map((row) => (
          <div key={row.when} className="flex items-center justify-between rounded-lg border px-3 py-2" style={{ borderColor: "var(--vr-paper-line)" }}>
            <span className="vr-mono" style={{ color: "var(--vr-ink)" }}>{row.when}</span>
            <span style={{ color: "var(--vr-ink-faint)" }}>{row.state}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[0.82rem]" style={{ color: "var(--vr-ink-faint)" }}>Every 24 hours, automatically. No one has to remember to run it.</p>
    </div>
  );
}

export default function VerenaAttioReplica() {
  const [activeTabMobile, setActiveTabMobile] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerOnDark, setHeaderOnDark] = useState(false);
  const headerOffset = bannerVisible ? "calc(var(--vr-banner-h) + var(--vr-header-h))" : "var(--vr-header-h)";
  const scannerTrackRef = useRef<HTMLDivElement>(null);
  const activeTabDesktop = useScrollSpy(TABS.length, scannerTrackRef);
  const headerRef = useRef<HTMLElement>(null);
  const darkSectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const checkDark = () => {
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const onDark = darkSectionRefs.current.some((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < headerBottom && rect.bottom > 0;
      });
      setHeaderOnDark(onDark);
    };
    checkDark();
    window.addEventListener("scroll", checkDark, { passive: true });
    window.addEventListener("resize", checkDark);
    return () => {
      window.removeEventListener("scroll", checkDark);
      window.removeEventListener("resize", checkDark);
    };
  }, [bannerVisible]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="vr">
      <style>{`
        .vr {
          --vr-paper: oklch(99.3% 0.002 255);
          --vr-paper-line: oklch(91.5% 0.006 255);
          --vr-neutral-soft: oklch(96.5% 0.004 260);
          --vr-ink: oklch(15% 0.012 260);
          --vr-ink-deep: oklch(7% 0.008 260);
          --vr-ink-soft: oklch(42% 0.012 260);
          --vr-ink-faint: oklch(58% 0.01 260);
          --vr-neutral: oklch(55% 0.01 260);
          --vr-exposed: oklch(56% 0.17 27);
          --vr-exposed-soft: oklch(94.5% 0.035 27);
          --vr-gap: oklch(63% 0.14 70);
          --vr-gap-soft: oklch(94.5% 0.035 72);
          --vr-applicable: oklch(49% 0.1 155);
          --vr-applicable-soft: oklch(93.5% 0.028 155);
          --vr-banner-h: 48px;
          --vr-header-h: 84px;
          --vr-radius-sm: 10px;
          --vr-radius-md: 16px;
          --vr-radius-lg: 24px;
          --vr-shadow: 0 1px 2px oklch(20% 0.01 260 / 6%), 0 16px 40px -14px oklch(20% 0.01 260 / 16%);
          --vr-serif: "Bricolage Grotesque", var(--vr-sans);
          --vr-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
          --vr-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
          background: var(--vr-paper);
          color: var(--vr-ink);
          font-family: var(--vr-sans);
          font-weight: 500;
          letter-spacing: -0.011em;
        }
        .vr :is(h1, h2, h3, h4, .vr-serif) { font-family: var(--vr-serif); font-weight: 600; }
        .vr .vr-mono { font-family: var(--vr-mono); font-variant-numeric: tabular-nums; }
        .vr .vr-elevated { box-shadow: var(--vr-shadow); }
        .vr-underline {
          background-image: linear-gradient(currentColor, currentColor);
          background-position: 0 100%;
          background-repeat: no-repeat;
          background-size: 0% 1px;
          transition: background-size 220ms ease-out;
        }
        .vr-underline:hover, .vr-underline:focus-visible { background-size: 100% 1px; }
        .vr-btn {
          transition: background-color 180ms cubic-bezier(0.22, 1, 0.36, 1), color 180ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 180ms cubic-bezier(0.22, 1, 0.36, 1), filter 180ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vr-btn:hover { filter: brightness(1.18); }
        .vr-btn-outline:hover { background: var(--vr-ink) !important; color: var(--vr-paper) !important; border-color: var(--vr-ink) !important; filter: none; }
        .vr-btn-light:hover { background: oklch(94% 0.005 260) !important; filter: none; }
        .vr-btn-ghost:hover { color: var(--vr-ink) !important; filter: none; }
        @media (prefers-reduced-motion: reduce) {
          .vr-underline, .vr-btn { transition: none; }
        }
      `}</style>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

      {bannerVisible ? (
        <div
          className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-3 px-6 text-center"
          style={{ height: "var(--vr-banner-h)", background: "var(--vr-ink)", color: "white" }}
        >
          <a href="#scanner" className="vr-underline text-[0.84rem] font-medium">
            Continuous monitoring is live for every paid plan →
          </a>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 text-[0.9rem] opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ) : null}

      <header
        ref={headerRef}
        className="fixed inset-x-0 z-40 border-b"
        style={{
          top: bannerVisible ? "var(--vr-banner-h)" : 0,
          height: "var(--vr-header-h)",
          borderColor: headerOnDark ? "oklch(30% 0.012 260)" : "var(--vr-paper-line)",
          background: headerOnDark
            ? "color-mix(in oklab, var(--vr-ink-deep) 88%, transparent)"
            : "color-mix(in oklab, var(--vr-paper) 94%, transparent)",
          backdropFilter: "blur(8px)",
          transition: "background-color 240ms ease, border-color 240ms ease",
        }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-6">
          <a
            href="#top"
            className="vr-serif shrink-0 text-lg font-semibold tracking-tight"
            style={{ color: headerOnDark ? "white" : "var(--vr-ink)", transition: "color 240ms ease" }}
          >
            Verena
          </a>
          <nav
            className="hidden items-center text-[0.9375rem] font-medium md:flex"
            style={{ color: headerOnDark ? "oklch(85% 0.01 260)" : "var(--vr-ink-soft)", transition: "color 240ms ease" }}
          >
            <a className="inline-flex items-center gap-1 px-3 py-2" href="#scanner">
              <span className="vr-underline">Platform</span> <span aria-hidden="true" style={{ fontSize: "0.7em" }}>▾</span>
            </a>
            <a className="px-3 py-2" href="#coverage"><span className="vr-underline">Coverage</span></a>
            <a className="px-3 py-2" href="#developers"><span className="vr-underline">Developers</span></a>
            <a className="px-3 py-2" href="#proof"><span className="vr-underline">Customers</span></a>
            <a className="px-3 py-2" href="#pricing"><span className="vr-underline">Pricing</span></a>
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="#top"
              className="vr-underline hidden text-[0.88rem] font-medium md:inline-block"
              style={{ color: headerOnDark ? "oklch(85% 0.01 260)" : "var(--vr-ink-soft)", transition: "color 240ms ease" }}
            >
              Sign in
            </a>
            <a
              href="#scan-input"
              className="vr-btn hidden rounded-[10px] px-4 py-[0.6rem] text-[0.88rem] font-semibold md:inline-flex"
              style={{
                background: headerOnDark ? "white" : "var(--vr-ink)",
                color: headerOnDark ? "var(--vr-ink)" : "white",
                transition: "background-color 240ms ease, color 240ms ease",
              }}
            >
              Start a scan
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-haspopup="dialog"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="-mr-2 inline-flex h-9 w-9 items-center justify-center md:hidden"
            >
              <span className="relative block h-[14px] w-[18px]">
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 block h-[1.5px] transition-transform duration-200"
                  style={{
                    background: headerOnDark ? "white" : "var(--vr-ink)",
                    top: mobileMenuOpen ? "6.5px" : 0,
                    transform: mobileMenuOpen ? "rotate(45deg)" : "none",
                    transitionProperty: "transform, background-color",
                    transitionDuration: "200ms, 240ms",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-1/2 block h-[1.5px] -translate-y-1/2 transition-opacity duration-150"
                  style={{
                    background: headerOnDark ? "white" : "var(--vr-ink)",
                    opacity: mobileMenuOpen ? 0 : 1,
                    transitionProperty: "opacity, background-color",
                    transitionDuration: "150ms, 240ms",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 block h-[1.5px] transition-transform duration-200"
                  style={{
                    background: headerOnDark ? "white" : "var(--vr-ink)",
                    bottom: mobileMenuOpen ? "6.5px" : 0,
                    transform: mobileMenuOpen ? "rotate(-45deg)" : "none",
                    transitionProperty: "transform, background-color",
                    transitionDuration: "200ms, 240ms",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-x-0 bottom-0 z-30 overflow-y-auto md:hidden"
          style={{ top: headerOffset, background: "var(--vr-paper)" }}
        >
          <nav className="flex flex-col px-6" style={{ color: "var(--vr-ink)" }}>
            {[
              { label: "Platform", href: "#scanner" },
              { label: "Coverage", href: "#coverage" },
              { label: "Developers", href: "#developers" },
              { label: "Customers", href: "#proof" },
              { label: "Pricing", href: "#pricing" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="border-b py-5 text-[1.05rem] font-medium"
                style={{ borderColor: "var(--vr-paper-line)" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#top"
              onClick={() => setMobileMenuOpen(false)}
              className="border-b py-5 text-[1.05rem] font-medium"
              style={{ borderColor: "var(--vr-paper-line)", color: "var(--vr-ink-soft)" }}
            >
              Sign in
            </a>
            <a
              href="#scan-input"
              onClick={() => setMobileMenuOpen(false)}
              className="vr-btn my-6 inline-flex items-center justify-center rounded-[10px] px-4 py-3 text-[0.95rem] font-semibold text-white"
              style={{ background: "var(--vr-ink)" }}
            >
              Start a scan
            </a>
          </nav>
        </div>
      ) : null}

      <main style={{ paddingTop: headerOffset }}>
        {/* Hero */}
        <section id="top" className="mx-auto max-w-6xl px-6 pb-24 pt-20 md:pt-28">
          <div className="mx-auto max-w-[52rem] text-center">
            <a
              href="#proof"
              className="vr-underline mb-8 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
              style={{ borderColor: "var(--vr-paper-line)" }}
            >
              <span className="text-[0.82rem] font-medium" style={{ color: "var(--vr-ink-soft)" }}>
                How we review findings, from +Human's lead counsel
              </span>
              <span aria-hidden="true" style={{ color: "var(--vr-ink-faint)" }}>›</span>
            </a>
            <h1 className="text-[2.9rem] leading-[1.05] tracking-tight sm:text-[3.8rem] lg:text-[4.4rem]" style={{ textWrap: "balance" }}>
              Welcome to autonomous compliance.
            </h1>
            <p className="mx-auto mt-7 max-w-[42ch] text-[1.15rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
              Verena is the platform that scans your site, files what it finds, and keeps a standing compliance
              record around the clock.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#human"
                className="vr-btn vr-btn-outline rounded-[10px] border px-4 py-[0.65rem] text-[0.92rem] font-medium"
                style={{ borderColor: "var(--vr-ink)", color: "var(--vr-ink)" }}
              >
                Talk to +Human
              </a>
              <a
                href="#scan-input"
                className="vr-btn rounded-[10px] px-4 py-[0.65rem] text-[0.92rem] font-semibold text-white"
                style={{ background: "var(--vr-ink)" }}
              >
                Start a scan
              </a>
            </div>
          </div>

          {/* Product mockup */}
          <div className="vr-elevated relative mx-auto mt-16 max-w-5xl overflow-hidden" style={{ borderRadius: "var(--vr-radius-lg)" }}>
            <WindowChrome label="verena.ai/dashboard" />
            <div
              className="relative flex border"
              style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "0 0 var(--vr-radius-lg) var(--vr-radius-lg)", minHeight: "26rem" }}
            >
              <aside
                className="hidden w-48 shrink-0 border-r p-4 sm:block"
                style={{ borderColor: "var(--vr-paper-line)" }}
              >
                <p className="vr-serif inline-flex items-center gap-1 text-[0.92rem]">
                  Verena <span aria-hidden="true" style={{ fontSize: "0.7em", color: "var(--vr-ink-faint)" }}>▾</span>
                </p>
                <nav className="mt-6 flex flex-col gap-1 text-[0.86rem]">
                  {["Overview", "Findings", "Scans", "Policies", "Reports"].map((item) => {
                    const active = item === "Findings";
                    return (
                      <span
                        key={item}
                        className="rounded-lg px-3 py-2"
                        style={{
                          background: active ? "var(--vr-neutral-soft)" : "transparent",
                          color: active ? "var(--vr-ink)" : "var(--vr-ink-faint)",
                          fontWeight: active ? 600 : 500,
                        }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </nav>
              </aside>

              <div className="relative flex-1 overflow-x-auto p-6">
                <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
                  Findings to review
                </p>
                <table className="mt-4 w-full min-w-[30rem] border-collapse text-left text-[0.84rem]">
                  <thead>
                    <tr style={{ color: "var(--vr-ink-faint)" }}>
                      <th className="pb-2 pr-4 font-medium">Page</th>
                      <th className="pb-2 pr-4 font-medium">Risk</th>
                      <th className="pb-2 pr-4 font-medium">Area</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FINDINGS_ROWS.map((row) => (
                      <tr key={row.page} className="border-t" style={{ borderColor: "var(--vr-paper-line)" }}>
                        <td className="vr-mono py-2.5 pr-4">{row.page}</td>
                        <td className="py-2.5 pr-4">
                          <span
                            className="vr-mono inline-block rounded-full px-2 py-0.5 text-[0.72rem]"
                            style={{ background: STATUS_META[row.status].soft, color: STATUS_META[row.status].dot }}
                          >
                            {row.risk}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4" style={{ color: "var(--vr-ink-soft)" }}>{row.area}</td>
                        <td className="py-2.5" style={{ color: "var(--vr-ink-faint)" }}>{STATUS_META[row.status].label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Floating AI draft panel, attio-style */}
                <div
                  className="vr-elevated absolute bottom-4 right-4 hidden w-72 border p-4 lg:block"
                  style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "var(--vr-radius-md)" }}
                >
                  <p className="vr-mono text-[0.68rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
                    Draft fix ★
                  </p>
                  <h4 className="vr-serif mt-1.5 text-[0.98rem] leading-snug">Fix cookie consent gap</h4>
                  <p className="mt-2 text-[0.78rem] leading-relaxed" style={{ color: "var(--vr-ink-soft)" }}>
                    The banner has no withdrawal option once consent is given.
                  </p>
                  <p className="mt-3 rounded-lg border p-2.5 text-[0.76rem] leading-relaxed" style={{ borderColor: "var(--vr-paper-line)", color: "var(--vr-ink-faint)" }}>
                    Assigned to: R. Alvarez, Esq. · Proposing a one-line consent toggle in the cookie settings panel.
                  </p>
                  <button
                    type="button"
                    className="vr-btn mt-3 w-full rounded-[10px] px-3 py-[0.5rem] text-[0.78rem] font-medium text-white"
                    style={{ background: "var(--vr-ink)" }}
                  >
                    Send for review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social proof strip — honest text wordmarks, no fabricated logos */}
        <section className="border-t" style={{ borderColor: "var(--vr-paper-line)" }}>
          <div
            className="mx-auto grid grid-cols-2 border-l border-t sm:grid-cols-3 lg:grid-cols-5"
            style={{ borderColor: "var(--vr-paper-line)" }}
          >
            {COMPANY_TYPES.map((label) => (
              <div
                key={label}
                className="flex items-center justify-center border-b border-r px-6 py-9"
                style={{ borderColor: "var(--vr-paper-line)" }}
              >
                <span className="vr-serif text-center text-[1.05rem]" style={{ color: "var(--vr-ink-faint)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* The scanner that never sleeps — mobile: compact click-driven tabs */}
        <section id="scanner" className="border-t lg:hidden" style={{ borderColor: "var(--vr-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-28">
            <div className="mx-auto max-w-[46rem] text-center">
              <h2 className="text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                The scanner that never sleeps.
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                Picks up a shipped change at 3am. Catches a policy drifting out of date before anyone notices.
                Hands your reviewer a drafted fix instead of a blank page.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-3">
              <div role="tablist" className="flex gap-2 overflow-x-auto pb-2">
                {TABS.map((tab, index) => {
                  const active = activeTabMobile === index;
                  return (
                    <button
                      key={tab.n}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTabMobile(index)}
                      className="vr-btn flex shrink-0 flex-col items-start gap-1 rounded-xl px-4 py-3.5 text-left"
                      style={{ background: active ? "var(--vr-neutral-soft)" : "transparent" }}
                    >
                      <span className="vr-serif whitespace-nowrap text-[0.98rem]" style={{ color: active ? "var(--vr-ink)" : "var(--vr-ink-soft)", fontWeight: active ? 600 : 500 }}>
                        {tab.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <TabVisualPanel tab={TABS[activeTabMobile]} />
            </div>
          </div>
        </section>

        {/* The scanner that never sleeps — desktop: sticky scroll-spy, one tall track per tab */}
        <div
          ref={scannerTrackRef}
          className="relative hidden border-t lg:block"
          style={{ borderColor: "var(--vr-paper-line)", height: `${TABS.length * 100}vh` }}
        >
          <div
            className="sticky overflow-hidden"
            style={{ top: headerOffset, height: `calc(100vh - ${headerOffset})` }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(var(--vr-paper-line) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                maskImage: "radial-gradient(ellipse 70% 60% at 68% 50%, black, transparent)",
              }}
            />
            <div className="relative mx-auto grid h-full max-w-6xl items-center gap-14 px-6 xl:grid-cols-[22rem_1fr]">
              <div>
                <span
                  className="vr-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]"
                  style={{ background: "var(--vr-neutral-soft)", color: "var(--vr-ink-soft)" }}
                >
                  Platform
                </span>
                <h2 className="mt-4 text-[2.3rem] leading-[1.05] tracking-tight" style={{ textWrap: "balance" }}>
                  The scanner that never sleeps.
                </h2>
                <div role="tablist" aria-orientation="vertical" className="mt-9 flex flex-col border-l-2" style={{ borderColor: "var(--vr-paper-line)" }}>
                  {TABS.map((tab, index) => {
                    const active = activeTabDesktop === index;
                    return (
                      <div
                        key={tab.n}
                        role="tab"
                        aria-selected={active}
                        className="relative py-3.5 pl-5"
                        style={{ opacity: active ? 1 : 0.42, transition: "opacity 220ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                      >
                        {active ? (
                          <span
                            className="absolute inset-y-0 left-[-2px] w-0.5"
                            style={{ background: "var(--vr-ink)" }}
                            aria-hidden="true"
                          />
                        ) : null}
                        <p className="vr-serif text-[1.1rem]" style={{ color: "var(--vr-ink)", fontWeight: active ? 600 : 500 }}>
                          {tab.title}
                        </p>
                        {active ? (
                          <p className="mt-1.5 max-w-[17rem] text-[0.86rem] leading-snug" style={{ color: "var(--vr-ink-faint)" }}>
                            {tab.lede}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative h-[34rem]">
                <div className="h-full [&>div]:h-full [&>div]:p-10">
                  <TabVisualPanel tab={TABS[activeTabDesktop]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live from day one */}
        <section className="border-t" style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-neutral-soft)" }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 lg:grid-cols-2 lg:items-center">
            <div className="max-w-[46ch]">
              <h2 className="text-[2rem] tracking-tight sm:text-[2.4rem]" style={{ textWrap: "balance" }}>
                Live before your first report finishes.
              </h2>
              <p className="mt-4 text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                Enter your domain and Verena starts reading immediately — every page, every policy, every
                third-party script already on the site. No crawler to configure, nothing to install.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { step: "01", text: "Enter your domain." },
                { step: "02", text: "Verena maps every public page and policy document." },
                { step: "03", text: "The first report lands in about 90 seconds." },
              ].map((row) => (
                <div
                  key={row.step}
                  className="vr-elevated flex items-center gap-4 border p-4"
                  style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "var(--vr-radius-md)" }}
                >
                  <span className="vr-mono text-[0.82rem]" style={{ color: "var(--vr-ink-faint)" }}>{row.step}</span>
                  <span className="text-[0.95rem]" style={{ color: "var(--vr-ink)" }}>{row.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Full-Site Context (Universal Context equivalent) */}
        <section className="border-t" style={{ borderColor: "var(--vr-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-28">
            <div className="mx-auto max-w-[50rem] text-center">
              <span className="vr-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]" style={{ background: "var(--vr-neutral-soft)", color: "var(--vr-ink-soft)" }}>
                Full-Site Context™
              </span>
              <h2 className="mt-4 text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                It doesn't grep for keywords. It reads your whole site together.
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                A cookie banner, a privacy policy, and an email footer are checked against each other, not in
                isolation — so a finding in one area accounts for what's actually true in the others.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { area: "Cookie banner", links: "cross-checked against →" },
                { area: "Privacy policy", links: "cross-checked against →" },
                { area: "Email footer", links: "flags mismatches first" },
              ].map((item, index) => (
                <div
                  key={item.area}
                  className="vr-elevated border p-6 text-center"
                  style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "var(--vr-radius-md)" }}
                >
                  <p className="vr-serif text-[1.05rem]">{item.area}</p>
                  <p className="mt-2 text-[0.82rem]" style={{ color: "var(--vr-ink-faint)" }}>
                    {index < 2 ? item.links : item.links}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All signals, none of the noise + stack row */}
        <section id="coverage" className="border-t" style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-neutral-soft)" }}>
          <div className="mx-auto max-w-6xl px-6 py-28">
            <div className="mx-auto max-w-[50rem] text-center">
              <h2 className="text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                All of the gaps. None of the noise. Ready to fix.
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                Findings are ranked by real exposure, not keyword hits, so the first thing you see is the thing
                worth fixing today.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Ranked by exposure", text: "A missing unsubscribe link outranks a stale copyright year." },
                { title: "Cited to statute", text: "Every finding names the clause or standard it's measuring against." },
                { title: "No false alarms", text: "Verena re-checks before filing, so what lands in your inbox is real." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="vr-elevated border p-6"
                  style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "var(--vr-radius-md)" }}
                >
                  <p className="vr-serif text-[1.05rem]">{item.title}</p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed" style={{ color: "var(--vr-ink-soft)" }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="vr-mono text-[0.78rem] uppercase tracking-[0.1em]" style={{ color: "var(--vr-ink-faint)" }}>
                Scans anywhere your site lives
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {SITE_TYPES.map((name) => (
                  <span key={name} className="vr-serif text-[1.05rem]" style={{ color: "var(--vr-ink-faint)" }}>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Developers */}
        <section id="developers" className="border-t" style={{ borderColor: "var(--vr-paper-line)" }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-28 lg:grid-cols-2 lg:items-center">
            <div className="max-w-[46ch]">
              <span className="vr-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]" style={{ background: "var(--vr-neutral-soft)", color: "var(--vr-ink-soft)" }}>
                Developers
              </span>
              <h2 className="mt-4 text-[2rem] tracking-tight sm:text-[2.4rem]" style={{ textWrap: "balance" }}>
                API. Webhooks. MCP. Build compliance into your stack.
              </h2>
              <p className="mt-4 text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                Trigger a scan on deploy, pull findings into your own dashboard, or hand an agent the MCP server
                and let it query compliance status directly.
              </p>
            </div>
            <div
              className="vr-elevated overflow-hidden border"
              style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-ink)", borderRadius: "var(--vr-radius-md)" }}
            >
              <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "oklch(30% 0.012 260)" }}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(75% 0.14 27)" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(80% 0.13 85)" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "oklch(75% 0.13 155)" }} />
              </div>
              <pre className="vr-mono overflow-x-auto p-5 text-[0.82rem] leading-relaxed" style={{ color: "oklch(92% 0.006 260)" }}>
{`curl https://api.verena.ai/v1/scans \\
  -H "Authorization: Bearer $VERENA_KEY" \\
  -d domain=hirestepx.com

{
  "scan_id": "scn_8f2c",
  "status": "filed",
  "findings": 6,
  "highest_risk": "cookies_and_trackers"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Fits into how you already work — dark full-bleed integrations section */}
        <section
          ref={(el) => { darkSectionRefs.current[0] = el; }}
          className="relative overflow-hidden border-t"
          style={{ borderColor: "oklch(30% 0.012 260)", background: "var(--vr-ink-deep)" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(oklch(32% 0.012 260) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage: "radial-gradient(ellipse 60% 70% at 50% 40%, black, transparent)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
            <span
              className="vr-mono inline-block rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.1em]"
              style={{ background: "oklch(28% 0.012 260)", color: "oklch(85% 0.01 260)" }}
            >
              Integrations
            </span>
            <h2 className="mt-5 text-[2.3rem] tracking-tight text-white sm:text-[3rem]" style={{ textWrap: "balance" }}>
              Fits into how you already work.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-[1.02rem] leading-snug" style={{ color: "oklch(72% 0.01 260)" }}>
              Findings land where your team already reads them — no new tool to check.
            </p>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {INTEGRATIONS.map((name) => (
                <span
                  key={name}
                  className="vr-serif rounded-xl border px-5 py-3 text-[0.98rem]"
                  style={{ borderColor: "oklch(32% 0.012 260)", background: "oklch(22% 0.012 260)", color: "oklch(88% 0.008 260)" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Run at any scale */}
        <section className="border-t" style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-neutral-soft)" }}>
          <div className="mx-auto max-w-6xl px-6 py-28">
            <div className="mx-auto max-w-[46rem] text-center">
              <h2 className="text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                Run compliance at any scale.
              </h2>
              <p className="mx-auto mt-3 max-w-[48ch] text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                From one marketing site to a portfolio of two hundred, with the controls a security review
                actually asks for.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SCALE_STATS.map((item) => (
                <div
                  key={item.label}
                  className="vr-elevated border p-6"
                  style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "var(--vr-radius-md)" }}
                >
                  <p className="vr-serif text-[1.02rem]">{item.label}</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed" style={{ color: "var(--vr-ink-soft)" }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof */}
        <section id="proof" className="border-t" style={{ borderColor: "var(--vr-paper-line)" }}>
          <div className="mx-auto max-w-6xl px-6 py-28">
            <div className="mx-auto max-w-[46rem] text-center">
              <h2 className="text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                Built for teams who can't afford to guess.
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROOF_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="vr-serif vr-mono text-[2.4rem] leading-none" style={{ color: "var(--vr-ink)" }}>{stat.value}</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed" style={{ color: "var(--vr-ink-faint)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping weekly */}
        <section className="border-t" style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-neutral-soft)" }}>
          <div className="mx-auto max-w-6xl px-6 py-28">
            <div className="max-w-[46rem]">
              <h2 className="text-[2.1rem] tracking-tight sm:text-[2.6rem]" style={{ textWrap: "balance" }}>
                Shipping weekly.
              </h2>
              <p className="mt-3 text-[1.02rem] leading-snug" style={{ color: "var(--vr-ink-soft)" }}>
                New ways to catch gaps sooner and prove compliance faster.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CHANGELOG.map((item) => (
                <div
                  key={item.title}
                  className="vr-elevated border p-6"
                  style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-paper)", borderRadius: "var(--vr-radius-md)" }}
                >
                  <p className="vr-serif text-[1rem]">{item.title}</p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed" style={{ color: "var(--vr-ink-soft)" }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* +Human, kept as its own anchor for nav parity with the hero link */}
        <section id="human" className="sr-only" aria-hidden="true" />

        {/* Final CTA */}
        <section
          ref={(el) => { darkSectionRefs.current[1] = el; }}
          className="border-t"
          style={{ borderColor: "var(--vr-paper-line)", background: "var(--vr-ink-deep)" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[48ch]">
              <h2 className="vr-serif text-[1.9rem] text-white" style={{ textWrap: "balance" }}>
                Autonomous compliance runs on Verena.
              </h2>
              <p className="mt-2 text-[0.98rem]" style={{ color: "oklch(85% 0.01 260)" }}>
                Free, about 90 seconds, no account required to see results.
              </p>
            </div>
            <a
              href="#scan-input"
              className="vr-btn vr-btn-light flex shrink-0 items-center gap-2 rounded-[10px] px-4 py-[0.65rem] text-[0.92rem] font-medium"
              style={{ background: "white", color: "var(--vr-ink)" }}
            >
              <CheckIcon className="h-4 w-4" />
              Start a scan
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer
          ref={(el) => { darkSectionRefs.current[2] = el; }}
          className="flex min-h-[40svh] flex-col justify-between border-t"
          style={{ borderColor: "oklch(30% 0.012 260)", background: "var(--vr-ink-deep)" }}
        >
          <div className="mx-auto w-full max-w-6xl px-6 pt-20 pb-12">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
              <div className="lg:col-span-2">
                <span className="vr-serif text-[1.05rem] text-white">Verena</span>
                <p className="mt-3 max-w-[32ch] text-[0.82rem] leading-relaxed" style={{ color: "oklch(60% 0.012 260)" }}>
                  Verena is in beta and can make mistakes. A clean scan is a strong signal, not legal certification
                  — for anything load-bearing, use +Human.
                </p>
              </div>
              {[
                { heading: "Platform", links: ["Coverage", "+Human", "Pricing", "Scan API"] },
                { heading: "Resources", links: ["FAQ", "Docs", "Status"] },
                { heading: "Company", links: ["About", "Careers", "Blog"] },
                { heading: "Legal", links: ["Privacy", "Terms", "Security"] },
              ].map((col) => (
                <div key={col.heading}>
                  <p className="vr-mono text-[0.72rem] uppercase tracking-[0.1em]" style={{ color: "oklch(50% 0.012 260)" }}>{col.heading}</p>
                  <nav className="mt-3 flex flex-col gap-2 text-[0.86rem]" style={{ color: "oklch(85% 0.01 260)" }}>
                    {col.links.map((link) => (
                      <a key={link} className="vr-underline w-fit" href="#top">{link}</a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 border-t px-6 py-6" style={{ borderColor: "oklch(30% 0.012 260)" }}>
            <span className="vr-mono text-[0.78rem]" style={{ color: "oklch(50% 0.012 260)" }}>
              © {new Date().getFullYear()} Invictus AI
            </span>
            <span id="pricing" className="sr-only">Pricing lives on the Option 3 page.</span>
            <span id="scan-input" className="sr-only" />
          </div>
        </footer>
      </main>
    </div>
  );
}
