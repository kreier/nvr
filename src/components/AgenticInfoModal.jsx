import React from 'react';
import { X, Bot, Cpu, Terminal, GitBranch, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AgenticInfoModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/40">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Agentic Architecture & Scraper</h2>
              <p className="text-xs text-slate-400">Autonomous Surveillance Spec Ingestion Engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300">
          <p className="leading-relaxed">
            This repository is engineered as an <strong>agentic data system</strong>. It bridges autonomous web scrapers, heuristic SoC decoding parsers, and a static web app deployed on GitHub Pages.
          </p>

          {/* Workflow Diagram */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs">
            <div className="text-slate-400 font-semibold mb-2">Automated Pipeline:</div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-cyan-300">
              <span className="p-2 bg-slate-900 rounded border border-slate-800">1. Web Crawler & Seed Datasheets</span>
              <span className="text-slate-500 hidden sm:inline">→</span>
              <span className="p-2 bg-slate-900 rounded border border-slate-800">2. SoC 1-4 Ch Stream Inference</span>
              <span className="text-slate-500 hidden sm:inline">→</span>
              <span className="p-2 bg-slate-900 rounded border border-slate-800">3. Schema Verify & Vite Build</span>
            </div>
          </div>

          {/* Key Agent Capabilities */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Agent Capabilities & CLI Commands:
            </h3>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs space-y-2">
              <div>
                <span className="text-slate-500"># Run full agentic scraping & data normalization</span>
                <div className="text-emerald-400 font-bold">$ npm run scrape</div>
              </div>
              <div className="pt-2 border-t border-slate-900">
                <span className="text-slate-500"># Verify schema validity & all 1, 2, 3, 4 ch stream specs</span>
                <div className="text-emerald-400 font-bold">$ npm run agent:verify</div>
              </div>
              <div className="pt-2 border-t border-slate-900">
                <span className="text-slate-500"># Build production static bundle for GitHub Pages</span>
                <div className="text-emerald-400 font-bold">$ npm run build</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-950/20 border border-blue-900/40 rounded-xl p-3 text-xs text-blue-200">
            <strong>Supported Brands:</strong> Hikvision (Turbo HD & Pro NVRs), Dahua (Lite & Pro AI NVRs), IMOU (PoE & Wireless NVRs), KBVISION (KX-DAi & KX-A series).
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
