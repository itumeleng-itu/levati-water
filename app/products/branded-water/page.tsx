import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { StepList } from "@/components/content/step-list";
import { PRODUCTS } from "@/lib/products";

const product = PRODUCTS.find((p) => p.slug === "branded-water")!;

export const metadata: Metadata = {
  title: `${product.title} — Levati Water`,
  description: product.descriptor,
};

const PROCESS = ["Send your artwork", "Approve the proof", "Delivery"] as const;

export default function BrandedWaterPage() {
  return (
    <>
      <Section className="pb-0">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: product.title },
            ]}
          />
          <div className="mt-8 max-w-[var(--measure)]">
            <h1 className="text-h1 font-heading font-bold text-ink-900">{product.title}</h1>
            <p className="mt-4 text-lead text-ink-600">{product.descriptor}</p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading heading="Mockup gallery" align="left" />
          {/* TODO(client): real branded bottle mockups — these three repeat the
              one placeholder slot IMAGES.md defines for this product until
              actual artwork/label mockups are supplied. */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <ImagePlaceholder slot="product-branded" className="aspect-square w-full rounded-xl" />
            <ImagePlaceholder slot="product-branded" className="aspect-square w-full rounded-xl" />
            <ImagePlaceholder slot="product-branded" className="aspect-square w-full rounded-xl" />
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading heading="How it works" />
          <div className="mt-12">
            <StepList steps={PROCESS} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-[var(--measure)]">
          <p className="rounded-lg border border-line bg-surface p-6 text-body text-ink-600">
            A minimum order applies, and artwork is charged at cost.{" "}
            <a href="/contact" className="font-semibold text-blue-700 hover:text-navy-900">
              Contact us
            </a>{" "}
            for current minimums.
          </p>
        </Container>
      </Section>

      {/* Spec §7.4: this page gets a quote request instead of a trial CTA.
          The real form (React Hook Form + Zod + Resend) is a later build
          phase — this links to /contact until then rather than shipping a
          dead form. */}
      <Section tone="surface">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-h2 font-heading font-bold text-ink-900">Request an artwork quote</h2>
          <p className="max-w-[var(--measure)] text-lead text-ink-600">
            Tell us about your bottle run and label artwork, and we'll come back with pricing.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Request an artwork quote
          </Button>
        </Container>
      </Section>
    </>
  );
}
