import { cn } from "@/lib/utils";

/**
 * Concentric ripples, decreasing opacity outward — spec §5/IMAGES.md
 * explicitly calls for a hand-authored SVG here rather than a stock photo,
 * since a raster ripple wouldn't scale cleanly behind the hero.
 */
function Ripple({ className, ...props }: React.ComponentProps<"svg">) {
  const rings = [
    { rx: 90, ry: 60, opacity: 0.5 },
    { rx: 150, ry: 100, opacity: 0.38 },
    { rx: 210, ry: 140, opacity: 0.26 },
    { rx: 270, ry: 180, opacity: 0.16 },
    { rx: 330, ry: 220, opacity: 0.08 },
  ];

  return (
    <svg
      viewBox="0 0 700 500"
      aria-hidden="true"
      className={cn("text-blue-300", className)}
      {...props}
    >
      {rings.map((ring) => (
        <ellipse
          key={ring.rx}
          cx="350"
          cy="250"
          rx={ring.rx}
          ry={ring.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity={ring.opacity}
        />
      ))}
    </svg>
  );
}

export { Ripple };
