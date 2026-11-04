import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import verenaGem from "../../assets/verena-gem.png";

export const INK = "#2D000F";
export const ACCENT = "#FCF56F";
export const CREAM = "#FBF5EC";
export const MUTED = "#796268";

const PILLS = [
  { label: "Privacy", icon: "shield" as const },
  { label: "Accessibility", icon: "eye" as const },
  { label: "Security", icon: "lock" as const },
  { label: "SEO", icon: "trend" as const },
  { label: "Compliance", icon: "check" as const },
];

const NAV_DROPDOWNS = {
  Product: [
    { label: "Overview", body: "What Verena checks and why it matters" },
    { label: "Scan", body: "Crawl every page, policy, and form" },
    { label: "Reports", body: "Shareable findings with evidence" },
  ],
  Resources: [
    { label: "Blog", body: "Compliance and accessibility notes" },
    { label: "Guides", body: "Walkthroughs for common fixes" },
    { label: "Help center", body: "Answers to setup questions" },
  ],
} satisfies Record<string, { label: string; body: string }[]>;

type NavDropdownKey = keyof typeof NAV_DROPDOWNS;

const PLACEHOLDER_EXAMPLES = [
  "Which website should Verena review?",
  "yourcompany.com",
  "acmehealth.com/pricing",
  "mystartup.io",
];

const COMPARISON_ROWS: { before: string; after: string }[] = [
  { before: "Compliance gaps surface only after a complaint or audit.", after: "Every page, policy, and form scanned automatically, continuously." },
  { before: "Dense legal language nobody rereads once it ships.", after: "Findings explained in plain language, backed by evidence." },
  { before: "Accessibility issues get found by users, not by you.", after: "WCAG 2.1 AA issues flagged before they reach production." },
  { before: "Manual review takes days and still misses edge cases.", after: "A full compliance read takes minutes, not days." },
];

const HOW_IT_WORKS = [
  {
    n: "01",
    icon: "search" as const,
    title: "Analyze",
    tagline: "Your whole site, read line by line.",
    body: "Verena crawls every page, form, and policy, checking accessibility, privacy, terms, and cookies against current standards.",
  },
  {
    n: "02",
    icon: "sparkle" as const,
    title: "Improve",
    tagline: "Every finding comes with a next step.",
    body: "Document redlines and developer-ready code fixes, drafted for you. Judgment calls get flagged for a +Human Supervisor.",
  },
  {
    n: "03",
    icon: "eye" as const,
    title: "Monitor",
    tagline: "Verena keeps watching after day one.",
    body: "Rescans run on every deploy and weekly after that, so new gaps don't slip through. Requires a +Human account.",
  },
];

const FEATURES = [
  { icon: "eye" as const, title: "Accessibility", body: "Checked against WCAG 2.1 AA, from alt text to keyboard navigation." },
  { icon: "doc" as const, title: "Terms of Service", body: "Reviewed for clarity, required disclosures, and recent legal changes." },
  { icon: "shield" as const, title: "Privacy Policy", body: "Checked against what your site actually collects, not just what it says." },
  { icon: "cookie" as const, title: "Cookies & Trackers", body: "Every tracker on your site matched against its disclosed purpose." },
  { icon: "mail" as const, title: "Commercial Email", body: "Opt-out links, sender ID, and required disclosures, verified." },
  { icon: "trend" as const, title: "Marketing Claims", body: "Claims that need evidence, flagged before they need defending." },
];

const ANALYZE_SOURCES = [
  { path: "/checkout", group: "a11y" },
  { path: "/contact-form", group: "a11y" },
  { path: "/privacy-policy", group: "privacy" },
  { path: "/account/settings", group: "privacy" },
  { path: "/cookie-consent", group: "cookies" },
  { path: "/pricing", group: "cookies" },
] as const;

const ANALYZE_DESTINATIONS = [
  { key: "a11y", label: "Accessibility", icon: "eye" as const, tag: "A11Y" },
  { key: "privacy", label: "Privacy Policy", icon: "shield" as const, tag: "PRIVACY" },
  { key: "cookies", label: "Cookies & Trackers", icon: "cookie" as const, tag: "COOKIES" },
] as const;

const IMPROVE_FINDINGS = [
  { label: "Missing alt text", group: "codefix" },
  { label: "Cookie banner opt-out", group: "codefix" },
  { label: "Privacy policy clause 4.2", group: "redline" },
  { label: "Marketing claim unverified", group: "humanflag" },
] as const;

const IMPROVE_DESTINATIONS = [
  { key: "codefix", label: "Code fix", icon: "code" as const, tag: "CODE" },
  { key: "redline", label: "Document redline", icon: "doc" as const, tag: "REDLINE" },
  { key: "humanflag", label: "+Human Supervisor", icon: "user" as const, tag: "FLAGGED" },
] as const;

const MONITOR_EVENTS = [
  { label: "Day 0 — baseline scan", trigger: "calendar" as const, tag: "BASELINE", note: "Baseline: 2 open issues", openAfter: 2 },
  { label: "Deploy detected", trigger: "rocket" as const, tag: "FIXED", note: "Cookie banner fixed", openAfter: 1 },
  { label: "Day 7 — weekly re-scan", trigger: "calendar" as const, tag: "CLEAR", note: "No new issues", openAfter: 1 },
  { label: "Deploy detected", trigger: "rocket" as const, tag: "FOUND", note: "Alt text regressed", openAfter: 2 },
  { label: "Day 14 — weekly re-scan", trigger: "calendar" as const, tag: "FIXED", note: "Alt text fixed", openAfter: 0 },
] as const;

const PLANS = [
  {
    name: "Free",
    priceValue: 0,
    credits: 500,
    websites: "1 website",
    support: "Email support",
    note: "No credit card required",
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Starter",
    priceValue: 99,
    credits: 5000,
    websites: "Up to 3 websites",
    support: "Priority email support",
    note: "For small sites and teams",
    cta: "Choose this plan",
    featured: false,
  },
  {
    name: "Professional",
    priceValue: 299,
    credits: 25000,
    websites: "Unlimited websites",
    support: "Slack-connected alerts",
    note: "Most popular",
    cta: "Choose this plan",
    featured: true,
  },
  {
    name: "Enterprise",
    priceValue: 999,
    credits: 125000,
    websites: "Multi-site + SSO",
    support: "Dedicated onboarding",
    note: "For larger, multi-site teams",
    cta: "Choose this plan",
    featured: false,
  },
];

export const FAQS = [
  {
    category: "Plans and credits",
    items: [
      {
        q: "Can I start for free?",
        a: "Yes! Every account gets 500 credits. That is enough to run your first analysis and get your Compliance Report.",
      },
      {
        q: "How does pricing work, and what is a credit?",
        a: "Credits measure the work Verena does for you. Reading a site, producing a report, and drafting a document each consume credits, and every plan comes with a monthly allowance. Plans come in two types: Standard, where you supervise the output, and +Human, where a +Human Supervisor from Invictus Counsel supervises it with you. See the pricing above for current plans and allowances.",
      },
    ],
  },
  {
    category: "Getting started",
    items: [
      {
        q: "What do you actually check?",
        a: "Verena analyzes the public pages of your website and checks key areas, including accessibility, cookies and trackers, your privacy policy, your terms of service, your commercial email, and the claims in your marketing copy. You get one Compliance Report covering all six, showing where you stand in each area and the detail behind every finding.",
      },
      {
        q: "How long does it take, and what do I get at the end?",
        a: "You receive a Compliance Report showing where you stand, the findings behind each result, and next steps you can work through with your team. Completion time depends on the website and the work requested. After making changes, run a new analysis and compare the reports.",
      },
      {
        q: "Do I have to install anything?",
        a: "No. Nothing to install and no code to add. Verena works from your public site as it stands today, which also means it cannot slow your site down or break it.",
      },
      {
        q: "Do I need an account before I can analyze my site?",
        a: "Yes. Enter your website address, then create an account and confirm you are authorized to have the site analyzed. Entering an address alone does not start an analysis.",
      },
    ],
  },
  {
    category: "Working with Verena",
    items: [
      {
        q: "How is Verena different from an accessibility widget or overlay?",
        a: "An accessibility widget changes the interface a visitor sees. It does not replace fixing and testing the underlying website. Verena identifies barriers in your public pages and gives your developer findings and suggested changes to work through. You can add a +Human Supervisor when a finding needs professional judgment. Nothing is added to your site without your permission.",
      },
      {
        q: "Will you fix my site for me?",
        a: "Verena produces findings and suggested work; you decide what changes. It does not edit your website directly. For accessibility, you get a developer fix guide naming the element, selector, issue, and suggested change, which can include code. For privacy, terms, and cookies, you get a drafted or marked-up document. For commercial email and marketing claims, you get findings and a checklist. Your team or developer makes and tests the changes.",
      },
    ],
  },
  {
    category: "+Human and your relationship",
    items: [
      {
        q: "What is +Human, and what do I actually get?",
        a: "+Human adds a licensed professional, a +Human Supervisor from Invictus Counsel, who takes responsibility for reviewing Verena's judgment calls with you. You're only charged once your supervisor accepts the matter and countersigns; if they can't accept it, you pay nothing. Getting set up takes one Legal Services Agreement, completed in the conversation, after which you can discuss any flagged finding directly with your supervisor.",
      },
      {
        q: "Who am I actually working with?",
        a: "Two separate entities, kept deliberately distinct. Verena itself is built and run by Invictus AI Corporation, a software company, not a law firm. If you add +Human, that engagement sits with Invictus Counsel, a separate law firm, under the Legal Services Agreement you sign, and your +Human Supervisor works there. The documents always say which relationship covers what.",
      },
      {
        q: "Which of my conversations are privileged?",
        a: "Standard conversations are not privileged. A supervising relationship requires a completed Legal Services Agreement, and signing up alone does not establish it. Review the agreement with your +Human Supervisor to understand which work it covers.",
      },
    ],
  },
  {
    category: "Scope and responsibility",
    items: [
      {
        q: "Can I analyze sites for which I do not have authority?",
        a: "Verena is built for sites you own or are authorized to audit, and that is what you agree to when you sign up. If you look after websites for clients, that is exactly the case +Human is designed around, and a supervisor can tell you how to set it up.",
      },
    ],
  },
];

