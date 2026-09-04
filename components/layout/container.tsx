import { cn } from "@/lib/utils";

function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]", className)}
      {...props}
    />
  );
}

export { Container };
