import React, { useState } from 'react';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav, NavTab } from './components/layout/BottomNav';
import { ShopPage } from './components/shop/ShopPage';
import {
  TrendingUp,
  ReceiptIndianRupee,
  ShieldCheck,
  Store,
  ArrowRight,
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation tab state (defaults to 'shop' as requested in assignment)
  const [activeNavTab, setActiveNavTab] = useState<NavTab>('shop');

  // Simulator frame toggle (defaults to false for responsive view, can be toggled to phone frame)
  const [isDesktopFrame, setIsDesktopFrame] = useState<boolean>(false);

  return (
    <DeviceFrame isDesktopFrame={isDesktopFrame}>
      {/* 1Fi Top Navigation Header */}
      <AppHeader
        availableLimit={352000}
        isDesktopFrame={isDesktopFrame}
        onToggleFrame={() => setIsDesktopFrame((prev) => !prev)}
      />

      {/* Main Content View based on Tab */}
      <main className="flex-1 overflow-x-hidden">
        {activeNavTab === 'shop' && <ShopPage />}

        {/* Home Screen Preview */}
        {activeNavTab === 'home' && (
          <div className="p-5 flex flex-col items-center text-center space-y-4 pt-10">
            <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center text-[#712CDC]">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Welcome to 1Fi</h2>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                Unlock 0% interest EMIs on the 1Fi Marketplace using your mutual fund portfolio as security.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveNavTab('shop')}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#712CDC] px-5 py-3 text-xs font-bold text-white shadow-md shadow-purple-600/20"
            >
              <Store className="w-4 h-4" />
              <span>Explore 1Fi Marketplace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* EMI Dues Tab Preview */}
        {activeNavTab === 'emi-dues' && (
          <div className="p-5 space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Your EMI Dues</h2>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                All Up to Date
              </span>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 text-center space-y-2">
              <ReceiptIndianRupee className="w-8 h-8 text-gray-400 mx-auto" />
              <p className="text-sm font-bold text-gray-900">No active dues pending</p>
              <p className="text-xs text-gray-500">
                Purchase your first gadget on 1Fi Marketplace to view installment schedules here.
              </p>
              <button
                type="button"
                onClick={() => setActiveNavTab('shop')}
                className="mt-2 text-xs font-bold text-[#712CDC] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Products</span> →
              </button>
            </div>
          </div>
        )}

        {/* Limit Tab Preview */}
        {activeNavTab === 'limit' && (
          <div className="p-5 space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Credit Limit & Holdings</h2>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#712CDC] to-[#8c27fc] text-white p-5 space-y-3 shadow-lg">
              <span className="text-[11px] font-semibold text-purple-200 uppercase tracking-wider">
                Total Available Limit
              </span>
              <h3 className="text-3xl font-black">₹3,52,000</h3>
              <p className="text-xs text-purple-100">
                Backed by ₹4,40,900 across 4 mutual funds (CAMS & KFintech verified).
              </p>
            </div>
          </div>
        )}

        {/* Profile Tab Preview */}
        {activeNavTab === 'profile' && (
          <div className="p-5 space-y-4 pt-6 text-center">
            <div className="h-16 w-16 rounded-full bg-purple-100 text-[#712CDC] mx-auto flex items-center justify-center font-bold text-xl">
              SK
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Somay Khatri</h3>
              <p className="text-xs text-gray-500">somay.khatri@example.com • +91 98765 43210</p>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> KYC & CAMS Verified
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav
        activeTab={activeNavTab}
        onTabChange={setActiveNavTab}
      />
    </DeviceFrame>
  );
};

export default App;
