# Levati Water — Build Specification

Version 1.0 · Reference: `docs/reference/omi-mockup.jpg`

---

## 1. Design tokens

Declare once in `app/globals.css` under `@theme`. Never hardcode a hex value in a
component.

```css
@theme {
  /* Brand blues — pulled from the OMI reference */
  --color-navy-900: #0A2540;   /* nav pill, primary buttons, footer */
  --color-navy-800: #0F3357;   /* primary hover */
  --color-blue-700: #12558C;   /* section headings */
  --color-blue-500: #3E93D0;   /* heading rule, focus ring */
  --color-blue-300: #A9D6F0;   /* hero gradient mid-stop */
  --color-blue-100: #DFF0FB;   /* product card image backdrop */
  --color-blue-50:  #F2F9FE;

  /* Accent — Levati's own note, not in the reference.
     Used only for purification/quality signals. Never for CTAs. */
  --color-aqua-500: #17B3B8;

  /* Neutrals */
  --color-ink-900: #0C1922;
  --color-ink-600: #5A6B7A;    /* body copy */
  --color-ink-400: #8A99A6;    /* captions, placeholders */
  --color-line:    #E3E9EE;
  --color-surface: #F5F7F9;    /* alternating section band */

  /* Feedback */
  --color-error: #C6373A;
  --color-warn:  #D08700;
  --color-ok:    #1E9E62;

  /* Radii — two tiers only, so hierarchy stays readable */
  --radius-md:  12px;   /* inputs, small chips */
  --radius-lg:  20px;   /* cards */
  --radius-xl:  28px;   /* hero and feature imagery */

  /* Elevation */
  --shadow-card:  0 2px 8px rgba(10,37,64,0.06);
  --shadow-hover: 0 10px 28px rgba(10,37,64,0.12);
  --shadow-nav:   0 1px 0 rgba(10,37,64,0.08);
}
```

Gradients:

```css
--grad-hero: linear-gradient(135deg, #DFF0FB 0%, #A9D6F0 45%, #5AA7D9 100%);
--grad-card: linear-gradient(180deg, #DFF0FB 0%, #BFE2F6 100%);
```

**No dark mode.** A water brand's equity is light and clean; dark mode doubles QA
for no benefit. Tokens are structured so it can be added later via
`[data-theme="dark"]` if the client insists.

### Contrast audit — check these before shipping

| Pair | Ratio | Verdict |
|---|---|---|
| `ink-900` on white | 16.1:1 | Pass |
| `ink-600` on white | 5.9:1 | Pass |
| `ink-600` on `surface` | 5.5:1 | Pass |
| `blue-700` on white | 6.4:1 | Pass |
| White on `navy-900` | 14.6:1 | Pass |
| White on `blue-500` | 3.1:1 | **Fails at body size.** Only use at 18px+ bold, or swap to `blue-700`. |
| `ink-400` on white | 3.2:1 | Decorative only. Never body text. |

---

## 2. Typography

Load with `next/font/google`, `display: swap`, latin subset, self-hosted output.
Ship weights 400 / 500 / 600 / 700 only.

- **Poppins** — headings, buttons, nav. Matches the geometric wide-bowl display
  type in the reference.
- **Inter** — body copy, forms, captions. Better than Poppins below 16px.

Fallback: `Poppins, "Segoe UI", system-ui, sans-serif`.

### Scale (fluid, `clamp()`)

| Token | Mobile → Desktop | Weight | Line-height | Tracking |
|---|---|---|---|---|
| `display` | 32 → 60px | 700 | 1.05 | -0.025em |
| `h1` | 28 → 44px | 700 | 1.15 | -0.02em |
| `h2` | 24 → 38px | 700 | 1.20 | -0.015em |
| `h3` | 19 → 24px | 600 | 1.30 | -0.01em |
| `lead` | 16 → 19px | 400 | 1.60 | 0 |
| `body` | 15 → 16px | 400 | 1.70 | 0 |
| `small` | 13 → 14px | 400 | 1.55 | 0 |
| `button` | 15 → 16px | 600 | 1.00 | 0.01em |

Measure: body capped at **68ch**. The hero display heading capped at **20ch** so
it stacks across three lines the way the reference does.

Sentence case throughout. No ALL-CAPS eyebrow labels above headings — the
reference doesn't use them and they read as template chrome.

---

## 3. Spacing, layout, motion

```
Spacing scale (4px base): 4 8 12 16 20 24 32 40 48 64 80 96 128
Section padding-y:  56px base · 80px md · 112px lg
Container:          max-width 1200px
Gutters:            20px base · 32px md · 48px lg
Grid columns:       4 base · 8 md · 12 lg
```

### Section heading rule

Every centred section heading in the reference sits above a short blue bar.
Build once as `<SectionHeading>`:

