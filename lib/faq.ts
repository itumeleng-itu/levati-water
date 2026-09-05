import type { FAQItem } from "@/components/content/faq-accordion";

export interface FAQCategory {
  name: string;
  items: FAQItem[];
}

// Content grounded in facts already established elsewhere on the site
// (spec §7.1/§7.4/§7.5, lib/products.ts) — no invented pricing or claims.
export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    name: "Free trial",
    items: [
      {
        question: "What's included in the free trial?",
        answer:
          "Seven days free, with a complimentary 18.9 litre bottle and a 500ml retail bottle to try — no obligation.",
      },
      {
        question: "Which areas does the free trial cover?",
        answer: "Johannesburg and Pretoria only. If you're elsewhere, contact us and we'll confirm what's possible.",
      },
      {
        question: "What happens after the seven days?",
        answer:
          "There's no obligation to continue — if you'd like to keep the cooler, we'll set up a rental or purchase and a delivery schedule.",
      },
    ],
  },
  {
    name: "Products",
    items: [
      {
        question: "What's the difference between bottled and mains-fed coolers?",
        answer:
          "Bottled coolers are freestanding and need no plumbing; mains-fed coolers connect directly to your water supply for a fixed usage cost, better suited to high-use spaces like gyms and offices.",
      },
      {
        question: "Do you offer reverse osmosis systems?",
        answer:
          "Yes — 5 and 7 stage systems, installed under the counter with a dedicated tap or as an above-counter unit.",
      },
      {
        question: "Can I get water bottled with my own label?",
        answer: "Yes — see our branded water page for the process and minimum order details.",
      },
    ],
  },
  {
    name: "Billing & rentals",
    items: [
      {
        question: "Can I rent instead of buying?",
        answer: "Yes — bottled and mains-fed coolers are both available to rent or purchase.",
      },
      {
        question: "Is maintenance included?",
        answer: "Free maintenance and scheduled delivery are included on every rental.",
      },
      {
        question: "How do I get a price?",
        answer: "Pricing depends on your setup — request a quote and we'll get back to you.",
      },
    ],
  },
  {
    name: "General",
    items: [
      // No "which areas do you serve" item here — the original site names a
      // location nowhere except the free-trial offer (see the Free trial
      // category above), so a general service-area claim doesn't belong.
      {
        question: "How do I get in touch?",
        answer: "Call 0861 111 853, message us on WhatsApp, or use the contact form.",
      },
      {
        question: "Do coolers keep working during water cuts?",
        answer: "Yes — bottled and mains-fed coolers keep water available on-site even when municipal supply doesn't.",
      },
    ],
  },
];
