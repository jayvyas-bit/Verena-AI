import verenaLogo from "../../assets/homepage/image-15.webp";
import { INK } from "./verenaHomepage.data";

export function FooterIcon({
  name,
  size = 15,
}: {
  name: "x" | "linkedin";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "x":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M18.24 2H21l-6.6 7.54L22 22h-6.68l-5.2-6.78L4.2 22H1.4l7.1-8.1L2 2h6.84l4.67 6.2L18.24 2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
        </svg>
      );
  }
}

export function ToolTabIcon({
  name,
  active,
}: {
  name: "file" | "edit" | "code" | "refresh";
  active: boolean;
}) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    style: { color: active ? INK : "rgba(33,12,55,0.35)", transition: "color 0.2s ease-out" },
  };
  switch (name) {
    case "file":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
          <path d="M13.5 8 16 10.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M8.5 8 4.5 12l4 4M15.5 8l4 4-4 4M13.5 6.5l-3 11" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M4 4v5h5M20 20v-5h-5" />
          <path d="M5.5 15a7 7 0 0 0 12.3 2.5M18.5 9a7 7 0 0 0-12.3-2.5" />
        </svg>
      );
  }
}

export function AreaIcon({
  name,
  size = 20,
}: {
  name: "accessibility" | "privacy" | "cookies" | "document" | "email" | "megaphone";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "accessibility":
      return (
        <svg {...common}>
          <circle cx="12" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
          <path d="M12 7.5v5M7.8 10.3l4.2 1 4.2-1M9.5 21l2.5-6 2.5 6" />
        </svg>
      );
    case "privacy":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
        </svg>
      );
    case "cookies":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="9.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7Z" />
          <path d="M14 3v4h4M9.5 12h5M9.5 15.5h5M9.5 8.5h2" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3.5 6.5 12 13.5l8.5-7" />
        </svg>
      );
    case "megaphone":
      return (
        <svg {...common}>
          <path d="M3 10v4a1 1 0 0 0 1 1h2l8 4V5l-8 4H4a1 1 0 0 0-1 1Z" />
          <path d="M15 9.5a3 3 0 0 1 0 5" />
          <path d="M9 15v3a2 2 0 0 0 2 2" />
        </svg>
      );
  }
}

export type NavIconName = "overview" | "human" | "pricing" | "trust" | "guides" | "help";

export function NavIcon({ name }: { name: NavIconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "overview":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" />
          <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5" />
          <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" />
          <rect x="13" y="13" width="7.5" height="7.5" rx="1.5" />
        </svg>
      );
    case "human":
      return (
        <svg {...common}>
          <circle cx="10" cy="8" r="3.2" />
          <path d="M4 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M16 11.5l2 2 3.5-3.5" />
        </svg>
      );
    case "pricing":
      return (
        <svg {...common}>
          <path d="M11.5 3.5H19a1 1 0 0 1 1 1v7.5a1 1 0 0 1-.3.7l-8 8a1 1 0 0 1-1.4 0l-7.5-7.5a1 1 0 0 1 0-1.4l8-8a1 1 0 0 1 .7-.3Z" />
          <circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "trust":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" />
          <path d="M9 12l2 2 4-4.5" />
        </svg>
      );
    case "guides":
      return (
        <svg {...common}>
          <rect x="6" y="3.5" width="12" height="17" rx="1.8" />
          <path d="M9.5 3.5v2.5h5V3.5" />
          <path d="M9 11h6M9 14.5h6M9 18h3.5" />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.6 9.3a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1 .9-1 1.6" />
          <circle cx="12" cy="16.3" r="0.15" fill="currentColor" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

export function CheckIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M5 12h14" />
      <path
        d="M12 5v14"
        style={{
          opacity: open ? 0 : 1,
          transition: "opacity 250ms ease-in-out",
        }}
      />
    </svg>
  );
}

export function CursorPointerIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="white"
      stroke="#210c37"
      strokeWidth={1.4}
      strokeLinejoin="round"
      aria-hidden="true"
      className="drop-shadow-[0_1px_2px_rgba(33,12,55,0.25)]"
    >
      <path d="M5 3l6.5 16.5 2.4-6.9 6.9-2.4z" />
    </svg>
  );
}

export function HeroStatusIcon({ status }: { status: "idle" | "loading" | "success" }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (status === "loading") {
    return (
      <svg {...common} className="hero-input-spin">
        <path d="M12 3a9 9 0 1 1-9 9" />
      </svg>
    );
  }
  if (status === "success") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.7 2.7L16.5 9" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function NavMenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`t-menu-icon ${open ? "is-open" : ""}`} aria-hidden="true">
      <span className="t-menu-icon-bar" />
      <span className="t-menu-icon-bar" />
      <span className="t-menu-icon-bar" />
    </span>
  );
}

export function StepIcon({ name }: { name: "website" | "scan" | "findings" }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "website":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17" />
          <path d="M12 3.5c2.4 2.3 3.6 5.3 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.3-3.6-8.5S9.6 5.8 12 3.5Z" />
        </svg>
      );
    case "scan":
      return (
        <svg {...common}>
          <path d="M4 9V6a2 2 0 0 1 2-2h3" />
          <path d="M20 9V6a2 2 0 0 0-2-2h-3" />
          <path d="M4 15v3a2 2 0 0 0 2 2h3" />
          <path d="M20 15v3a2 2 0 0 1-2 2h-3" />
        </svg>
      );
    case "findings":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.3 15.3 20 20" />
          <path d="M7.8 10.5l1.8 1.8 3.1-3.5" />
        </svg>
      );
  }
}

export function VerenaMarkIcon({ className }: { className?: string }) {
  return (
    <div className={`shrink-0 overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <img
        src={verenaLogo}
        alt=""
        className="h-[102%] w-[474%] max-w-none"
        style={{ marginLeft: "-23%", marginTop: "-2%" }}
      />
    </div>
  );
}
