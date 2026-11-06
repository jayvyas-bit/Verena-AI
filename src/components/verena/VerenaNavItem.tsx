import { useEffect, useRef, useState } from "react";
import { ACCENT, INK, NAV_DROPDOWNS, NAV_FEATURED, type NavDropdownKey } from "./verenaHomepage.data";
import { NavIcon } from "./verenaHomepage.icons";

export function NavItem({
  label,
  dropdownKey,
  openDropdown,
  setOpenDropdown,
}: {
  label: string;
  dropdownKey?: NavDropdownKey;
  openDropdown: NavDropdownKey | null;
  setOpenDropdown: (key: NavDropdownKey | null) => void;
}) {
  const items = dropdownKey ? NAV_DROPDOWNS[dropdownKey] : undefined;
  const isOpen = openDropdown === dropdownKey;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [panelState, setPanelState] = useState<"closed" | "open" | "closing">("closed");

  useEffect(() => {
    if (isOpen) {
      setPanelState("open");
    } else {
      setPanelState((prev) => (prev === "open" ? "closing" : "closed"));
    }
  }, [isOpen]);

  useEffect(() => {
    if (panelState !== "closing") return;
    const timer = setTimeout(() => setPanelState("closed"), 150);
    return () => clearTimeout(timer);
  }, [panelState]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, setOpenDropdown]);

  if (!items) {
    return (
      <a
        href="#"
        className="inline-flex items-center rounded-sm py-2 text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
      >
        {label}
      </a>
    );
  }

  const featured = NAV_FEATURED[dropdownKey!];
  const itemTabIndex = panelState === "open" ? 0 : -1;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(dropdownKey!)}
      onMouseLeave={() => setOpenDropdown(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpenDropdown(null);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className="flex items-center gap-1 rounded-sm py-2 text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setOpenDropdown(isOpen ? null : dropdownKey!)}
      >
        {label}
        <svg
          width="11"
          height="11"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform var(--dropdown-open-dur) var(--dropdown-ease)",
          }}
          aria-hidden="true"
        >
          <path
            d="M3 6l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`t-dropdown absolute left-1/2 top-full z-20 w-[480px] -translate-x-1/2 pt-3 ${
          panelState === "open" ? "is-open" : panelState === "closing" ? "is-closing" : ""
        }`}
        data-origin="top-center"
        aria-hidden={panelState !== "open"}
      >
        <div className="grid grid-cols-[1.3fr_1fr] overflow-hidden rounded-2xl bg-white shadow-[0_4px_12px_rgba(33,12,55,0.06),0_16px_32px_-8px_rgba(33,12,55,0.14)] ring-1 ring-[rgba(33,12,55,0.08)]">
          <div className="p-3">
            {items.map((item) => (
              <a
                key={item.label}
                href="#"
                tabIndex={itemTabIndex}
                className="flex items-start gap-3 rounded-xl p-3 text-left transition hover:bg-[rgba(33,12,55,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(38,83,243,0.08)", color: ACCENT }}
                >
                  <NavIcon name={item.icon} />
                </span>
                <span>
                  <p className="text-sm font-semibold" style={{ color: INK }}>
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug opacity-60">{item.body}</p>
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-5 p-5" style={{ backgroundColor: INK }}>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-white/50">
                {featured.eyebrow}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{featured.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-white/60">{featured.body}</p>
            </div>
            <a
              href="#"
              tabIndex={itemTabIndex}
              className="inline-flex items-center gap-1 text-xs font-medium transition-[gap] duration-200"
              style={{ color: "#9db2ff" }}
            >
              {featured.cta}
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 8h8M8 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
