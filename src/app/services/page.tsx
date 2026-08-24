import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { SERVICES } from "@/content/services";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
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

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Six ways I get brought in"
        lede="Each one is scoped, priced and delivered on its own. Most clients start with the audit, because it is the cheapest way to find out what the work actually is."
      />

      <Section tone="light">
        <h2 className="sr-only">The services</h2>
        <RevealGroup className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </RevealGroup>
      </Section>

      <Section tone="light">
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
