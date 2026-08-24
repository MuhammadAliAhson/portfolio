import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CLIENT_DESCRIPTORS, PLATFORM_PROOF, TESTIMONIALS } from "@/content/proof";
import { CASE_STUDIES } from "@/content/work";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";

/**
 * The first thing after the hero, and the section that has to earn trust
 * fastest: a plain-English look at recent work, then what people who worked
 * with me say about it. No abstract metrics grid — just the projects and the
 * people, both animated in as you scroll.
 */
export function ProofBar() {
  return (
    <section aria-label="Proof" className="border-y border-hairline bg-card py-12 md:py-14">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="eyebrow">Recent work, in brief</p>
          <Link href="/work" className="link-action group">
            See every project
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group flex flex-col rounded-card border border-hairline bg-porcelain p-5 transition-colors hover:border-outline"
            >
              <p className="font-mono text-caption uppercase text-slate">{study.clientType}</p>
              <p className="mt-2 text-small font-medium leading-snug text-ink">{study.result}</p>
              <span className="mt-3 font-display text-h3 leading-none text-brass">
                {study.metric.value}
              </span>
              <span className="mt-1 text-caption text-slate">{study.metric.label}</span>
            </Link>
          ))}
        </RevealGroup>

        <div className="mt-10 hairline-t pt-8">
          <p className="eyebrow">What people I've worked with say</p>
          <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} compact />
            ))}
          </RevealGroup>
        </div>

        <div className="mt-8 hairline-t pt-6 md:flex md:items-start md:justify-between md:gap-10">
          <div>
            <p className="eyebrow">Delivered for</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-small text-muted">
              {CLIENT_DESCRIPTORS.map((descriptor) => (
                <li key={descriptor}>{descriptor}</li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-eyebrow text-slate">
              Industries, not logos. No client has approved being named.
            </p>
          </div>

          <div className="mt-8 shrink-0 md:mt-0">
            <p className="eyebrow">Check for yourself</p>
            <ul className="mt-3 space-y-1.5">
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
        </div>
      </Container>
    </section>
  );
}
