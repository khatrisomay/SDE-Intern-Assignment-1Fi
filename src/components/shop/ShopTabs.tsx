import React from 'react';
import { Sparkles } from 'lucide-react';
import { useViewMode } from '../../context/ViewModeContext';

export type ShopOption = 'top-brands' | 'nearby-stores' | 'marketplace';

interface ShopTabsProps {
  activeOption: ShopOption;
  onChange: (option: ShopOption) => void;
}

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeOption, onChange }) => {
  const { isMobileView } = useViewMode();

  const tabs = [
    { id: 'top-brands' as ShopOption, label: 'Top Brands', badge: null },
    { id: 'nearby-stores' as ShopOption, label: 'Nearby Stores', badge: null },
    { id: 'marketplace' as ShopOption, label: '1Fi Marketplace', badge: 'NEW' },
  ];

  return (
    <div className={`relative z-[2] ${isMobileView ? 'px-0' : 'px-1 max-w-2xl mx-auto'}`}>
      <div
        className={`flex gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff] ${
          isMobileView ? 'p-1' : 'p-2'
        } shadow-[0_1px_3px_rgba(113,44,220,0.06)]`}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeOption === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={`relative flex-1 rounded-full ${
                isMobileView ? 'py-2 px-1.5 text-[11.5px]' : 'py-3 px-4 text-sm'
              } font-bold tracking-tight transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-white text-[#712CDC] shadow-[0_1px_4px_rgba(20,14,50,0.12),0_0_0_1px_rgba(113,44,220,0.10)]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className="truncate">{tab.label}</span>

              {tab.badge && (
                <span
                  className={`${
                    isMobileView ? 'text-[8.5px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'
                  } font-black uppercase rounded-full leading-tight flex items-center gap-0.5 ${
                    isActive
                      ? 'bg-[#712CDC] text-white'
                      : 'bg-purple-200 text-purple-800'
                  }`}
                >
                  <Sparkles className={isMobileView ? 'w-2 h-2' : 'w-2.5 h-2.5'} />
                  {tab.badge}
                </span>
              )}

              {/* Active Underline Pill */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 h-[2.5px] w-6 -translate-x-1/2 rounded-full bg-[#712CDC]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
