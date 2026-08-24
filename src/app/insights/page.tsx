import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/og";
import { formatPublished, getPosts } from "@/lib/medium";
import { EXPERIMENTS } from "@/content/proof";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Writing on the engineering behind AI systems, plus open-source models and live demos covering document extraction, detection, speech and domain fine-tuning.",
  alternates: { canonical: "/insights" },
  openGraph: {
    url: "/insights",
    images: [
      ogImage({
        eyebrow: "Insights",
        title: "Writing, models and things I have put in public",
      }),
    ],
  },
};

export default async function InsightsPage() {
  const posts = await getPosts(10);

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Writing, models and things I have put in public"
        lede="Notes on the engineering behind AI systems, and open work you can run yourself rather than take on trust."
      />

      <Section tone="light">
        <SectionHead eyebrow="Articles" title="Published writing" />

        {posts.length > 0 ? (
          <ul className="mt-8">
            {posts.map((post) => {
              const published = formatPublished(post.published);
              return (
                <li key={post.href} className="border-t border-hairline">
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5 transition-colors hover:bg-porcelain"
                  >
                    <span className="font-display text-h3 text-ink group-hover:text-brass-deep">
                      {post.title}
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-caption uppercase text-slate">
                      {published}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-body text-muted">
            The feed is unavailable right now.{" "}
            <a
              href={site.socials.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Read the posts on Medium
            </a>
            .
          </p>
        )}
      </Section>

      <Section tone="light">
        <SectionHead
          eyebrow="Open work"
          title="Experiments and open-source models"
          lede="Built on my own time, published openly. These are capability demonstrations, not client engagements."
        />

        <RevealGroup as="ul" className="mt-10 grid gap-4 md:grid-cols-2">
          {EXPERIMENTS.map((item) => (
            <li key={item.title}>
              <article className="flex h-full flex-col rounded-card border border-hairline bg-card p-6 sm:p-7">
                <h3 className="text-h3">{item.title}</h3>
                <p className="mt-2.5 text-body text-muted">{item.hook}</p>
                <p className="mt-4 text-small leading-relaxed text-slate">{item.detail}</p>

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

        <p className="mt-8 max-w-prose text-small text-slate">
          Accuracy figures on this page come from my own held-out test sets, not from
          published benchmarks. The medical model is an experiment and is not a medical
          device.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
