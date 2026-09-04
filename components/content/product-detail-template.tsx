import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { SpecList } from "@/components/content/spec-list";
import { ChipList } from "@/components/content/chip-list";
import { ProductCard } from "@/components/content/product-card";
import { FAQAccordion } from "@/components/content/faq-accordion";
import { CTABand } from "@/components/content/cta-band";
import { PRODUCTS, type Product } from "@/lib/products";

function ProductDetailTemplate({ product }: { product: Product }) {
  const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

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

          <div className="mt-8 flex flex-col items-center gap-10 md:flex-row md:gap-12 lg:gap-16">
            <div className="w-full md:basis-1/2">
              <ImagePlaceholder slot={product.imageSlot} className="aspect-[4/3] w-full rounded-xl" />
            </div>
            <div className="w-full md:basis-1/2">
              <h1 className="text-h1 font-heading font-bold text-ink-900">{product.title}</h1>
              <p className="mt-4 max-w-[var(--measure)] text-lead text-ink-600">
                {product.heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button href="/free-trial" variant="primary" size="lg">
                  Book a free trial
                </Button>
                <Button href="/contact" variant="secondary" size="lg">
                  Request a quote
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {product.features && (
        <Section>
          <Container>
            <SectionHeading heading="Features" align="left" />
            <div className="mt-8">
              <SpecList items={product.features} />
            </div>
          </Container>
        </Section>
      )}

      {product.variants && product.variants.length > 0 && (
        <Section tone="surface">
          <Container>
            <SectionHeading heading="Options" align="left" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {product.variants.map((variant) => (
                <div key={variant.name} className="rounded-lg border border-line bg-white p-6 shadow-card">
                  <p className="font-heading text-h3 font-semibold text-ink-900">{variant.name}</p>
                  <p className="mt-2 text-body text-ink-600">{variant.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {product.idealFor && (
        <Section>
          <Container>
            <SectionHeading heading="Ideal for" align="left" />
            <div className="mt-6">
              <ChipList items={product.idealFor} />
            </div>
          </Container>
        </Section>
      )}

      <Section tone="surface">
        <Container>
          <SectionHeading heading="Related products" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </Section>

      {product.faqs && (
        <Section>
          <Container className="max-w-[760px]">
            <SectionHeading heading="Frequently asked questions" />
            <div className="mt-10">
              <FAQAccordion items={product.faqs} />
            </div>
          </Container>
        </Section>
      )}

      <CTABand
        heading="Try it free for 7 days"
        primaryCta={{ label: "Book a free trial", href: "/free-trial" }}
        phone={{ display: "0861 111 853", href: "tel:+27861111853" }}
      >
        Johannesburg and Pretoria only — no obligation.
      </CTABand>
    </>
  );
}

export { ProductDetailTemplate };
