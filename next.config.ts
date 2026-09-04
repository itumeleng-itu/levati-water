import type { NextConfig } from "next";

// 301 (permanent) redirect map from old WordPress URLs — spec §6.
const nextConfig: NextConfig = {
  images: {
    // docs/IMAGES.md — AVIF with WebP fallback, CLS controlled via explicit
    // width/height on every <Image> rather than here.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-products", destination: "/products", permanent: true },
      {
        source: "/our-products/bottled-water-coolers",
        destination: "/products/bottled-water-coolers",
        permanent: true,
      },
      {
        source: "/our-products/mains-fed-coolers",
        destination: "/products/mains-fed-coolers",
        permanent: true,
      },
      {
        source: "/our-products/reverse-osmosis-and-purification-systems",
        destination: "/products/reverse-osmosis",
        permanent: true,
      },
      {
        source: "/our-products/branded-water",
        destination: "/products/branded-water",
        permanent: true,
      },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/sitemap", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
