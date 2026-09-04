import type { Metadata } from "next";
import { Clock, Droplets, GlassWater } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { FeatureCard } from "@/components/content/feature-card";
import { FreeTrialForm } from "@/components/forms/free-trial-form";

export const metadata: Metadata = {
  title: "Free trial — Levati Water",
  description:
    "Seven days free, with a complimentary 18.9 litre bottle and a 500ml retail bottle to try. Johannesburg and Pretoria only.",
};

const INCLUDED = [
  { icon: Clock, title: "Seven days free", body: "Try a cooler in your home or office for a full week, no obligation." },
  { icon: Droplets, title: "18.9L bottle included", body: "A complimentary full-size bottle so you're ready to go from day one." },
  { icon: GlassWater, title: "500ml retail bottle", body: "A smaller bottle included too, to try the water on the go." },
] as const;

export default function FreeTrialPage() {
  return (
    <>
      <Section className="pb-0">
        <Container className="max-w-[var(--measure)]">
          <h1 className="text-h1 font-heading font-bold text-ink-900">Book your free trial</h1>
          <p className="mt-4 text-lead text-ink-600">
            Seven days free, with a complimentary 18.9 litre bottle and a 500ml retail bottle to
            try — no obligation.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {INCLUDED.map((item) => (
              <FeatureCard key={item.title} icon={item.icon} title={item.title}>
                {item.body}
              </FeatureCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="max-w-[720px]">
          <SectionHeading heading="Tell us where to deliver" align="left" />
          <p className="mt-4 text-body text-ink-600">
            The free trial covers Johannesburg and Pretoria only. If you&apos;re elsewhere, send us
            the form anyway and we&apos;ll confirm what&apos;s possible.
          </p>
          <div className="mt-8 rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
            <FreeTrialForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
