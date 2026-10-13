import React, { useState } from 'react';
import { X, ExternalLink, HardDrive, Zap, Cpu, CheckCircle, Code, ShieldCheck, Share2 } from 'lucide-react';
import { getBrandBadge } from '../utils/brandHelper';

export default function ModelDetailModal({ model, onClose }) {
  const [showJson, setShowJson] = useState(false);

  if (!model) return null;

  const brandBadge = getBrandBadge(model.brand);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-start justify-between bg-slate-850 bg-slate-800/40">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider border ${brandBadge.bg}`}>
                {model.brand}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {model.channelCount} Channels • {model.deviceType}
              </span>
            </div>
            <h2 className="text-xl font-bold font-mono text-white tracking-tight">
              {model.model}
            </h2>
            <p className="text-xs text-slate-400">{model.series}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Stream Decoding Matrix Section */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <h3 className="font-semibold text-slate-200 mb-3 flex items-center">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2"></span>
              Simultaneous Video Stream Capabilities (1, 2, 3, 4 Channels)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-blue-950/30 border border-blue-900/40 rounded-lg p-2.5">
                <span className="text-[11px] text-blue-400 font-semibold block mb-0.5">
                  1-Channel Maximum Stream
                </span>
                <span className="text-sm font-bold text-white">
                  {model.streams?.ch1?.text || 'N/A'}
                </span>
              </div>

              <div className="bg-indigo-950/30 border border-indigo-900/40 rounded-lg p-2.5">
                <span className="text-[11px] text-indigo-400 font-semibold block mb-0.5">
                  2-Channel Maximum Stream
                </span>
                <span className="text-sm font-bold text-white">
                  {model.streams?.ch2?.text || 'N/A'}
                </span>
              </div>

              <div className="bg-violet-950/30 border border-violet-900/40 rounded-lg p-2.5">
                <span className="text-[11px] text-violet-400 font-semibold block mb-0.5">
                  3-Channel Maximum Stream
                </span>
                <span className="text-sm font-bold text-white">
                  {model.streams?.ch3?.text || 'N/A'}
                </span>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-lg p-2.5">
                <span className="text-[11px] text-emerald-400 font-semibold block mb-0.5">
                  4-Channel Maximum Stream
                </span>
                <span className="text-sm font-bold text-white">
                  {model.streams?.ch4?.text || 'N/A'}
                </span>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-300 bg-slate-900/90 rounded-lg p-2 border border-slate-800">
              <span className="text-slate-400 font-medium">Total Decoding Benchmark: </span>
              <strong>{model.totalDecodingCapacity}</strong>
            </div>
          </div>

          {/* Core Hardware & Bandwidth Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">Incoming Bandwidth</span>
              <span className="font-semibold text-white">{model.incomingBandwidth || 'N/A'}</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">Max Resolution</span>
              <span className="font-semibold text-white">{model.maxResolution || 'N/A'}</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">SATA Storage</span>
              <span className="font-semibold text-white">{model.sataPorts || 'N/A'}</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3">
              <span className="text-[11px] text-slate-400 block mb-1">PoE Interfaces</span>
              <span className="font-semibold text-white">
                {model.poePorts > 0 ? `${model.poePorts}x RJ-45 PoE` : 'None (Separate switch)'}
              </span>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-3 col-span-2 sm:col-span-2">
              <span className="text-[11px] text-slate-400 block mb-1">Video Display Outputs</span>
              <span className="font-semibold text-white">
                {(model.videoOutputs || []).join(' • ') || 'HDMI / VGA'}
              </span>
            </div>
          </div>

          {/* Video Compression */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Supported Codecs & Compression
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(model.compression || []).map((c, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* AI Analytics & Features */}
          {model.aiFeatures && model.aiFeatures.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Smart Analytics & AI Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {model.aiFeatures.map((feat, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-950/30 border border-purple-800/40 text-purple-300 text-xs">
                    <CheckCircle className="w-3.5 h-3.5 mr-1 text-purple-400" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Engineering notes */}
          {model.notes && (
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-xs text-slate-300">
              <strong className="text-slate-200">Engineering Notes: </strong>
              {model.notes}
            </div>
          )}

          {/* Raw JSON viewer toggle */}
          <div>
            <button
              onClick={() => setShowJson(!showJson)}
              className="inline-flex items-center text-xs text-slate-400 hover:text-slate-200"
            >
              <Code className="w-3.5 h-3.5 mr-1" />
              {showJson ? 'Hide Raw JSON Schema' : 'Inspect Raw JSON Schema'}
            </button>
            {showJson && (
              <pre className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                {JSON.stringify(model, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-850 bg-slate-800/30 flex items-center justify-between">
          {model.sourceUrl ? (
            <a
              href={model.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Manufacturer Datasheet / Product Page
            </a>
          ) : (
            <span className="text-xs text-slate-500">Datasheet verified via catalog index</span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
