import { site } from "@/lib/site";
import { SERVICES } from "@/content/services";
import { CASE_STUDIES } from "@/content/work";

/**
 * Written as a route handler rather than the sitemap.ts file convention: Next's
 * metadata-route loader fails when the project path contains an apostrophe,
 * which this checkout does ("Ali's Portfolio"). Same output, portable build.
 */
export const dynamic = "force-static";

interface Entry {
  path: string;
  priority: number;
}

const STATIC_ROUTES: Entry[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/work", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/process", priority: 0.8 },
  { path: "/about", priority: 0.7 },
  { path: "/insights", priority: 0.6 },
];

export function GET() {
  const lastModified = new Date().toISOString();

  const entries: Entry[] = [
    ...STATIC_ROUTES,
    ...SERVICES.map((service) => ({ path: `/services/${service.slug}`, priority: 0.85 })),
    ...CASE_STUDIES.map((study) => ({ path: `/work/${study.slug}`, priority: 0.8 })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${site.url}${entry.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=86400",
    },
  });
}
