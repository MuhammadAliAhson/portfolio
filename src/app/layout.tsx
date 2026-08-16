import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Ali Ahson — Senior Software Engineer | AI Systems & Backend Engineering",
  description: "Senior Software Engineer specializing in AI systems, LLM applications, backend architecture, RAG, production infrastructure and cloud deployment. Transforming vibe-coded prototypes into clean, maintainable, scalable software.",
  keywords: [
    "Senior Software Engineer",
    "AI Systems Engineer",
    "LLM Engineer",
    "Backend Architecture",
    "RAG Frameworks",
    "LangGraph",
    "FastAPI",
    "Python",
    "vLLM",
    "Continuous Batching",
    "Azure App Service",
    "Azure DevOps",
    "Microsoft Entra ID",
    "OAuth 2.0",
    "Production Engineering",
    "Machine Learning",
    "Computer Vision",
    "Islamabad",
    "Pakistan",
    "Software Architecture"
  ],
  authors: [{ name: "Muhammad Ali Ahson", url: "https://github.com/MuhammadAliAhson" }],
  creator: "Muhammad Ali Ahson",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammadaliahson.com",
    title: "Muhammad Ali Ahson — Senior Software Engineer | AI Systems & Backend Engineering",
    description: "Senior Software Engineer specializing in AI systems, LLM applications, backend architecture, RAG, production infrastructure and cloud deployment.",
    siteName: "Muhammad Ali Ahson Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Ali Ahson — Senior Software Engineer | AI Systems & Backend Engineering",
    description: "Senior Software Engineer specializing in AI systems, LLM applications, backend architecture, RAG, production infrastructure and cloud deployment.",
    creator: "@muhammadaliahson",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muhammad Ali Ahson",
  "jobTitle": "Senior Software Engineer",
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "FAST-NUCES Islamabad"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Islamabad",
    "addressCountry": "Pakistan"
  },
  "email": "aliahson56@gmail.com",
  "url": "https://muhammadaliahson.com",
  "sameAs": [
    "https://github.com/MuhammadAliAhson",
    "https://www.linkedin.com/in/muhammadaliahson/",
    "https://huggingface.co/maliahson",
    "https://aliahson.medium.com/"
  ],
  "knowsAbout": [
    "AI Systems Architecture",
    "Large Language Models (LLMs)",
    "Retrieval-Augmented Generation (RAG)",
    "FastAPI & Asynchronous Python",
    "vLLM & High-Throughput Inference",
    "Microsoft Entra ID & OAuth 2.0 RBAC",
    "Azure App Service & Cloud Infrastructure",
    "Computer Vision & YOLO"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#080A0F] text-slate-100 antialiased selection:bg-sky-500/20 selection:text-sky-300">
        {children}
      </body>
    </html>
  );
}
