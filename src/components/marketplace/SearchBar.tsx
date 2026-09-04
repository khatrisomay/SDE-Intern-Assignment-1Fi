import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

import { useViewMode } from '../../context/ViewModeContext';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search iPhones, laptops, electronics on 1Fi...',
}) => {
  const { isMobileView } = useViewMode();

  return (
    <div
      className={`relative flex items-center gap-3 border border-gray-200/90 bg-white shadow-xs focus-within:border-[#712CDC] focus-within:ring-4 focus-within:ring-[#712CDC]/10 transition-all ${
        isMobileView ? 'h-[42px] px-3.5 rounded-full' : 'h-[60px] px-6 rounded-2xl shadow-sm'
      }`}
    >
      <Search
        className={`${isMobileView ? 'h-4 w-4' : 'h-6 w-6'} text-gray-400 shrink-0`}
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className={`flex-1 bg-transparent border-0 outline-none text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 shadow-none font-medium ${
          isMobileView ? 'text-xs' : 'text-base lg:text-lg'
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="shrink-0 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
          <X className={isMobileView ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        </button>
      )}
    </div>
  );
};
