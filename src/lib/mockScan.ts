import type { ComplianceArea, ScanReport } from "./types";

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function normalizeDomain(input: string): string {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return "example.com";
  return trimmed.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const AREA_TEMPLATES: Omit<ComplianceArea, "status" | "findings">[] = [
  {
    id: "accessibility",
    label: "Accessibility",
    summary: "Barriers in the way of visitors, checked against WCAG 2.1 AA.",
  },
  {
    id: "terms",
    label: "Terms of Service",
    summary: "Whether the published terms match current product behavior.",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    summary: "Data collection, retention, and third-party sharing disclosures.",
  },
  {
    id: "cookies",
    label: "Cookies & Trackers",
    summary: "Trackers firing before consent, and banner accuracy.",
  },
  {
    id: "email",
    label: "Commercial Email",
    summary: "Unsubscribe, sender identification, and CAN-SPAM basics.",
  },
  {
    id: "marketing",
    label: "Marketing Claims",
    summary: "Superlative and comparative claims that need supporting evidence.",
  },
];

const FINDING_LIBRARY: Record<
  string,
  Array<Omit<ComplianceArea["findings"][number], "id">>
> = {
  accessibility: [
    {
      title: "Button has no accessible name",
      description: 'Screen reader announces: "Button" with no further context.',
      rule: "WCAG 2.1 AA, 4.1.2",
      foundOn: "/products/checkout",
      occurrences: 12,
      pagesChecked: 20,
      severity: "high",
      fixSummary: "Give the button an accessible name.",
      diffBefore: '<button class="add-to-cart"></button>',
      diffAfter: '<button class="add-to-cart" aria-label="Add to cart"></button>',
    },
    {
      title: "Checkout form has no field labels",
      description: "Inputs rely on placeholder text only, which disappears on focus.",
      rule: "WCAG 2.1 AA, 1.3.1",
      foundOn: "/checkout",
      occurrences: 4,
      pagesChecked: 6,
      severity: "high",
      fixSummary: "Associate a visible label with each input.",
      diffBefore: '<input id="checkout-email" name="email" placeholder="Email">',
      diffAfter:
        '<label for="checkout-email">Email</label>\n<input id="checkout-email" name="email">',
    },
    {
      title: "Low contrast body text",
      description: "Body copy renders at 2.8:1 contrast against its background.",
      rule: "WCAG 2.1 AA, 1.4.3",
      foundOn: "/pricing",
      occurrences: 8,
      pagesChecked: 14,
      severity: "medium",
      fixSummary: "Darken body text to meet the 4.5:1 minimum ratio.",
      diffBefore: "color: #9CA3AF;",
      diffAfter: "color: #4B5563;",
    },
  ],
  terms: [
    {
      title: "Refund window undocumented",
      description:
        "Support emails reference a 14-day refund window not present in the terms.",
      rule: "Consistency check",
      foundOn: "/legal/terms",
      occurrences: 1,
      pagesChecked: 1,
      severity: "medium",
      fixSummary: "Add the refund window your support team already honors.",
      diffBefore: "Refunds are handled on a case-by-case basis.",
      diffAfter:
        "Refunds are available within 14 days of purchase, case-by-case after that.",
    },
    {
      title: "Governing law clause missing",
      description: "No jurisdiction is specified for dispute resolution.",
      rule: "Standard clause check",
      foundOn: "/legal/terms",
      occurrences: 1,
      pagesChecked: 1,
      severity: "low",
      fixSummary: "Add a governing law and venue clause.",
      diffBefore: "Disputes will be resolved through arbitration.",
      diffAfter:
        "Disputes will be resolved through arbitration in Delaware, under Delaware law.",
    },
  ],
  privacy: [
    {
      title: "Third-party processor not disclosed",
      description:
        "Analytics traffic goes to a processor not named in the privacy policy.",
      rule: "Disclosure check",
      foundOn: "/legal/privacy",
      occurrences: 1,
      pagesChecked: 1,
      severity: "high",
      fixSummary: "List every processor that receives visitor data.",
      diffBefore: "We may share data with service providers.",
      diffAfter:
        "We share data with: Segment (analytics), Stripe (payments), Intercom (support).",
    },
    {
      title: "No data retention period stated",
      description: "Policy does not say how long account data is kept after deletion.",
      rule: "Disclosure check",
      foundOn: "/legal/privacy",
      occurrences: 1,
      pagesChecked: 1,
      severity: "medium",
      fixSummary: "State a concrete retention and deletion timeline.",
      diffBefore: "We retain your data as needed.",
      diffAfter:
        "We retain account data for 30 days after deletion, then permanently erase it.",
    },
  ],
  cookies: [
    {
      title: "Marketing pixels fire before consent",
      description: "Ad trackers load on page view, ahead of the consent banner decision.",
      rule: "Consent timing check",
      foundOn: "/",
      occurrences: 3,
      pagesChecked: 42,
      severity: "high",
      fixSummary: "Gate marketing scripts behind explicit consent.",
      diffBefore: '<script src="ads-pixel.js"></script>',
      diffAfter: '<script src="ads-pixel.js" data-consent="marketing"></script>',
    },
    {
      title: "Cookie banner undercounts trackers",
      description: "Banner lists 4 cookie categories; scan found 7 distinct trackers.",
      rule: "Banner accuracy check",
      foundOn: "/",
      occurrences: 7,
      pagesChecked: 42,
      severity: "medium",
      fixSummary: "Update the banner to list every tracker category found.",
      diffBefore: "Categories: Essential, Analytics",
      diffAfter: "Categories: Essential, Analytics, Marketing, Personalization",
    },
  ],
  email: [
    {
      title: "Unsubscribe link missing from receipts",
      description: "Transactional receipts include a promo footer with no opt-out.",
      rule: "CAN-SPAM basics",
      foundOn: "Order receipt template",
      occurrences: 1,
      pagesChecked: 1,
      severity: "medium",
      fixSummary: "Add an unsubscribe link to any promotional footer.",
      diffBefore: "Thanks for your order! Check out our new arrivals.",
      diffAfter:
        "Thanks for your order! Check out our new arrivals. [Unsubscribe from promos]",
    },
  ],
  marketing: [
    {
      title: "Unsupported superlative claim",
      description: '"#1 rated by customers" has no cited source.',
      rule: "Evidence check",
      foundOn: "/",
      occurrences: 1,
      pagesChecked: 1,
      severity: "high",
      fixSummary: "Cite the source or soften the claim.",
      diffBefore: "#1 rated by customers.",
      diffAfter: "Rated 4.8/5 by 2,300+ customers on G2 (as of Oct 2026).",
    },
  ],
};

const STATUS_BY_AREA: Record<string, ComplianceArea["status"]> = {
  accessibility: "needs-attention",
  terms: "needs-attention",
  privacy: "needs-attention",
  cookies: "needs-attention",
  email: "detected",
  marketing: "needs-human",
};

export function generateMockReport(rawDomain: string): ScanReport {
  const domain = normalizeDomain(rawDomain);
  const seed = hashString(domain);

  const areas: ComplianceArea[] = AREA_TEMPLATES.map((template, index) => {
    const pool = FINDING_LIBRARY[template.id] ?? [];
    const count = pool.length === 0 ? 0 : 1 + ((seed + index) % pool.length);
    const findings = pool.slice(0, Math.max(count, 1)).map((finding, findingIndex) => ({
      ...finding,
      id: `${template.id}-${findingIndex}`,
    }));

    return {
      ...template,
      status: STATUS_BY_AREA[template.id] ?? "clear",
      findings,
    };
  });

  const accessibilityIssues = 400 + (seed % 400);
  const pagesRead = 900 + (seed % 900);

  return {
    domain,
    generatedAt: new Date().toISOString(),
    overallScore: 48 + (seed % 35),
    stats: {
      pagesRead,
      formsChecked: 12 + (seed % 40),
      policiesChecked: 4,
      accessibilityIssues,
      totalChecks: pagesRead + accessibilityIssues + 36,
    },
    areas,
  };
}
