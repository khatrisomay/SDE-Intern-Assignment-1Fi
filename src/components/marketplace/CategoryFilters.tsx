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

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeCategory,
  onChange,
}) => {
  const categories: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'smartphones', label: 'Phones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'wearables', label: 'Wearables', icon: Watch },
    { id: 'tablets', label: 'Tablets', icon: Tablet },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onChange(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold tracking-tight transition-all shrink-0 select-none ${
              isActive
                ? 'bg-[#712CDC] text-white shadow-sm shadow-purple-500/20'
                : 'bg-white border border-gray-200/80 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
