import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProduct, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = products.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.techStack.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-[#181c24] border border-[#31353e] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[70vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#262a33] bg-[#1c2028]">
          <span className="material-symbols-outlined text-[#4cd7f6] text-xl">terminal</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher starter kit, design system, masterclass..."
            className="w-full bg-transparent text-[#dfe2ee] placeholder:text-[#908fa0] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#908fa0] hover:text-[#dfe2ee]"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <span className="px-1.5 py-0.5 rounded bg-[#262a33] text-[#908fa0] text-[10px] font-mono">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="p-2 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#908fa0] text-xs">
              Aucun actif ne correspond à votre recherche "{query}".
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsSearchOpen(false);
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#262a33] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-10 h-10 rounded-lg object-cover bg-[#0a0e16]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-[#dfe2ee] group-hover:text-[#c0c1ff] truncate">
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-[#908fa0] font-mono truncate">
                      {product.techStack} • {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <span className="text-xs font-bold text-[#4cd7f6]">
                    {formatPrice(product.priceEUR)}
                  </span>
                  <span className="block text-[10px] text-[#908fa0]">
                    ★ {product.rating}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-[#262a33] bg-[#0a0e16] flex items-center justify-between text-[11px] text-[#908fa0]">
          <span>{filtered.length} résultats disponibles</span>
          <span className="flex items-center gap-1 font-mono">
            <span>Navigation rapide</span>
            <kbd className="px-1 py-0.5 bg-[#181c24] rounded border border-[#262a33]">↵</kbd>
          </span>
        </div>
      </div>
    </div>
  );
};
