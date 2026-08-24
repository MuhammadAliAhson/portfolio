import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/content/work";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/diagrams";

/**
 * Business outcome first, architecture below it. The dark register is reserved
 * for this section and the diagrams, so the technical depth gets its own space.
 */
export function WorkPreview() {
  const [lead, ...rest] = CASE_STUDIES;

  return (
    <Section id="work" tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Client results"
          title="Three systems, and what changed for the business"
          lede="Every engagement below was covered by confidentiality terms, so industries are named rather than companies."
          onInk
        />
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-small font-medium text-brass"
        >
          All case studies
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Lead case study, with its architecture */}
      <Reveal className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <p className="font-mono text-caption uppercase text-brass">
            {lead.clientType} · {lead.length}
          </p>
          <h3 className="mt-4 text-h2 text-porcelain">{lead.result}</h3>
          <p className="mt-5 text-body text-on-dark/85">{lead.problem}</p>

          <dl className="mt-7 border-t border-hairline-dark pt-6">
            <dt className="font-mono text-caption uppercase text-on-dark/70">
              {lead.metric.label}
            </dt>
            <dd className="mt-1.5 font-display text-h2 text-brass">
              {lead.metric.value}
            </dd>
            <dd className="mt-1.5 font-mono text-eyebrow text-on-dark/70">
              {lead.metric.provenance}
            </dd>
          </dl>

          <Link
            href={`/work/${lead.slug}`}
            className="group mt-7 inline-flex items-center gap-1.5 text-small font-medium text-brass"
          >
            Read the case study
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <ArchitectureDiagram name={lead.diagram} />
        </div>
      </Reveal>

      {/* The other two, compact */}
      <RevealGroup className="mt-14 grid gap-4 border-t border-hairline-dark pt-14 md:grid-cols-2">
        {rest.map((study) => (
          <article key={study.slug}>
            <div className="flex h-full flex-col rounded-card border border-hairline-dark bg-petrol p-6 sm:p-7">
              <p className="font-mono text-caption uppercase text-brass">
                {study.clientType}
              </p>
              <h3 className="mt-3 text-h3 text-porcelain">{study.result}</h3>
              <p className="mt-3 text-small leading-relaxed text-on-dark/80">{study.title}</p>

              <div className="mt-auto pt-6">
                <p className="font-display text-h3 text-brass">
                  {study.metric.value}
                </p>
                <p className="mt-1 font-mono text-eyebrow text-on-dark/70">{study.metric.label}</p>
                <Link
                  href={`/work/${study.slug}`}
                  className="group mt-5 inline-flex items-center gap-1.5 text-small font-medium text-brass"
                >
                  Read the case study
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </RevealGroup>
    </Section>
  );
}
