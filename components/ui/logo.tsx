import Image from "next/image";
import { cn } from "@/lib/utils";

// Intrinsic size of the source crop in public/brand — see that folder's
// origin: cropped from the client-supplied logo (Downloads/levati-removebg-preview.png),
// then recolored to solid navy-900 / white (alpha-preserving) so it matches
// the site's token palette rather than the source file's own blue-to-lavender
// gradient. Includes the "taste the difference." tagline.
//
// TODO(client): the original site's tagline was "Feel the Difference." —
// this logo (as supplied) reads "taste the difference." instead. Confirm
// which is correct before treating the new wording as final.
const WIDTH = 311;
const HEIGHT = 116;

const SRC = {
  navy: "/brand/logo-navy.png",
  // For the header's transparent-over-hero state and the navy footer, where
  // the navy variant would have no contrast against its own background.
  white: "/brand/logo-white.png",
} as const;

interface LogoProps {
  variant?: keyof typeof SRC;
  className?: string;
}

function Logo({ variant = "navy", className }: LogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt="Levati Water — taste the difference"
      width={WIDTH}
      height={HEIGHT}
      priority
      className={cn("h-9 w-auto lg:h-11", className)}
    />
  );
}

export { Logo };
