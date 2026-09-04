import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { CompactHero } from "@/components/content/compact-hero";
import { ProductCard } from "@/components/content/product-card";
import { ComparisonTable } from "@/components/content/comparison-table";
import { CTABand } from "@/components/content/cta-band";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products — Levati Water",
  description:
    "Bottled water coolers, mains-fed coolers, reverse osmosis systems and branded water — rent, buy or install.",
};

const COMPARISON_COLUMNS = ["Bottled coolers", "Mains-fed coolers", "Reverse osmosis"];
const COMPARISON_ROWS = [
  {
    label: "Best for",
    values: ["Homes, small offices", "Gyms, factories, schools, large offices", "Homes & offices"],
  },
  {
    label: "Installation",
    values: ["None — freestanding, plug in", "Connects to the mains", "Under- or above-counter unit"],
  },
  { label: "Plumbing required", values: ["No", "Yes", "Yes"] },
  {
    label: "Maintenance",
    values: ["Free on rentals", "Free on rentals, filters replaced", "Included with installation"],
  },
  { label: "Cost model", values: ["Rental or purchase", "Rental or purchase", "Installed system"] },
];

export default function ProductsPage() {
  return (
    <>
      <CompactHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        heading="Water solutions for every space"
        lead="Every system runs through seven-stage reverse osmosis purification, with minerals added back for taste — rent, buy, or have it installed."
      />

      <Section>
        <Container>
          <SectionHeading heading="Choose your system" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading heading="Compare your options" />
          <div className="mt-12">
            <ComparisonTable columns={COMPARISON_COLUMNS} rows={COMPARISON_ROWS} />
          </div>
        </Container>
      </Section>

      <CTABand
        heading="Not sure which is right for you?"
        primaryCta={{ label: "Book a free trial", href: "/free-trial" }}
        phone={{ display: "0861 111 853", href: "tel:+27861111853" }}
      >
        Talk to us and we&apos;ll help you choose — Johannesburg and Pretoria only.
      </CTABand>
    </>
  );
}
