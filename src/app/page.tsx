import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { Hero } from "@/components/home/Hero";
import { ProofBar } from "@/components/home/ProofBar";
import { Qualify } from "@/components/home/Qualify";
import { WorkPreview } from "@/components/home/WorkPreview";
import { HowIWork } from "@/components/home/HowIWork";
import { Industries, TechStrip } from "@/components/home/Industries";
import { Engagement } from "@/components/home/Engagement";
import { Insights } from "@/components/home/Insights";
import { Faq, FaqJsonLd } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "AI systems and backend engineering — Muhammad Ali Ahson",
  description:
    "I take AI prototypes that stalled before production and rebuild them into systems your team can run, secure and afford. Production readiness audits, backend engineering, RAG and LLM systems.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [ogImage({})] },
};

export default function HomePage() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <ProofBar />
      <Qualify />
      <WorkPreview />
      <HowIWork />
      <Industries />
      <TechStrip />
      <Engagement />
      <Insights />
      <Faq limit={6} />
      <FinalCta />
    </>
  );
}
