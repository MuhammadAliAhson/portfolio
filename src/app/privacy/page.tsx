import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy and terms",
  description:
    "What this site collects, how enquiry data is handled, and the standing terms for engagements.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const SECTIONS = [
  {
    heading: "What this site collects",
    body: [
      "If you submit the contact form, I receive the name, email, company, service interest, budget band, timeline and message you enter. That is used to reply to you and nothing else. It is not added to a mailing list, and it is not sold or shared.",
      "Analytics on this site are aggregate and cookie-free. No advertising or cross-site tracking scripts are loaded.",
    ],
  },
  {
    heading: "How long enquiry data is kept",
    body: [
      "Enquiries stay in my email for as long as the conversation is live, and are deleted within 24 months. You can ask me to delete yours sooner by emailing the address below.",
    ],
  },
  {
    heading: "Confidentiality of client work",
    body: [
      "I sign NDAs on request before any access is granted. Case studies on this site name industries rather than companies, and every figure states whether it comes from my own measurement or an external source.",
    ],
  },
  {
    heading: "Standing engagement terms",
    body: [
      "Intellectual property in delivered work transfers to you on final payment. Systems are deployed to your own cloud accounts and I hold no credentials after handover. Fixed-scope overruns caused by my estimate are my cost; scope changes are re-quoted in writing before the work is done.",
      "These are the defaults. The signed engagement document governs, and it takes precedence over anything on this page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy and terms"
        lede="Short, because there is not much to say."
      />

      <Section tone="light">
        <div className="max-w-prose">
          {SECTIONS.map((section) => (
            <section key={section.heading} className="border-t border-hairline py-8 first:border-t-0 first:pt-0">
              <h2 className="text-h3">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-body text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="border-t border-hairline pt-8 text-body text-muted">
            Questions about any of this go to{" "}
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
