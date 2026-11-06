import { useEffect, useRef, type CSSProperties, type FormEvent } from "react";
import gradientBackdrop from "../../../assets/homepage/image-19.webp";
import { ACCENT, INK, PLACEHOLDER_EXAMPLES, STATUS_COLORS } from "../verenaHomepage.data";
import { CheckIcon, CursorPointerIcon, HeroStatusIcon, VerenaMarkIcon } from "../verenaHomepage.icons";

export function HeroSection({
  domain,
  domainError,
  status,
  onDomainChange,
  onSubmit,
}: {
  domain: string;
  domainError: string;
  status: "idle" | "loading" | "success";
  onDomainChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}) {
  const placeholderInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (placeholderInputRef.current) placeholderInputRef.current.placeholder = PLACEHOLDER_EXAMPLES[0];
      return;
    }

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

  return (
    <section className="section-pad-x section-pad-y-lg hero-pad-y-mobile flex flex-col items-center gap-8 text-center sm:gap-16">
      <div className="flex max-w-[860px] flex-col items-center gap-2">
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} className="fluid-h1 font-bold leading-[1.1] tracking-[-0.01em]">
          Your website looks ready.
          <br />
          But what might be{" "}
          <span className="relative inline-block" style={{ paddingBottom: "0.12em" }}>
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
          Privacy, accessibility, and other website requirements aren't always obvious. Verena uses
          AI to spot potential issues, show supporting evidence, and help you understand what to
          review next.
        </p>
      </div>

      <div className="hero-demo-box relative w-full max-w-[1280px] overflow-hidden rounded-[24px] bg-white shadow-sm">
        <img
          src={gradientBackdrop}
          alt=""
          width={2115}
          height={743}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 mx-auto flex w-[92%] max-w-[800px] flex-col items-stretch gap-2 py-9 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:py-0">
          <form
            onSubmit={onSubmit}
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
                onChange={(event) => onDomainChange(event.target.value)}
                aria-invalid={domainError ? true : undefined}
                aria-describedby={domainError ? "verena-homepage-domain-error" : undefined}
                className="w-full min-w-0 flex-1 bg-transparent text-left text-[16px] leading-6 outline-none placeholder:text-[#210c37]/70"
              />
            </div>
            <div className="relative w-full shrink-0 sm:w-auto">
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label={status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze"}
                style={{ backgroundColor: ACCENT }}
                className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium text-white transition duration-200 ease-out hover:brightness-110 active:scale-[0.96] active:duration-100 disabled:cursor-not-allowed disabled:hover:brightness-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:w-auto"
              >
                <span key={status} className="hero-input-pop flex items-center justify-center">
                  <HeroStatusIcon status={status} />
                </span>
                {status === "loading" ? "Analyzing" : status === "success" ? "Scan started" : "Analyze"}
              </button>
              <div
                aria-hidden="true"
                className="hero-click-cursor pointer-events-none absolute -bottom-2 -right-2 z-10 hidden sm:block"
              >
                <span
                  className="hero-click-cursor-ring absolute left-0 top-0 block h-6 w-6 rounded-full"
                  style={{ backgroundColor: INK }}
                />
                <span className="hero-click-cursor-tap relative block">
                  <CursorPointerIcon />
                </span>
                <span
                  className="ml-4 mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-4 text-white shadow-[0_2px_6px_rgba(33,12,55,0.25)]"
                  style={{ backgroundColor: INK }}
                >
                  You
                </span>
              </div>
            </div>
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
          {status !== "idle" && (
            <div
              aria-hidden="true"
              className="mx-auto h-1.5 w-full max-w-[280px] overflow-hidden rounded-full bg-white/95 shadow-[0_1px_2px_rgba(33,12,55,0.08)]"
            >
              <div
                key={status}
                className="demo-progress-fill h-full rounded-full"
                style={{
                  width: status === "success" ? "100%" : "85%",
                  backgroundColor: status === "success" ? STATUS_COLORS.verified : ACCENT,
                }}
              />
            </div>
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
              500 free credits
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
