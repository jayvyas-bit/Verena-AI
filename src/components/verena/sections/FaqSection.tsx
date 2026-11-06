import { useState } from "react";
import { bricolage, FAQ_CATEGORIES, FAQ_ITEMS, INK, toFaqId } from "../verenaHomepage.data";
import { PlusMinusIcon } from "../verenaHomepage.icons";
import { useReveal } from "../verenaHomepage.hooks";

export function FaqSection() {
  const [faqRef, faqVisible] = useReveal<HTMLElement>();
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>(FAQ_CATEGORIES[0]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const selectFaqCategory = (category: string) => {
    setActiveFaqCategory(category);
    const firstItem = FAQ_ITEMS.find((item) => item.category === category);
    setOpenFaqId(firstItem ? firstItem.id : null);
  };

  const filteredFaqItems = FAQ_ITEMS.filter((item) => item.category === activeFaqCategory);

  const renderFaqAccordionItem = (item: (typeof FAQ_ITEMS)[number], delayIndex: number) => {
    const isOpen = openFaqId === item.id;
    const triggerId = `${item.id}-trigger`;
    const panelId = `${item.id}-panel`;
    return (
      <div
        key={item.id}
        id={item.id}
        className={`area-reveal overflow-hidden rounded-2xl border transition-colors duration-200 ${faqVisible ? "is-shown" : ""}`}
        style={{
          transitionDelay: `${Math.min(delayIndex, 6) * 70}ms`,
          backgroundColor: isOpen ? "#ffffff" : "rgba(33,12,55,0.035)",
          borderColor: isOpen ? "rgba(33,12,55,0.12)" : "transparent",
        }}
      >
        <h3 className="m-0">
          <button
            type="button"
            id={triggerId}
            onClick={() => toggleFaq(item.id)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2"
          >
            <span
              style={bricolage}
              className={`text-[16px] font-medium transition-opacity ${isOpen ? "opacity-100" : "opacity-65"}`}
            >
              {item.q}
            </span>
            <PlusMinusIcon open={isOpen} />
          </button>
        </h3>
        <div id={panelId} className={`area-accordion-body ${isOpen ? "is-open" : ""}`}>
          <div className="overflow-hidden">
            <p className="px-6 pb-6 text-[14px] leading-6 opacity-70">{item.a}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section ref={faqRef} className="section-pad-x section-pad-y flex flex-col gap-8 bg-white sm:gap-16">
      <div
        className={`area-reveal mx-auto flex max-w-[960px] flex-col items-center gap-2 text-center ${faqVisible ? "is-shown" : ""}`}
      >
        <h2 style={bricolage} className="fluid-h2 font-semibold leading-tight tracking-[-0.01em]">
          Good questions deserve clear answers.
        </h2>
      </div>

      <div
        className={`area-reveal mx-auto flex w-full max-w-[1200px] flex-col gap-5 ${faqVisible ? "is-shown" : ""}`}
      >
        <div className="relative -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="touch-pan-x overflow-x-auto no-scrollbar">
            <div role="tablist" aria-label="FAQ categories" className="flex w-max min-w-full flex-nowrap justify-center gap-2">
              {FAQ_CATEGORIES.map((category) => {
                const categoryId = toFaqId(`category-${category}`);
                const active = category === activeFaqCategory;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    id={`faq-tab-${categoryId}`}
                    aria-selected={active}
                    aria-controls={`faq-panel-${categoryId}`}
                    onClick={() => selectFaqCategory(category)}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#210c37] focus-visible:ring-offset-2 ${
                      active
                        ? "text-white"
                        : "border border-[rgba(33,12,55,0.12)] hover:bg-[rgba(33,12,55,0.05)]"
                    }`}
                    style={active ? { backgroundColor: INK } : undefined}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:hidden"
          />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[720px] flex-col">
        <div
          id={`faq-panel-${toFaqId(`category-${activeFaqCategory}`)}`}
          role="tabpanel"
          aria-labelledby={`faq-tab-${toFaqId(`category-${activeFaqCategory}`)}`}
          className="flex flex-col gap-3"
        >
          {filteredFaqItems.map((item, index) => renderFaqAccordionItem(item, index))}
        </div>
      </div>
    </section>
  );
}
