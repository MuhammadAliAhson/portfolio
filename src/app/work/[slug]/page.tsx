import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info } from "lucide-react";
import { ogImage } from "@/lib/og";
import { CASE_STUDIES, getCaseStudy } from "@/content/work";
import { getService } from "@/content/services";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { ArchitectureDiagram } from "@/components/diagrams";
import { FinalCta } from "@/components/FinalCta";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

/**
 * Next 16 hands route params to the page as a promise, so both this and the
 * component below have to await them. Reading `params.slug` synchronously
 * yields undefined, which sent every one of these pages to notFound().
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: `${study.result}. ${study.clientType}, ${study.length.toLowerCase()}.`,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      title: study.result,
      description: study.title,
      url: `/work/${study.slug}`,
      images: [
        ogImage({
          eyebrow: study.clientType,
          title: study.result,
          meta: `${study.metric.value} · ${study.metric.label}`,
        }),
      ],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const services = study.services
    .map((slug) => getService(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  return (
    <>
      {/* Business outcome first. */}
      <PageHeader
        eyebrow="Case study"
        title={study.result}
        lede={study.title}
        breadcrumb={{ href: "/work", label: "All case studies" }}
      >
        <dl className="mt-9 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Client type", value: study.clientType },
            { label: "Industry", value: study.industry },
            { label: "Engagement", value: study.length },
            { label: study.metric.label, value: study.metric.value },
          ].map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-caption uppercase text-slate">{item.label}</dt>
              <dd className="mt-1.5 text-body text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </PageHeader>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-h2">The problem</h2>
            <p className="mt-5 max-w-prose text-body-l text-muted">{study.problem}</p>

            <h2 className="mt-14 text-h2">What changed for the business</h2>
            <ul className="mt-6">
              {study.results.map((result) => (
                <li key={result} className="border-t border-hairline py-4 text-body text-ink">
                  {result}
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-hairline bg-porcelain p-6 sm:p-8">
              <p className="font-mono text-caption uppercase text-slate">
                {study.metric.label}
              </p>
              <p className="mt-2 font-display text-h2 leading-none text-brass">
                {study.metric.value}
              </p>
              <p className="mt-3 text-small text-muted">{study.metric.provenance}</p>

              <div className="mt-7 border-t border-hairline pt-6">
                <p className="font-mono text-caption uppercase text-slate">Stack</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {study.stack.map((item) => (
                    <li key={item} className="font-mono text-small text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-hairline pt-6">
                <p className="font-mono text-caption uppercase text-slate">
                  How it was delivered
                </p>
                <p className="mt-2.5 text-small leading-relaxed text-muted">{study.context}</p>
              </div>
            </div>

            <p className="mt-4 flex gap-2.5 rounded-card border border-hairline bg-card p-4 text-small text-slate">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate" aria-hidden="true" />
              {study.confidentiality}
            </p>
          </aside>
        </div>
      </Section>

      {/* Architecture below the outcome, in its own register. */}
      <Section tone="ink">
        <SectionHead
          eyebrow="Architecture"
          title="How the system fits together"
          lede="Generalised, with client-specific detail removed."
          onInk
        />
        <div className="mt-10">
          <ArchitectureDiagram name={study.diagram} />
        </div>

        <div className="mt-14 border-t border-hairline-dark pt-12">
          <h3 className="text-h3 text-porcelain">The engineering work</h3>
          <ul className="mt-6 grid gap-x-12 gap-y-4 md:grid-cols-2">
            {study.approach.map((item) => (
              <li key={item} className="flex gap-3 text-body text-on-dark/90">
                <span
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brass"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {services.length > 0 ? (
        <Section tone="light">
          <SectionHead eyebrow="Services used" title="If you need this kind of work" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-card border border-hairline bg-card p-6 transition-colors hover:border-outline"
                >
                  <span className="font-display text-h3 text-ink">{service.name}</span>
                  <span className="mt-2.5 text-small leading-relaxed text-muted">
                    {service.outcome}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep">
                    What this involves
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <FinalCta />
    </>
  );
}
