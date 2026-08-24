import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/content/services";

/** One card: outcome, three deliverables, duration, engagement shape, link. */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex h-full flex-col rounded-card border border-hairline bg-card p-6 sm:p-7">
      <h3 className="text-h3">
        <Link href={`/services/${service.slug}`} className="hover:text-ink">
          {service.name}
        </Link>
      </h3>
      <p className="mt-3 text-small leading-relaxed text-muted">{service.outcome}</p>

      <ul className="mt-5 space-y-2">
        {service.deliverables.map((item) => (
          <li key={item} className="flex gap-2.5 text-small text-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <dl className="mt-6 hairline-t pt-4 font-mono text-eyebrow uppercase tracking-[0.06em] text-slate">
        <div className="flex justify-between gap-4 py-0.5">
          <dt>Typical duration</dt>
          <dd className="text-ink">{service.duration}</dd>
        </div>
        <div className="flex justify-between gap-4 py-0.5">
          <dt>Engagement</dt>
          <dd className="text-right text-ink">{service.engagement}</dd>
        </div>
      </dl>

      <Link
        href={`/services/${service.slug}`}
        className="group mt-5 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep"
      >
        What this involves
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
