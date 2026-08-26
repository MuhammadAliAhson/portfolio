import { TESTIMONIALS, TESTIMONIAL_SUMMARY } from "@/content/proof";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { TestimonialCard } from "@/components/TestimonialCard";

/**
 * Renders nothing while TESTIMONIALS is empty. Cards for a testimonial whose
 * quote has not been confirmed yet render in a visibly "pending" state rather
 * than showing invented words — see the TODO in src/content/proof.ts.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section id="testimonials" tone="light">
      <SectionHead
        eyebrow="In their words"
        title="What people I've worked with say"
        lede={
          TESTIMONIAL_SUMMARY.average
            ? `${TESTIMONIAL_SUMMARY.average} out of 5 across ${TESTIMONIAL_SUMMARY.count} reviews, quoted as written.`
            : undefined
        }
      />
      <RevealGroup className="mt-10 grid gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </RevealGroup>
    </Section>
  );
}
