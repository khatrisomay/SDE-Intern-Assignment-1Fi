import React, { useState } from 'react';
import { ShopTabs, ShopOption } from './ShopTabs';
import { TopBrandsView } from './TopBrandsView';
import { NearbyStoresView } from './NearbyStoresView';
import { SearchBar } from '../marketplace/SearchBar';
import { CategoryFilters } from '../marketplace/CategoryFilters';
import { ProductGrid } from '../marketplace/ProductGrid';
import { ProductDetailModal } from '../pdp/ProductDetailModal';
import { CheckoutModal } from '../checkout/CheckoutModal';
import { useProducts } from '../../hooks/useProducts';
import { Product, ProductVariant } from '../../types/product';
import { EMIPlan } from '../../types/emi';
import { Sparkles, SlidersHorizontal, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

import { useViewMode } from '../../context/ViewModeContext';

export const ShopPage: React.FC = () => {
  const { isMobileView } = useViewMode();

  // Active Shop tab: defaults to 1Fi Marketplace to showcase the new flagship feature!
  const [shopOption, setShopOption] = useState<ShopOption>('marketplace');

  // Products hook
  const {
    products,
    loading,
    error,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    refetch,
  } = useProducts();

  // Selected product for PDP modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active checkout payload
  const [checkoutPayload, setCheckoutPayload] = useState<{
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    downPayment: number;
  } | null>(null);

  const handleProceedToCheckout = (payload: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    downPayment: number;
  }) => {
    setSelectedProduct(null); // Close PDP
    setCheckoutPayload(payload); // Open Checkout
  };

  const handleResetFilters = () => {
    setCategory('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  const hasActiveFilters = category !== 'all' || searchQuery.trim() !== '' || sortBy !== 'recommended';

  return (
    <div className={`relative ${isMobileView ? 'pb-24 px-3' : 'pb-20 w-full max-w-[1600px] 2xl:max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16'}`}>
      {/* 1Fi Promotional Hero Banner */}
      {isMobileView ? (
        /* Mobile Hero Banner - Compact & Native */
        <section className="relative overflow-hidden pt-1 pb-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-[#6C28D9] via-[#8232e8] to-[#9e4dfc] text-white p-3.5 shadow-sm">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9.5px] font-bold backdrop-blur-md border border-white/20 mb-1.5">
              <Sparkles className="h-3 w-3 text-amber-300 fill-amber-300" />
              <span>India's 1st LAMF Platform</span>
            </div>

            <h2 className="text-base font-extrabold tracking-tight leading-snug">
              Shop today, <span className="italic font-light text-purple-200">Pay later</span> with <span className="underline decoration-amber-300 underline-offset-2">mutual funds</span>.
            </h2>

            <p className="mt-1 text-[11px] text-purple-100 leading-snug">
              0% interest EMIs on gadgets. Keep earning ~14% CAGR.
            </p>

            <div className="mt-2 flex items-center gap-2 text-[10px] font-semibold text-purple-100">
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-300 fill-amber-300" /> 0% Interest
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" /> No CIBIL Check
              </span>
            </div>
          </div>
        </section>
      ) : (
        /* Desktop Hero Banner - Bold, Expansive & High-Impact */
        <section className="relative overflow-hidden pt-6 pb-8">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-tr from-[#6C28D9] via-[#8232e8] to-[#9e4dfc] text-white p-8 lg:p-12 xl:p-14 shadow-2xl shadow-purple-900/20 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl xl:max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold backdrop-blur-md border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-amber-300 fill-amber-300" />
                <span>India's 1st LAMF Shopping Platform</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Shop today, <span className="italic font-light text-purple-200 font-serif">Pay later</span>
                <br />
                using <span className="underline decoration-amber-300 underline-offset-4">mutual funds</span>.
              </h2>

              <p className="mt-4 text-base lg:text-lg text-purple-100 max-w-xl leading-relaxed">
                Get 0% interest EMIs on top electronics without liquidating your portfolio.
                Your investments continue compounding at ~14% CAGR while you shop.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold">
                <span className="flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full backdrop-blur-xs border border-white/20 shadow-xs">
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" /> 0% Interest
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full backdrop-blur-xs border border-white/20 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" /> No CIBIL Check
                </span>
                <span className="flex items-center gap-1.5 bg-white/15 px-4 py-2 rounded-full backdrop-blur-xs border border-white/20 shadow-xs">
                  <Sparkles className="w-4 h-4 text-purple-200" /> CAMS & KFintech Verified
                </span>
              </div>
            </div>

            {/* Desktop Hero Right Card */}
            <div className="w-full lg:w-auto bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white/20 flex flex-col gap-4 shrink-0 min-w-[320px] lg:min-w-[360px] shadow-xl">
              <div>
                <span className="text-xs uppercase font-bold text-purple-200 tracking-wider">
                  Instant Credit Line
                </span>
                <p className="text-3xl lg:text-4xl font-black mt-1">₹3,52,000</p>
              </div>

              <div className="space-y-2 text-xs lg:text-sm pt-3 border-t border-white/15">
                <div className="flex justify-between">
                  <span className="text-purple-200 font-medium">MF Holdings:</span>
                  <span className="font-bold text-white">₹4,40,900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 font-medium">Portfolio Growth:</span>
                  <span className="font-bold text-emerald-300">+14% CAGR</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3-Option Shop Tabs Segmented Control */}
      <div className="mt-2 mb-6 w-full flex justify-center">
        <div className={isMobileView ? 'w-full' : 'w-full max-w-3xl lg:max-w-4xl'}>
          <ShopTabs activeOption={shopOption} onChange={setShopOption} />
        </div>
      </div>

      {/* TAB 1: Top Brands (Fully Functional Experience) */}
      {shopOption === 'top-brands' && (
        <div className="w-full">
          <TopBrandsView />
        </div>
      )}

      {/* TAB 2: Nearby Stores (Fully Functional Experience) */}
      {shopOption === 'nearby-stores' && (
        <div className="w-full">
          <NearbyStoresView />
        </div>
      )}

      {/* TAB 3: 1Fi Marketplace (Full Implementation) */}
      {shopOption === 'marketplace' && (
        <div className="w-full flex flex-col gap-3.5">
          {/* Search bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search iPhones, MacBooks, Samsung, Sony..."
          />

          {/* Category filter pills */}
          <CategoryFilters
            activeCategory={category}
            onChange={setCategory}
          />

          {/* Sorting & Quick Filter Row */}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-gray-900 font-bold text-xs outline-none cursor-pointer border-b border-dashed border-gray-300 hover:border-[#712CDC]"
              >
                <option value="recommended">Featured / Best Sellers</option>
                <option value="emi-asc">Lowest Monthly EMI</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-[#712CDC] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-2.5 h-2.5" /> Clear Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            onSelectProduct={setSelectedProduct}
            onRetry={refetch}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      )}

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        orderPayload={checkoutPayload}
        onClose={() => setCheckoutPayload(null)}
        onOrderCompleted={(order) => {
          console.log('Order confirmed successfully:', order);
        }}
      />
    </div>
  );
};
