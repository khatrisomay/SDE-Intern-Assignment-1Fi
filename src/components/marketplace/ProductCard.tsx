import React from 'react';
import { Product } from '../../types/product';
import { formatINR } from '../../utils/formatters';
import { Star, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

import { useViewMode } from '../../context/ViewModeContext';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { isMobileView } = useViewMode();

  const discountPercent = Math.round(
    ((product.defaultOriginalPrice - product.defaultPrice) / product.defaultOriginalPrice) * 100
  );

  // ================= MOBILE COMPACT CARD =================
  if (isMobileView) {
    return (
      <div
        onClick={() => onSelect(product)}
        className="group relative flex flex-col rounded-2xl border border-gray-200/90 bg-white p-3 shadow-xs hover:border-[#712CDC]/40 transition-all active:scale-[0.99] cursor-pointer overflow-hidden"
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#712CDC] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
            {product.brand}
          </span>

          {product.isBestSeller ? (
            <span className="text-[9.5px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Best Seller
            </span>
          ) : (
            <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        {/* Horizontal Content */}
        <div className="flex gap-3 items-center">
          {/* Compact Image */}
          <div className="relative h-20 w-20 shrink-0 rounded-xl bg-[#f8f6fc] p-1.5 flex items-center justify-center border border-purple-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-contain mix-blend-multiply"
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-900 line-clamp-1 leading-snug">
                {product.name}
              </h3>
              <p className="text-[10.5px] text-gray-400 line-clamp-1 mt-0.5">
                {product.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm font-black text-gray-950">
                {formatINR(product.defaultPrice)}
              </span>
              <span className="text-[10.5px] text-gray-400 line-through">
                {formatINR(product.defaultOriginalPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Financing Micro-bar */}
        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10.5px]">
          <div className="flex items-center gap-1 text-gray-600 font-medium">
            <Zap className="w-3 h-3 text-[#712CDC] fill-[#712CDC]" />
            <span>EMI from <strong className="text-gray-950">{formatINR(product.lowestMonthlyEMI)}</strong>/mo</span>
          </div>
          <span className="text-[9.5px] font-extrabold text-[#712CDC] bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100 uppercase">
            0% Interest
          </span>
        </div>
      </div>
    );
  }

  // ================= DESKTOP LARGE ECOMMERCE CARD =================
  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between rounded-3xl lg:rounded-[32px] border border-gray-200/90 bg-white p-6 lg:p-7 shadow-sm hover:shadow-2xl hover:border-[#712CDC]/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-1 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#712CDC] bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
            {product.brand}
          </span>

          {product.isBestSeller ? (
            <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-amber-500 text-amber-500" /> Best Seller
            </span>
          ) : product.isNew ? (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              New Arrival
            </span>
          ) : (
            <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-xs">({product.reviewsCount})</span>
            </div>
          )}
        </div>

        {/* Large Product Image Showcase */}
        <div className="relative h-60 lg:h-72 w-full rounded-2xl bg-[#f8f6fc] p-6 flex items-center justify-center overflow-hidden border border-purple-50 group-hover:scale-[1.03] transition-transform duration-300">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-contain mix-blend-multiply drop-shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-950 leading-snug line-clamp-2 group-hover:text-[#712CDC] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs lg:text-sm text-gray-500 line-clamp-1 mt-1">
            {product.tagline}
          </p>
        </div>

        {/* Large Pricing Row */}
        <div className="mt-3.5 flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl lg:text-3xl font-black text-gray-950 tracking-tight">
            {formatINR(product.defaultPrice)}
          </span>
          <span className="text-sm lg:text-base text-gray-400 line-through">
            {formatINR(product.defaultOriginalPrice)}
          </span>
          {discountPercent > 0 && (
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Financing Strip & CTA Button */}
      <div className="mt-5 pt-3.5 border-t border-gray-100 flex flex-col gap-2">
        {/* EMI Box */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#f5f0ff] to-[#faf7ff] rounded-2xl px-3.5 py-2.5 border border-[#ece5ff]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#712CDC] fill-[#712CDC]" />
            <div className="text-xs leading-none">
              <span className="text-gray-500 font-medium">Monthly EMI: </span>
              <span className="text-gray-950 font-black text-sm">{formatINR(product.lowestMonthlyEMI)}</span>
              <span className="text-gray-500 text-xs">/mo</span>
            </div>
          </div>
          <span className="text-[11px] font-black uppercase text-[#712CDC] bg-white px-2.5 py-1 rounded-lg shadow-xs border border-purple-100">
            0% Interest
          </span>
        </div>

        {/* Mutual fund pledge requirement */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1 pt-1">
          <span className="flex items-center gap-1.5 text-gray-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pledge from ₹{Math.round((product.defaultPrice * 1.25) / 1000)}k in Mutual Funds</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="w-full mt-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#712CDC] to-[#8c27fc] hover:from-[#6023be] hover:to-[#781fd9] text-white font-bold text-sm lg:text-base shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          <span>View 0% EMI Plans</span>
          <ArrowRight className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
        </button>
      </div>
    </div>
  );
};
