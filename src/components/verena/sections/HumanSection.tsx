import { useEffect, useRef, type CSSProperties } from "react";
import invictusMask from "../../../assets/homepage/rectangle-34.png";
import ellipse92 from "../../../assets/homepage/ellipse-92.svg";
import {
  ACCENT,
  AVATAR_ORBIT_DURATION,
  AVATAR_ORBITS,
  AVATAR_PHOTOS,
  bricolage,
  INK,
} from "../verenaHomepage.data";
import { useInViewport, useReveal } from "../verenaHomepage.hooks";

export function HumanSection() {
  const [humanRef, humanVisible] = useReveal<HTMLElement>();
  const [humanOrbitSectionRef, humanOrbitInView] = useInViewport<HTMLElement>(0.25);
  const avatarRefs = useRef<(HTMLImageElement | null)[]>([]);
  const wasSpread = useRef(false);
  const orbitTimeouts = useRef<number[]>([]);
  const orbitRafs = useRef<number[]>([]);

  useEffect(() => {
    if (wasSpread.current === humanOrbitInView) return;
    wasSpread.current = humanOrbitInView;

    orbitTimeouts.current.forEach((id) => window.clearTimeout(id));
    orbitTimeouts.current = [];
    orbitRafs.current.forEach((id) => window.cancelAnimationFrame(id));
    orbitRafs.current = [];

    const avatars = avatarRefs.current.filter((el): el is HTMLImageElement => el !== null);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    if (humanOrbitInView) {
      avatars.forEach((el) => {
        el.classList.remove("is-orbiting");
        el.classList.add("is-spread");
      });
      const timeoutId = window.setTimeout(() => {
        avatars.forEach((el) => el.classList.add("is-orbiting"));
      }, 950);
      orbitTimeouts.current.push(timeoutId);
    } else {
      avatars.forEach((el) => {
        const computed = getComputedStyle(el);
        el.style.translate = computed.translate;
        el.style.rotate = computed.rotate;
        el.style.scale = computed.scale;
        el.classList.remove("is-orbiting");
        el.classList.remove("is-spread");
        void el.offsetWidth;
      });
      const rafId = window.requestAnimationFrame(() => {
        avatars.forEach((el) => {
          el.style.translate = "";
          el.style.rotate = "";
          el.style.scale = "";
        });
      });
      orbitRafs.current.push(rafId);
    }
  }, [humanOrbitInView]);

  useEffect(() => {
    return () => {
      orbitTimeouts.current.forEach((id) => window.clearTimeout(id));
      orbitRafs.current.forEach((id) => window.cancelAnimationFrame(id));
    };
  }, []);

  return (
    <section
      ref={(el) => {
        humanRef.current = el;
        humanOrbitSectionRef.current = el;
      }}
      style={{ backgroundColor: INK }}
      className="section-pad-x section-pad-y-lg relative flex flex-col items-center justify-center gap-8 overflow-hidden sm:gap-16 lg:min-h-[1018px]"
    >
      <img
        src={ellipse92}
        alt=""
        width={1236}
        height={818}
        loading="lazy"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[496px] w-full max-w-none -translate-x-1/2 -translate-y-1/2 sm:h-auto sm:w-auto sm:max-w-[100%]"
      />
      {AVATAR_ORBITS.map((orbit, i) => (
        <img
          key={i}
          ref={(el) => {
            avatarRefs.current[i] = el;
          }}
          src={AVATAR_PHOTOS[i % AVATAR_PHOTOS.length]}
          alt=""
          width={640}
          height={640}
          loading="lazy"
          className="human-orbit-avatar absolute left-1/2 top-1/2 -ml-6 -mt-6 hidden size-12 rounded-full border-2 border-[rgba(244,235,255,0.25)] object-cover lg:-ml-9 lg:-mt-9 lg:block lg:size-[72px]"
          style={
            {
              "--orbit-duration": `${AVATAR_ORBIT_DURATION}s`,
              "--orbit-delay": `${orbit.delay}s`,
              "--orbit-start-angle": `${orbit.angleDeg}deg`,
              "--stack-x": `${orbit.stackX}px`,
              "--stack-y": `${orbit.stackY}px`,
              "--stack-rotate": `${orbit.stackRotate}deg`,
              "--orbit-stagger": `${i * 70}ms`,
            } as CSSProperties
          }
        />
      ))}

      <div
        className={`area-reveal relative z-10 flex flex-col items-center gap-6 sm:gap-10 ${humanVisible ? "is-shown" : ""}`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-[136px] bg-white" style={{ WebkitMaskImage: `url("${invictusMask}")`, maskImage: `url("${invictusMask}")`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }} />
          <p className="text-[13px] leading-5 text-white opacity-60">Verena&apos;s parent company. +Human review is provided by Invictus Counsel, an independent law firm.</p>
        </div>
        <div className="flex max-w-[960px] flex-col items-center gap-2 text-center text-white">
          <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
            When AI isn't enough, there's +Human
          </h2>
          <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6">
            Access optional professional support for questions that need more than an automated
            analysis
          </p>
        </div>
      </div>
      <button
        type="button"
        style={{ backgroundColor: ACCENT, transitionDelay: "120ms" } as CSSProperties}
        className={`area-reveal relative z-10 rounded-full px-6 py-3 text-[16px] font-medium text-white transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 active:translate-y-0 active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37] ${humanVisible ? "is-shown" : ""}`}
      >
        Explore +Human
      </button>
    </section>
  );
}
