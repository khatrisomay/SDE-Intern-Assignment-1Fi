import React from 'react';
import { TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface MutualFundBenefitCardProps {
  savingsVsUpfront: number;
  requiredPledge: number;
  tenureMonths: number;
}

export const MutualFundBenefitCard: React.FC<MutualFundBenefitCardProps> = ({
  savingsVsUpfront,
  requiredPledge,
  tenureMonths,
}) => {
  return (
    <div className="rounded-2xl border border-purple-200/80 bg-gradient-to-br from-purple-50/70 via-white to-[#f9f5ff] p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#712CDC] text-white">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-950">The 1Fi Advantage</h4>
            <p className="text-[10px] text-gray-500">Keep your investments compounding</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-medium text-gray-500 block">Est. MF Gains</span>
          <span className="text-xs font-extrabold text-emerald-600">
            +{formatINR(savingsVsUpfront)}
          </span>
        </div>
      </div>

      {/* Value Comparison */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-white rounded-xl p-2.5 border border-purple-100">
        <div>
          <span className="text-gray-400 block text-[10px]">Required MF Pledge</span>
          <span className="font-bold text-gray-900">{formatINR(requiredPledge)}</span>
          <span className="text-[9.5px] text-gray-400 block">Units remain 100% yours</span>
        </div>
        <div className="border-l border-gray-100 pl-2">
          <span className="text-gray-400 block text-[10px]">Tenure Return (@14%)</span>
          <span className="font-bold text-emerald-600">Over {tenureMonths} Months</span>
          <span className="text-[9.5px] text-emerald-700 font-medium block">Zero liquidation tax</span>
        </div>
      </div>

      {/* Bullet guarantees */}
      <div className="mt-3 space-y-1 text-[11px] text-gray-600">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#712CDC] shrink-0" />
          <span>No need to sell mutual funds & pay capital gains tax</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#712CDC] shrink-0" />
          <span>Lien digitally marked via official CAMS / KFintech</span>
        </div>
      </div>
    </div>
  );
};
