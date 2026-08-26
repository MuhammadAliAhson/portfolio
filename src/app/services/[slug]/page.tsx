import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ogImage } from "@/lib/og";
import { SERVICES, getService } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Marked } from "@/components/ui/Marked";
import { FinalCta } from "@/components/FinalCta";
import { DepthMarker } from "@/components/Tracked";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
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
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.seo.title} — ${service.seo.phrase}`,
      description: service.seo.description,
      url: `/services/${service.slug}`,
      images: [
        ogImage({ eyebrow: "Service", title: service.name, meta: service.duration }),
      ],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = CASE_STUDIES.filter((study) => service.relatedWork.includes(study.slug));
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.name}
        lede={service.outcome}
        breadcrumb={{ href: "/services", label: "All services" }}
      >
        <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="font-mono text-caption uppercase text-slate">
              Typical duration
            </dt>
            <dd className="mt-1 text-body-l text-ink">{service.duration}</dd>
          </div>
          <div>
            <dt className="font-mono text-caption uppercase text-slate">Engagement</dt>
            <dd className="mt-1 text-body-l text-ink">{service.engagement}</dd>
          </div>
        </dl>
      </PageHeader>

      <Section tone="strip">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-h2">Why this matters to you</h2>
            {service.benefit.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-prose text-body-l text-ink">
                <Marked text={paragraph} />
              </p>
            ))}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-hairline bg-porcelain p-6 sm:p-8">
              <h3 className="text-h3">This is for you if</h3>
              <ul className="mt-5 space-y-3">
                {service.signals.map((signal) => (
                  <li key={signal} className="flex gap-3 text-small leading-relaxed text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass"
                      aria-hidden="true"
                    />
                    “{signal}”
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-h2">Why this comes up</h2>
            {service.overview.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-prose text-body-l text-muted">
                <Marked text={paragraph} />
              </p>
            ))}

            <h2 className="mt-14 text-h2">How it runs</h2>
            <ol className="mt-6">
              {service.steps.map((step, i) => (
                <li key={step.name} className="flex gap-5 border-t border-hairline py-5">
                  <span className="font-mono text-caption text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-h3">{step.name}</h3>
                    <p className="mt-1.5 max-w-prose text-body text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-hairline bg-porcelain p-6 sm:p-8">
              <h2 className="text-h3">What you receive</h2>
              <ul className="mt-5 space-y-3">
                {service.youReceive.map((item) => (
                  <li key={item} className="flex gap-3 text-small leading-relaxed text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass-deep" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 border-t border-hairline pt-6">
                <h3 className="text-small font-medium text-ink">What this is not</h3>
                <p className="mt-2.5 text-small leading-relaxed text-muted">{service.notFor}</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="light">
          <SectionHead
            eyebrow="Related work"
            title="Where this has been delivered"
          />
          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
            {related.map((study) => (
              <article key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group flex h-full flex-col rounded-card border border-hairline bg-card p-6 transition-colors hover:border-outline sm:p-7"
                >
                  <p className="font-mono text-caption uppercase text-slate">
                    {study.clientType}
                  </p>
                  <h3 className="mt-3 text-h3">{study.result}</h3>
                  <p className="mt-3 text-small text-muted">{study.title}</p>
                  <span className="link-action mt-6">
                    Read the case study
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </article>
            ))}
          </RevealGroup>
        </Section>
      ) : null}

      <Section tone="light">
        <SectionHead eyebrow="Other services" title="Often needed alongside this" />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/services/${other.slug}`}
                className="group flex h-full flex-col rounded-card border border-hairline bg-card p-6 transition-colors hover:border-outline"
              >
                <span className="font-display text-h3 text-ink">{other.name}</span>
                <span className="mt-2.5 text-small leading-relaxed text-muted">
                  {other.outcome}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep">
                  Read more
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

      <DepthMarker slug={service.slug} />
      <FinalCta />
    </>
  );
}
