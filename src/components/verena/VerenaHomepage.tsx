import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { useDocumentHead } from "../../lib/useDocumentHead";
import verenaLogo from "../../assets/homepage/image-15.png";
import gradientBackdrop from "../../assets/homepage/image-19.png";
import invictusMask from "../../assets/homepage/rectangle-34.png";
import avatarPhoto from "../../assets/homepage/avatar.png";
import ellipse92 from "../../assets/homepage/ellipse-92.svg";
import ctaExplorer from "../../assets/homepage/cta-explorer.png";
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

const INK = "#210c37";
const ACCENT = "#2653F3";
const CREAM = "#faf9f6";

const STATUS_COLORS = {
  deficit: "#e4572e",
  warning: "#eab308",
  verified: "#16a34a",
} as const;

const NAV_DROPDOWNS = {
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

type NavDropdownKey = keyof typeof NAV_DROPDOWNS;

const NAV_FEATURED = {
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

const COMPANY_LOGOS: Array<{ src: string; alt: string; width: number }> = [
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

const MARQUEE_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

const LOGO_EDGE_FADE_MASK =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

const PLACEHOLDER_EXAMPLES = [
  "Which website should Verena review?",
  "yourcompany.com",
  "acmehealth.com/pricing",
  "mystartup.io",
];

function isLikelyWebsite(value: string): boolean {
  const candidate = value.trim().replace(/^https?:\/\//i, "");
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:\/\S*)?$/i.test(
    candidate,
  );
}

const ANALYZE_LOOP_MS = 7000;

const ANALYZE_CARDS = [
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

const TOOL_TABS = [
  { id: "reports", icon: "file" as const, label: "Reports & Evidence", shortLabel: "Reports" },
  { id: "drafts", icon: "edit" as const, label: "AI-Drafted Document Changes", shortLabel: "Drafts" },
  { id: "code", icon: "code" as const, label: "Developer-Ready Code Suggestions", shortLabel: "Code fixes" },
  { id: "monitor", icon: "refresh" as const, label: "Monitoring & Rechecks", shortLabel: "Monitoring" },
];

const TOOL_TAB_AUTOPLAY_MS = 6000;

const TOOL_CAPTIONS: Record<(typeof TOOL_TABS)[number]["id"], string> = {
  reports: "Explore potential issues, supporting evidence, and explanations in one clear report",
  drafts: "Review AI-drafted language for each finding, then accept it or edit it before anything goes live",
  code: "Get developer-ready code suggestions your team can hand straight to a pull request",
  monitor: "Keep track of fixes over time with scheduled rechecks and alerts when something changes",
};

const REVIEW_AREAS = [
  {
    title: "Accessibility",
    body: "Spot potential barriers that make your website harder for people to use.",
    status: "3 issues found",
    statusColor: STATUS_COLORS.deficit,
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
  },
  {
    title: "Privacy Policy",
    body: "Check whether your policy clearly explains how personal information is collected and used.",
    status: "Needs review",
    statusColor: STATUS_COLORS.warning,
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
  },
  {
    title: "Cookies & Trackers",
    body: "See which tracking tools may be running and where consent needs attention.",
    status: "2 trackers flagged",
    statusColor: STATUS_COLORS.deficit,
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
  },
  {
    title: "Terms of Service",
    body: "Find potential gaps or unclear wording in your website's terms.",
    status: "No issues found",
    statusColor: STATUS_COLORS.verified,
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
  },
  {
    title: "Commercial Email",
    body: "Review supported email-related requirements, including relevant disclosures and consent practices.",
    status: "1 issue found",
    statusColor: STATUS_COLORS.warning,
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
  },
  {
    title: "Marketing Claims",
    body: "Spot promotional claims that may need stronger evidence or clearer wording.",
    status: "No issues found",
    statusColor: STATUS_COLORS.verified,
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
  },
];

const AVATAR_ORBIT_DURATION = 34;
const AVATAR_ORBIT_COUNT = 6;
const AVATAR_ORBITS = Array.from({ length: AVATAR_ORBIT_COUNT }, (_, i) => {
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

const PRICING_PLANS = [
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
    name: "Starter",
    price: 99,
    period: "/month",
    credits: "5,000 credits / month",
    description: "For a single website under ongoing review.",
    cta: "Choose Starter",
    featured: false,
    addOnPrice: 99,
    features: ["Everything in Free", "1 website", "Weekly re-scans", "Email support"],
  },
  {
    name: "Professional",
    price: 299,
    period: "/month",
    credits: "25,000 credits / month",
    description: "For teams reviewing multiple websites regularly.",
    cta: "Choose Professional",
    featured: true,
    addOnPrice: 149,
    features: ["Everything in Starter", "Up to 10 websites", "Daily re-scans", "Priority support"],
  },
  {
    name: "Enterprise",
    price: 999,
    period: "/month",
    credits: "125,000 credits / month",
    description: "For organizations running compliance at scale.",
    cta: "Choose Enterprise",
    featured: false,
    addOnPrice: 249,
    features: ["Everything in Professional", "Unlimited websites", "Custom review areas", "Dedicated account manager"],
  },
];

function toFaqId(value: string) {
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
    a: "Verena is developed and operated by Invictus AI Corporation, a software company. Invictus AI is not a law firm. When you add +Human, your engagement is with Invictus Counsel, a law firm, under the Legal Services Agreement you sign. Your +Human Supervisor works there. The two relationships are separate and the documents say which is which.",
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

const FAQ_ITEMS = FAQ_ITEMS_RAW.map((item) => ({ ...item, id: toFaqId(item.q) }));

const FAQ_CATEGORIES = Array.from(new Set(FAQ_ITEMS.map((item) => item.category)));

const STRUCTURED_DATA = {
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

const FOOTER_LINK_GROUPS = [
  { title: "Product", links: ["Overview", "+Human", "Pricing", "Changelog"] },
  { title: "Resources", links: ["Trust Center", "Compliance Guides", "WCAG 2.1 AA Checklist", "Help Center"] },
  { title: "Company", links: ["Invictus AI", "Careers", "Contact"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility Statement"] },
];

const SOCIAL_LINKS = [
  { icon: "x" as const, label: "X (Twitter)" },
  { icon: "linkedin" as const, label: "LinkedIn" },
];

const TRUST_BADGES = [
  { icon: "globe" as const, label: "ISO 27001" },
  { icon: "badge-check" as const, label: "SOC 2 Type II" },
  { icon: "eu-stars" as const, label: "GDPR Ready" },
  { icon: "medical-cross" as const, label: "HIPAA Compliant" },
];

const bricolage = { fontFamily: "'Bricolage Grotesque', sans-serif" } as const;

function FooterIcon({
  name,
  size = 15,
}: {
  name: "x" | "linkedin" | "globe" | "badge-check" | "eu-stars" | "medical-cross";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "x":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M18.24 2H21l-6.6 7.54L22 22h-6.68l-5.2-6.78L4.2 22H1.4l7.1-8.1L2 2h6.84l4.67 6.2L18.24 2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
        </svg>
      );
    case "badge-check":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.5-3 7.7-7 9.5-4-1.8-7-5-7-9.5V6l7-3Z" />
          <path d="M8.7 12.3l2.2 2.2 4.4-4.6" />
        </svg>
      );
    case "eu-stars":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <circle cx="19" cy="12" r="1" />
          <circle cx="16.95" cy="16.95" r="1" />
          <circle cx="12" cy="19" r="1" />
          <circle cx="7.05" cy="16.95" r="1" />
          <circle cx="5" cy="12" r="1" />
          <circle cx="7.05" cy="7.05" r="1" />
          <circle cx="12" cy="5" r="1" />
          <circle cx="16.95" cy="7.05" r="1" />
        </svg>
      );
    case "medical-cross":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}

function ToolTabIcon({
  name,
  active,
}: {
  name: "file" | "edit" | "code" | "refresh";
  active: boolean;
}) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    style: { color: active ? INK : "rgba(33,12,55,0.35)", transition: "color 0.2s ease-out" },
  };
  switch (name) {
    case "file":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
          <path d="M13.5 8 16 10.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 6.5l-3 11" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M4 4v5h5M20 20v-5h-5" />
          <path d="M5.5 15a7 7 0 0 0 12.3 2.5M18.5 9a7 7 0 0 0-12.3-2.5" />
        </svg>
      );
  }
}

function AreaIcon({
  name,
  size = 20,
}: {
  name: "accessibility" | "privacy" | "cookies" | "document" | "email" | "megaphone";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "accessibility":
      return (
        <svg {...common}>
          <circle cx="12" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
          <path d="M12 7.5v5M7.8 10.3l4.2 1 4.2-1M9.5 21l2.5-6 2.5 6" />
        </svg>
      );
    case "privacy":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
        </svg>
      );
    case "cookies":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7Z" />
          <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5M9.5 8.5h2" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5 12 13.5l8.5-7" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 10v4a1 1 0 0 0 1 1h2l8 4V5l-8 4H4a1 1 0 0 0-1 1Z" />
          <path d="M15 9.5a3 3 0 0 1 0 5" />
          <path d="M9 15v3a2 2 0 0 0 2 2" />
        </svg>
      );
  }
}

type NavIconName = "overview" | "human" | "pricing" | "trust" | "guides" | "help";

function NavIcon({ name }: { name: NavIconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "overview":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" />
          <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5" />
          <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" />
          <rect x="13" y="13" width="7.5" height="7.5" rx="1.5" />
        </svg>
      );
    case "human":
      return (
        <svg {...common}>
          <circle cx="10" cy="8" r="3.2" />
          <path d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M16 11.5l2 2 3.5-3.5" />
        </svg>
      );
    case "pricing":
      return (
        <svg {...common}>
          <path d="M11.5 3.5H19a1 1 0 0 1 1 1v7.5a1 1 0 0 1-.3.7l-8 8a1 1 0 0 1-1.4 0l-7.5-7.5a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 .7-.3Z" />
          <circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "trust":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "guides":
      return (
        <svg {...common}>
          <rect x="6" y="3.5" width="12" height="17" rx="1.8" />
          <path d="M9.5 3.5v2.5h5V3.5" />
          <path d="M9 11h6M9 14.5h6M9 18h3.5" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.6 9.3a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1 .9-1 1.6" />
          <circle cx="12" cy="16.3" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

function CheckIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 200ms ease-in-out",
        }}
      />
    </svg>
  );
}

function HeroStatusIcon({ status }: { status: "idle" | "loading" | "success" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (status === "loading") {
    return (
      <svg {...common} className="hero-input-spin">
        <path d="M12 3a9 9 0 1 1-9 9" />
      </svg>
    );
  }
  if (status === "success") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.7 2.7L16.5 9" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}

function useInViewport<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

const STAGE_LEAVE_DURATION_MS = 320;

function useStageTransition<T>(active: T) {
  const [leaving, setLeaving] = useState<T | null>(null);
  const prevRef = useRef(active);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev === active) return;
    prevRef.current = active;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setLeaving(prev);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setLeaving(null), STAGE_LEAVE_DURATION_MS);
  }, [active]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return leaving;
}

function NavMenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`t-menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span className="t-menu-icon-bar" />
      <span className="t-menu-icon-bar" />
      <span className="t-menu-icon-bar" />
    </span>
  );
}

function NavItem({
  label,
  dropdownKey,
  openDropdown,
  setOpenDropdown,
}: {
  label: string;
  dropdownKey?: NavDropdownKey;
  openDropdown: NavDropdownKey | null;
  setOpenDropdown: (key: NavDropdownKey | null) => void;
}) {
  const items = dropdownKey ? NAV_DROPDOWNS[dropdownKey] : undefined;

  if (!items) {
    return (
      <a
        href="#"
        className="rounded-sm text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
      >
        {label}
      </a>
    );
  }

  const isOpen = openDropdown === dropdownKey;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const featured = NAV_FEATURED[dropdownKey!];

  const [panelState, setPanelState] = useState<"closed" | "open" | "closing">("closed");

  useEffect(() => {
    if (isOpen) {
      setPanelState("open");
    } else {
      setPanelState((prev) => (prev === "open" ? "closing" : "closed"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (panelState !== "closing") return;
    const timer = setTimeout(() => setPanelState("closed"), 150);
    return () => clearTimeout(timer);
  }, [panelState]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpenDropdown]);

  const itemTabIndex = panelState === "open" ? 0 : -1;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(dropdownKey!)}
      onMouseLeave={() => setOpenDropdown(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpenDropdown(null);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="flex items-center gap-1 rounded-sm text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setOpenDropdown(isOpen ? null : dropdownKey!)}
      >
        {label}
        <svg
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path
            d="M3 6l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`t-dropdown absolute left-1/2 top-full z-20 w-[480px] -translate-x-1/2 pt-3 ${
          panelState === "open" ? "is-open" : panelState === "closing" ? "is-closing" : ""
        }`}
        data-origin="top-center"
        aria-hidden={panelState !== "open"}
      >
        <div className="grid grid-cols-[1.3fr_1fr] overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(33,12,55,0.06),0_16px_32px_-8px_rgba(33,12,55,0.14)] ring-1 ring-[rgba(33,12,55,0.08)]">
          <div className="p-3">
            {items.map((item) => (
              <a
                key={item.label}
                href="#"
                tabIndex={itemTabIndex}
                className="flex items-start gap-3 rounded-xl p-3 text-left transition hover:bg-[rgba(33,12,55,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(38,83,243,0.08)", color: ACCENT }}
                >
                  <NavIcon name={item.icon} />
                </span>
                <span>
                  <p className="text-sm font-semibold" style={{ color: INK }}>
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug opacity-60">{item.body}</p>
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-5 p-5" style={{ backgroundColor: INK }}>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
                {featured.eyebrow}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{featured.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">{featured.body}</p>
            </div>
            <a
              href="#"
              tabIndex={itemTabIndex}
              className="inline-flex items-center gap-1 text-xs font-medium transition-[gap] duration-200"
              style={{ color: "#9db2ff" }}
            >
              {featured.cta}
              <svg
                width="11"
                height="11"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 8h8M8 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const MOCKUP_FINDINGS = [
  { title: "Accessibility", detail: "Image missing alt text — 3 instances found", severity: STATUS_COLORS.deficit },
  { title: "Privacy Policy", detail: "Data-sharing clause needs clearer wording", severity: STATUS_COLORS.warning },
  { title: "Cookies & Trackers", detail: "2 trackers load before consent is given", severity: STATUS_COLORS.deficit },
  { title: "Terms of Service", detail: "No issues found in this section", severity: STATUS_COLORS.verified },
];

const MOCKUP_RECHECKS = [
  { title: "Accessibility", checked: "2 days ago", status: "Passing", statusColor: STATUS_COLORS.verified, trend: "+4%" },
  { title: "Privacy Policy", checked: "2 days ago", status: "1 new issue", statusColor: STATUS_COLORS.deficit, trend: "-2%" },
  { title: "Cookies & Trackers", checked: "5 days ago", status: "Passing", statusColor: STATUS_COLORS.verified, trend: "+1%" },
  { title: "Marketing Claims", checked: "5 days ago", status: "Passing", statusColor: STATUS_COLORS.verified, trend: "0%" },
];

function ToolMockupBody({ tool }: { tool: (typeof TOOL_TABS)[number]["id"] }) {
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

const SEVERITY_META = {
  deficit: { label: "DEFICIT", color: STATUS_COLORS.deficit },
  warning: { label: "WARNING", color: STATUS_COLORS.warning },
  verified: { label: "VERIFIED", color: STATUS_COLORS.verified },
} as const;

function SeverityTag({ severity }: { severity: keyof typeof SEVERITY_META }) {
  const meta = SEVERITY_META[severity];
  return (
    <span
      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide"
      style={{ backgroundColor: `${meta.color}1a`, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

function AreaDetailCard({ area }: { area: (typeof REVIEW_AREAS)[number] }) {
  return (
    <div className="flex h-full w-full max-w-[500px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_4px_12px_rgba(33,12,55,0.06),0_16px_32px_-8px_rgba(33,12,55,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
          >
            <AreaIcon name={area.icon} size={18} />
          </div>
          <div>
            <p style={bricolage} className="text-[15px] font-semibold leading-tight">
              {area.title} Scan
            </p>
            <p className="text-[12px] opacity-60">{area.auditLabel}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{ backgroundColor: `${area.statusColor}14`, color: area.statusColor }}
          >
            {area.score}/100
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {area.findings.map((finding) => (
          <div
            key={finding.title}
            className="flex items-start gap-3 rounded-[10px] px-3 py-2.5"
            style={{ border: "1px solid rgba(33,12,55,0.08)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-snug">{finding.title}</p>
              <p className="mt-0.5 text-[12px] leading-snug opacity-60">{finding.detail}</p>
            </div>
            <SeverityTag severity={finding.severity} />
          </div>
        ))}
      </div>

      {area.remediation ? (
        <div
          className="flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5"
          style={{ backgroundColor: "rgba(38,83,243,0.06)" }}
        >
          <p className="text-[12px] leading-snug" style={{ color: ACCENT }}>
            <span className="font-semibold">Suggested remediation: </span>
            {area.remediation.label}
          </p>
          <span
            className="shrink-0 rounded-[8px] px-2.5 py-1.5 text-[12px] font-medium"
            style={{ backgroundColor: ACCENT, color: "#fff" }}
          >
            {area.remediation.cta} →
          </span>
        </div>
      ) : (
        <p className="text-[12px] font-medium" style={{ color: STATUS_COLORS.verified }}>
          No action needed — this area passed review.
        </p>
      )}
    </div>
  );
}

function AnalyzeWindowFrame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-[300px] w-full flex-col gap-2.5 overflow-hidden rounded-2xl p-4"
      style={{ backgroundColor: "#faf9fb", border: "1px solid rgba(33,12,55,0.08)" }}
    >
      {children}
    </div>
  );
}

function StepIcon({ name }: { name: "website" | "scan" | "findings" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "website":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17" />
          <path d="M12 3.5c2.4 2.3 3.6 5.3 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.3-3.6-8.5S9.6 5.8 12 3.5Z" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M4 9V6a2 2 0 0 1 2-2h3" />
          <path d="M20 9V6a2 2 0 0 0-2-2h-3" />
          <path d="M4 15v3a2 2 0 0 0 2 2h3" />
          <path d="M20 15v3a2 2 0 0 1-2 2h-3" />
        </svg>
      );
    case "findings":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.3 15.3 20 20" />
          <path d="M7.8 10.5l1.8 1.8 3.1-3.5" />
        </svg>
      );
  }
}

function VerenaMarkIcon({ className }: { className?: string }) {
  return (
    <div className={`shrink-0 overflow-hidden ${className ?? ""}`}>
      <img
        src={verenaLogo}
        alt=""
        className="h-[102%] w-[474%] max-w-none"
        style={{ marginLeft: "-23%", marginTop: "-2%" }}
      />
    </div>
  );
}

function AnalyzeMockup({ step }: { step: "website" | "scan" | "findings" }) {
  if (step === "website") {
    return (
      <AnalyzeWindowFrame>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <VerenaMarkIcon className="h-4 w-4" />
            <p style={bricolage} className="text-[13px] font-semibold">Verena</p>
          </div>
          <span className="text-[11px] opacity-50">Getting started</span>
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
        <div className="demo-pop flex w-full justify-end" style={{ animationDelay: "0.3s" }}>
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
            animationDelay: "0.6s",
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
    const pages = [
      { label: "Homepage and marketing claims", state: "done" as const },
      { label: "Privacy policy and data rights", state: "done" as const },
      { label: "Terms of service and liability", state: "done" as const },
      { label: "Cookie banner and trackers", state: "done" as const },
      { label: "Commercial email practices", state: "active" as const },
      { label: "Accessibility and ADA compliance", state: "pending" as const },
    ];
    return (
      <AnalyzeWindowFrame>
        <div className="flex items-center justify-between">
          <p style={bricolage} className="text-[13px] font-semibold">Analysis of your website</p>
          <span className="text-[11px] opacity-50">4 of 6 areas</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.08)" }}>
          <div
            className="demo-progress-fill h-full rounded-full"
            style={{ width: "66%", backgroundColor: ACCENT }}
          />
        </div>
        <div
          className="flex flex-1 flex-col justify-center rounded-[10px]"
          style={{ border: "1px solid rgba(33,12,55,0.06)" }}
        >
          {pages.map((page, i) => (
            <div
              key={page.label}
              className="flex items-center gap-2.5 px-2.5 py-1.5"
              style={i > 0 ? { borderTop: "1px solid rgba(33,12,55,0.06)" } : undefined}
            >
              {page.state === "done" ? (
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
                      animationDelay: `${0.4 + i * 0.4}s`,
                    }}
                  >
                    <CheckIcon />
                  </span>
                </span>
              ) : page.state === "active" ? (
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
              <p className="text-[12px] leading-tight" style={{ opacity: page.state === "pending" ? 0.4 : 0.8 }}>
                {page.label}
              </p>
            </div>
          ))}
        </div>
      </AnalyzeWindowFrame>
    );
  }

  return (
    <AnalyzeWindowFrame>
      <div className="flex items-center justify-between">
        <p style={bricolage} className="text-[13px] font-semibold">High Level Compliance Report</p>
        <span className="text-[11px] opacity-50">Acme</span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-medium opacity-80">6 of 6 areas checked</p>
        <p className="text-[11px] opacity-50">2 Exposed</p>
      </div>
      <div className="flex gap-1.5">
        {REVIEW_AREAS.map((area, i) => (
          <span
            key={area.title}
            className="demo-bar h-1.5 flex-1 rounded-full"
            style={{
              backgroundColor: area.statusColor,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <div
        className="demo-pop flex items-center justify-between rounded-[10px] px-3 py-2"
        style={{ border: "1px solid rgba(33,12,55,0.08)", animationDelay: "0.3s" }}
      >
        <p className="text-[12px] font-medium">Cookie compliance</p>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ backgroundColor: "#fde9e7", color: "#b42318" }}
        >
          EXPOSED
        </span>
      </div>
      <div
        className="demo-pop flex items-center justify-between rounded-[10px] px-3 py-2"
        style={{ border: "1px solid rgba(33,12,55,0.08)", animationDelay: "0.6s" }}
      >
        <p className="text-[12px] font-medium">ADA / Web accessibility</p>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{ backgroundColor: "#e2f3e8", color: "#17673a" }}
        >
          APPLICABLE
        </span>
      </div>
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
const FLOW_DOT_DUR = 0.85;
const FLOW_DOT_STAGGER = 0.1;
const FLOW_CENTER_BEGIN = 0.9;
const FLOW_CENTER_DUR = 0.65;
const FLOW_OUTPUT_START = 1.3;
const FLOW_CYCLE_PAUSE = 1.5;
const FLOW_CYCLE_DURATION =
  (FLOW_OUTPUT_START + (FLOW_OUTPUTS.length - 1) * FLOW_DOT_STAGGER + FLOW_DOT_DUR + FLOW_CYCLE_PAUSE) * 1000;

function ComplianceFlowDiagram({ active }: { active: boolean }) {
  const uid = useId();
  const boxGradId = `${uid}-box`;
  const sweepGradId = `${uid}-sweep`;
  const clipId = `${uid}-clip`;
  const glowId = `${uid}-glow`;
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const animateEnabled = active && !prefersReducedMotion;
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!animateEnabled) return;
    const interval = window.setInterval(() => {
      setCycle((c) => c + 1);
    }, FLOW_CYCLE_DURATION);
    return () => window.clearInterval(interval);
  }, [animateEnabled]);

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
        </defs>

        {FLOW_INPUTS.map((label, i) => {
          const y = FLOW_NODE_YS[i];
          const pathId = `${uid}-in-${i}`;
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
                <circle key={`${pathId}-${cycle}`} className="flow-motion" r="4.5" fill="#8aa0ff" filter={`url(#${glowId})`}>
                  <animateMotion
                    dur={`${FLOW_DOT_DUR}s`}
                    begin={`${i * FLOW_DOT_STAGGER}s`}
                    repeatCount="1"
                    fill="freeze"
                    calcMode="spline"
                    keyTimes="0;1"
                    keySplines={FLOW_EASE_OUT}
                  >
                    <mpath href={`#${pathId}`} xlinkHref={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur={`${FLOW_DOT_DUR}s`}
                    begin={`${i * FLOW_DOT_STAGGER}s`}
                    repeatCount="1"
                    fill="freeze"
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
                <circle key={`${pathId}-${cycle}`} className="flow-motion" r="4.5" fill="#8aa0ff" filter={`url(#${glowId})`}>
                  <animateMotion
                    dur={`${FLOW_DOT_DUR}s`}
                    begin={`${FLOW_OUTPUT_START + i * FLOW_DOT_STAGGER}s`}
                    repeatCount="1"
                    fill="freeze"
                    calcMode="spline"
                    keyTimes="0;1"
                    keySplines={FLOW_EASE_OUT}
                  >
                    <mpath href={`#${pathId}`} xlinkHref={`#${pathId}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur={`${FLOW_DOT_DUR}s`}
                    begin={`${FLOW_OUTPUT_START + i * FLOW_DOT_STAGGER}s`}
                    repeatCount="1"
                    fill="freeze"
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

        <g style={{ filter: "drop-shadow(0 0 32px rgba(38,83,243,0.45))" }}>
          <g clipPath={`url(#${clipId})`}>
            <rect x="545" y="110" width="255" height="260" fill={`url(#${boxGradId})`} />
            {animateEnabled && (
              <rect key={`sweep-${cycle}`} className="flow-motion" y="110" height="260" width="70" fill={`url(#${sweepGradId})`}>
                <animate
                  attributeName="x"
                  values="490;800"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines={FLOW_EASE_OUT}
                  dur={`${FLOW_CENTER_DUR}s`}
                  begin={`${FLOW_CENTER_BEGIN}s`}
                  repeatCount="1"
                  fill="freeze"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.75;1"
                  dur={`${FLOW_CENTER_DUR}s`}
                  begin={`${FLOW_CENTER_BEGIN}s`}
                  repeatCount="1"
                  fill="freeze"
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

function FlowArrow() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
      <path d="M8 0V16M8 16L2 10M8 16L14 10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComplianceFlowDiagramMobile() {
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

export function VerenaHomepage() {
  useDocumentHead({
    title: "Verena — AI Accessibility & ADA Compliance Scans | Invictus AI",
    description:
      "Scan your website for accessibility, privacy, cookie, and compliance issues with AI, backed by attorney-reviewed fixes through +Human. Start free.",
  });

  const [activeTool, setActiveTool] = useState<(typeof TOOL_TABS)[number]["id"]>(
    TOOL_TABS[0].id,
  );
  const leavingTool = useStageTransition(activeTool);
  const toolTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusToolTab = (index: number) => {
    const wrapped = (index + TOOL_TABS.length) % TOOL_TABS.length;
    setActiveTool(TOOL_TABS[wrapped].id);
    toolTabRefs.current[wrapped]?.focus();
  };

  const handleToolTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusToolTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusToolTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusToolTab(0);
        break;
      case "End":
        event.preventDefault();
        focusToolTab(TOOL_TABS.length - 1);
        break;
      default:
        break;
    }
  };

  const [activeArea, setActiveArea] = useState(0);
  const leavingArea = useStageTransition(activeArea);

  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const placeholderInputRef = useRef<HTMLInputElement | null>(null);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const TYPE_SPEED = 11;
    const DELETE_SPEED = 11;
    const HOLD_DURATION = 2500;
    const PAUSE_DURATION = 320;

    let phraseIndex = 0;
    let charIndex = 0;
    let phase: "typing" | "holding" | "deleting" | "paused" = "typing";
    let timeoutId: number;

    function setPlaceholder(text: string) {
      if (placeholderInputRef.current) placeholderInputRef.current.placeholder = text;
    }

    function tick() {
      const phrase = PLACEHOLDER_EXAMPLES[phraseIndex];
      if (phase === "typing") {
        charIndex += 1;
        setPlaceholder(phrase.slice(0, charIndex));
        phase = charIndex >= phrase.length ? "holding" : "typing";
        timeoutId = window.setTimeout(tick, phase === "holding" ? HOLD_DURATION : TYPE_SPEED);
        return;
      }
      if (phase === "holding") {
        phase = "deleting";
        timeoutId = window.setTimeout(tick, DELETE_SPEED);
        return;
      }
      if (phase === "deleting") {
        charIndex -= 1;
        setPlaceholder(phrase.slice(0, charIndex));
        phase = charIndex <= 0 ? "paused" : "deleting";
        timeoutId = window.setTimeout(tick, phase === "paused" ? PAUSE_DURATION : DELETE_SPEED);
        return;
      }
      phraseIndex = (phraseIndex + 1) % PLACEHOLDER_EXAMPLES.length;
      charIndex = 0;
      phase = "typing";
      timeoutId = window.setTimeout(tick, TYPE_SPEED);
    }

    timeoutId = window.setTimeout(tick, TYPE_SPEED);
    return () => window.clearTimeout(timeoutId);
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    const trimmed = domain.trim();
    if (!trimmed) {
      setDomainError("Enter a website to analyze.");
      return;
    }
    if (!isLikelyWebsite(trimmed)) {
      setDomainError("Enter a valid website address, like acme.com.");
      return;
    }

    setDomainError("");
    setStatus("loading");
    timeouts.current.push(window.setTimeout(() => setStatus("success"), 900));
    timeouts.current.push(window.setTimeout(() => setStatus("idle"), 3200));
  }

  const [openDropdown, setOpenDropdown] = useState<NavDropdownKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePanelState, setMobilePanelState] = useState<"closed" | "open" | "closing">("closed");
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<NavDropdownKey | null>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuFirstLinkRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const headerWrapRef = useRef<HTMLDivElement | null>(null);
  const [mobileNavTop, setMobileNavTop] = useState(80);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementClosing, setAnnouncementClosing] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function updateMobileNavTop() {
      setMobileNavTop(headerWrapRef.current?.getBoundingClientRect().bottom ?? 80);
    }
    updateMobileNavTop();
    window.addEventListener("resize", updateMobileNavTop);
    return () => window.removeEventListener("resize", updateMobileNavTop);
  }, [mobileMenuOpen, announcementVisible]);

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobilePanelState("open");
    } else {
      setMobilePanelState((prev) => (prev === "open" ? "closing" : "closed"));
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobilePanelState !== "closing") return;
    const timer = window.setTimeout(() => setMobilePanelState("closed"), 350);
    return () => window.clearTimeout(timer);
  }, [mobilePanelState]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    mobileMenuFirstLinkRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    const active = document.activeElement as HTMLElement | null;
    if (active?.closest("#verena-homepage-mobile-nav")) {
      active.blur();
    }
    mobileMenuToggleRef.current?.focus();
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileAccordionOpen(null);
    }
  }, [mobileMenuOpen]);

  function closeAnnouncement() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setAnnouncementVisible(false);
      return;
    }
    setAnnouncementClosing(true);
    timeouts.current.push(window.setTimeout(() => setAnnouncementVisible(false), 600));
  }

  const [humanAddOns, setHumanAddOns] = useState<Record<string, boolean>>({});
  const [toggleTouched, setToggleTouched] = useState<Record<string, boolean>>({});

  function toggleHumanAddOn(name: string) {
    setToggleTouched((prev) => ({ ...prev, [name]: true }));
    setHumanAddOns((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  const [heroRef, heroVisible] = useReveal<HTMLElement>();
  const [trustedRef, trustedVisible] = useReveal<HTMLElement>();
  const [footerRef, footerVisible] = useReveal<HTMLElement>();
  const [statementRef, statementVisible] = useReveal<HTMLElement>();
  const [startedRef, startedVisible] = useReveal<HTMLElement>();
  const [startedInViewRef, startedInView] = useInViewport<HTMLElement>(0.2);
  const [analyzeLoopKey, setAnalyzeLoopKey] = useState(0);
  const [scanRef, scanVisible] = useReveal<HTMLElement>();
  const [humanRef, humanVisible] = useReveal<HTMLElement>();
  const [humanOrbitSectionRef, humanOrbitInView] = useInViewport<HTMLElement>(0.25);
  const avatarRefs = useRef<(HTMLImageElement | null)[]>([]);
  const wasSpread = useRef(false);
  const orbitTimeouts = useRef<number[]>([]);
  const orbitRafs = useRef<number[]>([]);

  useEffect(() => {
    if (wasSpread.current === humanOrbitInView) return;
    wasSpread.current = humanOrbitInView;

    orbitTimeouts.current.forEach((id) => window.clearTimeout(id));
    orbitTimeouts.current = [];
    orbitRafs.current.forEach((id) => window.cancelAnimationFrame(id));
    orbitRafs.current = [];

    const avatars = avatarRefs.current.filter((el): el is HTMLImageElement => el !== null);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    if (humanOrbitInView) {
      avatars.forEach((el) => {
        el.classList.remove("is-orbiting");
        el.classList.add("is-spread");
      });
      const timeoutId = window.setTimeout(() => {
        avatars.forEach((el) => el.classList.add("is-orbiting"));
      }, 950);
      orbitTimeouts.current.push(timeoutId);
    } else {
      avatars.forEach((el) => {
        const computed = getComputedStyle(el);
        el.style.translate = computed.translate;
        el.style.rotate = computed.rotate;
        el.style.scale = computed.scale;
        el.classList.remove("is-orbiting");
        el.classList.remove("is-spread");
        void el.offsetWidth;
      });
      const rafId = window.requestAnimationFrame(() => {
        avatars.forEach((el) => {
          el.style.translate = "";
          el.style.rotate = "";
          el.style.scale = "";
        });
      });
      orbitRafs.current.push(rafId);
    }
  }, [humanOrbitInView]);

  useEffect(() => {
    return () => {
      orbitTimeouts.current.forEach((id) => window.clearTimeout(id));
      orbitRafs.current.forEach((id) => window.cancelAnimationFrame(id));
    };
  }, []);

  useEffect(() => {
    if (!startedInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalId = window.setInterval(() => {
      setAnalyzeLoopKey((key) => key + 1);
    }, ANALYZE_LOOP_MS);
    return () => window.clearInterval(intervalId);
  }, [startedInView]);

  const [pricingRef, pricingVisible] = useReveal<HTMLElement>();
  const [faqRef, faqVisible] = useReveal<HTMLElement>();
  const [ctaRef, ctaVisible] = useReveal<HTMLElement>();
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>(FAQ_CATEGORIES[0]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const selectFaqCategory = (category: string) => {
    setActiveFaqCategory(category);
    const firstItem = FAQ_ITEMS.find((item) => item.category === category);
    setOpenFaqId(firstItem ? firstItem.id : null);
  };

  const filteredFaqItems = FAQ_ITEMS.filter((item) => item.category === activeFaqCategory);

  const renderFaqAccordionItem = (item: (typeof FAQ_ITEMS)[number], delayIndex: number) => {
    const isOpen = openFaqId === item.id;
    const triggerId = `${item.id}-trigger`;
    const panelId = `${item.id}-panel`;
    return (
      <div
        key={item.id}
        id={item.id}
        className={`area-reveal overflow-hidden rounded-2xl transition-colors duration-200 ${faqVisible ? "is-shown" : ""}`}
        style={{
          transitionDelay: `${Math.min(delayIndex, 6) * 70}ms`,
          backgroundColor: isOpen ? "#ffffff" : "rgba(33,12,55,0.035)",
          boxShadow: isOpen
            ? "0 1px 2px rgba(33,12,55,0.06), 0 16px 32px -20px rgba(33,12,55,0.22)"
            : "none",
        }}
      >
        <h3 className="m-0">
          <button
            type="button"
            id={triggerId}
            onClick={() => toggleFaq(item.id)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
          >
            <span
              style={bricolage}
              className={`text-[16px] font-medium transition-opacity sm:text-[18px] ${isOpen ? "opacity-100" : "opacity-65"}`}
            >
              {item.q}
            </span>
            <PlusMinusIcon open={isOpen} />
          </button>
        </h3>
        <div id={panelId} className={`area-accordion-body ${isOpen ? "is-open" : ""}`}>
          <div className="overflow-hidden">
            <p className="px-6 pb-6 text-[15px] leading-6 opacity-70">{item.a}</p>
          </div>
        </div>
      </div>
    );
  };

  const [toolAutoplayPaused, setToolAutoplayPaused] = useState(false);

  useEffect(() => {
    if (toolAutoplayPaused) return;
    const id = window.setInterval(() => {
      setActiveTool((prev) => {
        const currentIndex = TOOL_TABS.findIndex((tab) => tab.id === prev);
        const nextIndex = (currentIndex + 1) % TOOL_TABS.length;
        return TOOL_TABS[nextIndex].id;
      });
    }, TOOL_TAB_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [activeTool, toolAutoplayPaused]);

  return (
    <div style={{ color: INK }} className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2"
        style={{ color: INK }}
      >
        Skip to content
      </a>
      {/* Announcement bar */}
      {announcementVisible && (
        <div
          style={{ backgroundColor: INK }}
          className={`t-announcement-bar ${announcementClosing ? "is-closing" : ""}`}
        >
          <div className="t-announcement-row overflow-hidden">
            <div className="t-announcement-content relative flex min-h-10 items-center justify-center px-10 py-2 text-center">
              <p className="text-[12px] leading-[18px] text-white [font-weight:300]">
                We're in Beta! Explore Verena early and help shape what's next.
              </p>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={closeAnnouncement}
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm text-white transition duration-200 ease-out hover:scale-110 hover:bg-[rgba(255,255,255,0.12)] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <div ref={headerWrapRef} className="sticky top-0 z-30 bg-white/70 backdrop-blur-md backdrop-saturate-150">
        <header className="section-pad-x mx-auto flex h-20 max-w-[1536px] items-center justify-between gap-6">
          <img src={verenaLogo} alt="Verena" className="h-[2rem] w-auto object-contain" />

          <nav className="hidden items-center gap-7 md:flex">
            <NavItem
              label="Product"
              dropdownKey="Product"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <NavItem label="Pricing" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem
              label="Resources"
              dropdownKey="Resources"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <NavItem label="Contact us" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="hidden rounded-sm text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:inline"
            >
              Log in
            </a>
            <button
              type="button"
              style={{ backgroundColor: ACCENT }}
              className="hidden shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 active:translate-y-0 active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:inline-flex"
            >
              Talk to founder
            </button>
            <button
              ref={mobileMenuToggleRef}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="verena-homepage-mobile-nav"
              onClick={() => {
                if (mobileMenuOpen) {
                  closeMobileMenu();
                } else {
                  setMobileMenuOpen(true);
                }
              }}
              className="flex h-11 w-11 items-center justify-center rounded-lg transition duration-200 ease-out hover:bg-[rgba(33,12,55,0.05)] hover:scale-110 active:scale-90 active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 md:hidden"
            >
              <NavMenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </header>

      </div>

      <nav
        id="verena-homepage-mobile-nav"
        aria-hidden={!mobileMenuOpen}
        aria-label="Mobile"
        style={{ top: mobileNavTop }}
        className={`t-mobile-drawer fixed inset-x-0 bottom-0 z-20 flex flex-col gap-1 overflow-y-auto bg-white px-6 pb-6 pt-6 text-sm font-medium md:hidden ${
          mobilePanelState === "open" ? "is-open" : mobilePanelState === "closing" ? "is-closing" : ""
        }`}
      >
        {(["Product", "Pricing", "Resources", "Contact us"] as const).map((label, index) => {
          const dropdownKey: NavDropdownKey | undefined =
            label === "Product" || label === "Resources" ? label : undefined;

          if (!dropdownKey) {
            return (
              <a
                key={label}
                ref={index === 0 ? (node: HTMLAnchorElement | null) => { mobileMenuFirstLinkRef.current = node; } : undefined}
                href="#"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2.5 transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                {label}
              </a>
            );
          }

          const expanded = mobileAccordionOpen === dropdownKey;

          return (
            <div key={label}>
              <button
                ref={index === 0 ? (node: HTMLButtonElement | null) => { mobileMenuFirstLinkRef.current = node; } : undefined}
                type="button"
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-expanded={expanded}
                onClick={() => setMobileAccordionOpen(expanded ? null : dropdownKey)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                {label}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <path
                    d="M3 6l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className={`t-mobile-accordion-panel ${expanded ? "is-open" : ""}`}>
                <div className="t-mobile-accordion-row">
                  <div className="flex flex-col gap-0.5 py-1 pl-3">
                    {NAV_DROPDOWNS[dropdownKey].map((item) => (
                      <a
                        key={item.label}
                        href="#"
                        tabIndex={mobileMenuOpen && expanded ? 0 : -1}
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[14px] text-[rgba(33,12,55,0.65)] transition hover:bg-[rgba(33,12,55,0.05)] hover:text-[#210c37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <a
          href="#"
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
          className="mt-2 rounded-lg px-3 py-2.5 transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:hidden"
        >
          Log in
        </a>
        <button
          type="button"
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
          style={{ backgroundColor: ACCENT }}
          className="mt-3 rounded-full px-5 py-3 text-center text-[15px] font-medium text-white transition duration-200 ease-out hover:brightness-110 active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:hidden"
        >
          Talk to founder
        </button>
      </nav>

      <main id="main-content">
      {/* Hero */}
      <section
        ref={heroRef}
        className="section-pad-x section-pad-y-lg hero-pad-y-mobile flex flex-col items-center gap-8 text-center sm:gap-16"
      >
        <div
          className={`area-reveal flex max-w-[860px] flex-col items-center gap-2 ${heroVisible ? "is-shown" : ""}`}
        >
          <h1 style={bricolage} className="fluid-h1 font-bold leading-[1.1] tracking-[-0.01em]">
            Your website looks ready.
            <br />
            But what might be{" "}
            <span
              className="relative inline-block"
              style={{ paddingBottom: "0.12em" }}
            >
              missing?
              <span
                aria-hidden="true"
                className="hero-scan-sweep pointer-events-none absolute inset-0 overflow-hidden"
              >
                <span
                  className="absolute inset-y-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: "64px",
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(38,83,243,0.14) 50%, transparent 100%)",
                  }}
                />
                <span
                  className="absolute left-1/2 top-0 h-[10px] w-[16px] -translate-x-1/2 rounded-t-[2px] border-l-2 border-r-2 border-t-2"
                  style={{ borderColor: "rgba(38,83,243,0.85)" }}
                />
                <span
                  className="absolute left-1/2 bottom-0 h-[10px] w-[16px] -translate-x-1/2 rounded-b-[2px] border-b-2 border-l-2 border-r-2"
                  style={{ borderColor: "rgba(38,83,243,0.85)" }}
                />
                <span
                  className="absolute inset-y-0 left-1/2"
                  style={{
                    width: "1.5px",
                    transform: "translateX(-50%)",
                    background: "rgba(38,83,243,0.85)",
                    boxShadow:
                      "0 0 3px 0.5px rgba(38,83,243,0.35), 0 0 14px 5px rgba(38,83,243,0.12), 0 0 28px 10px rgba(38,83,243,0.05)",
                  }}
                />
              </span>
            </span>
          </h1>
          <p className="max-w-[860px] text-[14px] leading-5 sm:text-[1rem] sm:leading-[calc(1.5_/_1)]">
            Privacy, accessibility, and other website requirements aren't always obvious. Verena
            uses AI to spot potential issues, show supporting evidence, and help you understand
            what to review next.
          </p>
        </div>

        <div
          className={`area-reveal hero-demo-box relative w-full max-w-[1280px] overflow-hidden rounded-[24px] bg-white shadow-sm ${heroVisible ? "is-shown" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          <img
            src={gradientBackdrop}
            alt=""
            width={2115}
            height={743}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative mx-auto flex w-[92%] max-w-[800px] flex-col items-stretch gap-2 py-9 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:py-0">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3 rounded-2xl border-0 bg-white px-4 py-4 shadow-[0_1px_8px_rgba(45,0,15,0.08)] transition focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white sm:flex-row sm:items-center sm:border sm:px-6 sm:py-4"
              style={
                {
                  borderColor: domainError ? STATUS_COLORS.deficit : "rgba(33,12,55,0.12)",
                  "--tw-ring-color": ACCENT,
                } as CSSProperties
              }
            >
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[rgba(33,12,55,0.14)] bg-[#faf9fc] px-3 py-3 sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                <VerenaMarkIcon className="h-6 w-6" />
                <label htmlFor="verena-homepage-domain" className="sr-only">
                  Website to scan
                </label>
                <input
                  ref={placeholderInputRef}
                  id="verena-homepage-domain"
                  name="domain"
                  type="text"
                  autoComplete="url"
                  value={domain}
                  onChange={(event) => {
                    setDomain(event.target.value);
                    if (domainError) setDomainError("");
                  }}
                  aria-invalid={domainError ? true : undefined}
                  aria-describedby={domainError ? "verena-homepage-domain-error" : undefined}
                  className="w-full min-w-0 flex-1 bg-transparent text-left text-[16px] leading-6 outline-none placeholder:text-[#210c37]/70"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label={
                  status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze"
                }
                style={{ backgroundColor: ACCENT }}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium text-white transition duration-200 ease-out hover:brightness-110 active:scale-[0.96] active:duration-100 disabled:cursor-not-allowed disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:w-auto"
              >
                <span key={status} className="hero-input-pop flex items-center justify-center">
                  <HeroStatusIcon status={status} />
                </span>
                {status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze"}
              </button>
            </form>
            {domainError && (
              <p
                id="verena-homepage-domain-error"
                role="alert"
                className="pl-1 text-left text-[13px] font-medium"
                style={{ color: STATUS_COLORS.deficit }}
              >
                {domainError}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 sm:gap-3">
              <span
                className="flex items-center gap-2 rounded-full bg-white/95 py-2 pl-2 pr-4 text-[14px] font-medium leading-5 shadow-[0_1px_2px_rgba(33,12,55,0.08)]"
                style={{ color: INK }}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(38,83,243,0.12)", color: ACCENT }}
                >
                  <CheckIcon />
                </span>
                Free to start
              </span>
              <span
                className="flex items-center gap-2 rounded-full bg-white/95 py-2 pl-2 pr-4 text-[14px] font-medium leading-5 shadow-[0_1px_2px_rgba(33,12,55,0.08)]"
                style={{ color: INK }}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(38,83,243,0.12)", color: ACCENT }}
                >
                  <CheckIcon />
                </span>
                5,000 free credits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted-by logo strip */}
      <section
        ref={trustedRef}
        className={`area-reveal section-pad-x section-pad-y-sm relative flex flex-col-reverse items-center gap-3 overflow-hidden sm:flex-row sm:gap-0 ${trustedVisible ? "is-shown" : ""}`}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ maskImage: LOGO_EDGE_FADE_MASK, WebkitMaskImage: LOGO_EDGE_FADE_MASK }}
        >
          <div className="logo-marquee-track flex w-max items-center gap-12">
            {MARQUEE_LOGOS.map((logo, i) => (
              <div
                key={`gray-${i}`}
                role="img"
                aria-label={logo.alt}
                className="h-10 shrink-0"
                style={{
                  width: `${logo.width}px`,
                  backgroundColor: "#D2CFD7",
                  WebkitMaskImage: `url("${logo.src}")`,
                  maskImage: `url("${logo.src}")`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
            ))}
          </div>
        </div>
        <div
          className="flex items-center justify-center px-6 sm:absolute sm:left-1/2 sm:top-1/2 sm:h-[120px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-20 sm:bg-[linear-gradient(270deg,rgba(255,255,255,0.95)_0%,rgb(255,255,255)_30%,rgb(255,255,255)_70%,rgba(255,255,255,0.95)_100%)]"
        >
          <p className="whitespace-nowrap text-[15px] font-medium leading-[27px] sm:text-[20px]">
            Trusted by 1000+ website owner
          </p>
        </div>
      </section>

      {/* Dark statement band */}
      <section
        ref={statementRef}
        style={{ backgroundColor: INK }}
        className="section-pad-x section-pad-y-lg relative flex flex-col items-center overflow-hidden text-center text-white"
      >
        <div
          className={`area-reveal relative z-10 flex max-w-[960px] flex-col items-center gap-2 ${statementVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            Website compliance shouldn't take
            <br className="hidden sm:block" />
            {" "}over your to-do list
          </h2>
          <p className="text-[14px] leading-5 sm:text-[18px] sm:leading-[27px]">
            No more piecing together information from different sources. Verena brings
            <br />
            your website review into one place.
          </p>
        </div>
        <div
          className={`area-reveal relative z-10 mt-16 w-full ${statementVisible ? "is-shown" : ""}`}
          style={{ transitionDelay: statementVisible ? "150ms" : "0ms" }}
        >
          <ComplianceFlowDiagramMobile />
          <ComplianceFlowDiagram active={statementVisible} />
        </div>
      </section>

      {/* Getting started / Analyze steps */}
      <section
        ref={(el) => {
          startedRef.current = el;
          startedInViewRef.current = el;
        }}
        style={{ backgroundColor: CREAM }}
        className="section-pad-x section-pad-y flex flex-col gap-16"
      >
        <div
          className={`area-reveal mx-auto flex w-full max-w-[960px] flex-col items-center gap-2 text-center ${startedVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            Getting started is simpler than you think
          </h2>
          <p className="text-[14px] leading-5 sm:text-[18px] sm:leading-[27px]">
            Set up your website, run an analysis, and explore the findings at your own pace.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-[1536px] gap-8 sm:grid-cols-3">
          {ANALYZE_CARDS.map((card, i) => (
            <div
              key={i}
              className={`area-reveal flex flex-col overflow-hidden rounded-2xl bg-white ${startedVisible ? "is-shown" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="p-6 pb-0">
                <div className="rounded-xl p-4" style={{ backgroundColor: "#f2f1f3" }}>
                  <AnalyzeMockup key={analyzeLoopKey} step={card.icon} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 p-8 pt-6 text-center">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(33,12,55,0.06)", color: INK }}
                >
                  <StepIcon name={card.icon} />
                </span>
                <h3 style={bricolage} className="text-[22px] font-semibold leading-tight tracking-[-0.01em] sm:text-[32px]">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6" style={{ color: INK }}>
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More than a website scan */}
      <section
        ref={scanRef}
        className="section-pad-x section-pad-y scan-section-pad-mobile flex flex-col items-center gap-16 bg-white"
      >
        <div
          className={`area-reveal flex max-w-[960px] flex-col items-center gap-2 text-center ${scanVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            More than a website scan
          </h2>
          <p className="text-[14px] leading-5 sm:text-[18px] sm:leading-[27px]">
            Explore the tools that help you understand findings, make improvements, and keep track
            of your website
          </p>
        </div>
        <div
          className={`area-reveal flex w-full max-w-[1536px] flex-col gap-10 ${scanVisible ? "is-shown" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          <div role="tablist" aria-label="Verena tools" className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12">
            {TOOL_TABS.map((tab, index) => {
              const active = tab.id === activeTool;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    toolTabRefs.current[index] = el;
                  }}
                  id={`verena-scan-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="verena-scan-tabpanel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTool(tab.id)}
                  onKeyDown={(event) => handleToolTabKeyDown(event, index)}
                  style={bricolage}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-sm pb-[9px] text-[15px] font-medium transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:text-[18px] ${
                    active ? "opacity-100" : "opacity-60 hover:opacity-85"
                  }`}
                >
                  <ToolTabIcon name={tab.icon} active={active} />
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                    style={{ backgroundColor: "rgba(33,12,55,0.1)" }}
                  />
                  <span
                    aria-hidden="true"
                    key={active ? activeTool : "idle"}
                    className={`absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full ${
                      active ? "scan-tab-fill" : ""
                    }`}
                    style={{
                      backgroundColor: ACCENT,
                      transform: active ? undefined : "scaleX(0)",
                      animationDuration: active ? `${TOOL_TAB_AUTOPLAY_MS}ms` : undefined,
                      animationPlayState: toolAutoplayPaused ? "paused" : "running",
                    }}
                  />
                </button>
              );
            })}
          </div>
          <div
            id="verena-scan-tabpanel"
            role="tabpanel"
            aria-labelledby={`verena-scan-tab-${activeTool}`}
            style={{ backgroundColor: INK }}
            className="relative flex items-end justify-center overflow-hidden rounded-[20px] pt-8"
          >
            <img
              src={gradientBackdrop}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="relative flex aspect-[4/5] w-[92%] max-w-[1080px] flex-col overflow-hidden rounded-t-2xl border-8 border-b-0 border-white/24 bg-white shadow-[0_8px_16px_rgba(33,12,55,0.08),0_32px_64px_-16px_rgba(33,12,55,0.2)] sm:aspect-[1080/450]"
            >
              <div
                className="flex items-center gap-4 border-b px-5 py-3"
                style={{ borderColor: "rgba(33,12,55,0.08)", backgroundColor: "#f5f3f0" }}
              >
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
                </div>
                <span
                  className="rounded-full bg-white px-3 py-1 text-[12px] opacity-60"
                  style={{ border: "1px solid rgba(33,12,55,0.08)" }}
                >
                  verena.ai/scan/acme.com
                </span>
              </div>
              <div className="flex-1 overflow-hidden p-5 sm:p-7">
                <div className="grid h-full">
                  {leavingTool !== null ? (
                    <div aria-hidden="true" className="stage-leaving" style={{ gridArea: "1 / 1" }}>
                      <ToolMockupBody tool={leavingTool} />
                    </div>
                  ) : null}
                  <div key={activeTool} className="stage-entering" style={{ gridArea: "1 / 1" }}>
                    <ToolMockupBody tool={activeTool} />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setToolAutoplayPaused((prev) => !prev)}
              aria-label={toolAutoplayPaused ? "Resume autoplay" : "Pause autoplay"}
              aria-pressed={toolAutoplayPaused}
              className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition duration-200 ease-out hover:scale-110 hover:bg-white/25 active:scale-90 active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {toolAutoplayPaused ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 5v14l12-7z" />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              )}
            </button>
          </div>
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-between">
            <p
              key={activeTool}
              className="tool-caption-swap text-center text-[14px] leading-5 sm:text-left sm:text-[18px] sm:leading-[27px]"
            >
              {TOOL_CAPTIONS[activeTool]}
            </p>
            <div className="flex shrink-0 items-center gap-1">
              {TOOL_TABS.map((tab) => {
                const active = tab.id === activeTool;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    aria-label={`Show ${tab.label}`}
                    aria-current={active}
                    onClick={() => setActiveTool(tab.id)}
                    className="rounded-full p-2 transition duration-200 ease-out hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                  >
                    <span
                      className="block h-2 w-2 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: active ? ACCENT : "rgba(33,12,55,0.15)" }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Six areas */}
      <section
        style={{ backgroundColor: CREAM }}
        className="section-pad-x section-pad-y flex flex-col items-center gap-8 sm:gap-16"
      >
        <div className="flex max-w-[960px] flex-col items-center gap-2 text-center">
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            Six areas. One website review.
          </h2>
          <p className="text-[14px] leading-5 sm:text-[18px] sm:leading-[27px]">
            From accessibility and privacy to cookies, policies, emails, and marketing claims
          </p>
        </div>
        <div className="grid w-full max-w-[1536px] gap-10 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col" role="group" aria-label="Review areas" aria-controls="area-detail-panel">
            {REVIEW_AREAS.map((area, index) => {
              const isActive = activeArea === index;
              return (
                <div
                  key={area.title}
                  className={index > 0 ? "border-t" : ""}
                  style={{ borderColor: "rgba(33,12,55,0.08)" }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveArea(index)}
                    aria-pressed={isActive}
                    aria-expanded={isActive}
                    className="flex w-full items-start gap-4 rounded-2xl px-5 py-7 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                    style={{ backgroundColor: isActive ? "rgba(33,12,55,0.05)" : "transparent" }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          style={{ ...bricolage, opacity: isActive ? 1 : 0.6 }}
                          className="text-[22px] font-semibold tracking-[-0.01em] transition-opacity sm:text-[26px]"
                        >
                          {area.title}
                        </span>
                        <span
                          className="shrink-0 text-[13px] font-medium transition-colors"
                          style={isActive ? { color: area.statusColor } : { color: INK, opacity: 0.6 }}
                        >
                          {area.status}
                        </span>
                      </div>
                      {isActive ? (
                        <p className="mt-2 max-w-[520px] text-[16px] leading-6 opacity-70">{area.body}</p>
                      ) : null}
                    </div>
                  </button>
                  <div className="lg:hidden">
                    <div className={`area-accordion-body ${isActive ? "is-open" : ""}`}>
                      <div className="overflow-hidden">
                        <div
                          className="relative mb-6 flex min-h-[420px] items-stretch justify-center overflow-hidden rounded-[20px] p-4"
                          style={{ backgroundColor: CREAM }}
                        >
                          <img
                            src={gradientBackdrop}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                          <div className="relative w-full max-w-[500px]">
                            <AreaDetailCard area={area} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            id="area-detail-panel"
            className="hidden min-h-[520px] items-stretch justify-center overflow-hidden rounded-[20px] p-4 sm:p-8 lg:relative lg:flex lg:sticky lg:top-24 lg:self-start"
            style={{ backgroundColor: CREAM }}
          >
            <img src={gradientBackdrop} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative grid w-full max-w-[500px]">
              {leavingArea !== null ? (
                <div
                  aria-hidden="true"
                  className="stage-leaving"
                  style={{ gridArea: "1 / 1" }}
                >
                  <AreaDetailCard area={REVIEW_AREAS[leavingArea]} />
                </div>
              ) : null}
              <div key={activeArea} className="stage-entering" style={{ gridArea: "1 / 1" }}>
                <AreaDetailCard area={REVIEW_AREAS[activeArea]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* +Human */}
      <section
        ref={(el) => {
          humanRef.current = el;
          humanOrbitSectionRef.current = el;
        }}
        style={{ backgroundColor: INK }}
        className="section-pad-x section-pad-y-lg relative flex flex-col items-center justify-center gap-8 overflow-hidden sm:gap-16 lg:min-h-[1018px]"
      >
        <img
          src={ellipse92}
          alt=""
          width={1236}
          height={818}
          loading="lazy"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[496px] w-full max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-auto sm:w-auto sm:max-w-[100%]"
        />
        {AVATAR_ORBITS.map((orbit, i) => (
          <img
            key={i}
            ref={(el) => {
              avatarRefs.current[i] = el;
            }}
            src={avatarPhoto}
            alt=""
            width={640}
            height={640}
            loading="lazy"
            className="human-orbit-avatar absolute left-1/2 top-1/2 -ml-6 -mt-6 hidden size-12 rounded-full border-2 border-[rgba(244,235,255,0.25)] object-cover lg:-ml-9 lg:-mt-9 lg:block lg:size-[72px]"
            style={
              {
                "--orbit-duration": `${AVATAR_ORBIT_DURATION}s`,
                "--orbit-delay": `${orbit.delay}s`,
                "--orbit-start-angle": `${orbit.angleDeg}deg`,
                "--stack-x": `${orbit.stackX}px`,
                "--stack-y": `${orbit.stackY}px`,
                "--stack-rotate": `${orbit.stackRotate}deg`,
                "--orbit-stagger": `${i * 70}ms`,
              } as CSSProperties
            }
          />
        ))}

        <div
          className={`area-reveal relative z-10 flex flex-col items-center gap-6 sm:gap-10 ${humanVisible ? "is-shown" : ""}`}
        >
          <div className="h-8 w-[136px] bg-white" style={{ WebkitMaskImage: `url("${invictusMask}")`, maskImage: `url("${invictusMask}")`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
          <div className="flex max-w-[960px] flex-col items-center gap-2 text-center text-white">
            <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
              When AI isn't enough, there's +Human
            </h2>
            <p className="text-[14px] leading-5 sm:text-[18px] sm:leading-[27px]">
              Access optional professional support for questions that need more than an automated
              analysis
            </p>
          </div>
        </div>
        <button
          type="button"
          style={{ backgroundColor: ACCENT, transitionDelay: "120ms" } as CSSProperties}
          className={`area-reveal relative z-10 rounded-full px-6 py-3 text-[16px] font-medium text-white transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 active:translate-y-0 active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37] ${humanVisible ? "is-shown" : ""}`}
        >
          Explore +Human
        </button>
      </section>

      {/* Pricing */}
      <section
        ref={pricingRef}
        style={{ backgroundColor: CREAM }}
        className="section-pad-x section-pad-y flex flex-col items-center gap-16"
      >
        <div
          className={`area-reveal flex max-w-[960px] flex-col items-center gap-2 text-center ${pricingVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            Choose what works for you
          </h2>
          <p className="text-[14px] leading-5 sm:text-[18px] sm:leading-[27px]">
            AI-enabled compliance review, priced by how many credits you need each month
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
        <div className="flex w-full max-w-[1200px] flex-col divide-y divide-[rgba(33,12,55,0.12)] overflow-hidden rounded-[20px] border border-[rgba(33,12,55,0.12)] bg-white">
          {PRICING_PLANS.map((plan, planIndex) => {
            const hasAddOn = Boolean(humanAddOns[plan.name]);
            const touched = Boolean(toggleTouched[plan.name]);
            const totalPrice = plan.price + (hasAddOn ? plan.addOnPrice : 0);
            return (
              <div
                key={plan.name}
                style={plan.featured ? { backgroundColor: INK, transitionDelay: `${planIndex * 80}ms` } : { transitionDelay: `${planIndex * 80}ms` }}
                className={`area-reveal flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:gap-8 xl:gap-10 ${
                  plan.featured ? "text-white" : ""
                } ${pricingVisible ? "is-shown" : ""}`}
              >
                <div className="flex flex-col gap-1 lg:w-[190px] lg:shrink-0">
                  <p style={bricolage} className="text-[20px] font-semibold tracking-[-0.01em]">
                    {plan.name}
                  </p>
                  <p className={`text-[14px] leading-5 ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1 lg:w-[150px] lg:shrink-0">
                  <div className="flex items-end gap-1">
                    <span style={bricolage} className="text-[30px] font-semibold leading-none">
                      ${totalPrice}
                    </span>
                    {plan.period && (
                      <span className={`pb-0.5 text-[14px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-[13px] font-medium ${plan.featured ? "opacity-80" : "opacity-70"}`}>
                    {plan.credits}
                  </p>
                </div>

                <ul className="flex flex-1 flex-wrap gap-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`rounded-full px-3 py-1 text-[13px] leading-5 ${
                        plan.featured ? "bg-white/10 opacity-90" : "bg-[rgba(33,12,55,0.05)] opacity-80"
                      }`}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 lg:w-[240px] lg:shrink-0">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={hasAddOn}
                    aria-label={`Add +Human review to ${plan.name}`}
                    onClick={() => toggleHumanAddOn(plan.name)}
                    className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-4 py-3 text-left transition duration-200 ease-out active:scale-[0.98] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      plan.featured
                        ? "bg-white/10 hover:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                        : "bg-[rgba(33,12,55,0.04)] hover:bg-[rgba(33,12,55,0.07)] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                    }`}
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-medium">+Human review</span>
                      <span className={`text-[11px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                        +${plan.addOnPrice}/mo · attorney-supervised
                      </span>
                    </span>
                    <span
                      className={`t-toggle relative h-6 w-10 shrink-0 rounded-full ${touched ? "is-init" : ""}`}
                      data-on={hasAddOn}
                      style={{
                        backgroundColor: hasAddOn
                          ? ACCENT
                          : plan.featured
                            ? "rgba(244,235,255,0.25)"
                            : "rgba(33,12,55,0.15)",
                      }}
                    >
                      <span className="t-toggle-thumb absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                    </span>
                  </button>

                  <button
                    type="button"
                    style={plan.featured ? { backgroundColor: ACCENT, color: "#fff" } : undefined}
                    className={`rounded-full px-5 py-3 text-[15px] font-medium transition duration-200 ease-out active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      plan.featured
                        ? "hover:-translate-y-px hover:brightness-110 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                        : "border border-[rgba(33,12,55,0.3)] hover:-translate-y-px hover:border-[rgba(33,12,55,0.5)] hover:bg-[rgba(33,12,55,0.04)] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                    }`}
                  >
                    {hasAddOn ? `${plan.cta} with +Human` : plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="section-pad-x section-pad-y flex flex-col gap-16 bg-white">
        <div
          className={`area-reveal mx-auto flex max-w-[960px] flex-col items-center gap-2 text-center ${faqVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            Good questions deserve clear answers.
          </h2>
        </div>

        <div
          className={`area-reveal mx-auto flex w-full max-w-[1200px] flex-col gap-5 ${faqVisible ? "is-shown" : ""}`}
        >
          <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap justify-center gap-2">
            {FAQ_CATEGORIES.map((category) => {
              const categoryId = toFaqId(`category-${category}`);
              const active = category === activeFaqCategory;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  id={`faq-tab-${categoryId}`}
                  aria-selected={active}
                  aria-controls={`faq-panel-${categoryId}`}
                  onClick={() => selectFaqCategory(category)}
                  className={`rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 ${
                    active
                      ? "text-white"
                      : "border border-[rgba(33,12,55,0.12)] hover:bg-[rgba(33,12,55,0.05)]"
                  }`}
                  style={active ? { backgroundColor: INK } : undefined}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[720px] flex-col">
          <div
            id={`faq-panel-${toFaqId(`category-${activeFaqCategory}`)}`}
            role="tabpanel"
            aria-labelledby={`faq-tab-${toFaqId(`category-${activeFaqCategory}`)}`}
            className="flex flex-col gap-3"
          >
            {filteredFaqItems.map((item, index) => renderFaqAccordionItem(item, index))}
          </div>
        </div>
      </section>

      {/* Explorer CTA */}
      <section ref={ctaRef} className="relative overflow-hidden" style={{ backgroundColor: CREAM }}>
        <img
          src={ctaExplorer}
          alt="A woman with a backpack standing in a wildflower meadow, pointing toward distant mountains at sunset"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-[32%_40%]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(55% 50% at 50% 18%, ${CREAM}eb 0%, ${CREAM}80 45%, transparent 75%)`,
          }}
        />
        <div
          className={`area-reveal section-pad-x relative mx-auto flex min-h-[640px] max-w-[1280px] flex-col items-center gap-8 pb-20 pt-4 text-center sm:min-h-[760px] sm:pb-28 sm:pt-6 ${ctaVisible ? "is-shown" : ""}`}
        >
          <div className="flex w-full flex-col items-center gap-2">
            <h2
              style={bricolage}
              className="fluid-h2 font-semibold leading-tight tracking-[-0.01em] sm:whitespace-nowrap"
            >
              Explore what your website is missing
            </h2>
            <p className="max-w-[560px] text-[15px] leading-6 sm:text-[18px] sm:leading-[27px]">
              Drop in your URL and Verena maps every compliance gap, with evidence and drafted fixes ready
              to ship
            </p>
          </div>

          <div className="flex w-full max-w-[560px] flex-col items-center gap-3">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex w-full flex-col gap-3 rounded-2xl border-0 bg-white px-4 py-4 text-left shadow-[0_1px_8px_rgba(45,0,15,0.08)] transition focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-[#faf9f6] sm:flex-row sm:items-center sm:border sm:px-6 sm:py-4"
              style={
                {
                  borderColor: domainError ? STATUS_COLORS.deficit : "rgba(33,12,55,0.12)",
                  "--tw-ring-color": ACCENT,
                } as CSSProperties
              }
            >
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[rgba(33,12,55,0.14)] bg-[#faf9fc] px-3 py-3 sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                <VerenaMarkIcon className="h-6 w-6" />
                <label htmlFor="verena-cta-domain" className="sr-only">
                  Website to scan
                </label>
                <input
                  id="verena-cta-domain"
                  name="domain"
                  type="text"
                  autoComplete="url"
                  placeholder="yourcompany.com"
                  value={domain}
                  onChange={(event) => {
                    setDomain(event.target.value);
                    if (domainError) setDomainError("");
                  }}
                  aria-invalid={domainError ? true : undefined}
                  aria-describedby={domainError ? "verena-cta-domain-error" : undefined}
                  className="w-full min-w-0 flex-1 bg-transparent text-left text-[16px] leading-6 outline-none placeholder:text-[#210c37]/70"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label={
                  status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze"
                }
                style={{ backgroundColor: ACCENT }}
                className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium text-white transition duration-200 ease-out hover:brightness-110 active:scale-[0.96] active:duration-100 disabled:cursor-not-allowed disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:w-auto"
              >
                <span key={status} className="hero-input-pop flex items-center justify-center">
                  <HeroStatusIcon status={status} />
                </span>
                {status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze"}
              </button>
            </form>
            {domainError && (
              <p
                id="verena-cta-domain-error"
                role="alert"
                className="text-left text-[13px] font-medium"
                style={{ color: STATUS_COLORS.deficit }}
              >
                {domainError}
              </p>
            )}
          </div>
        </div>
      </section>

      </main>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="section-pad-x relative overflow-hidden pt-12 sm:pt-[clamp(5rem,4rem+2.5vw,7rem)]"
        style={{ backgroundColor: INK, color: "rgba(250, 249, 246, 0.7)" }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div
            className={`area-reveal grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-6 ${footerVisible ? "is-shown" : ""}`}
          >
            <div className="lg:col-span-2">
              <img
                src={verenaLogo}
                alt="Verena"
                width={1690}
                height={365}
                loading="lazy"
                className="h-9 w-auto object-contain brightness-0 invert sm:h-7"
              />
              <p className="mt-3 max-w-[280px] text-sm leading-[21px]">A product of Invictus AI.</p>
              <p className="mt-3 text-xs leading-[18px]" style={{ color: "rgba(250, 249, 246, 0.6)" }}>
                548 Market St, Suite 200
                <br />
                San Francisco, CA 94104
              </p>

              <div className="mt-4 flex items-center gap-2.5 sm:mt-5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.icon}
                    href="#"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[rgba(250,249,246,0.14)] hover:text-white active:translate-y-0 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
                    style={{ backgroundColor: "rgba(250, 249, 246, 0.07)" }}
                  >
                    <FooterIcon name={social.icon} size={15} />
                  </a>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: "rgba(250, 249, 246, 0.07)", color: "rgba(250, 249, 246, 0.6)" }}
                  >
                    <FooterIcon name={badge.icon} size={12} />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p
                  style={{ ...bricolage, color: "rgba(250, 249, 246, 0.6)" }}
                  className="text-xs font-semibold uppercase tracking-[0.1em]"
                >
                  {group.title}
                </p>
                <ul className="mt-1.5 flex flex-col text-sm">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block rounded-sm py-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37] sm:py-2.5"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className={`area-reveal mt-8 flex flex-col gap-3 border-t pt-5 text-xs sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6 ${footerVisible ? "is-shown" : ""}`}
            style={{
              borderColor: "rgba(250, 249, 246, 0.12)",
              color: "rgba(250, 249, 246, 0.6)",
              transitionDelay: "100ms",
            }}
          >
            <p>© {new Date().getFullYear()} Invictus AI. All rights reserved.</p>
            <p>Verena is in beta. Check important results before you act on them.</p>
          </div>
        </div>

        {/* Bleeding brand wordmark */}
        <div className="relative mt-8 h-[90px] select-none overflow-hidden sm:h-[150px] lg:h-[190px]" aria-hidden>
          <p
            className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-semibold leading-none tracking-tight"
            style={{
              ...bricolage,
              fontSize: "clamp(6rem, 20vw, 16rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(250, 249, 246, 0.14)",
            }}
          >
            Verena
          </p>
        </div>
      </footer>
    </div>
  );
}
