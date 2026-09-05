import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Ripple } from "@/components/ui/ripple";

// Staggered 80ms apart, per spec §3 — the one permitted scroll-independent
// animation on the page. `backwards` fill-mode holds each element at its
// "from" state during its delay, so nothing flashes visible before its turn.
function reveal(delayMs: number) {
  return `animate-[hero-reveal_var(--dur-reveal)_var(--ease-out)_${delayMs}ms_backwards]`;
}

function Hero() {
  return (
    <section
      data-header-theme="overlay"
      className="relative -mt-16 min-h-[520px] overflow-hidden bg-[image:var(--grad-hero)] md:-mt-20 md:min-h-[480px] lg:min-h-[600px]"
    >
      <Container className="flex flex-col items-center gap-10 pb-14 pt-28 md:flex-row md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
        <div className="flex flex-col items-start text-left md:basis-3/5 lg:basis-[55%]">
          {/* Navy, not white — see components/content/cta-band.tsx for why:
              this gradient is light-to-medium blue throughout, and white
              text fails contrast (as low as 1.17:1) everywhere on it. */}
          <h1 className={`max-w-[20ch] text-display font-heading font-bold text-navy-900 ${reveal(0)}`}>
            Pure water. Delivered.
          </h1>
          <p className={`mt-4 max-w-[42ch] text-lead text-navy-900 ${reveal(80)}`}>
            Home and office water solutions across Johannesburg and Pretoria.
          </p>
          <div className={`mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row ${reveal(160)}`}>
            <Button href="/free-trial" variant="primary" size="lg">
              Book a free trial
            </Button>
            <Button
              href="/products"
              variant="secondary"
              size="lg"
              className="text-navy-900 hover:bg-navy-900/10"
            >
              See our products
            </Button>
          </div>
        </div>

        <div
          className={`relative w-[70%] md:w-auto md:basis-2/5 lg:basis-[45%] ${reveal(240)}`}
        >
          {/* Extends past the photo's edges on all sides so it reads as a
              backdrop the photo sits over, not a layer hidden behind it.
              Fixed inset rather than a percentage size — the wrapper's
              height comes from its content (the photo), so a percentage
              height here wouldn't resolve against a definite value. */}
          <Ripple className="pointer-events-none absolute -inset-12 hidden lg:block" />
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-hover">
            <Image
              src="/images/hero-main.jpg"
              alt="Rows of large water cooler bottles ready for delivery"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 768px) 40vw, 70vw"
              className="object-cover"
            />
            {/* The source photo's cyan cast runs colder/more saturated than
                the site's blue-700/navy-900 palette. A flat brand-blue wash
                at low opacity pulls it toward that palette without needing
                mix-blend-mode, which renders unreliably across engines. */}
            <div className="absolute inset-0 bg-blue-700/25" aria-hidden="true" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { Hero };
