import { useEffect, useId, useState, type ReactNode } from "react";
import verenaLogo from "../../assets/homepage/image-15.webp";
import {
  ACCENT,
  bricolage,
  INK,
  MOCKUP_FINDINGS,
  MOCKUP_RECHECKS,
  REVIEW_AREAS,
  SEVERITY_META,
  STATUS_COLORS,
  type TOOL_TABS,
} from "./verenaHomepage.data";
import { CheckIcon, VerenaMarkIcon } from "./verenaHomepage.icons";

export function ToolMockupBody({ tool }: { tool: (typeof TOOL_TABS)[number]["id"] }) {
  if (tool === "reports") {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p style={bricolage} className="text-[13px] font-semibold sm:text-[15px]">acme.com — Full Report</p>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: "rgba(22,163,74,0.1)", color: STATUS_COLORS.verified }}
          >
            Analysis complete
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          {MOCKUP_FINDINGS.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 rounded-[10px] px-3 py-2.5"
              style={{ border: "1px solid rgba(33,12,55,0.08)" }}
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: f.severity }} />
              <p className="w-[86px] shrink-0 text-[12px] font-medium sm:w-[140px] sm:text-[13px]">{f.title}</p>
              <p className="flex-1 break-words text-[12px] opacity-60 sm:text-[13px]">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tool === "drafts") {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p style={bricolage} className="text-[13px] font-semibold sm:text-[15px]">Privacy Policy — Suggested edit</p>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
          >
            Awaiting approval
          </span>
        </div>
        <div
          className="flex-1 rounded-[10px] p-4 text-[13px] leading-6"
          style={{ border: "1px solid rgba(33,12,55,0.08)" }}
        >
          We{" "}
          <span className="rounded px-1 line-through" style={{ backgroundColor: "rgba(228,87,46,0.12)", color: STATUS_COLORS.deficit }}>
            may share
          </span>{" "}
          <span className="rounded px-1" style={{ backgroundColor: "rgba(22,163,74,0.12)", color: STATUS_COLORS.verified }}>
            do not share
          </span>{" "}
          your personal information with third-party advertisers without your consent. Information is only
          used to{" "}
          <span className="rounded px-1" style={{ backgroundColor: "rgba(22,163,74,0.12)", color: STATUS_COLORS.verified }}>
            provide and improve the service you requested
          </span>
          .
        </div>
        <div className="flex gap-2">
          <span style={{ backgroundColor: ACCENT, color: "#fff" }} className="rounded-[8px] px-3 py-1.5 text-[12px] font-medium">
            Accept suggestion
          </span>
          <span className="rounded-[8px] px-3 py-1.5 text-[12px] font-medium" style={{ border: "1px solid rgba(33,12,55,0.2)" }}>
            Edit manually
          </span>
        </div>
      </div>
    );
  }

  if (tool === "code") {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p style={bricolage} className="text-[13px] font-semibold sm:text-[15px]">Suggested fix — ContactForm.tsx</p>
          <span
            className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
          >
            Accessibility
          </span>
        </div>
        <div className="flex-1 overflow-hidden rounded-[10px] p-4 font-mono text-[11px] leading-6 sm:text-[12.5px]" style={{ backgroundColor: INK, color: "rgba(250,249,246,0.85)" }}>
          <p className="whitespace-pre-wrap break-words" style={{ color: "rgba(250,249,246,0.4)" }}>{"<form onSubmit={handleSubmit}>"}</p>
          <p className="whitespace-pre-wrap break-words rounded px-1" style={{ backgroundColor: "rgba(228,87,46,0.18)" }}>
            {"-  <input type=\"email\" placeholder=\"Email\" />"}
          </p>
          <p className="whitespace-pre-wrap break-words rounded px-1" style={{ backgroundColor: "rgba(22,163,74,0.18)" }}>
            {"+  <input type=\"email\" placeholder=\"Email\" aria-label=\"Email address\" required />"}
          </p>
          <p className="whitespace-pre-wrap break-words" style={{ color: "rgba(250,249,246,0.4)" }}>{"</form>"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p style={bricolage} className="text-[13px] font-semibold sm:text-[15px]">Monitoring — Weekly recheck</p>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
        >
          Next check in 3 days
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        {MOCKUP_RECHECKS.map((r) => (
          <div
            key={r.title}
            className="flex items-center gap-3 rounded-[10px] px-3 py-2.5"
            style={{ border: "1px solid rgba(33,12,55,0.08)" }}
          >
            <p className="w-[90px] shrink-0 text-[12px] font-medium sm:w-[150px] sm:text-[13px]">{r.title}</p>
            <p className="hidden shrink-0 text-[12px] opacity-70 sm:block sm:w-[100px]">{r.checked}</p>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{ backgroundColor: `${r.statusColor}1a`, color: r.statusColor }}
            >
              {r.status}
            </span>
            <p className="flex-1 text-right text-[12px] font-medium" style={{ color: r.statusColor }}>
              {r.trend}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SeverityTag({ severity }: { severity: keyof typeof SEVERITY_META }) {
  const meta = SEVERITY_META[severity];
  return (
    <span className="shrink-0 text-[10px] font-semibold tracking-wide" style={{ color: meta.color }}>
      {meta.label}
    </span>
  );
}

function ScoreNumeral({ score, color }: { score: number; color: string }) {
  return (
    <div className="flex shrink-0 flex-col items-end gap-1.5" role="img" aria-label={`Score ${score} out of 100`}>
      <p style={bricolage} className="text-[24px] font-semibold leading-none tabular-nums sm:text-[28px]" aria-hidden="true">
        {score}
      </p>
      <div className="h-[2px] w-10 overflow-hidden rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.08)" }} aria-hidden="true">
        <div className="h-full rounded-full" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function FindingIcon({ severity }: { severity: keyof typeof SEVERITY_META }) {
  const color = SEVERITY_META[severity].color;
  const common = {
    width: 14,
    height: 14,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  return (
    <span className="mt-[3px] flex h-3.5 w-3.5 shrink-0 items-center justify-center" style={{ color }}>
      {severity === "verified" ? (
        <svg {...common}>
          <path d="M5 12.5l4.5 4.5L19 7" />
        </svg>
      ) : severity === "warning" ? (
        <svg {...common}>
          <path d="M12 9v4.2" />
          <path d="M10.3 4.2 2.9 17a1.8 1.8 0 0 0 1.6 2.7h15a1.8 1.8 0 0 0 1.6-2.7L13.7 4.2a1.8 1.8 0 0 0-3.4 0Z" />
          <circle cx="12" cy="16.4" r="0.1" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v5.5" />
          <circle cx="12" cy="16.4" r="0.1" fill="currentColor" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </span>
  );
}

function MiniCheck({ color = STATUS_COLORS.verified }: { color?: string }) {
  return (
    <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center" style={{ color }}>
      <CheckIcon />
    </span>
  );
}

function AreaVisual({
  visual,
  applied,
}: {
  visual: NonNullable<(typeof REVIEW_AREAS)[number]["visual"]>;
  applied: boolean;
}) {
  const frameStyle = { border: "1px solid rgba(33,12,55,0.08)" };

  if (visual.kind === "contrast") {
    return (
      <div className="flex items-center gap-4 rounded-[12px] px-3 py-2.5" style={frameStyle}>
        {[visual.current, visual.suggested].map((swatch) => {
          const isSuggested = swatch === visual.suggested;
          return (
            <div
              key={swatch.label}
              className={`flex flex-1 items-center gap-2 rounded-[8px] px-1.5 py-1 transition-all duration-300 ${
                applied && !isSuggested ? "opacity-40" : ""
              }`}
              style={applied && isSuggested ? { boxShadow: `inset 0 0 0 1.5px ${STATUS_COLORS.verified}` } : undefined}
            >
              <span className="h-7 w-7 shrink-0 rounded-[6px]" style={{ backgroundColor: swatch.hex }} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] opacity-60">{swatch.label}</p>
                <p className="text-[12px] font-medium tabular-nums">{swatch.ratio}</p>
              </div>
              {applied && isSuggested ? <MiniCheck /> : null}
            </div>
          );
        })}
      </div>
    );
  }

  if (visual.kind === "diff") {
    return (
      <div className="flex flex-col gap-1.5 rounded-[12px] px-3 py-2.5 text-[12px] leading-snug" style={frameStyle}>
        <p
          className="overflow-hidden line-through opacity-40 transition-all duration-300"
          style={applied ? { maxHeight: 0, opacity: 0 } : { maxHeight: 40 }}
        >
          {visual.before}
        </p>
        <p className="flex items-center gap-1.5" style={{ color: STATUS_COLORS.verified }}>
          {visual.after}
          {applied ? <MiniCheck /> : null}
        </p>
      </div>
    );
  }

  if (visual.kind === "trackers") {
    return (
      <div className="flex flex-col gap-2 rounded-[12px] px-3 py-2.5" style={frameStyle}>
        {visual.items.map((item) => {
          const consented = item.consented || applied;
          return (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium">{item.name}</p>
                <p className="text-[11px] opacity-60">{item.category}</p>
              </div>
              <span
                className="shrink-0 text-[11px] font-semibold tracking-wide transition-colors duration-300"
                style={{ color: consented ? STATUS_COLORS.verified : STATUS_COLORS.deficit }}
              >
                {consented ? "Allowed" : "Blocked"}
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  if (visual.kind === "email") {
    return (
      <div className="flex flex-col gap-1 rounded-[12px] px-3 py-2.5 text-[12px]" style={frameStyle}>
        <p className="truncate">
          <span className="opacity-60">From: </span>
          {visual.from}
        </p>
        <p className="truncate font-medium">{visual.subject}</p>
        <p
          className="flex items-center gap-1.5 transition-colors duration-300"
          style={{ color: applied ? STATUS_COLORS.verified : undefined }}
        >
          <span className={applied ? "" : "opacity-60"}>{applied ? visual.footerFixed : visual.footer}</span>
          {applied ? <MiniCheck /> : null}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 rounded-[12px] px-3 py-2.5" style={frameStyle}>
      <p className="text-[13px] italic leading-snug">
        {visual.claim}
        <sup className="ml-0.5 not-italic" style={{ color: ACCENT }}>
          1
        </sup>
      </p>
      <p className="text-[11px] opacity-60">1. {visual.source}</p>
    </div>
  );
}

export function AreaDetailCard({ area }: { area: (typeof REVIEW_AREAS)[number] }) {
  const [applied, setApplied] = useState(false);

  return (
    <div
      className="flex h-full w-full max-w-[500px] flex-col gap-3 rounded-2xl bg-white p-4 shadow-[0_4px_12px_rgba(33,12,55,0.06),0_16px_32px_-8px_rgba(33,12,55,0.14)] sm:gap-4 sm:p-6"
      style={{ color: INK }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p style={bricolage} className="text-[16px] font-semibold leading-tight sm:text-[17px]">
            {area.title}
          </p>
          <p className="mt-0.5 text-[11px] opacity-60">{area.auditLabel}</p>
        </div>
        <ScoreNumeral score={area.score} color={area.statusColor} />
      </div>

      {area.visual ? <AreaVisual visual={area.visual} applied={applied} /> : null}

      <div className="flex flex-1 flex-col">
        {area.findings.map((finding, index) => (
          <div
            key={finding.title}
            className="flex items-start gap-2.5 py-2.5 sm:gap-3"
            style={index === 0 ? undefined : { borderTop: "1px solid rgba(33,12,55,0.08)" }}
          >
            <FindingIcon severity={finding.severity} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <p className="min-w-[120px] flex-1 text-[13px] font-medium leading-snug">{finding.title}</p>
                <SeverityTag severity={finding.severity} />
              </div>
              <p className="mt-0.5 text-[12px] leading-snug opacity-60">{finding.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {area.remediation ? (
        <div className="flex items-center justify-between gap-3 pt-3" style={{ borderTop: "1px solid rgba(33,12,55,0.08)" }}>
          <p className="min-w-0 flex-1 text-[12px] leading-snug opacity-70">
            <span
              className="font-semibold opacity-100 transition-colors duration-300"
              style={{ color: applied ? STATUS_COLORS.verified : ACCENT }}
            >
              {applied ? "Fix applied — " : "Suggested fix — "}
            </span>
            {area.remediation.label}
          </p>
          <button
            type="button"
            aria-pressed={applied}
            onClick={() => setApplied((prev) => !prev)}
            className="shrink-0 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
            style={{ backgroundColor: applied ? STATUS_COLORS.verified : ACCENT, color: "#fff" }}
          >
            {applied ? "Applied ✓" : `${area.remediation.cta} →`}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid rgba(33,12,55,0.08)" }}>
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center" style={{ color: STATUS_COLORS.verified }}>
            <CheckIcon />
          </span>
          <p className="text-[12px] font-medium" style={{ color: STATUS_COLORS.verified }}>
            No action needed — this area passed review.
          </p>
        </div>
      )}
    </div>
  );
}

export function AnalyzeWindowFrame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-[300px] w-full flex-col gap-2.5 overflow-hidden rounded-2xl p-3 sm:p-4"
      style={{ backgroundColor: "#faf9fb", border: "1px solid rgba(33,12,55,0.08)" }}
    >
      {children}
    </div>
  );
}

const RISK_PILL_STYLES: Record<string, { bg: string; fg: string; label: string }> = {
  [STATUS_COLORS.deficit]: { bg: "#fde9e7", fg: "#b42318", label: "Exposed" },
  [STATUS_COLORS.warning]: { bg: "#fef3e2", fg: "#b45309", label: "Needs review" },
  [STATUS_COLORS.verified]: { bg: "#e2f3e8", fg: "#17673a", label: "Verified" },
};

function AnalyzeScanStep() {
  const total = REVIEW_AREAS.length;
  const activeIndex = total - 2;
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(activeIndex);
      return;
    }
    const timers = Array.from({ length: activeIndex }, (_, i) =>
      window.setTimeout(() => setRevealed((r) => Math.max(r, i + 1)), (0.2 + i * 0.18) * 1000),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [activeIndex]);

  return (
    <AnalyzeWindowFrame>
      <div className="flex items-center justify-between">
        <p style={bricolage} className="text-[13px] font-semibold">Analysis of your website</p>
        <span className="text-[11px] opacity-60">{revealed} of {total} areas</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.08)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-300 ease-out"
          style={{ width: `${(revealed / total) * 100}%`, backgroundColor: ACCENT }}
        />
      </div>
      <div
        className="flex flex-1 flex-col justify-center rounded-[10px]"
        style={{ border: "1px solid rgba(33,12,55,0.06)" }}
      >
        {REVIEW_AREAS.map((area, i) => {
          const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
          return (
            <div
              key={area.title}
              className="flex items-center gap-2.5 px-2.5 py-1.5"
              style={i > 0 ? { borderTop: "1px solid rgba(33,12,55,0.06)" } : undefined}
            >
              {state === "done" ? (
                <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ border: "1.5px solid rgba(33,12,55,0.15)", backgroundColor: "#fff" }}
                  />
                  <span
                    className="demo-check absolute inset-0 flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "rgba(22,163,74,0.12)",
                      color: STATUS_COLORS.verified,
                      animationDelay: `${0.2 + i * 0.18}s`,
                    }}
                  >
                    <CheckIcon />
                  </span>
                </span>
              ) : state === "active" ? (
                <span
                  className="demo-active-row flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ border: `1.5px solid ${ACCENT}`, backgroundColor: "#fff" }}
                />
              ) : (
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                  style={{ border: "1.5px solid rgba(33,12,55,0.15)", backgroundColor: "#fff" }}
                />
              )}
              <p className="text-[12px] leading-tight" style={{ opacity: state === "pending" ? 0.4 : 0.8 }}>
                {area.title}
              </p>
            </div>
          );
        })}
      </div>
    </AnalyzeWindowFrame>
  );
}

export function AnalyzeMockup({ step }: { step: "website" | "scan" | "findings" }) {
  if (step === "website") {
    return (
      <AnalyzeWindowFrame>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <VerenaMarkIcon className="h-4 w-4" />
            <p style={bricolage} className="text-[13px] font-semibold">Verena</p>
          </div>
          <span className="text-[11px] opacity-60">Getting started</span>
        </div>
        <div className="demo-pop flex items-start gap-2.5" style={{ animationDelay: "0s" }}>
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(38,83,243,0.1)" }}
          >
            <VerenaMarkIcon className="h-3 w-3" />
          </div>
          <p className="text-[12.5px] leading-5 opacity-80">
            Next I'll run a full compliance analysis, starting with the website. What's the
            website you'd like me to start with?
          </p>
        </div>
        <div className="demo-pop flex w-full justify-end" style={{ animationDelay: "0.15s" }}>
          <span
            className="w-fit rounded-[14px] px-3.5 py-2 text-[12px] font-medium"
            style={{ backgroundColor: ACCENT, color: "#fff" }}
          >
            https://acme.com
          </span>
        </div>
        <div
          className="demo-pop mt-auto flex items-center gap-2 rounded-[10px] px-3 py-2.5"
          style={{
            border: "1px solid rgba(33,12,55,0.08)",
            backgroundColor: "rgba(33,12,55,0.02)",
            animationDelay: "0.3s",
          }}
        >
          <span
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px]"
            style={{ backgroundColor: ACCENT }}
          >
            <CheckIcon />
          </span>
          <p className="flex-1 text-[11px] opacity-60">You're authorized by its owner.</p>
          <span
            className="demo-authorize-pulse shrink-0 rounded-[8px] px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: ACCENT, color: "#fff" }}
          >
            Authorize
          </span>
        </div>
      </AnalyzeWindowFrame>
    );
  }

  if (step === "scan") {
    return <AnalyzeScanStep />;
  }

  const topRiskAreas = [...REVIEW_AREAS].sort((a, b) => a.score - b.score).slice(0, 2);
  const exposedCount = REVIEW_AREAS.filter((area) => area.statusColor === STATUS_COLORS.deficit).length;

  return (
    <AnalyzeWindowFrame>
      <div className="flex items-center justify-between">
        <p style={bricolage} className="text-[13px] font-semibold">High Level Compliance Report</p>
        <span className="text-[11px] opacity-60">Acme</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium opacity-80">
          {REVIEW_AREAS.length} of {REVIEW_AREAS.length} areas checked
        </p>
        <p className="text-[11px] opacity-60">
          {exposedCount} exposed
        </p>
      </div>
      <div className="flex gap-1.5">
        {REVIEW_AREAS.map((area, i) => (
          <span
            key={area.title}
            className="demo-bar h-1.5 flex-1 rounded-full"
            style={{
              backgroundColor: area.statusColor,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
      {topRiskAreas.map((area, i) => {
        const pill = RISK_PILL_STYLES[area.statusColor] ?? RISK_PILL_STYLES[STATUS_COLORS.verified];
        return (
          <div
            key={area.title}
            className="demo-pop flex items-center justify-between rounded-[10px] px-3 py-2"
            style={{ border: "1px solid rgba(33,12,55,0.08)", animationDelay: `${0.15 + i * 0.15}s` }}
          >
            <p className="text-[12px] font-medium">{area.title}</p>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: pill.bg, color: pill.fg }}
            >
              {pill.label}
            </span>
          </div>
        );
      })}
    </AnalyzeWindowFrame>
  );
}

const FLOW_INPUTS = ["Pages", "Forms", "Policies & notices", "Cookies & trackers", "Marketing claims"];

const FLOW_OUTPUTS = [
  "Plain-English findings",
  "Suggested next steps",
  "Developer-ready guidance",
  "Evidence for each finding",
  "Optional +Human review",
];

const FLOW_NODE_YS = [40, 140, 240, 340, 440];

const FLOW_EASE_OUT = "0.16 1 0.3 1";
const FLOW_DOT_DUR = 0.55;
const FLOW_DOT_STAGGER = 0.1;
// Each phase only begins once the previous one has actually finished, so the
// diagram reads as gather -> review -> deliver instead of three overlapping blurs.
const FLOW_INPUTS_DONE = (FLOW_INPUTS.length - 1) * FLOW_DOT_STAGGER + FLOW_DOT_DUR;
const FLOW_CENTER_BEGIN = FLOW_INPUTS_DONE + 0.1;
const FLOW_CENTER_DUR = 0.5;
const FLOW_PULSE_BEGIN = FLOW_CENTER_BEGIN + FLOW_CENTER_DUR;
const FLOW_PULSE_DUR = 0.4;
const FLOW_OUTPUT_START = FLOW_PULSE_BEGIN + 0.1;
const FLOW_CYCLE_PAUSE = 1;
const FLOW_CYCLE_DURATION =
  (FLOW_OUTPUT_START + (FLOW_OUTPUTS.length - 1) * FLOW_DOT_STAGGER + FLOW_DOT_DUR + FLOW_CYCLE_PAUSE) * 1000;
const FLOW_TOTAL_SEC = FLOW_CYCLE_DURATION / 1000;
const FLOW_MOTION_SPLINES = `0 0 1 1;${FLOW_EASE_OUT};0 0 1 1`;

// Builds a single repeatCount="indefinite" SMIL timeline that plays one short
// local animation (beginSec..beginSec+durSec) inside a longer, constantly
// repeating cycle (totalSec), so the motion loops forever without any JS
// timer or element remount restarting it.
function loopedTimeline(beginSec: number, durSec: number, totalSec: number, localKeyTimes: number[], localValues: string[]) {
  const eps = 0.0001;
  const scaledTimes = localKeyTimes.map((t) => (beginSec + t * durSec) / totalSec);
  const keyTimes = [0, ...scaledTimes, 1];
  for (let i = 1; i < keyTimes.length; i++) {
    if (keyTimes[i] <= keyTimes[i - 1]) keyTimes[i] = Math.min(1, keyTimes[i - 1] + eps);
  }
  keyTimes[keyTimes.length - 1] = 1;
  const values = [localValues[0], ...localValues, localValues[localValues.length - 1]];
  return {
    keyTimes: keyTimes.map((t) => t.toFixed(5)).join(";"),
    values: values.join(";"),
  };
}

export function ComplianceFlowDiagram({ active }: { active: boolean }) {
  const uid = useId();
  const boxGradId = `${uid}-box`;
  const sweepGradId = `${uid}-sweep`;
  const clipId = `${uid}-clip`;
  const glowId = `${uid}-glow`;
  const boxGlowId = `${uid}-boxglow`;
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animateEnabled = active && !prefersReducedMotion;

  return (
    <div aria-hidden="true" className="mx-auto hidden w-full max-w-[1100px] md:block">
      <svg viewBox="0 0 1200 480" className="h-auto w-full overflow-visible">
        <defs>
          <linearGradient id={boxGradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3f66ff" />
            <stop offset="100%" stopColor="#121a52" />
          </linearGradient>
          <linearGradient id={sweepGradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8aa0ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#8aa0ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8aa0ff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={clipId}>
            <rect x="545" y="110" width="255" height="260" rx="20" />
          </clipPath>
          <filter id={glowId} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id={boxGlowId} x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="8" in="SourceGraphic" result="blur">
              {animateEnabled && (
                <animate attributeName="stdDeviation" values="6;11;6" dur="3s" repeatCount="indefinite" />
              )}
            </feGaussianBlur>
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {FLOW_INPUTS.map((label, i) => {
          const y = FLOW_NODE_YS[i];
          const pathId = `${uid}-in-${i}`;
          const motion = loopedTimeline(i * FLOW_DOT_STAGGER, FLOW_DOT_DUR, FLOW_TOTAL_SEC, [0, 1], ["0", "1"]);
          const opacity = loopedTimeline(
            i * FLOW_DOT_STAGGER,
            FLOW_DOT_DUR,
            FLOW_TOTAL_SEC,
            [0, 0.15, 0.8, 1],
            ["0", "1", "1", "0"],
          );
          return (
            <g key={label}>
              <path
                id={pathId}
                d={`M 100 ${y} C 260 ${y} 260 240 400 240`}
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
              />
              {animateEnabled && (
                <circle className="flow-motion" r="4.5" fill="#8aa0ff" filter={`url(#${glowId})`}>
                  <animateMotion
                    dur={`${FLOW_TOTAL_SEC}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes={motion.keyTimes}
                    keyPoints={motion.values}
                    keySplines={FLOW_MOTION_SPLINES}
                  >
                    <mpath href={`#${pathId}`} xlinkHref={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    dur={`${FLOW_TOTAL_SEC}s`}
                    repeatCount="indefinite"
                    keyTimes={opacity.keyTimes}
                    values={opacity.values}
                  />
                </circle>
              )}
              <circle cx="100" cy={y} r="8" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
              <circle cx="100" cy={y} r="3" fill="rgba(255,255,255,0.7)" />
              <text
                x="80"
                y={y + 5}
                textAnchor="end"
                fill="rgba(255,255,255,0.75)"
                fontSize="18"
                fontWeight="500"
              >
                {label}
              </text>
            </g>
          );
        })}

        {FLOW_OUTPUTS.map((label, i) => {
          const y = FLOW_NODE_YS[i];
          const pathId = `${uid}-out-${i}`;
          const outBegin = FLOW_OUTPUT_START + i * FLOW_DOT_STAGGER;
          const motion = loopedTimeline(outBegin, FLOW_DOT_DUR, FLOW_TOTAL_SEC, [0, 1], ["0", "1"]);
          const opacity = loopedTimeline(outBegin, FLOW_DOT_DUR, FLOW_TOTAL_SEC, [0, 0.15, 0.8, 1], ["0", "1", "1", "0"]);
          return (
            <g key={label}>
              <path
                id={pathId}
                d={`M 800 240 C 940 240 940 ${y} 1100 ${y}`}
                fill="none"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="1.5"
              />
              {animateEnabled && (
                <circle
                  className="flow-motion"
                  r="5"
                  fill={ACCENT}
                  stroke="#ffffff"
                  strokeWidth="1"
                  filter={`url(#${glowId})`}
                >
                  <animateMotion
                    dur={`${FLOW_TOTAL_SEC}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes={motion.keyTimes}
                    keyPoints={motion.values}
                    keySplines={FLOW_MOTION_SPLINES}
                  >
                    <mpath href={`#${pathId}`} xlinkHref={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    dur={`${FLOW_TOTAL_SEC}s`}
                    repeatCount="indefinite"
                    keyTimes={opacity.keyTimes}
                    values={opacity.values}
                  />
                </circle>
              )}
              <rect
                x={1100 - 7}
                y={y - 7}
                width="14"
                height="14"
                fill={ACCENT}
                filter={`url(#${glowId})`}
                transform={`rotate(45 1100 ${y})`}
              />
              <rect x={1100 - 4.5} y={y - 4.5} width="9" height="9" fill="#fff" transform={`rotate(45 1100 ${y})`} />
              <text x="1120" y={y + 5} textAnchor="start" fill="rgba(255,255,255,0.85)" fontSize="18" fontWeight="500">
                {label}
              </text>
            </g>
          );
        })}

        <rect x="400" y="150" width="60" height="180" rx="30" fill={ACCENT} opacity="0.9" />
        <rect x="400" y="150" width="60" height="40" rx="20" fill="#ffffff" opacity="0.1" />
        <text
          x="430"
          y="352"
          textAnchor="middle"
          fill="#9db4ff"
          fontSize="13"
          fontWeight="700"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", textTransform: "uppercase", letterSpacing: "0.04em" }}
        >
          One review
        </text>

        <rect x="478" y="145" width="12" height="190" rx="5" fill="#5b7bff" opacity="0.45" />
        <rect x="498" y="135" width="12" height="210" rx="5" fill="#5b7bff" opacity="0.65" />
        <rect x="518" y="125" width="12" height="230" rx="5" fill="#5b7bff" opacity="0.85" />

        <g style={{ filter: `url(#${boxGlowId})` }}>
          <g clipPath={`url(#${clipId})`}>
            <rect x="545" y="110" width="255" height="260" fill={`url(#${boxGradId})`} />
            {animateEnabled && (
              <rect className="flow-motion" y="110" height="260" width="70" fill={`url(#${sweepGradId})`}>
                <animate
                  attributeName="x"
                  dur={`${FLOW_TOTAL_SEC}s`}
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines={FLOW_MOTION_SPLINES}
                  {...loopedTimeline(FLOW_CENTER_BEGIN, FLOW_CENTER_DUR, FLOW_TOTAL_SEC, [0, 1], ["490", "800"])}
                />
                <animate
                  attributeName="opacity"
                  dur={`${FLOW_TOTAL_SEC}s`}
                  repeatCount="indefinite"
                  {...loopedTimeline(
                    FLOW_CENTER_BEGIN,
                    FLOW_CENTER_DUR,
                    FLOW_TOTAL_SEC,
                    [0, 0.15, 0.75, 1],
                    ["0", "1", "1", "0"],
                  )}
                />
              </rect>
            )}
            {animateEnabled && (
              <rect className="flow-motion" x="545" y="110" width="255" height="260" fill="#ffffff" opacity="0">
                <animate
                  attributeName="opacity"
                  dur={`${FLOW_TOTAL_SEC}s`}
                  repeatCount="indefinite"
                  {...loopedTimeline(FLOW_PULSE_BEGIN, FLOW_PULSE_DUR, FLOW_TOTAL_SEC, [0, 0.5, 1], ["0", "0.32", "0"])}
                />
              </rect>
            )}
          </g>
          <rect x="545" y="110" width="255" height="260" rx="20" fill="none" stroke="rgba(255,255,255,0.18)" />
        </g>
        <circle cx="672" cy="221" r="17" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.3)" />
        <foreignObject x="661" y="210" width="22" height="22">
          <div
            style={{ width: "22px", height: "22px", overflow: "hidden", borderRadius: "9999px" }}
            aria-hidden="true"
          >
            <img
              src={verenaLogo}
              alt=""
              style={{ height: "102%", width: "474%", maxWidth: "none", marginLeft: "-23%", marginTop: "-2%" }}
            />
          </div>
        </foreignObject>
        <text
          x="672"
          y="271"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="21"
          fontWeight="600"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Six-area review
        </text>

        <text
          x="600"
          y="408"
          textAnchor="middle"
          fill="#9db4ff"
          fontSize="14"
          fontWeight="700"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em" }}
        >
          Verena review
        </text>
      </svg>
    </div>
  );
}

export function FlowArrow() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
      <path d="M8 0V16M8 16L2 10M8 16L14 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ComplianceFlowDiagramMobile() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-[360px] flex-col items-center gap-3 md:hidden">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FLOW_INPUTS.map((label) => (
          <span
            key={label}
            className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white/80"
            style={{ border: "1px solid rgba(255,255,255,0.18)" }}
          >
            {label}
          </span>
        ))}
      </div>
      <FlowArrow />
      <div
        className="flex flex-col items-center gap-1 rounded-2xl px-8 py-5 text-center"
        style={{ background: `linear-gradient(135deg, #3f66ff, #121a52)`, boxShadow: "0 0 32px rgba(38,83,243,0.45)" }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-[0.1em]"
          style={{ color: "#9db4ff", fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          One review
        </span>
        <span className="text-[17px] font-semibold text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Six-area review
        </span>
      </div>
      <FlowArrow />
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FLOW_OUTPUTS.map((label) => (
          <span
            key={label}
            className="rounded-full px-3 py-1.5 text-[12px] font-medium text-white"
            style={{ backgroundColor: "rgba(38,83,243,0.16)", border: "1px solid rgba(138,160,255,0.35)" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
