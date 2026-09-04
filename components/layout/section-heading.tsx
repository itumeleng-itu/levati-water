import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.ComponentProps<"div"> {
  heading: React.ReactNode;
  lead?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
  /** The short blue underline rule from spec §3. Defaults to the section's alignment. */
  rule?: boolean;
}

function SectionHeading({
  heading,
  lead,
  align = "center",
  as: Heading = "h2",
  rule,
  className,
  ...props
}: SectionHeadingProps) {
  const showRule = rule ?? align === "center";

  return (
    <div className={cn(align === "center" && "text-center", className)} {...props}>
      <Heading className="text-h2 font-heading font-bold text-ink-900">{heading}</Heading>
      {showRule && (
        <div
          aria-hidden="true"
          className={cn(
            "mt-4 h-[3px] w-12 rounded-full bg-blue-500",
            align === "center" && "mx-auto"
          )}
        />
      )}
      {lead && (
        <p className={cn("mt-4 text-lead text-ink-600", align === "center" && "mx-auto max-w-[var(--measure)]")}>
          {lead}
        </p>
      )}
    </div>
  );
}

export { SectionHeading };
