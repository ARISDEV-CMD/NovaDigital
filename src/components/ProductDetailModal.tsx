import React from 'react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    quickBuy,
    currency,
    downloadAssetSimulated,
  } = useShop();

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setSelectedProduct(null)}
      />

      <div className="relative w-full max-w-3xl bg-[#181c24] border border-[#262a33] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-8">
        {/* Header with Close */}
        <div className="p-4 border-b border-[#262a33] flex items-center justify-between bg-[#1c2028]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-xl">
              verified
            </span>
            <span className="text-xs font-mono text-[#c7c4d7] uppercase">
              {selectedProduct.techStack} • {selectedProduct.version}
            </span>
          </div>
          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 rounded-lg hover:bg-[#262a33] text-[#908fa0] hover:text-[#dfe2ee] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Visual Preview */}
          <div className="relative rounded-xl overflow-hidden aspect-video bg-[#0a0e16] border border-[#262a33]">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              className="w-full h-full object-cover"
            />
            {selectedProduct.badge && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#571bc1] text-[#dfe2ee] text-xs font-bold uppercase tracking-wider shadow">
                {selectedProduct.badge}
              </span>
            )}
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#0a0e16]/90 backdrop-blur-md text-[#4cd7f6] text-xs font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse"></span>
              <span>Téléchargement Instantané {selectedProduct.fileSize}</span>
            </div>
          </div>

          {/* Title & Stats */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-bold font-headline-sm text-[#dfe2ee]">
                {selectedProduct.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#c0c1ff]">
                  {formatPrice(selectedProduct.priceEUR)}
                </span>
                {selectedProduct.originalPriceEUR && (
                  <span className="text-sm text-[#908fa0] line-through">
                    {formatPrice(selectedProduct.originalPriceEUR)}
                  </span>
                )}
                {currency !== 'XAF' && (
                  <span className="text-xs text-[#4cd7f6] font-mono ml-2">
                    ({selectedProduct.priceFCFA.toLocaleString('fr-FR')} FCFA)
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#908fa0]">
              <span className="flex items-center gap-1 text-[#4cd7f6]">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <strong>{selectedProduct.rating}</strong> ({selectedProduct.reviewCount} avis vérifiés)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">download</span>
                {selectedProduct.downloadsCount} téléchargements
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">update</span>
                Mis à jour : {selectedProduct.lastUpdated}
              </span>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#dfe2ee] font-headline-sm">
              Description & Cas d'usage
            </h3>
            <p className="text-xs text-[#c7c4d7] leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {/* Features Included */}
          <div className="space-y-3 p-4 rounded-xl bg-[#1c2028] border border-[#262a33]">
            <h3 className="text-xs font-bold text-[#dfe2ee] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#4cd7f6]">
                inventory_2
              </span>
              <span>Ce qui est inclus dans votre acquisition :</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {selectedProduct.includedFeatures.map((feat, index) => (
                <div key={index} className="flex items-start gap-2 text-[#dfe2ee]">
                  <span className="material-symbols-outlined text-sm text-[#4cd7f6] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedProduct.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-[#262a33] text-[#c7c4d7] text-xs font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-[#262a33] bg-[#0f131c] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => downloadAssetSimulated(selectedProduct)}
              className="px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#4cd7f6] text-xs font-semibold flex items-center gap-1.5 border border-[#4cd7f6]/20 transition-colors cursor-pointer"
              title="Télécharger l'échantillon ou spec"
            >
              <span className="material-symbols-outlined text-sm">file_download</span>
              <span>Spécifications & Extrait</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart(selectedProduct);
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-[#31353e]"
            >
              <span className="material-symbols-outlined text-base">add_shopping_cart</span>
              <span>Ajouter au Panier</span>
            </button>
            <button
              onClick={() => {
                quickBuy(selectedProduct);
                setSelectedProduct(null);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] hover:brightness-110 text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Acheter ({formatPrice(selectedProduct.priceEUR)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
