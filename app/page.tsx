import { Droplets, Wrench, Plug, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Hero } from "@/components/content/hero";
import { StatBar } from "@/components/content/stat-bar";
import { SplitFeature } from "@/components/content/split-feature";
import { ProductCard } from "@/components/content/product-card";
import { FeatureCard } from "@/components/content/feature-card";
import { StepList } from "@/components/content/step-list";
import { CTABand } from "@/components/content/cta-band";
import { PRODUCTS } from "@/lib/products";

const WHY_LEVATI = [
  {
    icon: Droplets,
    title: "Seven-stage purification",
    body: "Minerals are added back after filtering, so the water is clean without tasting flat.",
  },
  {
    icon: Wrench,
    title: "Free maintenance",
    body: "Scheduled delivery and free maintenance are included on every rental.",
  },
  {
    icon: Plug,
    title: "Plugs in anywhere",
    body: "No plumbing needed — freestanding coolers set up in minutes, anywhere there's a plug.",
  },
  {
    icon: ShieldCheck,
    title: "Keeps running through water cuts",
    body: "Coolers keep water available on-site even when municipal supply doesn't.",
  },
] as const;

const HOW_IT_WORKS = [
  "Call or book online",
  "Seven-day free trial",
  "Install and set a delivery schedule",
] as const;

export default function Home() {
  return (
    <>
      <Hero />
      <StatBar />

      <Section>
        <Container>
          <SplitFeature
            imageSlot="about-pouring"
            heading="Water solutions built for home and office"
            linkHref="/about"
            linkLabel="More about Levati"
          >
            <p>
              Levati Water is run by directors with over 30 years of combined water-industry
              experience, supplying homes and offices with bottled coolers, mains-fed systems and
              reverse osmosis. Every rental includes free maintenance and scheduled delivery, so
              your water just keeps arriving.
            </p>
          </SplitFeature>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading heading="Our products" lead="Rent, buy or install — whatever suits the space." />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="why-levati">
        <Container>
          <SectionHeading heading="Why Levati" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY_LEVATI.map((item) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title}>
                {item.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading heading="How it works" />
          <div className="mt-12">
            <StepList steps={HOW_IT_WORKS} />
          </div>
        </Container>
      </Section>

      <CTABand
        heading="Try Levati water free for 7 days"
        primaryCta={{ label: "Book a free trial", href: "/free-trial" }}
        phone={{ display: "0861 111 853", href: "tel:+27861111853" }}
      >
        Includes a complimentary 18.9 litre bottle and a 500ml retail bottle to try — no
        obligation, Johannesburg and Pretoria only.
      </CTABand>

      {/* TODO(client): testimonials + logo strip. Omitted per spec §7.1 item 9
          until real quotes and client logos are supplied — do not write
          placeholder quotes. */}
    </>
  );
}
