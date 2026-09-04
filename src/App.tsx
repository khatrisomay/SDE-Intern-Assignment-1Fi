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
        activeNavTab={activeNavTab}
        onTabChange={setActiveNavTab}
      />

      {/* Main Content View based on Tab */}
      <main className="flex-1 overflow-x-hidden w-full">
        {activeNavTab === 'shop' && <ShopPage />}

        {/* Home Screen Preview */}
        {activeNavTab === 'home' && (
          <div className="max-w-3xl mx-auto p-5 sm:p-8 flex flex-col items-center text-center space-y-4 pt-10 sm:pt-16">
            <div className="h-16 w-16 rounded-3xl bg-purple-100 flex items-center justify-center text-[#712CDC]">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome to 1Fi</h2>
              <p className="text-sm text-gray-500 mt-2 max-w-md">
                Unlock 0% interest EMIs on the 1Fi Marketplace using your mutual fund portfolio as security.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveNavTab('shop')}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#712CDC] hover:bg-[#6023be] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-600/20 transition-all hover:scale-105"
            >
              <Store className="w-4 h-4" />
              <span>Explore 1Fi Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* EMI Dues Tab Preview */}
        {activeNavTab === 'emi-dues' && (
          <div className="max-w-3xl mx-auto p-5 sm:p-8 space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Your EMI Dues</h2>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                All Up to Date
              </span>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 text-center space-y-3 shadow-xs">
              <ReceiptIndianRupee className="w-10 h-10 text-gray-400 mx-auto" />
              <p className="text-base font-bold text-gray-900">No active dues pending</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Purchase your first gadget on 1Fi Marketplace to view installment schedules here.
              </p>
              <button
                type="button"
                onClick={() => setActiveNavTab('shop')}
                className="mt-3 text-xs font-bold text-[#712CDC] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Marketplace</span> →
              </button>
            </div>
          </div>
        )}

        {/* Limit Tab Preview */}
        {activeNavTab === 'limit' && (
          <div className="max-w-3xl mx-auto p-5 sm:p-8 space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Credit Limit & Holdings</h2>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#712CDC] via-[#8232e8] to-[#9c4cfb] text-white p-6 sm:p-8 space-y-4 shadow-xl shadow-purple-900/10">
              <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                Total Available Limit
              </span>
              <h3 className="text-4xl sm:text-5xl font-black">₹3,52,000</h3>
              <p className="text-xs sm:text-sm text-purple-100 max-w-lg">
                Backed by ₹4,40,900 across 4 mutual funds (CAMS & KFintech verified). Zero liquidations.
              </p>
            </div>
          </div>
        )}

        {/* Profile Tab Preview */}
        {activeNavTab === 'profile' && (
          <div className="max-w-xl mx-auto p-5 sm:p-8 space-y-5 pt-6 text-center">
            <div className="h-20 w-20 rounded-full bg-purple-100 text-[#712CDC] mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
              SK
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Somay Khatri</h3>
              <p className="text-xs text-gray-500 mt-1">somaykhatri6555@gmail.com • +91 9306394891</p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" /> KYC & CAMS Verified
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
