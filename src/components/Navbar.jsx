import React from 'react';
import { Video, ShieldCheck, Download, FileSpreadsheet, Bot, Database } from 'lucide-react';
import { exportToCSV, exportToJSON } from '../utils/exportData';

export default function Navbar({ models, onOpenAgenticModal }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Video className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-white tracking-tight">NVR Stream Spec Hub</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Bot className="w-3 h-3 mr-1" />
                  Agentic Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Max video stream capabilities (1, 2, 3, 4 ch) • Hikvision • Dahua • IMOU • KBVISION
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenAgenticModal}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
              title="View Agentic Scraping Pipeline & Architecture"
            >
              <Bot className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
              <span className="hidden md:inline">Agent Pipeline</span>
            </button>

            <button
              onClick={() => exportToCSV(models)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
              title="Export as CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span className="hidden sm:inline">CSV</span>
            </button>

            <button
              onClick={() => exportToJSON(models)}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
              title="Export as JSON"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              <span className="hidden sm:inline">JSON</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
