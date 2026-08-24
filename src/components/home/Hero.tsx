import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BookCall } from "@/components/ui/BookCall";
import { HeroDiagram } from "@/components/diagrams";

export function Hero() {
  return (
    <section className="pt-10 pb-14 md:pt-14 md:pb-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-hairline bg-porcelain px-3 py-1.5 font-mono text-eyebrow uppercase tracking-[0.1em] text-slate">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
              {site.availability}
            </p>

            <h1 className="expanded mt-7 text-display-xl">Your AI demo, ready for production</h1>

            <p className="lede mt-6">
              I take AI prototypes that stalled before launch and rebuild them into systems
              your team can run, secure and afford.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <BookCall label="Book a 30-min call" />
              <Button href="/work" variant="secondary">
                See client results
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="on-ink rounded-card bg-ink p-4 sm:p-6">
              <HeroDiagram />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
