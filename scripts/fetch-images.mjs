#!/usr/bin/env node
/**
 * Downloads free-license stock photography for the Levati Water site.
 *
 * Source: Pexels. The Pexels licence permits free commercial use, no attribution
 * required, and allows modification. https://www.pexels.com/license/
 *
 * Why an API rather than a hardcoded URL list: hardcoded stock-photo IDs rot.
 * This queries live and takes the top landscape result per slot, so the build
 * never starts with broken images.
 *
 * Usage:
 *   1. Get a free key at https://www.pexels.com/api/  (instant, no card)
 *   2. echo 'PEXELS_API_KEY=your_key' >> .env.local
 *   3. node scripts/fetch-images.mjs
 *
 * Re-running overwrites. Pass --slot=hero-main to refresh a single image if you
 * don't like what came back.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images');
const API = 'https://api.pexels.com/v1/search';

// ---------------------------------------------------------------------------
// Slot manifest. `query` is what gets searched; `orientation` and `pick` control
// which result is taken. Bump `pick` if the top hit is wrong for the slot.
// ---------------------------------------------------------------------------
const SLOTS = [
  // --- Hero ---------------------------------------------------------------
  { slot: 'hero-main',        query: 'water splash blue clean',              orientation: 'landscape', pick: 0,
    alt: 'Clear water splashing against a pale blue background' },
  { slot: 'hero-ripple',      query: 'water ripple surface top view',        orientation: 'landscape', pick: 0,
    alt: 'Concentric ripples spreading across a still water surface' },

  // --- About --------------------------------------------------------------
  { slot: 'about-pouring',    query: 'pouring water into glass',             orientation: 'portrait',  pick: 0,
    alt: 'Water being poured into a clear drinking glass' },
  { slot: 'about-office',     query: 'modern office interior bright',        orientation: 'landscape', pick: 1,
    alt: 'A bright modern open-plan office' },

  // --- Products -----------------------------------------------------------
  { slot: 'product-cooler',   query: 'water dispenser cooler office',        orientation: 'portrait',  pick: 0,
    alt: 'A freestanding bottled water cooler' },
  { slot: 'product-bottle',   query: 'plastic water bottle white background',orientation: 'portrait',  pick: 0,
    alt: 'A clear bottle of purified drinking water' },
  { slot: 'product-tap',      query: 'kitchen tap running water sink',       orientation: 'landscape', pick: 0,
    alt: 'Water running from a modern kitchen tap' },
  { slot: 'product-filter',   query: 'water filter purification system',     orientation: 'landscape', pick: 0,
    alt: 'A water filtration and purification unit' },
  { slot: 'product-branded',  query: 'water bottles row label mockup',       orientation: 'landscape', pick: 0,
    alt: 'A row of labelled water bottles' },

  // --- Supporting ---------------------------------------------------------
  { slot: 'feature-drinking',  query: 'woman drinking water bottle',         orientation: 'landscape', pick: 0,
    alt: 'A person drinking water from a bottle' },
  { slot: 'feature-gym',       query: 'gym interior equipment',              orientation: 'landscape', pick: 0,
    alt: 'Interior of a fitness centre' },
  { slot: 'feature-warehouse', query: 'warehouse factory interior workers',  orientation: 'landscape', pick: 0,
    alt: 'A warehouse and distribution facility' },
  { slot: 'feature-delivery',  query: 'delivery van driver parcel',          orientation: 'landscape', pick: 0,
    alt: 'A delivery vehicle being loaded' },
  { slot: 'cta-droplet',       query: 'water drop macro blue',               orientation: 'landscape', pick: 0,
    alt: 'A single droplet falling into blue water' },
  { slot: 'texture-bubbles',   query: 'water bubbles underwater texture',    orientation: 'landscape', pick: 0,
    alt: 'Bubbles rising through clear water' },
];

// ---------------------------------------------------------------------------

const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error(
    '\nMissing PEXELS_API_KEY.\n' +
    'Get a free key at https://www.pexels.com/api/ then add it to .env.local\n'
  );
  process.exit(1);
}

const only = process.argv
  .find((a) => a.startsWith('--slot='))
  ?.split('=')[1];

const targets = only ? SLOTS.filter((s) => s.slot === only) : SLOTS;
if (!targets.length) {
  console.error(`No slot named "${only}". Check the manifest.`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });

const credits = [];
let failures = 0;

for (const { slot, query, orientation, pick, alt } of targets) {
  const dest = path.join(OUT_DIR, `${slot}.jpg`);

  if (!only && existsSync(dest)) {
    console.log(`  skip  ${slot} (already downloaded)`);
    continue;
  }

  try {
    const url =
      `${API}?query=${encodeURIComponent(query)}` +
      `&orientation=${orientation}&per_page=${pick + 5}&size=large`;

    const res = await fetch(url, { headers: { Authorization: key } });
    if (!res.ok) throw new Error(`Pexels responded ${res.status}`);

    const { photos } = await res.json();
    const photo = photos?.[pick];
    if (!photo) throw new Error(`no result at index ${pick} for "${query}"`);

    // `large2x` is 1880px wide — plenty of headroom for next/image to resize down.
    const img = await fetch(photo.src.large2x);
    if (!img.ok) throw new Error(`image fetch failed ${img.status}`);

    await writeFile(dest, Buffer.from(await img.arrayBuffer()));

    credits.push({
      slot,
      alt,
      query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      sourceUrl: photo.url,
      width: photo.width,
      height: photo.height,
    });

    console.log(`  ok    ${slot}.jpg  — ${photo.photographer}`);
    await new Promise((r) => setTimeout(r, 250)); // stay well under rate limit
  } catch (err) {
    failures++;
    console.error(`  FAIL  ${slot}: ${err.message}`);
  }
}

if (credits.length) {
  const manifestPath = path.join(OUT_DIR, 'credits.json');
  let existing = [];
  if (existsSync(manifestPath)) {
    const { readFile } = await import('node:fs/promises');
    existing = JSON.parse(await readFile(manifestPath, 'utf8'));
  }
  const merged = [
    ...existing.filter((e) => !credits.some((c) => c.slot === e.slot)),
    ...credits,
  ].sort((a, b) => a.slot.localeCompare(b.slot));

  await writeFile(manifestPath, JSON.stringify(merged, null, 2));
  console.log(`\nWrote ${merged.length} entries to public/images/credits.json`);
}

console.log(
  `\nDone. ${credits.length} downloaded, ${failures} failed.\n` +
  'Pexels licence: free for commercial use, no attribution required.\n' +
  'Credits are recorded anyway — good practice, and useful if a photo needs replacing.\n'
);

if (failures) process.exit(1);
