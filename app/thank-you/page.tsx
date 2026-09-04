import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank you — Levati Water",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <Section>
      <Container className="flex max-w-[560px] flex-col items-center text-center">
        <CheckCircle2 className="h-14 w-14 text-ok" aria-hidden="true" />
        <h1 className="mt-6 text-h1 font-heading font-bold text-ink-900">Thank you</h1>
        <p className="mt-4 text-lead text-ink-600">
          We&apos;ve received your message and will be in touch within one business day.
        </p>
        <Button href="/" variant="primary" size="lg" className="mt-8">
          Back to home
        </Button>
      </Container>
    </Section>
  );
}
