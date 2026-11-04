import { SeverityDot } from "./Badge";
import type { Finding } from "../lib/types";

export function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400">
            WHAT WE FOUND
          </p>
          <div className="mt-2 flex items-center gap-2">
            <SeverityDot severity={finding.severity} />
          </div>
          <h4 className="mt-2 text-base font-semibold text-slate-900">{finding.title}</h4>
          <p className="mt-1 text-sm text-slate-500">{finding.description}</p>
          <p className="mt-3 text-xs font-medium text-slate-400">{finding.rule}</p>
          <p className="mt-1 text-xs text-slate-400">
            Found on {finding.occurrences} of {finding.pagesChecked} pages checked ·{" "}
            <span className="text-slate-500">{finding.foundOn}</span>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400">
            YOUR NEXT STEP
          </p>
          <h4 className="mt-2 text-sm font-semibold text-slate-900">
            {finding.fixSummary}
          </h4>
          <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-relaxed">
            <code>
              <span className="block text-rose-400">- {finding.diffBefore}</span>
              {finding.diffAfter.split("\n").map((line, idx) => (
                <span key={idx} className="block text-emerald-400">
                  + {line}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
