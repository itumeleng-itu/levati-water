import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface CTABandProps {
  heading: string;
  children: React.ReactNode;
  primaryCta?: { label: string; href: string };
  phone?: { display: string; href: string };
}

// Navy-900, not white: --grad-hero (§1) runs light-to-medium blue
// throughout, and white text measures as low as 1.17:1 against it — nowhere
// near WCAG AA even at the gradient's darkest point (2.64:1). Navy-900 holds
// 5.89–13.31:1 across the whole range. See hero.tsx and compact-hero.tsx,
// which use the same gradient and had the same problem.
function CTABand({ heading, children, primaryCta, phone }: CTABandProps) {
  return (
    <section data-header-theme="overlay" className="bg-[image:var(--grad-hero)] py-14 md:py-16 lg:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-[24ch] text-h1 font-heading font-bold text-navy-900">{heading}</h2>
        <p className="max-w-[var(--measure)] text-lead text-navy-900">{children}</p>
        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          {primaryCta && (
            <Button href={primaryCta.href} variant="primary" size="lg">
              {primaryCta.label}
            </Button>
          )}
          {phone && (
            <a
              href={phone.href}
              className="text-lead font-semibold text-navy-900 underline-offset-4 outline-none hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy-900 focus-visible:outline-offset-2"
            >
              {phone.display}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}

export { CTABand };
