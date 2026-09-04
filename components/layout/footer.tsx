import Link from "next/link";
import { Container } from "./container";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Logo } from "@/components/ui/logo";
import { PRODUCT_LINKS } from "@/lib/nav";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

function LinkList({ links }: { links: readonly { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-body text-blue-100 outline-none transition-colors duration-[var(--dur-micro)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300 focus-visible:outline-offset-2"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <Container className="py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo variant="white" />
            <p className="mt-4 max-w-[32ch] text-body text-blue-100">
              Home and office water solutions across Johannesburg and Pretoria — bottled coolers,
              mains-fed coolers, reverse osmosis and branded water.
            </p>
          </div>

          {/* md+: static columns. Base: accordion groups, per spec §4. */}
          <div className="hidden md:block">
            <p className="text-small font-semibold uppercase tracking-wide text-blue-300">Products</p>
            <div className="mt-4">
              <LinkList links={PRODUCT_LINKS} />
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-small font-semibold uppercase tracking-wide text-blue-300">Company</p>
            <div className="mt-4">
              <LinkList links={COMPANY_LINKS} />
            </div>
          </div>

          <div className="md:hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="products" className="border-line/20">
                <AccordionTrigger className="text-white [&>svg]:text-blue-300">Products</AccordionTrigger>
                <AccordionContent className="text-blue-100">
                  <LinkList links={PRODUCT_LINKS} />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="company" className="border-line/20">
                <AccordionTrigger className="text-white [&>svg]:text-blue-300">Company</AccordionTrigger>
                <AccordionContent className="text-blue-100">
                  <LinkList links={COMPANY_LINKS} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <p className="text-small font-semibold uppercase tracking-wide text-blue-300">Contact</p>
            <ul className="mt-4 flex flex-col gap-3 text-body text-blue-100">
              <li>
                <a href="tel:+27861111853" className="hover:text-white">
                  0861 111 853
                </a>
              </li>
              <li>Johannesburg &amp; Pretoria</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-small text-blue-300 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Levati Water. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
