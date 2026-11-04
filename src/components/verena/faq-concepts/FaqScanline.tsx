import { useState } from "react";
import { ACCENT, CREAM, FAQS, INK, MUTED } from "../VerenaHeroInteractive";

const FLAT = FAQS.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));
const SCAN_SECONDS = 10;

export default function FaqScanline() {
  const [openId, setOpenId] = useState<number | null>(0);

  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28" style={{ background: "#FFFFFF" }}>
      <style>{`
        @keyframes verena-scan-sweep {
          0% { top: -2%; opacity: 0; }
          4% { opacity: 1; }
          48% { opacity: 1; }
          52% { top: 100%; opacity: 0; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes verena-scan-resolve {
          0%, 6% { filter: blur(7px); opacity: 0.32; letter-spacing: 0.02em; }
          14%, 92% { filter: blur(0px); opacity: 1; letter-spacing: 0em; }
          100% { filter: blur(7px); opacity: 0.32; letter-spacing: 0.02em; }
        }
        .verena-scan-row { animation: verena-scan-resolve ${SCAN_SECONDS}s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .verena-scan-bar { animation: none !important; opacity: 0 !important; }
          .verena-scan-row { animation: none !important; filter: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[720px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
          Concept 1 &middot; Scanline reveal
        </p>
        <h2 className="verena-interactive-serif mt-3 text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl">
          I read your questions the same way I read your site.
        </h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-[820px] overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(45, 0, 15, 0.1)", background: "#FCFAF8" }}>
        {/* fake browser chrome */}
        <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#E7B4BE" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#F6C04D" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#9FD6B4" }} />
          <span className="ml-3 flex-1 rounded-md px-3 py-1 text-[11px]" style={{ background: "#FFFFFF", color: MUTED }}>
            your-questions.verena.ai
          </span>
        </div>

        {/* scanning surface */}
        <div className="relative px-6 py-5 sm:px-10">
          <div
            className="verena-scan-bar pointer-events-none absolute left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
              boxShadow: `0 0 18px 4px ${ACCENT}`,
              animation: `verena-scan-sweep ${SCAN_SECONDS}s linear infinite`,
            }}
          />
          <div className="flex flex-col divide-y" style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}>
            {FLAT.map((faq, index) => {
              const isOpen = openId === index;
              const delay = -(index / FLAT.length) * SCAN_SECONDS;
              return (
                <div key={faq.q} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : index)}
                    className="verena-scan-row flex w-full items-baseline justify-between gap-4 text-left"
                    style={{ animationDelay: `${delay}s` }}
                  >
                    <span className="text-[14px] font-semibold">{faq.q}</span>
                    <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                      {faq.category}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="verena-interactive-pop relative mt-3 ml-4 rounded-lg border-l-2 p-4" style={{ borderColor: ACCENT, background: INK, color: CREAM }}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
                        Annotation
                      </p>
                      <p className="mt-1.5 text-[13px] leading-[20px]" style={{ color: "rgba(251, 245, 236, 0.85)" }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
