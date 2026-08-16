"use client";

import React from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { 
  Code2, 
  Cpu, 
  Eye, 
  Server, 
  Database, 
  Terminal, 
  Layers 
} from "lucide-react";

export const Skills: React.FC = () => {
  const iconMap: { [key: string]: React.ElementType } = {
    Code2,
    Cpu,
    Eye,
    Server,
    Database
  };

  return (
    <section id="skills" className="py-24 bg-[#07090E] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL STACK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technical Stack
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Technologies, frameworks, and infrastructure tools utilized in production environments.
          </p>
        </div>

        {/* 5 Grouped Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, index) => {
            const Icon = iconMap[cat.iconName] || Terminal;
            const isWide = index === 1; // AI/LLM category
            
            return (
              <div
                key={cat.title}
                className={`tech-card rounded-xl p-6 sm:p-7 flex flex-col justify-between ${
                  isWide ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  {/* Card Title */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-800/80 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-sky-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">
                        {cat.skills.length} technologies
                      </span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-md bg-[#121622] border border-slate-700/70 text-xs font-mono text-slate-200 hover:border-sky-500/50 hover:text-sky-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
