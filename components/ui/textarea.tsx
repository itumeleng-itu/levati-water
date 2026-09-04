import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  invalid?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(
        "rounded-md border bg-white px-3.5 py-2.5 text-body text-ink-900 outline-none",
        "transition-colors duration-[var(--dur-micro)] placeholder:text-ink-400",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
        invalid ? "border-error" : "border-line",
        className
      )}
      {...props}
    />
  );
});

export { Textarea };
