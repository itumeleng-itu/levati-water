// The fixed header reads the nearest ancestor's `data-header-theme` at its
// own scroll position and adopts that section's colour — see header.tsx.
// Sections opt in by setting this attribute (Section does it automatically
// from its `tone` prop; Hero, CTABand and Footer set it directly since they
// aren't built on Section).
export const HEADER_THEMES = {
  // Hero/CTABand's gradient runs light-to-medium blue, so white nav text sat
  // directly on it (truly transparent) had patchy contrast depending on
  // which part of the gradient was behind it. A tinted overlay keeps the
  // hero visible through the header while guaranteeing contrast everywhere.
  overlay: { bg: "bg-navy-900/25", text: "text-white", shadow: false },
  white: { bg: "bg-white", text: "text-navy-900", shadow: true },
  surface: { bg: "bg-surface", text: "text-navy-900", shadow: true },
  navy: { bg: "bg-navy-900", text: "text-white", shadow: true },
} as const;

export type HeaderTheme = keyof typeof HEADER_THEMES;
