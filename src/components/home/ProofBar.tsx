import { ArrowUpRight } from "lucide-react";
import { CLIENT_DESCRIPTORS, PLATFORM_PROOF, PROOF_NUMBERS } from "@/content/proof";
import { Container } from "@/components/ui/Container";
import { RevealGroup } from "@/components/ui/Reveal";

/**
 * Three independent trust signals immediately below the hero: measured outcomes,
 * the kinds of organisation the work was delivered for, and public profiles anyone
 * can verify. No client is named, because none has approved being named.
 */
export function ProofBar() {
  return (
    <section aria-label="Proof" className="border-y border-hairline bg-card py-12 md:py-14">
      <Container>
        <RevealGroup as="dl" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROOF_NUMBERS.map((item) => (
            <div key={item.label}>
              <dt className="font-display text-h2 leading-none text-brass">
                {item.value}
              </dt>
              <dd className="mt-2.5">
                <span className="block text-small font-medium text-ink">{item.label}</span>
                <span className="mt-1 block font-mono text-eyebrow leading-relaxed text-slate">
                  {item.detail}
                </span>
              </dd>
            </div>
          ))}
        </RevealGroup>

        <div className="mt-8 hairline-t pt-6 md:flex md:items-start md:justify-between md:gap-10">
          <div>
            <p className="eyebrow">Delivered for</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-small text-muted">
              {CLIENT_DESCRIPTORS.map((descriptor) => (
                <li key={descriptor}>{descriptor}</li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-eyebrow text-slate">
              Industries, not logos. No client has approved being named.
            </p>
          </div>

          <div className="mt-8 shrink-0 md:mt-0">
            <p className="eyebrow">Check for yourself</p>
            <ul className="mt-3 space-y-1.5">
              {PLATFORM_PROOF.map((platform) => (
                <li key={platform.label}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-small"
                  >
                    {platform.label}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
