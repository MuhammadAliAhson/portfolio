import { Star } from "lucide-react";
import type { Testimonial } from "@/content/proof";
import { Avatar } from "@/components/Avatar";
import { cn } from "@/lib/utils";

/** Five dots/stars, filled up to `rating`. Renders nothing if rating is unset. */
export function Stars({ rating }: { rating?: number }) {
  if (!rating) return null;
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-brass text-brass" : "fill-none text-hairline"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * One review card. If the quote is still empty — a real quote has not been
 * confirmed yet — the card renders in a visibly draft state rather than
 * showing invented words next to a real person's name.
 */
export function TestimonialCard({
  testimonial,
  compact = false,
}: {
  testimonial: Testimonial;
  compact?: boolean;
}) {
  const pending = testimonial.quote.trim().length === 0;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-card border bg-card",
        compact ? "p-5" : "p-6 sm:p-7",
        pending ? "border-dashed border-outline" : "border-hairline"
      )}
    >
      {pending ? (
        <p className="font-mono text-eyebrow uppercase text-slate">Quote pending</p>
      ) : (
        <Stars rating={testimonial.rating} />
      )}

      <blockquote className={cn("mt-3 text-ink", compact ? "text-small" : "text-body")}>
        {pending ? (
          <span className="italic text-slate">
            Awaiting the exact wording from {testimonial.name.split(" ")[0]}.
          </span>
        ) : (
          testimonial.quote
        )}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 hairline-t pt-4">
        <Avatar size={36} />
        <span className="text-small">
          <span className="block font-medium text-ink">{testimonial.name}</span>
          <span className="block text-slate">{testimonial.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
