import React from 'react';
import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { SearchX, AlertCircle, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onSelectProduct: (product: Product) => void;
  onRetry: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

import { useViewMode } from '../../context/ViewModeContext';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  onSelectProduct,
  onRetry,
  onResetFilters,
  hasActiveFilters,
}) => {
  const { isMobileView } = useViewMode();

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center rounded-[20px] border border-red-200 bg-red-50/70 p-8 text-center my-4">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-red-900">Unable to load marketplace</h3>
        <p className="mt-1 text-xs text-red-700 max-w-xs">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Retry Loading</span>
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-[20px] border border-zinc-200/80 bg-white p-8 text-center my-4 shadow-sm">
        <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-gray-900">No products found</h3>
        <p className="mt-1 text-xs text-gray-500 max-w-xs">
          We couldn't find any products matching your current filters or search query.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-[#712CDC] bg-[#f5f0ff] px-4 py-2 text-xs font-semibold text-[#712CDC] hover:bg-[#ede8ff] transition-colors"
          >
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className={`flex items-center justify-between px-1 ${isMobileView ? 'text-[11px]' : 'text-sm'} text-gray-500 font-medium`}>
        <span className="font-bold text-gray-800">
          Showing {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </span>
        <span className="text-[#712CDC] font-semibold">0% Interest backed by Mutual Funds</span>
      </div>

      <div className={isMobileView ? 'grid grid-cols-1 gap-2.5' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
