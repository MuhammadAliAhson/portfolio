import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { Marked } from "@/components/ui/Marked";

/**
 * Section two of /services: the whole service with no engineering vocabulary in
 * it. The heading names the outcome rather than the discipline, the body bolds
 * the words a skimmer needs, and the symptom is quoted in the client's own
 * voice so a reader recognises themselves before they read anything else.
 *
 * The card is fully clickable through a stretched link on the heading, which
 * keeps one anchor for the whole surface. The jump link below it sits above
 * that overlay, so it stays separately clickable.
 */
export function PlainServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className="group relative flex h-full flex-col rounded-card border border-hairline bg-card p-6 transition-colors hover:border-outline focus-within:border-outline sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-eyebrow tracking-[0.14em] text-brass-deep">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-brass-deep transition-colors group-hover:border-brass group-hover:bg-brass/10"
        >
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>

      <h3 className="mt-4 text-h3 leading-tight">
        {/* after:absolute — the stretched-link pattern: one anchor, whole card. */}
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {service.plain.title}
        </Link>
      </h3>

      <p className="mt-3.5 text-small leading-relaxed text-muted">
        <Marked text={service.plain.body} />
      </p>

      <div className="mt-auto pt-6">
        <p className="hairline-t pt-4 text-small leading-relaxed text-slate">
          <span aria-hidden="true">“</span>
          {service.plain.when}
          <span aria-hidden="true">”</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-slate">
            {service.duration}
          </p>
          {/* relative: lifts this link above the stretched-link overlay. */}
          <Link
            href={`#detail-${service.slug}`}
            className="relative inline-flex items-center gap-1.5 text-small font-medium text-brass-deep transition-colors hover:text-ink"
          >
            Technical detail
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
