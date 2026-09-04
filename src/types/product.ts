export interface ProductVariant {
  id: string;
  name: string;
  storage?: string;
  ram?: string;
  colorName: string;
  colorHex: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
  imageIndex?: number;
}

export interface ProductSpec {
  category: string;
  items: { label: string; value: string }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'tablets' | 'wearables';
  tagline: string;
  description: string;
  rating: number;
  reviewsCount: number;
  defaultPrice: number;
  defaultOriginalPrice: number;
  images: string[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  highlights: string[];
  lowestMonthlyEMI: number;
  deliveryDays: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  featuredDeal?: boolean;
}

export type CategoryFilter = 'all' | 'smartphones' | 'laptops' | 'audio' | 'tablets' | 'wearables';

export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'emi-asc';
