import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/** Props to spread onto the actual input — wires aria-invalid/aria-describedby
 * to the FormField's error message without FormField needing to clone children. */
export function fieldA11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

// Labels always sit above the field (spec §8) — never placeholder-only.
function FormField({ id, label, error, required, hint, className, children }: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-small font-semibold text-ink-900">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && <p className="text-small text-ink-400">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-small text-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export { FormField };
