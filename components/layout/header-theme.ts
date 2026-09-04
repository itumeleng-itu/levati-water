// The fixed header reads the nearest ancestor's `data-header-theme` at its
// own scroll position and adopts that section's colour — see header.tsx.
// Sections opt in by setting this attribute (Section does it automatically
// from its `tone` prop; Hero, CTABand and Footer set it directly since they
// aren't built on Section).
export const HEADER_THEMES = {
  // --grad-hero runs light-to-medium blue throughout (§1) — white nav text
  // measures as low as 1.82:1 against it even behind a navy-900/25 overlay
  // (tried first; darkening the overlay enough to fix that would have
  // defeated its own see-through purpose). Navy-900 text holds 8–14:1
  // directly against the gradient, same fix as hero.tsx/compact-hero.tsx/
  // cta-band.tsx. The white/30 overlay now exists only to visually
  // separate the header bar from the hero behind it, not for contrast.
  overlay: { bg: "bg-white/30", text: "text-navy-900", shadow: false },
  white: { bg: "bg-white", text: "text-navy-900", shadow: true },
  surface: { bg: "bg-surface", text: "text-navy-900", shadow: true },
  navy: { bg: "bg-navy-900", text: "text-white", shadow: true },
} as const;

export type HeaderTheme = keyof typeof HEADER_THEMES;
