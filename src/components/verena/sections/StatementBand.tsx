import { bricolage, INK } from "../verenaHomepage.data";
import { useReveal } from "../verenaHomepage.hooks";
import { ComplianceFlowDiagram, ComplianceFlowDiagramMobile } from "../VerenaMockups";

export function StatementBand() {
  const [statementRef, statementVisible] = useReveal<HTMLElement>();

  return (
    <section
      ref={statementRef}
      style={{ backgroundColor: INK }}
      className="section-pad-x section-pad-y-lg relative flex flex-col items-center overflow-hidden text-center text-white"
    >
      <div
        className={`area-reveal relative z-10 flex max-w-[960px] flex-col items-center gap-2 ${statementVisible ? "is-shown" : ""}`}
      >
        <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
          Website compliance shouldn't take
          <br className="hidden sm:block" />
          {" "}over your to-do list
        </h2>
        <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6">
          No more piecing together information from different sources. Verena brings
          <br className="hidden sm:block" />
          {" "}your website review into one place.
        </p>
      </div>
      <div
        className={`area-reveal relative z-10 mt-16 w-full ${statementVisible ? "is-shown" : ""}`}
        style={{ transitionDelay: statementVisible ? "150ms" : "0ms" }}
      >
        <ComplianceFlowDiagramMobile />
        <ComplianceFlowDiagram active={statementVisible} />
      </div>
    </section>
  );
}
