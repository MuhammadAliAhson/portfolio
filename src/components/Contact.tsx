"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { 
  Mail, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Phone, 
  Send, 
  MessageSquare, 
  Terminal, 
  ExternalLink,
  BookOpen
} from "lucide-react";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Architecture Audit / Backend Systems",
    message: ""
  });
  const [showPhone, setShowPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject} - ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nProject Scope:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-sky-950/40 border border-sky-800/40 text-xs font-mono text-sky-400">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>CONTACT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Have a system that needs engineering?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Building something quickly is easy. Building something that lasts requires engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Action Card */}
            <div className="tech-card rounded-xl p-6 sm:p-7 border-sky-900/40 bg-gradient-to-b from-[#111728] to-[#0A0D15]">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold block mb-2">
                Direct Communication
              </span>
              <h3 className="text-xl font-bold text-white mb-4">
                Reach Out Directly
              </h3>
              
              <div className="space-y-3">
                {/* Email Copy Card */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/90 border border-slate-700/80">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-slate-200 truncate select-all">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono transition-colors shrink-0 ml-2"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Mailto CTA */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20-%20Senior%20Software%20Engineer`}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg text-sm font-mono font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors shadow-md hover:shadow-sky-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Let&apos;s Talk</span>
                </a>
              </div>
            </div>

            {/* Social & Professional Presence */}
            <div className="tech-card rounded-xl p-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Professional Channels
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-mono font-medium text-slate-200">LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-sky-400 transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-600 hover:bg-slate-900 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <Github className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-mono font-medium text-slate-200">GitHub</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-sm">🤗</span>
                    <span className="text-xs font-mono font-medium text-slate-200">Hugging Face</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-600 hover:bg-slate-900 flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-mono font-medium text-slate-200">Medium</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>

              {/* Discreet Phone Contact */}
              <div className="pt-3 border-t border-slate-800/80">
                {!showPhone ? (
                  <button
                    onClick={() => setShowPhone(true)}
                    className="text-xs font-mono text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Show Direct Phone Number</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs font-mono text-slate-300 p-2.5 bg-slate-900/60 rounded border border-slate-800 animate-in fade-in">
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>{PERSONAL_INFO.phone}</span>
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sky-400 hover:text-sky-300 underline"
                    >
                      Call
                    </a>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="tech-card rounded-xl p-6 sm:p-8">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-800 mb-6">
                <Terminal className="w-4 h-4 text-sky-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Project Inquiry
                </h3>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Your Name / Company *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe (e.g. Acme Corp)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-400 mb-1.5">
                    Engagement Scope
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                  >
                    <option value="Architecture Audit & Refactoring">Architecture Audit &amp; Refactoring</option>
                    <option value="Production Backend / FastAPI / Azure">Production Backend / FastAPI / Azure</option>
                    <option value="AI / LLM / Dynamic RAG Systems">AI / LLM / Dynamic RAG Systems</option>
                    <option value="High-Throughput Inference & vLLM">High-Throughput Inference &amp; vLLM</option>
                    <option value="Security / OAuth 2.0 / Entra ID">Security / OAuth 2.0 / Entra ID</option>
                    <option value="General Technical Consultation">General Technical Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-400 mb-1.5">
                    System Overview &amp; Requirements *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Describe your current application, technical stack, key bottlenecks, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-lg text-sm font-mono font-medium text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors shadow-md hover:shadow-sky-500/25"
                  >
                    <span>Let&apos;s Talk</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
