import { Fragment, useState } from "react";

const INK = "#210c37";
const ACCENT = "#2653F3";
const bricolage = { fontFamily: "'Bricolage Grotesque', sans-serif" } as const;

function CheckIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

const PRICING_PLANS = [
  { name: "Free", price: 0, period: "", credits: "500 credits", description: "No credit card required. Enough to see what Verena finds.", cta: "Start free", featured: false, addOnPrice: 49 },
  { name: "Starter", price: 99, period: "/month", credits: "5,000 credits / month", description: "For a single website under ongoing review.", cta: "Choose Starter", featured: false, addOnPrice: 99 },
  { name: "Professional", price: 299, period: "/month", credits: "25,000 credits / month", description: "For teams reviewing multiple websites regularly.", cta: "Choose Professional", featured: true, addOnPrice: 149 },
  { name: "Enterprise", price: 999, period: "/month", credits: "125,000 credits / month", description: "For organizations running compliance at scale.", cta: "Talk to sales", featured: false, addOnPrice: 249 },
];
const SELF_SERVE_PLANS = PRICING_PLANS.slice(0, 3);
const ENTERPRISE_PLAN = PRICING_PLANS[3];
const PRICING_FEATURE_ROWS: { label: string; values: [string | true, string | true, string | true] }[] = [
  { label: "Websites", values: ["1", "1", "Up to 10"] },
  { label: "Credits / month", values: ["500", "5,000", "25,000"] },
  { label: "Re-scan cadence", values: ["Manual", "Weekly", "Daily"] },
  { label: "All six review areas", values: [true, true, true] },
  { label: "Evidence for every finding", values: [true, true, true] },
  { label: "Support", values: ["Community", "Email", "Priority"] },
];

export default function PricingGridCheck() {
  const [humanAddOns, setHumanAddOns] = useState<Record<string, boolean>>({});
  const [toggleTouched, setToggleTouched] = useState<Record<string, boolean>>({});
  function toggleHumanAddOn(name: string) {
    setToggleTouched((prev) => ({ ...prev, [name]: true }));
    setHumanAddOns((prev) => ({ ...prev, [name]: !prev[name] }));
  }
  const pricingVisible = true;

  return (
    <div style={{ color: INK }} className="flex w-full flex-col items-center gap-6 bg-[#faf9f6] p-10">
      <div
        className="relative hidden w-full max-w-[1200px] overflow-hidden rounded-[20px] border border-[rgba(33,12,55,0.12)] bg-white lg:grid"
        style={{ gridTemplateColumns: "220px repeat(3, 1fr)" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-0"
          style={{ gridColumn: "4 / 5", gridRow: "1 / -1", backgroundColor: "rgba(38,83,243,0.035)" }}
        />

        <div className="z-10" />
        {SELF_SERVE_PLANS.map((plan, planIndex) => {
          const hasAddOn = Boolean(humanAddOns[plan.name]);
          const touched = Boolean(toggleTouched[plan.name]);
          const totalPrice = plan.price + (hasAddOn ? plan.addOnPrice : 0);
          return (
            <div
              key={`${plan.name}-header`}
              style={plan.featured ? { backgroundColor: INK, transitionDelay: `${planIndex * 80}ms` } : { transitionDelay: `${planIndex * 80}ms` }}
              className={`area-reveal z-10 flex flex-col gap-3 p-6 ${plan.featured ? "text-white" : ""} ${pricingVisible ? "is-shown" : ""}`}
            >
              {plan.featured ? (
                <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                  Recommended
                </span>
              ) : (
                <span className="h-[22px]" aria-hidden="true" />
              )}
              <div className="flex flex-col gap-1">
                <h3 style={bricolage} className="text-[20px] font-semibold tracking-[-0.01em]">
                  {plan.name}
                </h3>
                <p className={`text-[13px] leading-5 ${plan.featured ? "opacity-70" : "opacity-60"}`}>{plan.description}</p>
              </div>
              <div className="flex items-end gap-1" aria-live="polite">
                <span style={bricolage} className="text-[30px] font-semibold leading-none">
                  ${totalPrice}
                </span>
                {plan.period && (
                  <span className={`pb-0.5 text-[14px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>{plan.period}</span>
                )}
              </div>
              <p className={`text-[12px] font-medium ${plan.featured ? "opacity-80" : "opacity-70"}`}>{plan.credits}</p>

              <button
                type="button"
                role="switch"
                aria-checked={hasAddOn}
                aria-label={`Add +Human review to ${plan.name}`}
                onClick={() => toggleHumanAddOn(plan.name)}
                className={`mt-1 flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left transition duration-200 ease-out active:scale-[0.98] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  plan.featured
                    ? "bg-white/10 hover:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                    : "bg-[rgba(33,12,55,0.04)] hover:bg-[rgba(33,12,55,0.07)] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                }`}
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-medium">+Human review</span>
                  <span className={`text-[10px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>+${plan.addOnPrice}/mo · attorney-supervised</span>
                </span>
                <span
                  className={`t-toggle relative h-6 w-10 shrink-0 rounded-full ${touched ? "is-init" : ""}`}
                  data-on={hasAddOn}
                  style={{ backgroundColor: hasAddOn ? ACCENT : plan.featured ? "rgba(244,235,255,0.25)" : "rgba(33,12,55,0.15)" }}
                >
                  <span className="t-toggle-thumb absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                </span>
              </button>

              <button
                type="button"
                style={plan.featured ? { backgroundColor: ACCENT, color: "#fff" } : undefined}
                className={`rounded-full px-5 py-3 text-[14px] font-medium transition duration-200 ease-out active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  plan.featured
                    ? "hover:-translate-y-px hover:brightness-110 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                    : "border border-[rgba(33,12,55,0.55)] hover:-translate-y-px hover:border-[rgba(33,12,55,0.75)] hover:bg-[rgba(33,12,55,0.04)] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                }`}
              >
                {hasAddOn ? `${plan.cta} with +Human` : plan.cta}
              </button>
            </div>
          );
        })}

        {PRICING_FEATURE_ROWS.map((row) => (
          <Fragment key={row.label}>
            <div className="z-10 flex items-center border-t border-[rgba(33,12,55,0.08)] px-6 py-3.5 text-[13px] font-medium opacity-70">
              {row.label}
            </div>
            {row.values.map((value, colIndex) => (
              <div key={`${row.label}-${colIndex}`} className="z-10 flex items-center justify-center border-t border-[rgba(33,12,55,0.08)] px-4 py-3.5 text-[13px]">
                {value === true ? <CheckIcon /> : <span className="opacity-80">{value}</span>}
              </div>
            ))}
          </Fragment>
        ))}
      </div>

      <div className="flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 rounded-[16px] border border-[rgba(33,12,55,0.12)] bg-[rgba(33,12,55,0.03)] p-6 sm:flex-row">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p style={bricolage} className="text-[16px] font-semibold">
            {ENTERPRISE_PLAN.name}
          </p>
          <p className="text-[13px] opacity-70">{ENTERPRISE_PLAN.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] opacity-60">
            From ${ENTERPRISE_PLAN.price}{ENTERPRISE_PLAN.period}
          </span>
          <button
            type="button"
            className="rounded-full border border-[rgba(33,12,55,0.55)] px-5 py-2.5 text-[14px] font-medium transition duration-200 ease-out hover:-translate-y-px hover:border-[rgba(33,12,55,0.75)] hover:bg-white active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {ENTERPRISE_PLAN.cta}
          </button>
        </div>
      </div>
    </div>
  );
}
