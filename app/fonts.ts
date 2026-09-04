import { Inter, Poppins } from "next/font/google";

// Weights per spec §2 — ship 400/500/600/700 only.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

// Apply both variable classes on <html> or <body> in app/layout.tsx:
//   className={`${poppins.variable} ${inter.variable}`}
