import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";

function ProductCard({ product }: { product: Product }) {
  return (
    <article
      className={
        "relative flex flex-col overflow-hidden rounded-lg border border-line bg-white " +
        "shadow-card transition-[transform,box-shadow] duration-200 " +
        "[@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-hover"
      }
    >
      <ImagePlaceholder slot={product.imageSlot} className="aspect-square w-full" />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-small font-semibold text-blue-700">{product.tag}</p>
        <h3 className="mt-1 text-h3 font-heading font-semibold text-ink-900">{product.title}</h3>
        <p className="mt-2 flex-1 text-body text-ink-600">{product.descriptor}</p>

        {/* Stretched link (spec §5): the card's whole surface is clickable via
            this pseudo-element, while the button itself stays the one real
            focusable control for keyboard users. */}
        <Button
          href={`/products/${product.slug}`}
          variant="primary"
          className="relative mt-6 w-full after:absolute after:inset-0 after:content-['']"
        >
          View details
        </Button>
      </div>
    </article>
  );
}

export { ProductCard };
