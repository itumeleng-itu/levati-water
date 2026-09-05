import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

// spec §9: "Generate sitemap.xml ... from the route tree." /thank-you and
// /404 are deliberately excluded — both already set robots: noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/products", "/faq", "/contact", "/free-trial", "/privacy"];
  const productPaths = PRODUCTS.map((product) => `/products/${product.slug}`);

  return [...staticPaths, ...productPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
