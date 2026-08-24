import { cn } from "@/lib/utils";
import { Container } from "./Container";

/**
 * `light` is the porcelain page surface and the default. `strip` is the white
 * card surface, for metric strips that should read as a band. `ink` is the dark
 * register, which the design system reserves for exactly three things: case
 * studies, architecture diagrams and the final CTA — nothing else.
 */
type Tone = "light" | "strip" | "ink";

const TONES: Record<Tone, string> = {
  light: "bg-porcelain",
  strip: "bg-card",
  ink: "on-ink bg-ink text-on-dark",
};

export function Section({
  id,
  tone = "light",
  className,
  children,
  as: As = "section",
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div";
}) {
  return (
    <As id={id} className={cn("py-section md:py-section-lg", TONES[tone], className)}>
      <Container>{children}</Container>
    </As>
  );
}

/** Section header: one eyebrow, one heading, at most one line of body copy. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  onInk = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <header className={cn("max-w-prose", className)}>
      {eyebrow ? (
        <p className={cn(onInk ? "eyebrow-dark" : "eyebrow", "mb-5")}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("text-h2", onInk && "text-porcelain")}>{title}</h2>
      {lede ? (
        <p className={cn("mt-4 max-w-prose text-body-l", onInk ? "text-on-dark/85" : "text-muted")}>
          {lede}
        </p>
      ) : null}
    </header>
  );
}
