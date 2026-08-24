import { TESTIMONIALS } from "@/content/proof";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";

/**
 * Renders nothing while TESTIMONIALS is empty. An absent quote costs less trust
 * than an invented one. Add entries in src/content/proof.ts to switch this on.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section id="testimonials" tone="light">
      <SectionHead eyebrow="In their words" title="What clients say" />
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <article key={testimonial.name}>
            <figure className="flex h-full flex-col rounded-card border border-hairline bg-card p-6 sm:p-7">
              <blockquote className="text-body text-ink">{testimonial.quote}</blockquote>
              <figcaption className="mt-5 hairline-t pt-4 text-small">
                <span className="block font-medium text-ink">{testimonial.name}</span>
                <span className="block text-slate">
                  {testimonial.role}, {testimonial.company}
                </span>
              </figcaption>
            </figure>
          </article>
        ))}
      </RevealGroup>
    </Section>
  );
}
