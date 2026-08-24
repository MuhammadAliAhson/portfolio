"use client";

import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

/**
 * Booking is possible from any page in one click. Routes to the real scheduler
 * when site.bookingUrl is set, and to /contact until then — never to a dead link.
 */
export function BookCall({
  variant = "primary",
  className,
  label = "Book a call",
}: {
  variant?: "primary" | "secondary" | "on-ink";
  className?: string;
  label?: React.ReactNode;
}) {
  const href = site.bookingUrl ?? "/contact";
  return (
    <Button
      href={href}
      external={Boolean(site.bookingUrl)}
      variant={variant}
      className={cn("whitespace-nowrap", className)}
      onClick={() => track("book_a_call", { destination: site.bookingUrl ? "scheduler" : "contact" })}
    >
      {label}
    </Button>
  );
}
