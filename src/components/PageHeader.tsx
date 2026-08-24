import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  lede,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  breadcrumb?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-hairline bg-porcelain pb-14 pt-12 md:pb-20 md:pt-16">
      <Container>
        {breadcrumb ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href={breadcrumb.href}
              className="inline-flex items-center gap-1 font-mono text-caption uppercase text-slate hover:text-ink"
            >
              <ChevronRight className="h-3 w-3 rotate-180" aria-hidden="true" />
              {breadcrumb.label}
            </Link>
          </nav>
        ) : (
          <p className="eyebrow mb-5">{eyebrow}</p>
        )}

        <h1 className="expanded max-w-3xl text-display-l">{title}</h1>
        {lede ? <p className="lede mt-5">{lede}</p> : null}
        {children}
      </Container>
    </header>
  );
}
