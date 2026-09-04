import React from 'react';
import { Bell, Sparkles, Smartphone, Monitor, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { NavTab } from './BottomNav';
import { useViewMode } from '../../context/ViewModeContext';

interface AppHeaderProps {
  availableLimit?: number;
  activeNavTab?: NavTab;
  onTabChange?: (tab: NavTab) => void;
  isDesktopFrame?: boolean;
  onToggleFrame?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  availableLimit = 352000,
  activeNavTab = 'shop',
  onTabChange,
}) => {
  const { isMobileView, isPhoneSimulator, togglePhoneSimulator } = useViewMode();

  const desktopNavItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'emi-dues', label: 'EMI Dues' },
    { id: 'limit', label: 'Credit Limit' },
    { id: 'profile', label: 'Profile' },
  ];

  // ================= MOBILE HEADER =================
  if (isMobileView) {
    return (
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-3.5 py-2.5">
        <div className="flex items-center justify-between">
          {/* Mobile Logo */}
          <div
            onClick={() => onTabChange?.('home')}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#5300d9] to-[#712CDC] text-white text-xs font-black shadow-xs">
              1Fi
            </span>
            <span className="text-base font-bold text-gray-950">1Fi</span>
            <span className="text-[9.5px] uppercase font-bold tracking-wide px-1.5 py-0.5 rounded-full bg-purple-50 text-[#712CDC] border border-purple-100 flex items-center gap-0.5 ml-0.5">
              <Sparkles className="w-2 h-2" /> LAMF
            </span>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-right leading-none">
              <span className="text-[9px] text-gray-400 font-medium">Limit</span>
              <span className="text-xs font-bold text-[#712CDC] mt-0.5">
                {formatINR(availableLimit)}
              </span>
            </div>

            <button
              type="button"
              className="relative p-1.5 rounded-full text-gray-600 hover:bg-gray-100 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-gray-700" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#712CDC]" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ================= DESKTOP WEB HEADER =================
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 lg:px-10 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Brand Logo */}
        <div
          onClick={() => onTabChange?.('home')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-gray-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5300d9] to-[#712CDC] text-white text-sm font-black shadow-md shadow-purple-600/20">
              1Fi
            </span>
            <span>1Fi</span>
          </div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-[#712CDC] border border-purple-100 flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#712CDC]" /> LAMF Finance
          </span>
        </div>

        {/* Desktop Navigation Links */}
        {onTabChange && (
          <nav className="flex items-center gap-1.5 bg-gray-100/70 p-1.5 rounded-2xl border border-gray-200/60 shadow-inner">
            {desktopNavItems.map((item) => {
              const isActive = activeNavTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#712CDC] shadow-sm font-bold scale-[1.02]'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Desktop Right Controls: Credit Limit, Shop Now & Simulator Toggle */}
        <div className="flex items-center gap-3.5">
          {activeNavTab !== 'shop' && onTabChange && (
            <button
              type="button"
              onClick={() => onTabChange('shop')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#712CDC] text-white font-bold text-xs hover:bg-[#6023be] shadow-sm shadow-purple-600/20 transition-all cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}

          <div className="flex flex-col text-right">
            <span className="text-[11px] text-gray-500 font-medium">Available Credit Limit</span>
            <span className="text-base font-black text-[#712CDC]">
              {formatINR(availableLimit)}
            </span>
          </div>

          {/* Toggle Phone Simulator button */}
          <button
            type="button"
            onClick={togglePhoneSimulator}
            className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-950 px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            {isPhoneSimulator ? (
              <>
                <Monitor className="w-4 h-4 text-[#712CDC]" />
                <span>Full Web View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#712CDC]" />
                <span>Phone Simulator</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors border border-gray-100 cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#712CDC]" />
          </button>
        </div>
      </div>
    </header>
  );
};
