export type CurrencyCode = 'EUR' | 'USD' | 'XAF';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
  rateToEUR: number; // 1 EUR = rate * foreign
}

export type CategoryId = 'templates-and-ui' | 'formations-and-guides' | 'ebooks' | 'boilerplates' | 'presets-audio' | 'offres-speciales';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  assetCount: string;
  badgeColorClass: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  tagline: string;
  description: string;
  badge?: string;
  badgeType?: 'bestseller' | 'new' | 'top-rated' | 'guide';
  rating: number;
  reviewCount: number;
  priceEUR: number;
  originalPriceEUR?: number;
  priceFCFA: number;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  techStack: string;
  featured?: boolean;
  version: string;
  downloadsCount: number;
  includedFeatures: string[];
  fileSize: string;
  lastUpdated: string;
  license: string;
  gitRepoUrl?: string;
  downloadFileName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PurchasedAsset {
  id: string;
  productId: string;
  title: string;
  licenseKey: string;
  purchaseDate: string;
  downloadFileName: string;
  fileSize: string;
  version: string;
  gitRepoUrl?: string;
  pricePaid: string;
  invoiceId: string;
}

export interface Order {
  id: string;
  date: string;
  items: {
    title: string;
    price: string;
  }[];
  totalAmount: string;
  currency: CurrencyCode;
  paymentMethod: 'Stripe' | 'MTN MoMo' | 'Orange Money' | 'PayPal';
  status: 'Complété' | 'En attente' | 'Remboursé';
  customerEmail: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message?: string;
}

export type ActiveView = 
  | 'accueil' 
  | 'catalogue' 
  | 'templates-and-ui' 
  | 'formations-and-guides' 
  | 'offres-speciales' 
  | 'mon-espace-client' 
  | 'admin-dashboard'
  | 'cgv'
  | 'mentions-legales';
