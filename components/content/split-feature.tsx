import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

interface SplitFeatureProps {
  imageSlot: string;
  heading: string;
  children: React.ReactNode;
  linkHref?: string;
  linkLabel?: string;
  reverse?: boolean;
}

function SplitFeature({ imageSlot, heading, children, linkHref, linkLabel, reverse }: SplitFeatureProps) {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12 lg:gap-16">
      <div className={cn("w-full md:basis-2/5 lg:basis-[42%]", reverse && "md:order-2")}>
        <ImagePlaceholder slot={imageSlot} className="aspect-[4/5] w-full rounded-xl" />
      </div>
      <div className={cn("w-full md:basis-3/5 lg:basis-[58%]", reverse && "md:order-1")}>
        <h2 className="text-h2 font-heading font-bold text-ink-900">{heading}</h2>
        <div className="mt-4 max-w-[var(--measure)] text-body text-ink-600">{children}</div>
        {linkHref && linkLabel && (
          <Link
            href={linkHref}
            className="mt-6 inline-flex items-center gap-1.5 text-body font-semibold text-blue-700 outline-none transition-colors duration-[var(--dur-micro)] hover:text-navy-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
          >
            {linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}

export { SplitFeature };
