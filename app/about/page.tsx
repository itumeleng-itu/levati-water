import type { Metadata } from "next";
import { ShieldCheck, Droplets, Wrench, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { CompactHero } from "@/components/content/compact-hero";
import { SplitFeature } from "@/components/content/split-feature";
import { Timeline } from "@/components/content/timeline";
import { FeatureCard } from "@/components/content/feature-card";
import { CTABand } from "@/components/content/cta-band";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Levati Water",
  description:
    "Levati Water is a South African drinking-water company founded by Trevor Currie and Happiness Mphake, with over 30 years in the industry.",
};

const TIMELINE = [
  { year: "Early 1990s", text: "Trevor Currie enters the water market in the UK." },
  {
    year: "1996",
    text: "Returns to South Africa and founds Oaysis Water, which later becomes Alpen Spa.",
  },
  {
    year: "2001",
    text: "Alpen Spa is absorbed into Nestlé Waters. Currie goes on to head the Home & Office division.",
  },
  { year: "Levati Water", text: "Currie partners with Happiness Mphake to found Levati Water." },
] as const;

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    body: "Three decades in the water industry, serving Johannesburg and Pretoria without interruption — including through load shedding and water cuts.",
  },
  {
    icon: Droplets,
    title: "Water quality",
    body: "Seven-stage reverse osmosis purification on every system, with minerals added back for taste.",
  },
  {
    icon: Wrench,
    title: "Straightforward service",
    body: "Free maintenance and scheduled delivery on every rental — no hidden call-out fees.",
  },
  {
    icon: MapPin,
    title: "Local & responsive",
    body: "A Johannesburg and Pretoria-based team, not a call centre.",
  },
] as const;

// Founder photos: TODO(client) — omitted from the SplitFeature image slot
// rather than filled with a generic stock portrait, since a stock photo
// standing in for Currie or Mphake specifically would misrepresent them.

export default function AboutPage() {
  return (
    <>
      <CompactHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        heading="30+ years of getting water right"
        lead="Levati Water is run by Trevor Currie and Happiness Mphake, serving homes and offices across Johannesburg and Pretoria."
      />

      <Section>
        <Container>
          <SplitFeature imageSlot="about-office" heading="How we got here">
            <p>
              Trevor Currie&apos;s water career started in the UK water market in the early 1990s.
              He returned to South Africa in 1996 and founded Oaysis Water, which became Alpen Spa
              and was later absorbed into Nestlé Waters, where he headed the Home &amp; Office
              division. Levati Water is the result of that experience, built in partnership with
              Happiness Mphake.
            </p>
          </SplitFeature>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="max-w-[720px]">
          <SectionHeading heading="Our story" />
          <div className="mt-12">
            <Timeline events={[...TIMELINE]} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading heading="What we stand for" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <FeatureCard key={value.title} icon={value.icon} title={value.title}>
                {value.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-line bg-white p-8 text-center shadow-card sm:p-10">
            <h2 className="text-h2 font-heading font-bold text-ink-900">
              Become a Levati partner
            </h2>
            <p className="max-w-[var(--measure)] text-body text-ink-600">
              We&apos;re looking for distributors and partners to help bring Levati water to more
              homes and offices across South Africa. Get in touch to find out more.
            </p>
            <Button href="/contact" variant="primary" size="lg" className="mt-2">
              Get in touch
            </Button>
          </div>
        </Container>
      </Section>

      <CTABand
        heading="Try Levati water free for 7 days"
        primaryCta={{ label: "Book a free trial", href: "/free-trial" }}
        phone={{ display: "0861 111 853", href: "tel:+27861111853" }}
      >
        Johannesburg and Pretoria only — no obligation.
      </CTABand>
    </>
  );
}
