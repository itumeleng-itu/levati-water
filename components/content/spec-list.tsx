import { Check } from "lucide-react";

function SpecList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-body text-ink-600">
          <Check className="mt-0.5 h-5 w-5 shrink-0 text-aqua-500" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export { SpecList };