export const FAQS_FLAT = FAQS.flatMap((group) =>
  group.items.map((item, itemIndex) => ({
    ...item,
    category: group.category,
    id: `${group.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${itemIndex}`,
  })),
);

export const FAQ_CATEGORIES = ["All", ...FAQS.map((group) => group.category)];

function Icon({
  name,
  size = 16,
}: {
  name: "search" | "shield" | "eye" | "lock" | "trend" | "check" | "sparkle" | "arrow" | "spinner" | "menu" | "close" | "layers" | "mail" | "doc" | "cookie" | "x" | "linkedin" | "globe" | "badge-check" | "eu-stars" | "medical-cross" | "code" | "user" | "rocket" | "calendar";
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
    "aria-hidden": true,
  };
  switch (name) {
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4.3-4.3" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.5-3 7.7-7 9.5-4-1.8-7-5-7-9.5V6l7-3Z" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
          <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M15 7h6v6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12.5l2.7 2.7L16.5 9" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      );
    case "spinner":
      return (
        <svg {...common} className="verena-interactive-spin">
          <path d="M12 3a9 9 0 1 1-9 9" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3l9 5-9 5-9-5 9-5Z" />
          <path d="M3 13l9 5 9-5" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="M4.5 7l7.5 6 7.5-6" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3" width="13" height="18" rx="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" />
        </svg>
      );
    case "cookie":
      return (
        <svg {...common}>
          <path d="M20.5 12.8A8.5 8.5 0 1 1 11.2 3.5c-.2 1.3.7 2.5 2 2.5a2 2 0 0 0 2-2.1c2.6 1 4.6 3.3 5.3 5.9a2 2 0 0 0-2.1 2 2 2 0 0 0 2.1 2Z" />
          <circle cx="9.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="13" cy="15" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="9" cy="15.5" r="0.7" fill="currentColor" stroke="none" />
        </svg>
      );
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
    case "code":
      return (
        <svg {...common}>
          <path d="M8.5 7L3.5 12l5 5" />
          <path d="M15.5 7l5 5-5 5" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3.2" />
          <path d="M5.5 20c1-3.6 3.8-5.5 6.5-5.5s5.5 1.9 6.5 5.5" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M12 2.5c3 2 4.5 5.5 4.5 9.5 0 2-1 4-2 5l-2.5 2.5L9.5 17c-1-1-2-3-2-5 0-4 1.5-7.5 4.5-9.5Z" />
          <circle cx="12" cy="10.5" r="1.6" />
          <path d="M9 16.5l-2 4M15 16.5l2 4" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M4 10h16M8 3.5v3M16 3.5v3" />
        </svg>
      );
  }
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
  const isOpen = dropdownKey ? openDropdown === dropdownKey : false;

  if (!items) {
    return <span>{label}</span>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(dropdownKey!)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <button
        type="button"
        className="flex items-center gap-1"
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
          className="transition duration-200"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3"
          role="menu"
        >
          <div className="rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5">
            {items.map((item) => (
              <a
                key={item.label}
                href="#"
                role="menuitem"
                className="block rounded-xl px-3 py-2.5 text-left transition hover:bg-black/[0.04]"
                style={{ color: INK }}
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-0.5 text-xs" style={{ color: MUTED }}>
                  {item.body}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GemMark({ size = 26 }: { size?: number }) {
  return <img src={verenaGem} alt="" width={size} height={size} style={{ objectFit: "contain" }} aria-hidden />;
}

// transitions.dev "number pop-in": digits that changed re-enter with a blur,
// digits the old and new value share (data-same) stay still.
function DigitPopNumber({ value }: { value: string }) {
  const groupRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const prev = prevRef.current;
    prevRef.current = value;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const chars = value.split("");
    let same = chars.length;
    if (prev !== null && !reduceMotion) {
      same = 0;
      while (same < prev.length && same < chars.length && prev[same] === chars[same]) same++;
    }

    group.classList.remove("is-animating");
    group.replaceChildren();
    chars.forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "t-digit";
      span.textContent = ch;
      if (i < same) span.dataset.same = "";
      if (i === chars.length - 2) span.dataset.stagger = "1";
      else if (i === chars.length - 1) span.dataset.stagger = "2";
      group.appendChild(span);
    });
    void group.offsetHeight;
    group.classList.add("is-animating");
  }, [value]);

  return <span ref={groupRef} className="t-digit-group" aria-label={value} />;
}

// transitions.dev "text swap soft": the old text blurs out while the new text
// blurs in, in place, and the element's width eases between them.
function SoftSwapText({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<string | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = prevRef.current;
    prevRef.current = value;

    if (prev === null || prev === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }

    window.clearTimeout(timerRef.current);
    const out = document.createElement("span");
    out.className = "t-text-soft-old";
    out.setAttribute("aria-hidden", "true");
    out.textContent = prev;
    const inn = document.createElement("span");
    inn.className = "t-text-soft-new";
    inn.textContent = value;

    const w0 = el.getBoundingClientRect().width;
    el.classList.remove("is-swapping");
    el.replaceChildren(out, inn);
    const w1 = inn.getBoundingClientRect().width;
    el.style.width = `${w0}px`;
    void el.offsetWidth;
    el.classList.add("is-swapping");
    el.style.width = `${w1}px`;

    timerRef.current = window.setTimeout(() => {
      el.classList.remove("is-swapping");
      el.style.removeProperty("width");
      el.textContent = value;
    }, 280);
  }, [value]);

  return <span ref={ref} className="t-text-soft" />;
}

const DIAGRAM_STEP_MS = 650;
const DIAGRAM_CYCLE_PAUSE_MS = 1000;
const DIAGRAM_RESTART_GAP_MS = 500;

// Shared by every "How it works" step diagram: true once the diagram has
// scrolled into view, so looping animation only starts when it's visible.
function useInViewOnce(ref: React.RefObject<Element | null>) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return isVisible;
}

// Shared by every "How it works" step diagram: steps a cursor through
// `count` items one at a time once visible, pauses at the end, then loops.
// Jumps straight to the final item under prefers-reduced-motion.
function useSequentialCursor(
  count: number,
  isVisible: boolean,
  stepMs = DIAGRAM_STEP_MS,
  pauseMs = DIAGRAM_CYCLE_PAUSE_MS,
  restartGapMs = DIAGRAM_RESTART_GAP_MS,
) {
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    if (!isVisible || count === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveIndex(count - 1);
      return;
    }
    let cancelled = false;
    let timeoutId: number;
    function step(i: number) {
      if (cancelled) return;
      setActiveIndex(i);
      if (i < count - 1) {
        timeoutId = window.setTimeout(() => step(i + 1), stepMs);
      } else {
        timeoutId = window.setTimeout(() => {
          if (cancelled) return;
          setActiveIndex(-1);
          timeoutId = window.setTimeout(() => step(0), restartGapMs);
        }, pauseMs);
      }
    }
    timeoutId = window.setTimeout(() => step(0), restartGapMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [isVisible, count, stepMs, pauseMs, restartGapMs]);
  return activeIndex;
}

