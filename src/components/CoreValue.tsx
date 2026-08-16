"use client";

import React, { useState } from "react";
import { VALUE_PROPOSITION } from "@/data/portfolioData";
import { Workflow, ArrowRight, CheckCircle2 } from "lucide-react";

export const CoreValue: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="value" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
            <Workflow className="w-3.5 h-3.5" />
            <span>CORE VALUE PROPOSITION</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {VALUE_PROPOSITION.title}
          </h2>
          
          <div className="space-y-3 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            {VALUE_PROPOSITION.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Visual Pipeline: Prototype -> Audit -> Refactor -> Architect -> Test -> Secure -> Deploy -> Scale */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400">
              The Production Pipeline
            </h3>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline">
              Select any stage to inspect engineering intent
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {VALUE_PROPOSITION.pipeline.map((item, index) => {
              const isSelected = activeStep === index;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveStep(isSelected ? null : index)}
                  className={`text-left p-3.5 rounded-lg border transition-all duration-150 flex flex-col justify-between group ${
                    isSelected
                      ? "bg-sky-950/60 border-sky-500 shadow-md shadow-sky-500/10"
                      : "bg-[#0E121C] border-slate-800/80 hover:border-slate-700 hover:bg-[#121724]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className={`text-[10px] font-mono font-semibold ${isSelected ? "text-sky-400" : "text-slate-500"}`}>
                      {item.step}
                    </span>
                    {index < VALUE_PROPOSITION.pipeline.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-600 hidden lg:block group-hover:text-slate-400 transition-colors" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold tracking-tight ${isSelected ? "text-white" : "text-slate-200"}`}>
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Detailed Callout */}
          {activeStep !== null && (
            <div className="mt-4 p-4 rounded-lg bg-sky-950/30 border border-sky-800/50 flex items-start space-x-3 animate-in fade-in duration-150">
              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-sky-400 font-semibold uppercase">
                  Stage {VALUE_PROPOSITION.pipeline[activeStep].step} · {VALUE_PROPOSITION.pipeline[activeStep].name}
                </span>
                <p className="text-sm text-slate-200 mt-0.5">
                  {VALUE_PROPOSITION.pipeline[activeStep].desc}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
