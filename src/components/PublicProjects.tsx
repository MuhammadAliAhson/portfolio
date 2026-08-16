"use client";

import React, { useState } from "react";
import { PUBLIC_PROJECTS } from "@/data/portfolioData";
import { 
  FolderCode, 
  ExternalLink, 
  Tag, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  Eye, 
  Mic
} from "lucide-react";

export const PublicProjects: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "GenAI & LLMs", "Computer Vision & OCR", "Speech & Audio"];

  const filteredProjects = filter === "All"
    ? PUBLIC_PROJECTS
    : PUBLIC_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
              <FolderCode className="w-3.5 h-3.5" />
              <span>OPEN ARTIFACTS &amp; SPACES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Public Work
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Projects I can publicly share, demonstrate or provide source-level details for.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg bg-[#0F131E] border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${
                  filter === cat
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                className="tech-card rounded-xl p-6 sm:p-8 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-sky-400">
                      {project.category}
                    </span>

                    {project.isExperimental && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/50 text-amber-300">
                        Experimental Model
                      </span>
                    )}

                    {project.metrics && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-300">
                        {project.metrics}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mt-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-5 space-y-2">
                    {project.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Tech stack & External Link */}
                <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-sky-300 bg-sky-950/50 hover:bg-sky-900/50 border border-sky-800/60 rounded-md transition-colors shrink-0 self-start sm:self-center"
                    >
                      <span>View Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
