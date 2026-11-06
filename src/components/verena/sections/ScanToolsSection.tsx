import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import gradientBackdrop from "../../../assets/homepage/image-19.webp";
import { ACCENT, bricolage, INK, TOOL_CAPTIONS, TOOL_TABS, TOOL_TAB_AUTOPLAY_MS } from "../verenaHomepage.data";
import { ToolTabIcon } from "../verenaHomepage.icons";
import { useReveal, useStageTransition } from "../verenaHomepage.hooks";
import { ToolMockupBody } from "../VerenaMockups";

export function ScanToolsSection() {
  const [scanRef, scanVisible] = useReveal<HTMLElement>();
  const [activeTool, setActiveTool] = useState<(typeof TOOL_TABS)[number]["id"]>(TOOL_TABS[0].id);
  const leavingTool = useStageTransition(activeTool);
  const toolTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [toolAutoplayPaused, setToolAutoplayPaused] = useState(false);

  const focusToolTab = (index: number) => {
    const wrapped = (index + TOOL_TABS.length) % TOOL_TABS.length;
    setActiveTool(TOOL_TABS[wrapped].id);
    toolTabRefs.current[wrapped]?.focus();
  };

  const handleToolTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusToolTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusToolTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusToolTab(0);
        break;
      case "End":
        event.preventDefault();
        focusToolTab(TOOL_TABS.length - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (toolAutoplayPaused) return;
    const id = window.setInterval(() => {
      setActiveTool((prev) => {
        const currentIndex = TOOL_TABS.findIndex((tab) => tab.id === prev);
        const nextIndex = (currentIndex + 1) % TOOL_TABS.length;
        return TOOL_TABS[nextIndex].id;
      });
    }, TOOL_TAB_AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [activeTool, toolAutoplayPaused]);

  return (
    <section
      ref={scanRef}
      className="section-pad-x section-pad-y scan-section-pad-mobile flex flex-col items-center gap-8 bg-white sm:gap-16"
    >
      <div
        className={`area-reveal flex max-w-[960px] flex-col items-center gap-2 text-center ${scanVisible ? "is-shown" : ""}`}
      >
        <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
          Go from finding issues to shipping fixes
        </h2>
        <p className="text-[14px] leading-5 sm:text-[16px] sm:leading-6">
          Reports, AI-drafted fixes, developer-ready code, and ongoing monitoring, all in one
          place
        </p>
      </div>
      <div
        className={`area-reveal flex w-full max-w-[1536px] flex-col gap-10 ${scanVisible ? "is-shown" : ""}`}
        style={{ transitionDelay: "100ms" }}
      >
        <div role="tablist" aria-label="Verena tools" className="grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12">
          {TOOL_TABS.map((tab, index) => {
            const active = tab.id === activeTool;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  toolTabRefs.current[index] = el;
                }}
                id={`verena-scan-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="verena-scan-tabpanel"
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTool(tab.id)}
                onKeyDown={(event) => handleToolTabKeyDown(event, index)}
                style={bricolage}
                className={`relative flex items-center justify-center gap-2 whitespace-nowrap rounded-sm pb-[9px] text-[15px] font-medium transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:w-auto sm:justify-start sm:text-[18px] ${
                  active ? "opacity-100" : "opacity-60 hover:opacity-85"
                }`}
              >
                <ToolTabIcon name={tab.icon} active={active} />
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-full rounded-full"
                  style={{ backgroundColor: "rgba(33,12,55,0.1)" }}
                />
                <span
                  aria-hidden="true"
                  key={active ? activeTool : "idle"}
                  className={`absolute bottom-0 left-0 h-[2px] w-full origin-left rounded-full ${
                    active ? "scan-tab-fill" : ""
                  }`}
                  style={{
                    backgroundColor: ACCENT,
                    transform: active ? undefined : "scaleX(0)",
                    animationDuration: active ? `${TOOL_TAB_AUTOPLAY_MS}ms` : undefined,
                    animationPlayState: toolAutoplayPaused ? "paused" : "running",
                  }}
                />
              </button>
            );
          })}
        </div>
        <div
          id="verena-scan-tabpanel"
          role="tabpanel"
          aria-labelledby={`verena-scan-tab-${activeTool}`}
          style={{ backgroundColor: INK }}
          className="relative flex items-end justify-center overflow-hidden rounded-[20px] pt-8"
        >
          <img
            src={gradientBackdrop}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="relative flex aspect-[4/5] w-[92%] max-w-[1080px] flex-col overflow-hidden rounded-t-2xl border-8 border-b-0 border-white/24 bg-white shadow-[0_8px_16px_rgba(33,12,55,0.08),0_32px_64px_-16px_rgba(33,12,55,0.2)] sm:aspect-[1080/450]"
          >
            <div
              className="flex items-center gap-4 border-b px-5 py-3"
              style={{ borderColor: "rgba(33,12,55,0.08)", backgroundColor: "#f5f3f0" }}
            >
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "rgba(33,12,55,0.15)" }} />
              </div>
              <span
                className="rounded-full bg-white px-3 py-1 text-[12px] opacity-60"
                style={{ border: "1px solid rgba(33,12,55,0.08)" }}
              >
                verena.ai/scan/acme.com
              </span>
            </div>
            <div className="flex-1 overflow-hidden p-5 sm:p-7">
              <div className="grid h-full">
                {leavingTool !== null ? (
                  <div aria-hidden="true" className="stage-leaving" style={{ gridArea: "1 / 1" }}>
                    <ToolMockupBody tool={leavingTool} />
                  </div>
                ) : null}
                <div key={activeTool} className="stage-entering" style={{ gridArea: "1 / 1" }}>
                  <ToolMockupBody tool={activeTool} />
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToolAutoplayPaused((prev) => !prev)}
            aria-label={toolAutoplayPaused ? "Resume autoplay" : "Pause autoplay"}
            aria-pressed={toolAutoplayPaused}
            className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition duration-200 ease-out hover:scale-110 hover:bg-white/25 active:scale-90 active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {toolAutoplayPaused ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M7 5v14l12-7z" />
              </svg>
            ) : (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-between">
          <p
            key={activeTool}
            className="tool-caption-swap text-center text-[14px] leading-5 sm:text-left sm:text-[16px] sm:leading-6"
          >
            {TOOL_CAPTIONS[activeTool]}
          </p>
          <div className="flex shrink-0 items-center gap-0.5">
            {TOOL_TABS.map((tab) => {
              const active = tab.id === activeTool;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-label={`Show ${tab.label}`}
                  aria-current={active}
                  onClick={() => setActiveTool(tab.id)}
                  className="rounded-full p-1.5 transition duration-200 ease-out hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                >
                  <span
                    className="block h-2 w-2 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: active ? ACCENT : "rgba(33,12,55,0.15)" }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
