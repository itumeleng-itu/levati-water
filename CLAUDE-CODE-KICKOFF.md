# Getting started in Claude Code

## Setup

```bash
mkdir levati-water && cd levati-water
git init

# Drop these in:
#   CLAUDE.md
#   docs/BUILD-SPEC.md
#   docs/IMAGES.md
#   scripts/fetch-images.mjs
#   docs/reference/omi-mockup.jpg    ← save the reference image here

claude
```

Claude Code reads `CLAUDE.md` automatically at the start of every session, so the
project rules persist across context resets. Keep it updated as decisions land.

---

## Prompt 1 — scaffold and foundations

> Read `CLAUDE.md` and `docs/BUILD-SPEC.md` in full before doing anything.
>
> Scaffold a Next.js 15 App Router project with TypeScript strict mode, Tailwind
> CSS v4, and pnpm. Then build phase 1 from spec §11 only — do not start any
> pages yet:
>
> 1. Put every token from spec §1 into `app/globals.css` under `@theme`. No hex
>    values anywhere else in the codebase.
> 2. Wire Poppins and Inter via `next/font/google` per §2, and implement the
>    fluid type scale as Tailwind utilities.
> 3. Build `Container`, `Section`, `SectionHeading`, and `Button` with all four
>    variants and three sizes exactly as specified in §5.
> 4. Build `Header` with the scroll-triggered background change, `MobileNav` as
>    a shadcn Sheet with a focus trap and Esc-to-close, and `Footer` with the
>    responsive column behaviour from §4.
> 5. Add the full 301 redirect map from §6 to `next.config.ts`.
>
> Then show me the header and footer rendering at 320px, 768px and 1440px before
> you go further. Confirm there is no horizontal scroll at 320px.

## Prompt 2 — images

> Get a free Pexels key from https://www.pexels.com/api/, add it to
> `.env.local`, then run `node scripts/fetch-images.mjs` and report which slots
> succeeded. For any slot where the returned photo doesn't suit the brief,
> adjust its `pick` index or `query` in the manifest and re-fetch just that slot.

## Prompt 3 — the home page

> Build the home page per spec §7.1, all sections in order. Constraints:
>
> - Motion budget is §3, exhaustively. One orchestrated hero reveal on load, plus
>   interaction feedback. No scroll-triggered reveals on other sections.
> - Match the reference layout (`docs/reference/omi-mockup.jpg`) closely for the
>   hero, About split, and product card grid, but the cards are enquiry cards,
>   not shop cards. No prices, no cart, no Add to Cart.
> - Omit the testimonials section entirely and leave a `TODO(client)` comment. Do
>   not write placeholder quotes.
>
> When it's done, run a Lighthouse pass and an axe accessibility check, and show
> me the results alongside screenshots at 375px and 1440px.

## Prompt 4 — product template

> Build the shared product detail template from §7.4, then populate all four
> product pages using the content in the spec verbatim. The Branded Water page
> deviates from the template — follow its notes.

## Prompt 5 — forms

> Build `/free-trial` and `/contact` per §7.5 and §7.6, plus the shared form
> system from §8: React Hook Form, a Zod schema shared with the route handler,
> Resend for delivery, Cloudflare Turnstile verified server-side, and a
> `sr-only` honeypot. Include the POPIA consent checkbox, unticked by default.
> Then build `/thank-you` with `noindex`.

## Prompt 6 — remaining pages and polish

> Build `/about`, `/products`, `/faq`, `/privacy` and `/404` per §7. Then run
> phase 6 from §11: full axe audit, keyboard-only pass through every interactive
> element, Lighthouse on all pages, and screenshots at 320 / 375 / 768 / 1024 /
> 1440. Fix what fails and report what you changed.

---

## Guardrails to repeat if Claude Code drifts

Long builds drift. These are the four things worth restating:

1. "No cart, no checkout, no prices. This site books enquiries."
2. "Tokens only — no hex values outside `globals.css`."
3. "Motion budget is spec §3. Don't add scroll reveals."
4. "Don't invent testimonials, certifications, prices or client names. Leave
   `TODO(client)`."

## A note on scope

This is a six-phase build. Claude Code will handle each phase well, but asking
for the whole site in one prompt produces a worse result than six focused
prompts — you lose the chance to correct the design system before it propagates
into twelve pages.
