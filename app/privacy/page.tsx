import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CompactHero } from "@/components/content/compact-hero";

export const metadata: Metadata = {
  title: "Privacy notice — Levati Water",
  description: "How Levati Water collects, uses and protects your personal information under POPIA.",
};

// TODO(client): confirm the Information Officer registration with the
// Information Regulator (https://inforegulator.org.za) and the officer's
// direct contact details if different from the number/email below. Trevor
// Currie is named as a default per POPIA's "head of the organisation is the
// Information Officer unless delegated" rule — not an invented fact, but
// worth an explicit confirmation before this goes live.

export default function PrivacyPage() {
  return (
    <>
      <CompactHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        heading="Privacy notice"
      />

      <Section>
        <Container className="max-w-[760px]">
          <div className="flex flex-col gap-8 text-body text-ink-600">
            <p>
              Levati Water (&quot;we&quot;, &quot;us&quot;) processes personal information in
              accordance with the Protection of Personal Information Act, 2013 (POPIA). This
              notice explains what we collect, why, and your rights over it.
            </p>

            <section>
              <h2 className="text-h3 font-heading font-semibold text-ink-900">
                What we collect
              </h2>
              <p className="mt-3">
                When you book a free trial, request a quote, or contact us, we collect the
                details you provide — typically your name, email address, phone number, suburb
                and any message you send us. We don&apos;t collect more than we need to respond
                to your enquiry.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-heading font-semibold text-ink-900">
                Why we collect it
              </h2>
              <p className="mt-3">
                To respond to your enquiry, arrange a free trial or quote, and — for rental and
                purchase customers — to deliver and maintain your water system. We don&apos;t use
                your details for anything beyond what you contacted us for, and we don&apos;t
                sell your information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-heading font-semibold text-ink-900">
                How we protect it
              </h2>
              <p className="mt-3">
                Form submissions are sent over an encrypted connection and verified against
                automated spam before reaching us. We keep your information only for as long as
                needed to respond to you or, for active rentals, to provide the service.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-heading font-semibold text-ink-900">Your rights</h2>
              <p className="mt-3">
                Under POPIA you can ask us what information we hold about you, ask us to correct
                or delete it, and object to how we use it. Contact us using the details below and
                we&apos;ll respond within a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-heading font-semibold text-ink-900">
                Information Officer
              </h2>
              <p className="mt-3">
                Trevor Currie, director, is Levati Water&apos;s Information Officer. For any
                question about this notice or your personal information, contact:{" "}
                <a href="tel:+27861111853" className="font-semibold text-blue-700 hover:text-navy-900">
                  0861 111 853
                </a>{" "}
                or{" "}
                <a
                  href="mailto:levati@mweb.co.za"
                  className="font-semibold text-blue-700 hover:text-navy-900"
                >
                  levati@mweb.co.za
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-heading font-semibold text-ink-900">
                Complaints
              </h2>
              <p className="mt-3">
                If you&apos;re not satisfied with how we&apos;ve handled your personal
                information, you can lodge a complaint with the Information Regulator of South
                Africa at{" "}
                <a
                  href="https://inforegulator.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:text-navy-900"
                >
                  inforegulator.org.za
                </a>
                .
              </p>
            </section>

            <p className="text-small text-ink-600">Last updated September 2026.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
