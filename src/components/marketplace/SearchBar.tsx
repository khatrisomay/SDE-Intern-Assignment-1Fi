import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search iPhones, laptops, electronics on 1Fi...',
}) => {
  return (
    <div className="relative flex items-center gap-2.5 h-[46px] rounded-full border border-gray-200/90 bg-white px-4 shadow-[0_2px_8px_rgba(20,14,50,0.04)] focus-within:border-[#712CDC] focus-within:ring-2 focus-within:ring-[#712CDC]/10 transition-all">
      <Search className="h-[17px] w-[17px] text-gray-400 shrink-0" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 shadow-none font-medium"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
