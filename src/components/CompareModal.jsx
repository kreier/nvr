import React from 'react';
import { X, Trash2, Scale, ExternalLink } from 'lucide-react';
import { getBrandBadge } from '../utils/brandHelper';

export default function CompareModal({ comparedModels, onRemoveFromCompare, onClearCompare, onClose }) {
  if (comparedModels.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/50">
          <div className="flex items-center space-x-2.5">
            <Scale className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Compare NVR Stream Capabilities</h2>
              <p className="text-xs text-slate-400">Side-by-side video decoding matrix comparison</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClearCompare}
              className="inline-flex items-center px-2.5 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="p-4 sm:p-5 overflow-x-auto overflow-y-auto text-xs sm:text-sm">
          <div className="min-w-[650px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="py-3 px-3 w-40 text-slate-400 font-semibold uppercase text-xs">Specification</th>
                  {comparedModels.map((m) => {
                    const badge = getBrandBadge(m.brand);
                    return (
                      <th key={m.id} className="py-3 px-3 text-left">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${badge.bg}`}>
                              {m.brand}
                            </span>
                            <div className="font-mono font-bold text-white text-sm mt-1">{m.model}</div>
                            <div className="text-[11px] text-slate-400">{m.series}</div>
                          </div>
                          <button
                            onClick={() => onRemoveFromCompare(m)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {/* 1-Channel Max Stream */}
                <tr className="bg-blue-950/15">
                  <td className="py-3 px-3 font-semibold text-blue-400">1-Channel Stream</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 font-semibold text-white">
                      {m.streams?.ch1?.text || 'N/A'}
                    </td>
                  ))}
                </tr>

                {/* 2-Channel Max Stream */}
                <tr className="bg-indigo-950/15">
                  <td className="py-3 px-3 font-semibold text-indigo-400">2-Channel Stream</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 font-semibold text-white">
                      {m.streams?.ch2?.text || 'N/A'}
                    </td>
                  ))}
                </tr>

                {/* 3-Channel Max Stream */}
                <tr className="bg-violet-950/15">
                  <td className="py-3 px-3 font-semibold text-violet-400">3-Channel Stream</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 font-semibold text-white">
                      {m.streams?.ch3?.text || 'N/A'}
                    </td>
                  ))}
                </tr>

                {/* 4-Channel Max Stream */}
                <tr className="bg-emerald-950/15">
                  <td className="py-3 px-3 font-semibold text-emerald-400">4-Channel Stream</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 font-semibold text-white">
                      {m.streams?.ch4?.text || 'N/A'}
                    </td>
                  ))}
                </tr>

                {/* Total Decoding Ceiling */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">Decoding Ceiling</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 text-slate-300 text-xs">
                      {m.totalDecodingCapacity}
                    </td>
                  ))}
                </tr>

                {/* Device Type & Channels */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">Channel Count</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 text-slate-200">
                      {m.channelCount} Channels ({m.deviceType})
                    </td>
                  ))}
                </tr>

                {/* Incoming Bandwidth */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">Bandwidth Inflow</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 font-mono text-cyan-300">
                      {m.incomingBandwidth}
                    </td>
                  ))}
                </tr>

                {/* Hard Drive Storage */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">Storage Bays</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 text-slate-300">
                      {m.sataPorts}
                    </td>
                  ))}
                </tr>

                {/* PoE Interfaces */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">PoE Ports</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 text-slate-300">
                      {m.poePorts > 0 ? `${m.poePorts} PoE Ports` : 'None'}
                    </td>
                  ))}
                </tr>

                {/* Compression */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">Codecs</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 text-slate-300">
                      {(m.compression || []).join(', ')}
                    </td>
                  ))}
                </tr>

                {/* AI Analytics */}
                <tr>
                  <td className="py-3 px-3 text-slate-400 font-medium">AI & Analytics</td>
                  {comparedModels.map((m) => (
                    <td key={m.id} className="py-3 px-3 text-slate-300">
                      {(m.aiFeatures || []).join(' • ') || 'Standard Motion Detection'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
