import Image from "next/image";
import { cn } from "@/lib/utils";

// Intrinsic size of the source crop in public/brand — see that folder's
// origin: cropped from the client-supplied logo (Downloads/levati-removebg-preview.png).
const WIDTH = 311;
const HEIGHT = 88;

const SRC = {
  color: "/brand/logo-mark.png",
  // Alpha-preserving white recolor of the same crop, for the header's
  // transparent-over-hero state where the brand blues would wash out
  // against the hero's own blue gradient.
  white: "/brand/logo-mark-white.png",
} as const;

interface LogoProps {
  variant?: keyof typeof SRC;
  className?: string;
}

function Logo({ variant = "color", className }: LogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt="Levati Water"
      width={WIDTH}
      height={HEIGHT}
      priority
      className={cn("h-8 w-auto lg:h-9", className)}
    />
  );
}

export { Logo };
