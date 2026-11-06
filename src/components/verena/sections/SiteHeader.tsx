import { useEffect, useRef, useState } from "react";
import verenaLogo from "../../../assets/homepage/image-15.webp";
import { ACCENT, NAV_DROPDOWNS, type NavDropdownKey } from "../verenaHomepage.data";
import { NavMenuIcon } from "../verenaHomepage.icons";
import { NavItem } from "../VerenaNavItem";

export function SiteHeader() {
  const [openDropdown, setOpenDropdown] = useState<NavDropdownKey | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobilePanelState, setMobilePanelState] = useState<"closed" | "open" | "closing">("closed");
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<NavDropdownKey | null>(null);
  const mobileMenuToggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuFirstLinkRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const headerWrapRef = useRef<HTMLDivElement | null>(null);
  const [mobileNavTop, setMobileNavTop] = useState(80);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [announcementClosing, setAnnouncementClosing] = useState(false);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function updateMobileNavTop() {
      setMobileNavTop(headerWrapRef.current?.getBoundingClientRect().bottom ?? 80);
    }
    updateMobileNavTop();
    window.addEventListener("resize", updateMobileNavTop);
    return () => window.removeEventListener("resize", updateMobileNavTop);
  }, [mobileMenuOpen, announcementVisible]);

  useEffect(() => {
    if (mobileMenuOpen) {
      setMobilePanelState("open");
    } else {
      setMobilePanelState((prev) => (prev === "open" ? "closing" : "closed"));
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobilePanelState !== "closing") return;
    const timer = window.setTimeout(() => setMobilePanelState("closed"), 350);
    return () => window.clearTimeout(timer);
  }, [mobilePanelState]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) {
      document.body.style.paddingRight = `${scrollbarGap}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    mobileMenuFirstLinkRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    const active = document.activeElement as HTMLElement | null;
    if (active?.closest("#verena-homepage-mobile-nav")) {
      active.blur();
    }
    mobileMenuToggleRef.current?.focus();
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) {
      setMobileAccordionOpen(null);
    }
  }, [mobileMenuOpen]);

  function closeAnnouncement() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setAnnouncementVisible(false);
      return;
    }
    setAnnouncementClosing(true);
    timeouts.current.push(window.setTimeout(() => setAnnouncementVisible(false), 600));
  }

  return (
    <>
      {announcementVisible && (
        <div
          style={{ backgroundColor: "#210c37" }}
          className={`t-announcement-bar ${announcementClosing ? "is-closing" : ""}`}
        >
          <div className="t-announcement-row overflow-hidden">
            <div className="t-announcement-content relative flex min-h-10 items-center justify-center px-10 py-2 text-center">
              <p className="text-[12px] leading-[18px] text-white [font-weight:300]">
                We're in Beta! Explore Verena early and help shape what's next.
              </p>
              <button
                type="button"
                aria-label="Dismiss announcement"
                onClick={closeAnnouncement}
                className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm text-white transition duration-200 ease-out hover:scale-110 hover:bg-[rgba(255,255,255,0.12)] active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div ref={headerWrapRef} className="sticky top-0 z-30 bg-white/70 backdrop-blur-md backdrop-saturate-150">
        <header className="section-pad-x mx-auto flex h-16 max-w-[1536px] items-center justify-between gap-6 sm:h-20">
          <img
            src={verenaLogo}
            alt="Verena"
            width={843}
            height={182}
            className="h-7 w-auto object-contain sm:h-8"
          />

          <nav className="hidden items-center gap-7 md:flex">
            <NavItem
              label="Product"
              dropdownKey="Product"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <NavItem label="Pricing" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
            <NavItem
              label="Resources"
              dropdownKey="Resources"
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <NavItem label="Contact us" openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="hidden rounded-sm text-sm font-medium transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:inline"
            >
              Log in
            </a>
            <button
              type="button"
              style={{ backgroundColor: ACCENT }}
              className="hidden shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium text-white transition duration-200 ease-out hover:-translate-y-px hover:brightness-110 active:translate-y-0 active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:inline-flex"
            >
              Talk to founder
            </button>
            <button
              ref={mobileMenuToggleRef}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="verena-homepage-mobile-nav"
              onClick={() => {
                if (mobileMenuOpen) {
                  closeMobileMenu();
                } else {
                  setMobileMenuOpen(true);
                }
              }}
              className="flex h-11 w-11 items-center justify-center rounded-lg transition duration-200 ease-out hover:bg-[rgba(33,12,55,0.05)] hover:scale-110 active:scale-90 active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 md:hidden"
            >
              <NavMenuIcon open={mobileMenuOpen} />
            </button>
          </div>
        </header>
      </div>

      <nav
        id="verena-homepage-mobile-nav"
        aria-hidden={!mobileMenuOpen}
        aria-label="Mobile"
        style={{ top: mobileNavTop }}
        className={`t-mobile-drawer fixed inset-x-0 bottom-0 z-20 flex flex-col gap-1 overflow-y-auto bg-white px-6 pb-6 pt-6 text-sm font-medium md:hidden ${
          mobilePanelState === "open" ? "is-open" : mobilePanelState === "closing" ? "is-closing" : ""
        }`}
      >
        {(["Product", "Pricing", "Resources", "Contact us"] as const).map((label, index) => {
          const dropdownKey: NavDropdownKey | undefined =
            label === "Product" || label === "Resources" ? label : undefined;

          if (!dropdownKey) {
            return (
              <a
                key={label}
                ref={
                  index === 0
                    ? (node: HTMLAnchorElement | null) => {
                        mobileMenuFirstLinkRef.current = node;
                      }
                    : undefined
                }
                href="#"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2.5 transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                {label}
              </a>
            );
          }

          const expanded = mobileAccordionOpen === dropdownKey;

          return (
            <div key={label}>
              <button
                ref={
                  index === 0
                    ? (node: HTMLButtonElement | null) => {
                        mobileMenuFirstLinkRef.current = node;
                      }
                    : undefined
                }
                type="button"
                tabIndex={mobileMenuOpen ? 0 : -1}
                aria-expanded={expanded}
                onClick={() => setMobileAccordionOpen(expanded ? null : dropdownKey)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
              >
                {label}
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
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
              <div className={`t-mobile-accordion-panel ${expanded ? "is-open" : ""}`}>
                <div className="t-mobile-accordion-row">
                  <div className="flex flex-col gap-0.5 py-1 pl-3">
                    {NAV_DROPDOWNS[dropdownKey].map((item) => (
                      <a
                        key={item.label}
                        href="#"
                        tabIndex={mobileMenuOpen && expanded ? 0 : -1}
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[14px] text-[rgba(33,12,55,0.65)] transition hover:bg-[rgba(33,12,55,0.05)] hover:text-[#210c37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <a
          href="#"
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
          className="mt-2 rounded-lg px-3 py-2.5 transition hover:bg-[rgba(33,12,55,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:hidden"
        >
          Log in
        </a>
        <button
          type="button"
          tabIndex={mobileMenuOpen ? 0 : -1}
          onClick={closeMobileMenu}
          style={{ backgroundColor: ACCENT }}
          className="mt-3 rounded-full px-5 py-3 text-center text-[15px] font-medium text-white transition duration-200 ease-out hover:brightness-110 active:scale-[0.96] active:duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 sm:hidden"
        >
          Talk to founder
        </button>
      </nav>
    </>
  );
}