// Shared by the Analyze and Improve diagrams: a cubic-bezier connector path
// from each source row to the destination card holding its group, measured
// from actual DOM positions (same approach as the FAQ indicators below) so
// it stays correct at any width.
function useConnectorPaths<S extends { group: string }, D extends { key: string }>(
  containerRef: React.RefObject<HTMLDivElement | null>,
  sources: readonly S[],
  destinations: readonly D[],
  rowRefs: React.RefObject<(HTMLDivElement | null)[]>,
  groupRefs: React.RefObject<(HTMLDivElement | null)[]>,
) {
  const [paths, setPaths] = useState<string[]>([]);
  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const box = container.getBoundingClientRect();
      const next: string[] = [];
      sources.forEach((source, i) => {
        const rowEl = rowRefs.current[i];
        const groupIndex = destinations.findIndex((d) => d.key === source.group);
        const groupEl = groupRefs.current[groupIndex];
        if (!rowEl || !groupEl) return;
        const rowBox = rowEl.getBoundingClientRect();
        const groupBox = groupEl.getBoundingClientRect();
        const x1 = rowBox.right - box.left;
        const y1 = rowBox.top + rowBox.height / 2 - box.top;
        const x2 = groupBox.left - box.left;
        const y2 = groupBox.top + groupBox.height / 2 - box.top;
        const midX = x1 + (x2 - x1) / 2;
        next[i] = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
      });
      setPaths(next);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [containerRef, sources, destinations, rowRefs, groupRefs]);
  return paths;
}

