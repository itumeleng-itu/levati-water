# Levati Water — Website Rebuild

## What this is

A rebuild of levatiwater.com, currently a dormant WordPress 3.6.1 brochure site
(last touched 2018). Levati Water is a South African drinking-water company:
bottled water coolers, mains-fed coolers, reverse osmosis systems, and branded
retail water. Directors: Trevor Currie and Happiness Mphake. Trading area for
the free trial is Johannesburg and Pretoria only.

**Read `docs/BUILD-SPEC.md` before writing any component.** It contains the full
design system, page plans, and responsive rules. Do not improvise tokens.

## Critical framing

The visual reference (`docs/reference/omi-mockup.jpg`) is an e-commerce layout
with prices and Add-to-Cart buttons. Levati **does not sell online**. It rents
coolers, installs systems, and books free trials.

- Keep the OMI *visual language* exactly: blue gradient hero, rounded cards,
  navy pill buttons, centred section headings with a short blue underline rule.
- Replace the *commercial mechanics*: no cart, no checkout, no prices unless the
  client supplies them. "Add to Cart" becomes "Book a free trial" or
  "Request a quote".

If you ever find yourself scaffolding a cart, stop. That is out of scope.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4, tokens as CSS custom properties in `app/globals.css`
- shadcn/ui for Dialog / Accordion / Sheet only — everything else hand-rolled
- React Hook Form + Zod, posting to a Next route handler, email via Resend
- Cloudflare Turnstile for spam (not reCAPTCHA)
- Lucide React for icons
- Deploy target: Cloudflare Pages (Johannesburg edge PoP matters for SA traffic)

## Non-negotiables

1. **Mobile-first.** Every component starts at 320px and scales up. No
   horizontal scroll at 320px — this is a hard QA gate.
2. **WCAG 2.2 AA.** Visible `:focus-visible` on every interactive element.
   Errors carry an icon and text, never colour alone.
3. **Motion budget.** One orchestrated hero reveal on page load. Hover/press
   feedback on interactive elements. Nothing else. No fade-up-on-scroll on every
   section — it reads as templated. All motion inside a
   `prefers-reduced-motion: no-preference` guard.
4. **Performance.** LCP < 2.0s, CLS < 0.1, JS < 120KB gzipped. Every `<Image>`
   gets explicit width/height. Hero image gets `priority`, everything else lazy.
5. **POPIA.** Explicit unticked consent checkbox on every form. `/privacy` page
   is required, not optional.
6. **Preserve SEO.** All old WordPress URLs must 301 to the new paths. The
   redirect map is in the spec.

## Content rules

- South African English. "Litre", "colour", "organisation".
- Phone links use `tel:+27861111853`. Display as `0861 111 853`.
- Do not invent certifications, testimonials, client names, awards, or B-BBEE
  levels. If the client hasn't supplied it, leave a `TODO(client)` comment and
  omit the section rather than filling it with plausible fiction.
- Do not invent prices. Use "Request a quote" until told otherwise.

## Commands

```bash
pnpm dev            # local dev
pnpm build          # production build
pnpm lint           # eslint + prettier check
pnpm typecheck      # tsc --noEmit
```

## Build order

Follow `docs/BUILD-SPEC.md` §11. Do not jump ahead to page 4 before the design
system and the home page validate it.
