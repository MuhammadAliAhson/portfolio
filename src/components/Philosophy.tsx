"use client";

import React from "react";
import { PHILOSOPHY_PRINCIPLES } from "@/data/portfolioData";
import { Compass } from "lucide-react";

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 bg-[#090C14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-indigo-950/40 border border-indigo-800/40 text-xs font-mono text-indigo-300">
            <Compass className="w-3.5 h-3.5" />
            <span>ENGINEERING PHILOSOPHY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            I Don&apos;t Just Make Code Work.{" "}
            <span className="text-slate-400">I Make It Maintainable.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Every architectural decision is grounded in real production systems, strict domain boundaries, and measurable performance.
          </p>
        </div>

        {/* 5 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHILOSOPHY_PRINCIPLES.map((principle, index) => {
            return (
              <div
                key={principle.number}
                className={`tech-card rounded-xl p-6 relative overflow-hidden flex flex-col justify-between ${
                  index === 0 || index === 4 ? "lg:col-span-1 border-sky-900/30" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-sky-400/90 tracking-tighter">
                      {principle.number}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {principle.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2.5">
                    {principle.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center space-x-2 text-xs font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Production practice</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
