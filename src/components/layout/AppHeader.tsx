import React from 'react';
import { Bell, Sparkles, Smartphone, Monitor } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface AppHeaderProps {
  availableLimit?: number;
  isDesktopFrame: boolean;
  onToggleFrame: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  availableLimit = 352000,
  isDesktopFrame,
  onToggleFrame,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* 1Fi Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-xl tracking-tight text-gray-950">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[#5300d9] to-[#712CDC] text-white text-xs font-black shadow-sm">
              1Fi
            </span>
            <span>1Fi</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-50 text-[#712CDC] border border-purple-100 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> LAMF
          </span>
        </div>

        {/* Portfolio Credit Limit & Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] text-gray-500 font-medium leading-none">Credit Limit</span>
            <span className="text-[13px] font-bold text-[#712CDC] leading-tight">
              {formatINR(availableLimit)}
            </span>
          </div>

          {/* Frame Toggle (Mobile simulator vs Full view) */}
          <button
            type="button"
            onClick={onToggleFrame}
            title={isDesktopFrame ? 'Switch to Full Width View' : 'Switch to Mobile Frame Simulator'}
            className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-full transition-colors"
          >
            {isDesktopFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#712CDC]" />
                <span>Full View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#712CDC]" />
                <span>Phone Frame</span>
              </>
            )}
          </button>

          {/* Notifications button */}
          <button
            type="button"
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-gray-700" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#712CDC]" />
          </button>
        </div>
      </div>
    </header>
  );
};
