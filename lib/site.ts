// Canonical production origin — used by app/sitemap.ts and app/robots.ts.
// Override via NEXT_PUBLIC_SITE_URL once the real hosting domain is confirmed
// (Cloudflare Pages preview URLs, a staging subdomain, etc.).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://levatiwater.com";
