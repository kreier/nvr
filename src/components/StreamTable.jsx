import React from 'react';
import { ExternalLink, Check, Plus, HardDrive, Wifi, Zap, Eye } from 'lucide-react';
import { getBrandBadge } from '../utils/brandHelper';

export default function StreamTable({
  models,
  onSelectModel,
  comparedModels,
  onToggleCompare
}) {
  if (models.length === 0) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400">
        <p className="text-base font-medium">No matching NVR models found.</p>
        <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or brand/channel filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/70 rounded-2xl shadow-xl overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-700 text-slate-300 font-semibold tracking-wider text-[11px] sm:text-xs uppercase">
              <th className="py-3.5 px-4">Brand & Model</th>
              <th className="py-3.5 px-3">Type / Ch</th>
              <th className="py-3.5 px-3 bg-blue-950/20 text-blue-300">
                1-Channel Max
              </th>
              <th className="py-3.5 px-3 bg-indigo-950/20 text-indigo-300">
                2-Channel Max
              </th>
              <th className="py-3.5 px-3 bg-violet-950/20 text-violet-300">
                3-Channel Max
              </th>
              <th className="py-3.5 px-3 bg-emerald-950/20 text-emerald-300">
                4-Channel Max
              </th>
              <th className="py-3.5 px-3">Bandwidth</th>
              <th className="py-3.5 px-3">Storage / PoE</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {models.map((model) => {
              const brandBadge = getBrandBadge(model.brand);
              const isCompared = comparedModels.some(m => m.id === model.id);

              return (
                <tr 
                  key={model.id}
                  className="hover:bg-slate-750 hover:bg-slate-700/30 transition-colors group"
                >
                  {/* Brand & Model */}
                  <td className="py-3.5 px-4 font-medium">
                    <div className="flex items-center space-x-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${brandBadge.bg}`}>
                        {model.brand}
                      </span>
                      <div>
                        <button
                          onClick={() => onSelectModel(model)}
                          className="font-mono font-bold text-white hover:text-blue-400 text-sm text-left transition-colors flex items-center"
                        >
                          {model.model}
                        </button>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {model.series}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Type / Channels */}
                  <td className="py-3.5 px-3 text-slate-300">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-slate-200">
                        {model.channelCount} Channels
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {model.deviceType}
                      </span>
                    </div>
                  </td>

                  {/* 1-Channel Max Stream */}
                  <td className="py-3.5 px-3 bg-blue-950/10">
                    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30">
                      {model.streams?.ch1?.text || 'N/A'}
                    </div>
                  </td>

                  {/* 2-Channel Max Stream */}
                  <td className="py-3.5 px-3 bg-indigo-950/10">
                    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {model.streams?.ch2?.text || 'N/A'}
                    </div>
                  </td>

                  {/* 3-Channel Max Stream */}
                  <td className="py-3.5 px-3 bg-violet-950/10">
                    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-violet-500/15 text-violet-300 border border-violet-500/30">
                      {model.streams?.ch3?.text || 'N/A'}
                    </div>
                  </td>

                  {/* 4-Channel Max Stream */}
                  <td className="py-3.5 px-3 bg-emerald-950/10">
                    <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {model.streams?.ch4?.text || 'N/A'}
                    </div>
                  </td>

                  {/* Bandwidth */}
                  <td className="py-3.5 px-3 text-slate-300">
                    <div className="flex flex-col text-xs">
                      <span className="font-medium text-slate-200">{model.incomingBandwidth}</span>
                      <span className="text-[10px] text-slate-400">inflow cap</span>
                    </div>
                  </td>

                  {/* Storage / PoE */}
                  <td className="py-3.5 px-3 text-slate-300 text-xs">
                    <div className="flex flex-col">
                      <span className="truncate max-w-[140px] text-slate-300" title={model.sataPorts}>
                        {model.sataPorts}
                      </span>
                      {model.poePorts > 0 ? (
                        <span className="text-[11px] text-amber-400 font-medium">
                          ⚡ {model.poePorts}x PoE Ports
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500">Non-PoE</span>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onToggleCompare(model)}
                        className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          isCompared
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                        }`}
                        title={isCompared ? 'Remove from comparison' : 'Add to compare'}
                      >
                        {isCompared ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onSelectModel(model)}
                        className="p-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
                        title="View Full Technical Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
