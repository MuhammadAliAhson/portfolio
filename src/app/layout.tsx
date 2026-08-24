import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import { ogImage } from "@/lib/og";
import { SERVICES } from "@/content/services";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description:
    "I take AI prototypes that stalled before production and rebuild them into systems your team can run, secure and afford. Independent AI systems and backend engineering.",
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: `${site.name} · ${site.practice}`,
    title: `${site.name} — ${site.title}`,
    description:
      "Independent AI systems and backend engineering. I turn stalled AI prototypes into production systems.",
    images: [ogImage({})],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description:
      "Independent AI systems and backend engineering. I turn stalled AI prototypes into production systems.",
    images: [ogImage({})],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const professionalService = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#practice`,
  name: `${site.name} · ${site.practice}`,
  description:
    "Independent AI systems and backend engineering practice. Production readiness audits, codebase rescue, backend and API development, LLM and RAG systems, enterprise auth, and performance work.",
  url: site.url,
  email: site.email,
  areaServed: ["AU", "GB", "US", "AE", "SA"],
  availableLanguage: ["English", "Urdu"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  founder: { "@id": `${site.url}/#person` },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering services",
    itemListElement: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        description: service.outcome,
        url: `${site.url}/services/${service.slug}`,
      },
    })),
  },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  jobTitle: site.title,
  email: site.email,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "FAST-NUCES Islamabad",
  },
  sameAs: Object.values(site.socials),
  knowsAbout: [
    "AI systems architecture",
    "Large language model applications",
    "Retrieval-augmented generation",
    "FastAPI and asynchronous Python",
    "High-throughput model serving",
    "Microsoft Entra ID and OAuth 2.0",
    "Azure App Service and CI/CD",
    "Computer vision",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* The two faces present at first paint. Mono is label-only, so it
            loads from the stylesheet with a metric-matched fallback. */}
        <link
          rel="preload"
          href="/fonts/archivo-w500-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </head>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-card focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-porcelain"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
