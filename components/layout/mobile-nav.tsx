"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, PRODUCT_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  /** Matches the header's current light/dark state so the icon stays visible. */
  light?: boolean;
}

function MobileNav({ light = false }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-md outline-none",
            "transition-colors duration-[var(--dur-micro)]",
            light ? "text-white hover:bg-white/10" : "text-navy-900 hover:bg-blue-50",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
            "lg:hidden"
          )}
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col overflow-y-auto px-5">
          <ul className="flex flex-col">
            {NAV_LINKS.slice(0, 2).map((link) => (
              <li key={link.href} className="border-b border-line">
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="block py-4 text-body font-semibold text-ink-900 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}

            <Accordion type="single" collapsible>
              <AccordionItem value="products">
                <AccordionTrigger>Products</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-3">
                    {PRODUCT_LINKS.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="block text-body text-ink-600 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {NAV_LINKS.slice(2).map((link) => (
              <li key={link.href} className="border-b border-line">
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="block py-4 text-body font-semibold text-ink-900 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-5">
          <SheetClose asChild>
            <Button href="/free-trial" variant="primary" className="w-full">
              Free trial
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileNav };
