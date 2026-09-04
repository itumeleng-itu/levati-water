import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  invalid?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 rounded-md border bg-white px-3.5 text-body text-ink-900 outline-none",
        "transition-colors duration-[var(--dur-micro)] placeholder:text-ink-400",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2",
        invalid ? "border-error" : "border-line",
        className
      )}
      {...props}
    />
  );
});

export { Input };
