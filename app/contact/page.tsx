import type { Metadata } from "next";
import { Phone, Printer, Mail, MessageCircle, MapPin } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact — Levati Water",
  description: "Get in touch with Levati Water — phone, email, WhatsApp, or send a message.",
};

// TODO(client): trading hours — not given anywhere in the source content,
// and not safe to guess. Add once supplied rather than inventing "9-5".

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <h1 className="text-h1 font-heading font-bold text-ink-900">Contact us</h1>
        <p className="mt-4 max-w-[var(--measure)] text-lead text-ink-600">
          Questions about a product, a rental, or your free trial — send us a message and we&apos;ll
          get back to you.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8">
            <div className="rounded-lg border border-line bg-white p-6 shadow-card">
              <ul className="flex flex-col gap-4 text-body text-ink-600">
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-aqua-500" aria-hidden="true" />
                  <a href="tel:+27861111853" className="hover:text-navy-900">
                    0861 111 853
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Printer className="h-5 w-5 shrink-0 text-aqua-500" aria-hidden="true" />
                  <span>0866 403 182 (fax)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-aqua-500" aria-hidden="true" />
                  {/* TODO(client): move to info@levatiwater.com — the current
                      @mweb.co.za address hurts deliverability and credibility
                      (spec §7.6). Displaying the real current address until
                      the new one is actually set up and confirmed. */}
                  <a href="mailto:levati@mweb.co.za" className="hover:text-navy-900">
                    levati@mweb.co.za
                  </a>
                </li>
              </ul>

              {/* WhatsApp's own brand green (#25D366) only reaches 1.98:1
                  contrast with white text — nowhere near WCAG AA's 4.5:1.
                  This darker shade stays clearly WhatsApp-associated while
                  actually passing (~5.4:1). */}
              <a
                href="https://wa.me/27861111853?text=Hi%2C%20I%27d%20like%20to%20find%20out%20more%20about%20Levati%20Water"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#0B7A3D] px-6 py-3 text-button font-semibold text-white transition-colors duration-[var(--dur-micro)] hover:bg-[#095E30]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            {/* No physical address supplied yet — a service-area graphic
                stands in for a map (spec §7.6: "Map only if the client
                supplies a physical address — otherwise a service-area
                graphic"). TODO(client): the original site's contact page
                heading was "Gauteng:" — broader than Johannesburg/Pretoria.
                Only the free trial was explicitly restricted to those two
                cities. Confirm the real general service area before
                treating this box as settled. */}
            <div className="rounded-lg bg-[image:var(--grad-card)] p-6">
              <p className="text-small font-semibold uppercase tracking-wide text-blue-700">
                Service areas
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                <li className="flex items-center gap-2.5 text-body font-semibold text-navy-900">
                  <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                  Johannesburg
                </li>
                <li className="flex items-center gap-2.5 text-body font-semibold text-navy-900">
                  <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
                  Pretoria
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
