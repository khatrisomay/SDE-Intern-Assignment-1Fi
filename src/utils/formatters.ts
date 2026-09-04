/**
 * Format a number into Indian Rupee format (e.g. ₹1,29,990)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/**
 * Calculate EMI and Mutual Fund returns
 */
export function calculateEMIDetails(
  principal: number,
  tenureMonths: number,
  annualInterestRate: number = 0,
  expectedMFRate: number = 0.14 // 14% CAGR for equity mutual funds
) {
  const isNoCost = annualInterestRate === 0;
  let monthlyEMI = 0;
  let totalInterest = 0;

  if (isNoCost) {
    monthlyEMI = principal / tenureMonths;
    totalInterest = 0;
  } else {
    const monthlyRate = annualInterestRate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEMI = (principal * monthlyRate * factor) / (factor - 1);
    totalInterest = monthlyEMI * tenureMonths - principal;
  }

  const totalPayable = principal + totalInterest;

  // 1Fi required mutual fund pledge: ~1.25x of loan amount for equity funds
  const requiredMFPledge = Math.round((principal * 1.25) / 1000) * 1000;

  // Potential compounding growth if user kept the upfront cash invested in MF:
  // Upfront cash equivalent continuing to grow over the tenure:
  const years = tenureMonths / 12;
  const futureValueIfInvested = principal * Math.pow(1 + expectedMFRate, years);
  const potentialMFGains = Math.round(futureValueIfInvested - principal);

  // Net savings vs paying all cash upfront
  const savingsVsUpfront = Math.max(0, potentialMFGains - Math.round(totalInterest));

  return {
    monthlyEMI: Math.round(monthlyEMI),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
    requiredMFPledge,
    savingsVsUpfront,
    potentialMFGains,
  };
}
