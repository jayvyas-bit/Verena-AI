import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import verenaGem from "../../assets/verena-gem.png";

const INK = "#2D000F";
const ACCENT = "#FCF56F";
const CREAM = "#FBF5EC";
const MUTED = "#796268";

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

// Placeholder stat and logos for layout purposes only — swap for real customer data before launch.
const COMPANY_LOGOS: { name: string; mark?: string; color: string; icon: JSX.Element }[] = [
  {
    name: "Acme",
    color: "#111111",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3l9 18H3L12 3Z" />
      </svg>
    ),
  },
  {
    name: "Brightline",
    mark: "®",
    color: "#2563EB",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 3v18M5 4h11l-3 4 3 4H5" />
      </svg>
    ),
  },
  {
    name: "Northpeak",
    color: "#2563EB",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 18l5-8 3 4 2-3 8 7H3Z" />
      </svg>
    ),
  },
  {
    name: "ClaraHealth",
    color: "#7C3AED",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    name: "Rivermark",
    mark: "™",
    color: "#0D9488",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 15c2-3 4 3 6 0s4 3 6 0 4 3 6 0" />
      </svg>
    ),
  },
];

function Icon({
  name,
  size = 16,
}: {
  name: "search" | "shield" | "eye" | "lock" | "trend" | "check" | "sparkle" | "arrow" | "spinner" | "menu" | "close" | "layers";
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

export function VerenaHeroInteractive() {
  const [showBanner, setShowBanner] = useState(true);
  const [domain, setDomain] = useState("");
  const [openDropdown, setOpenDropdown] = useState<NavDropdownKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(PILLS.map((pill) => pill.label));
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 2600);
    return () => window.clearInterval(id);
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

  return (
    <div className="verena-interactive flex min-h-screen flex-col bg-[#FCFAF8]" style={{ color: INK }}>
      <style>{`
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
        .verena-interactive-placeholder { animation: verena-interactive-placeholder-fade 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes verena-interactive-placeholder-fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Announcement bar */}
      {showBanner && (
        <>
          <div className="h-[3px]" style={{ background: INK }} />
          <div
            className="relative flex items-center justify-center gap-2 px-10 py-2.5 text-center text-sm font-medium"
            style={{ background: ACCENT, color: INK }}
          >
            We&rsquo;re in Beta! Explore Verena early and help shape what&rsquo;s next.
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition hover:bg-black/10 active:scale-90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </>
      )}

      {/* Nav */}
      <div className="w-full" style={{ background: "#FFFFFF" }}>
        <header className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-5 sm:px-10">
          <div className="flex items-center gap-2">
            <GemMark size={26} />
            <span className="verena-interactive-serif text-xl font-medium">
              Verena<sup className="text-[0.55em] font-normal">™</sup>
            </span>
          </div>

          <nav className="hidden items-center gap-7 text-[15px] font-medium md:flex" style={{ color: "color-mix(in srgb, currentColor 85%, transparent)" }}>
            <NavItem label="Product" dropdownKey="Product" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem label="Pricing" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem label="Resources" dropdownKey="Resources" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem label="Contact us" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden text-sm font-medium sm:inline">Log in</span>
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold transition duration-200 hover:brightness-95 active:scale-[0.97]"
              style={{ background: ACCENT, color: INK }}
            >
              Talk to founder
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
            className="flex flex-col gap-1 border-t px-6 py-4 text-left text-[15px] font-medium md:hidden"
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
        <h1 className="verena-interactive-serif max-w-4xl text-[2.75rem] leading-[1.1] sm:text-[3.5rem]">
          Your website looks ready.
          <br />
          But what might be missing?
        </h1>
        <p className="mt-5 max-w-4xl text-balance text-lg" style={{ color: MUTED }}>
          Privacy, accessibility, and other website requirements aren't always obvious.
          Verena uses AI to spot potential issues, show supporting evidence, and help you understand what to review next.
        </p>

        {/* Interactive media panel */}
        <div className="relative mt-14 w-full max-w-[1280px]">
          <div
            className="relative h-[clamp(360px,42vh,460px)] overflow-hidden rounded-[32px]"
            style={{
              background:
                "radial-gradient(55% 70% at 97% -8%, #F6C04D 0%, rgba(246,192,77,0) 60%), " +
                "radial-gradient(90% 60% at 72% 85%, #8C1D40 0%, rgba(140,29,64,0.45) 28%, rgba(140,29,64,0) 62%), " +
                "radial-gradient(60% 55% at 4% 108%, #F3D7DC 0%, rgba(243,215,220,0) 65%), " +
                CREAM,
            }}
          >
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
                <div className="relative min-w-0 flex-1">
                  <input
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                    type="text"
                    id="verena-interactive-domain"
                    name="domain"
                    autoComplete="url"
                    placeholder=""
                    className="w-full min-w-0 bg-transparent text-left text-[15px] outline-none"
                    style={{ color: INK }}
                  />
                  {domain.length === 0 && (
                    <span
                      key={placeholderIndex}
                      aria-hidden
                      className="verena-interactive-placeholder pointer-events-none absolute inset-y-0 left-0 flex items-center text-left text-[15px]"
                      style={{ color: MUTED }}
                    >
                      {PLACEHOLDER_EXAMPLES[placeholderIndex]}
                    </span>
                  )}
                </div>
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
                      className="flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium shadow-sm transition hover:brightness-95"
                      style={
                        active
                          ? { background: INK, color: CREAM }
                          : { background: "#FFFFFF", color: MUTED }
                      }
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

      {/* Trust strip */}
      <div
        className="w-full"
        style={{
          background: "#F5E9DC",
          boxShadow: "inset 0 1px 0 rgba(45, 0, 15, 0.06)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center gap-x-10 gap-y-6 px-6 py-10 sm:px-10">
          <div className="flex items-center gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm"
              style={{ background: "#FFFFFF", color: "#8C1D40" }}
            >
              <Icon name="layers" size={22} />
            </span>
            <div className="text-left">
              <p className="verena-interactive-serif text-2xl leading-none" style={{ color: "#8C1D40" }}>
                12,500+
              </p>
              <p className="mt-1 text-sm" style={{ color: MUTED }}>
                Websites analyzed
              </p>
            </div>
          </div>

          <div className="hidden h-10 w-px sm:block" style={{ background: "rgba(45, 0, 15, 0.1)" }} />

          <p className="max-w-[9rem] text-left text-sm font-medium" style={{ color: MUTED }}>
            Trusted by companies of all sizes
          </p>

          <div className="flex flex-1 flex-wrap items-center gap-x-9 gap-y-4 sm:justify-end">
            {COMPANY_LOGOS.map((logo) => (
              <span key={logo.name} className="flex items-center gap-2 text-[15px] font-semibold opacity-80" style={{ color: INK }}>
                <span style={{ color: logo.color }}>{logo.icon}</span>
                {logo.name}
                {logo.mark && <sup className="text-[0.5em] font-normal">{logo.mark}</sup>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
