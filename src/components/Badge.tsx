import type { AreaStatus, FindingSeverity } from "../lib/types";

const STATUS_STYLES: Record<AreaStatus, string> = {
  "needs-attention": "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  detected: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  "needs-human": "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
  clear: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
};

const STATUS_LABEL: Record<AreaStatus, string> = {
  "needs-attention": "Needs attention",
  detected: "Detected",
  "needs-human": "Needs a human review",
  clear: "Clear",
};

export function StatusBadge({ status }: { status: AreaStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

const SEVERITY_STYLES: Record<FindingSeverity, string> = {
  high: "bg-rose-500",
  medium: "bg-amber-500",
  low: "bg-slate-400",
};

const SEVERITY_LABEL: Record<FindingSeverity, string> = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export function SeverityDot({ severity }: { severity: FindingSeverity }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
      <span className={`h-1.5 w-1.5 rounded-full ${SEVERITY_STYLES[severity]}`} />
      {SEVERITY_LABEL[severity]}
    </span>
  );
}
