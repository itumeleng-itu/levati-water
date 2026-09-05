import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same mark as app/icon.tsx, scaled up for iOS home-screen bookmarks —
// Apple recommends 180x180 and expects a filled square, not a transparent
// circle, so this fills the canvas rather than centering a small badge.
export default function AppleIcon() {
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
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
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
