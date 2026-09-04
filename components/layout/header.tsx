"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NAV_LINKS, PRODUCT_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { HEADER_THEMES, type HeaderTheme } from "./header-theme";

function Header() {
  const pathname = usePathname();
  const headerRef = React.useRef<HTMLElement>(null);
  const productsRef = React.useRef<HTMLDivElement>(null);

  // Home's hero has no data-header-theme measurement to go on for the very
  // first frame (before scroll/resize fires), so seed a sensible guess —
  // corrected immediately by the effect below on every other page.
  const [theme, setTheme] = React.useState<HeaderTheme>(pathname === "/" ? "overlay" : "white");
  const [productsOpen, setProductsOpen] = React.useState(false);

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    if (!sections.length) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 64;
    // Shrinks the observed viewport down to a 1px line just past the
    // header's bottom edge — whichever section crosses that line is the one
    // the header should match. Driven by layout/compositing rather than the
    // 'scroll' event, so it keeps working through rAF throttling, tab
    // backgrounding, and programmatic scrolling alike.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const next = (entry.target as HTMLElement).dataset.headerTheme as HeaderTheme | undefined;
          if (next) setTheme(next);
        }
      },
      { rootMargin: `-${headerHeight}px 0px -${Math.max(window.innerHeight - headerHeight - 1, 0)}px 0px` }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // Re-run on route change too — new page, new section stack underneath.
  }, [pathname]);

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

  const { bg, shadow } = HEADER_THEMES[theme];
  const isLight = theme === "navy"; // only the footer's dark bg needs light nav text/icons
  const isOnGradient = theme === "overlay";

  // ink-600 (used on the solid white/surface themes, confirmed safe at
  // 5.9:1 there) drops to 2.85:1 against the gradient's darker stops, which
  // sit under the right-hand nav items — not just a worst-case corner.
  // navy-900 holds 8–14:1 across the whole gradient, so the overlay theme
  // gets that instead, with underline standing in for the hover colour
  // change (color-only hover shift isn't guaranteed safe at every opacity).
  const navLinkClass = cn(
    "text-body font-medium transition-colors duration-[var(--dur-micro)]",
    isLight
      ? "text-white/90 hover:text-white"
      : isOnGradient
        ? "text-navy-900 hover:underline"
        : "text-ink-600 hover:text-navy-900"
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-[var(--dur-micro)] ease-[var(--ease-out)]",
        bg,
        shadow && "shadow-nav"
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
        >
          <Logo variant={isLight ? "white" : "navy"} />
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
          <MobileNav light={isLight} />
        </div>
      </Container>
    </header>
  );
}

export { Header };
