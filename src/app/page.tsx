import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { CoreValue } from "@/components/CoreValue";
import { Philosophy } from "@/components/Philosophy";
import { Experience } from "@/components/Experience";
import { CaseStudies } from "@/components/CaseStudies";
import { PublicProjects } from "@/components/PublicProjects";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080A0F] text-slate-100 relative selection:bg-sky-500/20 selection:text-sky-300">
      <Navbar />
      <Hero />
      <TrustStrip />
      <CoreValue />
      <Philosophy />
      <Experience />
      <CaseStudies />
      <PublicProjects />
      <Skills />
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
