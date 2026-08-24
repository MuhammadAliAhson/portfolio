import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Buttons are ink with porcelain text; secondary is a hairline outline with ink
 * text. There is deliberately no coloured CTA anywhere on the site — brass stays
 * an accent for text, rules, arrows and dots.
 */
type Variant = "primary" | "secondary" | "on-ink" | "on-ink-outline";

const VARIANTS: Record<Variant, string> = {
  primary: "border border-transparent bg-ink text-porcelain hover:bg-petrol",
  secondary: "border border-outline bg-transparent text-ink hover:border-ink hover:bg-card",
  "on-ink": "border border-transparent bg-porcelain text-ink hover:bg-on-dark",
  "on-ink-outline":
    "border border-hairline-dark bg-transparent text-on-dark hover:border-on-dark hover:text-porcelain",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  external,
  type,
  disabled,
  onClick,
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-card px-5 py-3 text-small font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    className
  );

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
