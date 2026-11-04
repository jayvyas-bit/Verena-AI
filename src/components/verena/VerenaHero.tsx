import { useRef, useState, type CSSProperties, type FormEvent, type PointerEvent } from "react";
import verenaGem from "../../assets/verena-gem.png";

const INK = "#2D000F";
const ACCENT = "#FCF56F";

const STEPS = [
  { n: "01", title: "Scan", body: "Verena crawls every page, policy, and form on your site." },
  { n: "02", title: "Flag", body: "Privacy, accessibility, and compliance gaps surface in minutes." },
  { n: "03", title: "Fix", body: "Each finding ships with a clear next step, drafted for you." },
];

function DiamondMark({ size = 24 }: { size?: number }) {
  return <img src={verenaGem} alt="" width={size} height={size} style={{ objectFit: "contain" }} aria-hidden />;
}

export function VerenaHero() {
  const [domain, setDomain] = useState("");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const bounds = panelRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setTilt({
      x: (event.clientX - bounds.left) / bounds.width - 0.5,
      y: (event.clientY - bounds.top) / bounds.height - 0.5,
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function scrollToNext() {
    document.getElementById("verena-next")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const rootStyle = {
    "--ink": INK,
    "--accent": ACCENT,
    "--cream": "#FBF5EC",
    "--muted": "#796268",
  } as CSSProperties;

  return (
    <div style={rootStyle} className="verena-redesign">
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
        .verena-redesign { background: var(--cream); color: var(--ink); }
        .verena-serif { font-family: "Fraunces", "Iowan Old Style", Georgia, serif; }
        .verena-dot { animation: verena-pulse 2.2s ease-out infinite; }
        .verena-blob { filter: blur(54px); transition: transform 0.4s ease-out; }
        .verena-chevron { animation: verena-bounce 2s ease-in-out infinite; }
        @keyframes verena-pulse {
          0% { box-shadow: 0 0 0 0 rgba(45, 0, 15, 0.35); }
          70% { box-shadow: 0 0 0 7px rgba(45, 0, 15, 0); }
          100% { box-shadow: 0 0 0 0 rgba(45, 0, 15, 0); }
        }
        @keyframes verena-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .verena-float-a { animation: verena-float-a 17s ease-in-out infinite alternate; }
          .verena-float-b { animation: verena-float-b 21s ease-in-out infinite alternate; }
          .verena-rise { animation: verena-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        }
        @keyframes verena-float-a {
          0% { transform: translate(-4%, -2%) scale(1); }
          100% { transform: translate(4%, 3%) scale(1.1); }
        }
        @keyframes verena-float-b {
          0% { transform: translate(3%, 2%) scale(1.06); }
          100% { transform: translate(-3%, -4%) scale(0.96); }
        }
        @keyframes verena-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Announcement bar */}
      <div className="h-[3px] bg-[var(--ink)]" />
      <div className="flex items-center justify-center gap-2 bg-[var(--accent)] px-4 py-2.5 text-center text-sm font-medium text-[var(--ink)]">
        <span className="verena-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink)]" />
        We're in Beta! Explore Verena early and help shape what's next.
      </div>

      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <DiamondMark size={26} />
          <span className="verena-serif text-lg font-semibold tracking-tight">
            Verena<sup className="text-[0.55em] font-normal">™</sup>
          </span>
        </div>
        <button className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-[var(--ink)]/15 active:scale-95">
          Talk to founder
        </button>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-6 text-center sm:px-10 sm:pb-28">
        <h1
          className="verena-serif verena-rise mx-auto max-w-3xl text-[2.6rem] leading-[1.1] tracking-tight text-balance sm:text-[3.75rem]"
          style={{ animationDelay: "60ms" }}
        >
          Your website looks ready. But what might be missing?
        </h1>
        <p
          className="verena-rise mx-auto mt-6 max-w-2xl text-balance text-base text-[var(--muted)] sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          Privacy, accessibility, and other website requirements aren't always obvious.
          Verena uses AI to spot potential issues, show supporting evidence, and help you
          understand what to review next.
        </p>

        <div
          className="verena-rise mx-auto mt-12 max-w-3xl"
          style={{ animationDelay: "280ms" }}
        >
          <div
            ref={panelRef}
            onPointerMove={handlePointerMove}
            className="relative h-[420px] overflow-hidden rounded-[28px] border border-black/5 shadow-[0_30px_80px_-40px_rgba(45,0,15,0.5)] sm:h-[460px]"
            style={{
              background:
                "radial-gradient(55% 70% at 97% -8%, #F6C04D 0%, rgba(246,192,77,0) 60%), " +
                "radial-gradient(90% 60% at 72% 85%, #8C1D40 0%, rgba(140,29,64,0.45) 28%, rgba(140,29,64,0) 62%), " +
                "radial-gradient(60% 55% at 4% 108%, #F3D7DC 0%, rgba(243,215,220,0) 65%), " +
                "var(--cream)",
            }}
          >
            <div
              className="verena-blob verena-float-a pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, var(--accent) 0%, color-mix(in srgb, var(--accent) 55%, transparent) 55%, transparent 75%)",
                transform: `translate3d(${tilt.x * 22}px, ${tilt.y * 16}px, 0)`,
              }}
            />

            <form
              onSubmit={handleSubmit}
              className="absolute inset-x-6 bottom-8 flex flex-col gap-2 rounded-2xl bg-white/95 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur transition focus-within:ring-2 focus-within:ring-[var(--accent)] sm:inset-x-10 sm:bottom-10 sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                <DiamondMark size={18} />
                <input
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                  type="text"
                  placeholder="Which website should Verena review?"
                  className="w-full bg-transparent text-left text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--accent)] transition duration-300 hover:brightness-110 active:scale-[0.97]"
              >
                Analyze
              </button>
            </form>
          </div>
        </div>

        <button
          onClick={scrollToNext}
          className="verena-chevron group mt-14 inline-flex flex-col items-center gap-1 text-xs font-semibold tracking-wide text-[var(--muted)] transition hover:text-[var(--ink)]"
        >
          See how it works
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 6l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      {/* Smooth-scroll destination */}
      <section id="verena-next" className="border-t border-black/5 bg-white px-6 py-20 sm:px-10">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n}>
              <p className="verena-serif text-3xl text-[var(--accent)]" style={{ WebkitTextStroke: `1px ${INK}` }}>
                {step.n}
              </p>
              <h3 className="mt-2 text-base font-semibold text-[var(--ink)]">{step.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
