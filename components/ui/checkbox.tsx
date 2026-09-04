import * as React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
}

// Native checkbox styled via accent-color rather than a hand-built control —
// keeps full built-in keyboard/AT behaviour with no extra risk.
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, invalid, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-line accent-navy-900 outline-none",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
        invalid && "outline outline-2 outline-error",
        className
      )}
      {...props}
    />
  );
});

export { Checkbox };
