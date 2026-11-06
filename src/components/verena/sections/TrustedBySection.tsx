import { LOGO_EDGE_FADE_MASK, MARQUEE_LOGOS } from "../verenaHomepage.data";
import { useReveal } from "../verenaHomepage.hooks";

export function TrustedBySection() {
  const [trustedRef, trustedVisible] = useReveal<HTMLElement>();

  return (
    <section
      ref={trustedRef}
      className={`area-reveal section-pad-x section-pad-y-sm relative flex flex-col-reverse items-center gap-3 overflow-hidden sm:flex-row sm:gap-0 ${trustedVisible ? "is-shown" : ""}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ maskImage: LOGO_EDGE_FADE_MASK, WebkitMaskImage: LOGO_EDGE_FADE_MASK }}
      >
        <div className="logo-marquee-track flex w-max items-center gap-12">
          {MARQUEE_LOGOS.map((logo, i) => (
            <div
              key={`gray-${i}`}
              role="img"
              aria-label={logo.alt}
              className="h-10 shrink-0"
              style={{
                width: `${logo.width}px`,
                backgroundColor: "#D2CFD7",
                WebkitMaskImage: `url("${logo.src}")`,
                maskImage: `url("${logo.src}")`,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center px-6 sm:absolute sm:left-1/2 sm:top-1/2 sm:h-[120px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-20 sm:bg-white">
        <p className="whitespace-nowrap text-[15px] font-medium leading-[27px] sm:text-[20px]">
          Trusted by 1000+ website owners
        </p>
      </div>
    </section>
  );
}
