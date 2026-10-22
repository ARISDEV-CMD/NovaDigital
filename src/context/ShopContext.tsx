import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  CurrencyCode,
  PurchasedAsset,
  Order,
  ToastMessage,
  ActiveView,
  CategoryId,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_PURCHASED_ASSETS,
  INITIAL_ORDERS,
} from '../data/mockData';

interface ShopContextType {
  products: Product[];
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (priceEUR: number) => string;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotalEUR: number;
  discountedTotalEUR: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickBuy: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  toasts: ToastMessage[];
  addToast: (toast: { type: 'success' | 'info' | 'error'; title: string; message?: string }) => void;
  removeToast: (id: string) => void;
  purchasedAssets: PurchasedAsset[];
  orders: Order[];
  appliedPromoCode: string | null;
  applyPromoCode: (code: string) => boolean;
  discountRate: number;
  completeCheckout: (
    paymentMethod: 'Stripe' | 'MTN MoMo' | 'Orange Money' | 'PayPal',
    customerEmail?: string
  ) => Promise<{ success: boolean; orderId?: string }>;
  addProduct: (newProd: Product) => void;
  deleteProduct: (id: string) => void;
  downloadAssetSimulated: (asset: PurchasedAsset | Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeView, setActiveView] = useState<ActiveView>('accueil');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [currency, setCurrency] = useState<CurrencyCode>('EUR');
  
  // Initial cart starts with 2 demo items as featured in the header badge of the user mockup
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 },
    { product: INITIAL_PRODUCTS[1], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [purchasedAssets, setPurchasedAssets] = useState<PurchasedAsset[]>(INITIAL_PURCHASED_ASSETS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Keyboard shortcut ⌘K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (toast: { type: 'success' | 'info' | 'error'; title: string; message?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (priceEUR: number): string => {
    switch (currency) {
      case 'EUR':
        return `${priceEUR} €`;
      case 'USD':
        return `$${Math.round(priceEUR * 1.08)}`;
      case 'XAF':
        // Standard FCFA conversion rounded to nearest 500
        const fcfa = Math.round((priceEUR * 655.957) / 100) * 100;
        return `${fcfa.toLocaleString('fr-FR')} FCFA`;
      default:
        return `${priceEUR} €`;
    }
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Déjà dans votre panier',
          message: `${product.title} est déjà prêt pour la commande.`
        });
        return prev;
      }
      addToast({
        type: 'success',
        title: 'Ajouté au panier !',
        message: `${product.title} a été ajouté avec succès.`
      });
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Article retiré',
      message: 'Le produit a été retiré de votre panier.'
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const quickBuy = (product: Product) => {
    // If not in cart, add it
    if (!cart.some((item) => item.product.id === product.id)) {
      setCart((prev) => [...prev, { product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NOVA15' || clean === 'VIP15') {
      setAppliedPromoCode(clean);
      setDiscountRate(0.15);
      addToast({
        type: 'success',
        title: 'Code promo appliqué (-15%) !',
        message: 'Votre réduction a été déduite de votre panier.'
      });
      return true;
    } else if (clean === 'NOVA30') {
      setAppliedPromoCode(clean);
      setDiscountRate(0.30);
      addToast({
        type: 'success',
        title: 'Code VIP appliqué (-30%) !',
        message: 'Remise spéciale partenaire activée.'
      });
      return true;
    } else {
      addToast({
        type: 'error',
        title: 'Code promo invalide',
        message: 'Veuillez vérifier votre code ou utiliser NOVA15.'
      });
      return false;
    }
  };

  const cartTotalEUR = cart.reduce((acc, item) => acc + item.product.priceEUR * item.quantity, 0);
  const discountedTotalEUR = Math.max(0, cartTotalEUR * (1 - discountRate));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const completeCheckout = async (
    paymentMethod: 'Stripe' | 'MTN MoMo' | 'Orange Money' | 'PayPal',
    customerEmail: string = 'karistidegael@gmail.com'
  ): Promise<{ success: boolean; orderId?: string }> => {
    if (cart.length === 0) return { success: false };

    const orderId = `CMD-${Math.floor(10000 + Math.random() * 90000)}`;
    const invoiceId = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Create new purchased assets
    const newPurchased: PurchasedAsset[] = cart.map((item, index) => {
      const codePart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const codePart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
      return {
        id: `purch-${Date.now()}-${index}`,
        productId: item.product.id,
        title: item.product.title,
        licenseKey: `NOVA-${codePart}-${codePart2}-COMMERCIAL-2026`,
        purchaseDate: currentDate,
        downloadFileName: item.product.downloadFileName || `${item.product.slug}.zip`,
        fileSize: item.product.fileSize || '45 MB',
        version: item.product.version || 'v2.0',
        gitRepoUrl: item.product.gitRepoUrl,
        pricePaid: `${formatPrice(item.product.priceEUR * (1 - discountRate))} (${paymentMethod})`,
        invoiceId
      };
    });

    const newOrder: Order = {
      id: orderId,
      date: `${currentDate}, ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`,
      items: cart.map((c) => ({
        title: c.product.title,
        price: formatPrice(c.product.priceEUR * (1 - discountRate))
      })),
      totalAmount: formatPrice(discountedTotalEUR),
      currency,
      paymentMethod,
      status: 'Complété',
      customerEmail
    };

    setPurchasedAssets((prev) => [...newPurchased, ...prev]);
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);

    addToast({
      type: 'success',
      title: 'Paiement confirmé avec succès !',
      message: `Votre commande ${orderId} est disponible dans votre Espace Client.`
    });

    return { success: true, orderId };
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    addToast({
      type: 'success',
      title: 'Produit ajouté au catalogue !',
      message: `${newProd.title} est désormais en ligne.`
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast({
      type: 'info',
      title: 'Produit supprimé',
      message: 'L\'asset a été retiré du catalogue.'
    });
  };

  const downloadAssetSimulated = (asset: PurchasedAsset | Product) => {
    const filename = asset.downloadFileName || ('slug' in asset ? `${(asset as Product).slug}.zip` : 'nova-asset.zip');
    // Create a virtual download trigger
    const blob = new Blob([
      `=== NOVADIGITAL ASSET VERIFICATION ===\n` +
      `Asset: ${asset.title}\n` +
      `Delivery Date: ${new Date().toISOString()}\n` +
      `License: Commercial Extended Lifetime\n` +
      `Verification Key: ${'licenseKey' in asset ? asset.licenseKey : 'NOVA-DEV-KEY-ACTIVE-2026'}\n` +
      `Thank you for trusting NovaDigital. Support Discord: https://discord.gg/novadigital-pro\n`
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Téléchargement démarré',
      message: `L'archive ${filename} a été générée.`
    });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotalEUR,
        discountedTotalEUR,
        isCartOpen,
        setIsCartOpen,
        quickBuy,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        selectedProduct,
        setSelectedProduct,
        toasts,
        addToast,
        removeToast,
        purchasedAssets,
        orders,
        appliedPromoCode,
        applyPromoCode,
        discountRate,
        completeCheckout,
        addProduct,
        deleteProduct,
        downloadAssetSimulated
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
