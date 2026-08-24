import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/content/services";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";

export function ServicesGrid() {
  return (
    <Section id="services" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="Services"
          title="Six ways I get brought in"
          lede="Most engagements start with an audit, because it is the cheapest way to find out what the work actually is."
        />
        <Link
          href="/services"
          className="group inline-flex items-center gap-1.5 text-small font-medium text-brass-deep"
        >
          All services
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </RevealGroup>
    </Section>
  );
}
