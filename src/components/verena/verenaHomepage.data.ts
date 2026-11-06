import companyAirbnb from "../../assets/homepage/company-airbnb.svg";
import companyBookingCom from "../../assets/homepage/company-booking-com.svg";
import companyFivetran from "../../assets/homepage/company-fivetran.svg";
import companyOutreach from "../../assets/homepage/company-outreach.svg";
import companyPayPal from "../../assets/homepage/company-paypal.svg";
import companyPostman from "../../assets/homepage/company-postman.svg";
import companySpotify from "../../assets/homepage/company-spotify.svg";
import companyLogoA from "../../assets/homepage/company-logo-a.svg";
import companyLogoB from "../../assets/homepage/company-logo-b.svg";
import companyLogoC from "../../assets/homepage/company-logo-c.svg";
import companyLogoD from "../../assets/homepage/company-logo-d.svg";

export const INK = "#210c37";
export const ACCENT = "#2653F3";
export const CREAM = "#faf9f6";

export const STATUS_COLORS = {
  deficit: "#c2410c",
  warning: "#b45309",
  verified: "#15803d",
} as const;

export type NavIconName = "overview" | "human" | "pricing" | "trust" | "guides" | "help";

export const NAV_DROPDOWNS = {
  Product: [
    { label: "Overview", body: "What Verena checks and why it matters", icon: "overview" as const },
    { label: "+Human", body: "Optional attorney-supervised review for your findings", icon: "human" as const },
  ],
  Resources: [
    { label: "Trust Center", body: "How Verena handles your website's data", icon: "trust" as const },
    { label: "Compliance Guides", body: "Walkthroughs for common fixes", icon: "guides" as const },
    { label: "Help Center", body: "Answers to setup and billing questions", icon: "help" as const },
  ],
} satisfies Record<string, Array<{ label: string; body: string; icon: NavIconName }>>;

export type NavDropdownKey = keyof typeof NAV_DROPDOWNS;

export const NAV_FEATURED = {
  Product: {
    eyebrow: "Get started",
    title: "500 free credits",
    body: "Run a full six-area review of your website before choosing a plan.",
    cta: "See plans",
  },
  Resources: {
    eyebrow: "Featured guide",
    title: "WCAG 2.1 AA Checklist",
    body: "A practical checklist for auditing accessibility yourself.",
    cta: "Get the checklist",
  },
} satisfies Record<NavDropdownKey, { eyebrow: string; title: string; body: string; cta: string }>;

export const COMPANY_LOGOS: Array<{ src: string; alt: string; width: number }> = [
  { src: companyAirbnb, alt: "Airbnb", width: 107 },
  { src: companyLogoA, alt: "Adobe", width: 111 },
  { src: companyLogoB, alt: "Airtasker", width: 120 },
  { src: companyLogoC, alt: "Amplitude", width: 162 },
  { src: companyLogoD, alt: "Atlassian", width: 148 },
  { src: companyFivetran, alt: "Fivetran", width: 135 },
  { src: companyPayPal, alt: "PayPal", width: 119 },
  { src: companyBookingCom, alt: "Booking.com", width: 138 },
  { src: companyPostman, alt: "Postman", width: 127 },
  { src: companySpotify, alt: "Spotify", width: 117 },
  { src: companyOutreach, alt: "Outreach", width: 141 },
];

export const MARQUEE_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

export const LOGO_EDGE_FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

export const PLACEHOLDER_EXAMPLES = [
  "Which website should Verena review?",
  "yourcompany.com",
  "acmehealth.com/pricing",
  "mystartup.io",
];

export function isLikelyWebsite(value: string): boolean {
  const candidate = value.trim().replace(/^https?:\/\//i, "");
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:\/\S*)?$/i.test(
    candidate,
  );
}

export const ANALYZE_LOOP_MS = 7000;

export const ANALYZE_CARDS = [
  {
    title: "Add your website",
    body: "Enter your domain and connect the pages you want Verena to review.",
    icon: "website" as const,
  },
  {
    title: "Run an analysis",
    body: "Verena scans your website across all six areas and gathers supporting evidence.",
    icon: "scan" as const,
  },
  {
    title: "Explore your findings",
    body: "Review each issue at your own pace, with evidence and next steps included.",
    icon: "findings" as const,
  },
];

