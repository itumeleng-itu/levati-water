import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

interface Crumb {
  label: string;
  href?: string;
}

interface CompactHeroProps {
  breadcrumbs: Crumb[];
  heading: string;
  lead?: string;
}

// Shorter version of the home Hero (spec §7.2/§7.3: "Compact gradient hero
// with breadcrumb") — same --grad-hero background and header-overlay
// behaviour, without the two-column layout or CTAs.
//
// Text is navy-900, not white: --grad-hero runs light-to-medium blue
// throughout (§1), and white text measures as low as 1.17:1 against it —
// nowhere near WCAG AA even at the gradient's darkest point (2.64:1).
// Navy-900 holds 5.89–13.31:1 across the whole range. See hero.tsx and
// cta-band.tsx, which use the same gradient and had the same problem.
function CompactHero({ breadcrumbs, heading, lead }: CompactHeroProps) {
  return (
    <section
      data-header-theme="overlay"
      className="relative -mt-16 bg-[image:var(--grad-hero)] pb-14 pt-28 md:-mt-20 md:pb-16 md:pt-32 lg:pt-36"
    >
      <Container>
        <Breadcrumbs items={breadcrumbs} onGradient />
        <h1 className="mt-6 max-w-[24ch] text-h1 font-heading font-bold text-navy-900">{heading}</h1>
        {lead && <p className="mt-4 max-w-[var(--measure)] text-lead text-navy-900">{lead}</p>}
      </Container>
    </section>
  );
}

export { CompactHero };
