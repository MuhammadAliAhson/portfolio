import { site } from "@/lib/site";

/** Route handler rather than robots.ts, for the same build reason as sitemap.xml. */
export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /privacy",
    "",
    // No "Host:" line: it is a Yandex-only extension and fails standard
    // robots.txt validation (caught this once before via Lighthouse's SEO audit).
    `Sitemap: ${site.url}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400",
    },
  });
}
