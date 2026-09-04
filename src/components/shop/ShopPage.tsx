import React, { useState } from 'react';
import { ShopTabs, ShopOption } from './ShopTabs';
import { TopBrandsPlaceholder } from './TopBrandsPlaceholder';
import { NearbyStoresPlaceholder } from './NearbyStoresPlaceholder';
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
    <div className="relative pb-28">
      {/* 1Fi Promotional Hero Banner from CDN */}
      <section className="relative overflow-hidden px-4 pt-3 pb-2">
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-tr from-[#6C28D9] via-[#8232e8] to-[#9e4dfc] text-white p-5 shadow-[0_8px_24px_rgba(113,44,220,0.18)]">
          
          {/* Subtle Background Pattern & Accents */}
          <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-purple-900/30 blur-xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur-md border border-white/20 mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
            <span>India's 1st LAMF Shopping Platform</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            Shop today, <span className="italic font-light text-purple-200">Pay later</span> <br />
            using <span className="underline decoration-amber-300 underline-offset-4">mutual funds</span>.
          </h2>

          <p className="mt-2 text-xs text-purple-100 max-w-[36ch] leading-relaxed">
            Get 0% interest EMIs on top electronics without liquidating your portfolio.
          </p>

          <div className="mt-3.5 flex items-center gap-2 text-[10.5px] font-medium text-purple-100">
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

      {/* 3-Option Shop Tabs Segmented Control */}
      <div className="px-4 mt-2 mb-3">
        <ShopTabs activeOption={shopOption} onChange={setShopOption} />
      </div>

      {/* TAB 1: Top Brands Placeholder */}
      {shopOption === 'top-brands' && (
        <div className="px-4">
          <TopBrandsPlaceholder />
        </div>
      )}

      {/* TAB 2: Nearby Stores Placeholder */}
      {shopOption === 'nearby-stores' && (
        <div className="px-4">
          <NearbyStoresPlaceholder />
        </div>
      )}

      {/* TAB 3: 1Fi Marketplace (Full Implementation) */}
      {shopOption === 'marketplace' && (
        <div className="px-4 flex flex-col gap-3.5">
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
