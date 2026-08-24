import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PRICE_BANDS } from "@/lib/site";
import { ENGAGEMENT_MODELS } from "@/content/process";
import { RevealGroup } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Publishes price bands when they are filled in, and scope ranges until then.
 * Either way a buyer can form an expectation without emailing first.
 */
export function EngagementModels({ compact = false }: { compact?: boolean }) {
  return (
    <RevealGroup className={cn("grid gap-4", compact ? "md:grid-cols-3" : "lg:grid-cols-3")}>
      {ENGAGEMENT_MODELS.map((model) => {
        const band = PRICE_BANDS.find((b) => b.id === model.id);
        return (
          <article key={model.id}>
            <div
              className={cn(
                "flex h-full flex-col rounded-card border bg-card p-6 sm:p-7",
                model.entry ? "border-brass" : "border-hairline"
              )}
            >
              {model.entry ? (
                <p className="mb-4 inline-flex w-fit rounded-full border border-brass/60 px-2.5 py-1 font-mono text-eyebrow uppercase text-brass-deep">
                  Start here
                </p>
              ) : null}

              <h3 className="text-h3">{model.name}</h3>
              <p className="mt-2.5 text-small leading-relaxed text-muted">{model.forWho}</p>

              <p className="mt-5 font-mono text-body text-ink">
                {band?.amount ?? model.shape}
              </p>
              {band?.amount ? (
                <p className="mt-1 font-mono text-eyebrow text-slate">{model.shape}</p>
              ) : null}

              <ul className="mt-5 space-y-2 hairline-t pt-5">
                {model.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-small text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
    </RevealGroup>
  );
}

export function EngagementNote() {
  const anyPriced = PRICE_BANDS.some((band) => band.amount);
  return (
    <p className="mt-6 text-small text-slate">
      {anyPriced
        ? "Figures are indicative. A fixed quote follows the first call, in writing, before any work starts."
        : "I quote in writing after the first call, once the scope is clear. The audit is deliberately small, so you can find out what the work is before committing to it."}{" "}
      <Link href="/process" className="link-underline">
        See the full terms
        <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </p>
  );
}
