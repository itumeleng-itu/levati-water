import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// spec §9: "Generate ... robots.txt from the route tree."
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thank-you"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
