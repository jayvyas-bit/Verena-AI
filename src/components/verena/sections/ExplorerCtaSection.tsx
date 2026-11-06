import { useState, type CSSProperties, type FormEvent } from "react";
import ctaExplorer from "../../../assets/homepage/cta-explorer.webp";
import { ACCENT, bricolage, CREAM, STATUS_COLORS } from "../verenaHomepage.data";
import { HeroStatusIcon, VerenaMarkIcon } from "../verenaHomepage.icons";
import { useReveal } from "../verenaHomepage.hooks";

interface ExplorerCtaSectionProps {
  domain: string;
  domainError: string;
  status: "idle" | "loading" | "success";
  onDomainChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

export function ExplorerCtaSection({ domain, domainError, status, onDomainChange, onSubmit }: ExplorerCtaSectionProps) {
  const [ctaRef, ctaVisible] = useReveal<HTMLElement>();
  const [ctaImageLoaded, setCtaImageLoaded] = useState(false);

  return (
    <section ref={ctaRef} className="relative overflow-hidden" style={{ backgroundColor: "#dcc3a0" }}>
      <img
        src={ctaExplorer}
        alt="A woman with a backpack standing in a wildflower meadow, pointing toward distant mountains at sunset"
        loading="lazy"
        onLoad={() => setCtaImageLoaded(true)}
        className="absolute inset-0 h-full w-full object-cover object-[32%_40%] transition-opacity duration-500 ease-out"
        style={{ opacity: ctaImageLoaded ? 1 : 0 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-40"
        style={{ background: "linear-gradient(to bottom, #fff 0%, transparent 100%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(55% 50% at 50% 18%, ${CREAM}eb 0%, ${CREAM}80 45%, transparent 75%)`,
        }}
      />
      <div
        className={`area-reveal section-pad-x relative mx-auto flex min-h-[640px] max-w-[1280px] flex-col items-center gap-8 pb-12 pt-12 text-center sm:min-h-[760px] sm:pb-28 sm:pt-6 ${ctaVisible ? "is-shown" : ""}`}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <h2
            style={bricolage}
            className="fluid-h2 font-semibold leading-tight tracking-[-0.01em] sm:whitespace-nowrap"
          >
            Explore what your website is missing
          </h2>
          <p className="max-w-[560px] text-[14px] leading-6 sm:text-[16px] sm:leading-6">
            Drop in your URL and Verena maps every compliance gap, with evidence and drafted fixes ready
            to ship
          </p>
        </div>

        <div className="flex w-full max-w-[560px] flex-col items-center gap-3">
          <form
            onSubmit={onSubmit}
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
                onChange={(event) => onDomainChange(event.target.value)}
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
  );
}
