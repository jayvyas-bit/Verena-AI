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
const YELLOW = "#feed65";
const CREAM = "#faf9f6";

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
  "linear-gradient(to right, transparent 0%, transparent calc(50% - 160px), black calc(50% - 60px), black calc(50% + 60px), transparent calc(50% + 160px), transparent 100%)";

const ANALYZE_CARDS = [
  {
    title: "Analyze",
    body: "Discover potential compliance issues across your website, from privacy to accessibility",
  },
  {
    title: "Analyze",
    body: "Discover potential compliance issues across your website, from privacy to accessibility",
  },
  {
    title: "Analyze",
    body: "Discover potential compliance issues across your website, from privacy to accessibility",
  },
];

const TOOL_TABS = [
  "Reports & Evidence",
  "AI-Drafted Document Changes",
  "Developer-Ready Code Suggestions",
  "Monitoring & Rechecks",
];

const REVIEW_AREAS = [
  {
    title: "Accessibility",
    body: "Spot potential barriers that make your website harder for people to use.",
  },
  {
    title: "Privacy Policy",
    body: "Check whether your policy clearly explains how personal information is collected and used.",
  },
  {
    title: "Cookies & Trackers",
    body: "See which tracking tools may be running and where consent needs attention.",
  },
  {
    title: "Terms of Service",
    body: "Find potential gaps or unclear wording in your website's terms.",
  },
  {
    title: "Commercial Email",
    body: "Review supported email-related requirements, including relevant disclosures and consent practices.",
  },
  {
    title: "Marketing Claims",
    body: "Spot promotional claims that may need stronger evidence or clearer wording.",
  },
];

const AVATAR_POSITIONS = [
  { top: "calc(50% - 409px)", left: "calc(50% - 0px)" },
  { top: "calc(50% - 192px)", left: "calc(50% - 538px)" },
  { top: "calc(50% - 212px)", left: "calc(50% + 536px)" },
  { top: "calc(50% + 409px)", left: "calc(50% - 0px)" },
  { top: "calc(50% + 213px)", left: "calc(50% - 527px)" },
  { top: "calc(50% + 285px)", left: "calc(50% + 464px)" },
];

