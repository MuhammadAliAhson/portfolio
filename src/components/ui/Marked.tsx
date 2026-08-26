import { cn } from "@/lib/utils";

/**
 * Renders the `**bold**` spans inside a content string.
 *
 * Why a convention rather than JSX in the content files: the copy in
 * src/content is plain TypeScript, read and edited as prose, and it feeds the
 * capability PDF and OG images as well as the pages. Marking emphasis with two
 * asterisks keeps the content free of markup while letting the page bold the
 * words a skimming reader needs to land on. No other markdown is supported —
 * this is deliberately not a markdown renderer.
 */
export function Marked({
  text,
  className,
  strongClassName,
}: {
  text: string;
  className?: string;
  /** Override on the dark register, where `text-ink` would disappear. */
  strongClassName?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong
            key={i}
            className={cn("font-semibold text-ink", strongClassName)}
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}
