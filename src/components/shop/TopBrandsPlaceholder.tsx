import React from 'react';
import { Search, Sparkles, Store } from 'lucide-react';

export const TopBrandsPlaceholder: React.FC = () => {
  return (
    <div className="mt-3.5 px-1 flex flex-col gap-3">
      {/* Mock Search Bar matching app.1fi.in */}
      <div className="flex items-center gap-[10px] h-[46px] rounded-full border border-gray-200 bg-white px-4 shadow-sm">
        <Search className="h-[17px] w-[17px] text-gray-400 shrink-0" />
        <input
          type="text"
          disabled
          placeholder="Search online brands..."
          className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-400 placeholder:text-gray-400 cursor-not-allowed"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-[19px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">
          Top Brands
        </p>
        <span className="text-[11px] font-medium text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
          Coming Soon
        </span>
      </div>

      {/* Branded Empty State matching app.1fi.in */}
      <div className="flex flex-col items-center rounded-[20px] border border-zinc-200/80 bg-white px-6 py-12 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
          <Store className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold tracking-[-0.015em] text-gray-900">
          Online brand stores are coming soon
        </h3>
        <p className="mt-2 max-w-[34ch] text-[13.5px] leading-[1.45] text-gray-500">
          No-cost EMIs on direct partner brand websites will arrive in a future update. Explore the{' '}
          <strong className="text-[#712CDC]">1Fi Marketplace</strong> tab for instant products.
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
          <Sparkles className="w-3.5 h-3.5 text-[#712CDC]" />
          <span>Switch to 1Fi Marketplace above to shop now</span>
        </div>
      </div>
    </div>
  );
};
