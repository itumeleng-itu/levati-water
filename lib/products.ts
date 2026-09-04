export interface Product {
  slug: string;
  title: string;
  descriptor: string;
  tag: string;
  imageSlot: string;
}

// Content drawn from BUILD-SPEC.md §7.4. Tags stand in for the reference
// mockup's price tag — Levati doesn't sell online, so category replaces
// price (spec's "Where the reference shows a price, Levati shows a
// category tag").
export const PRODUCTS: Product[] = [
  {
    slug: "bottled-water-coolers",
    title: "Bottled water coolers",
    descriptor: "Freestanding coolers with cold, hot or ambient water — set up in minutes.",
    tag: "Rental or purchase",
    imageSlot: "product-cooler",
  },
  {
    slug: "mains-fed-coolers",
    title: "Mains-fed coolers",
    descriptor: "Connects straight to the mains for fixed-cost water in high-use spaces.",
    tag: "Rental or purchase",
    imageSlot: "product-tap",
  },
  {
    slug: "reverse-osmosis",
    title: "Reverse osmosis",
    descriptor: "Seven-stage filtration for the cleanest water straight from your tap.",
    tag: "Installed",
    imageSlot: "product-filter",
  },
  {
    slug: "branded-water",
    title: "Branded water",
    descriptor: "Your own label on retail bottles, delivered ready to serve.",
    tag: "Custom order",
    imageSlot: "product-branded",
  },
];
