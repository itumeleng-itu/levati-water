import { cn } from "@/lib/utils";
import type { HeaderTheme } from "./header-theme";

interface SectionProps extends React.ComponentProps<"section"> {
  tone?: "default" | "surface";
  /** Which colour the fixed header adopts while this section sits behind it.
   * Defaults from `tone` — override for a section with a non-standard
   * background (a gradient band, for instance). */
  headerTheme?: HeaderTheme;
}

function Section({ className, tone = "default", headerTheme, ...props }: SectionProps) {
  return (
    <section
      data-header-theme={headerTheme ?? (tone === "surface" ? "surface" : "white")}
      className={cn(
        "py-[var(--section-py)]",
        tone === "surface" && "bg-surface",
        className
      )}
      {...props}
    />
  );
}

export { Section };
