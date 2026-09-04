export const PRODUCT_LINKS = [
  { label: "Bottled water coolers", href: "/products/bottled-water-coolers" },
  { label: "Mains-fed coolers", href: "/products/mains-fed-coolers" },
  { label: "Reverse osmosis", href: "/products/reverse-osmosis" },
  { label: "Branded water", href: "/products/branded-water" },
] as const;

// Five items max, per spec §6 Navigation.
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Why Levati", href: "/#why-levati" },
  { label: "Contact", href: "/contact" },
] as const;
