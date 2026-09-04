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

export const ShopPage: React.FC = () => {
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
    <div className="relative pb-28 md:pb-16 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      {/* 1Fi Promotional Hero Banner */}
      <section className="relative overflow-hidden pt-3 pb-3">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-tr from-[#6C28D9] via-[#8232e8] to-[#9e4dfc] text-white p-5 sm:p-7 md:p-8 shadow-[0_10px_30px_rgba(113,44,220,0.2)] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          
          {/* Subtle Background Pattern & Accents */}
          <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-purple-900/40 blur-2xl pointer-events-none" />

          {/* Left Hero Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur-md border border-white/20 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              <span>India's 1st LAMF Shopping Platform</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Shop today, <span className="italic font-light text-purple-200">Pay later</span> <br />
              using <span className="underline decoration-amber-300 underline-offset-4">mutual funds</span>.
            </h2>

            <p className="mt-2.5 text-xs sm:text-sm text-purple-100 max-w-xl leading-relaxed">
              Get 0% interest EMIs on top electronics without liquidating your portfolio. Your investments continue earning ~14% CAGR while you shop.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-medium text-purple-100">
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> 0% Interest
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> No CIBIL Check
              </span>
              <span className="hidden sm:flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> CAMS & KFintech Verified
              </span>
            </div>
          </div>

          {/* Right Hero Stats Box (Desktop/Laptop) */}
          <div className="relative z-10 hidden md:flex flex-col gap-3 min-w-[240px] bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div>
              <span className="text-[11px] text-purple-200 font-semibold uppercase tracking-wider block">
                Instant Credit Limit
              </span>
              <span className="text-2xl font-black text-white">₹3,52,000</span>
            </div>
            <div className="h-px bg-white/15" />
            <div className="text-xs text-purple-100 space-y-1">
              <div className="flex justify-between">
                <span className="text-purple-200">MF Holdings:</span>
                <span className="font-bold">₹4,40,900</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-200">Est. Growth:</span>
                <span className="font-bold text-emerald-300">+14% CAGR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Option Shop Tabs Segmented Control */}
      <div className="mt-2 mb-4 flex justify-center sm:justify-start">
        <div className="w-full sm:max-w-md">
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
