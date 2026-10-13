import React from 'react';
import { Eye, Grid2X2, LayoutGrid, MonitorPlay, HelpCircle } from 'lucide-react';

export default function StreamMatrixExplainer() {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800/90 to-slate-900 border border-slate-700/80 rounded-2xl p-5 mb-8 shadow-xl">
      <div className="flex items-center space-x-2 mb-3">
        <HelpCircle className="w-5 h-5 text-cyan-400" />
        <h2 className="text-base font-semibold text-white tracking-wide">
          Understanding NVR Simultaneous Video Stream Decoding Capability
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
        Surveillance recorders (NVRs & hybrid XVR/DVRs) feature hardware SoC video decoders with fixed total pixel-processing bandwidth. 
        When viewing multiple cameras on a monitor or playing back synchronously, maximum stream resolution drops as channel concurrency increases:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1 Channel */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-blue-400 font-semibold mb-1">
              <span className="flex items-center">
                <MonitorPlay className="w-4 h-4 mr-1.5" />
                1-Channel Max Stream
              </span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">Full Single</span>
            </div>
            <p className="text-slate-400">
              The highest single-camera resolution the hardware decoder can output (e.g., <strong>8 MP / 4K</strong> or <strong>6 MP</strong>).
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
            Typical target: <strong>4K UHD or 6MP @ 25/30fps</strong>
          </div>
        </div>

        {/* 2 Channels */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-indigo-400 font-semibold mb-1">
              <span className="flex items-center">
                <Grid2X2 className="w-4 h-4 mr-1.5" />
                2-Channel Max Stream
              </span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px]">Dual Split</span>
            </div>
            <p className="text-slate-400">
              Dual simultaneous streams side-by-side without dropping frames or falling back to sub-stream.
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
            Typical target: <strong>2x 4MP @ 30fps</strong>
          </div>
        </div>

        {/* 3 Channels */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-violet-400 font-semibold mb-1">
              <span className="flex items-center">
                <LayoutGrid className="w-4 h-4 mr-1.5" />
                3-Channel Max Stream
              </span>
              <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono text-[10px]">Tri Split</span>
            </div>
            <p className="text-slate-400">
              Three concurrent high-definition streams sharing the decoding chip budget.
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
            Typical target: <strong>3x 3MP or 1080p @ 30fps</strong>
          </div>
        </div>

        {/* 4 Channels */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
              <span className="flex items-center">
                <LayoutGrid className="w-4 h-4 mr-1.5" />
                4-Channel Max Stream
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">Quad Split</span>
            </div>
            <p className="text-slate-400">
              Standard 2x2 multi-screen matrix or 4-channel synchronous playback stream resolution.
            </p>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
            Typical target: <strong>4x 1080p (2MP) @ 30fps</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
