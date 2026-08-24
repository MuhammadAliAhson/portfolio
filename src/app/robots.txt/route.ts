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
    `Sitemap: ${site.url}/sitemap.xml`,
    `Host: ${site.url}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400",
    },
  });
}
