import type { Metadata } from "next";
import { Droplet } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { PRODUCT_LINKS } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found — Levati Water",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        <Droplet className="h-16 w-16 text-blue-500" aria-hidden="true" strokeWidth={1.5} />
        <h1 className="mt-6 text-h1 font-heading font-bold text-ink-900">Page not found</h1>
        <p className="mt-4 max-w-[var(--measure)] text-lead text-ink-600">
          That page doesn&apos;t exist, or has moved. Here&apos;s where you can find our products
          instead.
        </p>

        <div className="mt-8 grid w-full max-w-[560px] grid-cols-1 gap-3 sm:grid-cols-2">
          {PRODUCT_LINKS.map((link) => (
            <Button key={link.href} href={link.href} variant="secondary" size="md">
              {link.label}
            </Button>
          ))}
        </div>

        <Button href="/" variant="primary" size="lg" className="mt-8">
          Back to home
        </Button>
      </Container>
    </Section>
  );
}
