import React, { useState, useEffect } from 'react';
import { TopBrand } from '../../types/store';
import { apiService } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { useViewMode } from '../../context/ViewModeContext';
import confetti from 'canvas-confetti';
import {
  Search,
  Sparkles,
  Zap,
  ArrowUpRight,
  CreditCard,
  X,
  CheckCircle2,
  ShieldCheck,
  Tag,
  Loader2,
} from 'lucide-react';

export const TopBrandsView: React.FC = () => {
  const { isMobileView } = useViewMode();
  const [brands, setBrands] = useState<TopBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Selected brand for virtual card generation
  const [activeBrand, setActiveBrand] = useState<TopBrand | null>(null);
  const [cardLimit, setCardLimit] = useState<number>(50000);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedCard, setGeneratedCard] = useState<{
    voucherCode: string;
    validTill: string;
    maxLimit: number;
    tenure: string;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    apiService.getTopBrands(searchQuery, selectedCategory).then((data) => {
      setBrands(data);
      setLoading(false);
    });
  }, [searchQuery, selectedCategory]);

  const handleGenerateCard = async () => {
    if (!activeBrand) return;
    setIsGenerating(true);
    const result = await apiService.generateBrandVoucher(activeBrand.id, cardLimit);
    setGeneratedCard(result);
    setIsGenerating(false);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#712CDC', '#8c27fc', '#10B981'],
    });
  };

  const categories = [
    { id: 'all', label: 'All Brands' },
    { id: 'smartphones', label: 'Smartphones' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'audio', label: 'Audio' },
    { id: 'appliances', label: 'Appliances' },
  ];

  return (
    <div className={`flex flex-col ${isMobileView ? 'gap-3' : 'gap-5'}`}>
      {/* Search Bar */}
      <div
        className={`relative flex items-center gap-2.5 ${
          isMobileView ? 'h-[42px] px-3.5' : 'h-[52px] px-5 rounded-2xl'
        } rounded-full border border-gray-200/90 bg-white shadow-[0_2px_8px_rgba(20,14,50,0.04)]`}
      >
        <Search className={`${isMobileView ? 'h-4 w-4' : 'h-5 w-5'} text-gray-400 shrink-0`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Apple, Samsung, Croma, boAt..."
          className={`flex-1 bg-transparent border-0 outline-none ${
            isMobileView ? 'text-xs' : 'text-base'
          } text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 shadow-none font-medium`}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-full font-bold tracking-tight transition-all shrink-0 cursor-pointer ${
              isMobileView ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
            } ${
              selectedCategory === cat.id
                ? 'bg-[#712CDC] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Value Prop Banner */}
      <div
        className={`flex items-center justify-between rounded-2xl bg-gradient-to-r from-purple-50 via-[#fbf8ff] to-purple-50 ${
          isMobileView ? 'p-3' : 'p-4'
        } border border-purple-100/80`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className={`${isMobileView ? 'w-4 h-4' : 'w-5 h-5'} text-[#712CDC]`} />
          <span className={`${isMobileView ? 'text-xs' : 'text-sm'} font-bold text-gray-900`}>
            D2C & Online Brand Financing
          </span>
        </div>
        <span
          className={`${
            isMobileView ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'
          } font-bold text-[#712CDC] uppercase bg-white rounded-full border border-purple-100`}
        >
          0% Interest Card
        </span>
      </div>

      {/* Brands List */}
      {loading ? (
        <div
          className={
            isMobileView
              ? 'grid grid-cols-1 gap-3'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
          }
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className={`${isMobileView ? 'h-32' : 'h-40'} rounded-2xl bg-white border border-gray-100 p-4 animate-pulse`}
            />
          ))}
        </div>
      ) : brands.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
          <p className="text-sm font-bold text-gray-800">No partner brands found</p>
          <p className="text-xs text-gray-500 mt-1">Try searching for a different brand name.</p>
        </div>
      ) : (
        <div
          className={
            isMobileView
              ? 'grid grid-cols-1 gap-3'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
          }
        >
          {brands.map((brand) => (
            <div
              key={brand.id}
              className={`group rounded-2xl border border-zinc-200/90 bg-white ${
                isMobileView ? 'p-3.5 gap-2.5' : 'p-5 gap-3.5'
              } shadow-sm hover:shadow-md hover:border-[#712CDC]/40 transition-all duration-200 flex flex-col justify-between`}
            >
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`${
                      isMobileView ? 'h-10 w-10 p-1.5' : 'h-14 w-14 p-2'
                    } rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0`}
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3
                      className={`${
                        isMobileView ? 'text-xs' : 'text-base'
                      } font-bold text-gray-950 group-hover:text-[#712CDC] transition-colors leading-tight`}
                    >
                      {brand.name}
                    </h3>
                    <span
                      className={`${
                        isMobileView ? 'text-[9.5px]' : 'text-xs'
                      } uppercase font-bold text-gray-400 tracking-wider`}
                    >
                      {brand.category}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveBrand(brand);
                    setGeneratedCard(null);
                  }}
                  className={`flex items-center gap-1 font-bold text-[#712CDC] bg-purple-50 hover:bg-purple-100 border border-purple-100 ${
                    isMobileView ? 'px-2.5 py-1.5 text-[11px] rounded-lg' : 'px-3.5 py-2 text-xs rounded-xl'
                  } transition-colors cursor-pointer shrink-0`}
                >
                  <CreditCard className={isMobileView ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
                  <span>Shop with 1Fi</span>
                </button>
              </div>

              {/* Offer strip */}
              <div
                className={`flex items-center gap-1.5 text-emerald-800 bg-emerald-50/80 rounded-xl ${
                  isMobileView ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-2 text-xs'
                } border border-emerald-100/60`}
              >
                <Tag className={`${isMobileView ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-emerald-600 shrink-0`} />
                <span className="font-semibold leading-tight">{brand.cashbackOffer}</span>
              </div>

              {/* Popular tags & features */}
              <div
                className={`flex items-center justify-between ${
                  isMobileView ? 'text-[10px] pt-2' : 'text-xs pt-3'
                } text-gray-500 border-t border-gray-50`}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-gray-400 font-medium">Popular:</span>
                  {brand.popularItems.slice(0, isMobileView ? 2 : 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <span className="text-[#712CDC] font-bold shrink-0 flex items-center gap-0.5">
                  <Zap className="w-3 h-3 fill-current" /> {brand.maxNoCostTenure}M 0% EMI
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive 1Fi Virtual Card Generation Modal */}
      {activeBrand && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-[440px] sm:max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl my-auto p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <img
                  src={activeBrand.logo}
                  alt={activeBrand.name}
                  className="h-6 w-6 object-contain"
                />
                <h3 className="text-sm font-bold text-gray-900">
                  {activeBrand.name} • 1Fi Instant Checkout
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveBrand(null)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Virtual Card Graphic */}
            <div className="relative h-44 w-full rounded-2xl bg-gradient-to-tr from-[#5300d9] via-[#712CDC] to-[#9235fc] text-white p-4 shadow-xl flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
              <div className="flex justify-between items-center">
                <span className="font-black tracking-wider text-sm">1Fi Instant LAMF Card</span>
                <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded backdrop-blur-xs">
                  {activeBrand.name} Partner
                </span>
              </div>

              <div>
                <span className="text-[10px] text-purple-200 uppercase font-semibold">
                  Card Limit
                </span>
                <p className="text-2xl font-black">{formatINR(cardLimit)}</p>
                <p className="font-mono text-xs text-purple-200 tracking-widest mt-1">
                  {generatedCard ? generatedCard.voucherCode : '•••• •••• •••• 1FI9'}
                </p>
              </div>

              <div className="flex justify-between items-end text-[10px] text-purple-200">
                <span>Pledged via Mutual Funds</span>
                <span className="font-bold text-white">0% No-Cost EMI</span>
              </div>
            </div>

            {!generatedCard ? (
              <>
                {/* Limit Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>Desired Card Limit:</span>
                    <span className="text-[#712CDC]">{formatINR(cardLimit)}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="150000"
                    step="5000"
                    value={cardLimit}
                    onChange={(e) => setCardLimit(Number(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#712CDC]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>₹10,000</span>
                    <span>Max ₹1,50,000 (Based on your MF units)</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-xs text-purple-900 space-y-1">
                  <p className="font-semibold flex items-center gap-1 text-[#712CDC]">
                    <ShieldCheck className="w-3.5 h-3.5" /> How this works:
                  </p>
                  <p className="text-[11px] text-gray-600">
                    1Fi generates a 1-time virtual card for <strong>{activeBrand.name}</strong>'s official website. Your purchase will automatically convert to a 12-month 0% EMI backed by your portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateCard}
                  className="w-full py-3 px-4 rounded-xl bg-[#712CDC] hover:bg-[#6224c2] text-white font-bold text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating 1Fi Card...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Generate Instant 1Fi Card</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="space-y-3 text-center pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Card Successfully Activated</span>
                </div>

                <p className="text-xs text-gray-600">
                  Use code <strong className="font-mono text-[#712CDC] font-bold">{generatedCard.voucherCode}</strong> at checkout on{' '}
                  <strong>{activeBrand.name}</strong>.
                </p>

                <div className="flex gap-2 pt-2">
                  <a
                    href={activeBrand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#712CDC] text-white font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#6224c2]"
                  >
                    <span>Visit {activeBrand.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveBrand(null)}
                    className="py-2.5 px-4 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
