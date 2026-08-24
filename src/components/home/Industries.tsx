import { INDUSTRIES, TECH_STRIP } from "@/content/proof";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";

export function Industries() {
  return (
    <Section id="industries" tone="light">
      <SectionHead
        eyebrow="Industries"
        title="Where this work has already been done"
        lede="Domains I have shipped in, so the first two weeks are not spent learning your vocabulary."
      />

      <RevealGroup as="dl" className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((industry) => (
          <div key={industry.name} className="bg-card p-6">
            <dt className="text-h3 text-ink">{industry.name}</dt>
            <dd className="mt-2.5 text-small leading-relaxed text-muted">{industry.detail}</dd>
          </div>
        ))}
      </RevealGroup>
    </Section>
  );
}

export function TechStrip() {
  return (
    <section aria-label="Technology" className="border-t border-hairline py-12">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <p className="eyebrow">Built with</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5">
          {TECH_STRIP.map((tech) => (
            <li key={tech} className="font-mono text-small text-muted">
              {tech}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-eyebrow text-slate">
          The full stack list is on the about page.
        </p>
      </div>
    </section>
  );
}