// "Analyze" step illustration: a URL bar steps through real site paths one at
// a time, like a crawler visiting pages, tagging each with the compliance
// category it belongs to and drawing a connector line into that category's
// card as the cursor reaches it.
function AnalyzeDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isVisible = useInViewOnce(containerRef);
  const activeIndex = useSequentialCursor(ANALYZE_SOURCES.length, isVisible);
  const paths = useConnectorPaths(containerRef, ANALYZE_SOURCES, ANALYZE_DESTINATIONS, rowRefs, groupRefs);

  const visitedCount = activeIndex === -1 ? 0 : activeIndex + 1;

  return (
    <div ref={containerRef} className="verena-diagram relative">
      <div className="grid grid-cols-2 gap-6 sm:gap-8">
        <div className="verena-diagram-mono overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(45, 0, 15, 0.1)", background: "#FCFAF8" }}>
          <div className="flex items-center gap-1.5 border-b px-3.5 py-2" style={{ borderColor: "rgba(45, 0, 15, 0.06)", background: "rgba(45, 0, 15, 0.03)" }}>
            <span className="h-2 w-2 rounded-full" style={{ background: "#ED6A5E" }} aria-hidden="true" />
            <span className="h-2 w-2 rounded-full" style={{ background: "#F5BF4F" }} aria-hidden="true" />
            <span className="h-2 w-2 rounded-full" style={{ background: "#61C454" }} aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}>
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: "#FFFFFF" }}>
              <Icon name="globe" size={12} />
              <span className="truncate text-[11px] font-medium" style={{ color: INK }}>
                yoursite.com
              </span>
            </span>
            <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
              {visitedCount}/{ANALYZE_SOURCES.length} pages
            </span>
          </div>
          <div className="relative">
            {ANALYZE_SOURCES.map((source, i) => {
              const dest = ANALYZE_DESTINATIONS.find((d) => d.key === source.group)!;
              const isActive = i === activeIndex;
              const isVisited = activeIndex !== -1 && i <= activeIndex;
              const isLast = i === ANALYZE_SOURCES.length - 1;
              return (
                <div
                  key={source.path}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className={`verena-diagram-row flex h-10 items-center gap-2 border-b border-dashed px-3.5 last:border-b-0 ${isActive ? "is-active" : ""}`}
                  style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}
                >
                  <span
                    className="w-3 shrink-0 text-center text-[11px]"
                    style={{ color: isActive ? "#8C1D40" : "rgba(45, 0, 15, 0.25)" }}
                    aria-hidden="true"
                  >
                    {isLast ? "└" : "├"}
                  </span>
                  <span className="truncate text-[11px]" style={{ color: MUTED }}>
                    {source.path}
                  </span>
                  <span
                    className={`verena-diagram-chip ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${isVisited ? "is-visible" : ""}`}
                    style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}
                  >
                    {dest.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="verena-diagram-mono flex flex-col justify-between gap-3">
          {ANALYZE_DESTINATIONS.map((group, i) => {
            const files = ANALYZE_SOURCES.map((s, si) => ({ ...s, si })).filter((s) => s.group === group.key);
            const found = files.filter((f) => activeIndex !== -1 && f.si <= activeIndex);
            return (
              <div
                key={group.key}
                ref={(el) => {
                  groupRefs.current[i] = el;
                }}
                className={`verena-diagram-dest rounded-2xl border p-3 ${isVisible ? "is-visible" : ""}`}
                style={{ borderColor: "rgba(140, 29, 64, 0.2)", background: "#FFFFFF", transitionDelay: `${0.25 + i * 0.12}s` }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
                    <Icon name={group.icon} size={13} />
                  </span>
                  <span className="truncate text-[11px] font-semibold" style={{ color: INK }}>
                    {group.label}
                  </span>
                  <span className="ml-auto shrink-0 text-[10px] tabular-nums" style={{ color: MUTED }}>
                    {found.length} found
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  {found.map((file, fi) => (
                    <div key={file.path} className="verena-diagram-chip is-visible flex items-center gap-1.5 text-[10px]">
                      <span aria-hidden="true" style={{ color: "rgba(45, 0, 15, 0.3)" }}>
                        {fi === found.length - 1 ? "└" : "├"}
                      </span>
                      <span className="truncate" style={{ color: MUTED }}>
                        {file.path}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(140, 29, 64, 0.5)"
            strokeWidth={1.4}
            pathLength={1}
            className={`verena-diagram-path ${isVisible && activeIndex !== -1 && i <= activeIndex ? "is-visible" : ""}`}
          />
        ))}
      </svg>
    </div>
  );
}

// "Improve" step illustration: a findings queue steps through one finding at
// a time, numbered in processing order, routing each one into the fix type
// it needs: a code diff, a document redline, or a flag for a +Human
// Supervisor. Same connector-line grammar as Analyze, with a numbered queue
// instead of a site tree so the two diagrams read as distinct concepts.
function ImproveDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isVisible = useInViewOnce(containerRef);
  const activeIndex = useSequentialCursor(IMPROVE_FINDINGS.length, isVisible);
  const paths = useConnectorPaths(containerRef, IMPROVE_FINDINGS, IMPROVE_DESTINATIONS, rowRefs, groupRefs);

  const routedCount = activeIndex === -1 ? 0 : activeIndex + 1;

  return (
    <div ref={containerRef} className="verena-diagram relative">
      <div className="grid grid-cols-2 gap-6 sm:gap-8">
        <div className="verena-diagram-mono overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(45, 0, 15, 0.1)", background: "#FCFAF8" }}>
          <div className="flex items-center gap-2 border-b px-3.5 py-2.5" style={{ borderColor: "rgba(45, 0, 15, 0.06)", background: "rgba(45, 0, 15, 0.03)" }}>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
              <Icon name="sparkle" size={11} />
            </span>
            <span className="text-[11px] font-semibold" style={{ color: INK }}>
              Findings queue
            </span>
            <span className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
              {routedCount}/{IMPROVE_FINDINGS.length} routed
            </span>
          </div>
          <div className="relative">
            {IMPROVE_FINDINGS.map((finding, i) => {
              const dest = IMPROVE_DESTINATIONS.find((d) => d.key === finding.group)!;
              const isActive = i === activeIndex;
              const isVisited = activeIndex !== -1 && i <= activeIndex;
              return (
                <div
                  key={finding.label}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className={`verena-diagram-row flex h-10 items-center gap-2.5 border-b border-dashed px-3.5 last:border-b-0 ${isActive ? "is-active" : ""}`}
                  style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}
                >
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold"
                    style={{
                      background: isVisited ? "rgba(140, 29, 64, 0.12)" : "rgba(45, 0, 15, 0.06)",
                      color: isVisited ? "#8C1D40" : "rgba(45, 0, 15, 0.35)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate text-[11px]" style={{ color: MUTED }}>
                    {finding.label}
                  </span>
                  <span
                    className={`verena-diagram-chip ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${isVisited ? "is-visible" : ""}`}
                    style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}
                  >
                    {dest.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="verena-diagram-mono flex flex-col justify-between gap-3">
          {IMPROVE_DESTINATIONS.map((group, i) => {
            const items = IMPROVE_FINDINGS.map((f, fi) => ({ ...f, fi })).filter((f) => f.group === group.key);
            const routed = items.filter((f) => activeIndex !== -1 && f.fi <= activeIndex);
            return (
              <div
                key={group.key}
                ref={(el) => {
                  groupRefs.current[i] = el;
                }}
                className={`verena-diagram-dest rounded-2xl border p-3 ${isVisible ? "is-visible" : ""}`}
                style={{ borderColor: "rgba(140, 29, 64, 0.2)", background: "#FFFFFF", transitionDelay: `${0.25 + i * 0.12}s` }}
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
                    <Icon name={group.icon} size={13} />
                  </span>
                  <span className="truncate text-[11px] font-semibold" style={{ color: INK }}>
                    {group.label}
                  </span>
                  <span className="ml-auto shrink-0 text-[10px] tabular-nums" style={{ color: MUTED }}>
                    {routed.length} routed
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  {routed.map((item, ri) => (
                    <div key={item.label} className="verena-diagram-chip is-visible flex items-center gap-1.5 text-[10px]">
                      <span aria-hidden="true" style={{ color: "rgba(45, 0, 15, 0.3)" }}>
                        {ri === routed.length - 1 ? "└" : "├"}
                      </span>
                      <span className="truncate" style={{ color: MUTED }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="rgba(140, 29, 64, 0.5)"
            strokeWidth={1.4}
            pathLength={1}
            className={`verena-diagram-path ${isVisible && activeIndex !== -1 && i <= activeIndex ? "is-visible" : ""}`}
          />
        ))}
      </svg>
    </div>
  );
}

// "Monitor" step illustration: a re-scan log steps through scheduled and
// deploy-triggered events one at a time, each updating a single site-status
// card (open-issue count via the same digit pop-in used for pricing/credits,
// latest note via the same soft text-swap used elsewhere) rather than
// routing into multiple destinations, since monitoring produces one
// continuously-updated status, not a set of categories.
function MonitorDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statusRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewOnce(containerRef);
  const activeIndex = useSequentialCursor(MONITOR_EVENTS.length, isVisible);
  const [path, setPath] = useState<string | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      const statusEl = statusRef.current;
      const rowEl = activeIndex === -1 ? null : rowRefs.current[activeIndex];
      if (!container || !statusEl || !rowEl) {
        setPath(null);
        return;
      }
      const box = container.getBoundingClientRect();
      const rowBox = rowEl.getBoundingClientRect();
      const statusBox = statusEl.getBoundingClientRect();
      const x1 = rowBox.right - box.left;
      const y1 = rowBox.top + rowBox.height / 2 - box.top;
      const x2 = statusBox.left - box.left;
      const y2 = statusBox.top + statusBox.height / 2 - box.top;
      const midX = x1 + (x2 - x1) / 2;
      setPath(`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  const processedCount = activeIndex === -1 ? 0 : activeIndex + 1;
  const currentEvent = activeIndex === -1 ? null : MONITOR_EVENTS[activeIndex];
  const openCount = currentEvent ? currentEvent.openAfter : 0;
  const statusNote = currentEvent ? currentEvent.note : "All clear — watching for changes";
  const isClear = openCount === 0;

  return (
    <div ref={containerRef} className="verena-diagram relative">
      <div className="grid grid-cols-[1fr_auto] gap-6 sm:gap-8">
        <div className="verena-diagram-mono overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(45, 0, 15, 0.1)", background: "#FCFAF8" }}>
          <div className="flex items-center gap-2 border-b px-3.5 py-2.5" style={{ borderColor: "rgba(45, 0, 15, 0.06)", background: "rgba(45, 0, 15, 0.03)" }}>
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
              <Icon name="eye" size={11} />
            </span>
            <span className="text-[11px] font-semibold" style={{ color: INK }}>
              Re-scan log
            </span>
            <span className="ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums" style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}>
              {processedCount}/{MONITOR_EVENTS.length} events
            </span>
          </div>
          <div className="relative">
            {MONITOR_EVENTS.map((event, i) => {
              const isActive = i === activeIndex;
              const isVisited = activeIndex !== -1 && i <= activeIndex;
              return (
                <div
                  key={`${event.label}-${i}`}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  className={`verena-diagram-row flex h-10 items-center gap-2.5 border-b border-dashed px-3.5 last:border-b-0 ${isActive ? "is-active" : ""}`}
                  style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: isVisited ? "rgba(140, 29, 64, 0.12)" : "rgba(45, 0, 15, 0.06)",
                      color: isVisited ? "#8C1D40" : "rgba(45, 0, 15, 0.35)",
                    }}
                  >
                    <Icon name={event.trigger} size={11} />
                  </span>
                  <span className="truncate text-[11px]" style={{ color: MUTED }}>
                    {event.label}
                  </span>
                  <span
                    className={`verena-diagram-chip ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${isVisited ? "is-visible" : ""}`}
                    style={{ background: "rgba(140, 29, 64, 0.1)", color: "#8C1D40" }}
                  >
                    {event.tag}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={statusRef}
          className={`verena-diagram-dest verena-diagram-mono flex w-[148px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border p-4 text-center ${isVisible ? "is-visible" : ""}`}
          style={{ borderColor: "rgba(140, 29, 64, 0.2)", background: "#FFFFFF" }}
        >
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: isClear ? "#61C454" : "#ED6A5E" }}
            aria-hidden="true"
          />
          <span className="verena-interactive-serif text-2xl" style={{ color: INK }}>
            <DigitPopNumber value={String(openCount)} />
          </span>
          <span className="text-[10px]" style={{ color: MUTED }}>
            open issues
          </span>
          <span className="mt-1 block max-w-full text-[9px] leading-tight" style={{ color: MUTED }}>
            <SoftSwapText value={statusNote} />
          </span>
        </div>
      </div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {path && (
          <path
            d={path}
            fill="none"
            stroke="rgba(140, 29, 64, 0.5)"
            strokeWidth={1.4}
            pathLength={1}
            className="verena-diagram-path is-visible"
          />
        )}
      </svg>
    </div>
  );
}

export function VerenaHeroInteractive() {
  const [showBanner, setShowBanner] = useState(true);
  const [domain, setDomain] = useState("");
  const [openDropdown, setOpenDropdown] = useState<NavDropdownKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(PILLS.map((pill) => pill.label));
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [placeholderText, setPlaceholderText] = useState("");
  const [compareMode, setCompareMode] = useState<"before" | "after">("before");
  const [planIndex, setPlanIndex] = useState(2);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>("All");
  const [activeFaqId, setActiveFaqId] = useState<string>(FAQS_FLAT[0].id);
  const activePlan = PLANS[planIndex];
  const visibleFaqs = activeFaqCategory === "All" ? FAQS_FLAT : FAQS_FLAT.filter((faq) => faq.category === activeFaqCategory);
  const activeFaq = visibleFaqs.find((faq) => faq.id === activeFaqId) ?? visibleFaqs[0];
  const faqTabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const faqItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const faqItemListRef = useRef<HTMLDivElement>(null);
  const [faqTabIndicator, setFaqTabIndicator] = useState({ left: 0, width: 0 });
  const [faqItemIndicator, setFaqItemIndicator] = useState({ top: 0, height: 0 });
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

  function toggleCategory(label: string) {
    setSelectedCategories((current) =>
      current.includes(label) ? current.filter((item) => item !== label) : [...current, label],
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!domain.trim() || selectedCategories.length === 0 || status === "loading") return;
    setStatus("loading");
    timeouts.current.push(window.setTimeout(() => setStatus("success"), 900));
    timeouts.current.push(window.setTimeout(() => setStatus("idle"), 3200));
  }

  function selectFaqCategory(category: string) {
    setActiveFaqCategory(category);
    const nextVisible = category === "All" ? FAQS_FLAT : FAQS_FLAT.filter((faq) => faq.category === category);
    setActiveFaqId(nextVisible[0].id);
  }

  function handleFaqListKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = visibleFaqs.findIndex((faq) => faq.id === activeFaq?.id);
    if (index === -1) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveFaqId(visibleFaqs[(index + 1) % visibleFaqs.length].id);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveFaqId(visibleFaqs[(index - 1 + visibleFaqs.length) % visibleFaqs.length].id);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveFaqId(visibleFaqs[0].id);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveFaqId(visibleFaqs[visibleFaqs.length - 1].id);
    }
  }

  useLayoutEffect(() => {
    const el = faqTabRefs.current[activeFaqCategory];
    if (el) setFaqTabIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeFaqCategory]);

  useLayoutEffect(() => {
    const el = faqItemRefs.current[activeFaq?.id ?? ""];
    if (!el) return;
    setFaqItemIndicator({ top: el.offsetTop, height: el.offsetHeight });
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  }, [activeFaq?.id, visibleFaqs.length]);

  useEffect(() => {
    function remeasureFaqIndicators() {
      const tabEl = faqTabRefs.current[activeFaqCategory];
      if (tabEl) setFaqTabIndicator({ left: tabEl.offsetLeft, width: tabEl.offsetWidth });
      const itemEl = faqItemRefs.current[activeFaq?.id ?? ""];
      if (itemEl) setFaqItemIndicator({ top: itemEl.offsetTop, height: itemEl.offsetHeight });
    }
    window.addEventListener("resize", remeasureFaqIndicators);
    return () => window.removeEventListener("resize", remeasureFaqIndicators);
  }, [activeFaqCategory, activeFaq?.id]);


  return (
    <div className="verena-interactive flex flex-col bg-[#FCFAF8]" style={{ color: INK }}>
      <style>{`
        .verena-interactive { font-family: "Instrument Sans", "Inter", ui-sans-serif, system-ui, sans-serif; }
        .verena-interactive-serif { font-family: "Fraunces", "Iowan Old Style", Georgia, serif; }
        .verena-interactive-pop { animation: verena-interactive-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes verena-interactive-pop {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .verena-interactive-spin { animation: verena-interactive-spin 0.8s linear infinite; }
        }
        @keyframes verena-interactive-spin {
          to { transform: rotate(360deg); }
        }
        .verena-pricing-slider { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 999px; background: rgba(251, 245, 236, 0.18); outline: none; }
        .verena-pricing-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 999px; background: #FCF56F; border: 3px solid #2D000F; cursor: pointer; transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1); }
        .verena-pricing-slider::-webkit-slider-thumb:hover { transform: scale(1.12); }
        .verena-pricing-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 999px; background: #FCF56F; border: 3px solid #2D000F; cursor: pointer; }
        .verena-pricing-slider::-moz-range-track { background: transparent; }

        .verena-faq-tabs { position: relative; scrollbar-width: none; }
        .verena-faq-tabs::-webkit-scrollbar { display: none; }
        .verena-faq-tab-indicator {
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1), width 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .verena-faq-scroll { scrollbar-width: thin; }
        .verena-faq-item-indicator {
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1), height 250ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .verena-faq-stage { isolation: isolate; }
        .verena-faq-glow {
          position: absolute;
          top: -22%;
          right: -8%;
          width: 220px;
          height: 220px;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.14;
          pointer-events: none;
          animation: verena-faq-glow-pulse 7s ease-in-out infinite alternate;
        }
        @keyframes verena-faq-glow-pulse {
          0% { transform: scale(1); opacity: 0.12; }
          100% { transform: scale(1.18); opacity: 0.22; }
        }
        .verena-faq-answer-enter { animation: verena-faq-answer-in 400ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes verena-faq-answer-in {
          from { opacity: 0; transform: translateY(12px); filter: blur(3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
        .verena-faq-avatar { animation: verena-faq-avatar-pop 500ms cubic-bezier(0.34, 1.36, 0.64, 1) both; }
        @keyframes verena-faq-avatar-pop {
          from { transform: scale(0.75); }
          to { transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .verena-faq-tab-indicator, .verena-faq-item-indicator, .verena-faq-answer-enter, .verena-faq-avatar, .verena-faq-glow {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Ambient aurora gradient: layered, blurred, slowly drifting blobs read as a
           smooth mesh gradient instead of the banded edges a single flat radial-gradient
           produces, and the blur hides the remaining banding entirely. */
        .verena-aurora { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; }
        .verena-aurora-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.9;
          will-change: transform;
        }
        .verena-aurora-blob--gold {
          width: 36%;
          height: 56%;
          top: -16%;
          right: -10%;
          background: radial-gradient(circle, #F6C04D 0%, rgba(246, 192, 77, 0.8) 44%, rgba(246, 192, 77, 0) 76%);
          animation: verena-aurora-drift-a 14s ease-in-out infinite alternate;
        }
        .verena-aurora-blob--maroon {
          width: 145%;
          height: 50%;
          bottom: -18%;
          right: -46%;
          border-radius: 50%;
          opacity: 0.72;
          transform: rotate(-28deg);
          background: radial-gradient(ellipse, #8C1D40 0%, rgba(140, 29, 64, 0.58) 42%, rgba(140, 29, 64, 0) 74%);
          animation: verena-aurora-drift-b 16s ease-in-out infinite alternate;
          animation-delay: -5s;
        }
        .verena-aurora-blob--pink {
          width: 38%;
          height: 38%;
          bottom: -18%;
          left: -16%;
          opacity: 0.4;
          background: radial-gradient(circle, #F3D7DC 0%, rgba(243, 215, 220, 0.5) 40%, rgba(243, 215, 220, 0) 72%);
          animation: verena-aurora-drift-c 12s ease-in-out infinite alternate;
          animation-delay: -8s;
        }
        @keyframes verena-aurora-drift-a {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-16%, 16%) scale(1.22); }
        }
        @keyframes verena-aurora-drift-b {
          0% { transform: rotate(-28deg) translate(0, 0) scale(1); }
          100% { transform: rotate(-20deg) translate(10%, -12%) scale(1.18); }
        }
        @keyframes verena-aurora-drift-c {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(16%, -12%) scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          .verena-aurora-blob { animation: none !important; }
        }

        /* transitions.dev: number pop-in */
        :root {
          --digit-dur: 420ms;
          --digit-distance: 7px;
          --digit-stagger: 60ms;
          --digit-blur: 2px;
          --digit-ease: cubic-bezier(0.34, 1.45, 0.64, 1);
          --digit-dir-x: 0;
          --digit-dir-y: 1;
        }
        @keyframes t-digit-pop-in {
          0% {
            transform: translate(calc(var(--digit-distance) * var(--digit-dir-x)), calc(var(--digit-distance) * var(--digit-dir-y)));
            opacity: 0;
            filter: blur(var(--digit-blur));
          }
          100% { transform: translate(0, 0); opacity: 1; filter: blur(0); }
        }
        .t-digit-group { display: inline-flex; align-items: baseline; }
        .t-digit { display: inline-block; will-change: transform, opacity, filter; }
        .t-digit-group.is-animating .t-digit { animation: t-digit-pop-in var(--digit-dur) var(--digit-ease) both; }
        .t-digit-group.is-animating .t-digit[data-stagger="1"] { animation-delay: var(--digit-stagger); }
        .t-digit-group.is-animating .t-digit[data-stagger="2"] { animation-delay: calc(var(--digit-stagger) * 2); }
        .t-digit-group.is-animating .t-digit[data-same] { animation: none; }
        @media (prefers-reduced-motion: reduce) {
          .t-digit-group .t-digit { animation: none !important; }
        }

        /* transitions.dev: text swap soft */
        :root {
          --text-soft-dur: 200ms;
          --text-soft-blur: 2px;
          --text-soft-ease: ease-in-out;
          --text-soft-resize-dur: 240ms;
          --text-soft-resize-ease: cubic-bezier(0.22, 1, 0.36, 1);
        }
        .t-text-soft { display: inline-grid; justify-items: start; transition: width var(--text-soft-resize-dur) var(--text-soft-resize-ease); }
        .t-text-soft > span { grid-area: 1 / 1; white-space: pre; transition: filter var(--text-soft-dur) var(--text-soft-ease), opacity var(--text-soft-dur) var(--text-soft-ease); }
        .t-text-soft-new { opacity: 0; filter: blur(var(--text-soft-blur)); }
        .t-text-soft.is-swapping .t-text-soft-old { opacity: 0; filter: blur(var(--text-soft-blur)); }
        .t-text-soft.is-swapping .t-text-soft-new { opacity: 1; filter: blur(0); }
        @media (prefers-reduced-motion: reduce) {
          .t-text-soft, .t-text-soft > span { transition: none !important; }
        }

        /* "Analyze" step diagram: a URL bar steps through site paths one at a
           time, tagging each with its compliance category and drawing a
           connector line into that category's card as the cursor reaches
           it. The active row gets a soft, blurred glow rather than a hard
           band, and lines/chips/tree rows are JS-driven to stay in sync with
           the cursor instead of running on fixed CSS delays. */
        .verena-diagram-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .verena-diagram-row {
          position: relative;
          transition: background-color 0.4s ease, box-shadow 0.4s ease;
        }
        .verena-diagram-row.is-active {
          background-color: rgba(140, 29, 64, 0.05);
          box-shadow: 0 0 16px 3px rgba(140, 29, 64, 0.1);
        }
        .verena-diagram-chip {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .verena-diagram-chip.is-visible {
          opacity: 1;
          transform: scale(1);
        }
        .verena-diagram-path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          transition: stroke-dashoffset 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease;
        }
        .verena-diagram-path.is-visible {
          stroke-dashoffset: 0;
          opacity: 1;
        }
        .verena-diagram-dest {
          opacity: 0;
          transform: translateX(14px);
          transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .verena-diagram-dest.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .verena-diagram-row, .verena-diagram-chip, .verena-diagram-path, .verena-diagram-dest {
            transition: none !important;
          }
        }
      `}</style>

      <div className="flex h-screen flex-col">
      {/* Announcement bar */}
      {showBanner && (
        <>
          <div className="h-[3px]" style={{ background: INK }} />
          <div
            className="relative flex items-center justify-center gap-2 px-10 py-2.5 text-center text-[12px]"
            style={{ background: ACCENT, color: INK }}
          >
            We&rsquo;re in Beta! Explore Verena early and help shape what&rsquo;s next.
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-black/10 active:scale-95"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Nav */}
      <div
        className="sticky top-0 z-30 w-full"
        style={{ background: "#FFFFFF" }}
      >
        <header className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-5 sm:px-10">
          <div className="flex items-center gap-2">
            <GemMark size={26} />
            <span className="verena-interactive-serif text-xl font-medium">
              Verena<sup className="text-[0.55em] font-normal">™</sup>
            </span>
          </div>

          <nav className="hidden items-center gap-7 text-sm md:flex" style={{ color: "color-mix(in srgb, currentColor 85%, transparent)" }}>
            <NavItem label="Product" dropdownKey="Product" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem label="Pricing" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem label="Resources" dropdownKey="Resources" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem label="Contact us" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden text-sm sm:inline">Log in</span>
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 hover:brightness-95 active:scale-[0.97]"
              style={{ background: ACCENT, color: INK }}
            >
              Start for free
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="verena-interactive-mobile-nav"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-black/5 active:scale-95 md:hidden"
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} size={20} />
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <nav
            id="verena-interactive-mobile-nav"
            className="flex flex-col gap-1 border-t px-6 py-4 text-left text-sm md:hidden"
            style={{ borderColor: "color-mix(in srgb, currentColor 10%, transparent)" }}
          >
            {["Product", "Pricing", "Resources", "Contact us"].map((label) => (
              <a
                key={label}
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 transition hover:bg-black/5"
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Hero */}
      <section className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col items-center justify-center px-6 pt-10 pb-16 text-center sm:px-10">
        <h1 className="verena-interactive-serif max-w-4xl text-[clamp(2.75rem,2.25rem_+_3.5vw,4.25rem)] leading-[1.08] tracking-tight">
          Your website looks ready.
          <br />
          But what might be <em className="italic">missing</em>?
        </h1>
        <p className="mt-5 max-w-[860px] text-balance text-[16px] leading-[24px]" style={{ color: MUTED }}>
          Privacy, accessibility, and other website requirements aren't always obvious. Verena uses AI to spot
          potential issues, show supporting evidence, and help you understand what to review next.
        </p>

        {/* Interactive media panel */}
        <div className="relative mt-14 w-full max-w-[1280px]">
          <div
            className="relative h-[clamp(400px,46vh,500px)] overflow-hidden rounded-[32px]"
            style={{ background: CREAM }}
          >
            <div className="verena-aurora" aria-hidden="true">
              <div className="verena-aurora-blob verena-aurora-blob--gold" />
              <div className="verena-aurora-blob verena-aurora-blob--maroon" />
              <div className="verena-aurora-blob verena-aurora-blob--pink" />
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6">
              <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-[720px] items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm transition focus-within:ring-2"
                style={{ "--tw-ring-color": "#8C1D40" } as CSSProperties}
              >
                <GemMark size={18} />
                <label htmlFor="verena-interactive-domain" className="sr-only">
                  Website to scan
                </label>
                <input
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  type="text"
                  id="verena-interactive-domain"
                  name="domain"
                  autoComplete="url"
                  placeholder={placeholderText}
                  className="w-full min-w-0 bg-transparent text-left text-base outline-none placeholder:text-[#796268]"
                  style={{ color: INK }}
                />
                <button
                  type="submit"
                  aria-label={status === "success" ? "Scan started" : "Submit"}
                  disabled={status === "loading"}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed"
                  style={{ background: "#8C1D40", color: CREAM }}
                >
                  <span key={status} className="verena-interactive-pop flex items-center justify-center">
                    <Icon name={status === "loading" ? "spinner" : status === "success" ? "check" : "arrow"} size={16} />
                  </span>
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {PILLS.map((pill) => {
                  const active = selectedCategories.includes(pill.label);
                  return (
                    <button
                      key={pill.label}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleCategory(pill.label)}
                      className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold shadow-sm transition duration-200 hover:brightness-95 active:scale-[0.97]"
                      style={active ? { background: INK, color: CREAM } : { background: "#FFFFFF", color: MUTED }}
                    >
                      <Icon name={pill.icon} />
                      {pill.label}
                    </button>
                  );
                })}
              </div>


            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Trust strip */}
      <div className="w-full px-6 py-10 text-center sm:px-10 sm:py-12" style={{ background: "#FCFAF8" }}>
        <p
          className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-2 text-[15px] font-medium leading-snug"
          style={{ color: MUTED }}
        >
          <Icon name="shield" size={16} />
          Every finding is reviewed by a human before it reaches you — Invictus Counsel backs anything that needs
          legal judgment.
        </p>
      </div>

      {/* Why Verena Matters */}
      <section className="px-6 py-20 sm:px-10 sm:py-28" style={{ background: "#FFFFFF" }}>
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="verena-interactive-serif text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl">
            Why Verena matters
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-[24px]" style={{ color: MUTED }}>
            The gaps don&rsquo;t go away on their own. Verena finds them before someone else does.
          </p>

          <div className="mt-9 inline-flex items-center gap-1 rounded-full p-1" style={{ background: "#FCFAF8" }}>
            <button
              type="button"
              onClick={() => setCompareMode("before")}
              className="rounded-full px-5 py-2 text-sm font-semibold transition duration-200 active:scale-[0.97]"
              style={compareMode === "before" ? { background: INK, color: CREAM } : { color: MUTED }}
            >
              Without Verena
            </button>
            <button
              type="button"
              onClick={() => setCompareMode("after")}
              className="rounded-full px-5 py-2 text-sm font-semibold transition duration-200 active:scale-[0.97]"
              style={compareMode === "after" ? { background: INK, color: CREAM } : { color: MUTED }}
            >
              With Verena
            </button>
          </div>
        </div>

        <div key={compareMode} className="verena-interactive-pop mx-auto mt-8 flex max-w-[680px] flex-col gap-3">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.before}
              className="flex items-start gap-3 rounded-2xl px-5 py-4 text-left shadow-sm"
              style={{ background: "#FCFAF8" }}
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={
                  compareMode === "before"
                    ? { background: "rgba(45, 0, 15, 0.08)", color: MUTED }
                    : { background: "rgba(140, 29, 64, 0.12)", color: "#8C1D40" }
                }
              >
                <Icon name={compareMode === "before" ? "close" : "check"} size={13} />
              </span>
              <p className="text-[15px] leading-[22px]" style={{ color: compareMode === "before" ? MUTED : INK }}>
                {compareMode === "before" ? row.before : row.after}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t px-6 py-20 sm:px-10 sm:py-28" style={{ background: "#FCFAF8", borderColor: "rgba(45, 0, 15, 0.08)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="verena-interactive-serif text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl">
              How it works
            </h2>
            <p className="mt-4 text-balance text-[16px] leading-[24px]" style={{ color: MUTED }}>
              An AI agent platform for legal compliance, with humans in the loop.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-6">
            {HOW_IT_WORKS.map((step, index) => {
              const textBlock = (
                <div key="text">
                  <span className="verena-interactive-serif text-sm" style={{ color: "#8C1D40" }}>
                    {step.n}
                  </span>
                  <span
                    className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: "rgba(252, 245, 111, 0.4)", color: INK }}
                  >
                    <Icon name={step.icon} size={20} />
                  </span>
                  <h3 className="verena-interactive-serif mt-5 text-xl">{step.title}</h3>
                  <p className="mt-1.5 text-sm font-medium" style={{ color: "#8C1D40" }}>
                    {step.tagline}
                  </p>
                  <p className="mt-3 text-[15px] leading-[22px]" style={{ color: MUTED }}>
                    {step.body}
                  </p>
                </div>
              );
              const diagramBlock = (
                <div key="diagram">
                  {index === 0 && <AnalyzeDiagram />}
                  {index === 1 && <ImproveDiagram />}
                  {index === 2 && <MonitorDiagram />}
                </div>
              );
              return (
                <div key={step.n} className="relative rounded-3xl bg-white p-7 shadow-sm sm:p-9">
                  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                    {index % 2 === 1 ? [diagramBlock, textBlock] : [textBlock, diagramBlock]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features / Verified coverage */}
      <section className="border-t px-6 py-20 sm:px-10 sm:py-28" style={{ background: "#FFFFFF", borderColor: "rgba(45, 0, 15, 0.08)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="verena-interactive-serif text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl">
              Verified coverage
            </h2>
            <p className="mt-4 text-balance text-[16px] leading-[24px]" style={{ color: MUTED }}>
              Six areas Verena checks on every scan, each with evidence you can review yourself.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border p-6 transition hover:shadow-sm"
                style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ background: "#FCFAF8", color: "#8C1D40" }}
                >
                  <Icon name={feature.icon} size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-[21px]" style={{ color: MUTED }}>
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs" style={{ color: MUTED }}>
            A detected item does not establish compliance.
          </p>
        </div>
      </section>

      {/* +Human */}
      <section className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-28" style={{ background: INK }}>
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(252, 245, 111, 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2">
          <div className="text-left">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em]"
              style={{ background: "rgba(252, 245, 111, 0.16)", color: ACCENT }}
            >
              +Human
            </span>
            <h2 className="verena-interactive-serif mt-5 max-w-lg text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl" style={{ color: CREAM }}>
              Your compliance, backed by a law firm.
            </h2>
            <p className="mt-4 max-w-md text-balance text-[16px] leading-[24px]" style={{ color: "rgba(251, 245, 236, 0.7)" }}>
              With +Human, a professional from Invictus Counsel reviews judgment calls before they reach your site.
              Verena does the reading; a licensed human signs off.
            </p>
            <button
              type="button"
              className="mt-7 rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 hover:brightness-95 active:scale-[0.97]"
              style={{ background: ACCENT, color: INK }}
            >
              Choose +Human
            </button>
          </div>

          <div className="rounded-3xl p-5" style={{ background: "rgba(251, 245, 236, 0.06)" }}>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "#FFFFFF", boxShadow: "0 2px 6px rgba(45, 0, 15, 0.18)" }}
                  aria-hidden
                >
                  <GemMark size={16} />
                </span>
                <div className="max-w-[320px] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-[20px]" style={{ background: "rgba(251, 245, 236, 0.1)", color: CREAM }}>
                  This marketing claim needs evidence before it ships. Flagging for a +Human Supervisor.
                </div>
              </div>
              <div className="flex items-start justify-end gap-2.5">
                <div className="max-w-[320px] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-[20px]" style={{ background: ACCENT, color: INK }}>
                  Reviewed. Approved with one edit to the claim&rsquo;s wording.
                </div>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{ background: "rgba(251, 245, 236, 0.14)", color: CREAM }}
                >
                  HS
                </span>
              </div>
              <p className="mt-1 text-center text-xs" style={{ color: "rgba(251, 245, 236, 0.5)" }}>
                +Human Supervisor &middot; Invictus Counsel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 sm:px-10 sm:py-28" style={{ background: "#FCFAF8" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto max-w-[640px] text-center">
            <h2 className="verena-interactive-serif text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl">
              Pricing
            </h2>
            <p className="mt-4 text-balance text-[16px] leading-[24px]" style={{ color: MUTED }}>
              Free to start, no credit card required. Drag to match a plan to your site.
            </p>
          </div>

          <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.15fr]">
            <div
              className="flex flex-col rounded-3xl p-7 sm:p-8"
              style={{ background: INK, color: CREAM, boxShadow: "0 20px 50px -24px rgba(45,0,15,0.45)" }}
            >
              <span
                className="mb-4 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.1em]"
                style={{ background: ACCENT, color: INK }}
              >
                <SoftSwapText value={activePlan.note} />
              </span>

              <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "rgba(251, 245, 236, 0.55)" }}>
                {activePlan.name}
              </p>
              <p className="verena-interactive-serif mt-2 text-5xl tracking-tight tabular-nums sm:text-6xl">
                $<DigitPopNumber value={activePlan.priceValue.toLocaleString()} />
                <span className="text-base font-normal" style={{ color: "rgba(251, 245, 236, 0.55)" }}>
                  /month
                </span>
              </p>
              <p className="mt-1.5 text-sm tabular-nums" style={{ color: "rgba(251, 245, 236, 0.7)" }}>
                <DigitPopNumber value={activePlan.credits.toLocaleString()} /> credits / month
              </p>

              <div className="mt-8">
                <label
                  htmlFor="verena-plan-slider"
                  className="block text-xs font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "rgba(251, 245, 236, 0.5)" }}
                >
                  How many pages should Verena watch?
                </label>
                <input
                  id="verena-plan-slider"
                  type="range"
                  min={0}
                  max={PLANS.length - 1}
                  step={1}
                  value={planIndex}
                  onChange={(event) => setPlanIndex(Number(event.target.value))}
                  className="verena-pricing-slider mt-4 w-full"
                  aria-label="Select a plan by expected scan volume"
                />
                <div className="mt-2 flex justify-between text-[11px]">
                  {PLANS.map((plan, index) => (
                    <button
                      key={plan.name}
                      type="button"
                      onClick={() => setPlanIndex(index)}
                      className="transition duration-200"
                      style={{
                        color: index === planIndex ? ACCENT : "rgba(251, 245, 236, 0.45)",
                        fontWeight: index === planIndex ? 600 : 400,
                      }}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>
              </div>

              <ul className="mt-8 flex flex-col gap-2.5">
                {(["credits", activePlan.websites, activePlan.support] as const).map((kind, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm">
                    <Icon name="check" size={16} />
                    {kind === "credits" ? (
                      <span>
                        <DigitPopNumber value={activePlan.credits.toLocaleString()} /> credits / month
                      </span>
                    ) : (
                      <SoftSwapText value={kind} />
                    )}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-8 w-full rounded-xl px-5 py-3 text-sm font-semibold transition duration-200 hover:brightness-95 active:scale-[0.97]"
                style={{ background: ACCENT, color: INK }}
              >
                <SoftSwapText value={activePlan.cta} />
              </button>
            </div>

            <div className="overflow-x-auto rounded-3xl" style={{ border: "1px solid rgba(45, 0, 15, 0.08)" }}>
              <table className="w-full min-w-[520px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="p-4 text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                      Compare plans
                    </th>
                    {PLANS.map((plan, index) => (
                      <th key={plan.name} scope="col" className="p-4 align-bottom">
                        <button type="button" onClick={() => setPlanIndex(index)} className="text-left">
                          <span className="block text-sm font-semibold" style={{ color: INK }}>
                            {plan.name}
                          </span>
                          <span
                            className="mt-1.5 block h-[2px] w-6 rounded-full transition duration-200"
                            style={{ background: index === planIndex ? ACCENT : "transparent" }}
                          />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Price", values: PLANS.map((plan) => `$${plan.priceValue}/mo`) },
                    { label: "Credits / month", values: PLANS.map((plan) => plan.credits.toLocaleString()) },
                    { label: "Websites", values: PLANS.map((plan) => plan.websites) },
                    { label: "Support", values: PLANS.map((plan) => plan.support) },
                  ].map((row) => (
                    <tr key={row.label} className="border-t" style={{ borderColor: "rgba(45, 0, 15, 0.06)" }}>
                      <td className="p-4 text-sm" style={{ color: MUTED }}>
                        {row.label}
                      </td>
                      {row.values.map((value, index) => (
                        <td
                          key={PLANS[index].name}
                          className="p-4 text-sm font-medium transition duration-200"
                          style={{
                            color: INK,
                            background: index === planIndex ? "rgba(252, 245, 111, 0.14)" : "transparent",
                          }}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl p-8 text-center sm:flex-row sm:text-left" style={{ background: INK, color: CREAM }}>
            <div>
              <p className="text-base font-semibold">Need a law firm behind every judgment call?</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(251, 245, 236, 0.7)" }}>
+Human pairs Verena&rsquo;s AI scans with licensed review from Invictus Counsel, on any plan.
              </p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 hover:brightness-95 active:scale-[0.97]"
              style={{ background: ACCENT, color: INK }}
            >
              Choose +Human
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="relative overflow-hidden border-t px-6 sm:px-10"
        style={{ background: "#FFFFFF", borderColor: "rgba(45, 0, 15, 0.08)", height: "min(100svh, 860px)" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: FAQS_FLAT.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            }),
          }}
        />

        <div className="mx-auto flex h-full max-w-[1180px] flex-col py-6 sm:py-8">
          <div className="mx-auto max-w-[620px] shrink-0 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "rgba(45, 0, 15, 0.04)" }}>
              <GemMark size={14} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: MUTED }}>
                Ask Verena
              </span>
            </div>
            <h2 className="verena-interactive-serif mt-2.5 text-balance text-[26px] leading-[1.15] tracking-tight sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-1.5 hidden text-[15px] leading-[22px] sm:block" style={{ color: MUTED }}>
              Pick a question. Watch Verena answer it, live.
            </p>
          </div>

          <div className="relative mt-5 shrink-0">
            <div className="verena-faq-tabs flex items-center gap-1 overflow-x-auto" role="tablist" aria-label="Filter FAQ by category">
              <span
                className="verena-faq-tab-indicator absolute inset-y-0 rounded-full"
                style={{ transform: `translateX(${faqTabIndicator.left}px)`, width: faqTabIndicator.width, background: INK }}
                aria-hidden
              />
              {FAQ_CATEGORIES.map((category) => {
                const active = activeFaqCategory === category;
                return (
                  <button
                    key={category}
                    ref={(el) => {
                      faqTabRefs.current[category] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectFaqCategory(category)}
                    className="relative z-10 shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.04em] transition-colors duration-200 active:scale-[0.97]"
                    style={{ color: active ? CREAM : MUTED }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid min-h-0 flex-1 grid-rows-[200px_1fr] gap-4 lg:grid-cols-[300px_1fr] lg:grid-rows-1 lg:gap-6">
            <div
              ref={faqItemListRef}
              onKeyDown={handleFaqListKeyDown}
              className="verena-faq-scroll relative min-h-0 overflow-y-auto rounded-2xl border"
              style={{ borderColor: "rgba(45, 0, 15, 0.08)", background: "#FCFAF8" }}
              role="listbox"
              aria-label="FAQ questions"
              tabIndex={0}
            >
              <span
                className="verena-faq-item-indicator absolute left-2 right-2 rounded-xl"
                style={{ transform: `translateY(${faqItemIndicator.top}px)`, height: faqItemIndicator.height, background: "#FFFFFF" }}
                aria-hidden
              />
              <div className="relative flex flex-col gap-1 p-2">
                {visibleFaqs.map((faq) => {
                  const active = faq.id === activeFaq?.id;
                  return (
                    <button
                      key={faq.id}
                      ref={(el) => {
                        faqItemRefs.current[faq.id] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => setActiveFaqId(faq.id)}
                      className="relative z-10 rounded-xl px-3.5 py-3 text-left text-[13.5px] font-semibold leading-[18px] transition-colors duration-200"
                      style={{ color: active ? INK : MUTED, boxShadow: active ? "0 1px 3px rgba(45, 0, 15, 0.1)" : "none" }}
                    >
                      {faq.q}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="verena-faq-stage relative flex min-h-0 flex-col overflow-hidden rounded-2xl border p-6 sm:p-8"
              style={{ borderColor: "rgba(45, 0, 15, 0.08)", background: "#FFFFFF" }}
            >
              <span className="verena-faq-glow" aria-hidden style={{ background: ACCENT }} />
              {activeFaq && (
                <div key={activeFaq.id} className="verena-faq-answer-enter relative my-auto flex max-h-full flex-col gap-4 overflow-y-auto">
                  <div className="flex justify-end">
                    <div
                      className="max-w-[88%] rounded-[18px] rounded-tr-sm px-4 py-2.5 text-[13.5px] font-semibold leading-[19px]"
                      style={{ background: "#F5EFE6", color: INK }}
                    >
                      {activeFaq.q}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span
                      className="verena-faq-avatar relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#FFFFFF", boxShadow: "0 2px 8px rgba(45, 0, 15, 0.18)" }}
                      aria-hidden
                    >
                      <GemMark size={18} />
                    </span>
                    <div className="max-w-[640px]">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                        {activeFaq.category}
                      </p>
                      <p className="mt-1.5 text-[15px] leading-[24px] tracking-[-0.005em]" style={{ color: "#3C1420" }}>
                        {activeFaq.a}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden px-6 py-20 text-center sm:px-10 sm:py-28"
        style={{
          background:
            "radial-gradient(60% 90% at 85% 0%, #F6C04D 0%, rgba(246,192,77,0) 55%), " +
            "radial-gradient(80% 80% at 15% 100%, #8C1D40 0%, rgba(140,29,64,0.5) 35%, rgba(140,29,64,0) 65%), " +
            INK,
        }}
      >
        <div className="relative mx-auto max-w-[640px]">
          <h2 className="verena-interactive-serif text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl" style={{ color: CREAM }}>
            Ready to see what your website is missing?
          </h2>
          <p className="mt-4 text-balance text-[16px] leading-[24px]" style={{ color: "rgba(251, 245, 236, 0.75)" }}>
            Start for free. No credit card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 hover:brightness-95 active:scale-[0.97]"
              style={{ background: ACCENT, color: INK }}
            >
              Start for free
            </button>
            <button
              type="button"
              className="rounded-xl px-6 py-3 text-sm font-semibold transition duration-200 hover:bg-white/10 active:scale-[0.97]"
              style={{ color: CREAM, border: "1px solid rgba(251, 245, 236, 0.3)" }}
            >
              Talk to founder
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden px-6 pt-16 sm:px-10" style={{ background: INK, color: "rgba(251, 245, 236, 0.7)" }}>
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2">
                <GemMark size={24} />
                <span className="verena-interactive-serif text-lg" style={{ color: CREAM }}>
                  Verena<sup className="text-[0.55em] font-normal">™</sup>
                </span>
              </div>
              <p className="mt-3 max-w-[280px] text-sm leading-[21px]">A product of Invictus AI.</p>

              <p className="mt-3 text-xs leading-[18px]" style={{ color: "rgba(251, 245, 236, 0.45)" }}>
                548 Market St, Suite 200
                <br />
                San Francisco, CA 94104
              </p>

              <div className="mt-5 flex items-center gap-2.5">
                {([
                  { icon: "x" as const, label: "X (Twitter)" },
                  { icon: "linkedin" as const, label: "LinkedIn" },
                ]).map((social) => (
                  <a
                    key={social.icon}
                    href="#"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition hover:text-white"
                    style={{ background: "rgba(251, 245, 236, 0.07)" }}
                  >
                    <Icon name={social.icon} size={15} />
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {([
                  { icon: "globe" as const, label: "ISO 27001" },
                  { icon: "badge-check" as const, label: "SOC 2 Type II" },
                  { icon: "eu-stars" as const, label: "GDPR Ready" },
                  { icon: "medical-cross" as const, label: "HIPAA Compliant" },
                ]).map((badge) => (
                  <span
                    key={badge.label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: "rgba(251, 245, 236, 0.07)", color: "rgba(251, 245, 236, 0.6)" }}
                  >
                    <Icon name={badge.icon} size={12} />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "rgba(251, 245, 236, 0.45)" }}>
                Product
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="transition hover:text-white">Overview</a></li>
                <li><a href="#how-it-works" className="transition hover:text-white">How it works</a></li>
                <li><a href="#coverage" className="transition hover:text-white">Verified Coverage</a></li>
                <li><a href="#human" className="transition hover:text-white">+Human</a></li>
                <li><a href="#pricing" className="transition hover:text-white">Pricing</a></li>
                <li><a href="#" className="transition hover:text-white">Changelog</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "rgba(251, 245, 236, 0.45)" }}>
                Resources
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="transition hover:text-white">Trust Center</a></li>
                <li><a href="#" className="transition hover:text-white">Compliance Guides</a></li>
                <li><a href="#" className="transition hover:text-white">WCAG 2.1 AA Checklist</a></li>
                <li><a href="#" className="transition hover:text-white">Help Center</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "rgba(251, 245, 236, 0.45)" }}>
                Company
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="transition hover:text-white">Invictus AI</a></li>
                <li><a href="#" className="transition hover:text-white">Invictus Counsel</a></li>
                <li><a href="#" className="transition hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: "rgba(251, 245, 236, 0.45)" }}>
                Legal
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                <li><a href="#" className="transition hover:text-white">Legal Center</a></li>
                <li><a href="#" className="transition hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="transition hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="transition hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="transition hover:text-white">Accessibility Statement</a></li>
                <li><a href="#" className="transition hover:text-white">Cookie Preferences</a></li>
              </ul>
            </div>
          </div>

          <div
            className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"
            style={{ borderColor: "rgba(251, 245, 236, 0.12)", color: "rgba(251, 245, 236, 0.45)" }}
          >
            <p>&copy; {new Date().getFullYear()} Invictus AI. All rights reserved.</p>
            <p>Verena is in beta. Check important results before you act on them.</p>
          </div>
        </div>

        {/* Bleeding brand wordmark */}
        <div className="relative mt-8 h-[90px] select-none overflow-hidden sm:h-[150px] lg:h-[190px]" aria-hidden>
          <p
            className="verena-interactive-serif absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap leading-none tracking-tight"
            style={{
              fontSize: "clamp(6rem, 20vw, 16rem)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(251, 245, 236, 0.14)",
            }}
          >
            Verena
          </p>
        </div>
      </footer>
    </div>
  );
}
