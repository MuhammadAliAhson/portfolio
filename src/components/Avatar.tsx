import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * TODO(headshot): drop a real photo at public/headshot.jpg and set this to
 * "/headshot.jpg". A one-person practice sells on the person, and an anonymous
 * site sells less — but a stock photo would be worse than the monogram below.
 */
const HEADSHOT: string | null = null;

export function Avatar({
  size = 88,
  className,
  onInk = false,
}: {
  size?: number;
  className?: string;
  onInk?: boolean;
}) {
  const initials = site.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  if (HEADSHOT) {
    return (
      <Image
        src={HEADSHOT}
        alt={`${site.name}, ${site.title}`}
        width={size}
        height={size}
        className={cn("rounded-full object-cover", className)}
        priority={false}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border font-display",
        onInk
          ? "border-hairline-dark bg-petrol text-on-dark"
          : "border-outline bg-card text-ink",
        className
      )}
    >
      <span style={{ fontSize: size * 0.32 }}>{initials}</span>
    </span>
  );
}
