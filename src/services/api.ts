import { Product, CategoryFilter, SortOption } from '../types/product';
import { EMIPlan, PledgedFund, CheckoutOrder } from '../types/emi';
import { MOCK_PRODUCTS, MOCK_USER_PORTFOLIO } from './mockData';
import { calculateEMIDetails } from '../utils/formatters';

// Simulated delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface FetchProductsParams {
  category?: CategoryFilter;
  query?: string;
  sortBy?: SortOption;
  forceError?: boolean;
}

export const apiService = {
  /**
   * Fetch product listing with optional category filter, search query, and sorting
   */
  async getProducts(params: FetchProductsParams = {}): Promise<Product[]> {
    await delay(350);

    if (params.forceError) {
      throw new Error('Failed to load products. Please check your connection.');
    }

    let results = [...MOCK_PRODUCTS];

    // Filter by Category
    if (params.category && params.category !== 'all') {
      results = results.filter((item) => item.category === params.category);
    }

    // Filter by Search Query
    if (params.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.tagline.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.defaultPrice - b.defaultPrice);
          break;
        case 'price-desc':
          results.sort((a, b) => b.defaultPrice - a.defaultPrice);
          break;
        case 'emi-asc':
          results.sort((a, b) => a.lowestMonthlyEMI - b.lowestMonthlyEMI);
          break;
        case 'recommended':
        default:
          // Keep default curated order (featured & bestsellers first)
          results.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
      }
    }

    return results;
  },

  /**
   * Fetch single product by ID or slug
   */
  async getProductById(idOrSlug: string): Promise<Product> {
    await delay(250);
    const product = MOCK_PRODUCTS.find(
      (p) => p.id === idOrSlug || p.slug === idOrSlug
    );
    if (!product) {
      throw new Error(`Product not found: ${idOrSlug}`);
    }
    return product;
  },

  /**
   * Generate available EMI plans dynamically based on principal amount and down payment
   */
  async getEMIPlans(price: number, downPayment: number = 0): Promise<EMIPlan[]> {
    await delay(200);

    const principal = Math.max(0, price - downPayment);

    // Standard tenures supported by 1Fi
    const tenures = [
      { tenureMonths: 3, interestRate: 0, isNoCost: true, isPopular: false, isRecommended: false },
      { tenureMonths: 6, interestRate: 0, isNoCost: true, isPopular: true, isRecommended: false },
      { tenureMonths: 9, interestRate: 0, isNoCost: true, isPopular: false, isRecommended: false },
      { tenureMonths: 12, interestRate: 0, isNoCost: true, isPopular: false, isRecommended: true },
      { tenureMonths: 24, interestRate: 10.5, isNoCost: false, isPopular: false, isRecommended: false },
    ];

    return tenures.map((t) => {
      const calc = calculateEMIDetails(principal, t.tenureMonths, t.interestRate);
      return {
        tenureMonths: t.tenureMonths,
        monthlyEMI: calc.monthlyEMI,
        interestRate: t.interestRate,
        isNoCost: t.isNoCost,
        processingFee: 0, // 1Fi special: zero processing fee
        totalInterest: calc.totalInterest,
        totalPayable: calc.totalPayable,
        requiredMFPledge: calc.requiredMFPledge,
        savingsVsUpfront: calc.savingsVsUpfront,
        isPopular: t.isPopular,
        isRecommended: t.isRecommended,
      };
    });
  },

  /**
   * Fetch user's linked mutual fund portfolio for pledge simulation
   */
  async getUserPortfolio(): Promise<{
    funds: PledgedFund[];
    totalPortfolioValue: number;
    availableCreditLimit: number;
  }> {
    await delay(300);
    const totalPortfolioValue = MOCK_USER_PORTFOLIO.reduce(
      (sum, item) => sum + item.currentValue,
      0
    );
    // 1Fi standard limit: up to 80% of eligible equity portfolio value
    const availableCreditLimit = Math.round(totalPortfolioValue * 0.8);

    return {
      funds: MOCK_USER_PORTFOLIO,
      totalPortfolioValue,
      availableCreditLimit,
    };
  },

  /**
   * Simulate CAMS/KFintech lien pledge & confirm checkout order
   */
  async submitPledgeAndOrder(
    orderPayload: Omit<CheckoutOrder, 'orderId' | 'orderDate' | 'status' | 'pledgeTransactionId'>
  ): Promise<CheckoutOrder> {
    await delay(1200); // realistic time for biometric / otp / CAMS lien mark

    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `1FI-ORD-${randomNum}`;
    const pledgeTransactionId = `CAMS-LIEN-${Date.now()}`;

    const order: CheckoutOrder = {
      ...orderPayload,
      orderId,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      pledgeTransactionId,
      status: 'confirmed',
    };

    return order;
  },
};
