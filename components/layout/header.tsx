"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, PRODUCT_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface HeaderProps {
  /**
   * True for pages with a full-bleed hero the header should float over
   * (spec §7.1) — starts transparent with white text, then solid after 40px
   * of scroll. False (default) keeps the header solid from the start, which
   * is the safe choice until a page actually has that hero behind it.
   */
  transparent?: boolean;
}

function Header({ transparent = false }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);
  const productsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  React.useEffect(() => {
    if (!productsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!productsRef.current?.contains(e.target as Node)) setProductsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProductsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [productsOpen]);

  const isSolid = !transparent || scrolled;

  const navLinkClass = cn(
    "text-body font-medium transition-colors duration-[var(--dur-micro)]",
    isSolid ? "text-ink-600 hover:text-navy-900" : "text-white/90 hover:text-white"
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-out)]",
        isSolid ? "bg-white shadow-nav" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className={cn(
            "font-heading text-h3 font-bold outline-none transition-colors duration-[var(--dur-micro)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
            isSolid ? "text-navy-900" : "text-white"
          )}
        >
          Levati Water
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          <Link href={NAV_LINKS[0].href} className={navLinkClass}>
            {NAV_LINKS[0].label}
          </Link>
          <Link href={NAV_LINKS[1].href} className={navLinkClass}>
            {NAV_LINKS[1].label}
          </Link>

          <div className="relative" ref={productsRef}>
            <button
              type="button"
              className={cn(navLinkClass, "inline-flex items-center gap-1 outline-none")}
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((v) => !v)}
            >
              Products
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-[var(--dur-micro)]",
                  productsOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            {productsOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-line bg-white p-2 shadow-hover"
              >
                {PRODUCT_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className="block rounded-md px-3 py-2 text-body text-ink-900 outline-none transition-colors duration-[var(--dur-micro)] hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                    onClick={() => setProductsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={NAV_LINKS[2].href} className={navLinkClass}>
            {NAV_LINKS[2].label}
          </Link>
          <Link href={NAV_LINKS[3].href} className={navLinkClass}>
            {NAV_LINKS[3].label}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/free-trial" variant="primary" size="sm" className="hidden lg:inline-flex">
            Free trial
          </Button>
          <MobileNav light={!isSolid} />
        </div>
      </Container>
    </header>
  );
}

export { Header };
