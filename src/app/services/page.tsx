import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { ogImage } from "@/lib/og";
import { SERVICES } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookCall } from "@/components/ui/BookCall";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { Marked } from "@/components/ui/Marked";
import { PlainServiceCard } from "@/components/services/PlainServiceCard";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { EngagementModels, EngagementNote } from "@/components/EngagementModels";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Production readiness audits, codebase rescue, backend and API development, LLM and RAG systems, enterprise auth and deployment, and performance and cost work.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    images: [ogImage({ eyebrow: "Services", title: "Six ways I get brought in" })],
  },
};

/**
 * Three registers, in the order a buyer actually reads them.
 *
 * The hero states the problem in words anyone can follow. Section two explains
 * all six services with no engineering vocabulary at all, as cards, for the
 * person deciding whether to start a conversation. Section three repeats those
 * six in full technical depth, as text rather than cards, for the engineer or
 * CTO who will be asked to sanity-check the decision. Both registers bold the
 * words that carry the meaning, because most of this page is skimmed.
 */
export default function ServicesPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <header className="border-b border-hairline bg-porcelain pb-16 pt-12 md:pb-20 md:pt-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="min-w-0 lg:col-span-8">
              <p className="eyebrow">Services</p>

              {/* The hook: no jargon, and no claim about me. */}
              <p className="mt-6 max-w-measure font-display text-h3 text-brass-deep">
                Getting the demo working was the easy part.
              </p>

              {/* What I do, and who I do it for. */}
              <h1 className="expanded mt-4 max-w-4xl text-display-l">
                I help founders and small teams finish the AI product that stalled before
                launch
              </h1>

              {/* What it is worth to the business. */}
              <p className="lede mt-6 max-w-prose">
                <Marked
                  text="Six engagements, each scoped and priced on its own, and each aimed at a result you can point to: **quotes going out the same day**, **an AI bill that stops climbing**, **the security answers that unblock an enterprise sale**."
                  strongClassName="font-semibold text-ink"
                />
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <BookCall label="Book a 30-min call" />
                <Button href="#services-plain" variant="secondary">
                  See what each one does
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* A reader who already knows their problem should not have to scroll
                the whole page to find the matching service. */}
            <nav aria-label="Services" className="min-w-0 lg:col-span-4">
              <p className="eyebrow">Jump to</p>
              <ul className="mt-4 space-y-0">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <a
                      href={`#detail-${service.slug}`}
                      className="group flex items-baseline justify-between gap-3 border-t border-hairline py-2.5 text-small text-muted transition-colors hover:text-ink"
                    >
                      {service.name}
                      <ArrowDown
                        className="h-3.5 w-3.5 shrink-0 text-outline transition-colors group-hover:text-brass-deep"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </header>

      {/* ------------------------------------------- section two: non-technical */}
      <Section id="services-plain" tone="strip">
        <SectionHead
          eyebrow="In plain English"
          title="What I can do for you, without the jargon"
          lede="Six problems I get called about. Find the one that sounds like your situation — the technical version of all six is directly below."
        />

        <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <PlainServiceCard key={service.slug} service={service} index={i} />
          ))}
        </RevealGroup>
      </Section>

      {/* ----------------------------------------------- section three: technical */}
      <Section id="services-technical" tone="light">
        <SectionHead
          eyebrow="The technical detail"
          title="How each one actually works"
          lede="The same six services, for whoever on your side will be asked whether this is sound. Each includes the method, a measured result from past work, and the sequence the work runs in."
        />

        <div className="mt-14 space-y-14 md:space-y-20">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug}>
              <ServiceDetail service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------- commercials */}
      <Section tone="strip">
        <SectionHead
          eyebrow="Engagement"
          title="How the commercial side works"
          lede="Three shapes, and you can move between them as the work becomes clearer."
        />
        <div className="mt-10">
          <EngagementModels />
          <EngagementNote />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
