import type { Metadata } from "next";
import { ShieldCheck, Droplets, Wrench, Clock } from "lucide-react";
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
    "Levati Water is a South African drinking-water company founded by Trevor Currie, who has over 30 years in the water industry, and Happiness Mphake.",
};

// Mphake was a founding Alpen Spa employee and stayed on through the Nestlé
// Waters years — not someone Currie met only when Levati started. Source
// doc: "Do not reduce him to a name."
const TIMELINE = [
  {
    year: "Early 1990s",
    text: "Trevor Currie enters the water industry, honing his skills in the competitive UK market.",
  },
  {
    year: "1996",
    text: "Currie returns to South Africa and founds Oaysis Water — later Alpen Spa — with Happiness Mphake among its founding team.",
  },
  {
    year: "2001",
    text: "Alpen Spa is absorbed into Nestlé Waters. Currie heads the Home & Office division, with Mphake continuing alongside him.",
  },
  {
    year: "Levati Water",
    text: "Currie and Mphake bring that shared experience into their own venture, Levati Water.",
  },
] as const;

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Reliability",
    body: "Bottled and mains-fed coolers keep water available on-site even during the water cuts that have become a way of life in South Africa.",
  },
  {
    icon: Droplets,
    title: "Water quality",
    body: "Levati's bottled water goes through seven-stage reverse osmosis, with minerals added back for taste. RO systems for the home or office come in 5- or 7-stage options.",
  },
  {
    icon: Wrench,
    title: "Straightforward service",
    body: "Free maintenance and scheduled delivery on every rental, from installation to filter and bottle replacements.",
  },
  {
    icon: Clock,
    title: "Ready in minutes",
    body: "Freestanding coolers plug into any standard socket and dispense drinkable water within 5–10 minutes of installation.",
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
        heading="Two directors. Decades of water experience."
        lead="Levati Water is run by Trevor Currie and Happiness Mphake, serving homes and offices across Johannesburg and Pretoria."
      />

      <Section>
        <Container>
          <SplitFeature imageSlot="about-office" heading="How we got here">
            <p>
              Trevor Currie&apos;s water career started in the UK water market in the early 1990s.
              He returned to South Africa in 1996 and founded Oaysis Water, with Happiness Mphake
              among its founding employees. Oaysis became Alpen Spa and was later absorbed into
              Nestlé Waters, where Currie headed the Home &amp; Office division and Mphake
              continued to build his own wealth of experience in that industry. Levati Water is
              the result of that shared history, run by the two of them together.
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
              Interested in the water industry?
            </h2>
            <p className="max-w-[var(--measure)] text-body text-ink-600">
              This isn&apos;t only for companies — if you&apos;ve got drive and enthusiasm and want
              to find out more about the water industry, get in touch with Trevor or Happy.
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
