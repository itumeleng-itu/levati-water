import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CompactHero } from "@/components/content/compact-hero";
import { FAQTabs } from "@/components/content/faq-tabs";
import { FAQ_CATEGORIES } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — Levati Water",
  description: "Answers to common questions about the free trial, products, rentals and billing.",
};

export default function FAQPage() {
  // One combined FAQPage schema for the whole page (spec §9), covering every
  // category — not just whichever tab happens to be open, since that's a
  // purely visual/interactive state search engines shouldn't depend on.
  const allItems = FAQ_CATEGORIES.flatMap((c) => c.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <CompactHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        heading="Frequently asked questions"
      />

      <Section>
        <Container className="max-w-[760px]">
          <FAQTabs categories={FAQ_CATEGORIES} />
        </Container>
      </Section>
    </>
  );
}
