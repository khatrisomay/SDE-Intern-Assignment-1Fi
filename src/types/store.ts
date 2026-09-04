export interface TopBrand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  bannerColor: string;
  category: 'electronics' | 'smartphones' | 'audio' | 'appliances' | 'lifestyle';
  cashbackOffer: string;
  maxNoCostTenure: number;
  featuredProductsCount: number;
  websiteUrl: string;
  popularItems: string[];
}

export interface NearbyStore {
  id: string;
  name: string;
  brand: string;
  logo: string;
  category: string;
  address: string;
  city: string;
  pincode: string;
  distanceKm: number;
  isOpen: boolean;
  timing: string;
  phone: string;
  acceptedFinancing: string;
  rating: number;
  reviewsCount: number;
}
