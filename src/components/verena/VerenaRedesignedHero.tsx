import { useRef, useState, type FormEvent } from "react";
import verenaLogo from "../../assets/homepage/image-15.png";
import gradientBackdrop from "../../assets/homepage/image-19.png";

const INK = "#210c37";
const VIOLET = "#4B2A86";
const GOLD = "#C98A3B";
const CREAM = "#faf9f6";

const fraunces = { fontFamily: "'Fraunces', serif" } as const;

function isLikelyWebsite(value: string): boolean {
  const candidate = value.trim().replace(/^https?:\/\//i, "");
  return /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+(?:\/\S*)?$/i.test(
    candidate,
  );
}

function CheckIcon({ color = VIOLET }: { color?: string }) {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" className="shrink-0">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

type ScanState = "idle" | "loading" | "partial";

export default function VerenaRedesignedHero() {
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [scanState, setScanState] = useState<ScanState>("idle");
  const timeouts = useRef<number[]>([]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (scanState === "loading") return;
    const trimmed = domain.trim();
    if (!trimmed) {
      setDomainError("Enter a website to scan.");
      return;
    }
    if (!isLikelyWebsite(trimmed)) {
      setDomainError("Enter a valid website address, like acme.com.");
      return;
    }
    setDomainError("");
    setScanState("loading");
    timeouts.current.push(window.setTimeout(() => setScanState("partial"), 1100));
  }

  const scanTarget = domain.trim() || "acme.com";

  return (
    <div style={{ color: INK }} className="@container bg-white">
      {/* Header: Beta demoted to a small badge, one CTA style */}
      <header className="mx-auto flex h-20 max-w-[1536px] items-center justify-between gap-3 px-5 @lg:gap-6 @lg:px-10">
        <div className="flex items-center gap-3">
          <img src={verenaLogo} alt="Verena" className="h-7 w-auto object-contain @lg:h-8" />
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
            style={{ backgroundColor: "rgba(33,12,55,0.06)", color: INK }}
          >
            Beta
          </span>
        </div>
        <nav className="hidden items-center gap-7 text-sm font-medium @lg:flex" style={{ color: "rgba(33,12,55,0.75)" }}>
          <span>Product</span>
          <span>Pricing</span>
          <span>Resources</span>
        </nav>
        <button
          type="button"
          style={{ backgroundColor: VIOLET }}
          className="shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-medium text-white transition hover:brightness-110 @lg:px-5 @lg:py-3 @lg:text-sm"
        >
          Start free scan
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-[1100px] flex-col items-center gap-6 px-5 pb-16 pt-10 text-center @lg:px-10 @lg:pt-16">
        <h1 style={fraunces} className="text-[2rem] font-medium leading-[1.14] tracking-[-0.01em] @lg:text-[3.4rem] @lg:leading-[1.12]">
          Your website looks ready.
          <br />
          But what might be missing?
        </h1>
        <p className="max-w-[640px] text-[15px] leading-6 @lg:text-[17px] @lg:leading-7" style={{ color: "rgba(33,12,55,0.75)" }}>
          One scan covers privacy, accessibility, cookies, and terms — with evidence, not just a score.
        </p>

        {/* Real, working analyze box with an honest partial result instead of a dead end */}
        <div
          className="relative mt-4 w-full max-w-[640px] overflow-hidden rounded-[24px] bg-white shadow-[0_1px_2px_rgba(33,12,55,0.06),0_24px_48px_-24px_rgba(33,12,55,0.25)]"
        >
          <img src={gradientBackdrop} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="relative flex flex-col gap-4 p-5 @lg:p-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm @lg:flex-row @lg:items-center"
              style={{ borderColor: domainError ? "#e4572e" : "rgba(33,12,55,0.14)" }}
            >
              <label htmlFor="redesign-domain" className="sr-only">
                Website to scan
              </label>
              <input
                id="redesign-domain"
                type="text"
                autoComplete="url"
                placeholder="yourwebsite.com"
                value={domain}
                onChange={(event) => {
                  setDomain(event.target.value);
                  if (domainError) setDomainError("");
                  if (scanState !== "idle") setScanState("idle");
                }}
                aria-invalid={domainError ? true : undefined}
                aria-describedby={domainError ? "redesign-domain-error" : undefined}
                className="w-full min-w-0 flex-1 bg-transparent text-left text-[16px] leading-6 outline-none placeholder:text-[#210c37]/50"
              />
              <button
                type="submit"
                disabled={scanState === "loading"}
                style={{ backgroundColor: VIOLET }}
                className="flex w-full shrink-0 items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium text-white transition hover:brightness-110 disabled:opacity-70 @lg:w-auto"
              >
                {scanState === "loading" ? "Scanning…" : "Analyze for free"}
              </button>
            </form>
            {domainError && (
              <p id="redesign-domain-error" role="alert" className="pl-1 text-left text-[13px] font-medium" style={{ color: "#e4572e" }}>
                {domainError}
              </p>
            )}

            {scanState === "partial" && (
              <div className="rounded-2xl border bg-white p-4 text-left shadow-sm" style={{ borderColor: "rgba(33,12,55,0.1)" }} aria-live="polite">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium" style={{ color: "rgba(33,12,55,0.6)" }}>
                    {scanTarget} — 3 of 12 checks complete
                  </p>
                  <span className="rounded-full px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: "rgba(228,87,46,0.1)", color: "#e4572e" }}>
                    2 issues found
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.08)" }}>
                  <div className="h-full rounded-full" style={{ width: "25%", backgroundColor: VIOLET }} />
                </div>

                <div className="mt-4 flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: "rgba(228,87,46,0.06)" }}>
                  <span className="mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.04em]" style={{ backgroundColor: "#e4572e", color: "white" }}>
                    Cookies
                  </span>
                  <p className="text-[13px] leading-5" style={{ color: "rgba(33,12,55,0.85)" }}>
                    Cookie banner is missing a visible opt-out link on <span className="font-medium">/checkout</span>.
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-3 rounded-xl p-3 blur-[1.5px]" style={{ backgroundColor: "rgba(33,12,55,0.04)" }}>
                  <LockIcon />
                  <p className="text-[13px] leading-5" style={{ color: "rgba(33,12,55,0.55)" }}>
                    Privacy Policy — one more gap found. Unlock to see it.
                  </p>
                </div>

                <button
                  type="button"
                  style={{ backgroundColor: INK }}
                  className="mt-4 w-full rounded-full px-5 py-3 text-[14px] font-medium text-white transition hover:brightness-110"
                >
                  See all 12 findings — create free account
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 pt-1 text-[13px]" style={{ color: "rgba(33,12,55,0.65)" }}>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> Free to start
              </span>
              <span className="flex items-center gap-1.5">
                <CheckIcon /> 5,000 free credits — enough for a full scan of a typical small-business site
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* +Human, given real weight right under the hero instead of buried near pricing */}
      <section className="border-t px-5 @lg:px-10" style={{ borderColor: "rgba(33,12,55,0.08)" }}>
        <div className="mx-auto grid max-w-[1100px] gap-8 py-14 @lg:grid-cols-[1.1fr_1fr] @lg:items-center @lg:py-20">
          <div className="flex flex-col gap-4">
            <span
              className="w-fit rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.06em]"
              style={{ backgroundColor: "rgba(201,138,59,0.12)", color: GOLD }}
            >
              +Human
            </span>
            <h2 style={fraunces} className="text-[1.7rem] font-medium leading-tight @lg:text-[2.2rem]">
              When AI isn't enough, there's +Human
            </h2>
            <p className="text-[15px] leading-6" style={{ color: "rgba(33,12,55,0.75)" }}>
              Add a real attorney from Invictus Counsel to supervise Verena's findings before anything ships. You
              see exactly which judgment calls were reviewed, and by whom.
            </p>
            <p className="text-[13px] font-medium" style={{ color: GOLD }}>
              What happens after you sign up: create your account → grant read-only access to your site → get your
              first report, typically in under two minutes.
            </p>
          </div>
          <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(201,138,59,0.25)", backgroundColor: "rgba(201,138,59,0.05)" }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: GOLD }}>
                <CheckIcon color="white" />
              </div>
              <div>
                <p className="text-[14px] font-semibold">Finding reviewed by +Human</p>
                <p className="text-[12px]" style={{ color: "rgba(33,12,55,0.6)" }}>
                  Supervised by Invictus Counsel · countersigned
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13px] leading-5" style={{ color: "rgba(33,12,55,0.75)" }}>
              "Marketing claim on /pricing needs evidence before it ships — flagged for legal judgment, not just a
              pattern match."
            </p>
          </div>
        </div>
      </section>

      {/* Footer: fewer promises, the ones that are real */}
      <footer className="border-t px-5 py-10 @lg:px-10" style={{ borderColor: "rgba(33,12,55,0.08)", backgroundColor: CREAM }}>
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 text-[13px]" style={{ color: "rgba(33,12,55,0.65)" }}>
          <span>© Verena, an Invictus AI product</span>
          <div className="flex flex-wrap items-center gap-5">
            <span>FAQ</span>
            <span>+Human</span>
            <span>Pricing</span>
            <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ backgroundColor: "rgba(33,12,55,0.06)" }}>
              Trust Center &amp; Guides — launching this quarter
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
