import Link from "next/link";
import { NAV_LINKS, OVERLAP, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/content/services";

const SOCIALS = [
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.github, label: "GitHub" },
  { href: site.socials.huggingface, label: "Hugging Face" },
  { href: site.socials.medium, label: "Medium" },
];

/**
 * Light, by design: the dark register is reserved for case studies, diagrams and
 * the final CTA band that sits directly above this.
 */
export function Footer() {
  return (
    <footer className="border-t border-hairline bg-porcelain py-section">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-h3 text-ink">{site.name}</p>
            <p className="eyebrow mt-2">{site.practice}</p>
            <p className="mt-5 text-small text-slate">
              {site.location} · {site.timezone}
            </p>
            <a href={`mailto:${site.email}`} className="link-underline mt-2 inline-block text-small">
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-caption uppercase text-slate">Site</p>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-small text-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-small text-muted hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services" className="md:col-span-3">
            <p className="font-mono text-caption uppercase text-slate">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-small text-muted hover:text-ink"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="font-mono text-caption uppercase text-slate">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small text-muted hover:text-ink"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-hairline pt-8">
          <p className="font-mono text-caption uppercase text-slate">Working hours</p>
          <ul className="mt-3 grid gap-2 text-small text-muted sm:grid-cols-3">
            {OVERLAP.map((window) => (
              <li key={window.region}>
                <span className="text-ink">{window.region}</span> — {window.theirHours}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-6 text-caption text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Independent engineering practice.
          </p>
          <Link href="/privacy" className="hover:text-ink">
            Privacy &amp; terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}
