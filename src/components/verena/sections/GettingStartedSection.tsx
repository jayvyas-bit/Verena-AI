import { useEffect, useState } from "react";
import { ANALYZE_CARDS, bricolage, ANALYZE_LOOP_MS, CREAM, INK } from "../verenaHomepage.data";
import { StepIcon } from "../verenaHomepage.icons";
import { useInViewport, useReveal } from "../verenaHomepage.hooks";
import { AnalyzeMockup } from "../VerenaMockups";

export function GettingStartedSection() {
  const [startedRef, startedVisible] = useReveal<HTMLElement>();
  const [startedInViewRef, startedInView] = useInViewport<HTMLElement>(0.2);
  const [analyzeLoopKey, setAnalyzeLoopKey] = useState(0);
  const [analyzeLoopPaused, setAnalyzeLoopPaused] = useState(false);
  const reducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!startedInView) return;
    if (analyzeLoopPaused) return;
    if (reducedMotion) return;
    const intervalId = window.setInterval(() => {
      setAnalyzeLoopKey((key) => key + 1);
    }, ANALYZE_LOOP_MS);
    return () => window.clearInterval(intervalId);
  }, [startedInView, analyzeLoopPaused, reducedMotion]);

  return (
    <section
      ref={(el) => {
        startedRef.current = el;
        startedInViewRef.current = el;
      }}
      style={{ backgroundColor: CREAM }}
      className="section-pad-x section-pad-y flex flex-col gap-8 sm:gap-16"
    >
      <div
        className={`area-reveal mx-auto flex w-full max-w-[960px] flex-col items-center gap-2 text-center ${startedVisible ? "is-shown" : ""}`}
      >
        <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
          Getting started is simpler than you think
        </h2>
        <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6">
          Set up your website, run an analysis, and explore the findings at your own pace.
        </p>
        {reducedMotion ? null : (
          <button
            type="button"
            onClick={() => setAnalyzeLoopPaused((prev) => !prev)}
            aria-label={analyzeLoopPaused ? "Resume automatic preview" : "Pause automatic preview"}
            aria-pressed={analyzeLoopPaused}
            className="mt-2 flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition duration-200 ease-out hover:scale-[1.03] active:scale-95 active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
            style={{ backgroundColor: "rgba(33,12,55,0.06)", color: INK }}
          >
            {analyzeLoopPaused ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            )}
            {analyzeLoopPaused ? "Resume preview" : "Pause preview"}
          </button>
        )}
      </div>
      <div className="mx-auto grid w-full max-w-[1536px] gap-8 sm:grid-cols-3">
        {ANALYZE_CARDS.map((card, i) => (
          <div
            key={i}
            className={`area-reveal flex flex-col overflow-hidden rounded-2xl bg-white ${startedVisible ? "is-shown" : ""}`}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="p-4 pb-0 sm:p-6 sm:pb-0">
              <div
                className="rounded-xl p-3 transition-transform duration-300 ease-out hover:scale-[1.015] sm:p-4"
                style={{ backgroundColor: "#f2f1f3" }}
              >
                <AnalyzeMockup key={analyzeLoopKey} step={card.icon} />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3 p-5 pt-4 text-center sm:p-8 sm:pt-6">
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
  );
}
