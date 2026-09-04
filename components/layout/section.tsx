import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  tone?: "default" | "surface";
}

function Section({ className, tone = "default", ...props }: SectionProps) {
  return (
    <section
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
