# Levati Water

A Next.js web app for Levati Water, a South African drinking-water company —
bottled water coolers, mains-fed coolers, reverse osmosis systems, and
branded retail water. Brochure-style site: no cart or checkout, just
rentals, installs, and free-trial bookings.

This repository is affiliated with [levatiwater.com](https://levatiwater.com).

## Running it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands: `npm run build` (production build), `npm run start` (serve
a production build), `npm run lint`, `npm run typecheck`.

> Don't run `npm run build` while `npm run dev` is running in the same
> folder — they write to the `.next` build cache at the same time and can
> corrupt it. If a page suddenly errors after doing that, stop the dev
> server, delete the `.next` folder, and restart.

## Configuring variables

Copy `.env.local.example` to `.env.local`. Every page runs and renders fine
with no variables set — they're only needed for the free-trial and contact
forms to verify a real submission and send an email.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (client-side widget) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key (server-side verification) |
| `RESEND_API_KEY` | Resend API key, for sending lead emails |
| `RESEND_FROM_EMAIL` | Sending address — its domain must be verified in Resend first |
| `LEADS_TO_EMAIL` | Where free-trial/contact form submissions are sent |
| `NEXT_PUBLIC_SITE_URL` | Site origin used in `sitemap.xml`/`robots.txt`; defaults to `https://levatiwater.com` if unset |

Until the Turnstile variables are set, the forms show "Turnstile is not
configured" and submission is disabled — that's expected, not a bug. Set
these on whichever platform hosts the site (its own environment-variable
settings), not just locally — `.env.local` never leaves your machine.
