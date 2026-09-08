# Levati Water

A rebuild of [levatiwater.com](https://levatiwater.com) — a South African drinking-water
company (bottled water coolers, mains-fed coolers, reverse osmosis systems, branded retail
water). Next.js 15 App Router site, brochure-style: no cart or checkout, just rentals,
installs, and free-trial bookings.

See [`CLAUDE.md`](./CLAUDE.md) for the project's non-negotiables (mobile-first, WCAG 2.2 AA,
motion budget, performance budget, POPIA, SEO redirects) and content rules (South African
English, no invented facts). See [`docs/BUILD-SPEC.md`](./docs/BUILD-SPEC.md) for the full
design system and page-by-page spec.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4 — tokens live in `app/globals.css`
- React Hook Form + Zod, posting to Next route handlers
- Resend (email) + Cloudflare Turnstile (spam protection)
- Radix UI primitives (Dialog, Accordion) for Sheet/Accordion — everything else hand-rolled

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in what you need — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

> Don't run `npm run build` while `npm run dev` is also pointed at the same `.next`
> directory — the two write to it concurrently and corrupt the build cache (surfaces as
> `ENOENT .next/server/app/page.js` or `__webpack_modules__[moduleId] is not a function`).
> If that happens: stop the dev server, `rm -rf .next`, restart.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in what you need. `.env.local` is
gitignored — never commit real keys.

| Variable | Required for | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | The free-trial and contact forms to render a working CAPTCHA | Without it, the form shows "Turnstile is not configured" **and submission is blocked** — Zod requires a non-empty token, which never gets set. Get both keys at [dash.cloudflare.com](https://dash.cloudflare.com/) → Turnstile. |
| `TURNSTILE_SECRET_KEY` | Server-side verification of that token | Same place as above. Without it, verification always fails even if the widget renders. |
| `RESEND_API_KEY` | Actually sending lead emails | [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Same | Domain must be verified in the Resend dashboard before mail sends |
| `LEADS_TO_EMAIL` | Same | Where free-trial/contact submissions land |
| `NEXT_PUBLIC_SITE_URL` | Correct URLs in `sitemap.xml` / `robots.txt` | Defaults to `https://levatiwater.com` if unset — see `lib/site.ts` |
| `PEXELS_API_KEY`, `LUMMI_API_KEY` | `scripts/fetch-images.mjs` only | Not used by the site itself; stock-photo sourcing scripts, largely superseded by client-supplied photography in `public/images/` |

**These aren't just dev-time niceties.** If you deploy without setting the Turnstile and
Resend variables on the hosting platform itself (its dashboard's environment variables —
`.env.local` never leaves your machine), the free-trial and contact forms will be broken
on the live site: visitors can fill them out, but submission fails every time.

## Deployment

`CLAUDE.md` targets Cloudflare Pages (the Johannesburg edge PoP matters for South African
traffic). In practice this project has also been deployed via Netlify — whichever platform
you use, set every environment variable above in its dashboard, not just locally.

## Project structure

```
app/            Routes (App Router) — one folder per page
components/     UI (ui/), layout (layout/), page sections (content/), forms (forms/)
lib/            Products/FAQ content, validation schemas, email sending, site config
docs/           BUILD-SPEC.md (design system + page specs), IMAGES.md
public/images/  Client-supplied photography — see READY_SLOTS in components/ui/image-placeholder.tsx
```

Product/FAQ copy in `lib/` is written to trace back to the client's original site content —
see the content rules in `CLAUDE.md` before adding or changing anything factual.
