import { Product, CategoryFilter, SortOption } from '../types/product';
import { EMIPlan, PledgedFund, CheckoutOrder } from '../types/emi';
import { TopBrand, NearbyStore } from '../types/store';
import { MOCK_PRODUCTS, MOCK_USER_PORTFOLIO, MOCK_TOP_BRANDS, MOCK_NEARBY_STORES } from './mockData';
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
   * Fetch online partner brands (Top Brands tab)
   */
  async getTopBrands(query?: string, category?: string): Promise<TopBrand[]> {
    await delay(250);
    let results = [...MOCK_TOP_BRANDS];

    if (category && category !== 'all') {
      results = results.filter((b) => b.category === category);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.cashbackOffer.toLowerCase().includes(q) ||
          b.popularItems.some((item) => item.toLowerCase().includes(q))
      );
    }

    return results;
  },

  /**
   * Fetch nearby retail partner stores (Nearby Stores tab)
   */
  async getNearbyStores(params?: { query?: string; pincode?: string }): Promise<NearbyStore[]> {
    await delay(300);
    let results = [...MOCK_NEARBY_STORES];

    if (params?.pincode && params.pincode.trim()) {
      results = results.filter((s) => s.pincode.includes(params.pincode!.trim()));
    }

    if (params?.query && params.query.trim()) {
      const q = params.query.toLowerCase().trim();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.brand.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }

    return results;
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

  /**
   * Generate instant 1Fi virtual card / voucher for brand online checkout
   */
  async generateBrandVoucher(brandId: string, creditAmount: number) {
    await delay(600);
    const brand = MOCK_TOP_BRANDS.find((b) => b.id === brandId);
    return {
      voucherCode: `1FI-${brand?.name.toUpperCase().slice(0, 4) || 'CARD'}-${Math.floor(1000 + Math.random() * 9000)}`,
      validTill: 'Valid for 30 Days',
      maxLimit: creditAmount,
      tenure: '0% EMI up to 12 Months',
    };
  },

  /**
   * Process in-store retail counter QR payment via 1Fi mutual fund pledge
   */
  async processInStorePayment(storeId: string, amount: number, tenureMonths: number) {
    await delay(800);
    const store = MOCK_NEARBY_STORES.find((s) => s.id === storeId);
    return {
      transactionId: `1FI-POS-${Math.floor(100000 + Math.random() * 900000)}`,
      merchantName: store?.name || 'Retail Partner',
      amount,
      monthlyEMI: Math.round(amount / tenureMonths),
      tenureMonths,
      status: 'approved',
      qrReference: `1FI-IN-STORE-${Date.now()}`,
    };
  },
};
