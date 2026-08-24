import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { formatPublished, getPosts } from "@/lib/medium";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";

export async function Insights() {
  const posts = await getPosts(3);

  return (
    <Section id="insights" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Insights"
          title="What I have been writing about"
          lede="Notes on the engineering behind AI systems, published as I go."
        />
        <a
          href={site.socials.medium}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-small font-medium text-brass-deep"
        >
          All writing
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {posts.length > 0 ? (
        <RevealGroup as="ul" className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-3">
          {posts.map((post) => {
            const published = formatPublished(post.published);
            return (
              <li key={post.href} className="bg-card">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-porcelain"
                >
                  {published ? (
                    <span className="font-mono text-eyebrow uppercase tracking-[0.06em] text-slate">
                      {published}
                    </span>
                  ) : null}
                  <span className="mt-3 font-display text-h3 text-ink">{post.title}</span>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep">
                    Read on Medium
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </RevealGroup>
      ) : (
        <p className="mt-8 text-small text-slate">
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
  );
}
