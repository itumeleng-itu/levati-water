import type { Metadata } from "next";
import "./globals.css";
import { poppins, inter } from "./fonts";

export const metadata: Metadata = {
  title: "Levati Water",
  description: "Pure water. Delivered.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
