import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { formatPrice, quickBuy, addToCart, setSelectedProduct, currency } = useShop();

  const getBadgeClass = (badgeType?: string) => {
    switch (badgeType) {
      case 'bestseller':
        return 'bg-[#571bc1] text-[#dfe2ee]';
      case 'new':
        return 'bg-[#009eb9] text-[#002f38] font-bold';
      case 'top-rated':
        return 'bg-[#8083ff] text-[#0d0096] font-bold';
      case 'guide':
      default:
        return 'bg-[#262a33] text-[#dfe2ee]';
    }
  };

  return (
    <article className="flex flex-col rounded-xl bg-[#181c24] hover:bg-[#1c2028] border border-[#262a33] hover:border-[#31353e] transition-all duration-300 shadow-md hover:shadow-xl overflow-hidden group">
      {/* Product Image Container */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="relative w-full aspect-video overflow-hidden bg-[#262a33] cursor-pointer"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={product.imageAlt || product.title}
          src={product.imageUrl}
          loading="lazy"
        />

        {/* Top-Left Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${getBadgeClass(
                product.badgeType
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Instant Download Pill */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0a0e16]/90 backdrop-blur-md text-[#4cd7f6] font-mono text-[11px] border border-[#4cd7f6]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] animate-pulse"></span>
          <span>Instant</span>
        </div>
      </div>

      {/* Product Info & Actions */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Tech Stack & Rating */}
          <div className="flex items-center justify-between text-[#908fa0] text-xs mb-1.5 font-mono">
            <span className="truncate max-w-[170px] uppercase">{product.techStack}</span>
            <span className="text-[#4cd7f6] flex items-center gap-0.5 shrink-0">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>
                {product.rating} ({product.reviewCount})
              </span>
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-headline-sm text-base font-semibold text-[#dfe2ee] group-hover:text-[#c0c1ff] transition-colors line-clamp-1 cursor-pointer"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[#c7c4d7] mt-1.5 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Price & CTA Buttons */}
        <div className="pt-4 mt-3 border-t border-[#262a33]/60">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-[#dfe2ee]">
                {formatPrice(product.priceEUR)}
              </span>
              {product.originalPriceEUR && (
                <span className="text-xs text-[#908fa0] line-through ml-1.5">
                  {formatPrice(product.originalPriceEUR)}
                </span>
              )}
            </div>
            {/* Show FCFA equivalent if not currently on XAF */}
            {currency !== 'XAF' && (
              <span className="font-mono text-xs text-[#4cd7f6]">
                {product.priceFCFA.toLocaleString('fr-FR')} FCFA
              </span>
            )}
            {currency === 'XAF' && (
              <span className="font-mono text-xs text-[#908fa0]">
                ≈ {product.priceEUR} €
              </span>
            )}
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            <button
              onClick={() => quickBuy(product)}
              className="col-span-4 py-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Achat Rapide</span>
            </button>
            <button
              onClick={() => addToCart(product)}
              aria-label="Ajouter au panier"
              className="col-span-1 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#c7c4d7] hover:text-[#dfe2ee] transition-colors flex items-center justify-center cursor-pointer border border-[#31353e]/60"
              title="Ajouter au panier"
            >
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