```
width 48px · height 3px · background var(--color-blue-500)
border-radius 9999px · margin 16px auto 0
```

### Motion

```
--ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
--dur-micro:  150ms;   /* hover, press, focus */
--dur-panel:  300ms;   /* nav sheet, accordion */
--dur-reveal: 600ms;   /* hero only */
```

Permitted motion, exhaustively:

1. **One hero reveal on load.** Heading, sub-line, CTAs, then image — staggered
   80ms, translateY 12px → 0, opacity 0 → 1.
2. **Interaction feedback.** Card hover lift, button press, accordion expand,
   nav sheet slide, form validation state changes.

That is the whole budget. No scroll-triggered reveals on every section.

Wrap all of it:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 4. Breakpoints and responsive behaviour

Tailwind defaults plus one extra small step.

| Name | Min-width | Target |
|---|---|---|
| *(base)* | 0 | 320–479, small phones |
| `xs` | 480px | large phones |
| `sm` | 640px | phablet |
| `md` | 768px | tablet portrait |
| `lg` | 1024px | tablet landscape, small laptop |
| `xl` | 1280px | desktop |
| `2xl` | 1536px | wide desktop |

### Per-section behaviour

| Section | Base (<768) | `md` 768–1023 | `lg`+ |
|---|---|---|---|
| Header | Logo + hamburger; full-height slide-in sheet | Same | Inline links + navy CTA pill |
| Hero | Stacked: text, then image at 70% width. `min-height: 520px` | Text 60% / image 40%. `min-height: 480px` | Text 55% / image 45%. `min-height: 600px`, ripple SVG visible |
| Hero CTAs | Stacked, full-width | Inline | Inline |
| About split | Image above text, `aspect-[4/5]` | 2-col 40/60 | 2-col 42/58 |
| Product cards | 1-up | 2-up | 4-up |
| Why Levati | 1-up stacked | 2×2 | 4-up row |
| How it works | Vertical stepped list | Vertical | Horizontal 3-step |
| Comparison table | Horizontal scroll with sticky first column | Full table | Full table |
| Footer | Accordion column groups | 2-col | 4-col |

Also handle: `prefers-reduced-motion`, `prefers-contrast: more`,
`@media (hover: hover)` — only apply hover lifts on real pointers so touch
devices don't get sticky states — and `@media print` on product pages, since
staff print spec sheets.

Touch targets ≥ 44×44px. Test at 320, 375, 414, 768, 1024, 1440.

---

## 5. Component inventory

**Layout** — `Header`, `MobileNav` (Sheet), `Footer`, `Container`, `Section`,
`SectionHeading`, `Breadcrumbs`.

**Content** — `Hero`, `SplitFeature` (reversible), `ProductCard`, `FeatureCard`,
`SpecList` (tick bullets), `ComparisonTable`, `StepList`, `StatBar`,
`Timeline`, `TestimonialCard`, `FAQAccordion`, `CTABand`.

**Interactive** — `Button` (`primary` / `secondary` / `ghost` / `link`;
`sm` / `md` / `lg`), `Input`, `Select`, `Textarea`, `Checkbox`, `FormField`,
`Toast`, `WhatsAppFab`.

**Utility** — `Seo` metadata helper, `JsonLd`, `OptimisedImage`, `Skeleton`.

### Button spec

```
Shape:    border-radius 9999px, padding 14px 28px, font-weight 600
Primary:  bg navy-900, text white
          hover → bg navy-800, translateY(-1px), shadow-hover
          active → translateY(0)
Secondary: 1.5px border currentColor, transparent fill
Focus:    outline 2px solid blue-500, outline-offset 2px  (all variants)
Disabled: opacity 0.5, cursor not-allowed, no hover transform
```

### Card spec

```
border-radius: var(--radius-lg)
border: 1px solid var(--color-line)
box-shadow: var(--shadow-card)
hover (pointer devices only): translateY(-4px), shadow-hover, 200ms
```

Use a stretched-link pseudo-element for the full-card click target, but keep one
real focusable `<a>` inside for keyboard users.

---

## 6. Site map and redirect map

```
/                                 Home
/about                            About
/products                         Products overview
/products/bottled-water-coolers
/products/mains-fed-coolers
/products/reverse-osmosis
/products/branded-water
/free-trial                       Trial booking form
/contact                          Contact
/faq                              FAQ
/thank-you                        Form success — noindex
/privacy                          POPIA notice
/404
```

### 301 redirects — `next.config.ts`

| From (old WordPress) | To |
|---|---|
| `/about-us` | `/about` |
| `/our-products` | `/products` |
| `/our-products/bottled-water-coolers` | `/products/bottled-water-coolers` |
| `/our-products/mains-fed-coolers` | `/products/mains-fed-coolers` |
| `/our-products/reverse-osmosis-and-purification-systems` | `/products/reverse-osmosis` |
| `/our-products/branded-water` | `/products/branded-water` |
| `/contact-us` | `/contact` |
| `/sitemap` | `/sitemap.xml` |

