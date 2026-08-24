import Link from "next/link";
import { NAV_LINKS } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-section-lg">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="expanded mt-5 max-w-2xl text-display-l">
          That page is not here
        </h1>
        <p className="lede mt-5">
          The link may be out of date. These are the pages that exist.
        </p>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="link-underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/">Back to the home page</Button>
        </div>
      </Container>
    </section>
  );
}
