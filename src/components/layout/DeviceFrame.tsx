import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  isDesktopFrame: boolean;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, isDesktopFrame }) => {
  if (!isDesktopFrame) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex flex-col w-full antialiased selection:bg-[#712CDC]/10 selection:text-[#712CDC]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-2 sm:p-6 md:p-8">
      {/* Outer Phone Bezel */}
      <div className="relative w-full max-w-[440px] h-[92vh] max-h-[900px] bg-black rounded-[52px] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)_inset] flex flex-col overflow-hidden border-4 border-slate-800">
        
        {/* Phone Glass Inner Screen */}
        <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden flex flex-col">
          
          {/* Status Bar */}
          <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md px-6 pt-2 pb-1.5 flex items-center justify-between text-xs font-semibold text-gray-900 select-none">
            <span>9:41</span>

            {/* Dynamic Island */}
            <div className="h-5 w-24 bg-black rounded-full flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-1.5" />
            </div>

            <div className="flex items-center gap-1.5 text-gray-800">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="w-32 h-1 bg-gray-300 rounded-full mx-auto my-1.5 shrink-0" />
        </div>
      </div>
    </div>
  );
};
