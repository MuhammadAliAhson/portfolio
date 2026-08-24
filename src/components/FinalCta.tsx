import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { BookCall } from "@/components/ui/BookCall";
import { Avatar } from "@/components/Avatar";
import { Scheduler } from "@/components/Scheduler";

/** Booking-first, and the next step is named precisely. */
export function FinalCta() {
  return (
    <section id="book" className="on-ink bg-ink py-section md:py-section-lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brass">Next step</p>
            <h2 className="mt-4 text-h2 text-porcelain">
              Thirty minutes, no charge, and you leave with an answer
            </h2>
            <p className="mt-5 text-body text-on-dark/85">
              Bring the system and the problem. You leave with a written view of what is
              wrong and what it would take to fix, whether or not you hire me.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookCall variant="on-ink" label="Book a 30-min call" />
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-card border border-hairline-dark px-5 py-3 text-small font-medium text-on-dark transition-colors hover:border-outline hover:text-porcelain"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email instead
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t border-hairline-dark pt-8">
              <Avatar size={64} onInk />
              <div>
                <p className="text-small font-medium text-porcelain">{site.name}</p>
                <p className="text-small text-on-dark/70">{site.title}</p>
                <p className="mt-1 font-mono text-eyebrow text-on-dark/70">
                  {site.location} · {site.timezone}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Scheduler />
          </div>
        </div>
      </Container>
    </section>
  );
}
