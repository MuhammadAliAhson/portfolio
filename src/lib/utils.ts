import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our font sizes are named
 * (`text-h2`, `text-body-l`, …), so without this it classifies them as text
 * *colour* utilities and silently drops one when a class list contains both —
 * which rendered on-ink headings at the inherited 16px instead of 32px.
 *
 * Teaching it the token names keeps `cn("text-h2", "text-porcelain")` intact.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "eyebrow",
            "caption",
            "small",
            "body",
            "body-l",
            "h3",
            "h2",
            "display-l",
            "display-xl",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
