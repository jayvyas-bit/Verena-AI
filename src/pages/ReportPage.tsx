import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { StatusBadge } from "../components/Badge";
import { FindingCard } from "../components/FindingCard";
import { generateMockReport } from "../lib/mockScan";

export function ReportPage() {
  const [params] = useSearchParams();
  const domain = params.get("domain") ?? "acme.example";
  const report = useMemo(() => generateMockReport(domain), [domain]);
  const [activeAreaId, setActiveAreaId] = useState(report.areas[0]?.id);

  const activeArea =
    report.areas.find((area) => area.id === activeAreaId) ?? report.areas[0];

  const needsAttentionCount = report.areas.filter(
    (area) => area.status === "needs-attention",
  ).length;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wide text-violet-600">
            COMPLIANCE REPORT
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">{report.domain}</h1>
        </div>
        <Link
          to="/"
          className="w-fit rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-slate-300"
        >
          Analyze another site
        </Link>
      </div>

      {/* Score + stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium text-slate-400">Compliance score</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {report.overallScore}
            <span className="text-base font-normal text-slate-400">/100</span>
          </p>
          <p className="mt-1 text-xs text-amber-600">
            {needsAttentionCount} areas need attention
          </p>
        </div>
        <StatTile label="Pages read" value={report.stats.pagesRead} />
        <StatTile label="Forms and inputs" value={report.stats.formsChecked} />
        <StatTile label="Accessibility issues" value={report.stats.accessibilityIssues} />
      </div>

      {/* Monitoring strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-medium text-slate-700">Actively monitoring</p>
        </div>
        <p className="text-xs text-slate-500">Re-scan trigger: every deploy + weekly</p>
        <p className="text-xs text-slate-500">Last full analysis: 2 hours ago</p>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-slate-900">Verified coverage</h2>
        <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          {report.areas.map((area) => (
            <button
              key={area.id}
              onClick={() => setActiveAreaId(area.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                area.id === activeArea?.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {area.label}
            </button>
          ))}
        </div>

        {activeArea && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {activeArea.label}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{activeArea.summary}</p>
              </div>
              <StatusBadge status={activeArea.status} />
            </div>

            <div className="mt-5 space-y-4">
              {activeArea.findings.map((finding) => (
                <FindingCard key={finding.id} finding={finding} />
              ))}
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Illustrative example. A detected item does not establish legal compliance.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
