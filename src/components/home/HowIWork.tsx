import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PHASES } from "@/content/process";
import { Section, SectionHead } from "@/components/ui/Section";
import { RevealGroup } from "@/components/ui/Reveal";

export function HowIWork() {
  return (
    <Section id="how-i-work" tone="light">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          eyebrow="How I work"
          title="Four phases, and what you hold at the end of each"
          lede="You get something written down at every stage, so progress is never a matter of trust."
        />
        <Link
          href="/process"
          className="group inline-flex items-center gap-1.5 text-small font-medium text-brass-deep"
        >
          Full process and terms
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      <RevealGroup as="ol" className="mt-10 grid gap-px overflow-hidden rounded-card border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4">
        {PHASES.map((phase) => (
          <li key={phase.name} className="bg-card">
            <div className="flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-caption text-slate">{phase.step}</span>
                <span className="font-mono text-eyebrow uppercase tracking-[0.06em] text-slate">
                  {phase.duration}
                </span>
              </div>
              <h3 className="mt-4 text-h3">{phase.name}</h3>
              <p className="mt-2.5 text-small leading-relaxed text-muted">{phase.summary}</p>
              <p className="mt-5 hairline-t pt-4 text-small text-ink">
                <span className="block font-mono text-eyebrow uppercase tracking-[0.06em] text-slate">
                  You receive
                </span>
                <span className="mt-1.5 block">{phase.youGet}</span>
              </p>
            </div>
          </li>
        ))}
      </RevealGroup>
    </Section>
  );
}