All permanent (308 in Next terms — set `permanent: true`).

### Navigation

Five items maximum: **Home · About · Products ▾ · Why Levati · Contact**, plus a
navy pill CTA reading **Free trial** on the right. Products is a dropdown on
`lg`+, an accordion inside the mobile sheet.

---

## 7. Page plans

### 7.1 Home

1. **Header** — transparent over the hero, gains white background and
   `shadow-nav` after 40px of scroll.
2. **Hero** — full-bleed `--grad-hero`. Heading stacks over three lines like the
   reference. Sub-line beneath. Two CTAs: `Book a free trial` (primary) and
   `See our products` (secondary, white outline). Right: cooler and bottle
   photography over the ripple graphic.
   - H1: `Pure water. Delivered.`
   - Sub: `Home and office water solutions across Johannesburg and Pretoria.`
3. **Stat bar** — thin strip directly under the hero, four items:
   `30+ years in the industry` · `7-stage reverse osmosis` · `Free maintenance on
   rentals` · `Jhb & Pretoria delivery`.
4. **About Levati** — `SplitFeature`, rounded image left, copy right, text link
   to `/about`.
5. **Our products** — `--color-surface` band. Four `ProductCard`s. Card anatomy
   matches the reference exactly: gradient image area on top, title, one-line
   descriptor, then a full-width navy button. Where the reference shows a price,
   Levati shows a category tag (`Rental or purchase`, `Installed`). Button reads
   `View details`.
6. **Why Levati** — four `FeatureCard`s, Lucide icons:
   - `Droplets` — Seven-stage purification, minerals added back
   - `Wrench` — Free maintenance and scheduled delivery on rentals
   - `Plug` — Plugs in anywhere, no plumbing needed
   - `ShieldCheck` — Keeps running through water cuts
7. **How it works** — three steps. This *is* a genuine sequence, so numbering is
   warranted here: Call or book online → Seven-day free trial → Install and set a
   delivery schedule.
8. **Free trial band** — full-width gradient. Heading, offer detail, phone as a
   `tel:` link.
9. **Testimonials + logo strip** — `TODO(client)`. Omit the section entirely
   until real ones arrive. Do not write placeholder quotes.
10. **Footer** — four columns: brand blurb, Products, Company, Contact. Bottom
    bar: copyright, Privacy, Sitemap.

### 7.2 About

Compact gradient hero with breadcrumb → founder story `SplitFeature`
→ `Timeline`: early 1990s UK market · 1996 returns to SA, founds Oaysis Water
· becomes Alpen Spa · 2001 absorbed into Nestlé Waters · Currie heads the Home &
Office division · partners with Happiness Mphake · Levati → values grid →
partner/distributor call-out card (the current site buries this recruitment
pitch in a paragraph; give it its own card) → `CTABand`.

Founder photos: `TODO(client)`.

### 7.3 Products overview

Compact hero → intro copy on the seven-stage RO process → four category cards
(2×2 at `md`, 4-up at `lg`) → `ComparisonTable` with rows for *Best for*,
*Installation*, *Plumbing required*, *Maintenance*, *Cost model* across Bottled /
Mains-fed / Reverse osmosis → `CTABand`.

### 7.4 Product detail — shared template ×4

Breadcrumbs → split hero (image left, H1 + description + two CTAs right) →
`SpecList` of features → variant cards → "Ideal for" chips → related products →
`FAQAccordion` (3–5 items) → `CTABand`.

**Bottled water coolers** — Clover coolers, supplied and rented. Cold/ambient and
hot/cold. Freestanding, under a square foot, SA plugs, minutes to set up,
drinkable water in 5–10 minutes. Variants: **B10A** hot and cold, **B10B** cold
and ambient. Features: purified water delivered to your door · prepaid water
options · free maintenance on rented coolers · free scheduled deliveries ·
versatile placement · no plumbing required · optional cup dispenser · rental or
purchase.

**Mains-fed coolers** — for gyms, factories, schools and large offices where
bottled water gets expensive. Features: easy installation · fixed usage cost ·
replacement filters · greener option · rental or purchase · optional cup
dispenser · free maintenance on rentals · RO systems can link to the cooler.

**Reverse osmosis** — under-counter with above-counter tap, or above-counter with
dedicated tap. Range: 5 and 7 stage RO systems · single, dual and triple stage
filter units including taps · mains connection filters · counter-top ambient
purification and dispensing units · replacement filters · installation and
ongoing maintenance.

**Branded water** — the one that breaks template. B2B marketing product, so:
mockup gallery → three-step process (send artwork → approve proof → delivery) →
minimum-order note, artwork charged at cost → `Request an artwork quote` form
instead of a trial CTA.

