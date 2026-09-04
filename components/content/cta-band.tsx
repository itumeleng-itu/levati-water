import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

interface CTABandProps {
  heading: string;
  children: React.ReactNode;
  primaryCta?: { label: string; href: string };
  phone?: { display: string; href: string };
}

function CTABand({ heading, children, primaryCta, phone }: CTABandProps) {
  return (
    <section className="bg-[image:var(--grad-hero)] py-14 md:py-16 lg:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-[24ch] text-h1 font-heading font-bold text-white">{heading}</h2>
        <p className="max-w-[var(--measure)] text-lead text-white/90">{children}</p>
        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          {primaryCta && (
            <Button href={primaryCta.href} variant="primary" size="lg" className="bg-white text-navy-900 hover:bg-blue-50">
              {primaryCta.label}
            </Button>
          )}
          {phone && (
            <a
              href={phone.href}
              className="text-lead font-semibold text-white underline-offset-4 outline-none hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
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
