import type { Metadata } from "next";
import "./globals.css";
import { poppins, inter } from "./fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Levati Water",
  description: "Pure water. Delivered.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <Header />
        {/* Offsets the fixed header — see components/layout/header.tsx. */}
        <div className="h-16 lg:h-20" aria-hidden="true" />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
