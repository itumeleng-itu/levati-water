import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.ComponentProps<"select"> {
  invalid?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-md border bg-white pl-3.5 pr-10 text-body text-ink-900 outline-none",
          "transition-colors duration-[var(--dur-micro)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
          invalid ? "border-error" : "border-line",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
        aria-hidden="true"
      />
    </div>
  );
});

export { Select };
