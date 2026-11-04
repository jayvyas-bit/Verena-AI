import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { useDocumentHead } from "../../lib/useDocumentHead";
import verenaLogo from "../../assets/homepage/image-15.png";
import gradientBackdrop from "../../assets/homepage/image-19.png";
import analyzeScreenshot from "../../assets/homepage/screenshot-analyze.png";
import invictusMask from "../../assets/homepage/rectangle-34.png";
import avatarPhoto from "../../assets/homepage/avatar.png";
import ellipse92 from "../../assets/homepage/ellipse-92.svg";
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

const NAV_DROPDOWNS = {
  Product: [
    { label: "Overview", body: "What Verena checks and why it matters" },
    { label: "+Human", body: "Optional attorney-supervised review for your findings" },
    { label: "Pricing", body: "Credit-based plans for every team size" },
  ],
  Resources: [
    { label: "Trust Center", body: "How Verena handles your website's data" },
    { label: "Compliance Guides", body: "Walkthroughs for common fixes" },
    { label: "Help Center", body: "Answers to setup and billing questions" },
  ],
} satisfies Record<string, Array<{ label: string; body: string }>>;

type NavDropdownKey = keyof typeof NAV_DROPDOWNS;

const COMPANY_LOGOS: Array<{ src: string; alt: string; width: number }> = [
  { src: companyAirbnb, alt: "Airbnb", width: 128 },
  { src: companyLogoA, alt: "Adobe", width: 133 },
  { src: companyLogoB, alt: "Airtasker", width: 144 },
  { src: companyLogoC, alt: "Amplitude", width: 194 },
  { src: companyLogoD, alt: "Atlassian", width: 178 },
  { src: companyFivetran, alt: "Fivetran", width: 162 },
  { src: companyPayPal, alt: "PayPal", width: 143 },
  { src: companyBookingCom, alt: "Booking.com", width: 165 },
  { src: companyPostman, alt: "Postman", width: 152 },
  { src: companySpotify, alt: "Spotify", width: 140 },
  { src: companyOutreach, alt: "Outreach", width: 169 },
];

const MARQUEE_LOGOS = [...COMPANY_LOGOS, ...COMPANY_LOGOS];

const LOGO_SPOTLIGHT_MASK =
  "linear-gradient(to right, transparent 0%, transparent calc(10% - 130px), black calc(10% - 40px), black calc(10% + 40px), transparent calc(10% + 130px), transparent calc(90% - 130px), black calc(90% - 40px), black calc(90% + 40px), transparent calc(90% + 130px), transparent 100%)";

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
  { id: "reports", icon: "file" as const, label: "Reports & Evidence" },
  { id: "drafts", icon: "edit" as const, label: "AI-Drafted Document Changes" },
  { id: "code", icon: "code" as const, label: "Developer-Ready Code Suggestions" },
  { id: "monitor", icon: "refresh" as const, label: "Monitoring & Rechecks" },
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
    statusColor: "#e4572e",
    icon: "accessibility" as const,
  },
  {
    title: "Privacy Policy",
    body: "Check whether your policy clearly explains how personal information is collected and used.",
    status: "Needs review",
    statusColor: "#eab308",
    icon: "privacy" as const,
  },
  {
    title: "Cookies & Trackers",
    body: "See which tracking tools may be running and where consent needs attention.",
    status: "2 trackers flagged",
    statusColor: "#e4572e",
    icon: "cookies" as const,
  },
  {
    title: "Terms of Service",
    body: "Find potential gaps or unclear wording in your website's terms.",
    status: "No issues found",
    statusColor: "#16a34a",
    icon: "document" as const,
  },
  {
    title: "Commercial Email",
    body: "Review supported email-related requirements, including relevant disclosures and consent practices.",
    status: "1 issue found",
    statusColor: "#eab308",
    icon: "email" as const,
  },
  {
    title: "Marketing Claims",
    body: "Spot promotional claims that may need stronger evidence or clearer wording.",
    status: "No issues found",
    statusColor: "#16a34a",
    icon: "megaphone" as const,
  },
];