export const TOOL_TABS = [
  { id: "reports", icon: "file" as const, label: "Reports & Evidence", shortLabel: "Reports" },
  { id: "drafts", icon: "edit" as const, label: "AI-Drafted Document Changes", shortLabel: "Drafts" },
  { id: "code", icon: "code" as const, label: "Developer-Ready Code Suggestions", shortLabel: "Code fixes" },
  { id: "monitor", icon: "refresh" as const, label: "Monitoring & Rechecks", shortLabel: "Monitoring" },
];

export const TOOL_TAB_AUTOPLAY_MS = 6000;

export const TOOL_CAPTIONS: Record<(typeof TOOL_TABS)[number]["id"], string> = {
  reports: "Explore potential issues, supporting evidence, and explanations in one clear report",
  drafts: "Review AI-drafted language for each finding, then accept it or edit it before anything goes live",
  code: "Get developer-ready code suggestions your team can hand straight to a pull request",
  monitor: "Keep track of fixes over time with scheduled rechecks and alerts when something changes",
};

// Keeps the badge color honest relative to the number next to it, instead of
// letting each area hand-pick a color that can disagree with its own score.
function statusColorForScore(score: number): string {
  if (score >= 85) return STATUS_COLORS.verified;
  if (score >= 70) return STATUS_COLORS.warning;
  return STATUS_COLORS.deficit;
}

