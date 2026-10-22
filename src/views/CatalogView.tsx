import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/mockData';
import { CategoryId } from '../types';

export const CatalogView: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    formatPrice,
    quickBuy,
    addToCart,
  } = useShop();

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'downloads'>('featured');
  const [priceMax, setPriceMax] = useState<number>(200);

  // Extract all distinct tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag && !p.tags.includes(selectedTag)) {
        return false;
      }
      // Price filter
      if (p.priceEUR > priceMax) {
        return false;
      }
      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceEUR - b.priceEUR;
      if (sortBy === 'price-desc') return b.priceEUR - a.priceEUR;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedTag, priceMax, search, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedTag(null);
    setSearch('');
    setPriceMax(200);
    setSortBy('featured');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-10 space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#262a33] text-[#4cd7f6] font-mono text-xs border border-[#4cd7f6]/20">
          <span className="material-symbols-outlined text-sm">inventory_2</span>
          <span>CATALOGUE TECH ÉLITE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-headline-lg text-[#dfe2ee]">
          Explorez l'Arsenal Digital
        </h1>
        <p className="text-xs sm:text-sm text-[#c7c4d7] max-w-2xl leading-relaxed">
          Composants Next.js production-ready, design systems Figma complets, masterclasses 4K et playbooks validés par des milliers de créateurs tech.
        </p>
      </div>

      {/* Control Bar: Search, Category Tabs, Sorting */}
      <div className="space-y-4 p-5 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-md">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#908fa0] text-base">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, mot-clé, tech stack (Next.js, Supabase, Figma...)"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#1c2028] border border-[#31353e] text-[#dfe2ee] placeholder:text-[#908fa0] text-xs focus:outline-none focus:border-[#8083ff]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#908fa0] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#908fa0] hidden sm:inline">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#1c2028] border border-[#31353e] text-[#dfe2ee] text-xs rounded-lg px-3 py-2.5 focus:outline-none cursor-pointer"
            >
              <option value="featured">Recommandés / Vedettes</option>
              <option value="rating">Mieux notés (★ 4.9+)</option>
              <option value="downloads">Plus populaires</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#262a33]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#4cd7f6] text-[#002f38] shadow-sm'
                : 'bg-[#1c2028] text-[#c7c4d7] hover:bg-[#262a33] hover:text-[#dfe2ee]'
            }`}
          >
            Tous les Actifs ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#4cd7f6] text-[#002f38] shadow-sm'
                    : 'bg-[#1c2028] text-[#c7c4d7] hover:bg-[#262a33] hover:text-[#dfe2ee]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Tech Stack Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2">
          <span className="text-[11px] text-[#908fa0] mr-1 font-mono">Filtre Rapide :</span>
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-colors cursor-pointer border ${
                selectedTag === tag
                  ? 'bg-[#8083ff] text-[#0d0096] border-[#8083ff] font-bold'
                  : 'bg-[#1c2028] text-[#908fa0] hover:text-[#dfe2ee] border-[#262a33]'
              }`}
            >
              #{tag}
            </button>
          ))}
          {(selectedCategory !== 'all' || selectedTag || search) && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#ffb4ab] hover:underline ml-2 flex items-center gap-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Réinitialiser</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-[#908fa0] px-1">
        <span>
          Affichage de <strong className="text-[#dfe2ee]">{filteredProducts.length}</strong>{' '}
          produit(s) d'élite
        </span>
        <span className="flex items-center gap-1 text-[#4cd7f6]">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>Licence commerciale étendue & mises à jour incluses</span>
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#181c24] border border-[#262a33] space-y-3">
          <span className="material-symbols-outlined text-5xl text-[#31353e]">
            search_off
          </span>
          <h3 className="text-base font-bold text-[#dfe2ee]">
            Aucun asset ne correspond à ces critères
          </h3>
          <p className="text-xs text-[#908fa0] max-w-sm mx-auto">
            Modifiez votre recherche ou réinitialisez les filtres pour découvrir le reste de notre catalogue.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-[#262a33] text-[#4cd7f6] text-xs font-semibold hover:bg-[#31353e]"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
