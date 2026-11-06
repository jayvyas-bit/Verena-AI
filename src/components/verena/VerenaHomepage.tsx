import { useEffect, useRef, useState, type FormEvent } from "react";
import { useDocumentHead } from "../../lib/useDocumentHead";
import { INK, isLikelyWebsite, STRUCTURED_DATA } from "./verenaHomepage.data";
import { SiteHeader } from "./sections/SiteHeader";
import { HeroSection } from "./sections/HeroSection";
import { TrustedBySection } from "./sections/TrustedBySection";
import { StatementBand } from "./sections/StatementBand";
import { GettingStartedSection } from "./sections/GettingStartedSection";
import { ScanToolsSection } from "./sections/ScanToolsSection";
import { SixAreasSection } from "./sections/SixAreasSection";
import { HumanSection } from "./sections/HumanSection";
import { PricingSection } from "./sections/PricingSection";
import { FaqSection } from "./sections/FaqSection";
import { ExplorerCtaSection } from "./sections/ExplorerCtaSection";
import { SiteFooter } from "./sections/SiteFooter";

export function VerenaHomepage() {
  useDocumentHead({
    title: "Verena — AI Accessibility & ADA Compliance Scans | Invictus AI",
    description:
      "Scan your website for accessibility, privacy, cookie, and compliance issues with AI, backed by attorney-reviewed fixes through +Human. Start free.",
  });

  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  function handleDomainChange(value: string) {
    setDomain(value);
    if (domainError) setDomainError("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (status === "loading") return;

    const trimmed = domain.trim();
    if (!trimmed) {
      setDomainError("Enter a website to analyze.");
      return;
    }
    if (!isLikelyWebsite(trimmed)) {
      setDomainError("Enter a valid website address, like acme.com.");
      return;
    }

    setDomainError("");
    setStatus("loading");
    timeouts.current.push(window.setTimeout(() => setStatus("success"), 900));
    timeouts.current.push(window.setTimeout(() => setStatus("idle"), 3200));
  }

  return (
    <div style={{ color: INK }} className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2"
        style={{ color: INK }}
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection
          domain={domain}
          domainError={domainError}
          status={status}
          onDomainChange={handleDomainChange}
          onSubmit={handleSubmit}
        />
        <TrustedBySection />
        <StatementBand />
        <GettingStartedSection />
        <ScanToolsSection />
        <SixAreasSection />
        <HumanSection />
        <PricingSection />
        <FaqSection />
        <ExplorerCtaSection
          domain={domain}
          domainError={domainError}
          status={status}
          onDomainChange={handleDomainChange}
          onSubmit={handleSubmit}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
