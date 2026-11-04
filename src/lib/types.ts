export type FindingSeverity = "high" | "medium" | "low";

export interface Finding {
  id: string;
  title: string;
  description: string;
  rule: string;
  foundOn: string;
  occurrences: number;
  pagesChecked: number;
  severity: FindingSeverity;
  fixSummary: string;
  diffBefore: string;
  diffAfter: string;
}

export type AreaStatus = "needs-attention" | "detected" | "needs-human" | "clear";

export interface ComplianceArea {
  id: string;
  label: string;
  status: AreaStatus;
  summary: string;
  findings: Finding[];
}

export interface ScanStats {
  pagesRead: number;
  formsChecked: number;
  policiesChecked: number;
  accessibilityIssues: number;
  totalChecks: number;
}

export interface ScanReport {
  domain: string;
  generatedAt: string;
  overallScore: number;
  stats: ScanStats;
  areas: ComplianceArea[];
}
