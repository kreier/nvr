import React, { useState } from 'react';
import { X, Calculator, AlertTriangle, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { getBrandBadge } from '../utils/brandHelper';

// Map common CCTV stream resolutions to Megapixels
const RESOLUTION_MP = {
  '8MP (4K)': 8.29,
  '6MP': 6.0,
  '5MP': 5.0,
  '4MP': 4.0,
  '3MP': 3.0,
  '1080p (2MP)': 2.07,
  '720p (1MP)': 0.92,
  'Off': 0
};

export default function StreamCalculator({ models, initialModel, onClose }) {
  const [selectedId, setSelectedId] = useState(initialModel?.id || models[0]?.id);
  const selectedModel = models.find(m => m.id === selectedId) || models[0];

  // Selected resolution for channels 1, 2, 3, 4
  const [ch1Res, setCh1Res] = useState('4MP');
  const [ch2Res, setCh2Res] = useState('1080p (2MP)');
  const [ch3Res, setCh3Res] = useState('1080p (2MP)');
  const [ch4Res, setCh4Res] = useState('1080p (2MP)');

  // Estimate maximum hardware decoding budget in Megapixels
  const getHardwareDecodingLimitMP = (model) => {
    if (/32MP|160 Mbps|NVR5216/i.test(model.incomingBandwidth + model.model)) return 32;
    if (/4K|8MP|NVR41|C4K/i.test(model.maxResolution + model.model)) return 8.5; // ~4x 1080p or 2x 4MP or 1x 8MP
    if (/6MP|DAi|DS-7104NI/i.test(model.maxResolution + model.model)) return 8.2;
    if (/5MP/i.test(model.maxResolution)) return 6.0;
    if (/HGHI|1080p Lite/i.test(model.model + model.series)) return 4.5;
    return 8.0;
  };

  const limitMP = getHardwareDecodingLimitMP(selectedModel);
  const currentTotalMP = (
    (RESOLUTION_MP[ch1Res] || 0) +
    (RESOLUTION_MP[ch2Res] || 0) +
    (RESOLUTION_MP[ch3Res] || 0) +
    (RESOLUTION_MP[ch4Res] || 0)
  );

  const usagePercent = Math.min(Math.round((currentTotalMP / limitMP) * 100), 160);
  const isOverloaded = currentTotalMP > limitMP;

  const resOptions = Object.keys(RESOLUTION_MP);
  const brandBadge = getBrandBadge(selectedModel.brand);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/40">
          <div className="flex items-center space-x-2.5">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Interactive Stream Load Simulator</h2>
              <p className="text-xs text-slate-400">Calculate 1, 2, 3, 4 channel decoding load in real time</p>
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
        <div className="p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Model selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Surveillance Recorder Model:
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
            >
              {models.map((m) => (
                <option key={m.id} value={m.id}>
                  [{m.brand}] {m.model} — Max: {m.maxResolution} ({m.channelCount} Ch, {m.incomingBandwidth})
                </option>
              ))}
            </select>
          </div>

          {/* Model Active Limits banner */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${brandBadge.bg}`}>
                {selectedModel.brand}
              </span>
              <span className="font-mono font-bold text-white">{selectedModel.model}</span>
              <span className="text-slate-400">({selectedModel.deviceType})</span>
            </div>
            <div className="text-slate-300">
              Decoding Ceiling: <strong className="text-cyan-400">~{limitMP} Megapixels / frame cycle</strong>
            </div>
          </div>

          {/* Channel Resolution Selectors (1, 2, 3, 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Ch 1 */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <label className="block text-xs font-semibold text-blue-400 mb-1">
                Channel 1 (Main Stream)
              </label>
              <select
                value={ch1Res}
                onChange={(e) => setCh1Res(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-blue-500"
              >
                {resOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Model rated max: {selectedModel.streams?.ch1?.text}
              </span>
            </div>

            {/* Ch 2 */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <label className="block text-xs font-semibold text-indigo-400 mb-1">
                Channel 2 (Dual Stream)
              </label>
              <select
                value={ch2Res}
                onChange={(e) => setCh2Res(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                {resOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Model rated max: {selectedModel.streams?.ch2?.text}
              </span>
            </div>

            {/* Ch 3 */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <label className="block text-xs font-semibold text-violet-400 mb-1">
                Channel 3 (Tri Stream)
              </label>
              <select
                value={ch3Res}
                onChange={(e) => setCh3Res(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-violet-500"
              >
                {resOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Model rated max: {selectedModel.streams?.ch3?.text}
              </span>
            </div>

            {/* Ch 4 */}
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <label className="block text-xs font-semibold text-emerald-400 mb-1">
                Channel 4 (Quad Stream)
              </label>
              <select
                value={ch4Res}
                onChange={(e) => setCh4Res(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                {resOptions.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Model rated max: {selectedModel.streams?.ch4?.text}
              </span>
            </div>
          </div>

          {/* Decoding Budget Gauge */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-slate-300">Total Concurrent Decoding Load</span>
              <span className={`font-mono font-bold ${isOverloaded ? 'text-red-400' : 'text-emerald-400'}`}>
                {currentTotalMP.toFixed(2)} MP / {limitMP} MP ({usagePercent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverloaded
                    ? 'bg-gradient-to-r from-red-600 to-rose-500'
                    : usagePercent > 80
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                }`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              ></div>
            </div>

            {/* Status Feedback Message */}
            <div className="mt-3">
              {isOverloaded ? (
                <div className="flex items-start space-x-2 text-xs text-rose-300 bg-rose-950/30 border border-rose-900/50 rounded-lg p-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>SoC Decoding Overload:</strong> This simultaneous configuration ({currentTotalMP.toFixed(1)} MP) exceeds the recorder's hardware processing budget ({limitMP} MP). In live split-view or synchronous playback, secondary channels will automatically drop to sub-stream (CIF / 720p).
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-2 text-xs text-emerald-300 bg-emerald-950/30 border border-emerald-900/50 rounded-lg p-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Optimal Configuration:</strong> Hardware SoC can smoothly decode and display all 4 streams simultaneously at high frame rate without frame skipping or resolution downscaling.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Simulator
          </button>
        </div>

      </div>
    </div>
  );
}
