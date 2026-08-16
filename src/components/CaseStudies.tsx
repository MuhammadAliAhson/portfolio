"use client";

import React, { useState } from "react";
import { CASE_STUDIES } from "@/data/portfolioData";
import { 
  FolderGit2, 
  ShieldAlert, 
  Cpu, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Activity, 
  Server, 
  FileCheck2, 
  Database,
  ArrowDown
} from "lucide-react";

export const CaseStudies: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("case-enterprise-llm");

  return (
    <section id="case-studies" className="py-24 bg-[#07090F] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>DEEP DIVE ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering Case Studies
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Selected work. Some projects are confidential, so the examples below focus on architecture, engineering decisions and outcomes rather than proprietary implementation details.
          </p>
        </div>

        {/* Case Study Cards Stack */}
        <div className="space-y-16">
          
          {/* CASE STUDY 01: Enterprise LLM Application */}
          <div className="tech-card rounded-2xl p-6 sm:p-10 border border-slate-800/90 relative overflow-hidden bg-gradient-to-b from-[#0F1320] to-[#0A0D15]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
                    CASE STUDY 01
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-950/40 border border-amber-800/60 text-amber-300">
                    <ShieldAlert className="w-3 h-3" />
                    Confidential Client Work
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                  Enterprise LLM Application
                </h3>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  Automated Project Briefs to Client-Ready Fee Proposals with Rate-Card Pricing
                </p>
              </div>

              {/* Metric Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-900/40 text-right self-start lg:self-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Proposal Turnaround</span>
                <span className="text-2xl font-mono font-bold text-sky-400">Days → &lt;1 Hour</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    The Problem
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    An enterprise team needed to automate the generation of complex project proposals using LLMs while preserving company-specific pricing, templates, branding and business rules.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Engineering Work &amp; Decisions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "FastAPI backend architecture",
                      "Multi-stage LLM generation",
                      "Prompt assembly & context management",
                      "Document generation (Word & Excel)",
                      "Template management engine",
                      "Total Synergy v4 API integration",
                      "Per-user OAuth 2.0 token handshake",
                      "Microsoft Entra ID RBAC (24 use cases)",
                      "Azure App Service deployment",
                      "Azure DevOps CI/CD (Async zipdeploy)"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                    Engineering Outcome
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Reduced proposal turnaround from days to under an hour while eliminating audit gaps by ensuring writes are attributed to individual engineers rather than a shared service account. Created a structured foundation for continued product development.
                  </p>
                </div>
              </div>

              {/* Right Architecture Flow Visual */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-[#090C14] border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-sky-400" /> Pipeline Architecture
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Zero Audit Gap</span>
                </div>

                <div className="space-y-2.5 my-4 font-mono text-xs">
                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-center text-slate-200">
                    Client Input / Brief Data
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2.5 rounded bg-sky-950/40 border border-sky-800/60 text-center text-sky-300">
                    FastAPI + Entra ID RBAC + User OAuth 2.0
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-800/60 text-center text-indigo-300">
                    Multi-Stage Prompt Assembly &amp; Rate Cards
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 text-center text-slate-200">
                    Doc Generator (Word/Excel) + Synergy API Sync
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>Host: Azure App Service</span>
                  <span>CI/CD: Azure DevOps</span>
                </div>
              </div>
            </div>
          </div>


          {/* CASE STUDY 02: High-Throughput LLM Inference */}
          <div className="tech-card rounded-2xl p-6 sm:p-10 border border-slate-800/90 relative overflow-hidden bg-gradient-to-b from-[#0F1320] to-[#0A0D15]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
                    CASE STUDY 02
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-sky-950/40 border border-sky-800/60 text-sky-300">
                    <Cpu className="w-3 h-3" />
                    AI Infrastructure
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                  High-Throughput LLM Inference
                </h3>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  Serving 100 Concurrent Requests on Single RTX 2080 Ti via vLLM
                </p>
              </div>

              {/* Metric Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-900/40 text-right self-start lg:self-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Single GPU Capacity</span>
                <span className="text-2xl font-mono font-bold text-sky-400">100 Concurrent Reqs</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    The Problem
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Deploying an LLM inference service on constrained GPU hardware while supporting high concurrent traffic without running out of VRAM or sacrificing latency.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Engineering Work &amp; Techniques
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "vLLM inference engine integration",
                      "Continuous batching implementation",
                      "Paged attention memory management",
                      "GPU memory & KV-cache optimization",
                      "Concurrent request handling queue",
                      "Python API service with asynchronous scheduler",
                      "Performance & TTFT measurement instrumentation",
                      "Hardware constraint profiling (RTX 2080 Ti)"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                    Engineering Result
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Supported 100 concurrent requests on a single RTX 2080 Ti while significantly reducing inference bottlenecks and maximizing GPU compute utilization.
                  </p>
                </div>

                {/* Engineering Focus Panel */}
                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    Engineering Focus Panel
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {["Concurrency", "Throughput", "Latency", "GPU Memory"].map((focus) => (
                      <span
                        key={focus}
                        className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-sky-300"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Architecture Flow Visual */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-[#090C14] border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-sky-400" /> vLLM Serving Pipeline
                  </span>
                  <span className="text-[10px] font-mono text-sky-400">PagedAttention</span>
                </div>

                <div className="space-y-2.5 my-4 font-mono text-xs">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center text-slate-200">
                    Client
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center text-slate-200">
                    API Layer
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-sky-950/50 border border-sky-800/60 text-center text-sky-300">
                    Request Queue / Scheduler
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-indigo-950/50 border border-indigo-800/60 text-center text-indigo-300">
                    vLLM (Continuous Batching)
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-amber-950/40 border border-amber-800/50 text-center text-amber-300">
                    GPU (RTX 2080 Ti VRAM Pool)
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/50 text-center text-emerald-300">
                    Streaming Response
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>Hardware: RTX 2080 Ti</span>
                  <span>Batching: Dynamic Chunked</span>
                </div>
              </div>
            </div>
          </div>


          {/* CASE STUDY 03: Contextual RAG Framework */}
          <div className="tech-card rounded-2xl p-6 sm:p-10 border border-slate-800/90 relative overflow-hidden bg-gradient-to-b from-[#0F1320] to-[#0A0D15]">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase">
                    CASE STUDY 03
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-indigo-950/40 border border-indigo-800/60 text-indigo-300">
                    <Search className="w-3 h-3" />
                    LLM / Search Infrastructure
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                  Contextual RAG Framework
                </h3>
                <p className="text-sm font-mono text-slate-400 mt-1">
                  Dynamic Multi-Strategy Retrieval Routing &amp; Reranking
                </p>
              </div>

              {/* Metric Card */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-900/40 text-right self-start lg:self-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">Retrieval Efficiency</span>
                <span className="text-2xl font-mono font-bold text-sky-400">+60% Boost</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                    The Problem
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Different queries require different retrieval strategies. A single retrieval approach can create unnecessary latency or reduce answer quality when applied blindly across heterogeneous documents.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    Engineering Work &amp; Pipeline Design
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Dense vector retrieval (FAISS)",
                      "Sparse keyword retrieval (BM25)",
                      "Embedding generation & indexing",
                      "Dynamic query routing & classification",
                      "Cross-encoder reranking layer",
                      "Context construction & deduplication",
                      "Latency vs precision optimization",
                      "Fallback query strategies"
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                    Engineering Result
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Built a contextual retrieval system capable of dynamically balancing retrieval quality and latency, improving retrieval efficiency by 60%.
                  </p>
                </div>
              </div>

              {/* Right Architecture Flow Visual */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-xl bg-[#090C14] border border-slate-800">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-sky-400" /> RAG Routing Flow
                  </span>
                  <span className="text-[10px] font-mono text-indigo-300">Hybrid Search</span>
                </div>

                <div className="space-y-2 my-3 font-mono text-xs">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center text-slate-200">
                    User Query
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-sky-950/50 border border-sky-800/60 text-center text-sky-300">
                    Query Router (Intent Classifier)
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-indigo-950/50 border border-indigo-800/60 text-center text-indigo-300">
                    Dense Search / Sparse Search / Hybrid
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-purple-950/40 border border-purple-800/50 text-center text-purple-300">
                    Reranking (Cross-Encoder)
                  </div>
                  <div className="flex justify-center text-slate-600"><ArrowDown className="w-3.5 h-3.5" /></div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-center text-slate-200">
                    Context Builder → LLM → Response
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
                  <span>Vector: FAISS</span>
                  <span>Keyword: BM25</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
