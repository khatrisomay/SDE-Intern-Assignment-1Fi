import { Product, ProductVariant } from './product';

export interface EMIPlan {
  tenureMonths: number;
  monthlyEMI: number;
  interestRate: number; // e.g., 0 for 0% No Cost EMI
  isNoCost: boolean;
  processingFee: number;
  totalInterest: number;
  totalPayable: number;
  requiredMFPledge: number;
  savingsVsUpfront: number; // Compounding gains from keeping MF invested
  isPopular?: boolean;
  isRecommended?: boolean;
}

export interface PledgedFund {
  id: string;
  schemeName: string;
  category: 'Equity' | 'Debt' | 'Hybrid';
  units: number;
  nav: number;
  currentValue: number;
  pledgedValue: number;
  amcLogo: string;
}

export interface CheckoutOrder {
  orderId: string;
  product: Product;
  selectedVariant: ProductVariant;
  emiPlan: EMIPlan;
  downPayment: number;
  orderDate: string;
  estimatedDeliveryDate: string;
  pledgeTransactionId: string;
  pledgedFunds: PledgedFund[];
  status: 'confirmed' | 'processing' | 'dispatched';
}
