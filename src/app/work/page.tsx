import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ogImage } from "@/lib/og";
import { CASE_STUDIES } from "@/content/work";
import { EXPERIMENTS } from "@/content/proof";
import { EXPERIENCES } from "@/data/portfolioData";
import { Container } from "@/components/ui/Container";
import { Marked } from "@/components/ui/Marked";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Every project: client engagements with scope and outcome, earlier internship work, and independent projects — each one labelled with the client or employer it was built for.",
  alternates: { canonical: "/work" },
  openGraph: {
    url: "/work",
    images: [
      ogImage({
        eyebrow: "Work",
        title: "Real clients, real constraints, numbers you can trace",
      }),
    ],
  },
};

/** Internships: real work, for a real employer, not an independent contract. */
const EARLIER_ROLES = EXPERIENCES.filter(
  (role) => role.id === "atomcamp" || role.id === "datainsight"
);

export default function WorkPage() {
  return (
    <>
      {/*
        This page's whole argument is that the evidence on it can be checked, so
        the headline makes that the claim rather than burying it in a caption.
        Deliberately not PageHeader: /work is a conversion page and earns the
        home page's strongest type scale, the way /services does.
      */}
      <header className="border-b border-hairline bg-porcelain pb-14 pt-12 md:pb-20 md:pt-16">
        <Container>
          <p className="eyebrow">Work</p>

          <h1 className="expanded mt-6 max-w-4xl text-display-xl">
            Real clients, real constraints, numbers you can trace
          </h1>

          <p className="lede mt-6 max-w-prose">
            <Marked
              text="**Nothing here is a mock-up.** Every project below is labelled with who it was built for, and every figure names the measurement behind it — because **a number you cannot check is only a claim**."
              strongClassName="font-semibold text-ink"
            />
          </p>
        </Container>
      </header>

      <Section tone="light">
        <SectionHead
          eyebrow="Client engagements"
          title="Systems built for a business outcome"
          lede="Covered by confidentiality terms, so industries are named rather than companies, and each figure says where it came from."
        />
        <RevealGroup as="ul" className="mt-10 grid gap-4">
          {CASE_STUDIES.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group grid gap-6 rounded-card border border-hairline bg-card p-6 transition-colors hover:border-outline hover:bg-porcelain sm:p-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-8">
                  <p className="font-mono text-caption uppercase text-slate">
                    Client: {study.clientType} · {study.industry}
                  </p>
                  <h3 className="mt-3 text-h2">{study.result}</h3>
                  <p className="mt-4 max-w-prose text-body text-muted">{study.title}</p>
                  <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                    {study.stack.map((tech) => (
                      <span key={tech} className="font-mono text-small text-slate">
                        {tech}
                      </span>
                    ))}
                  </p>
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
                    Scope
                  </dt>
                  <dd className="mt-1.5 text-small text-muted">{study.length}</dd>
                </dl>
              </Link>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="strip">
        <SectionHead
          eyebrow="Earlier work"
          title="Internships, before this practice existed"
          lede="Real work for a real employer — not independent contracts, so I label them plainly."
        />
        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
          {EARLIER_ROLES.map((role) => (
            <article
              key={role.id}
              className="flex h-full flex-col rounded-card border border-hairline bg-card p-6 sm:p-7"
            >
              <p className="font-mono text-caption uppercase text-slate">
                Employer: {role.company} · {role.period}
              </p>
              <h3 className="mt-3 text-h3">{role.role}</h3>
              <p className="mt-2.5 text-small leading-relaxed text-muted">{role.description}</p>
              <p className="mt-4 font-mono text-caption uppercase text-slate">
                Scope: {role.responsibilities[0]}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                {role.technologies.map((tech) => (
                  <li key={tech} className="font-mono text-small text-slate">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="light">
        <SectionHead
          eyebrow="Independent projects"
          title="Built on my own time, with no client"
          lede="Open-source experiments and public demos. Scope, stack and a live link where one exists."
        />
        <RevealGroup as="ul" className="mt-10 grid gap-4 md:grid-cols-2">
          {EXPERIMENTS.map((item) => (
            <li key={item.title}>
              <article className="flex h-full flex-col rounded-card border border-hairline bg-card p-6 sm:p-7">
                <p className="font-mono text-caption uppercase text-slate">
                  Client: none — independent project
                </p>
                <h3 className="mt-3 text-h3">{item.title}</h3>
                <p className="mt-2.5 text-small leading-relaxed text-muted">{item.hook}</p>
                <p className="mt-4 font-mono text-caption uppercase text-slate">Scope</p>
                <p className="mt-1.5 text-small leading-relaxed text-slate">{item.detail}</p>

                <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                  {item.tech.map((tech) => (
                    <li key={tech} className="font-mono text-small text-slate">
                      {tech}
                    </li>
                  ))}
                </ul>

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep"
                  >
                    {item.linkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <Testimonials />
      <FinalCta />
    </>
  );
}
