import React from 'react';
import {
  House,
  Store,
  ReceiptIndianRupee,
  ChartNoAxesCombined,
  User,
} from 'lucide-react';

import { useViewMode } from '../../context/ViewModeContext';

export type NavTab = 'home' | 'shop' | 'emi-dues' | 'limit' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const { isMobileView } = useViewMode();

  if (!isMobileView) {
    return null;
  }

  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: House },
    { id: 'shop' as NavTab, label: 'Shop', icon: Store },
    { id: 'emi-dues' as NavTab, label: 'EMI Dues', icon: ReceiptIndianRupee },
    { id: 'limit' as NavTab, label: 'Limit', icon: ChartNoAxesCombined },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="mx-auto flex max-w-[440px] items-stretch rounded-[28px] bg-white border border-gray-200/70 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset] pointer-events-auto backdrop-blur-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-1.5 text-center transition-all duration-200 ${
                isActive ? 'text-[#712CDC]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {/* Active Purple Top Pill Line */}
              {isActive && (
                <>
                  <span
                    className="absolute left-1/2 -top-[3px] h-[3px] w-7 -translate-x-1/2 rounded-full bg-[#712CDC]"
                    aria-hidden="true"
                  />
                  <span
                    className="absolute inset-1 rounded-[14px] opacity-60"
                    style={{
                      background:
                        'radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.14) 0%, transparent 70%)',
                    }}
                    aria-hidden="true"
                  />
                </>
              )}

              <Icon
                className={`relative h-[20px] w-[20px] transition-transform duration-200 group-active:scale-90 ${
                  isActive
                    ? 'stroke-[2.2] drop-shadow-[0_0_6px_rgba(113,44,220,0.3)]'
                    : 'stroke-[1.75]'
                }`}
                aria-hidden="true"
              />

              <span
                className={`relative max-w-full truncate text-[10px] tracking-tight ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
