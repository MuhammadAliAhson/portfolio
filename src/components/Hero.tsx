"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowRight, Github, Linkedin, Terminal, ShieldCheck, Cpu, GitBranch } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Technical Grid Background */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Engineer Profile Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 font-semibold">{PERSONAL_INFO.name}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">{PERSONAL_INFO.subRole}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              {PERSONAL_INFO.headline}
            </h1>

            {/* Supporting Text (Strict constraint: under 40 words) */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.bio}
            </p>

            {/* CTA Buttons: Exactly 2 site-wide variants */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#case-studies"
                className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-mono font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-all shadow-md hover:shadow-sky-500/20 active:scale-[0.98]"
              >
                <span>View Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-6 py-3 text-sm font-mono font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 rounded-lg transition-all active:scale-[0.98]"
              >
                <span>Let&apos;s Talk</span>
              </a>

              {/* Social Links */}
              <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-sky-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Telemetry Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-[#0C0F17] border border-slate-700/70 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Terminal Window Header */}
              <div className="px-4 py-3 bg-[#111622] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="text-xs font-mono text-slate-400 pl-2">system_telemetry.py</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-5 font-mono text-xs space-y-4 text-slate-300">
                <div className="text-slate-400">
                  <span className="text-sky-400">$</span> inspect --target production_system
                </div>

                <div className="space-y-2 pt-1 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" /> Serving
                    </span>
                    <span className="text-sky-300">vLLM · PagedAttention</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Security
                    </span>
                    <span className="text-emerald-300">Entra ID · OAuth 2.0</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-indigo-400" /> CI/CD
                    </span>
                    <span className="text-indigo-300">Azure DevOps · Async Deploy</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" /> Core
                    </span>
                    <span className="text-amber-300">FastAPI · Python 3.11</span>
                  </div>
                </div>

                {/* Simulated Log Snippet */}
                <div className="p-3 bg-[#080A0F] rounded border border-slate-800/90 text-[11px] leading-relaxed space-y-1 text-slate-400">
                  <p>
                    <span className="text-sky-400">[INFO]</span> Contextual RAG routing initialized.
                  </p>
                  <p>
                    <span className="text-emerald-400">[PASS]</span> RBAC verified: 24 mapped use cases.
                  </p>
                  <p>
                    <span className="text-indigo-400">[STATUS]</span> Automated proposal engine active.
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
