import type { NextConfig } from "next";

// Minimal config for the phase-1 smoke test. The full 301 redirect map
// (spec §6) and image format settings (IMAGES.md) land when the real pages
// are built — not needed to verify tokens/Button render correctly.
const nextConfig: NextConfig = {};

export default nextConfig;
