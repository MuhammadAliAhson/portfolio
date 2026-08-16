"use client";

import React from "react";
import { SERVICES } from "@/data/portfolioData";
import { 
  FileSearch, 
  Wrench, 
  Server, 
  Bot, 
  ShieldAlert, 
  Zap, 
  ArrowUpRight, 
  CheckCircle2, 
  Workflow
} from "lucide-react";

export const Services: React.FC = () => {
  const iconMap: { [key: string]: React.ElementType } = {
    FileSearch,
    Wrench,
    Server,
    Bot,
    ShieldAlert,
    Zap
  };

  return (
    <section id="services" className="py-24 bg-[#090C14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
            <Workflow className="w-3.5 h-3.5" />
            <span>CAPABILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How I Can Help
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Direct engineering engagements to audit, refactor, productionize, or scale complex AI and backend applications.
          </p>
        </div>

        {/* 6 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Server;

            return (
              <div
                key={service.id}
                className="tech-card rounded-xl p-7 flex flex-col justify-between group hover:border-sky-500/40"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-sky-400 mb-5 group-hover:border-sky-500/50 group-hover:bg-sky-950/30 transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Typical Deliverables */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block mb-2">
                      Key Deliverables
                    </span>
                    {service.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Production Ready</span>
                  <a
                    href="#contact"
                    className="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Let&apos;s Talk</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
