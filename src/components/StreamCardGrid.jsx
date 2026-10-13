import React from 'react';
import { ExternalLink, Check, Plus, HardDrive, Zap, Eye, MonitorPlay, Layers } from 'lucide-react';
import { getBrandBadge } from '../utils/brandHelper';

export default function StreamCardGrid({
  models,
  onSelectModel,
  comparedModels,
  onToggleCompare
}) {
  if (models.length === 0) {
    return (
      <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-12 text-center text-slate-400">
        <p className="text-base font-medium">No matching NVR models found.</p>
        <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {models.map((model) => {
        const brandBadge = getBrandBadge(model.brand);
        const isCompared = comparedModels.some(m => m.id === model.id);

        return (
          <div
            key={model.id}
            className="bg-slate-850 bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 rounded-2xl p-4 shadow-sm flex flex-col justify-between transition-all group"
          >
            <div>
              {/* Card Header: Brand, Model, Type */}
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${brandBadge.bg}`}>
                      {model.brand}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {model.channelCount} Channels • {model.deviceType}
                    </span>
                  </div>
                  <h3 
                    onClick={() => onSelectModel(model)}
                    className="font-mono font-bold text-base text-white group-hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    {model.model}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{model.series}</p>
                </div>

                <button
                  onClick={() => onToggleCompare(model)}
                  className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isCompared
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                  }`}
                  title={isCompared ? 'Remove from compare' : 'Add to compare'}
                >
                  {isCompared ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {/* Stream Specs Matrix for this card */}
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 space-y-2 mb-3">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Stream Capabilities</span>
                  <span className="text-cyan-400 font-mono text-[10px]">{model.incomingBandwidth}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {/* 1 Ch */}
                  <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-1.5">
                    <div className="text-[10px] text-blue-400 font-medium">1-Ch Max Stream</div>
                    <div className="font-semibold text-white truncate text-[11px]" title={model.streams?.ch1?.text}>
                      {model.streams?.ch1?.text}
                    </div>
                  </div>

                  {/* 2 Ch */}
                  <div className="bg-indigo-950/30 border border-indigo-800/40 rounded-lg p-1.5">
                    <div className="text-[10px] text-indigo-400 font-medium">2-Ch Max Stream</div>
                    <div className="font-semibold text-white truncate text-[11px]" title={model.streams?.ch2?.text}>
                      {model.streams?.ch2?.text}
                    </div>
                  </div>

                  {/* 3 Ch */}
                  <div className="bg-violet-950/30 border border-violet-800/40 rounded-lg p-1.5">
                    <div className="text-[10px] text-violet-400 font-medium">3-Ch Max Stream</div>
                    <div className="font-semibold text-white truncate text-[11px]" title={model.streams?.ch3?.text}>
                      {model.streams?.ch3?.text}
                    </div>
                  </div>

                  {/* 4 Ch */}
                  <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-lg p-1.5">
                    <div className="text-[10px] text-emerald-400 font-medium">4-Ch Max Stream</div>
                    <div className="font-semibold text-white truncate text-[11px]" title={model.streams?.ch4?.text}>
                      {model.streams?.ch4?.text}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hardware chips */}
              <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {model.sataPorts}
                </span>
                {model.poePorts > 0 && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    ⚡ {model.poePorts} PoE
                  </span>
                )}
                {model.aiFeatures && model.aiFeatures.length > 0 && (
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 truncate max-w-[150px]">
                    🧠 {model.aiFeatures[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 truncate text-[11px]">
                Max Res: <strong className="text-slate-200">{model.maxResolution}</strong>
              </span>
              <button
                onClick={() => onSelectModel(model)}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                Specs
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
