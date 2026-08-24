import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/og";
import { EXPERIENCES, SKILL_CATEGORIES } from "@/data/portfolioData";
import { PLATFORM_PROOF } from "@/content/proof";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { Avatar } from "@/components/Avatar";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Ali Ahson, AI systems and backend engineer in Islamabad, working with clients in Australia, the UK, the US and the Gulf. Background, full stack list and how the work has been delivered.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    images: [
      ogImage({
        eyebrow: "About",
        title: "I build the software that has to work around the AI",
      }),
    ],
  },
};

/** The two substantive roles. Earlier internship work is summarised, not itemised. */
const ROLES = EXPERIENCES.filter((role) => role.id === "cerecon" || role.id === "techquest");

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="I build the software that has to work around the AI"
        lede="Backend engineering and applied AI, for teams whose prototype has to become a product."
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-body-l text-muted">
              I am an engineer working at the point where backend systems meet applied AI:
              APIs and data models on one side, retrieval pipelines, model serving and
              agentic workflows on the other, and the deployment and identity work that
              decides whether either of them survives contact with real users.
            </p>
            <p className="mt-5 text-body-l text-muted">
              The work I enjoy most is taking something that was built quickly, under
              pressure, and turning it into software a team can maintain without holding
              its breath. That usually means less new code than people expect, and more
              attention to boundaries, contracts and measurement.
            </p>
            <p className="mt-5 text-body-l text-muted">
              This is a one-person practice. You work directly with the engineer doing the
              work, which means fast decisions and no account manager, but also a real
              ceiling on how much I can take on at once. If a project needs more than one
              engineer, I will say so at the first call rather than after the contract.
            </p>

            <div className="mt-10 rounded-card border border-hairline bg-porcelain p-6">
              <h2 className="text-h3">How the case-study work was delivered</h2>
              <p className="mt-3 text-body text-muted">
                The systems described under{" "}
                <Link href="/work" className="link-underline">
                  client results
                </Link>{" "}
                were built while employed: as lead engineer at an Australian engineering
                consultancy, and as an AI engineer at a product studio building for its own
                clients. They were not independent contracts, and I describe them as
                delivered work rather than as client engagements of this practice. The
                engineering, the decisions and the measurements are mine.
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-card border border-hairline p-6 sm:p-8">
              <Avatar size={96} />
              <p className="mt-5 font-display text-h3 text-ink">{site.name}</p>
              <p className="mt-1 text-body text-muted">{site.title}</p>

              <dl className="mt-6 space-y-4 border-t border-hairline pt-6">
                <div>
                  <dt className="font-mono text-caption uppercase text-slate">Based in</dt>
                  <dd className="mt-1 text-body text-ink">
                    {site.location} · {site.timezone}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-caption uppercase text-slate">
                    Working with
                  </dt>
                  <dd className="mt-1 text-body text-ink">
                    Clients in Australia, the UK, the US and the Gulf
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-caption uppercase text-slate">Education</dt>
                  <dd className="mt-1 text-body text-ink">
                    B.S. Computer Science, FAST-NUCES Islamabad
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 space-y-2 border-t border-hairline pt-6">
                {PLATFORM_PROOF.map((platform) => (
                  <li key={platform.label}>
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 text-small"
                    >
                      {platform.label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="light">
        <SectionHead
          eyebrow="Background"
          title="Where the experience comes from"
          lede="Two substantive roles, and the earlier work that preceded them."
        />

        <ol className="mt-10">
          {ROLES.map((role) => (
            <li key={role.id} className="grid gap-6 border-t border-hairline py-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-caption uppercase text-slate">{role.period}</p>
                <h3 className="mt-2 text-h3">{role.company}</h3>
                <p className="mt-1 text-small text-muted">{role.role}</p>
                <p className="mt-1 font-mono text-eyebrow text-slate">{role.location}</p>
              </div>
              <div className="lg:col-span-8">
                <p className="text-body text-muted">{role.description}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {role.technologies.map((tech) => (
                    <li key={tech} className="font-mono text-small text-slate">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="border-t border-hairline py-8">
            <p className="font-mono text-caption uppercase text-slate">2023 — 2024</p>
            <p className="mt-2 max-w-prose text-body text-muted">
              Earlier, as an intern: hospital receipt and document extraction pipelines
              using detection and OCR, and price prediction models and dashboards for
              banking decision support. That is where the healthcare and financial services
              exposure listed on the home page comes from, so it is worth naming plainly.
            </p>
          </li>
        </ol>
      </Section>

      <Section tone="light">
        <SectionHead
          eyebrow="Full stack list"
          title="Everything I actually work in"
          lede="The home page shows twelve. This is the rest, for the engineer on your team who wants to check."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.title} className="bg-card p-6">
              <h3 className="text-small font-medium text-ink">{category.title}</h3>
              <ul className="mt-3.5 flex flex-wrap gap-x-3 gap-y-1.5">
                {category.skills.map((skill) => (
                  <li key={skill} className="font-mono text-small text-muted">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