### 7.5 Free trial

Highest-value page on the site.

Hero stating the offer plainly: seven days free, complimentary 18.9 litre bottle,
complimentary 500ml retail bottle → three icon cards for what's included →
**booking form**:

```
Name*            Company (optional)
Email*           Phone*
Suburb*          Area* [Johannesburg | Pretoria | Elsewhere]
Cooler preference [Hot & cold | Cold & ambient | Not sure]
Message
[ ] I agree to Levati Water processing my details to respond to this
    enquiry. See the privacy notice.        ← unticked by default
```

Inline notice: the trial covers Johannesburg and Pretoria only. If `Area` is set
to *Elsewhere*, reveal a message directing them to `/contact` rather than
blocking submission — do not bounce an out-of-area lead.

### 7.6 Contact

Two columns: form left, contact card right. Card holds phone `0861 111 853`,
fax `0866 403 182`, email, WhatsApp button, service areas, hours.

Map only if the client supplies a physical address — otherwise a service-area
graphic. Flag to the client that `levati@mweb.co.za` should move to
`info@levatiwater.com` as part of this project; it hurts deliverability and
credibility.

### 7.7 FAQ / 404 / Thank you / Privacy

- **FAQ** — category-tabbed accordion, `FAQPage` JSON-LD.
- **404** — water-drop illustration, links to the four product pages.
- **Thank you** — confirmation, expected response time, `noindex`.
- **Privacy** — POPIA processing notice. Required. Names the information officer.

---

## 8. Forms

- Labels above fields, always. Never placeholder-only.
- Validate on blur, not on keystroke. Re-validate on change once a field has
  errored.
- Errors: `--color-error` text plus an `AlertCircle` icon, `aria-describedby`
  wiring the message to the input, `aria-invalid` on the field.
- Submit shows a spinner and disables. On success, route to `/thank-you`.
- Zod schema shared between client and the route handler. Never trust the client.
- Turnstile token verified server-side before Resend is called.
- Honeypot field as a second layer, visually hidden with `sr-only` — not
  `display: none`, which some bots detect.

---

## 9. SEO and structured data

Per page: unique `<title>`, meta description, canonical, OG and Twitter cards
with a generated 1200×630 image.

JSON-LD:
- `LocalBusiness` on Home — include `areaServed: ["Johannesburg", "Pretoria"]`,
  `telephone`, `priceRange`.
- `Product` on each product detail page.
- `FAQPage` on `/faq` and any page carrying an accordion.
- `BreadcrumbList` on all inner pages.

Generate `sitemap.xml` and `robots.txt` from the route tree.

Flag to the client: register a Google Business Profile. The existing site has no
local SEO presence at all, which is the single biggest commercial gap.

---

## 10. South Africa specifics

- **WhatsApp FAB** — `wa.me` link with a pre-filled message. In SA this will
  likely convert better than the contact form. Bottom-right, above the fold on
  mobile, does not overlap the footer CTA.
- **POPIA** — unticked consent checkbox, privacy page, named information officer.
- **Load shedding** — worth its own content block. Coolers keep working and
  water stays available. It is a real purchase driver locally.
- **Locale** — `en-ZA`, ZAR, `tel:+27861111853`.
- **Hosting** — Cloudflare Pages for the Johannesburg edge PoP.
- **Performance** — test throttled to Fast 3G. A meaningful share of SA mobile
  traffic is not on LTE.

---

## 11. Build order

Do not skip ahead. Each phase validates the one before it.

1. **Foundations** — repo, Tailwind token config, fonts, `Button` / `Container` /
   `Section` / `SectionHeading`, `Header` + `MobileNav` + `Footer`, responsive
   shell. Verify at 320px before moving on.
2. **Home** — all sections. This is the design system's proof.
3. **Product detail template** — build once, populate four times from the content
   in §7.4.
4. **About, Products overview, Contact, Free trial** — plus the route handler,
   Resend, Turnstile, `/thank-you`.
5. **FAQ, Privacy, 404, redirect map.**
6. **Polish** — axe audit, full keyboard pass, Lighthouse, real-device testing at
   320 / 375 / 768 / 1024 / 1440, cross-browser.
7. **Launch** — DNS, analytics, Search Console, submit sitemap, watch 404s for a
   fortnight.

---

## 12. Open questions for the client

Leave `TODO(client)` comments; do not invent answers.

1. Photography of the actual Clover B10A/B10B coolers, RO units, and the Levati
   bottle. The reference layout depends on clean product shots.
2. Vector logo (SVG).
3. Indicative pricing ("from R— per month") or enquiry-only?
4. Should retail bottled water eventually get real e-commerce? That changes the
   stack.
5. Founder photos, testimonials, client logos, certifications (SANS 241, SABS),
   B-BBEE level.
6. Physical address and trading hours.
