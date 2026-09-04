import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

function FeatureCard({ icon: Icon, title, children }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-start rounded-lg border border-line bg-white p-6 shadow-card">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-aqua-500">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-h3 font-heading font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-body text-ink-600">{children}</p>
    </div>
  );
}

export { FeatureCard };
