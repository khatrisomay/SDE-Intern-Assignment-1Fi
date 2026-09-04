import React from 'react';
import { Sparkles } from 'lucide-react';

export type ShopOption = 'top-brands' | 'nearby-stores' | 'marketplace';

interface ShopTabsProps {
  activeOption: ShopOption;
  onChange: (option: ShopOption) => void;
}

export const ShopTabs: React.FC<ShopTabsProps> = ({ activeOption, onChange }) => {
  const tabs = [
    { id: 'top-brands' as ShopOption, label: 'Top Brands', badge: null },
    { id: 'nearby-stores' as ShopOption, label: 'Nearby Stores', badge: null },
    { id: 'marketplace' as ShopOption, label: '1Fi Marketplace', badge: 'NEW' },
  ];

  return (
    <div className="relative z-[2] px-1">
      <div
        className="flex gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)]"
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
              className={`relative flex-1 rounded-full py-2.5 px-2 text-center text-[12.5px] sm:text-sm font-semibold tracking-[-0.01em] transition-all duration-200 flex items-center justify-center gap-1 ${
                isActive
                  ? 'bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="truncate">{tab.label}</span>

              {tab.badge && (
                <span
                  className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full leading-tight flex items-center gap-0.5 ${
                    isActive
                      ? 'bg-[#712CDC] text-white'
                      : 'bg-purple-200 text-purple-800'
                  }`}
                >
                  <Sparkles className="w-2 h-2" />
                  {tab.badge}
                </span>
              )}

              {/* Active Underline Pill */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 h-[2.5px] w-5 -translate-x-1/2 rounded-full bg-[#712CDC]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
