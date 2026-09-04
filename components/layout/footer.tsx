import Link from "next/link";
import { Container } from "./container";
import { Logo } from "@/components/ui/logo";

// Deliberately minimal — the product/company/contact links this footer used
// to repeat live in the header nav and (from the forms phase) the contact
// page, so keeping them here was pure duplication. Just the mark and the
// legal bar. This is a deviation from BUILD-SPEC.md §7.1/§4's four-column
// footer; if that ever needs to come back, git history has it.
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-header-theme="navy" className="bg-navy-900 text-white">
      <Container className="flex flex-col items-center gap-8 py-12 text-center md:py-14">
        <Logo variant="white" className="h-10 lg:h-12" />

        <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-small text-blue-300 sm:flex-row sm:justify-between sm:pt-8">
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
