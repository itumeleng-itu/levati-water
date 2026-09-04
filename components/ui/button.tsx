import * as React from "react";
import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonAsButton = ButtonOwnProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  Omit<LinkProps, "href"> & { href: LinkProps["href"] };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 font-heading font-semibold text-button " +
  "whitespace-nowrap outline-none transition-[background-color,color,transform,box-shadow] " +
  "duration-[var(--dur-micro)] ease-[var(--ease-out)] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0 disabled:hover:shadow-none";

// Pill shape and size padding apply to primary/secondary/ghost only. `link`
// renders as an inline text link, not a button — spec §5 groups it with the
// other three variants but a pill-shaped "link" reads as a mislabelled
// secondary button in the reference layout, so it opts out of shape + size.
const shapeByVariant: Record<ButtonVariant, string> = {
  primary: "rounded-full",
  secondary: "rounded-full",
  ghost: "rounded-full",
  link: "rounded-none p-0",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-px hover:shadow-hover active:translate-y-0",
  secondary:
    "border-[1.5px] border-current bg-transparent text-navy-900 hover:bg-blue-50 hover:-translate-y-px active:translate-y-0",
  ghost: "bg-transparent text-navy-900 hover:bg-blue-50",
  link: "bg-transparent text-navy-900 underline-offset-4 hover:underline",
};

// Floors of 44px (sm) / 48px (lg) hold the touch-target minimum from spec §4
// regardless of content length or line-height rounding.
const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 py-2.5",
  md: "min-h-11 px-7 py-3.5",
  lg: "min-h-12 px-9 py-4",
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, ...props }, ref) {
    const classes = cn(
      base,
      shapeByVariant[variant],
      variant !== "link" && sizes[size],
      variants[variant],
      className
    );

    if (props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink;
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...rest}
        />
      );
    }

    const rest = props as ButtonAsButton;
    return <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...rest} />;
  }
);