export const REVIEW_AREAS = [
  {
    title: "Accessibility",
    body: "Spot potential barriers that make your website harder for people to use.",
    status: "3 issues found",
    statusColor: statusColorForScore(88),
    icon: "accessibility" as const,
    auditLabel: "WCAG 2.2 AA Audit",
    score: 88,
    findings: [
      {
        severity: "deficit" as const,
        title: "Color contrast ratio below 4.5:1 on primary CTA button",
        detail: "Current ratio 3.1:1, falls below the WCAG AA minimum threshold.",
      },
      {
        severity: "warning" as const,
        title: "Missing alt text on 4 product images in the hero section",
        detail: "Screen readers cannot describe these visual key assets.",
      },
      {
        severity: "verified" as const,
        title: "ARIA labels correctly structured across all navigation modals",
        detail: "Keyboard and screen-reader navigation both pass review.",
      },
    ],
    remediation: { label: "color #0056b3 — 4.8:1 ratio, compliant", cta: "Apply" },
    visual: {
      kind: "contrast" as const,
      current: { hex: "#4a9eff", ratio: "3.1:1", label: "Current" },
      suggested: { hex: "#0056b3", ratio: "4.8:1", label: "Suggested" },
    },
  },
  {
    title: "Privacy Policy",
    body: "Check whether your policy clearly explains how personal information is collected and used.",
    status: "Needs review",
    statusColor: statusColorForScore(74),
    icon: "privacy" as const,
    auditLabel: "GDPR / CCPA Review",
    score: 74,
    findings: [
      {
        severity: "warning" as const,
        title: "No disclosure of third-party data sharing with ad partners",
        detail: "Required under CCPA §1798.100 for opt-out disclosures.",
      },
      {
        severity: "warning" as const,
        title: "No retention period stated for collected data",
        detail: "Visitors can't tell how long their data is kept.",
      },
      {
        severity: "verified" as const,
        title: "Data subject access request (DSAR) process is clearly documented",
        detail: "Users can find how to request or delete their data.",
      },
    ],
    remediation: { label: "Add a \"Data Sharing\" section naming each processor", cta: "Draft clause" },
    visual: {
      kind: "diff" as const,
      before: "Third-party data sharing is not addressed.",
      after: "We share data with named processors: Google Analytics, Meta Ads, Stripe.",
    },
  },
  {
    title: "Cookies & Trackers",
    body: "See which tracking tools may be running and where consent needs attention.",
    status: "2 trackers flagged",
    statusColor: statusColorForScore(61),
    icon: "cookies" as const,
    auditLabel: "Cookie Consent Scan",
    score: 61,
    findings: [
      {
        severity: "deficit" as const,
        title: "Analytics cookies load before consent is given",
        detail: "Google Analytics fires on page load, ahead of the consent banner.",
      },
      {
        severity: "deficit" as const,
        title: "Marketing pixel detected with no entry in the cookie policy",
        detail: "Meta Pixel collects data undisclosed to visitors.",
      },
      {
        severity: "verified" as const,
        title: "Essential session cookies are properly categorized",
        detail: "Strictly-necessary cookies are correctly exempt from consent.",
      },
    ],
    remediation: { label: "Gate analytics scripts behind a consent-granted event", cta: "Apply" },
    visual: {
      kind: "trackers" as const,
      items: [
        { name: "Google Analytics", category: "Analytics", consented: false },
        { name: "Meta Pixel", category: "Marketing", consented: false },
        { name: "Session Cookie", category: "Essential", consented: true },
      ],
    },
  },
  {
    title: "Terms of Service",
    body: "Find potential gaps or unclear wording in your website's terms.",
    status: "No issues found",
    statusColor: statusColorForScore(96),
    icon: "document" as const,
    auditLabel: "Terms Coverage Check",
    score: 96,
    findings: [
      {
        severity: "verified" as const,
        title: "Limitation of liability clause present and enforceable",
        detail: "Standard carve-outs are clearly and properly scoped.",
      },
      {
        severity: "verified" as const,
        title: "Governing law and dispute resolution clearly stated",
        detail: "Jurisdiction and arbitration terms are unambiguous.",
      },
      {
        severity: "verified" as const,
        title: "User termination rights clearly defined",
        detail: "Cancellation and account-closure terms are easy to find.",
      },
    ],
    remediation: null,
    visual: null,
  },
  {
    title: "Commercial Email",
    body: "Review supported email-related requirements, including relevant disclosures and consent practices.",
    status: "1 issue found",
    statusColor: statusColorForScore(82),
    icon: "email" as const,
    auditLabel: "CAN-SPAM Review",
    score: 82,
    findings: [
      {
        severity: "warning" as const,
        title: "Unsubscribe link requires login to process",
        detail: "CAN-SPAM requires a working opt-out within 10 business days.",
      },
      {
        severity: "verified" as const,
        title: "Physical mailing address included in email footer",
        detail: "Every campaign lists a valid postal address.",
      },
      {
        severity: "verified" as const,
        title: "Sender name matches the registered business entity",
        detail: "From-name and domain are consistent across campaigns.",
      },
    ],
    remediation: { label: "Add a no-login unsubscribe link to every campaign", cta: "Apply" },
    visual: {
      kind: "email" as const,
      from: "Acme Inc. <no-reply@acmeinc.com>",
      subject: "Your October product update",
      footer: "Unsubscribe (login required)",
    },
  },
  {
    title: "Marketing Claims",
    body: "Spot promotional claims that may need stronger evidence or clearer wording.",
    status: "No issues found",
    statusColor: statusColorForScore(94),
    icon: "megaphone" as const,
    auditLabel: "FTC Claims Review",
    score: 94,
    findings: [
      {
        severity: "verified" as const,
        title: "\"#1 rated\" claim is backed by a cited third-party source",
        detail: "Substantiation is linked directly from the claim.",
      },
      {
        severity: "verified" as const,
        title: "Testimonials disclose any material connection",
        detail: "Paid or affiliated reviewers are clearly labeled.",
      },
      {
        severity: "verified" as const,
        title: "Pricing claims match current published rates",
        detail: "No stale discounts or expired promotions found.",
      },
    ],
    remediation: null,
    visual: {
      kind: "citation" as const,
      claim: "“#1 rated project management tool”",
      source: "G2 Reviews, Q3 2025",
    },
  },
];

export const AVATAR_ORBIT_DURATION = 34;
export const AVATAR_ORBIT_COUNT = 6;
export const AVATAR_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
];
export const AVATAR_ORBITS = Array.from({ length: AVATAR_ORBIT_COUNT }, (_, i) => {
  const fraction = i / AVATAR_ORBIT_COUNT;
  const stackAngle = fraction * Math.PI * 2;
  return {
    delay: -(fraction * AVATAR_ORBIT_DURATION),
    angleDeg: fraction * 360 - 90,
    stackX: Math.cos(stackAngle) * 10,
    stackY: Math.sin(stackAngle) * 6,
    stackRotate: (i - (AVATAR_ORBIT_COUNT - 1) / 2) * 5,
  };
});

