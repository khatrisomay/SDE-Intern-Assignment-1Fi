import React from 'react';
import { CategoryFilter } from '../../types/product';
import {
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Tablet,
  LayoutGrid,
} from 'lucide-react';

interface CategoryFiltersProps {
  activeCategory: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

import { useViewMode } from '../../context/ViewModeContext';

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeCategory,
  onChange,
}) => {
  const { isMobileView } = useViewMode();

  const categories: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'smartphones', label: 'Phones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'wearables', label: 'Wearables', icon: Watch },
    { id: 'tablets', label: 'Tablets', icon: Tablet },
  ];

  return (
    <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar py-1 ${isMobileView ? 'px-0' : 'px-1'}`}>
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`flex items-center transition-all shrink-0 select-none cursor-pointer ${
              isMobileView
                ? 'gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold'
                : 'gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-xs'
            } ${
              isActive
                ? 'bg-[#712CDC] text-white shadow-sm shadow-purple-500/30'
                : 'bg-white border border-gray-200/90 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <Icon className={`${isMobileView ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${isActive ? 'text-white' : 'text-gray-400'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
