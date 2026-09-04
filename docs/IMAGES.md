# Imagery

## Licensing

Two sources, both free for commercial use with no attribution required and both
permitting modification:

| Source | Licence | Notes |
|---|---|---|
| **Pexels** | https://www.pexels.com/license/ | Primary. Has an open API, which is why the fetch script uses it. |
| **Unsplash** | https://unsplash.com/license | Fallback for manual picks. Its API needs an app registration; the download-page route is fine for one-offs. |

Both licences forbid: reselling the photo as-is, and using identifiable people to
imply endorsement. Neither is an issue for this site.

**Not permitted here:** iStock, Getty, Shutterstock, Vecteezy, Adobe Stock,
Freepik. Several rank highly for these searches and some show "free" badges that
mean *free trial* or *free with attribution and a subscription*. Do not pull from
them.

## How to get the images

```bash
# 1. Free key, instant, no card required
open https://www.pexels.com/api/

# 2. Add it
echo 'PEXELS_API_KEY=xxxxxxxxxxxx' >> .env.local

# 3. Fetch everything
node scripts/fetch-images.mjs

# 4. Don't like one? Bump its `pick` index in the manifest, then:
node scripts/fetch-images.mjs --slot=hero-main
```

Output lands in `public/images/` with a `credits.json` recording photographer,
source URL and dimensions for every file.

## Slot map

| File | Used on | Ratio | Notes |
|---|---|---|---|
| `hero-main.jpg` | Home hero | 4:3 | Must read well behind the gradient overlay |
| `hero-ripple.jpg` | Home hero backdrop | 16:9 | Decorative, `lg`+ only |
| `about-pouring.jpg` | Home about split, `/about` | 4:5 | Portrait, matches the reference's About block |
| `about-office.jpg` | `/about` | 16:9 | |
| `product-cooler.jpg` | Bottled water coolers card + detail hero | 1:1 card, 4:3 hero | |
| `product-bottle.jpg` | Branded water, retail range | 1:1 | |
| `product-tap.jpg` | Mains-fed coolers | 1:1 / 4:3 | |
| `product-filter.jpg` | Reverse osmosis | 1:1 / 4:3 | |
| `product-branded.jpg` | Branded water card | 1:1 | |
| `feature-drinking.jpg` | Why Levati | 16:9 | |
| `feature-gym.jpg` | Mains-fed "ideal for" | 16:9 | |
| `feature-warehouse.jpg` | Mains-fed "ideal for" | 16:9 | |
| `feature-delivery.jpg` | How it works, step 3 | 16:9 | |
| `cta-droplet.jpg` | CTA band backdrop | 21:9 | Heavy gradient overlay, so detail matters less |
| `texture-bubbles.jpg` | Section texture | 16:9 | Low opacity |

## Rules

**Stock photography is a placeholder, not a decision.** Every product image here
is a generic dispenser or bottle — not a Clover B10A, not a Levati-branded
bottle. Flag this to the client at handover and swap in real product shots as
soon as they arrive. Do not let generic stock ship as if it were the real
product; it undermines the "this is our equipment" claim on the product pages.

**People in photos.** Prefer shots that read as plausibly South African or
neutral enough not to jar. If a returned image is obviously wrong for the market,
bump the `pick` index rather than shipping it.

**Consistency.** The reference has a cool, bright, high-key look throughout. If
a downloaded photo is warm or dark, either reshoot the query or apply a light
CSS filter (`saturate(1.05) brightness(1.03)`) — but do that in one shared
utility class, not per-image.

## Optimisation

- Serve AVIF with WebP fallback. Next handles this: set
  `images: { formats: ['image/avif', 'image/webp'] }` in `next.config.ts`.
- Always pass explicit `width` and `height` to reserve layout space — this is how
  CLS stays under 0.1.
- Hero image only gets `priority`. Everything else stays lazy.
- Set `sizes` on every responsive image, e.g. for the 4-up product grid:
  `sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 25vw"`.
- Target under 200KB per served variant at 1x.

## Icons and graphics

- **Icons** — Lucide React only. No mixed icon sets.
- **Ripple graphic** — hand-authored SVG (concentric ellipses, stroke
  `--color-blue-300`, decreasing opacity outward). Do not use a stock photo for
  this; a raster ripple will not scale cleanly behind the hero.
- **Logo** — `TODO(client)`. Needs an SVG. Build a text-mark placeholder in
  Poppins 700 with a droplet glyph until it arrives.
- **OG image** — generate at build time with `next/og`, 1200×630, gradient
  background plus logotype.
