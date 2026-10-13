import React from 'react';
import { Layers, Server, Activity, Cpu } from 'lucide-react';

export default function MetricsCards({ models, selectedBrand, onSelectBrand }) {
  const brandStats = {
    Hikvision: models.filter(m => m.brand === 'Hikvision').length,
    Dahua: models.filter(m => m.brand === 'Dahua').length,
    IMOU: models.filter(m => m.brand === 'IMOU').length,
    KBVISION: models.filter(m => m.brand === 'KBVISION').length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Total Models */}
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 shadow-sm hover:border-slate-600 transition-all">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider">Indexed Models</span>
          <Server className="w-4 h-4 text-blue-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">{models.length}</span>
          <span className="text-xs text-slate-400">recorders</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">NVR & Hybrid XVR/DVRs</p>
      </div>

      {/* Hikvision & Dahua */}
      <div 
        onClick={() => onSelectBrand(selectedBrand === 'Hikvision' ? 'ALL' : 'Hikvision')}
        className={`bg-slate-800/50 border rounded-xl p-4 shadow-sm cursor-pointer transition-all ${
          selectedBrand === 'Hikvision' ? 'border-red-500 bg-red-950/20' : 'border-slate-700/60 hover:border-red-500/50'
        }`}
      >
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-red-400">Hikvision</span>
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">{brandStats.Hikvision}</span>
          <span className="text-xs text-slate-400">models</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 truncate">DS-7104NI, iDS-7208HQHI, etc.</p>
      </div>

      {/* Dahua */}
      <div 
        onClick={() => onSelectBrand(selectedBrand === 'Dahua' ? 'ALL' : 'Dahua')}
        className={`bg-slate-800/50 border rounded-xl p-4 shadow-sm cursor-pointer transition-all ${
          selectedBrand === 'Dahua' ? 'border-blue-500 bg-blue-950/20' : 'border-slate-700/60 hover:border-blue-500/50'
        }`}
      >
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-blue-400">Dahua</span>
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">{brandStats.Dahua}</span>
          <span className="text-xs text-slate-400">models</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 truncate">NVR4104HS-4KS2, NVR5216...</p>
      </div>

      {/* KBVISION & IMOU */}
      <div 
        onClick={() => onSelectBrand(selectedBrand === 'KBVISION' ? 'ALL' : 'KBVISION')}
        className={`bg-slate-800/50 border rounded-xl p-4 shadow-sm cursor-pointer transition-all ${
          selectedBrand === 'KBVISION' ? 'border-emerald-500 bg-emerald-950/20' : 'border-slate-700/60 hover:border-emerald-500/50'
        }`}
      >
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">KBVISION</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-bold text-white">{brandStats.KBVISION}</span>
          <span className="text-xs text-slate-400">models</span>
        </div>
        <p className="text-xs text-slate-400 mt-1 truncate">KX-DAi8108H3, KX-DAi8104H3</p>
      </div>
    </div>
  );
}