const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    credits: "500 credits",
    description: "No credit card required. Enough to see what Verena finds.",
    cta: "Start free",
    featured: false,
  },
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    credits: "5,000 credits / month",
    description: "For a single website under ongoing review.",
    cta: "Choose Starter",
    featured: false,
  },
  {
    name: "Professional",
    price: "$299",
    period: "/month",
    credits: "25,000 credits / month",
    description: "For teams reviewing multiple websites regularly.",
    cta: "Choose Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$999",
    period: "/month",
    credits: "125,000 credits / month",
    description: "For organizations running compliance at scale.",
    cta: "Choose Enterprise",
    featured: false,
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

export function VerenaHomepage() {
  return (
    <div style={{ color: INK }} className="bg-white">
      {/* Announcement bar */}
      <div style={{ backgroundColor: INK }} className="flex h-10 items-center justify-center px-4 text-center">
        <p className="text-[14px] leading-[27px] text-white [font-weight:300]">
          We're in Beta! Explore Verena early and help shape what's next.
        </p>
      </div>

      {/* Nav */}
      <div className="flex h-20 items-center gap-4 bg-white px-6 py-4 sm:px-12">
        <img src={verenaLogo} alt="Verena" className="h-full w-auto object-contain" />
        <div className="flex-1" />
        <button
          style={{ backgroundColor: YELLOW }}
          className="rounded-[10px] px-5 py-3 text-sm font-medium"
        >
          Talk to founder
        </button>
      </div>

      {/* Hero */}
      <section className="flex flex-col items-center gap-12 px-4 py-20 text-center sm:py-24">
        <div className="flex max-w-[860px] flex-col items-center gap-5">
          <h1 style={bricolage} className="text-[40px] font-bold leading-[70.4px] sm:text-[56px] md:text-[64px]">
            Your website looks ready.
            <br />
            But what might be missing?
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
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute left-1/2 top-1/2 flex w-[92%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-xl border border-[rgba(33,12,55,0.12)] bg-white px-6 py-5 shadow-[0_1px_8px_rgba(45,0,15,0.08)]">
            <div className="h-6 w-6 shrink-0 overflow-hidden">
              <img
                src={verenaLogo}
                alt=""
                className="h-[102%] w-[474%] max-w-none"
                style={{ marginLeft: "-23%", marginTop: "-2%" }}
              />
            </div>
            <p className="flex-1 text-[16px] leading-6 opacity-60">
              Which website should Verena review?
            </p>
            <button
              style={{ backgroundColor: YELLOW }}
              className="shrink-0 rounded-[10px] px-5 py-4 text-sm font-medium"
            >
              Analyze
            </button>
          </div>
          <div className="absolute bottom-[25px] left-1/2 flex -translate-x-1/2 items-center gap-10 whitespace-nowrap text-[16px] leading-6">
            <p>Free to Start</p>
            <p>5000 free credits</p>
          </div>
        </div>
      </section>

      {/* Trusted-by logo strip */}
      <section className="relative flex items-center overflow-hidden px-4 py-20">
        <div className="relative w-full overflow-hidden">
          <div className="logo-marquee-track flex w-max items-center gap-14">
            {MARQUEE_LOGOS.map((logo, i) => (
              <img
                key={`gray-${i}`}
                src={logo.src}
                alt={logo.alt}
                className="h-12 shrink-0 grayscale"
                style={{ width: `${logo.width}px` }}
              />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="logo-marquee-track pointer-events-none absolute inset-0 flex w-max items-center gap-14"
            style={{ maskImage: LOGO_SPOTLIGHT_MASK, WebkitMaskImage: LOGO_SPOTLIGHT_MASK }}
          >
            {MARQUEE_LOGOS.map((logo, i) => (
              <img
                key={`color-${i}`}
                src={logo.src}
                alt=""
                className="h-12 shrink-0"
                style={{ width: `${logo.width}px` }}
              />
            ))}
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
      <section style={{ backgroundColor: INK }} className="flex flex-col items-center px-4 py-20 text-center text-white">
        <div className="flex max-w-[794px] flex-col items-center gap-5">
          <h2 style={bricolage} className="text-[32px] font-medium leading-tight sm:text-[48px]">
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
      <section style={{ backgroundColor: CREAM }} className="flex flex-col items-center gap-14 px-6 py-20 sm:px-24">
        <div className="flex max-w-[935px] flex-col items-center gap-4 text-center">
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
            Getting started is simpler than you think
          </h2>
          <p className="text-[18px] leading-[27px]">
            Set up your website, run an analysis, and explore the findings at your own pace.
          </p>
        </div>
        <div className="grid w-full max-w-[1536px] gap-8 sm:grid-cols-3">
          {ANALYZE_CARDS.map((card, i) => (
            <div key={i} className="flex flex-col gap-8 rounded-2xl bg-white p-8">
              <img
                src={analyzeScreenshot}
                alt=""
                className="aspect-[393/232] w-full rounded-lg object-cover"
              />
              <div className="flex flex-col items-center gap-3 text-center">
                <h3 style={bricolage} className="w-full text-[32px] font-semibold">
                  {card.title}
                </h3>
                <p className="w-full text-[16px] leading-6">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* More than a website scan */}
      <section className="flex flex-col items-center gap-14 px-6 py-24 sm:px-24">
        <div className="flex max-w-[595px] flex-col items-center gap-5 text-center">
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
            More than a website scan
          </h2>
          <p className="text-[18px] leading-[27px]">
            Explore the tools that help you understand findings, make improvements, and keep track
            of your website
          </p>
        </div>
        <div className="flex w-full max-w-[1536px] flex-col gap-10">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {TOOL_TABS.map((tab, i) => (
              <p
                key={tab}
                style={i === 0 ? { ...bricolage, borderColor: INK } : bricolage}
                className={`text-[18px] font-medium whitespace-nowrap ${
                  i === 0 ? "border-b-2 pb-[7px]" : ""
                }`}
              >
                {tab}
              </p>
            ))}
          </div>
          <div
            style={{ backgroundColor: INK }}
            className="relative flex items-end justify-center overflow-hidden rounded-[20px] pt-8"
          >
            <img
              src={gradientBackdrop}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="relative aspect-[1080/450] w-[70%] max-w-[1080px] rounded-t-2xl border-8 border-white/24 bg-black" />
          </div>
          <p className="text-[18px] leading-[27px]">
            Explore potential issues, supporting evidence, and explanations in one clear report
          </p>
        </div>
      </section>

      {/* Six areas */}
      <section style={{ backgroundColor: CREAM }} className="flex flex-col items-center gap-14 px-6 py-24 sm:px-24">
        <div className="flex max-w-[696px] flex-col items-center gap-5 text-center">
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
            Six areas. One website review.
          </h2>
          <p className="text-[18px] leading-[27px]">
            From accessibility and privacy to cookies, policies, emails, and marketing claims
          </p>
        </div>
        <div className="grid w-full max-w-[1536px] gap-6 lg:grid-cols-2">
          <div className="relative flex items-center justify-center overflow-hidden rounded-[20px] bg-white p-8">
            <img src={gradientBackdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative aspect-[450/500] w-full max-w-[450px] rounded-2xl bg-white" />
          </div>
          <div className="flex flex-col gap-8 rounded-[20px] bg-white p-8">
            {REVIEW_AREAS.map((area) => (
              <div key={area.title} className="flex flex-col gap-3">
                <h3 style={bricolage} className="text-[32px] font-semibold">
                  {area.title}
                </h3>
                <p className="text-[16px] leading-6">{area.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* +Human */}
      <section
        style={{ backgroundColor: INK }}
        className="relative flex min-h-[1018px] flex-col items-center justify-center gap-14 overflow-hidden px-4 py-20"
      >
        <img
          src={ellipse92}
          alt=""
          width={1236}
          height={818}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        {AVATAR_POSITIONS.map((pos, i) => (
          <img
            key={i}
            src={avatarPhoto}
            alt=""
            className="absolute size-[72px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[rgba(244,235,255,0.25)] object-cover"
            style={{ top: pos.top, left: pos.left }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center gap-10">
          <div className="h-8 w-[136px] bg-white" style={{ WebkitMaskImage: `url(${invictusMask})`, maskImage: `url(${invictusMask})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
          <div className="flex max-w-[861px] flex-col items-center gap-5 text-center text-white">
            <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
              When AI isn't enough, there's +Human
            </h2>
            <p className="text-[18px] leading-[27px]">
              Access optional professional support for questions that need more than an automated
              analysis
            </p>
          </div>
        </div>
        <button
          style={{ backgroundColor: YELLOW }}
          className="relative z-10 rounded-[10px] px-6 py-3 text-[16px] font-medium"
        >
          Explore +Human
        </button>
      </section>

      {/* Pricing */}
      <section style={{ backgroundColor: CREAM }} className="flex flex-col items-center gap-14 px-6 py-24 sm:px-24">
        <div className="flex max-w-[636px] flex-col items-center gap-5 text-center">
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
            Choose what works for you
          </h2>
          <p className="text-[18px] leading-[27px]">
            AI-enabled compliance review, priced by how many credits you need each month
          </p>
        </div>

        <div className="grid w-full max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              style={plan.featured ? { backgroundColor: INK } : undefined}
              className={`flex flex-col gap-6 rounded-[20px] p-8 ${
                plan.featured ? "text-white" : "border border-[rgba(33,12,55,0.12)] bg-white"
              }`}
            >
              <div className="flex flex-col gap-2">
                <p style={bricolage} className="text-[18px] font-semibold">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span style={bricolage} className="text-[36px] font-semibold leading-none">
                    {plan.price}
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
              <button
                style={plan.featured ? { backgroundColor: YELLOW, color: INK } : undefined}
                className={`mt-auto rounded-[10px] px-5 py-3 text-sm font-medium ${
                  plan.featured ? "" : "border border-[rgba(33,12,55,0.3)]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="max-w-[500px] text-[16px] leading-6 opacity-70">
          Add +Human to any plan for an attorney-supervised review from Invictus Counsel.
        </p>
      </section>

      {/* FAQ */}
      <section className="flex flex-col items-center gap-14 px-4 py-24 text-center">
        <div className="flex max-w-[909px] flex-col items-center gap-5">
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
            Good questions deserve clear answers.
          </h2>
          <p className="text-[18px] leading-[27px]">
            Straightforward answers about Verena, getting started, and professional support
          </p>
        </div>

        <div className="flex w-full max-w-[760px] flex-col text-left">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group border-b border-[rgba(33,12,55,0.12)] py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
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
              <p className="mt-4 max-w-[680px] text-[16px] leading-6 opacity-70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: CREAM }} className="flex flex-col items-center gap-10 px-4 py-24 text-center">
        <div className="flex max-w-[691px] flex-col items-center gap-5">
          <h2 style={bricolage} className="text-[32px] font-semibold leading-tight sm:text-[48px]">
            Your website. Your next move.
          </h2>
          <p className="text-[18px] leading-[27px]">
            Start with your URL and take the first step toward understanding your website's
            compliance needs.
          </p>
        </div>

        <div className="flex w-full max-w-[600px] flex-col items-center gap-4 sm:flex-row">
          <div className="flex h-14 w-full items-center rounded-[10px] border border-[rgba(33,12,55,0.12)] bg-white px-5">
            <p className="text-[16px] leading-6 opacity-50">yourwebsite.com</p>
          </div>
          <button
            style={{ backgroundColor: YELLOW }}
            className="h-14 w-full shrink-0 rounded-[10px] px-6 text-sm font-medium sm:w-auto"
          >
            Analyze for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative overflow-hidden px-6 pt-16 sm:px-10"
        style={{ backgroundColor: INK, color: "rgba(250, 249, 246, 0.7)" }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <img src={verenaLogo} alt="Verena" className="h-7 w-auto object-contain brightness-0 invert" />
              <p className="mt-3 max-w-[280px] text-sm leading-[21px]">A product of Invictus AI.</p>
              <p className="mt-3 text-xs leading-[18px]" style={{ color: "rgba(250, 249, 246, 0.45)" }}>
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
                    className="flex h-9 w-9 items-center justify-center rounded-full transition hover:text-white"
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
                  style={{ ...bricolage, color: "rgba(250, 249, 246, 0.45)" }}
                  className="text-xs font-semibold uppercase tracking-[0.1em]"
                >
                  {group.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition hover:text-white">
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
            style={{ borderColor: "rgba(250, 249, 246, 0.12)", color: "rgba(250, 249, 246, 0.45)" }}
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
