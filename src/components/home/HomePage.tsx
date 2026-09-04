import React, { useState } from 'react';
import { useViewMode } from '../../context/ViewModeContext';
import { formatINR } from '../../utils/formatters';
import {
  Sparkles,
  ArrowUpRight,
  Search,
  ShieldCheck,
  TrendingUp,
  Zap,
  RotateCcw,
  Tag,
  Clock,
  CheckCircle2,
  X,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigateToShop: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToShop }) => {
  const { isMobileView } = useViewMode();

  // State for Eligibility Modal
  const [showEligibilityModal, setShowEligibilityModal] = useState<boolean>(false);
  const [portfolioValue, setPortfolioValue] = useState<number>(500000);

  const calculatedLimit = Math.round(portfolioValue * 0.8);
  const monthlyEMIPower = Math.round(calculatedLimit / 12);
  const estimatedCompoundingGain = Math.round(portfolioValue * 0.14);

  const showcaseColumns = [
    {
      title: 'Featured Products',
      align: 'text-left',
      items: [
        {
          name: 'Google Pixel 10',
          tenure: '0% interest • 12 months',
          image: 'https://1fi.in/pixel-home-1.webp',
          alt: 'Google Pixel 10',
        },
        {
          name: 'iPhone 17',
          tenure: '0% interest • 12 months',
          image: 'https://1fi.in/iphone17_home.webp',
          alt: 'iPhone 17',
        },
      ],
    },
    {
      title: 'Best Sellers',
      align: 'text-center',
      items: [
        {
          name: 'iPhone 17 Pro Max',
          tenure: '0% interest • Instant approval',
          image: 'https://1fi.in/iphone_pro_home.webp',
          alt: 'iPhone 17 Pro Max',
        },
        {
          name: 'Galaxy S25 Ultra',
          tenure: '0% interest • Instant approval',
          image: 'https://1fi.in/samsungs25_home.webp',
          alt: 'Samsung Galaxy S25 Ultra',
        },
      ],
    },
    {
      title: 'Best Deals',
      align: 'text-right',
      items: [
        {
          name: 'MacBook Pro',
          tenure: '0% interest • 12 months',
          image: 'https://1fi.in/macbook.webp',
          alt: 'MacBook Pro',
        },
        {
          name: 'OnePlus 15',
          tenure: '0% interest • Instant approval',
          image: 'https://1fi.in/oneplus15_home.webp',
          alt: 'OnePlus 15',
        },
      ],
    },
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Choose product & plan',
      desc: 'Pick your favourite device and choose flexible 0% EMI tenures from 3 to 24 months.',
    },
    {
      step: '02',
      title: 'Check your eligibility',
      desc: 'Paperless check in seconds using PAN and phone. Zero CIBIL or credit score needed.',
    },
    {
      step: '03',
      title: 'Pledge mutual funds',
      desc: 'Seamless digital lien via CAMS or KFintech. Your mutual fund units are never sold.',
    },
    {
      step: '04',
      title: 'Delivered to your doorstep',
      desc: 'Receive your brand-new gadget while your investments continue compounding at ~14% CAGR!',
    },
  ];

  const keyBenefits = [
    {
      icon: <Zap className="w-6 h-6 text-[#712CDC]" />,
      title: 'Instant approvals',
      desc: 'Get your approved credit limit in minutes with a 100% digital onboarding process.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#712CDC]" />,
      title: 'Keep earning returns',
      desc: 'Your mutual funds remain invested in your demat account and continue compounding.',
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#712CDC]" />,
      title: 'Zero Downpayment',
      desc: 'Take home high-end smartphones and laptops with ₹0 upfront payment required.',
    },
    {
      icon: <Tag className="w-6 h-6 text-[#712CDC]" />,
      title: '0% interest',
      desc: 'Enjoy authentic 0% No-Cost EMIs backed by your mutual fund portfolio security.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#712CDC]" />,
      title: 'Zero Foreclosure charges',
      desc: 'Pre-close your EMI plan at any point in time with absolutely zero penalty or hidden fees.',
    },
    {
      icon: <Clock className="w-6 h-6 text-[#712CDC]" />,
      title: 'Flexible EMI tenures',
      desc: 'Choose tenures from 3 months up to 24 months to match your financial goals.',
    },
  ];

  return (
    <div className="w-full bg-white text-gray-900 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 lg:pt-16 pb-12 sm:pb-16 bg-gradient-to-b from-[#f7f2ff] via-[#fbf8ff] to-white">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-96 bg-gradient-to-b from-purple-200/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-white/80 backdrop-blur-xs px-1 py-1 shadow-xs mb-6">
            <span className="flex items-center gap-1 rounded-full bg-[#712CDC] text-white px-2.5 py-0.5 text-[11px] font-bold shadow-xs">
              <Sparkles className="w-3 h-3" /> New
            </span>
            <span className="px-2.5 text-xs font-semibold text-gray-800">
              No-cost EMIs backed by mutual funds
            </span>
          </div>

          {/* Main Hero Headline matching 1fi.in */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-black leading-[1.15] max-w-4xl mx-auto">
            <span className="font-black text-gray-950 inline-block">Shop today</span>
            <br />
            <span className="font-light italic text-[#7f7f7f] inline-block font-serif mr-2">
              Pay later
            </span>
            <span className="font-black text-gray-950 inline-block">using</span>
            <br />
            <span className="bg-gradient-to-r from-[#6C28D9] via-[#8c27fc] to-[#a203d5] bg-clip-text text-transparent font-black inline-block">
              mutual funds.
            </span>
          </h1>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {/* Check Eligibility CTA */}
            <button
              type="button"
              onClick={() => setShowEligibilityModal(true)}
              className="flex items-center justify-center font-bold text-sm sm:text-base py-3 px-6 rounded-2xl bg-white border-2 border-[#712CDC] text-[#712CDC] hover:bg-purple-50 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>Check Eligibility</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>

            {/* Start Shopping CTA */}
            <button
              type="button"
              onClick={onNavigateToShop}
              className="flex items-center justify-center font-bold text-sm sm:text-base py-3 px-6 rounded-2xl bg-[#712CDC] hover:bg-[#6023be] text-white shadow-lg shadow-purple-600/25 transition-all cursor-pointer active:scale-95"
            >
              <span>Start Shopping</span>
              <Search className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Value Sub-caption */}
          <p className="mt-5 text-xs sm:text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
            <span>
              No <strong className="font-bold text-gray-900">credit</strong> score required. No{' '}
              <strong className="font-bold text-gray-900">interest</strong>.
            </span>
            <br />
            Fully backed by your <strong className="font-bold text-gray-900">investments</strong>.
          </p>

          {/* ================= 3-COLUMN SHOWCASE CARDS (Exact match to uploaded image) ================= */}
          <div className="mt-12 sm:mt-16">
            <div
              className={`grid ${
                isMobileView ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6'
              } text-left`}
            >
              {showcaseColumns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-3">
                  <h3 className={`text-base sm:text-lg font-bold text-gray-900 px-1 ${col.align}`}>
                    {col.title}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {col.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        onClick={onNavigateToShop}
                        className="group relative flex items-center justify-between p-4 rounded-2xl sm:rounded-3xl bg-[#EFDAFF]/80 hover:bg-[#EFDAFF] border border-[#B3A3BF]/60 border-b-[3px] border-b-[#a38faa] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer overflow-hidden min-h-[105px]"
                      >
                        {/* Left info */}
                        <div className="min-w-0 flex-1 pr-2 z-10">
                          <h4 className="text-sm sm:text-base font-bold text-gray-950 group-hover:text-[#712CDC] transition-colors leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-[11px] font-medium text-gray-600 mt-1">
                            {item.tenure}
                          </p>
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#712CDC] mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            Shop now <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>

                        {/* Right Gadget Image */}
                        <div className="relative w-28 sm:w-32 h-20 flex items-center justify-center shrink-0">
                          <img
                            src={item.image}
                            alt={item.alt}
                            className="max-h-full max-w-full object-contain scale-95 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="py-14 sm:py-20 w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 border-t border-gray-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="inline-block rounded-full border border-gray-300 px-3.5 py-1 text-xs font-semibold text-gray-800 bg-gray-50 mb-3">
              How it Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
              <span className="font-serif italic font-normal text-gray-500">Shop using </span>
              mutual funds <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-gray-500">in </span>
              <span className="bg-gradient-to-r from-[#6C28D9] to-[#a203d5] bg-clip-text text-transparent font-bold">
                4 easy steps
              </span>
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowEligibilityModal(true)}
            className="self-start md:self-auto flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#712CDC] text-white font-bold text-xs sm:text-sm hover:bg-[#6023be] transition-colors cursor-pointer shadow-sm"
          >
            <span>Check Eligibility</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {howItWorksSteps.map((s, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-3xl border border-gray-200 bg-white hover:border-[#712CDC]/40 hover:bg-purple-50/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black bg-gradient-to-b from-[#be7def] to-[#6C28D9] bg-clip-text text-transparent opacity-80 block mb-3 font-mono">
                  {s.step}.
                </span>
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#712CDC] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= KEY ADVANTAGES SECTION ================= */}
      <section className="py-14 sm:py-20 bg-[#faf8ff] border-y border-purple-100/60">
        <div className="w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="inline-block rounded-full border border-purple-200 px-3.5 py-1 text-xs font-semibold text-[#712CDC] bg-purple-50 mb-3">
                Key Benefits
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950">
                <span className="font-serif italic font-normal text-gray-500">The smartest way to </span>
                <br />
                <span className="text-gray-950 font-bold">Spend & </span>
                <span className="bg-gradient-to-r from-[#6C28D9] to-[#a203d5] bg-clip-text text-transparent font-bold">
                  Keep Earning
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={onNavigateToShop}
              className="self-start md:self-auto flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-[#712CDC] bg-white text-[#712CDC] font-bold text-xs sm:text-sm hover:bg-purple-50 transition-colors cursor-pointer shadow-xs"
            >
              <span>Explore 1Fi Marketplace</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyBenefits.map((b, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl border border-gray-200/80 bg-white hover:border-[#712CDC]/30 hover:shadow-md transition-all duration-200 flex flex-col items-start"
              >
                <div className="h-12 w-12 rounded-2xl bg-purple-100/70 flex items-center justify-center mb-4">
                  {b.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">{b.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE ELIGIBILITY MODAL ================= */}
      {showEligibilityModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-[440px] sm:max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl my-auto p-5 sm:p-7 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#712CDC] text-white text-xs font-black">
                  1Fi
                </span>
                <h3 className="text-base font-bold text-gray-900">1Fi Credit Limit Estimator</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEligibilityModal(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Explainer */}
            <p className="text-xs text-gray-600">
              Enter your estimated mutual fund portfolio value (across Groww, Zerodha Coin, Kuvera,
              CAMS, etc.) to calculate your instant shopping credit limit.
            </p>

            {/* Portfolio Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-700">Mutual Fund Investment:</span>
                <span className="text-lg font-black text-[#712CDC]">
                  {formatINR(portfolioValue)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="25000"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#712CDC]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>₹50,000</span>
                <span>₹25,00,000+</span>
              </div>
            </div>

            {/* Computed Calculation Results */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-600 font-medium">Eligible 1Fi Credit Limit:</span>
                <span className="font-extrabold text-sm text-emerald-700">
                  {formatINR(calculatedLimit)} (80% LTV)
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs">
                <span className="text-gray-600 font-medium">Monthly 0% Purchasing Power:</span>
                <span className="font-extrabold text-sm text-[#712CDC]">
                  {formatINR(monthlyEMIPower)} / mo (12M)
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs">
                <span className="text-purple-900 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#712CDC]" />
                  Compounding Gain (~14% p.a.):
                </span>
                <span className="font-black text-sm text-[#712CDC]">
                  +{formatINR(estimatedCompoundingGain)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11.5px] text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> No CIBIL Check • No Unit Sale
              </p>
              <p className="text-gray-600">
                Lien is marked digitally via SEBI-regulated repositories. Your units remain 100%
                yours and continue to grow.
              </p>
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={() => {
                setShowEligibilityModal(false);
                onNavigateToShop();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#712CDC] hover:bg-[#6224c2] text-white font-bold text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Shopping with this Limit</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
