import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ogImage } from "@/lib/og";
import { CASE_STUDIES } from "@/content/work";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Client results",
  description:
    "Three systems and what changed for the business: same-day fee proposals, production AI throughput on one existing GPU, and better-grounded answers at lower token cost.",
  alternates: { canonical: "/work" },
  openGraph: {
    url: "/work",
    images: [
      ogImage({
        eyebrow: "Client results",
        title: "Three systems, and what changed for the business",
      }),
    ],
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client results"
        title="Three systems, and what changed for the business"
        lede="Every engagement below was covered by confidentiality terms. Industries are named rather than companies, and each figure says where it came from."
      />

      <Section tone="light">
        <RevealGroup as="ul" className="grid gap-4">
          {CASE_STUDIES.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group grid gap-6 rounded-card border border-hairline bg-card p-6 transition-colors hover:border-outline hover:bg-porcelain sm:p-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-8">
                  <p className="font-mono text-caption uppercase text-slate">
                    {study.clientType} · {study.industry}
                  </p>
                  <h2 className="mt-3 text-h2">{study.result}</h2>
                  <p className="mt-4 max-w-prose text-body text-muted">{study.title}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep">
                    Read the case study
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                <dl className="lg:col-span-4 lg:border-l lg:border-hairline lg:pl-10">
                  <dt className="font-mono text-caption uppercase text-slate">
                    {study.metric.label}
                  </dt>
                  <dd className="mt-1.5 font-display text-h2 text-brass">
                    {study.metric.value}
                  </dd>
                  <dt className="mt-5 font-mono text-caption uppercase text-slate">
                    Engagement
                  </dt>
                  <dd className="mt-1.5 text-small text-muted">{study.length}</dd>
                </dl>
              </Link>
            </li>
          ))}
        </RevealGroup>

        <p className="mt-8 max-w-prose text-small text-slate">
          Open-source work and public demos live on the{" "}
          <Link href="/insights" className="link-underline">
            insights page
          </Link>
          , framed as capability rather than as client engagements.
        </p>
      </Section>

      <Testimonials />
      <FinalCta />
    </>
  );
}
