import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";
import { Marked } from "@/components/ui/Marked";

/**
 * Section three of /services: the same six services for the reader who wants
 * the engineering, set as text rather than cards.
 *
 * No boxes here on purpose — the section above is already a grid of cards, and
 * repeating that form would flatten the difference between the two registers.
 * Structure comes from hairlines, a mono index, and a two-column split: prose
 * and proof on the left, the process on the right. Bold carries the skim.
 */
export function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const proof = CASE_STUDIES.filter((study) => service.relatedWork.includes(study.slug));

  return (
    <article id={`detail-${service.slug}`} className="scroll-mt-28 hairline-t pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <div className="flex min-w-0 items-baseline gap-4">
          <span className="font-mono text-caption text-brass-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-h2">{service.name}</h3>
        </div>
        <p className="font-mono text-eyebrow uppercase tracking-[0.1em] text-slate">
          {service.duration} · {service.engagement}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-7">
          {service.overview.map((paragraph) => (
            <p key={paragraph} className="mt-4 max-w-prose text-body leading-relaxed text-muted first:mt-0">
              <Marked text={paragraph} />
            </p>
          ))}

          <div className="mt-7 hairline-t pt-5">
            <p className="eyebrow">What is delivered</p>
            <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-2.5 text-small leading-relaxed text-muted">
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brass"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {proof.length > 0 ? (
            <div className="mt-6 hairline-t pt-5">
              <p className="eyebrow">Proven on</p>
              <ul className="mt-3 space-y-3">
                {proof.map((study) => (
                  <li key={study.slug}>
                    <Link href={`/work/${study.slug}`} className="group flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-display text-h3 leading-none text-brass">
                        {study.metric.value}
                      </span>
                      <span className="text-small text-muted">
                        {study.metric.label} — {study.clientType}
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 text-brass-deep transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow">How it runs</p>
          <ol className="mt-3">
            {service.steps.map((step, i) => (
              <li
                key={step.name}
                className="flex gap-4 border-t border-hairline py-3.5 first:border-t-0 first:pt-0"
              >
                <span className="mt-0.5 font-mono text-caption text-slate">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-small font-semibold text-ink">{step.name}</p>
                  <p className="mt-1 text-small leading-relaxed text-muted">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <Link href={`/services/${service.slug}`} className="link-action group mt-6">
            Full scope, and what you receive
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