const AVATAR_ORBIT_DURATION = 34;
const AVATAR_ORBIT_COUNT = 6;
const AVATAR_ORBITS = Array.from({ length: AVATAR_ORBIT_COUNT }, (_, i) => {
  const fraction = i / AVATAR_ORBIT_COUNT;
  return { delay: -(fraction * AVATAR_ORBIT_DURATION), progress: fraction * 100 };
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

const FAQ_ITEMS = [
  {
    q: "What exactly does Verena check?",
    a: "Verena reviews your website across six areas: accessibility, privacy policy, cookies & trackers, terms of service, commercial email, and marketing claims. Each finding comes with supporting evidence, not just a flag.",
  },
  {
    q: "Is this a replacement for legal advice?",
    a: "No. Verena surfaces potential issues and evidence so you know what to look into. For anything that needs a professional sign-off, +Human connects you with someone who can review it.",
  },
  {
    q: "How long does an analysis take?",
    a: "Most websites finish in a few minutes. Larger sites with more pages may take longer, and you'll see progress as each area completes.",
  },
  {
    q: "What happens to my data?",
    a: "We only analyze what's publicly visible on your website. Nothing is sold or shared, and you can delete your account and its data at any time.",
  },
  {
    q: "What's included in +Human?",
    a: "Optional access to a professional who reviews specific findings with you, for questions an automated analysis can't fully answer on its own.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Pro is month to month with no lock-in, and you keep access through the end of the billing period you've already paid for.",
  },
];

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

function ChevronIcon({ open }: { open: boolean }) {
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
      className="shrink-0 transition-transform duration-300"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
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

function StepIcon({ name, size = 22 }: { name: "website" | "scan" | "findings"; size?: number }) {
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
    case "website":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
          <path d="M5 12h14" />
        </svg>
      );
    case "findings":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.5-4.5M9 11l1.4 1.4L14 9" />
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

function NavMenuIcon({ open }: { open: boolean }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (open) {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
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

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(dropdownKey!)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button
        ref={triggerRef}
        type="button"
        className="flex items-center gap-1 rounded-sm text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
        aria-haspopup="menu"
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

      {isOpen && (
        <div className="absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3" role="menu">
          <div className="rounded-2xl bg-white p-2 shadow-lg ring-1 ring-[rgba(33,12,55,0.08)]">
            {items.map((item) => (
              <a
                key={item.label}
                href="#"
                role="menuitem"
                className="block rounded-xl px-3 py-2.5 text-left transition hover:bg-[rgba(33,12,55,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-0.5 text-xs opacity-60">{item.body}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const MOCKUP_FINDINGS = [
  { title: "Accessibility", detail: "Image missing alt text — 3 instances found", severity: "#e4572e" },
  { title: "Privacy Policy", detail: "Data-sharing clause needs clearer wording", severity: "#eab308" },
  { title: "Cookies & Trackers", detail: "2 trackers load before consent is given", severity: "#e4572e" },
  { title: "Terms of Service", detail: "No issues found in this section", severity: "#16a34a" },
];

const MOCKUP_RECHECKS = [
  { title: "Accessibility", checked: "2 days ago", status: "Passing", statusColor: "#16a34a", trend: "+4%" },
  { title: "Privacy Policy", checked: "2 days ago", status: "1 new issue", statusColor: "#e4572e", trend: "-2%" },
  { title: "Cookies & Trackers", checked: "5 days ago", status: "Passing", statusColor: "#16a34a", trend: "+1%" },
  { title: "Marketing Claims", checked: "5 days ago", status: "Passing", statusColor: "#16a34a", trend: "0%" },
];

function ToolMockupBody({ tool }: { tool: (typeof TOOL_TABS)[number]["id"] }) {
  if (tool === "reports") {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <p style={bricolage} className="text-[15px] font-semibold">acme.com — Full Report</p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: "rgba(22,163,74,0.1)", color: "#16a34a" }}
          >
            Analysis complete
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          {MOCKUP_FINDINGS.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5"
              style={{ border: "1px solid rgba(33,12,55,0.08)" }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: f.severity }} />
              <p className="w-[140px] shrink-0 text-[13px] font-medium">{f.title}</p>
              <p className="flex-1 truncate text-[13px] opacity-60">{f.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tool === "drafts") {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <p style={bricolage} className="text-[15px] font-semibold">Privacy Policy — Suggested edit</p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
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
          <span className="rounded px-1 line-through" style={{ backgroundColor: "rgba(228,87,46,0.12)", color: "#e4572e" }}>
            may share
          </span>{" "}
          <span className="rounded px-1" style={{ backgroundColor: "rgba(22,163,74,0.12)", color: "#16a34a" }}>
            do not share
          </span>{" "}
          your personal information with third-party advertisers without your consent. Information is only
          used to{" "}
          <span className="rounded px-1" style={{ backgroundColor: "rgba(22,163,74,0.12)", color: "#16a34a" }}>
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
        <div className="flex items-center justify-between">
          <p style={bricolage} className="text-[15px] font-semibold">Suggested fix — ContactForm.tsx</p>
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
          >
            Accessibility
          </span>
        </div>
        <div className="flex-1 overflow-hidden rounded-[10px] p-4 font-mono text-[12.5px] leading-6" style={{ backgroundColor: INK, color: "rgba(250,249,246,0.85)" }}>
          <p style={{ color: "rgba(250,249,246,0.4)" }}>{"<form onSubmit={handleSubmit}>"}</p>
          <p className="rounded px-1" style={{ backgroundColor: "rgba(228,87,46,0.18)" }}>
            {"-  <input type=\"email\" placeholder=\"Email\" />"}
          </p>
          <p className="rounded px-1" style={{ backgroundColor: "rgba(22,163,74,0.18)" }}>
            {"+  <input type=\"email\" placeholder=\"Email\" aria-label=\"Email address\" required />"}
          </p>
          <p style={{ color: "rgba(250,249,246,0.4)" }}>{"</form>"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <p style={bricolage} className="text-[15px] font-semibold">Monitoring — Weekly recheck</p>
        <span
          className="rounded-full px-2.5 py-1 text-[11px] font-medium"
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
            <p className="w-[150px] shrink-0 text-[13px] font-medium">{r.title}</p>
            <p className="w-[100px] shrink-0 text-[12px] opacity-70">{r.checked}</p>
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

export function VerenaHomepage() {
  useDocumentHead({
    title: "Verena — AI Website Compliance Scans | Invictus AI",
    description:
      "Scan your website for accessibility, privacy, cookie, and compliance issues with AI, backed by attorney-reviewed fixes through +Human. Start free.",
  });

  const [activeTool, setActiveTool] = useState<(typeof TOOL_TABS)[number]["id"]>(
    TOOL_TABS[0].id,
  );

  const [activeArea, setActiveArea] = useState(0);

  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [placeholderText, setPlaceholderText] = useState("");
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

    function tick() {
      const phrase = PLACEHOLDER_EXAMPLES[phraseIndex];
      if (phase === "typing") {
        charIndex += 1;
        setPlaceholderText(phrase.slice(0, charIndex));
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
        setPlaceholderText(phrase.slice(0, charIndex));
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
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  const [humanAddOns, setHumanAddOns] = useState<Record<string, boolean>>({});
  const [toggleTouched, setToggleTouched] = useState<Record<string, boolean>>({});

  function toggleHumanAddOn(name: string) {
    setToggleTouched((prev) => ({ ...prev, [name]: true }));
    setHumanAddOns((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  const [statementRef, statementVisible] = useReveal<HTMLElement>();
  const [startedRef, startedVisible] = useReveal<HTMLElement>();
  const [scanRef, scanVisible] = useReveal<HTMLElement>();
  const [areasSectionRef, areasVisible] = useReveal<HTMLElement>();
  const [humanRef, humanVisible] = useReveal<HTMLElement>();
  const [pricingRef, pricingVisible] = useReveal<HTMLElement>();
  const [faqRef, faqVisible] = useReveal<HTMLElement>();
  const [finalCtaRef, finalCtaVisible] = useReveal<HTMLElement>();

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveTool((prev) => {
        const currentIndex = TOOL_TABS.findIndex((tab) => tab.id === prev);
        const nextIndex = (currentIndex + 1) % TOOL_TABS.length;
        return TOOL_TABS[nextIndex].id;
      });
    }, TOOL_TAB_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [activeTool]);

  return (
    <div style={{ color: INK }} className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      {/* Announcement bar */}
      {announcementVisible && (
        <div
          style={{ backgroundColor: INK }}
          className="relative flex h-10 items-center justify-center px-10 text-center"
        >
          <p className="text-[12px] leading-[27px] text-white [font-weight:300]">
            We're in Beta! Explore Verena early and help shape what's next.
          </p>
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-white transition hover:bg-[rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
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
      )}

      {/* Nav */}
      <div className="sticky top-0 z-30 bg-white">
        <header className="mx-auto flex h-20 items-center justify-between gap-6 px-6 sm:px-12">
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
              className="rounded-[10px] px-5 py-3 text-sm font-medium text-white transition hover:brightness-95 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
            >
              Talk to founder
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="verena-homepage-mobile-nav"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-[rgba(33,12,55,0.05)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 md:hidden"
            >
              <NavMenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <nav
            id="verena-homepage-mobile-nav"
            className="flex flex-col gap-1 border-t px-6 py-4 text-sm font-medium md:hidden"
            style={{ borderColor: "rgba(33,12,55,0.1)" }}
          >
            {["Product", "Pricing", "Resources", "Contact us"].map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>

      <div>
      {/* Hero */}
      <section className="flex flex-col items-center gap-16 px-4 py-24 text-center sm:py-32">
        <div className="flex max-w-[860px] flex-col items-center gap-2">
          <h1 style={bricolage} className="text-[40px] font-bold leading-[1.1] tracking-[-0.01em] sm:text-[56px] md:text-[64px]">
            Your website looks ready.
            <br />
            But what might be{" "}
            <span
              className="relative inline overflow-hidden"
              style={{ paddingBottom: "0.12em" }}
            >
              missing?
              <span
                aria-hidden="true"
                className="hero-scan-sweep pointer-events-none absolute inset-0"
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
          <p className="max-w-[860px] text-[1rem] leading-[calc(1.5_/_1)]">
            Privacy, accessibility, and other website requirements aren't always obvious. Verena
            uses AI to spot potential issues, show supporting evidence, and help you understand
            what to review next.
          </p>
        </div>

        <div className="relative h-[280px] w-full max-w-[1280px] overflow-hidden rounded-[24px] bg-white shadow-sm sm:h-[360px] md:h-[450px]">
          <img
            src={gradientBackdrop}
            alt=""
            width={2115}
            height={743}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute left-1/2 top-1/2 flex w-[92%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col items-stretch gap-2">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex items-center gap-3 rounded-xl border bg-white px-6 py-5 shadow-[0_1px_8px_rgba(45,0,15,0.08)] transition focus-within:ring-2"
              style={
                {
                  borderColor: domainError ? "#e4572e" : "rgba(33,12,55,0.12)",
                  "--tw-ring-color": INK,
                } as CSSProperties
              }
            >
              <div className="h-6 w-6 shrink-0 overflow-hidden">
                <img
                  src={verenaLogo}
                  alt=""
                  className="h-[102%] w-[474%] max-w-none"
                  style={{ marginLeft: "-23%", marginTop: "-2%" }}
                />
              </div>
              <label htmlFor="verena-homepage-domain" className="sr-only">
                Website to scan
              </label>
              <input
                id="verena-homepage-domain"
                name="domain"
                type="text"
                autoComplete="url"
                value={domain}
                onChange={(event) => {
                  setDomain(event.target.value);
                  if (domainError) setDomainError("");
                }}
                placeholder={placeholderText}
                aria-invalid={domainError ? true : undefined}
                aria-describedby={domainError ? "verena-homepage-domain-error" : undefined}
                className="w-full min-w-0 flex-1 bg-transparent text-left text-[16px] leading-6 outline-none placeholder:text-[#210c37]/70"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label={
                  status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Submit"
                }
                style={{ backgroundColor: ACCENT }}
                className="flex shrink-0 items-center justify-center gap-2 rounded-[10px] px-5 py-4 text-sm font-medium text-white transition hover:brightness-95 active:scale-[0.97] disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
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
                style={{ color: "#e4572e" }}
              >
                {domainError}
              </p>
            )}
            <div className="flex items-center justify-center gap-8 pt-2 text-[16px] leading-6 sm:gap-10">
              <span className="flex items-center gap-2">
                <CheckIcon />
                Free to Start
              </span>
              <span className="flex items-center gap-2">
                <CheckIcon />
                5000 free credits
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted-by logo strip */}
      <section className="relative flex items-center overflow-hidden px-4 py-14 sm:py-20">
        <div className="relative w-full overflow-hidden">
          <div className="logo-marquee-track flex w-max items-center gap-14">
            {MARQUEE_LOGOS.map((logo, i) => (
              <div
                key={`gray-${i}`}
                role="img"
                aria-label={logo.alt}
                className="h-12 shrink-0"
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ maskImage: LOGO_SPOTLIGHT_MASK, WebkitMaskImage: LOGO_SPOTLIGHT_MASK }}
          >
            <div className="logo-marquee-track flex w-max items-center gap-14">
              {MARQUEE_LOGOS.map((logo, i) => (
                <img
                  key={`color-${i}`}
                  src={logo.src}
                  alt=""
                  loading="lazy"
                  className="h-12 shrink-0"
                  style={{ width: `${logo.width}px` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-1/2 flex h-[120px] -translate-x-1/2 -translate-y-1/2 items-center justify-center px-20"
          style={{
            backgroundImage:
              "linear-gradient(270deg, rgba(255,255,255,0.95) 0%, rgb(255,255,255) 30%, rgb(255,255,255) 70%, rgba(255,255,255,0.95) 100%)",
          }}
        >
          <p className="whitespace-nowrap text-[20px] font-medium leading-[27px]">
            Trusted by 1000+ website owner
          </p>
        </div>
      </section>

      {/* Dark statement band */}
      <section
        ref={statementRef}
        style={{ backgroundColor: INK }}
        className="relative flex flex-col items-center overflow-hidden px-4 py-24 text-center text-white sm:py-36"
      >
        <img
          src={ellipse92}
          alt=""
          width={1236}
          height={818}
          loading="lazy"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <div
          className={`area-reveal relative z-10 flex max-w-[794px] flex-col items-center gap-2 ${statementVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            Website compliance shouldn't take
            <br />
            over your to-do list
          </h2>
          <p className="text-[18px] leading-[27px]">
            No more piecing together information from different sources. Verena brings
            <br />
            your website review into one place.
          </p>
        </div>
      </section>

      {/* Getting started / Analyze cards */}
      <section
        ref={startedRef}
        style={{ backgroundColor: CREAM }}
        className="flex flex-col items-center gap-16 px-6 py-20 sm:px-12 sm:py-28"
      >
        <div
          className={`area-reveal flex max-w-[935px] flex-col items-center gap-2 text-center ${startedVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            Getting started is simpler than you think
          </h2>
          <p className="text-[18px] leading-[27px]">
            Set up your website, run an analysis, and explore the findings at your own pace.
          </p>
        </div>
        <div className="grid w-full max-w-[1536px] gap-8 sm:grid-cols-3">
          {ANALYZE_CARDS.map((card, i) => (
            <div
              key={i}
              className={`area-reveal flex flex-col gap-8 rounded-[20px] bg-white p-8 ${startedVisible ? "is-shown" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <img
                src={analyzeScreenshot}
                alt=""
                loading="lazy"
                className="aspect-[393/232] w-full rounded-lg object-cover"
              />
              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
                >
                  <StepIcon name={card.icon} />
                </div>
                <h3 style={bricolage} className="w-full text-[32px] font-semibold tracking-[-0.01em]">
                  {card.title}
                </h3>
                <p className="w-full text-[16px] leading-6">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More than a website scan */}
      <section
        ref={scanRef}
        className="flex flex-col items-center gap-16 bg-white px-6 py-20 sm:px-12 sm:py-28"
      >
        <div
          className={`area-reveal flex max-w-[595px] flex-col items-center gap-2 text-center ${scanVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            More than a website scan
          </h2>
          <p className="text-[18px] leading-[27px]">
            Explore the tools that help you understand findings, make improvements, and keep track
            of your website
          </p>
        </div>
        <div
          className={`area-reveal flex w-full max-w-[1536px] flex-col gap-10 ${scanVisible ? "is-shown" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          <div role="tablist" aria-label="Verena tools" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-12">
            {TOOL_TABS.map((tab) => {
              const active = tab.id === activeTool;
              return (
                <button
                  key={tab.id}
                  id={`verena-scan-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="verena-scan-tabpanel"
                  onClick={() => setActiveTool(tab.id)}
                  style={bricolage}
                  className={`relative flex items-center gap-2 whitespace-nowrap rounded-sm pb-[9px] text-[16px] font-medium transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:text-[18px] ${
                    active ? "opacity-100" : "opacity-60 hover:opacity-85"
                  }`}
                >
                  <ToolTabIcon name={tab.icon} active={active} />
                  {tab.label}
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
            <div className="relative flex aspect-[1080/450] w-[92%] max-w-[1080px] flex-col overflow-hidden rounded-t-2xl border-8 border-b-0 border-white/24 bg-white shadow-2xl">
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
                <div key={activeTool} className="tool-fade-in h-full">
                  <ToolMockupBody tool={activeTool} />
                </div>
              </div>
            </div>
          </div>
          <p key={activeTool} className="tool-fade-in text-[18px] leading-[27px]">
            {TOOL_CAPTIONS[activeTool]}
          </p>
        </div>
      </section>

      {/* Six areas */}
      <section
        ref={areasSectionRef}
        style={{ backgroundColor: CREAM }}
        className="flex flex-col items-center gap-16 px-6 py-20 sm:px-12 sm:py-28"
      >
        <div
          className={`area-reveal flex max-w-[696px] flex-col items-center gap-2 text-center ${areasVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            Six areas. One website review.
          </h2>
          <p className="text-[18px] leading-[27px]">
            From accessibility and privacy to cookies, policies, emails, and marketing claims
          </p>
        </div>
        <div className="grid w-full max-w-[1536px] gap-6 lg:grid-cols-2">
          <div
            className={`area-reveal relative flex items-center justify-center overflow-hidden rounded-[20px] bg-white p-8 ${areasVisible ? "is-shown" : ""}`}
            style={{ transitionDelay: "80ms" }}
          >
            <img src={gradientBackdrop} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative flex aspect-[450/500] w-full max-w-[450px] flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <p style={bricolage} className="text-[15px] font-semibold">
                  acme.com — Review summary
                </p>
                <span
                  className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                  style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
                >
                  6 areas scanned
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                {REVIEW_AREAS.map((area, index) => {
                  const isActive = activeArea === index;
                  return (
                    <button
                      key={area.title}
                      type="button"
                      onClick={() => setActiveArea(index)}
                      aria-pressed={isActive}
                      className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                      style={{
                        border: `1px solid ${isActive ? area.statusColor : "rgba(33,12,55,0.08)"}`,
                        backgroundColor: isActive ? `${area.statusColor}14` : "transparent",
                        opacity: isActive ? 1 : 0.55,
                      }}
                    >
                      <AreaIcon name={area.icon} size={16} />
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: area.statusColor }}
                      />
                      <p className="flex-1 truncate text-[13px] font-medium">{area.title}</p>
                      <p className="shrink-0 text-[12px] opacity-60">{area.status}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 rounded-[20px] bg-white p-4 sm:p-6">
            {REVIEW_AREAS.map((area, index) => {
              const isOpen = activeArea === index;
              return (
                <div
                  key={area.title}
                  className={`area-reveal ${areasVisible ? "is-shown" : ""} ${
                    index > 0 ? "border-t" : ""
                  }`}
                  style={{ transitionDelay: `${160 + index * 90}ms`, borderColor: "rgba(33,12,55,0.08)" }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveArea(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 rounded-[10px] px-2 py-4 text-left transition hover:bg-[rgba(33,12,55,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:px-4"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "rgba(33,12,55,0.06)" }}
                    >
                      <AreaIcon name={area.icon} size={18} />
                    </div>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: area.statusColor }}
                    />
                    <span
                      style={bricolage}
                      className={`flex-1 text-[20px] font-semibold transition-opacity sm:text-[24px] ${
                        isOpen ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {area.title}
                    </span>
                    <span className="hidden shrink-0 text-[13px] font-medium opacity-60 sm:block">
                      {area.status}
                    </span>
                    <ChevronIcon open={isOpen} />
                  </button>
                  <div className={`area-accordion-body ${isOpen ? "is-open" : ""}`}>
                    <div className="overflow-hidden">
                      <p className="px-2 pb-4 text-[16px] leading-6 opacity-80 sm:px-4">{area.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* +Human */}
      <section
        ref={humanRef}
        style={{ backgroundColor: INK }}
        className="relative flex min-h-[1018px] flex-col items-center justify-center gap-16 overflow-hidden px-4 py-24 sm:py-36"
      >
        <img
          src={ellipse92}
          alt=""
          width={1236}
          height={818}
          loading="lazy"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        {AVATAR_ORBITS.map((orbit, i) => (
          <img
            key={i}
            src={avatarPhoto}
            alt=""
            loading="lazy"
            className="human-orbit-avatar absolute left-1/2 top-1/2 -ml-9 -mt-9 size-[72px] rounded-full border-2 border-[rgba(244,235,255,0.25)] object-cover"
            style={
              {
                "--orbit-duration": `${AVATAR_ORBIT_DURATION}s`,
                "--orbit-delay": `${orbit.delay}s`,
                "--orbit-progress": `${orbit.progress}%`,
              } as CSSProperties
            }
          />
        ))}

        <div
          className={`area-reveal relative z-10 flex flex-col items-center gap-10 ${humanVisible ? "is-shown" : ""}`}
        >
          <div className="h-8 w-[136px] bg-white" style={{ WebkitMaskImage: `url("${invictusMask}")`, maskImage: `url("${invictusMask}")`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
          <div className="flex max-w-[861px] flex-col items-center gap-2 text-center text-white">
            <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
              When AI isn't enough, there's +Human
            </h2>
            <p className="text-[18px] leading-[27px]">
              Access optional professional support for questions that need more than an automated
              analysis
            </p>
          </div>
        </div>
        <button
          type="button"
          style={{ backgroundColor: ACCENT, transitionDelay: "120ms" } as CSSProperties}
          className={`area-reveal relative z-10 rounded-[10px] px-6 py-3 text-[16px] font-medium text-white transition hover:brightness-95 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37] ${humanVisible ? "is-shown" : ""}`}
        >
          Explore +Human
        </button>
      </section>

      {/* Pricing */}
      <section
        ref={pricingRef}
        style={{ backgroundColor: CREAM }}
        className="flex flex-col items-center gap-16 px-6 py-20 sm:px-12 sm:py-28"
      >
        <div
          className={`area-reveal flex max-w-[636px] flex-col items-center gap-2 text-center ${pricingVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            Choose what works for you
          </h2>
          <p className="text-[18px] leading-[27px]">
            AI-enabled compliance review, priced by how many credits you need each month
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
        <div className="grid w-full max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan, planIndex) => {
            const hasAddOn = Boolean(humanAddOns[plan.name]);
            const touched = Boolean(toggleTouched[plan.name]);
            const totalPrice = plan.price + (hasAddOn ? plan.addOnPrice : 0);
            return (
              <div
                key={plan.name}
                style={plan.featured ? { backgroundColor: INK, transitionDelay: `${planIndex * 80}ms` } : { transitionDelay: `${planIndex * 80}ms` }}
                className={`area-reveal flex flex-col gap-6 rounded-[20px] p-8 ${
                  plan.featured ? "text-white" : "border border-[rgba(33,12,55,0.12)] bg-white"
                } ${pricingVisible ? "is-shown" : ""}`}
              >
                <div className="flex flex-col gap-2">
                  <p style={bricolage} className="text-[18px] font-semibold">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span style={bricolage} className="text-[36px] font-semibold leading-none">
                      ${totalPrice}
                    </span>
                    {plan.period && (
                      <span className={`pb-1 text-[16px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-[16px] font-medium ${plan.featured ? "opacity-90" : "opacity-80"}`}>
                    {plan.credits}
                  </p>
                  <p className={`text-[14px] leading-5 ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-[14px] leading-5 ${
                        plan.featured ? "opacity-90" : "opacity-80"
                      }`}
                    >
                      <span className="mt-0.5 shrink-0" style={{ color: plan.featured ? ACCENT : INK }}>
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  role="switch"
                  aria-checked={hasAddOn}
                  aria-label={`Add +Human review to ${plan.name}`}
                  data-on={hasAddOn}
                  onClick={() => toggleHumanAddOn(plan.name)}
                  className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    plan.featured
                      ? "bg-white/10 hover:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                      : "bg-[rgba(33,12,55,0.04)] hover:bg-[rgba(33,12,55,0.07)] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                  }`}
                >
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[14px] font-medium">+Human review</span>
                    <span className={`text-[12px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                      +${plan.addOnPrice}/mo · attorney-supervised
                    </span>
                  </span>
                  <span
                    className={`t-toggle relative h-6 w-10 shrink-0 rounded-full ${touched ? "is-init" : ""}`}
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
                  className={`mt-auto rounded-[10px] px-5 py-3 text-sm font-medium transition active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    plan.featured
                      ? "hover:brightness-95 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                      : "border border-[rgba(33,12,55,0.3)] hover:bg-[rgba(33,12,55,0.04)] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                  }`}
                >
                  {hasAddOn ? `${plan.cta} with +Human` : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

          <p className="max-w-[500px] text-[16px] leading-6 opacity-70">
            Toggle +Human on any plan for an attorney-supervised review from Invictus Counsel.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        ref={faqRef}
        className="flex flex-col items-center gap-16 bg-white px-4 py-20 text-center sm:py-28"
      >
        <div
          className={`area-reveal flex max-w-[909px] flex-col items-center gap-2 ${faqVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            Good questions deserve clear answers.
          </h2>
          <p className="text-[18px] leading-[27px]">
            Straightforward answers about Verena, getting started, and professional support
          </p>
        </div>

        <div className="flex w-full max-w-[760px] flex-col text-left">
          {FAQ_ITEMS.map((item, index) => (
            <details
              key={item.q}
              className={`area-reveal group border-b border-[rgba(33,12,55,0.12)] ${faqVisible ? "is-shown" : ""}`}
              style={{ transitionDelay: `${Math.min(index, 4) * 70}ms` }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg px-2 py-6 transition-colors hover:bg-[rgba(33,12,55,0.03)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2">
                <span style={bricolage} className="text-[18px] font-medium sm:text-[20px]">
                  {item.q}
                </span>
                <span className="relative h-4 w-4 shrink-0">
                  <span
                    className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2"
                    style={{ backgroundColor: INK }}
                  />
                  <span
                    className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rotate-90 transition-transform duration-200 ease-out group-open:rotate-0"
                    style={{ backgroundColor: INK }}
                  />
                </span>
              </summary>
              <p className="mb-6 max-w-[680px] px-2 text-[16px] leading-6 opacity-70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={finalCtaRef}
        style={{ backgroundColor: CREAM }}
        className="flex flex-col items-center gap-12 px-4 py-24 text-center sm:py-36"
      >
        <div
          className={`area-reveal flex max-w-[691px] flex-col items-center gap-2 ${finalCtaVisible ? "is-shown" : ""}`}
        >
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight tracking-[-0.01em] sm:text-[48px]">
            Your website. Your next move.
          </h2>
          <p className="text-[18px] leading-[27px]">
            Start with your URL and take the first step toward understanding your website's
            compliance needs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className={`area-reveal flex w-full max-w-[600px] flex-col items-stretch gap-2 ${finalCtaVisible ? "is-shown" : ""}`}
          style={{ transitionDelay: "120ms" }}
        >
          <div className="flex w-full flex-col items-center gap-4 sm:flex-row">
            <div
              className="flex h-14 w-full items-center rounded-[10px] border bg-white px-5 transition focus-within:ring-2"
              style={
                {
                  borderColor: domainError ? "#e4572e" : "rgba(33,12,55,0.12)",
                  "--tw-ring-color": INK,
                } as CSSProperties
              }
            >
              <label htmlFor="verena-final-cta-domain" className="sr-only">
                Website to scan
              </label>
              <input
                id="verena-final-cta-domain"
                name="domain"
                type="text"
                autoComplete="url"
                value={domain}
                onChange={(event) => {
                  setDomain(event.target.value);
                  if (domainError) setDomainError("");
                }}
                placeholder="yourwebsite.com"
                aria-invalid={domainError ? true : undefined}
                aria-describedby={domainError ? "verena-final-cta-domain-error" : undefined}
                className="w-full min-w-0 flex-1 bg-transparent text-left text-[16px] leading-6 outline-none placeholder:text-[#210c37]/70"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              style={{ backgroundColor: ACCENT }}
              className="h-14 w-full shrink-0 rounded-[10px] px-6 text-sm font-medium text-white transition hover:brightness-95 active:scale-[0.97] disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:w-auto"
            >
              {status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze for free"}
            </button>
          </div>
          {domainError && (
            <p
              id="verena-final-cta-domain-error"
              role="alert"
              className="pl-1 text-left text-[13px] font-medium"
              style={{ color: "#e4572e" }}
            >
              {domainError}
            </p>
          )}
        </form>
      </section>
      </div>

      {/* Footer */}
      <footer
        className="relative overflow-hidden px-6 pt-20 sm:px-12 sm:pt-28"
        style={{ backgroundColor: INK, color: "rgba(250, 249, 246, 0.7)" }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <img
                src={verenaLogo}
                alt="Verena"
                loading="lazy"
                className="h-7 w-auto object-contain brightness-0 invert"
              />
              <p className="mt-3 max-w-[280px] text-sm leading-[21px]">A product of Invictus AI.</p>
              <p className="mt-3 text-xs leading-[18px]" style={{ color: "rgba(250, 249, 246, 0.6)" }}>
                548 Market St, Suite 200
                <br />
                San Francisco, CA 94104
              </p>

              <div className="mt-5 flex items-center gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.icon}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
                    style={{ backgroundColor: "rgba(250, 249, 246, 0.07)" }}
                  >
                    <FooterIcon name={social.icon} size={15} />
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
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
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="rounded-sm transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
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
            className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "rgba(250, 249, 246, 0.12)", color: "rgba(250, 249, 246, 0.6)" }}
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
