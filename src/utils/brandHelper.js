export function getBrandBadge(brand) {
  switch (brand?.toUpperCase()) {
    case 'HIKVISION':
      return {
        bg: 'bg-red-500/10 text-red-400 border-red-500/30',
        activeBg: 'bg-red-600 text-white border-red-600',
        dot: 'bg-red-500',
        border: 'border-red-500/40',
        tag: 'Hikvision',
        color: '#ef4444'
      };
    case 'DAHUA':
      return {
        bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        activeBg: 'bg-blue-600 text-white border-blue-600',
        dot: 'bg-blue-500',
        border: 'border-blue-500/40',
        tag: 'Dahua',
        color: '#3b82f6'
      };
    case 'IMOU':
      return {
        bg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
        activeBg: 'bg-orange-600 text-white border-orange-600',
        dot: 'bg-orange-500',
        border: 'border-orange-500/40',
        tag: 'IMOU',
        color: '#f97316'
      };
    case 'KBVISION':
      return {
        bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        activeBg: 'bg-emerald-600 text-white border-emerald-600',
        dot: 'bg-emerald-500',
        border: 'border-emerald-500/40',
        tag: 'KBVISION',
        color: '#10b981'
      };
    default:
      return {
        bg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
        activeBg: 'bg-slate-600 text-white border-slate-600',
        dot: 'bg-slate-500',
        border: 'border-slate-500/40',
        tag: brand || 'Other',
        color: '#94a3b8'
      };
  }
}