export const PRICING_PLANS = [
  {
    name: "Free",
    price: 0,
    period: "",
    credits: "500 credits",
    description: "No credit card required. Enough to see what Verena finds.",
    cta: "Start free",
    featured: false,
    addOnPrice: 49,
    features: ["All six review areas", "1 website", "Evidence for every finding"],
  },
  {
    name: "Solo",
    price: 99,
    period: "/month",
    credits: "5,000 credits / month",
    description: "For a single website under ongoing review.",
    cta: "Choose Solo",
    featured: false,
    addOnPrice: 99,
    features: ["Everything in Free", "1 website", "Weekly re-scans", "Email support"],
  },
  {
    name: "Team",
    price: 299,
    period: "/month",
    credits: "25,000 credits / month",
    description: "For teams reviewing multiple websites regularly.",
    cta: "Choose Team",
    featured: true,
    addOnPrice: 149,
    features: ["Everything in Solo", "Up to 10 websites", "Daily re-scans", "Priority support"],
  },
  {
    name: "Enterprise",
    price: 999,
    period: "/month",
    credits: "125,000 credits / month",
    description: "For organizations running compliance at scale.",
    cta: "Talk to sales",
    featured: false,
    addOnPrice: 249,
    features: ["Everything in Team", "Unlimited websites", "Custom review areas", "Dedicated account manager"],
  },
];

export const SELF_SERVE_PLANS = PRICING_PLANS.slice(0, 3);
export const ENTERPRISE_PLAN = PRICING_PLANS[3];

export function toFaqId(value: string) {
  return `faq-${value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "")}`;
}

const FAQ_ITEMS_RAW = [
  {
    category: "Plans and credits",
    q: "Can I start for free?",
    a: "Yes! Every account gets 500 credits. That is enough to run your first analysis and get your Compliance Report.",
  },
  {
    category: "Plans and credits",
    q: "How does pricing work, and what is a credit?",
    a: "Credits measure the work I do for you. Reading a site, producing a report and drafting a document each consume credits, and every plan comes with a monthly allowance. Plans come in two types: Standard, where you supervise my output, and +Human, where a +Human Supervisor from Invictus Counsel supervises it with you. The current plans and allowances are in the pricing section on the homepage.",
  },
  {
    category: "Getting started",
    q: "What do you actually check?",
    a: "I analyze the public pages of your website and check key areas, including: accessibility, cookies and trackers, your privacy policy, your terms of service, your commercial email, and the claims in your marketing copy. You get one Compliance Report covering all six, showing where you stand in each area and the detail behind every finding.",
  },
  {
    category: "Getting started",
    q: "How long does it take, and what do I get at the end?",
    a: "You receive a Compliance Report showing where you stand, the findings behind each result, and next steps you can work through with your team. Completion time depends on the website and the work requested. After making changes, run a new analysis and compare the reports.",
  },
  {
    category: "Getting started",
    q: "Do I have to install anything?",
    a: "No. Nothing to install and no code to add. I work from your public site as it stands today, which also means I cannot slow your site down or break it.",
  },
  {
    category: "Getting started",
    q: "Do I need an account before I can analyze my site?",
    a: "Yes. Enter your website address, then create an account and confirm you are authorized to have the site analyzed. Entering an address here does not start an analysis.",
  },
  {
    category: "Working with Verena",
    q: "How is Verena different from an accessibility widget or overlay?",
    a: "An accessibility widget changes the interface a visitor sees. It does not replace fixing and testing the underlying website. I identify barriers in your public pages and give your developer findings and suggested changes to work through. You can add a +Human Supervisor when a finding needs professional judgment. Nothing is added to your site without your permission.",
  },
  {
    category: "Working with Verena",
    q: "Will you fix my site for me?",
    a: "I produce findings and suggested work; you decide what changes. I do not edit your website directly. For accessibility, you get a developer fix guide naming the element, selector, issue, and suggested change, which can include software code. For privacy, terms, and cookies, you get a drafted or marked-up document. For commercial email and marketing claims, you get findings and a checklist. Your team or developer makes and tests the changes.",
  },
  {
    category: "+Human and your relationship",
    q: "What is +Human, and what do I actually get?",
    a: "+Human adds a professional person who takes responsibility for supervising my work for you: a +Human Supervisor from Invictus Counsel, a law firm. You add +Human, complete a Legal Services Agreement in the conversation, and your supervisor completes the required checks and countersigns. Payment is authorized when you add +Human and charged once your supervisor countersigns. If the matter cannot be accepted, you are not charged. Findings that need human judgment can then be discussed with your supervisor in the same conversation.",
  },
  {
    category: "+Human and your relationship",
    q: "Who am I actually working with?",
    a: "Verena is developed and operated by Invictus AI, a software company. Invictus AI is not a law firm. When you add +Human, your engagement is with Invictus Counsel, a law firm, under the Legal Services Agreement you sign. Your +Human Supervisor works there. The two relationships are separate and the documents say which is which.",
  },
  {
    category: "+Human and your relationship",
    q: "Which of my conversations are privileged?",
    a: "Standard conversations are not privileged. A supervising relationship requires a completed Legal Services Agreement. Signing up alone does not establish it. Review the agreement with your +Human Supervisor to understand which work it covers.",
  },
  {
    category: "Scope and responsibility",
    q: "Can I analyze sites for which I do not have authority?",
    a: "I am built for sites you own or are authorized to audit, and that is what you agree to when you sign up. If you look after websites for clients, that is exactly the case +Human is designed around, and a supervisor can tell you how to set it up.",
  },
];

