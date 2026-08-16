"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { User, MapPin, GraduationCap, ArrowRight, Terminal } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Personal Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
              <User className="w-3.5 h-3.5" />
              <span>ABOUT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              About Me
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {PERSONAL_INFO.aboutText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Location & Education Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0E121C] border border-slate-800 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">Based in</span>
                  <span className="text-sm font-semibold text-slate-200">{PERSONAL_INFO.location}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0E121C] border border-slate-800 flex items-start space-x-3">
                <GraduationCap className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">Education</span>
                  <span className="text-sm font-semibold text-slate-200">{PERSONAL_INFO.education}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center space-x-2 text-sm font-mono text-sky-400 hover:text-sky-300 font-semibold group"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Engineering Focus Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0F1424] border border-slate-800 p-8 shadow-xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono text-slate-300 font-semibold">Core Focus Areas</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-sky-400 block font-semibold mb-1">01. Backend Systems</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Structuring modular APIs that isolate core domain logic from transport protocols.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-indigo-400 block font-semibold mb-1">02. Applied LLMs &amp; RAG</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Building multi-stage prompt assembly, high-throughput vLLM serving, and dynamic retrieval routing.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-emerald-400 block font-semibold mb-1">03. Security &amp; Deployment</span>
                  <p className="text-slate-400 font-sans text-xs">
                    Implementing Microsoft Entra ID RBAC, per-user OAuth 2.0 token handshakes, and automated CI/CD.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
