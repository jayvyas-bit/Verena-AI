import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateMockReport } from "../lib/mockScan";

const STAGES = [
  { label: "Pages read" },
  { label: "Forms and inputs" },
  { label: "Policies and notices" },
  { label: "Accessibility checks" },
];

export function ScanningPage() {
  const [params] = useSearchParams();
  const domain = params.get("domain") ?? "acme.example";
  const navigate = useNavigate();
  const [doneCount, setDoneCount] = useState(0);
  const report = useMemo(() => generateMockReport(domain), [domain]);

  useEffect(() => {
    if (doneCount >= STAGES.length) {
      const timeout = setTimeout(() => {
        navigate(`/report?domain=${encodeURIComponent(domain)}`);
      }, 500);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setDoneCount((count) => count + 1), 650);
    return () => clearTimeout(timeout);
  }, [doneCount, domain, navigate]);

  const counts = [
    report.stats.pagesRead,
    report.stats.formsChecked,
    report.stats.policiesChecked,
    report.stats.accessibilityIssues,
  ];

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-md">
        <p className="text-sm font-medium text-violet-300">Analyzing</p>
        <h1 className="mt-2 text-2xl font-semibold">{report.domain}</h1>
        <p className="mt-1 text-sm text-slate-400">
          Reading every page, form, and policy we can find.
        </p>

        <div className="mt-8 space-y-4">
          {STAGES.map((stage, index) => {
            const isDone = index < doneCount;
            const isActive = index === doneCount;
            return (
              <div
                key={stage.label}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "pulse-ring bg-violet-500 text-white"
                          : "bg-white/10 text-slate-400"
                    }`}
                  >
                    {isDone ? "✓" : index + 1}
                  </span>
                  <span className="text-sm text-slate-200">{stage.label}</span>
                </div>
                <span className="text-sm font-medium text-slate-400">
                  {isDone ? counts[index].toLocaleString() : isActive ? "…" : ""}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          {report.stats.totalChecks.toLocaleString()} checks run
        </p>
      </div>
    </div>
  );
}
