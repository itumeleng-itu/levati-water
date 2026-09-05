import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Navy-900 circle + a white droplet — the same palette as the primary button
// and nav pill, so the tab icon reads as part of the same brand rather than
// a generic placeholder. The droplet itself is a CSS-only teardrop (a square
// rotated 45deg with three square corners and one rounded one), not an SVG —
// ImageResponse renders via Satori, which supports this reliably; arbitrary
// inline SVG paths are not guaranteed to.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A2540",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            width: 15,
            height: 15,
            background: "#FFFFFF",
            borderRadius: "0 50% 50% 50%",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
