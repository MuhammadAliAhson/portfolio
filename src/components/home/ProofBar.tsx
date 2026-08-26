import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  CLIENT_DESCRIPTORS,
  PLATFORM_PROOF,
  TESTIMONIALS,
  TESTIMONIAL_SUMMARY,
} from "@/content/proof";
import { CASE_STUDIES } from "@/content/work";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";
import { Stars, TestimonialCard } from "@/components/TestimonialCard";

/**
 * The first thing after the hero, and the section that has to earn trust
 * fastest: a plain-English look at recent work, then what people who worked
 * with me say about it. No abstract metrics grid — just the projects and the
 * people, both animated in as you scroll.
 *
 * Each project card carries the whole story in the buyer's language — the
 * result, the problem behind it, what changed, and the number — so a reader who
 * never clicks through still knows what they would be hiring me to do. This is
 * the only place testimonials appear on the home page.
 */
export function ProofBar() {
  return (
    <section aria-label="Proof" className="border-y border-hairline bg-card py-12 md:py-14">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="min-w-0">
            <p className="eyebrow">Recent work, in brief</p>
            <p className="mt-2 max-w-measure text-body font-medium text-ink">
              What was going wrong, and what the client got back.
            </p>
          </div>
          <Link href="/work" className="link-action group shrink-0">
            See every project
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <RevealGroup className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group flex h-full flex-col rounded-card border border-hairline bg-porcelain p-5 transition-colors hover:border-outline hover:bg-card sm:p-6"
            >
              <p className="font-mono text-eyebrow uppercase tracking-[0.14em] text-slate">
                {study.clientType}
              </p>

              {/* The pitch. Everything under it exists to explain this line. */}
              <p className="mt-3 font-display text-h3 leading-tight text-ink">{study.result}</p>

              {/* Plain-English before and after, so a non-technical reader can
                  follow the card without opening the case study. */}
              <dl className="mt-5 space-y-3.5 hairline-t pt-5">
                <div>
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.14em] text-slate">
                    The problem
                  </dt>
                  <dd className="mt-1.5 text-small leading-relaxed text-muted">
                    {study.brief.pain}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-eyebrow uppercase tracking-[0.14em] text-brass-deep">
                    What changed
                  </dt>
                  <dd className="mt-1.5 text-small leading-relaxed text-ink">{study.brief.gain}</dd>
                </div>
              </dl>

              {/* mt-auto: the metric sits on the card floor, so the three cards
                  line up however long the copy above runs. */}
              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <div className="min-w-0">
                  <span className="block font-display text-h3 leading-none text-brass">
                    {study.metric.value}
                  </span>
                  <span className="mt-1.5 block text-caption text-slate">
                    {study.metric.label}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hairline text-brass-deep transition-colors group-hover:border-brass group-hover:bg-brass/10"
                >
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </RevealGroup>

        <div className="mt-12 hairline-t pt-10">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="min-w-0">
              <p className="eyebrow">What people I've worked with say</p>
              <p className="mt-2 max-w-measure text-body font-medium text-ink">
                Their words, not a summary of them.
              </p>
            </div>

            {/* The aggregate is the fastest read on the block, so it gets its own
                weight rather than being buried in the cards. */}
            {TESTIMONIAL_SUMMARY.average ? (
              <div className="flex items-center gap-3 rounded-full border border-hairline bg-porcelain px-4 py-2">
                <Stars rating={5} />
                <span className="text-small">
                  <span className="font-medium text-ink">{TESTIMONIAL_SUMMARY.average}</span>
                  <span className="text-slate">
                    {" "}
                    from {TESTIMONIAL_SUMMARY.count} reviews
                  </span>
                </span>
              </div>
            ) : null}
          </div>

          <RevealGroup className="mt-7 grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                compact
                surface="porcelain"
              />
            ))}
          </RevealGroup>

          {/* Says where each review came from, so the internal one is not passed
              off as independent client proof. */}
          <p className="mt-4 font-mono text-eyebrow leading-relaxed text-slate">
            Fiverr reviews are public on the platform. The Cerecon review is from inside the
            organisation I work in, not an independent client of this practice.
          </p>
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
