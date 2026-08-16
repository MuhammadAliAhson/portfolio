"use client";

import React, { useState } from "react";
import { EXPERIENCES } from "@/data/portfolioData";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  Tag, 
  Sparkles 
} from "lucide-react";

export const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>("cerecon");

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Experience
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Proven track record of engineering, deploying, and maintaining production-grade AI applications, asynchronous backend services, and scalable cloud infrastructure.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-6 before:w-0.5 before:bg-slate-800">
          {EXPERIENCES.map((exp, index) => {
            const isSenior = exp.role.includes("Senior");
            return (
              <div
                key={exp.id}
                className="relative pl-8 md:pl-16 group"
              >
                {/* Timeline node */}
                <div className={`absolute left-1.5 md:left-4.5 top-2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all ${
                  isSenior 
                    ? "bg-sky-400 border-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]" 
                    : "bg-[#0E121C] border-slate-600 group-hover:border-slate-400"
                }`} />

                {/* Experience Card */}
                <div className="tech-card rounded-xl p-6 sm:p-8 relative">
                  
                  {/* Top Bar: Role, Company & Tenure */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        {exp.badge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-950/40 border border-amber-800/60 text-amber-300">
                            <ShieldAlert className="w-3 h-3" />
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-300 mt-1.5">
                        <span className="font-medium text-sky-400 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span className="text-slate-500 hidden sm:inline">•</span>
                        <span className="text-slate-400 flex items-center gap-1.5 font-mono text-xs">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Period Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300 self-start lg:self-center">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 mt-5 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Quantifiable Highlight Badges (if available) */}
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                      {exp.metrics.map((m) => (
                        <div key={m.label} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                          <span className="text-[10px] font-mono uppercase text-slate-500 block">{m.label}</span>
                          <span className="text-sm font-mono font-bold text-sky-300">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullet Responsibilities */}
                  <div className="mt-5 space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                      Key Engineering Responsibilities &amp; Impact
                    </h4>
                    <ul className="grid grid-cols-1 gap-2.5">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shrink-0 mt-2" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Tags */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1 mr-1">
                      <Tag className="w-3 h-3" /> Stack:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#131826] border border-slate-700/60 text-xs font-mono text-slate-300 hover:border-slate-500 transition-colors"
                      >
                        {tech}
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
