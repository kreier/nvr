import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import MetricsCards from './components/MetricsCards';
import StreamMatrixExplainer from './components/StreamMatrixExplainer';
import FilterBar from './components/FilterBar';
import StreamTable from './components/StreamTable';
import StreamCardGrid from './components/StreamCardGrid';
import ModelDetailModal from './components/ModelDetailModal';
import CompareModal from './components/CompareModal';
import StreamCalculator from './components/StreamCalculator';
import AgenticInfoModal from './components/AgenticInfoModal';

import initialModels from './data/nvr-models.json';
import metadata from './data/metadata.json';
import { Bot, Sparkles, Filter, ExternalLink } from 'lucide-react';

export default function App() {
  const [models] = useState(initialModels);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedChannels, setSelectedChannels] = useState('ALL');
  const [viewMode, setViewMode] = useState('table');

  // Modals state
  const [activeModel, setActiveModel] = useState(null);
  const [comparedModels, setComparedModels] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAgenticOpen, setIsAgenticOpen] = useState(false);

  // Quick preset filter
  const [activePreset, setActivePreset] = useState('ALL');

  // Filtering logic
  const filteredModels = useMemo(() => {
    return models.filter((item) => {
      // Brand filter
      if (selectedBrand !== 'ALL' && item.brand.toUpperCase() !== selectedBrand.toUpperCase()) {
        return false;
      }

      // Device Type filter
      if (selectedType !== 'ALL' && item.deviceType !== selectedType) {
        return false;
      }

      // Channels filter
      if (selectedChannels !== 'ALL' && String(item.channelCount) !== selectedChannels) {
        return false;
      }

      // Preset filter
      if (activePreset === '4K') {
        if (!/4K|8MP|8M|12MP/i.test(item.maxResolution)) return false;
      } else if (activePreset === 'POE') {
        if (!item.poePorts || item.poePorts === 0) return false;
      } else if (activePreset === 'EXAMPLES') {
        const exampleTargets = ['KX-DAI8108', 'KX-DAI8104', 'DS-7104NI', 'IDS-7208HQHI', 'DS-7204HGHI', 'DS-7208HGHI'];
        const isMatch = exampleTargets.some(target => item.model.toUpperCase().includes(target));
        if (!isMatch) return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const modelMatch = item.model.toLowerCase().includes(q);
        const brandMatch = item.brand.toLowerCase().includes(q);
        const seriesMatch = (item.series || '').toLowerCase().includes(q);
        const stream1Match = (item.streams?.ch1?.text || '').toLowerCase().includes(q);
        const stream4Match = (item.streams?.ch4?.text || '').toLowerCase().includes(q);
        const notesMatch = (item.notes || '').toLowerCase().includes(q);
        if (!modelMatch && !brandMatch && !seriesMatch && !stream1Match && !stream4Match && !notesMatch) {
          return false;
        }
      }

      return true;
    });
  }, [models, selectedBrand, selectedType, selectedChannels, activePreset, searchQuery]);

  // Comparison toggle handler
  const handleToggleCompare = (model) => {
    setComparedModels((prev) => {
      const exists = prev.some((m) => m.id === model.id);
      if (exists) {
        return prev.filter((m) => m.id !== model.id);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 models simultaneously.');
        return prev;
      }
      return [...prev, model];
    });
  };

  const handleRemoveFromCompare = (model) => {
    setComparedModels((prev) => prev.filter((m) => m.id !== model.id));
  };

  const handleClearCompare = () => {
    setComparedModels([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Sticky Navigation */}
      <Navbar
        models={models}
        onOpenAgenticModal={() => setIsAgenticOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Internet-Scraped CCTV Spec Matrix
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Last synced: {new Date(metadata.lastScraped || Date.now()).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            NVR & XVR Video Stream Overview
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Instant technical overview of maximum concurrent video stream decoding capabilities for <strong>1, 2, 3, and 4 channels</strong> across major manufacturers: <span className="text-red-400 font-semibold">Hikvision</span>, <span className="text-blue-400 font-semibold">Dahua</span>, <span className="text-orange-400 font-semibold">IMOU</span>, and <span className="text-emerald-400 font-semibold">KBVISION</span>.
          </p>

          {/* Quick presets badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Filters:</span>
            <button
              onClick={() => setActivePreset(activePreset === 'EXAMPLES' ? 'ALL' : 'EXAMPLES')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                activePreset === 'EXAMPLES'
                  ? 'bg-cyan-500 text-slate-900 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              ⭐ Featured Example Models (KX-DAi8108, DS-7104NI, etc.)
            </button>
            <button
              onClick={() => setActivePreset(activePreset === '4K' ? 'ALL' : '4K')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                activePreset === '4K'
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              4K Ultra HD Recorders
            </button>
            <button
              onClick={() => setActivePreset(activePreset === 'POE' ? 'ALL' : 'POE')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                activePreset === 'POE'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              Integrated PoE Ports
            </button>
            {activePreset !== 'ALL' && (
              <button
                onClick={() => setActivePreset('ALL')}
                className="text-slate-400 hover:text-white underline text-xs ml-2"
              >
                Reset preset
              </button>
            )}
          </div>
        </div>

        {/* Top Metrics Cards */}
        <MetricsCards
          models={models}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
        />

        {/* Explainer Infographic on 1, 2, 3, 4 Channels */}
        <StreamMatrixExplainer />

        {/* Filter and Search Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedChannels={selectedChannels}
          setSelectedChannels={setSelectedChannels}
          viewMode={viewMode}
          setViewMode={setViewMode}
          comparedModels={comparedModels}
          onOpenCompareModal={() => setIsCompareOpen(true)}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />

        {/* Primary View: Matrix Table or Card Grid */}
        {viewMode === 'table' ? (
          <StreamTable
            models={filteredModels}
            onSelectModel={setActiveModel}
            comparedModels={comparedModels}
            onToggleCompare={handleToggleCompare}
          />
        ) : (
          <StreamCardGrid
            models={filteredModels}
            onSelectModel={setActiveModel}
            comparedModels={comparedModels}
            onToggleCompare={handleToggleCompare}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-slate-200">NVR Stream Spec Hub (Agentic Edition)</div>
            <p className="text-slate-500 mt-0.5">
              Automated surveillance hardware decoding benchmark & specifications directory.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAgenticOpen(true)}
              className="hover:text-cyan-400 flex items-center transition-colors"
            >
              <Bot className="w-3.5 h-3.5 mr-1" />
              Scraper Agent Details
            </button>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="hover:text-blue-400 transition-colors"
            >
              Stream Load Simulator
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModel && (
        <ModelDetailModal
          model={activeModel}
          onClose={() => setActiveModel(null)}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          comparedModels={comparedModels}
          onRemoveFromCompare={handleRemoveFromCompare}
          onClearCompare={handleClearCompare}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {isCalculatorOpen && (
        <StreamCalculator
          models={models}
          initialModel={activeModel || models[0]}
          onClose={() => setIsCalculatorOpen(false)}
        />
      )}

      {isAgenticOpen && (
        <AgenticInfoModal
          onClose={() => setIsAgenticOpen(false)}
        />
      )}

    </div>
  );
}
