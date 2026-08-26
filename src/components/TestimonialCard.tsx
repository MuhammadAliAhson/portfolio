import { Star } from "lucide-react";
import type { Testimonial } from "@/content/proof";
import { cn } from "@/lib/utils";

/** Five stars, filled up to `rating`. Renders nothing if rating is unset. */
export function Stars({ rating, className }: { rating?: number; className?: string }) {
  if (!rating) return null;
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-brass text-brass" : "fill-none text-outline"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/**
 * Initials of the person who left the review — not mine. A mononym gives one
 * letter, which is correct rather than padded.
 */
function initialsOf(name: string) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * One review card.
 *
 * The reader is scanning for three things — did it go well, who says so, and
 * can I check — so the card puts the rating first, the words in the largest
 * type it can afford, and the person's name, country and source last. The
 * oversized quote mark is a brass *mark*, not a fill, which keeps the accent
 * rule intact.
 *
 * If the quote is still empty — a real quote has not been confirmed yet — the
 * card renders in a visibly draft state rather than showing invented words
 * next to a real person's name.
 */
export function TestimonialCard({
  testimonial,
  compact = false,
  surface = "card",
}: {
  testimonial: Testimonial;
  /** Tighter padding and one step smaller quote type, for the home page strip. */
  compact?: boolean;
  /** `porcelain` when the card sits on a white section and needs to separate from it. */
  surface?: "card" | "porcelain";
}) {
  const pending = testimonial.quote.trim().length === 0;
  const attribution =
    testimonial.source === "platform" ? `via ${testimonial.company}` : testimonial.company;

  return (
    <figure
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-card border transition-colors",
        surface === "porcelain" ? "bg-porcelain" : "bg-card",
        compact ? "p-5" : "p-6 sm:p-7",
        pending ? "border-dashed border-outline" : "border-hairline hover:border-outline"
      )}
    >
      {/* Decorative, and deliberately clipped by the card's own rounding. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-3 select-none font-display text-[6rem] leading-none text-brass/10"
      >
        &rdquo;
      </span>

      {pending ? (
        <p className="font-mono text-eyebrow uppercase tracking-[0.14em] text-slate">
          Quote pending
        </p>
      ) : (
        <Stars rating={testimonial.rating} />
      )}

      <blockquote
        className={cn(
          "relative mt-4 text-ink",
          compact ? "text-small leading-relaxed" : "text-body leading-relaxed"
        )}
      >
        {pending ? (
          <span className="italic text-slate">
            Awaiting the exact wording from {testimonial.name.split(" ")[0]}.
          </span>
        ) : (
          <>
            <span aria-hidden="true">“</span>
            {testimonial.quote}
            <span aria-hidden="true">”</span>
          </>
        )}
      </blockquote>

      {/* mt-auto: attribution sits on the card floor, so names line up across a
          row however unevenly the quotes above them run. */}
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span
          aria-hidden="true"
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hairline font-display text-caption text-brass-deep",
            surface === "porcelain" ? "bg-card" : "bg-porcelain"
          )}
        >
          {initialsOf(testimonial.name)}
        </span>
        <span className="min-w-0 text-small">
          <span className="block truncate font-medium text-ink">{testimonial.name}</span>
          <span className="block truncate text-caption text-slate">
            {testimonial.location} · {attribution}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
