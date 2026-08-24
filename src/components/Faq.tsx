import Link from "next/link";
import { FAQ } from "@/content/faq";
import { Section, SectionHead } from "@/components/ui/Section";

export function Faq({
  tone = "light",
  limit,
}: {
  tone?: "light" | "strip";
  /** Home shows a subset; the full list lives on /process. */
  limit?: number;
}) {
  const items = limit ? FAQ.slice(0, limit) : FAQ;

  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHead
            eyebrow="Questions"
            title="The things buyers ask before they sign"
            lede="Including the ones about what I will not do."
          />
        </div>

        <div className="lg:col-span-8">
          <dl>
            {items.map((item) => (
              <div key={item.question} className="border-t border-hairline py-6 first:border-t-0 first:pt-0">
                <dt className="text-h3">{item.question}</dt>
                <dd className="mt-2.5 max-w-prose text-body text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
          {limit && FAQ.length > limit ? (
            <p className="border-t border-hairline pt-6">
              <Link href="/process#faq" className="link-underline text-small font-medium">
                {FAQ.length - limit} more questions, plus the full terms
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

/** FAQPage structured data. Rendered wherever the FAQ appears. */
export function FaqJsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
