import Image from "next/image";
import { cn } from "@/lib/utils";

// Slots the client has supplied a real photo for, dropped straight into
// public/images/<slot>.jpg — extend this set as each one lands. Everything
// else still shows the labelled placeholder below. `position` only matters
// for portrait sources cropped into a wider box (product detail's 4:3) —
// defaults to centred.
const READY_SLOTS: Record<string, { alt: string; position?: string }> = {
  "product-cooler": { alt: "A Levati bottled water cooler and dispenser" },
  "product-tap": { alt: "A Levati mains-fed water cooler, plumbed into a wall socket" },
  "product-filter": {
    alt: "Clear, purified water pouring into a glass",
    position: "center 65%",
  },
  "about-pouring": { alt: "A man drinking cold water straight from the bottle outdoors" },
  "product-branded": { alt: "A blank-label water bottle, ready for custom branding" },
  "product-branded-2": { alt: "Rows of blank-label bottles awaiting custom labels" },
  "product-branded-3": { alt: "Blank plastic bottles staged for custom label artwork" },
};

interface ImagePlaceholderProps extends React.ComponentProps<"div"> {
  /** The slot name from docs/IMAGES.md, e.g. "hero-main" — shown so it's obvious
   * in review which real photo (dropped into public/images/, then added to
   * READY_SLOTS below) replaces this. */
  slot: string;
}

/**
 * Stands in for real product/lifestyle photography until the client supplies
 * it — see docs/IMAGES.md. Deliberately labelled rather than left blank:
 * stock photography here is a placeholder, not a decision, and this makes
 * that visible in every review, not just the docs. Once a slot's photo
 * exists in public/images/, add it to READY_SLOTS above and every usage
 * site (product card, product detail, split feature) swaps over on its own.
 */
function ImagePlaceholder({ slot, className, ...props }: ImagePlaceholderProps) {
  const ready = READY_SLOTS[slot];
  if (ready) {
    return (
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <Image
          src={`/images/${slot}.jpg`}
          alt={ready.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={ready.position ? { objectPosition: ready.position } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[image:var(--grad-card)] text-center",
        className
      )}
      {...props}
    >
      <span className="rounded-md bg-white/70 px-2 py-1 text-small text-blue-700">
        {slot}.jpg — pending
      </span>
    </div>
  );
}

export { ImagePlaceholder };
