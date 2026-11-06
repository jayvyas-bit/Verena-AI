import { Fragment, useEffect, useState } from "react";
import { ANALYZE_CARDS, bricolage, ANALYZE_LOOP_MS, CREAM, INK } from "../verenaHomepage.data";
import { StepIcon } from "../verenaHomepage.icons";
import { useInViewport, useReveal } from "../verenaHomepage.hooks";
import { AnalyzeMockup } from "../VerenaMockups";

export function GettingStartedSection() {
  const [startedRef, startedVisible] = useReveal<HTMLElement>();
  const [startedInViewRef, startedInView] = useInViewport<HTMLElement>(0.2);
  const [analyzeLoopKey, setAnalyzeLoopKey] = useState(0);

  useEffect(() => {
    if (!startedInView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervalId = window.setInterval(() => {
      setAnalyzeLoopKey((key) => key + 1);
    }, ANALYZE_LOOP_MS);
    return () => window.clearInterval(intervalId);
  }, [startedInView]);

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
      </div>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 sm:flex-row sm:items-start sm:gap-0">
        {ANALYZE_CARDS.map((card, i) => {
          const isLead = i === 1;
          return (
            <Fragment key={i}>
              <div
                className={`area-reveal relative flex flex-1 flex-col gap-4 text-left ${isLead ? "sm:flex-[1.12]" : ""} ${startedVisible ? "is-shown" : ""}`}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <div className="flex items-baseline gap-2.5">
                  <span
                    style={{ ...bricolage, color: INK, opacity: isLead ? 1 : 0.3 }}
                    className="text-[44px] font-semibold leading-none sm:text-[56px]"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <span style={{ color: INK, opacity: 0.45 }}>
                    <StepIcon name={card.icon} />
                  </span>
                </div>
                <div
                  className="rounded-2xl p-3 transition-colors duration-300 sm:p-4"
                  style={{ backgroundColor: isLead ? INK : "#f2f1f3" }}
                >
                  <AnalyzeMockup key={analyzeLoopKey} step={card.icon} />
                </div>
                <h3
                  style={bricolage}
                  className={`font-semibold leading-tight tracking-[-0.01em] ${isLead ? "text-[26px] sm:text-[34px]" : "text-[20px] sm:text-[26px]"}`}
                >
                  {card.title}
                </h3>
                <p className="max-w-[320px] text-[14px] leading-5 sm:text-[15px] sm:leading-6" style={{ color: INK, opacity: 0.75 }}>
                  {card.body}
                </p>
              </div>

              {i < ANALYZE_CARDS.length - 1 && (
                <div aria-hidden="true" className="flex shrink-0 sm:items-start sm:pt-8">
                  <div className="ml-5 h-8 w-px sm:hidden" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
                  <svg
                    className="hidden sm:mx-5 sm:block sm:w-10 lg:mx-8 lg:w-14"
                    height="16"
                    viewBox="0 0 56 16"
                    fill="none"
                  >
                    <path
                      d="M0 8H50M50 8L41 1M50 8L41 15"
                      stroke={INK}
                      strokeOpacity="0.2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
