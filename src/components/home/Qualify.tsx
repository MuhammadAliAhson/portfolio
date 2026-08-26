import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/content/services";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";

/**
 * The client's situation in their words, kept to one row. Each card routes
 * straight to the matching service page, where the longer version of the
 * problem is spelled out — the home page no longer repeats the services grid,
 * so these four cards are how a visitor gets from a symptom to a service.
 */
const CARDS = [
  { slug: "production-readiness-audit", quote: "Our AI demo works. It breaks with real users." },
  { slug: "codebase-rescue", quote: "Nobody wants to touch our codebase." },
  { slug: "security-auth-deployment", quote: "We need enterprise auth before we can sell." },
  { slug: "performance-and-cost", quote: "Our LLM costs are climbing." },
];

export function Qualify() {
  return (
    <Section id="is-this-you" tone="light">
      <SectionHead
        eyebrow="Is this you?"
        title="Four conversations I have most often"
        lede="Pick the one that sounds like your week — each goes straight to how I'd fix it, what it costs and how long it takes."
      />

      <RevealGroup as="ul" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((card) => {
          const service = SERVICES.find((s) => s.slug === card.slug);
          if (!service) return null;
          return (
            <li key={card.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col justify-between rounded-card border border-hairline bg-card p-5 transition-colors hover:border-outline hover:bg-porcelain"
              >
                <p className="font-display text-h3 text-ink">
                  <span aria-hidden="true">“</span>
                  {card.quote}
                  <span aria-hidden="true">”</span>
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-brass-deep">
                  {service.name}
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
