"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/content/proof";
import { TestimonialCard } from "@/components/TestimonialCard";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 3000;
/** Long enough for a smooth scroll to settle before we trust scroll events again. */
const SETTLE_MS = 700;
/** Sub-pixel layout noise, in px. Two offsets closer than this are the same stop. */
const EPSILON = 8;

/**
 * One row of reviews that advances itself every 3s and can also be driven by
 * hand — swipe, trackpad, drag, the arrows, the dots, or arrow keys once the
 * row has focus.
 *
 * Native scroll snapping does the moving, not a transform: the row stays a real
 * scroll container, so touch and trackpad gestures work with no gesture code,
 * and it degrades to a plain horizontally scrollable list if the JavaScript
 * never runs.
 *
 * Auto-advance yields to the reader. It stops while the pointer is over the row
 * or focus is inside it, and pauses for one full cycle after any manual scroll,
 * so it never pulls a review out from under someone mid-sentence. Under
 * `prefers-reduced-motion` it does not run at all.
 */
export function TestimonialCarousel({
  testimonials,
  surface = "card",
  compact = false,
  label = "Client reviews",
}: {
  testimonials: Testimonial[];
  surface?: "card" | "porcelain";
  compact?: boolean;
  label?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /**
   * Starts true, deliberately. The observer corrects it within a frame of
   * mounting, so an off-screen row still stops before its first 3s tick — but
   * if IntersectionObserver callbacks never arrive, the row keeps working
   * instead of freezing with no way to recover. Same fail-open reasoning as
   * components/ui/Reveal.tsx.
   */
  const [inView, setInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  /**
   * The scroll offsets the row can actually come to rest at.
   *
   * A card's own offset is not always reachable: showing three of four cards
   * leaves less than one card of travel, so the later cards' offsets sit past
   * the end of the scroll range. Every offset is therefore clamped to the
   * maximum and de-duplicated, which collapses the unreachable ones into a
   * single final stop. The result is the honest number of positions for the
   * current viewport — four on a phone, two or three on a wide screen — so the
   * dots cannot advertise a stop that does not exist.
   */
  const [stops, setStops] = useState<number[]>([0]);

  /**
   * The tick reads the current stop from a ref, not from state. Depending on
   * `index` would rebuild the interval on every advance, so the real cadence
   * would be 3s plus however long a render took, drifting a little each time.
   */
  const indexRef = useRef(0);

  /** Set while we are the ones scrolling, so our own scroll is not read as the reader's. */
  const programmatic = useRef(false);
  const settleTimer = useRef<number | undefined>(undefined);
  const lastManualScroll = useRef(0);

  const commitIndex = useCallback((next: number) => {
    indexRef.current = next;
    setIndex(next);
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const base = (track.children[0] as HTMLElement | undefined)?.offsetLeft ?? 0;

    const next: number[] = [];
    for (const child of Array.from(track.children) as HTMLElement[]) {
      const stop = Math.min(Math.max(0, child.offsetLeft - base), maxScroll);
      if (next.length === 0 || stop - next[next.length - 1] > EPSILON) next.push(stop);
    }

    const resolved = next.length > 0 ? next : [0];
    setStops((current) =>
      current.length === resolved.length && current.every((stop, i) => stop === resolved[i])
        ? current
        : resolved
    );
  }, []);

  const scrollToStop = useCallback(
    (next: number, list: number[]) => {
      const track = trackRef.current;
      const left = list[next];
      if (!track || left === undefined) return;

      programmatic.current = true;
      track.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
      commitIndex(next);

      // SETTLE_MS is the fallback. `scrollend` clears the flag the moment the
      // animation really ends; without it, a smooth scroll slower than the
      // timeout would have its own trailing events read as the reader taking
      // over, and auto-advance would stall for a cycle.
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        programmatic.current = false;
      }, SETTLE_MS);
    },
    [commitIndex, reduceMotion]
  );

  // Wraps in both directions, so neither arrow is ever a dead end.
  const step = useCallback(
    (delta: number) => {
      if (stops.length < 2) return;
      scrollToStop((index + delta + stops.length) % stops.length, stops);
    },
    [index, scrollToStop, stops]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Card widths are percentages, so every stop moves when the row resizes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure, testimonials.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !("onscrollend" in window)) return;

    const onScrollEnd = () => {
      window.clearTimeout(settleTimer.current);
      programmatic.current = false;
    };

    track.addEventListener("scrollend", onScrollEnd);
    return () => track.removeEventListener("scrollend", onScrollEnd);
  }, []);

  // Nothing should be advancing off-screen: it burns cycles, and a visitor who
  // scrolls down to the row would arrive at whatever card the timer happened to
  // reach rather than at the first review.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setInView(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Keep `index` honest when the reader scrolls the row themselves: whichever
  // stop sits closest to the current offset is the current one.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!programmatic.current) lastManualScroll.current = Date.now();

    let nearest = 0;
    let shortest = Number.POSITIVE_INFINITY;
    stops.forEach((stop, i) => {
      const distance = Math.abs(stop - track.scrollLeft);
      if (distance < shortest) {
        shortest = distance;
        nearest = i;
      }
    });

    if (indexRef.current !== nearest) commitIndex(nearest);
  }, [commitIndex, stops]);

  useEffect(() => {
    if (reduceMotion || paused || !inView || stops.length < 2) return;

    const id = window.setInterval(() => {
      // A manual scroll buys one full cycle of quiet.
      if (Date.now() - lastManualScroll.current < AUTO_ADVANCE_MS) return;
      scrollToStop((indexRef.current + 1) % stops.length, stops);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [inView, paused, reduceMotion, scrollToStop, stops]);

  // A resize can leave fewer stops than the one we were parked on.
  useEffect(() => {
    if (indexRef.current > stops.length - 1) commitIndex(stops.length - 1);
  }, [commitIndex, stops.length]);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/*
        snap-proximity, not mandatory: the later cards' snap points lie past the
        end of the scroll range whenever more than one card is visible, and
        mandatory snapping treats those as the only legal stops — which pins the
        row at zero and makes it unscrollable by any means. Proximity snaps
        gestures that land near a card and leaves clamped positions alone.

        The -mx-1/px-1 pair lets the cards' focus rings and hover borders breathe
        without insetting the row from the container edge.
      */}
      <ul
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label={`${label}, ${testimonials.length} items`}
        className="no-scrollbar -mx-1 flex snap-x snap-proximity gap-4 overflow-x-auto px-1 py-1"
      >
        {testimonials.map((testimonial, i) => (
          <li
            key={testimonial.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
            className="flex shrink-0 basis-[85%] snap-start sm:basis-[60%] md:basis-[46%] lg:basis-[38%]"
          >
            <TestimonialCard testimonial={testimonial} surface={surface} compact={compact} />
          </li>
        ))}
      </ul>

      {stops.length > 1 ? (
        <div className="mt-5 flex items-center justify-between gap-4">
          {/* Dots double as the position readout and as jump targets. */}
          <div className="flex items-center gap-2">
            {stops.map((stop, i) => (
              <button
                key={stop}
                type="button"
                onClick={() => scrollToStop(i, stops)}
                aria-label={`Show reviews, position ${i + 1} of ${stops.length}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-6 bg-brass" : "w-1.5 bg-outline hover:bg-slate"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CarouselButton label="Previous review" surface={surface} onClick={() => step(-1)}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </CarouselButton>
            <CarouselButton label="Next review" surface={surface} onClick={() => step(1)}>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </CarouselButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CarouselButton({
  label,
  surface,
  onClick,
  children,
}: {
  label: string;
  surface: "card" | "porcelain";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-brass-deep transition-colors hover:border-brass hover:bg-brass/10 hover:text-ink",
        surface === "porcelain" ? "bg-porcelain" : "bg-card"
      )}
    >
      {children}
    </button>
  );
}
