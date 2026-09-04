import React from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

export const NearbyStoresPlaceholder: React.FC = () => {
  return (
    <div className="mt-3.5 px-1 flex flex-col gap-3">
      {/* Mock Search Bar */}
      <div className="flex items-center gap-[10px] h-[46px] rounded-full border border-gray-200 bg-white px-4 shadow-sm">
        <Search className="h-[17px] w-[17px] text-gray-400 shrink-0" />
        <input
          type="text"
          disabled
          placeholder="Search stores nearby..."
          className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-400 placeholder:text-gray-400 cursor-not-allowed"
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-[19px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900">
          Nearby Stores
        </p>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-[#dcd2ff] bg-white px-2.5 py-1 text-[12px] font-semibold text-[#5f2fd1] shadow-[0_1px_2px_rgba(20,14,50,0.04)]"
        >
          <Navigation className="h-3 w-3" />
          <span>Gurugram</span>
        </button>
      </div>

      {/* Branded Empty State matching app.1fi.in */}
      <div className="flex flex-col items-center rounded-[20px] border border-zinc-200/80 bg-white px-6 py-12 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
          <MapPin className="h-7 w-7" />
        </div>
        <h3 className="text-lg font-bold tracking-[-0.015em] text-gray-900">
          No nearby offline stores found
        </h3>
        <p className="mt-2 max-w-[34ch] text-[13.5px] leading-[1.45] text-gray-500">
          Offline checkout financing at local electronics stores will be active soon in your area.
        </p>
      </div>
    </div>
  );
};
