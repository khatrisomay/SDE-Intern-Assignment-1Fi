import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../../types/product';
import { EMIPlan, PledgedFund, CheckoutOrder } from '../../types/emi';
import { apiService } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Lock,
  ArrowRight,
  Loader2,
} from 'lucide-react';

interface CheckoutModalProps {
  orderPayload: {
    product: Product;
    variant: ProductVariant;
    emiPlan: EMIPlan;
    downPayment: number;
  } | null;
  onClose: () => void;
  onOrderCompleted: (order: CheckoutOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  orderPayload,
  onClose,
  onOrderCompleted,
}) => {
  if (!orderPayload) return null;

  const { product, variant, emiPlan, downPayment } = orderPayload;

  // Checkout steps: 1: Summary, 2: Pledge MF, 3: Success
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userFunds, setUserFunds] = useState<PledgedFund[]>([]);
  const [selectedFunds, setSelectedFunds] = useState<string[]>([]);
  const [confirmedOrder, setConfirmedOrder] = useState<CheckoutOrder | null>(null);

  // Load user's mutual funds
  useEffect(() => {
    apiService.getUserPortfolio().then((data) => {
      setUserFunds(data.funds);
      // Pre-select top 2 funds by default
      setSelectedFunds([data.funds[0]?.id, data.funds[1]?.id].filter(Boolean));
    });
  }, []);

  // Trigger confetti when reaching step 3
  useEffect(() => {
    if (currentStep === 3) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#712CDC', '#8c27fc', '#10B981', '#F59E0B'],
      });
    }
  }, [currentStep]);

  // Handle final authorization
  const handleAuthorizePledge = async () => {
    try {
      setIsSubmitting(true);
      const chosenFundObjects = userFunds.filter((f) => selectedFunds.includes(f.id));

      const order = await apiService.submitPledgeAndOrder({
        product,
        selectedVariant: variant,
        emiPlan,
        downPayment,
        estimatedDeliveryDate: 'Tomorrow, by 8:00 PM',
        pledgedFunds: chosenFundObjects,
      });

      setConfirmedOrder(order);
      setCurrentStep(3);
      onOrderCompleted(order);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-[480px] sm:max-w-xl md:max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#712CDC]" />
            <h2 className="text-sm font-bold text-gray-900">
              {currentStep === 1 && 'Review Order & EMI Plan'}
              {currentStep === 2 && 'Pledge Mutual Funds'}
              {currentStep === 3 && 'Order Confirmed!'}
            </h2>
          </div>

          {currentStep !== 3 && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-3 gap-1 px-5 pt-3 pb-1 bg-gray-50/70 border-b border-gray-100">
          <div className={`h-1.5 rounded-full ${currentStep >= 1 ? 'bg-[#712CDC]' : 'bg-gray-200'}`} />
          <div className={`h-1.5 rounded-full ${currentStep >= 2 ? 'bg-[#712CDC]' : 'bg-gray-200'}`} />
          <div className={`h-1.5 rounded-full ${currentStep === 3 ? 'bg-emerald-500' : 'bg-gray-200'}`} />
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-gray-800">
          
          {/* STEP 1: Plan Summary */}
          {currentStep === 1 && (
            <>
              {/* Product preview */}
              <div className="flex gap-3.5 p-3.5 rounded-2xl bg-purple-50/40 border border-purple-100 items-center">
                <img
                  src={product.images[variant.imageIndex || 0] || product.images[0]}
                  alt={product.name}
                  className="h-16 w-16 object-contain mix-blend-multiply rounded-xl bg-white p-1"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{product.name}</h4>
                  <p className="text-xs text-gray-500">{variant.name}</p>
                  <p className="text-sm font-extrabold text-[#712CDC] mt-1">
                    {formatINR(variant.price)}
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-3.5 rounded-2xl border border-gray-200 bg-white space-y-1 text-xs">
                <div className="flex items-center justify-between text-gray-500 font-semibold uppercase text-[10px]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#712CDC]" /> Delivery Address
                  </span>
                  <span className="text-[#712CDC] cursor-pointer">Edit</span>
                </div>
                <p className="font-bold text-gray-900 text-xs">Somay Khatri • +91 98765 43210</p>
                <p className="text-gray-600 text-xs">
                  Flat 402, DLF CyberCity, Sector 24, Gurugram, Haryana - 122002
                </p>
              </div>

              {/* EMI Terms Breakdown */}
              <div className="rounded-2xl border border-gray-200 p-4 space-y-2.5 bg-white text-xs">
                <h5 className="font-bold uppercase tracking-wider text-[11px] text-gray-700">
                  Payment Breakdown
                </h5>
                <div className="flex justify-between text-gray-600">
                  <span>Product Total:</span>
                  <span className="font-bold text-gray-900">{formatINR(variant.price)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Down Payment (Paid Now):</span>
                  <span className="font-bold text-purple-700">{formatINR(downPayment)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Financed via 1Fi:</span>
                  <span className="font-bold text-gray-900">{formatINR(variant.price - downPayment)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Selected Tenure:</span>
                  <span className="font-bold text-gray-900">{emiPlan.tenureMonths} Months</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Interest Rate:</span>
                  <span className="font-bold text-emerald-600">
                    {emiPlan.isNoCost ? '0% No-Cost EMI' : `${emiPlan.interestRate}% p.a.`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-sm text-gray-900">
                  <span>Monthly Installment:</span>
                  <span className="text-[#712CDC]">{formatINR(emiPlan.monthlyEMI)} / mo</span>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#712CDC] hover:bg-[#6224c2] text-white font-bold text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Continue to Mutual Fund Pledge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* STEP 2: Mutual Fund Lien Pledge Simulation */}
          {currentStep === 2 && (
            <>
              <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-[#712CDC] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>1Fi Digital Lien Marking</span>
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  To unlock 0% interest with zero CIBIL check, pledge{' '}
                  <strong className="text-gray-950 font-bold">{formatINR(emiPlan.requiredMFPledge)}</strong>{' '}
                  from your verified mutual fund holdings. No units will be sold.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                  Select Funds to Pledge (via CAMS / KFintech):
                </span>

                {userFunds.map((fund) => {
                  const isChecked = selectedFunds.includes(fund.id);
                  return (
                    <div
                      key={fund.id}
                      onClick={() => {
                        setSelectedFunds((prev) =>
                          prev.includes(fund.id)
                            ? prev.filter((id) => id !== fund.id)
                            : [...prev, fund.id]
                        );
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                        isChecked
                          ? 'border-[#712CDC] bg-purple-50/40 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="h-4 w-4 rounded text-[#712CDC] focus:ring-0 accent-[#712CDC]"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate">{fund.schemeName}</p>
                          <p className="text-[10px] text-gray-500">
                            Units: {fund.units} • Category: {fund.category}
                          </p>
                        </div>
                      </div>

                      <span className="font-extrabold text-gray-900 shrink-0">
                        {formatINR(fund.currentValue)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Security guarantee */}
              <div className="flex items-center gap-2 p-3 bg-emerald-50/80 border border-emerald-200 rounded-2xl text-[11px] text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Secured by 256-bit encryption. Handled via SEBI/RBI registered repository.
                </span>
              </div>

              {/* Authorize CTA */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  disabled={isSubmitting || selectedFunds.length === 0}
                  onClick={handleAuthorizePledge}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#712CDC] to-[#8c27fc] hover:from-[#6423c7] hover:to-[#7b1fe0] text-white font-bold text-sm shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Lien with CAMS...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setCurrentStep(1)}
                  className="w-full py-2 text-xs font-semibold text-gray-500 hover:text-gray-800 text-center"
                >
                  Back to Order Summary
                </button>
              </div>
            </>
          )}

          {/* STEP 3: Order Confirmed */}
          {currentStep === 3 && confirmedOrder && (
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-md animate-bounce">
                <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                  Order Successfully Placed
                </span>
                <h3 className="text-xl font-black text-gray-950 mt-2">
                  Congratulations!
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Your purchase of <strong>{product.name}</strong> is confirmed. Financed at 0%
                  interest using your mutual funds.
                </p>
              </div>

              {/* Order Reference Card */}
              <div className="w-full rounded-2xl bg-gray-50 border border-gray-200 p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono font-bold text-gray-900">
                    {confirmedOrder.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pledge Reference:</span>
                  <span className="font-mono font-bold text-[#712CDC]">
                    {confirmedOrder.pledgeTransactionId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Delivery:</span>
                  <span className="font-bold text-gray-900">
                    {confirmedOrder.estimatedDeliveryDate}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200">
                  <span className="text-gray-500">First EMI Due:</span>
                  <span className="font-bold text-purple-700">
                    5th of Next Month ({formatINR(emiPlan.monthlyEMI)})
                  </span>
                </div>
              </div>

              {/* Mutual fund ongoing returns reminder */}
              <div className="w-full p-3 rounded-2xl bg-purple-50/60 border border-purple-100 text-left text-xs flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-[#712CDC] shrink-0" />
                <p className="text-purple-950 text-[11.5px]">
                  Your mutual fund units remain invested in your demat account and continue earning market returns!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#712CDC] hover:bg-[#6224c2] text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-colors"
                >
                  Return to 1Fi Marketplace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
