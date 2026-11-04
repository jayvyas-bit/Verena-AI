import { useMemo, useState } from "react";
import { ACCENT, CREAM, FAQS, INK, MUTED } from "../VerenaHeroInteractive";

const FLAT = FAQS.flatMap((group) => group.items.map((item) => ({ ...item, category: group.category })));

const WIDTH = 820;
const HEIGHT = 520;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

function layoutPoints() {
  const categories = FAQS.map((g) => g.category);
  const points: { x: number; y: number; cx: number; cy: number; category: string; index: number }[] = [];
  let index = 0;
  categories.forEach((category, ci) => {
    const group = FAQS[ci];
    const angleBase = (ci / categories.length) * Math.PI * 2 - Math.PI / 2;
    const ringRadius = 150;
    const cx = CENTER.x + Math.cos(angleBase) * ringRadius;
    const cy = CENTER.y + Math.sin(angleBase) * ringRadius * 0.82;
    group.items.forEach((_, ii) => {
      const spread = group.items.length > 1 ? (ii / (group.items.length - 1) - 0.5) : 0;
      const localAngle = angleBase + spread * 0.9;
      const localRadius = 95 + (ii % 2) * 18;
      const x = CENTER.x + Math.cos(localAngle) * (ringRadius + localRadius);
      const y = CENTER.y + Math.sin(localAngle) * (ringRadius + localRadius) * 0.82;
      points.push({ x, y, cx, cy, category, index });
      index += 1;
    });
  });
  return points;
}

export default function FaqConstellation() {
  const points = useMemo(() => layoutPoints(), []);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const active = activeIndex !== null ? FLAT[activeIndex] : null;
  const activePoint = activeIndex !== null ? points[activeIndex] : null;

  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28" style={{ background: INK, color: CREAM }}>
      <style>{`
        @keyframes verena-star-twinkle {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }
        .verena-star { animation: verena-star-twinkle 3.2s ease-in-out infinite; }
        .verena-star-link { stroke-dasharray: 3 5; animation: verena-star-dash 18s linear infinite; }
        @keyframes verena-star-dash { to { stroke-dashoffset: -200; } }
        @media (prefers-reduced-motion: reduce) {
          .verena-star { animation: none !important; opacity: 0.85 !important; }
          .verena-star-link { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-[720px] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
          Concept 2 &middot; Knowledge constellation
        </p>
        <h2 className="verena-interactive-serif mt-3 text-balance text-3xl leading-[1.15] tracking-tight sm:text-4xl" style={{ color: CREAM }}>
          Every answer, mapped to where it lives.
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1100px] gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="FAQ constellation map">
          {FAQS.map((group) => {
            const groupPoints = points.filter((p) => p.category === group.category);
            const cx = groupPoints[0]?.cx ?? CENTER.x;
            const cy = groupPoints[0]?.cy ?? CENTER.y;
            return (
              <g key={group.category}>
                {groupPoints.map((p) => (
                  <line
                    key={`${p.index}-link`}
                    className="verena-star-link"
                    x1={cx}
                    y1={cy}
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(251, 245, 236, 0.18)"
                    strokeWidth={1}
                  />
                ))}
                <circle cx={cx} cy={cy} r={5} fill="rgba(251, 245, 236, 0.35)" />
                <text
                  x={cx}
                  y={cy - 12}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontWeight={600}
                  letterSpacing="0.04em"
                  fill="rgba(251, 245, 236, 0.55)"
                  style={{ textTransform: "uppercase" }}
                >
                  {group.category}
                </text>
              </g>
            );
          })}

          {points.map((p) => {
            const isActive = activeIndex === p.index;
            return (
              <g key={p.index} transform={`translate(${p.x}, ${p.y})`} style={{ cursor: "pointer" }} onClick={() => setActiveIndex(p.index)}>
                <circle
                  r={isActive ? 9 : 6}
                  fill={isActive ? ACCENT : CREAM}
                  className={isActive ? "" : "verena-star"}
                  style={{ animationDelay: `${p.index * 0.3}s`, transition: "r 240ms cubic-bezier(0.22,1,0.36,1)" }}
                />
                {isActive && <circle r={16} fill="none" stroke={ACCENT} strokeWidth={1} opacity={0.5} />}
              </g>
            );
          })}
        </svg>

        <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(251, 245, 236, 0.14)", background: "rgba(251, 245, 236, 0.04)" }}>
          {active && activePoint && (
            <div key={activeIndex} className="verena-interactive-pop">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
                {active.category}
              </p>
              <h3 className="mt-2 text-[17px] font-semibold leading-snug" style={{ color: CREAM }}>
                {active.q}
              </h3>
              <p className="mt-3 text-[14px] leading-[22px]" style={{ color: "rgba(251, 245, 236, 0.7)" }}>
                {active.a}
              </p>
            </div>
          )}
          <p className="mt-6 text-[11px]" style={{ color: MUTED }}>
            Click any star to read its answer.
          </p>
        </div>
      </div>
    </section>
  );
}
