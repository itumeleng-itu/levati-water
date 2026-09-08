# Imagery

Photography is supplied directly by the client and dropped into `public/images/`
as `<slot>.jpg` — there's no stock-photo fetch step or API key involved.

## How a slot goes live

1. Save the photo as `public/images/<slot>.jpg`.
2. Add it to `READY_SLOTS` in `components/ui/image-placeholder.tsx` (an alt
   text, and an optional `position` for portrait sources cropped into a wider
   box — see that file's comments).
3. Every usage of that slot (product card, product detail hero, split
   feature, the branded-water mockup gallery) switches from the labelled
   placeholder to the real photo automatically.

The hero image (`hero-main.jpg`) is the one exception — it's wired directly
in `components/content/hero.tsx` rather than through `ImagePlaceholder`,
since it also needs `priority` and a brand-blue colour wash (see that file's
comments for why).

## Current slots

| Slot | Used on | Status |
|---|---|---|
| `hero-main` | Home hero | Live |
| `about-pouring` | Home page split feature | Live |
| `about-office` | `/about` split feature | Pending — shows a labelled placeholder |
| `product-cooler` | Bottled water coolers card + detail hero | Live |
| `product-tap` | Mains-fed coolers card + detail hero | Live |
| `product-filter` | Reverse osmosis card + detail hero | Live |
| `product-branded` | Branded water card + mockup gallery tile 1 | Live |
| `product-branded-2` | Branded water mockup gallery tile 2 | Live |
| `product-branded-3` | Branded water mockup gallery tile 3 | Live |

**Stock photography is a placeholder, not a decision.** A generic dispenser
or bottle standing in for real Levati equipment undermines the "this is our
equipment" claim on the product pages — don't let a placeholder ship as if
it were the real product.

## Optimisation

- Serve AVIF with WebP fallback — already configured in `next.config.ts`
  (`images.formats`).
- `next/image`'s `fill` + explicit container aspect ratio (not manual
  width/height) is the pattern used throughout — see `image-placeholder.tsx`.
- Hero image only gets `priority`. Everything else stays lazy.
- Set `sizes` accurately for the layout an image actually renders at — a
  mismatch here previously caused a bad crop by making the browser fetch a
  too-small source (see git history on `image-placeholder.tsx`'s `sizes`).

## Icons and graphics

- **Icons** — Lucide React only. No mixed icon sets.
- **Ripple graphic** — hand-authored SVG (`components/ui/ripple.tsx`,
  concentric ellipses, stroke `--color-blue-300`, decreasing opacity
  outward). Not a stock photo — a raster ripple wouldn't scale cleanly
  behind the hero.
- **Logo** — client-supplied PNG, recolored (alpha-preserving) to the token
  palette. `public/brand/logo-navy.png` (default) and `logo-white.png` (for
  the header's transparent-over-hero state and the navy footer). Includes
  the "taste the difference." tagline. `TODO(client)`: a real SVG would
  scale more cleanly at very large sizes (e.g. print) than this raster crop.
- **Favicon** — generated as code (`app/icon.tsx`, `app/apple-icon.tsx`) via
  `next/og`'s `ImageResponse`, not a sourced image file.
