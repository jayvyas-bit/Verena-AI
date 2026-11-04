import { useState } from "react";
import { ACCENT, CREAM, FAQS, INK, MUTED } from "../VerenaHeroInteractive";

const FLAT = FAQS.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));

export default function FaqRedacted() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set([0]));

  const toggle = (index: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28" style={{ background: CREAM }}>
      <style>{`
        @keyframes verena-peel-lift {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-14px) rotate(-3deg); opacity: 0; }
        }
        .verena-redacted-bar {
          transform-origin: left center;
          transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .verena-redacted-bar.is-peeled {
          animation: verena-peel-lift 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .verena-redacted-bar.is-peeled { animation: none !important; opacity: 0 !important; transform: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[720px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
          Concept 3 &middot; Redacted file
        </p>
        <h2 className="verena-interactive-serif mt-3 text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl">
          Nothing about your compliance stays classified.
        </h2>
      </div>

      <div className="mx-auto mt-14 max-w-[760px] rounded-sm border shadow-[0_18px_50px_-24px_rgba(45,0,15,0.35)]" style={{ borderColor: "rgba(45, 0, 15, 0.12)", background: "#FFFFFF" }}>
        <div className="flex items-center justify-between border-b px-6 py-4 sm:px-10" style={{ borderColor: "rgba(45, 0, 15, 0.1)" }}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: MUTED }}>
              File No. VRN-FAQ-01
            </p>
            <p className="verena-interactive-serif mt-1 text-lg">Compliance Q&amp;A Disclosure</p>
          </div>
          <span
            className="rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em]"
            style={{ borderColor: INK, color: INK }}
          >
            Declassify to read
          </span>
        </div>

        <div className="divide-y px-6 py-2 sm:px-10" style={{ borderColor: "rgba(45, 0, 15, 0.08)" }}>
          {FLAT.map((faq, index) => {
            const isRevealed = revealed.has(index);
            return (
              <div key={faq.q} className="py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: MUTED }}>
                  {faq.category}
                </p>
                <p className="mt-1.5 text-[15px] font-semibold leading-snug">{faq.q}</p>

                <div className="relative mt-3">
                  <p
                    className="text-[14px] leading-[22px]"
                    style={{ color: MUTED, visibility: isRevealed ? "visible" : "hidden" }}
                  >
                    {faq.a}
                  </p>

                  {!isRevealed && (
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="absolute inset-0 flex items-center justify-start overflow-hidden rounded-[2px] px-3 text-left"
                      style={{ background: INK }}
                      aria-label={`Reveal answer: ${faq.q}`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
                        Click to declassify
                      </span>
                    </button>
                  )}

                  {isRevealed && (
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="verena-redacted-bar is-peeled pointer-events-none absolute inset-0 flex items-center rounded-[2px] px-3"
                      style={{ background: INK }}
                      aria-hidden
                      tabIndex={-1}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
                        Click to declassify
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
