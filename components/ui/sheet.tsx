"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-ink-900/40",
        "data-[state=open]:animate-[sheet-overlay-in_var(--dur-panel)_var(--ease-out)]",
        // The static end-state classes matter as much as the animation: without
        // them the overlay snaps back to its default (visible, clickable) state
        // once the exit animation finishes, silently blocking the whole page.
        "data-[state=closed]:animate-[sheet-overlay-out_var(--dur-panel)_var(--ease-out)] data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0",
        className
      )}
      {...props}
    />
  );
}

interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Content> {
  side?: "left" | "right";
}

function SheetContent({ className, children, side = "right", ...props }: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          "fixed inset-y-0 z-50 flex h-dvh w-full flex-col bg-white shadow-hover outline-none",
          "max-w-sm border-line",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          // Same reasoning as SheetOverlay — static end-state classes so the
          // panel stays off-screen and non-interactive once the exit
          // animation ends, instead of snapping back to translate-x-0.
          side === "right"
            ? "data-[state=open]:animate-[sheet-slide-in-right_var(--dur-panel)_var(--ease-out)] data-[state=closed]:animate-[sheet-slide-out-right_var(--dur-panel)_var(--ease-out)] data-[state=closed]:pointer-events-none data-[state=closed]:translate-x-full"
            : "data-[state=open]:animate-[sheet-slide-in-left_var(--dur-panel)_var(--ease-out)] data-[state=closed]:animate-[sheet-slide-out-left_var(--dur-panel)_var(--ease-out)] data-[state=closed]:pointer-events-none data-[state=closed]:-translate-x-full",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          className={cn(
            "absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md",
            "text-ink-600 outline-none transition-colors duration-[var(--dur-micro)]",
            "hover:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
          )}
        >
          <X className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Close menu</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1 px-5 pb-4 pt-5", className)} {...props} />;
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      className={cn("text-h3 font-heading font-semibold text-ink-900", className)}
      {...props}
    />
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle };
