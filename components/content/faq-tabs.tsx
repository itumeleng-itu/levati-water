"use client";

import * as React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { FAQCategory } from "@/lib/faq";

function FAQTabs({ categories }: { categories: FAQCategory[] }) {
  const [active, setActive] = React.useState(0);
  const category = categories[active];

  return (
    <div>
      {/* Radix's Accordion.Header renders as h3 unconditionally, so without
          this the page jumps straight from the h1 (CompactHero) to h3,
          skipping h2. Visually hidden since a second "questions" heading
          right under the hero's own h1 would just be repetitive. */}
      <h2 className="sr-only">Questions by category</h2>
      <div role="tablist" aria-label="FAQ categories" className="flex flex-wrap gap-2 border-b border-line">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            role="tab"
            type="button"
            aria-selected={i === active}
            className={cn(
              "border-b-2 px-4 py-3 text-body font-semibold outline-none transition-colors duration-[var(--dur-micro)]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
              i === active
                ? "border-navy-900 text-navy-900"
                : "border-transparent text-ink-600 hover:text-navy-900"
            )}
            onClick={() => setActive(i)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <Accordion type="single" collapsible className="mt-6">
        {category.items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export { FAQTabs };
