"use client";

import React from "react";
import { TRUST_STRIP_ITEMS } from "@/data/portfolioData";
import { Cpu, Server, Cloud, ShieldCheck, Code } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const icons = [Code, Cpu, Server, Cloud, ShieldCheck];

  return (
    <div className="border-y border-white/5 bg-[#0A0D15]/80 backdrop-blur-sm py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-y-3 gap-x-6 text-xs sm:text-sm font-mono text-slate-300">
          {TRUST_STRIP_ITEMS.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={item} className="flex items-center space-x-2">
                <Icon className="w-3.5 h-3.5 text-sky-400/80" />
                <span className="font-medium tracking-tight text-slate-200">{item}</span>
                {index < TRUST_STRIP_ITEMS.length - 1 && (
                  <span className="hidden md:inline-block text-slate-700 ml-4">/</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
