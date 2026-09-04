import React from 'react';
import { EMIPlan } from '../../types/emi';
import { formatINR } from '../../utils/formatters';
import { Sparkles, Check } from 'lucide-react';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (plan: EMIPlan) => void;
}

export const EMIPlanCard: React.FC<EMIPlanCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? 'border-[#712CDC] bg-[#f9f6ff] shadow-[0_2px_12px_rgba(113,44,220,0.12)]'
          : 'border-zinc-200 bg-white hover:border-purple-300 hover:bg-gray-50/50'
      }`}
    >
      {/* Popular / Recommended Ribbon */}
      {(plan.isRecommended || plan.isPopular) && (
        <div className="absolute -top-2.5 left-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#712CDC] px-2.5 py-0.5 text-[9.5px] font-bold tracking-wide uppercase text-white shadow-xs">
            <Sparkles className="w-2.5 h-2.5" />
            {plan.isRecommended ? 'Recommended' : 'Most Popular'}
          </span>
        </div>
      )}

      {/* Left Details: Tenure & Rate */}
      <div className="flex items-center gap-3">
        {/* Custom Radio Circle */}
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
            isSelected
              ? 'border-[#712CDC] bg-[#712CDC] text-white'
              : 'border-gray-300 bg-white'
          }`}
        >
          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-gray-900">
              {plan.tenureMonths} Months
            </span>
            {plan.isNoCost ? (
              <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                0% Interest
              </span>
            ) : (
              <span className="text-[10px] font-medium text-gray-500">
                {plan.interestRate}% p.a.
              </span>
            )}
          </div>
          <span className="text-[11px] text-gray-500 block mt-0.5">
            Total payable: {formatINR(plan.totalPayable)}
          </span>
        </div>
      </div>

      {/* Right Details: Monthly EMI */}
      <div className="text-right">
        <span className="text-[16px] font-extrabold text-gray-900 tabular-nums">
          {formatINR(plan.monthlyEMI)}
        </span>
        <span className="text-[11px] text-gray-500 block">/ month</span>
      </div>
    </div>
  );
};
