import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/og";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { Scheduler } from "@/components/Scheduler";
import { Avatar } from "@/components/Avatar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 30-minute call or send an enquiry. You leave the call with a written view of what is wrong and what it would take to fix, whether or not you hire me.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    images: [
      ogImage({
        eyebrow: "Contact",
        title: "Thirty minutes, no charge, and you leave with an answer",
      }),
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Thirty minutes, no charge, and you leave with an answer"
        lede="Bring the system and the problem. You get a written view of what is wrong and what it would take to fix, whether or not you hire me."
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-h2">Send an enquiry</h2>
            <p className="lede mt-3">
              A few lines is enough. The more specific the problem, the more useful the
              first call.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-5">
            <Scheduler tone="light" />

            <div className="mt-4 rounded-card border border-hairline bg-porcelain p-6">
              <div className="flex items-center gap-4">
                <Avatar size={56} />
                <div>
                  <p className="text-small font-medium text-ink">{site.name}</p>
                  <p className="text-small text-muted">{site.title}</p>
                </div>
              </div>

              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-5 inline-flex items-center gap-2 text-small"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {site.email}
              </a>

              <p className="mt-5 border-t border-hairline pt-5 text-small text-slate">
                {site.location} · {site.timezone}. Outside the hours above I work
                asynchronously and reply within one business day.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
