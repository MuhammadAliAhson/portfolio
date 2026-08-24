import type { Metadata } from "next";
import { OVERLAP, site } from "@/lib/site";
import { ogImage } from "@/lib/og";
import {
  CONTRACTING,
  ENGAGEMENT_MODELS,
  HOW_TO_ENGAGE,
  ONBOARDING,
  PIPELINE,
  WEEK_SHAPE,
} from "@/content/process";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";
import { EngagementModels, EngagementNote } from "@/components/EngagementModels";
import { Faq, FaqJsonLd } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { PdfDownload } from "@/components/Tracked";

export const metadata: Metadata = {
  title: "Process and terms",
  description:
    "Engagement models, what a week looks like, guaranteed timezone overlap with Australia, the UK and US East, contracting and IP terms, and the onboarding checklist.",
  alternates: { canonical: "/process" },
  openGraph: {
    url: "/process",
    images: [
      ogImage({
        eyebrow: "Process",
        title: "How the work runs, and what you are agreeing to",
      }),
    ],
  },
};

export default function ProcessPage() {
  return (
    <>
      <FaqJsonLd />
      <PageHeader
        eyebrow="Process"
        title="How the work runs, and what you are agreeing to"
        lede="Engagement shapes, communication cadence, real overlap hours, and the contracting terms in plain language."
      >
        <PdfDownload
          href="/capability-overview.pdf"
          className="mt-8 inline-flex items-center gap-2 rounded-card border border-outline px-5 py-3 text-small font-medium text-ink transition-colors hover:border-slate hover:bg-card"
        >
          Download the one-page capability overview
        </PdfDownload>
      </PageHeader>

      <Section id="how-to-engage" tone="strip">
        <SectionHead
          eyebrow="How to work with me"
          title="Four steps, start to finish"
          lede="No jargon, no long procurement process. This is the whole thing."
        />
        <RevealGroup as="ol" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_TO_ENGAGE.map((item) => (
            <li key={item.step} className="rounded-card border border-hairline bg-porcelain p-6">
              <span className="font-mono text-caption text-slate">{item.step}</span>
              <h3 className="mt-3 text-h3">{item.title}</h3>
              <p className="mt-2.5 text-small leading-relaxed text-muted">{item.detail}</p>
            </li>
          ))}
        </RevealGroup>
      </Section>

      <Section id="models" tone="light">
        <SectionHead
          eyebrow="Engagement models"
          title="Three shapes, and what each is for"
          lede="You can move between them. Most clients start with an audit and decide afterwards."
        />
        <div className="mt-10">
          <EngagementModels />
          <EngagementNote />
        </div>
      </Section>

      <Section id="week" tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Cadence"
              title="What a week looks like"
              lede="Written by default, live only when a decision needs it. I work in your Slack or Teams channel, not by email chains."
            />
          </div>
          <dl className="lg:col-span-7">
            {WEEK_SHAPE.map((item) => (
              <div key={item.name} className="border-t border-hairline py-5 first:border-t-0 first:pt-0">
                <dt className="font-mono text-caption uppercase text-slate">{item.name}</dt>
                <dd className="mt-2 max-w-prose text-body text-ink">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="timezone" tone="light">
        <SectionHead
          eyebrow="Timezone"
          title="I work from Islamabad, which is UTC+5"
          lede="These are hours I guarantee, not hours I might be around. Outside them I work asynchronously and reply within one business day."
        />
        <RevealGroup as="dl" className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-3">
          {OVERLAP.map((window) => (
            <div key={window.region} className="bg-card p-6 sm:p-7">
              <dt className="font-mono text-caption uppercase text-slate">
                {window.region}
              </dt>
              <dd className="mt-3 font-display text-h3 text-ink">{window.theirHours}</dd>
              <dd className="mt-2 text-small text-muted">{window.myHours}</dd>
              <dd className="mt-3 font-mono text-eyebrow text-slate">{window.note}</dd>
            </div>
          ))}
        </RevealGroup>
        <p className="mt-6 text-small text-slate">
          If your project needs full US Pacific overlap, I am the wrong engineer for it and
          will say so on the first call.
        </p>
      </Section>

      <Section id="pipeline" tone="light">
        <SectionHead
          eyebrow="The full pipeline"
          title="Eight steps, in the order they happen"
          lede="The home page compresses this into four phases. This is the detail behind them."
        />
        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {PIPELINE.map((step) => (
            <li key={step.step} className="flex gap-5 border-t border-hairline py-5">
              <span className="font-mono text-caption text-slate">{step.step}</span>
              <div>
                <h3 className="text-h3">{step.name}</h3>
                <p className="mt-1.5 text-body text-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contracting" tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Contracting"
              title="The commercial terms, in plain language"
              lede="No surprises buried in an appendix. If anything here does not suit your procurement process, say so early and we adjust it."
            />
          </div>
          <dl className="lg:col-span-7">
            {CONTRACTING.map((item) => (
              <div key={item.question} className="border-t border-hairline py-6 first:border-t-0 first:pt-0">
                <dt className="text-h3">{item.question}</dt>
                <dd className="mt-2.5 max-w-prose text-body text-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="onboarding" tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Onboarding"
              title="What I need from you in week one"
              lede="Five things. Having them ready is the difference between starting on day one and starting on day four."
            />
          </div>
          <ul className="lg:col-span-7">
            {ONBOARDING.map((item, i) => (
              <li key={item} className="flex gap-5 border-t border-hairline py-4 first:border-t-0 first:pt-0">
                <span className="font-mono text-caption text-slate">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-body text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light" className="!py-14">
        <p className="text-body text-muted">
          Engagements are contracted directly with me as an individual practitioner. For
          purchase-order or supplier-onboarding requirements, email{" "}
          <a href={`mailto:${site.email}`} className="link-underline">
            {site.email}
          </a>{" "}
          and I will complete your forms before the first call.
        </p>
      </Section>

      <Faq tone="light" />
      <FinalCta />
    </>
  );
}
