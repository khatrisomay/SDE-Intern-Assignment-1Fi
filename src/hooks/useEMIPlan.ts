import { useState, useEffect, useMemo } from 'react';
import { EMIPlan } from '../types/emi';
import { apiService } from '../services/api';

export function useEMIPlan(price: number) {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0);
  const [selectedTenure, setSelectedTenure] = useState<number>(12);
  const [plans, setPlans] = useState<EMIPlan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const downPaymentAmount = useMemo(() => {
    return Math.round((price * downPaymentPercent) / 100);
  }, [price, downPaymentPercent]);

  const financedAmount = useMemo(() => {
    return Math.max(0, price - downPaymentAmount);
  }, [price, downPaymentAmount]);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    apiService.getEMIPlans(price, downPaymentAmount).then((data) => {
      if (!isCancelled) {
        setPlans(data);
        setLoading(false);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [price, downPaymentAmount]);

  const activePlan = useMemo(() => {
    return plans.find((p) => p.tenureMonths === selectedTenure) || plans[0];
  }, [plans, selectedTenure]);

  return {
    plans,
    activePlan,
    selectedTenure,
    setSelectedTenure,
    downPaymentPercent,
    setDownPaymentPercent,
    downPaymentAmount,
    financedAmount,
    loading,
  };
}
