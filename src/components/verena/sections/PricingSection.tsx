import { ACCENT, bricolage, CREAM, ENTERPRISE_PLAN, INK, SELF_SERVE_PLANS } from "../verenaHomepage.data";
import { useReveal } from "../verenaHomepage.hooks";

export function PricingSection() {
  const [pricingRef, pricingVisible] = useReveal<HTMLElement>();

  return (
    <section
      ref={pricingRef}
      style={{ backgroundColor: CREAM }}
      className="section-pad-x section-pad-y flex flex-col items-center gap-8 sm:gap-16"
    >
      <div
        className={`area-reveal flex max-w-[960px] flex-col items-center gap-2 text-center ${pricingVisible ? "is-shown" : ""}`}
      >
        <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
          Choose what works for you
        </h2>
        <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6">
          AI-enabled compliance review, priced by how many credits you need each month
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        {/* Compact plan cards — full feature comparison lives on the dedicated pricing page */}
        <div className="grid w-full max-w-[920px] grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {SELF_SERVE_PLANS.map((plan, planIndex) => {
            const isGhost = !plan.featured && plan.name === "Free";
            return (
              <div
                key={plan.name}
                style={plan.featured ? { backgroundColor: INK, transitionDelay: `${planIndex * 80}ms` } : { transitionDelay: `${planIndex * 80}ms` }}
                className={`area-reveal flex flex-col gap-3 rounded-[20px] p-5 sm:gap-4 sm:p-6 ${
                  plan.featured
                    ? "border border-transparent text-white"
                    : isGhost
                      ? "border border-dashed border-[rgba(33,12,55,0.22)] bg-[rgba(33,12,55,0.02)]"
                      : "border border-[rgba(33,12,55,0.12)] bg-white"
                } ${pricingVisible ? "is-shown" : ""}`}
              >
                {plan.featured ? (
                  <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white">
                    Recommended
                  </span>
                ) : (
                  <span className="h-[22px]" aria-hidden="true" />
                )}
                <div className="flex flex-col gap-1">
                  <h3 style={bricolage} className="text-[20px] font-semibold tracking-[-0.01em]">
                    {plan.name}
                  </h3>
                  <p className={`text-[13px] leading-5 ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-end gap-1">
                  <span style={bricolage} className="text-[30px] font-semibold leading-none">
                    ${plan.price}
                  </span>
                  {plan.period && (
                    <span className={`pb-0.5 text-[14px] ${plan.featured ? "opacity-70" : "opacity-60"}`}>
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className={`text-[12px] font-medium ${plan.featured ? "opacity-80" : "opacity-70"}`}>
                  {plan.credits}
                </p>

                <button
                  type="button"
                  style={plan.featured ? { backgroundColor: ACCENT, color: "#fff" } : undefined}
                  className={`mt-auto rounded-full px-5 py-3 text-[14px] font-medium transition duration-200 ease-out active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    plan.featured
                      ? "hover:-translate-y-px hover:brightness-110 focus-visible:ring-white focus-visible:ring-offset-[#210c37]"
                      : isGhost
                        ? "text-[#210c37] underline decoration-[rgba(33,12,55,0.35)] underline-offset-4 hover:decoration-[#2653F3] hover:text-[#2653F3] focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                        : "border border-[rgba(33,12,55,0.55)] hover:-translate-y-px hover:border-[#2653F3] hover:bg-[#2653F3] hover:text-white focus-visible:ring-[#210c37] focus-visible:ring-offset-white"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <a
          href="#"
          className="text-[14px] font-medium underline decoration-[rgba(33,12,55,0.3)] underline-offset-4 transition hover:decoration-[rgba(33,12,55,0.7)]"
        >
          See full pricing comparison
        </a>

        {/* Enterprise: contact bar instead of a fourth self-serve tier */}
        <div className="flex w-full max-w-[920px] flex-col items-center justify-between gap-4 rounded-[16px] border border-[rgba(33,12,55,0.12)] bg-[rgba(33,12,55,0.03)] p-6 sm:flex-row">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p style={bricolage} className="text-[16px] font-semibold">
              {ENTERPRISE_PLAN.name}
            </p>
            <p className="text-[13px] opacity-70">{ENTERPRISE_PLAN.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[13px] opacity-60">
              From ${ENTERPRISE_PLAN.price}{ENTERPRISE_PLAN.period}
            </span>
            <button
              type="button"
              className="rounded-full border border-[rgba(33,12,55,0.55)] px-5 py-2.5 text-[14px] font-medium transition duration-200 ease-out hover:-translate-y-px hover:border-[#2653F3] hover:bg-[#2653F3] hover:text-white active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {ENTERPRISE_PLAN.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
