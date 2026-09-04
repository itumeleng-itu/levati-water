import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /**
   * For use over the grad-hero gradient (CompactHero, home Hero). Navy-900
   * at full opacity, not a lighter/translucent tone — the gradient runs
   * light-to-medium blue throughout, and even white text at 85% opacity
   * only reaches ~4.56:1 at the gradient's darkest point, too fragile a
   * margin. Full-opacity navy-900 holds 5.89:1 at worst.
   */
  onGradient?: boolean;
}

function Breadcrumbs({ items, onGradient }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-small",
          onGradient ? "text-navy-900" : "text-ink-600"
        )}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "outline-none underline-offset-2 transition-[text-decoration-color] duration-[var(--dur-micro)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                    onGradient ? "focus-visible:outline-navy-900" : "focus-visible:outline-blue-500"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "font-semibold" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };
