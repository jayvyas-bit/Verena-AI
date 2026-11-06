import { useState } from "react";
import gradientBackdrop from "../../../assets/homepage/image-19.webp";
import { bricolage, CREAM, INK, REVIEW_AREAS } from "../verenaHomepage.data";
import { AreaIcon } from "../verenaHomepage.icons";
import { useReveal, useStageTransition } from "../verenaHomepage.hooks";
import { AreaDetailCard } from "../VerenaMockups";

export function SixAreasSection() {
  const [areasRef, areasVisible] = useReveal<HTMLElement>();
  const [activeArea, setActiveArea] = useState(0);
  const leavingArea = useStageTransition(activeArea);

  return (
    <section
      ref={areasRef}
      style={{ backgroundColor: CREAM }}
      className="section-pad-x section-pad-y flex flex-col items-center gap-8 sm:gap-16"
    >
      <div
        className={`area-reveal flex max-w-[960px] flex-col items-center gap-2 text-center ${areasVisible ? "is-shown" : ""}`}
      >
        <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
          Six areas. One website review.
        </h2>
        <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6">
          From accessibility and privacy to cookies, policies, emails, and marketing claims
        </p>
      </div>
      <div className="grid w-full max-w-[1536px] gap-10 lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col gap-3" role="group" aria-label="Review areas" aria-controls="area-detail-panel">
          {REVIEW_AREAS.map((area, index) => {
            const isActive = activeArea === index;
            return (
              <div
                key={area.title}
                className={`area-reveal overflow-hidden rounded-2xl transition-colors duration-200 ${
                  isActive ? "" : "bg-white hover:bg-[rgba(33,12,55,0.025)]"
                } ${areasVisible ? "is-shown" : ""}`}
                style={{
                  transitionDelay: `${Math.min(index, 6) * 70}ms`,
                  border: isActive ? `1px solid ${INK}` : "1px solid rgba(33,12,55,0.08)",
                  ...(isActive ? { backgroundColor: INK, color: "#fff" } : undefined),
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveArea(index)}
                  aria-pressed={isActive}
                  aria-expanded={isActive}
                  className="flex w-full items-start gap-4 px-5 py-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                >
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: isActive ? `${area.statusColor}08` : `${area.statusColor}14`, color: area.statusColor }}
                  >
                    <AreaIcon name={area.icon} size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        style={{ ...bricolage, opacity: isActive ? 1 : 0.7 }}
                        className="text-[22px] font-semibold tracking-[-0.01em] transition-opacity sm:text-[26px]"
                      >
                        {area.title}
                      </span>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[12px] font-semibold"
                        style={{ backgroundColor: isActive ? `${area.statusColor}08` : `${area.statusColor}14`, color: area.statusColor }}
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
          className={`area-reveal hidden min-h-[520px] items-stretch justify-center overflow-hidden rounded-[20px] p-4 sm:p-8 lg:relative lg:flex lg:sticky lg:top-24 lg:self-start ${areasVisible ? "is-shown" : ""}`}
          style={{ backgroundColor: CREAM, transitionDelay: "150ms" }}
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
  );
}
