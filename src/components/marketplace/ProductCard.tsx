import React from 'react';
import { Product } from '../../types/product';
import { formatINR } from '../../utils/formatters';
import { Star, ShieldCheck, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const discountPercent = Math.round(
    ((product.defaultOriginalPrice - product.defaultPrice) / product.defaultOriginalPrice) * 100
  );

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col justify-between rounded-[22px] border border-zinc-200/90 bg-white p-3.5 sm:p-4 shadow-[0_2px_10px_rgba(20,14,50,0.04)] hover:shadow-[0_12px_28px_rgba(113,44,220,0.14)] hover:border-[#712CDC]/40 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Top badges bar */}
        <div className="flex items-center justify-between gap-1 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#712CDC] bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
            {product.brand}
          </span>

          {product.isBestSeller ? (
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Best Seller
            </span>
          ) : product.isNew ? (
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
              New Arrival
            </span>
          ) : (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          )}
        </div>

        {/* Main card row: Image + Quick Details */}
        <div className="flex sm:flex-col gap-3.5 items-center sm:items-stretch">
          {/* Product Image */}
          <div className="relative h-24 w-24 sm:h-44 sm:w-full shrink-0 rounded-2xl bg-[#f8f6fc] p-2 sm:p-4 flex items-center justify-center overflow-hidden border border-purple-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>

          {/* Product Info */}
          <div className="min-w-0 flex-1 flex flex-col justify-between sm:mt-1">
            <div>
              <h3 className="text-[14.5px] font-bold text-gray-900 leading-snug line-clamp-1 group-hover:text-[#712CDC] transition-colors">
                {product.name}
              </h3>
              <p className="text-[11.5px] text-gray-500 line-clamp-1 mt-0.5">
                {product.tagline}
              </p>
            </div>

            {/* Pricing Row */}
            <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
              <span className="text-[16px] font-extrabold text-gray-900 tracking-tight">
                {formatINR(product.defaultPrice)}
              </span>
              <span className="text-[12px] text-gray-400 line-through">
                {formatINR(product.defaultOriginalPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 1Fi Financing Value Props Strip */}
      <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-col gap-1.5">
        {/* Lowest EMI Highlight */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#f5f0ff] to-[#f9f5ff] rounded-xl px-2.5 py-1.5 border border-[#ece5ff]">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#712CDC] fill-[#712CDC]" />
            <div className="text-[11.5px] leading-none">
              <span className="text-gray-500 font-medium">EMI from </span>
              <span className="text-gray-950 font-bold">{formatINR(product.lowestMonthlyEMI)}</span>
              <span className="text-gray-500 text-[10px]">/mo</span>
            </div>
          </div>
          <span className="text-[10px] font-extrabold uppercase text-[#712CDC] bg-white px-2 py-0.5 rounded-md shadow-xs border border-purple-100">
            0% Interest
          </span>
        </div>

        {/* Mutual fund collateral & delivery micro-bar */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 px-1 pt-0.5">
          <span className="flex items-center gap-1 text-gray-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pledge from ₹{Math.round((product.defaultPrice * 1.25) / 1000)}k MF</span>
          </span>

          <span className="flex items-center gap-1 text-purple-700 font-medium group-hover:translate-x-0.5 transition-transform">
            <span>View Plans</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
