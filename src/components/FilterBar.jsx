import React from 'react';
import { Search, Filter, SlidersHorizontal, Table, LayoutGrid, Scale, Calculator } from 'lucide-react';
import { getBrandBadge } from '../utils/brandHelper';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  selectedType,
  setSelectedType,
  selectedChannels,
  setSelectedChannels,
  viewMode,
  setViewMode,
  comparedModels,
  onOpenCompareModal,
  onOpenCalculator
}) {
  const brands = ['ALL', 'Hikvision', 'Dahua', 'IMOU', 'KBVISION'];
  const channelOptions = ['ALL', '4', '8', '16'];
  const typeOptions = [
    { label: 'All Types', value: 'ALL' },
    { label: 'Pure NVR', value: 'NVR' },
    { label: 'Hybrid XVR/DVR', value: 'XVR/DVR' }
  ];

  return (
    <div className="bg-slate-850 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 mb-6 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Search input */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model (e.g. KX-DAi8108, DS-7104NI, NVR4104, N14P)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* View toggles & Quick action tools */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Stream Calculator */}
          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/60 rounded-xl transition-all"
            title="Open Interactive Video Stream Calculator"
          >
            <Calculator className="w-3.5 h-3.5 mr-1.5 text-cyan-400" />
            <span>Stream Simulator</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompareModal}
            disabled={comparedModels.length === 0}
            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
              comparedModels.length > 0
                ? 'bg-blue-600/30 text-blue-300 border-blue-500 hover:bg-blue-600/40'
                : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            <Scale className="w-3.5 h-3.5 mr-1.5" />
            <span>Compare ({comparedModels.length})</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-0.5">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table Matrix View"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Cards Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Brand & Filter tags row */}
      <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Brand buttons */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-slate-400 font-medium mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" />
            Brand:
          </span>
          {brands.map((brand) => {
            const isSelected = selectedBrand === brand;
            const badge = getBrandBadge(brand);
            return (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  isSelected
                    ? brand === 'ALL'
                      ? 'bg-white text-slate-900 font-semibold'
                      : badge.activeBg
                    : 'bg-slate-900/60 text-slate-300 border border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                {brand === 'ALL' ? 'All Brands' : brand}
              </button>
            );
          })}
        </div>

        {/* Secondary filters (Channel Count & Device Type) */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Device Type */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
            >
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Channel Count */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400">Channels:</span>
            <select
              value={selectedChannels}
              onChange={(e) => setSelectedChannels(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Ch</option>
              <option value="4">4-Ch</option>
              <option value="8">8-Ch</option>
              <option value="16">16-Ch</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}
