import React from 'react';
import { EMIPlan } from '../../types/emi';
import { EMIPlanCard } from './EMIPlanCard';
import { MutualFundBenefitCard } from './MutualFundBenefitCard';
import { formatINR } from '../../utils/formatters';
import { Zap } from 'lucide-react';

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
  price: number;
  downPaymentPercent: number;
  onChangeDownPayment: (percent: number) => void;
}

export const EMIPlanSelector: React.FC<EMIPlanSelectorProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  price,
  downPaymentPercent,
  onChangeDownPayment,
}) => {
  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const loanAmount = price - downPaymentAmount;

  const quickPercentages = [0, 10, 20, 30, 50];

  return (
    <div className="flex flex-col gap-4">
      {/* Down payment control */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Down Payment
          </label>
          <div className="text-right">
            <span className="text-sm font-extrabold text-[#712CDC]">
              {formatINR(downPaymentAmount)}
            </span>
            <span className="text-xs text-gray-500 font-medium ml-1">
              ({downPaymentPercent}%)
            </span>
          </div>
        </div>

        {/* Quick percentage pills */}
        <div className="flex gap-1.5 my-2">
          {quickPercentages.map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => onChangeDownPayment(pct)}
              className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-colors ${
                downPaymentPercent === pct
                  ? 'bg-[#712CDC] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {pct === 0 ? '₹0 Down' : `${pct}%`}
            </button>
          ))}
        </div>

        {/* Range slider */}
        <input
          type="range"
          min="0"
          max="50"
          step="5"
          value={downPaymentPercent}
          onChange={(e) => onChangeDownPayment(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#712CDC]"
        />

        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>₹0 Down payment</span>
          <span>Max 50%</span>
        </div>
      </div>

      {/* Plan selection list */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Select Repayment Tenure
          </span>
          <span className="text-[11px] font-semibold text-[#712CDC] flex items-center gap-1">
            <Zap className="w-3 h-3 fill-current" /> No Cost EMI Available
          </span>
        </div>

        <div className="space-y-2">
          {plans.map((plan) => (
            <EMIPlanCard
              key={plan.tenureMonths}
              plan={plan}
              isSelected={selectedPlan?.tenureMonths === plan.tenureMonths}
              onSelect={onSelectPlan}
            />
          ))}
        </div>
      </div>

      {/* 1Fi Advantage Compounding Card */}
      {selectedPlan && (
        <MutualFundBenefitCard
          savingsVsUpfront={selectedPlan.savingsVsUpfront}
          requiredPledge={selectedPlan.requiredMFPledge}
          tenureMonths={selectedPlan.tenureMonths}
        />
      )}

      {/* Transparent Loan Fee Summary */}
      <div className="rounded-2xl border border-gray-200/80 bg-gray-50/70 p-3.5 text-xs text-gray-600 space-y-1.5">
        <div className="flex justify-between">
          <span className="text-gray-500">Financed Loan Principal:</span>
          <span className="font-bold text-gray-900">{formatINR(loanAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Processing Fee:</span>
          <span className="font-bold text-emerald-600">₹0 (Free via 1Fi)</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Foreclosure Charges:</span>
          <span className="font-bold text-emerald-600">₹0 (Close Anytime)</span>
        </div>
        <div className="flex justify-between pt-1 border-t border-gray-200 font-semibold text-gray-900">
          <span>Monthly Installment:</span>
          <span className="text-[#712CDC] font-bold">
            {formatINR(selectedPlan?.monthlyEMI || 0)}/mo
          </span>
        </div>
      </div>
    </div>
  );
};
