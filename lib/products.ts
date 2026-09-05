export interface ProductVariant {
  name: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  slug: string;
  title: string;
  descriptor: string;
  tag: string;
  imageSlot: string;
  // Detail-page fields. Branded water breaks the shared template (spec
  // §7.4), so it doesn't use these — see app/products/branded-water/page.tsx.
  heroDescription?: string;
  features?: string[];
  variants?: ProductVariant[];
  idealFor?: string[];
  faqs?: ProductFAQ[];
}

// Content drawn from BUILD-SPEC.md §7.4. Tags stand in for the reference
// mockup's price tag — Levati doesn't sell online, so category replaces
// price (spec's "Where the reference shows a price, Levati shows a
// category tag"). FAQ answers stay within facts the spec already states —
// no invented pricing, certs, or turnaround promises.
export const PRODUCTS: Product[] = [
  {
    slug: "bottled-water-coolers",
    title: "Bottled water coolers",
    descriptor: "Freestanding coolers with cold, hot or ambient water — set up in minutes.",
    tag: "Rental or purchase",
    imageSlot: "product-cooler",
    heroDescription:
      "Freestanding Clover coolers, supplied and rented, with cold-and-hot or cold-and-ambient dispensing. Under a square foot, plugs into any standard SA socket, and ready to drink from in 5–10 minutes.",
    features: [
      "Purified water delivered to your door",
      "Prepaid water options",
      "Free maintenance on rented coolers",
      "Free scheduled deliveries",
      "Versatile placement — no plumbing required",
      "Optional cup dispenser",
      "Rental or purchase",
    ],
    variants: [
      { name: "B10A", description: "Hot and cold dispensing." },
      { name: "B10B", description: "Cold and ambient dispensing." },
    ],
    idealFor: ["Homes", "Small offices"],
    faqs: [
      {
        question: "Do I need a plumber to install it?",
        answer:
          "No. Bottled coolers are freestanding — plug them in and they're ready. No plumbing is required.",
      },
      {
        question: "What's the difference between the B10A and B10B?",
        answer:
          "The B10A dispenses hot and cold water; the B10B dispenses cold and ambient. Both take standard bottled water.",
      },
      {
        question: "Can I rent instead of buying?",
        answer:
          "Yes — coolers are available to rent or purchase, and rentals include free maintenance and scheduled delivery.",
      },
      {
        question: "How quickly can I get water once it's installed?",
        answer: "The cooler is ready to dispense drinkable water within 5–10 minutes of setup.",
      },
      {
        question: "Do you deliver outside Johannesburg and Pretoria?",
        answer:
          "The free trial covers Johannesburg and Pretoria. For other areas, contact us and we'll confirm what's possible.",
      },
    ],
  },
  {
    slug: "mains-fed-coolers",
    title: "Mains-fed coolers",
    descriptor: "Connects straight to the mains for fixed-cost water in high-use spaces.",
    tag: "Rental or purchase",
    imageSlot: "product-tap",
    heroDescription:
      "Connects directly to the mains for a fixed water cost — built for gyms, factories, schools and large offices where bottled water adds up fast.",
    features: [
      "Easy installation",
      "Fixed usage cost",
      "Replacement filters",
      "A greener option — no bottles to store or replace",
      "Rental or purchase",
      "Optional cup dispenser",
      "Free maintenance on rentals",
      "Can link to a reverse osmosis system",
    ],
    idealFor: ["Gyms", "Factories", "Schools", "Large offices"],
    faqs: [
      {
        question: "How is this different from a bottled cooler?",
        answer:
          "A mains-fed cooler connects straight to your water supply instead of using replaceable bottles, so cost stays fixed regardless of how much your team drinks.",
      },
      {
        question: "Does it need plumbing?",
        answer:
          "Yes — it connects to your mains water supply, so installation involves plumbing, unlike a freestanding bottled cooler.",
      },
      {
        question: "Can it be combined with reverse osmosis?",
        answer: "Yes — a reverse osmosis system can link to a mains-fed cooler for extra filtration.",
      },
      {
        question: "Is maintenance included?",
        answer: "Rentals include free maintenance. Filters are replaced as part of the service.",
      },
    ],
  },
  {
    slug: "reverse-osmosis",
    title: "Reverse osmosis",
    descriptor: "5- and 7-stage filtration for the cleanest water straight from your tap.",
    tag: "Installed",
    imageSlot: "product-filter",
    heroDescription:
      "5- and 7-stage filtration installed under the counter with a dedicated tap above, or as an above-counter unit with its own tap — for the cleanest water straight from your kitchen.",
    features: [
      "5 and 7 stage reverse osmosis systems",
      "Single, dual and triple stage filter units, taps included",
      "Mains connection filters",
      "Counter-top ambient purification and dispensing units",
      "Replacement filters",
      "Installation and ongoing maintenance",
    ],
    variants: [
      { name: "Under-counter", description: "Installed beneath the counter with a dedicated above-counter tap." },
      { name: "Above-counter", description: "A standalone above-counter unit with its own dedicated tap." },
    ],
    idealFor: ["Homes", "Offices", "Kitchens without space for a cooler"],
    faqs: [
      {
        question: "What's the difference between 5-stage and 7-stage systems?",
        answer:
          "Both remove contaminants through multiple filtration stages; the 7-stage system adds further stages for extra purification. We can help you choose based on your water source.",
      },
      {
        question: "Do I need a separate tap?",
        answer:
          "Yes — reverse osmosis systems dispense through their own dedicated tap, separate from your regular kitchen tap.",
      },
      {
        question: "Is installation included?",
        answer: "Yes — installation and ongoing maintenance are part of the service.",
      },
      {
        question: "How often are filters replaced?",
        answer:
          "Replacement filters are supplied as part of your maintenance plan; we'll confirm a schedule when we install your system.",
      },
    ],
  },
  {
    slug: "branded-water",
    title: "Branded water",
    descriptor: "Your own label on retail bottles, delivered ready to serve.",
    tag: "Custom order",
    imageSlot: "product-branded",
  },
];
