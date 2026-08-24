"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type State = "static" | "hidden" | "shown";
type Tag = "div" | "li" | "ul" | "ol" | "dl" | "article" | "section";

/**
 * Scroll reveal, progressively enhanced.
 *
 * Content renders visible by default, so it is readable with no JavaScript, with
 * JavaScript still loading, or if the observer is unavailable. On mount, only
 * elements still below the fold switch to the hidden state and animate in, so
 * nothing the visitor can already see ever flashes out.
 *
 * Reduced motion and printing are handled in globals.css, which forces every
 * state back to visible.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<State>("static");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    // Already on screen: leave it alone rather than animating something the
    // visitor is looking at.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, state };
}

/** One element. Use RevealGroup for lists and grids. */
export function Reveal({
  children,
  className,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
}) {
  const { ref, state } = useReveal<HTMLElement>();

  return (
    <As ref={ref as never} className={cn("reveal", className)} data-reveal={state}>
      {children}
    </As>
  );
}

/**
 * One observer for a whole list or grid, with the stagger applied to direct
 * children in CSS. Cheaper than a client component per card, which matters on
 * pages carrying six or more of these.
 */
export function RevealGroup({
  children,
  className,
  as: As = "div",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  "aria-label"?: string;
  id?: string;
}) {
  const { ref, state } = useReveal<HTMLElement>();

  return (
    <As ref={ref as never} className={cn("reveal-group", className)} data-reveal={state} {...rest}>
      {children}
    </As>
  );
}
