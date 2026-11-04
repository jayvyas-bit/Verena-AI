import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "../components/Badge";
import type { AreaStatus } from "../lib/types";

const STEPS = [
  {
    tag: "1 — ANALYZE",
    title: "Your whole site, read line by line.",
    body: "ScanPilot reads every page, form, and policy, then flags the issues that put you at risk.",
  },
  {
    tag: "2 — IMPROVE",
    title: "Every finding comes with a next step.",
    body: "Each issue ships with a drafted fix — developer-ready code or redlined policy language.",
  },
  {
    tag: "3 — MONITOR",
    title: "ScanPilot keeps watching after day one.",
    body: "Sites change constantly. We re-scan on every deploy so a fixed issue doesn't quietly return.",
  },
];

const PREVIEW_AREAS: Array<{ label: string; status: AreaStatus }> = [
  { label: "Accessibility", status: "needs-attention" },
  { label: "Terms of Service", status: "needs-attention" },
  { label: "Privacy Policy", status: "needs-attention" },
  { label: "Cookies & Trackers", status: "needs-attention" },
  { label: "Commercial Email", status: "detected" },
  { label: "Marketing Claims", status: "needs-human" },
];

const PLANS = [
  { name: "Free", price: "$0", credits: "300 credits", note: "No credit card required" },
  {
    name: "Starter",
    price: "$79",
    credits: "4,000 credits / mo",
    note: "Great for one site",
  },
  {
    name: "Team",
    price: "$249",
    credits: "20,000 credits / mo",
    note: "Multiple domains",
  },
];

const FAQ = [
  {
    q: "Is this a real legal opinion?",
    a: "No — ScanPilot is a prototype. Findings are illustrative and meant to show the product shape, not legal advice.",
  },
  {
    q: "What does a credit pay for?",
    a: "Each page crawled, form inspected, or policy diffed costs a small number of credits.",
  },
  {
    q: "Can I bring my own domain?",
    a: "Yes — type any domain on this page to generate a sample report for it.",
  },
];

export function LandingPage() {
  const [domain, setDomain] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const value = domain.trim() || "acme.example";
    navigate(`/scan?domain=${encodeURIComponent(value)}`);
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(124,58,237,0.35),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <p className="text-sm font-medium text-violet-300">Hi, I'm ScanPilot.</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Compliance is confident.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-300">
            Your website has compliance gaps. ScanPilot finds them, drafts the fix, and
            keeps watching after you ship.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              type="text"
              placeholder="Your website address"
              className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder-slate-400 outline-none ring-violet-400 focus:ring-2"
            />
            <button
              type="submit"
              className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:bg-violet-500"
            >
              Analyze your website
            </button>
          </form>
          <p className="mt-3 text-xs text-slate-400">Free to start. No credit card.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-semibold tracking-wide text-violet-600">
          HOW IT WORKS
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900">
          Analyze your website. Improve deficiencies. Monitor changes.
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <p className="text-xs font-semibold tracking-wide text-violet-600">
                {step.tag}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Report CTA + preview */}
      <section className="bg-violet-50/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Your compliance report in minutes
              </h2>
              <p className="mt-3 text-slate-500">
                Checked against thousands of rules, with no obligation.
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  type="text"
                  placeholder="Your website address"
                  className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm outline-none ring-violet-400 focus:ring-2"
                />
                <button
                  type="submit"
                  className="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                >
                  Analyze →
                </button>
              </form>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-wide text-slate-400">
                SAMPLE · ACME INC.
              </p>
              <ul className="mt-4 divide-y divide-slate-100">
                {PREVIEW_AREAS.map((area) => (
                  <li key={area.label} className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-slate-700">
                      {area.label}
                    </span>
                    <StatusBadge status={area.status} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          The right plan for every stage.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <h3 className="text-sm font-semibold text-slate-500">{plan.name}</h3>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{plan.price}</p>
              <p className="mt-1 text-sm text-slate-500">{plan.credits}</p>
              <button className="mt-6 w-full rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
                Choose {plan.name}
              </button>
              <p className="mt-3 text-xs text-slate-400">{plan.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Your questions, answered.
        </h2>
        <div className="mt-8 divide-y divide-slate-200 border-t border-b border-slate-200">
          {FAQ.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-slate-800"
                >
                  {item.q}
                  <span className="text-slate-400">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && <p className="pb-4 text-sm text-slate-500">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
