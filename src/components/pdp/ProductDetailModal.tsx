import React, { useState } from 'react';
import { Product, ProductVariant } from '../../types/product';
import { EMIPlan } from '../../types/emi';
import { formatINR } from '../../utils/formatters';
import { useEMIPlan } from '../../hooks/useEMIPlan';
import { useViewMode } from '../../context/ViewModeContext';
import { EMIPlanSelector } from '../emi/EMIPlanSelector';
import {
  ArrowLeft,
  Share2,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onProceedToCheckout: (payload: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    downPayment: number;
  }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProceedToCheckout,
}) => {
  if (!product) return null;

  const { isMobileView } = useViewMode();

  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      name: 'Standard',
      colorName: 'Default',
      colorHex: '#000000',
      price: product.defaultPrice,
      originalPrice: product.defaultOriginalPrice,
      inStock: true,
    }
  );

  // Active image index
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Accordion state for specs
  const [showSpecs, setShowSpecs] = useState<boolean>(false);

  // EMI Hook linked to current variant price
  const {
    plans,
    activePlan,
    setSelectedTenure,
    downPaymentPercent,
    setDownPaymentPercent,
    downPaymentAmount,
  } = useEMIPlan(selectedVariant.price);

  // Handle variant change
  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    if (variant.imageIndex !== undefined && product.images[variant.imageIndex]) {
      setActiveImageIndex(variant.imageIndex);
    }
  };

  const discountPercent = Math.round(
    ((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100
  );

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center ${
        isMobileView ? 'p-0' : 'p-6 lg:p-10'
      } animate-in fade-in duration-200`}
    >
      <div
        className={`relative w-full ${
          isMobileView
            ? 'max-w-[440px] min-h-screen bg-white flex flex-col pb-28'
            : 'max-w-5xl rounded-[32px] shadow-2xl bg-white flex flex-col overflow-hidden pb-6 my-auto border border-gray-100'
        }`}
      >
        {/* Top Sticky Nav */}
        <div
          className={`sticky top-0 z-30 flex items-center justify-between ${
            isMobileView ? 'px-4 py-3' : 'px-6 py-4'
          } bg-white/95 backdrop-blur-md border-b border-gray-100`}
        >
          <button
            type="button"
            onClick={onClose}
            className="p-2 -ml-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            aria-label="Back to marketplace"
          >
            <ArrowLeft className={isMobileView ? 'w-5 h-5' : 'w-5 h-5'} />
            <span className={isMobileView ? 'text-xs' : 'text-sm'}>Back</span>
          </button>

          <span
            className={`${
              isMobileView ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3.5 py-1'
            } font-bold uppercase tracking-wider text-[#712CDC] bg-purple-50 rounded-full border border-purple-100`}
          >
            {product.brand}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
                }
              }}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Share product"
            >
              <Share2 className={isMobileView ? 'w-4 h-4' : 'w-5 h-5'} />
            </button>
            {!isMobileView && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal Body: 1 Column on Mobile, 2 Columns on Desktop */}
        <div className={isMobileView ? 'flex flex-col flex-1' : 'grid grid-cols-12 flex-1 items-start gap-8 p-6 lg:p-8'}>
          {/* Left Column (Images & Desktop Trust Guarantees) */}
          <div
            className={
              isMobileView
                ? 'bg-[#f8f6fc] pt-4 pb-5 px-4 flex flex-col items-center border-b border-gray-100'
                : 'col-span-5 bg-[#f8f6fc] p-6 rounded-3xl flex flex-col items-center border border-purple-50 sticky top-24'
            }
          >
            <div
              className={`relative ${
                isMobileView ? 'h-52 max-w-[240px]' : 'h-72 max-w-[320px]'
              } w-full flex items-center justify-center`}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md transition-all duration-300"
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`${
                      isMobileView ? 'h-11 w-11 rounded-lg' : 'h-14 w-14 rounded-xl'
                    } border p-1 bg-white transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#712CDC] ring-2 ring-[#712CDC]/20'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}

            {/* Desktop Trust Badges */}
            {!isMobileView && (
              <div className="grid grid-cols-3 gap-2 py-4 mt-6 border-t border-purple-100/70 text-center w-full">
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-[#712CDC] mb-1" />
                  <span className="text-xs font-bold text-gray-900">Free Delivery</span>
                  <span className="text-[10px] text-gray-400">Within {product.deliveryDays} day</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-200">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-gray-900">Brand Warranty</span>
                  <span className="text-[10px] text-gray-400">1 Year Genuine</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 text-[#712CDC] mb-1" />
                  <span className="text-xs font-bold text-gray-900">7 Days Return</span>
                  <span className="text-[10px] text-gray-400">Free replacement</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Info, Variants, EMI Plans, Specs, CTA) */}
          <div className={isMobileView ? 'p-4 flex flex-col gap-4' : 'col-span-7 flex flex-col gap-6'}>
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-bold text-amber-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className={`${isMobileView ? 'text-xs' : 'text-sm'} text-gray-500`}>
                  {product.reviewsCount} verified ratings
                </span>
                {product.isBestSeller && (
                  <span className="text-[10px] font-bold text-[#712CDC] bg-purple-50 px-2 py-0.5 rounded-full flex items-center gap-1 ml-auto">
                    <Sparkles className="w-2.5 h-2.5" /> Best Seller
                  </span>
                )}
              </div>

              <h1
                className={`${
                  isMobileView ? 'text-base font-bold' : 'text-2xl lg:text-3xl font-black'
                } text-gray-950 leading-tight`}
              >
                {product.name}
              </h1>
              <p className={`${isMobileView ? 'text-xs' : 'text-sm'} text-gray-500 mt-1 leading-relaxed`}>
                {product.tagline}
              </p>
            </div>

            {/* Price Highlight */}
            <div
              className={`flex items-baseline gap-2.5 ${
                isMobileView ? 'p-3 rounded-xl' : 'p-4 rounded-2xl'
              } bg-[#faf8ff] border border-[#ece5ff]`}
            >
              <span
                className={`${
                  isMobileView ? 'text-2xl' : 'text-3xl lg:text-4xl'
                } font-black text-gray-950 tracking-tight`}
              >
                {formatINR(selectedVariant.price)}
              </span>
              <span className={`${isMobileView ? 'text-xs' : 'text-base'} text-gray-400 line-through`}>
                {formatINR(selectedVariant.originalPrice)}
              </span>
              {discountPercent > 0 && (
                <span
                  className={`${
                    isMobileView ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
                  } font-extrabold text-emerald-700 bg-emerald-100 rounded-md ml-auto`}
                >
                  {discountPercent}% SAVINGS
                </span>
              )}
            </div>

            {/* Variant Selectors */}
            <div className="space-y-4">
              {/* Color Swatches */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                    Select Color:
                  </span>
                  <span className="text-xs font-semibold text-[#712CDC]">
                    {selectedVariant.colorName}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {product.variants.map((v) => {
                    const isColorSelected = selectedVariant.colorName === v.colorName;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleSelectVariant(v)}
                        className={`group relative flex items-center gap-1.5 p-1 rounded-full border transition-all cursor-pointer ${
                          isColorSelected
                            ? 'border-[#712CDC] ring-2 ring-[#712CDC]/20'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        title={v.colorName}
                      >
                        <span
                          className={`${
                            isMobileView ? 'h-6 w-6' : 'h-7 w-7'
                          } rounded-full border border-black/10 flex items-center justify-center`}
                          style={{ backgroundColor: v.colorHex }}
                        >
                          {isColorSelected && (
                            <Check
                              className={`w-3 h-3 ${
                                v.colorHex.toLowerCase() === '#ffffff' ||
                                v.colorHex.toLowerCase() === '#eae6e1'
                                  ? 'text-black'
                                  : 'text-white'
                              }`}
                            />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Storage / Spec Options */}
              {product.variants.some((v) => v.storage) && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800 block mb-2">
                    Select Storage / Configuration:
                  </span>

                  <div className="grid grid-cols-3 gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleSelectVariant(v)}
                          className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#712CDC] bg-purple-50/80 text-[#712CDC] font-bold shadow-xs'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <span className="text-xs block">{v.storage || v.name}</span>
                          <span className="text-[10px] text-gray-400 font-medium block">
                            {formatINR(v.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Delivery & Trust Guarantees (Mobile Only) */}
            {isMobileView && (
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#712CDC] mb-1" />
                  <span className="text-[11px] font-bold text-gray-900">Free Delivery</span>
                  <span className="text-[9.5px] text-gray-400">Within {product.deliveryDays} day</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                  <span className="text-[11px] font-bold text-gray-900">Brand Warranty</span>
                  <span className="text-[9.5px] text-gray-400">1 Year Genuine</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-[#712CDC] mb-1" />
                  <span className="text-[11px] font-bold text-gray-900">7 Days Return</span>
                  <span className="text-[9.5px] text-gray-400">Free replacement</span>
                </div>
              </div>
            )}

            {/* EMI Plans Section */}
            <div className="pt-1">
              <div className="mb-3">
                <h3 className={`${isMobileView ? 'text-sm' : 'text-lg'} font-bold text-gray-950`}>
                  1Fi Mutual Fund EMI Plans
                </h3>
                <p className={`${isMobileView ? 'text-[11px]' : 'text-xs'} text-gray-500`}>
                  Choose a tenure. Your mutual funds back the EMI so you pay 0% interest.
                </p>
              </div>

              <EMIPlanSelector
                plans={plans}
                selectedPlan={activePlan}
                onSelectPlan={(plan) => setSelectedTenure(plan.tenureMonths)}
                price={selectedVariant.price}
                downPaymentPercent={downPaymentPercent}
                onChangeDownPayment={setDownPaymentPercent}
              />
            </div>

            {/* Key Highlights */}
            <div className={`rounded-2xl bg-gray-50 ${isMobileView ? 'p-3.5' : 'p-5'} border border-gray-100`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                Why Buy on 1Fi Marketplace
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#712CDC] font-bold mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Dropdown */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowSpecs(!showSpecs)}
                className="w-full p-4 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Technical Specifications
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    showSpecs ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showSpecs && (
                <div className="p-4 pt-0 border-t border-gray-100 space-y-4 bg-gray-50/50">
                  {product.specs.map((group, idx) => (
                    <div key={idx} className="space-y-1.5 pt-2">
                      <h5 className="text-[11px] font-bold text-[#712CDC] uppercase">
                        {group.category}
                      </h5>
                      <div className="space-y-1 text-xs">
                        {group.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex justify-between py-1 border-b border-gray-100">
                            <span className="text-gray-500">{item.label}</span>
                            <span className="font-medium text-gray-900 text-right">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Inline Action Bar */}
            {!isMobileView && (
              <div className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-[#faf7ff] to-purple-50 border border-purple-100 mt-2 shadow-xs">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block">
                    {activePlan?.tenureMonths} Months EMI Plan
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-950">
                      {formatINR(activePlan?.monthlyEMI || 0)}
                    </span>
                    <span className="text-sm text-gray-500 font-bold">/mo</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onProceedToCheckout({
                      product,
                      variant: selectedVariant,
                      emiPlan: activePlan,
                      downPayment: downPaymentAmount,
                    })
                  }
                  className="py-3.5 px-8 rounded-xl bg-gradient-to-r from-[#712CDC] to-[#8c27fc] hover:from-[#6423c7] hover:to-[#7b1fe0] text-white font-bold text-base shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Proceed with {activePlan?.tenureMonths}M Plan</span>
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded font-mono">→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Action Bar with CTA (Mobile Only) */}
        {isMobileView && (
          <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-lg">
            <div className="mx-auto max-w-[440px] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-gray-500 font-medium block">
                  {activePlan?.tenureMonths} Months EMI
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-gray-950">
                    {formatINR(activePlan?.monthlyEMI || 0)}
                  </span>
                  <span className="text-xs text-gray-500">/mo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onProceedToCheckout({
                    product,
                    variant: selectedVariant,
                    emiPlan: activePlan,
                    downPayment: downPaymentAmount,
                  })
                }
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#712CDC] to-[#8c27fc] hover:from-[#6423c7] hover:to-[#7b1fe0] text-white font-bold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Proceed with {activePlan?.tenureMonths}M Plan</span>
                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded font-mono">→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