export const FAQ_ITEMS = FAQ_ITEMS_RAW.map((item) => ({ ...item, id: toFaqId(item.q) }));

export const FAQ_CATEGORIES = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));

export const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Verena",
      url: "https://verena.ai/",
      logo: "https://verena.ai/og-image.png",
      description:
        "Verena scans your website for accessibility, privacy, cookie, and compliance gaps with AI, backed by attorney-reviewed fixes through +Human.",
      parentOrganization: {
        "@type": "Organization",
        name: "Invictus AI",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Verena",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://verena.ai/",
      image: "https://verena.ai/og-image.png",
      description:
        "AI website compliance scans for accessibility, privacy, cookies, and terms of service, with optional attorney review through +Human.",
      offers: PRICING_PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price,
        priceCurrency: "USD",
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
};

export const FOOTER_LINK_GROUPS = [
  { title: "Product", links: ["Overview", "+Human", "Pricing", "Changelog"] },
  { title: "Resources", links: ["Trust Center", "Compliance Guides", "WCAG 2.1 AA Checklist", "Help Center"] },
  { title: "Company", links: ["Invictus AI", "Careers", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility Statement"] },
];

export const SOCIAL_LINKS = [
  { icon: "x" as const, label: "X (Twitter)" },
  { icon: "linkedin" as const, label: "LinkedIn" },
];

export const bricolage = { fontFamily: "'Bricolage Grotesque', sans-serif" } as const;

export const MOCKUP_FINDINGS = [
  { title: "Accessibility", detail: "Image missing alt text — 3 instances found", severity: STATUS_COLORS.deficit },
  { title: "Privacy Policy", detail: "Data-sharing clause needs clearer wording", severity: STATUS_COLORS.warning },
  { title: "Cookies & Trackers", detail: "2 trackers load before consent is given", severity: STATUS_COLORS.deficit },
  { title: "Terms of Service", detail: "No issues found in this section", severity: STATUS_COLORS.verified },
];

export const MOCKUP_RECHECKS = [
  { title: "Accessibility", checked: "2 days ago", status: "Passing", statusColor: STATUS_COLORS.verified, trend: "+4%" },
  { title: "Privacy Policy", checked: "2 days ago", status: "1 new issue", statusColor: STATUS_COLORS.deficit, trend: "-2%" },
  { title: "Cookies & Trackers", checked: "5 days ago", status: "Passing", statusColor: STATUS_COLORS.verified, trend: "+1%" },
  { title: "Marketing Claims", checked: "5 days ago", status: "Passing", statusColor: STATUS_COLORS.verified, trend: "0%" },
];

export const SEVERITY_META = {
  deficit: { label: "DEFICIT", color: STATUS_COLORS.deficit },
  warning: { label: "WARNING", color: STATUS_COLORS.warning },
  verified: { label: "VERIFIED", color: STATUS_COLORS.verified },
} as const;
