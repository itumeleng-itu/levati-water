import { cn } from "@/lib/utils";

interface ImagePlaceholderProps extends React.ComponentProps<"div"> {
  /** The slot name from docs/IMAGES.md, e.g. "hero-main" — shown so it's obvious
   * in review which real photo (via scripts/fetch-images.mjs) replaces this. */
  slot: string;
}

/**
 * Stands in for real product/lifestyle photography until PEXELS_API_KEY is
 * set and scripts/fetch-images.mjs has run — see docs/IMAGES.md. Deliberately
 * labelled rather than left blank: stock photography here is a placeholder,
 * not a decision, and this makes that visible in every review, not just the
 * docs.
 */
function ImagePlaceholder({ slot, className, ...props }: ImagePlaceholderProps) {
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
