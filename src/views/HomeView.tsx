import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES, FAQS } from '../data/mockData';
import { CategoryId } from '../types';

export const HomeView: React.FC = () => {
  const {
    products,
    setActiveView,
    setSelectedCategory,
    setIsSearchOpen,
    quickBuy,
    addToCart,
    applyPromoCode,
    addToast,
    formatPrice,
  } = useShop();

  const [heroSearch, setHeroSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setActiveView('catalogue');
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveView('catalogue');
  };

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    applyPromoCode('NOVA15');
    setNewsletterSubmitted(true);
    addToast({
      type: 'success',
      title: 'Code NOVA15 appliqué (-15%) !',
      message: 'Votre code de réduction est prêt pour votre première commande.'
    });
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 5000);
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const founderBundle = products.find((p) => p.slug === 'bundle-founder-360') || products[0];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#0a0e16]">
        {/* Atmospheric lighting effects */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#c0c1ff]/20 blur-[130px] rounded-full pointer-events-none"></div>
        <div className="absolute top-48 -right-20 w-[420px] h-[420px] bg-[#4cd7f6]/10 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-20 w-[400px] h-[400px] bg-[#571bc1]/30 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-12 pt-16 pb-20 lg:pt-24 lg:pb-28 flex flex-col items-center text-center">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#262a33]/70 backdrop-blur-md mb-6 shadow-sm border border-[#31353e]/60">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd7f6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd7f6]"></span>
            </span>
            <span className="font-mono text-xs text-[#4cd7f6]">NOVA CATALOGUE 2025</span>
            <span className="text-[#908fa0]">/</span>
            <span className="text-xs text-[#c7c4d7] font-medium">
              1 420+ Composants & Boilerplates prêts
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl text-[#dfe2ee] max-w-4xl tracking-tight leading-tight font-extrabold mb-4">
            Accélérez vos projets tech avec des assets digitaux d’élite
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#c7c4d7] max-w-2xl mx-auto mb-8 leading-relaxed">
            Templates Next.js & Figma, formations avancées, presets créatifs et outils conçus par des experts. Téléchargement instantané et licence commerciale étendue incluse.
          </p>

          {/* Search Console Bar */}
          <div className="w-full max-w-2xl bg-[#1c2028]/90 backdrop-blur-xl p-1 rounded-xl shadow-2xl mb-4 border border-[#31353e]">
            <form onSubmit={handleHeroSearchSubmit} className="flex items-center gap-2 px-3 py-1.5">
              <span className="material-symbols-outlined text-[#908fa0] text-xl">terminal</span>
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                autoComplete="off"
                placeholder="Rechercher un starter kit, design system, guide..."
                className="w-full bg-transparent text-[#dfe2ee] placeholder:text-[#908fa0] text-sm focus:outline-none"
              />
              <span
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:inline-flex px-1.5 py-0.5 rounded bg-[#262a33] text-[#c7c4d7] font-mono text-[11px] cursor-pointer hover:bg-[#31353e] transition-colors"
                title="Ouvrir la palette de commande"
              >
                ⌘K
              </span>
              <button
                type="submit"
                className="shrink-0 px-4 sm:px-6 py-2 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] hover:opacity-95 text-[#dfe2ee] text-xs font-semibold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Rechercher</span>
                <span className="material-symbols-outlined text-base">search</span>
              </button>
            </form>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs">
            <span className="text-[#908fa0] font-medium mr-1">Populaire :</span>
            <button
              onClick={() => handleTagClick('SaaS Starter')}
              className="px-3 py-1 rounded-full bg-[#181c24] hover:bg-[#262a33] text-[#c7c4d7] hover:text-[#c0c1ff] font-mono text-xs transition-colors border border-[#262a33] cursor-pointer"
            >
              SaaS Starter
            </button>
            <button
              onClick={() => handleTagClick('Figma Design System')}
              className="px-3 py-1 rounded-full bg-[#181c24] hover:bg-[#262a33] text-[#c7c4d7] hover:text-[#c0c1ff] font-mono text-xs transition-colors border border-[#262a33] cursor-pointer"
            >
              Figma Design System
            </button>
            <button
              onClick={() => handleTagClick('Masterclass Next.js')}
              className="px-3 py-1 rounded-full bg-[#181c24] hover:bg-[#262a33] text-[#c7c4d7] hover:text-[#c0c1ff] font-mono text-xs transition-colors border border-[#262a33] cursor-pointer"
            >
              Masterclass Next.js
            </button>
            <button
              onClick={() => handleTagClick('Prompt Packs')}
              className="px-3 py-1 rounded-full bg-[#181c24] hover:bg-[#262a33] text-[#c7c4d7] hover:text-[#c0c1ff] font-mono text-xs transition-colors border border-[#262a33] cursor-pointer"
            >
              Prompt Packs
            </button>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveView('catalogue');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-[#8083ff] via-[#571bc1] to-[#009eb9] hover:brightness-110 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explorer le Catalogue</span>
              <span className="material-symbols-outlined text-base">north_east</span>
            </button>
            <a
              href="#bundles"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#262a33]/60 hover:bg-[#262a33] text-[#dfe2ee] font-semibold text-sm transition-colors flex items-center justify-center gap-2 border border-[#31353e]"
            >
              <span className="material-symbols-outlined text-[#4cd7f6] text-base">
                local_offer
              </span>
              <span>Voir les Bundles Promo</span>
            </a>
          </div>

          {/* Reassurance Strip */}
          <div className="mt-12 pt-8 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#1c2028]">
            <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-[#181c24]/40 border border-[#262a33]/40">
              <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">groups</span>
              <div className="text-left">
                <p className="text-base font-bold text-[#dfe2ee] leading-tight">14 000+</p>
                <p className="text-xs text-[#908fa0]">Créateurs & Devs Actifs</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-[#181c24]/40 border border-[#262a33]/40">
              <span
                className="material-symbols-outlined text-[#4cd7f6] text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <div className="text-left">
                <p className="text-base font-bold text-[#dfe2ee] leading-tight">4.9 / 5</p>
                <p className="text-xs text-[#908fa0]">+2 800 Avis Vérifiés</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-[#181c24]/40 border border-[#262a33]/40">
              <span className="material-symbols-outlined text-[#c0c1ff] text-2xl">lock</span>
              <div className="text-left">
                <p className="text-base font-bold text-[#dfe2ee] leading-tight">Stripe & MoMo</p>
                <p className="text-xs text-[#908fa0]">MTN / Orange & Cartes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="font-mono text-xs text-[#4cd7f6] tracking-wider uppercase">
              Architecture d’actifs
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#dfe2ee] mt-1 font-bold">
              Catégories Populaires
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#c7c4d7] max-w-md">
            Une collection rigoureusement testée, nettoyée et mise à jour pour accélérer chaque étape de votre pipeline tech.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group p-5 rounded-xl bg-[#181c24] hover:bg-[#1c2028] border border-[#262a33] hover:border-[#31353e] transition-all shadow-sm flex flex-col justify-between min-h-[200px] text-left cursor-pointer"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-[#262a33] flex items-center justify-center ${cat.badgeColorClass} group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-[#dfe2ee] group-hover:text-[#c0c1ff] transition-colors font-semibold">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#c7c4d7] mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#262a33]/50">
                <span className="font-mono text-xs text-[#908fa0]">{cat.assetCount}</span>
                <span className="material-symbols-outlined text-[#908fa0] group-hover:text-[#dfe2ee] group-hover:translate-x-1 transition-all text-base">
                  arrow_forward
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full bg-[#0a0e16]/60 py-16 border-y border-[#1c2028]" id="catalogue">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#4cd7f6] font-mono text-xs uppercase mb-1">
                <span className="material-symbols-outlined text-sm">verified</span> Sélection Éditeur
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#dfe2ee] font-bold">
                Produits Vedettes de la Semaine
              </h2>
            </div>
            <button
              onClick={() => {
                setActiveView('catalogue');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1 text-[#c0c1ff] hover:text-[#dfe2ee] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>Voir tout le catalogue</span>
              <span className="material-symbols-outlined text-base">arrow_right_alt</span>
            </button>
          </div>

          {/* 4 High Detail Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Bundle Offer Showcase */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16" id="bundles">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#1c2028] to-[#181c24] p-6 lg:p-10 overflow-hidden shadow-2xl border border-[#262a33]">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#8083ff]/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#571bc1] text-[#dfe2ee] font-mono text-xs">
                <span className="material-symbols-outlined text-sm text-[#4cd7f6]">redeem</span>
                <span>MEGA BUNDLE LIMITÉ</span>
              </div>
              <h3 className="text-2xl sm:text-4xl text-[#dfe2ee] font-extrabold leading-tight font-headline-lg">
                Le Pack Ultime « Founder 360° »
              </h3>
              <p className="text-sm text-[#c7c4d7] leading-relaxed">
                Réunissez le SaaS Starter Nexus, le Design System Figma 2024, la Masterclass Full-Stack et les 50 playbooks Notion dans un bundle clés en main à tarif unique.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-[#dfe2ee] text-xs font-medium">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-base">
                    check_circle
                  </span>
                  <span>Licence Commerciale Illimitée</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#dfe2ee] text-xs font-medium">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-base">
                    check_circle
                  </span>
                  <span>Mises à jour à vie (v2 & v3)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#dfe2ee] text-xs font-medium">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-base">
                    check_circle
                  </span>
                  <span>Canal Discord VIP Inclus</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <div>
                  <span className="text-3xl font-extrabold text-[#dfe2ee]">
                    {formatPrice(founderBundle.priceEUR)}
                  </span>
                  <span className="text-sm text-[#908fa0] line-through ml-2">
                    {formatPrice(founderBundle.originalPriceEUR || 236)}
                  </span>
                  <span className="block font-mono text-xs text-[#4cd7f6]">
                    ou {founderBundle.priceFCFA.toLocaleString('fr-FR')} FCFA
                  </span>
                </div>
                <button
                  onClick={() => quickBuy(founderBundle)}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] hover:brightness-110 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    shopping_cart_checkout
                  </span>
                  <span>Débloquer le Pack Ultime (-45%)</span>
                </button>
              </div>
            </div>

            {/* Graphical Visualizer of the bundle content */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-xl bg-[#262a33]/80 p-4 backdrop-blur-md shadow-2xl border border-[#31353e]">
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[#1c2028] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#c0c1ff] text-base">
                        code
                      </span>
                      <span className="text-xs text-[#dfe2ee] font-medium">Nexus Starter Kit</span>
                    </div>
                    <span className="font-mono text-xs text-[#908fa0]">69 €</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#1c2028] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#4cd7f6] text-base">
                        draw
                      </span>
                      <span className="text-xs text-[#dfe2ee] font-medium">Design System 2024</span>
                    </div>
                    <span className="font-mono text-xs text-[#908fa0]">49 €</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#1c2028] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#d0bcff] text-base">
                        videocam
                      </span>
                      <span className="text-xs text-[#dfe2ee] font-medium">
                        Masterclass Full-Stack
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#908fa0]">89 €</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#1c2028] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#e1e0ff] text-base">
                        menu_book
                      </span>
                      <span className="text-xs text-[#dfe2ee] font-medium">E-book Solopreneur</span>
                    </div>
                    <span className="font-mono text-xs text-[#908fa0]">29 €</span>
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs text-[#dfe2ee] border-t border-[#31353e]">
                    <span>Réduction Bundle (-45%)</span>
                    <span className="text-[#4cd7f6] font-bold">-107 €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose NovaDigital (3 Value Pillars) */}
      <section className="w-full bg-[#181c24] py-16 border-y border-[#262a33]">
        <div className="max-w-7xl mx-auto px-4 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-wider">
              Standards d’Excellence
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#dfe2ee] mt-1 font-bold">
              Pourquoi choisir NovaDigital ?
            </h2>
            <p className="text-xs sm:text-sm text-[#c7c4d7] mt-2">
              Nous supprimons les frictions techniques et financières afin que vous puissiez lancer vos idées à la vitesse de la lumière.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-xl bg-[#1c2028]/70 border border-[#262a33] shadow-sm flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-[#8083ff]/20 text-[#c0c1ff] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">cloud_sync</span>
              </div>
              <h3 className="font-headline-sm text-base font-semibold text-[#dfe2ee] mb-2">
                Accès instantané & à vie
              </h3>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                Téléchargez vos archives zip et vos accès Git dès la validation du paiement. Vos liens restent disponibles à vie sur votre espace client avec chaque mise à jour future sans frais.
              </p>
            </div>
            {/* Pillar 2 */}
            <div className="p-6 rounded-xl bg-[#1c2028]/70 border border-[#262a33] shadow-sm flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-[#009eb9]/20 text-[#4cd7f6] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">forum</span>
              </div>
              <h3 className="font-headline-sm text-base font-semibold text-[#dfe2ee] mb-2">
                Support direct Discord privé
              </h3>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                Pas de tickets perdus. Échangez directement avec les auteurs de chaque template sur notre Discord réservé aux acquéreurs pour résoudre vos bugs ou demander des extensions.
              </p>
            </div>
            {/* Pillar 3 */}
            <div className="p-6 rounded-xl bg-[#1c2028]/70 border border-[#262a33] shadow-sm flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-xl bg-[#571bc1]/20 text-[#d0bcff] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">currency_exchange</span>
              </div>
              <h3 className="font-headline-sm text-base font-semibold text-[#dfe2ee] mb-2">
                Paiement local & multi-devises
              </h3>
              <p className="text-xs text-[#c7c4d7] leading-relaxed">
                Réglez sans barrière géographique par Carte Bancaire internationale, Apple Pay, Google Pay ou Mobile Money local (MTN MoMo, Orange Money) en FCFA, EUR et USD.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="font-mono text-xs text-[#4cd7f6] tracking-wider uppercase">
              Communauté Élite
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#dfe2ee] mt-1 font-bold">
              Ce que disent nos créateurs
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-[#4cd7f6]">4.9/5</span>
            <div className="flex text-[#4cd7f6]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="text-xs text-[#908fa0] ml-1">sur 2 800+ transactions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="p-5 rounded-xl bg-[#181c24] border border-[#262a33] shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#4cd7f6]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#c7c4d7] italic leading-relaxed">
                « Le starter kit Nexus m’a épargné au bas mot 3 semaines de setup fastidieux. Le code TypeScript est impeccable, les règles Supabase RLS sont blindées et le paiement MTN a fonctionné du premier coup depuis Abidjan. »
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-4 border-t border-[#262a33]/60">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#4cd7f6]/20"
                alt="Marc-Aurèle K."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm-ELTvethu8hSzx-_XEQBKkCf7UAWomspvjJVgUm3nabpk2qU9xzHX4ciftR0Rw_OABD-PKXVD2aGealnfjwri_3OvVwtgnAR0AQdjDrEqfSUM3A2MLt8dL6LJOmRMkT137z6-XcNtlf5tkv2bYgFRc5b-xtOf3VreINB7SQAabTqRVAxMX0udT6w3jx-ZYMpDJfIk-RJpoNQYfxo3tFBjVsyWcbS5Zd4YRt2FI3xQrnh2OB653hi"
              />
              <div>
                <h4 className="text-xs font-semibold text-[#dfe2ee]">Marc-Aurèle K.</h4>
                <p className="text-[11px] text-[#908fa0]">Lead Dev SaaS • Côte d’Ivoire</p>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="p-5 rounded-xl bg-[#181c24] border border-[#262a33] shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#4cd7f6]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#c7c4d7] italic leading-relaxed">
                « En tant que designer freelance pour des startups fintech, le kit Figma 2024 est une masterclass d’organisation. Tout est variable-tokenized, adaptable en 2 clics pour mes clients. La qualité dépasse de loin la moyenne du marché. »
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-4 border-t border-[#262a33]/60">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#4cd7f6]/20"
                alt="Éléonore V."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSAxOoZk5IWrVyw-LY0WRhsbPLp5lEYACi__zCkvOa4q4iZYp6uYKyQTKzydcn-0CGQCQbtmB4AE8CylGgGQ2qJiV-fuhueHJHzvt8qROW1r6YJXS84cgO2MjXYeVq5DSW5hXCxzpVI9B8lac3Oh3FTaz2eKCHvgFKle_7UlnxF9T85u_EPPLeICwjLd7xaHPdiwGxMuF4BSMqiiEROkTJFgQszcbjTwQi5grdpFW7PCZkh4R0Jc8g"
              />
              <div>
                <h4 className="text-xs font-semibold text-[#dfe2ee]">Éléonore V.</h4>
                <p className="text-[11px] text-[#908fa0]">Product Designer • Paris</p>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="p-5 rounded-xl bg-[#181c24] border border-[#262a33] shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#4cd7f6]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#c7c4d7] italic leading-relaxed">
                « J’ai acheté le Guide du Solopreneur et suivi la formation Full-Stack. Deux mois plus tard, mon premier outil d’automatisation génère déjà 1 800 € de MRR. Le support sur Discord est d’une réactivité déconcertante. »
              </p>
            </div>
            <div className="flex items-center gap-3 pt-6 mt-4 border-t border-[#262a33]/60">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#4cd7f6]/20"
                alt="Tarik B."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeNcpmqdC8VT-22FGI08FMtbKv_w6WLkItLSDzqTGMYLmHc4WD8Y-mKkFYvUiyi93gqn-xUG-LvMMy-YA_fGnwqpi1rtwk9dqq5m6FzgxtVLs3gMADPWyY46Ye40wReEx_fYqB7aUAJrrjs23ei91K6Vpmc7L6sg61MwshIhBcRNl1y5JhySb3Shs_3UjFEvfqX9veJX3ZDLupbGm5gIlz39mK8yZ1jO1YC1XwMULyeHYYvaNs6Doa"
              />
              <div>
                <h4 className="text-xs font-semibold text-[#dfe2ee]">Tarik B.</h4>
                <p className="text-[11px] text-[#908fa0]">Solopreneur • Casablanca</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="w-full bg-[#0a0e16]/80 py-16 border-t border-[#1c2028]">
        <div className="max-w-4xl mx-auto px-4 lg:px-12">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-wider">
              Transparence & Réponses
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#dfe2ee] mt-1 font-bold">
              Questions Fréquentes
            </h2>
            <p className="text-xs sm:text-sm text-[#c7c4d7] mt-1">
              Tout ce que vous devez savoir sur nos licences, livraisons et garanties.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#181c24] border border-[#262a33] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-[#dfe2ee] hover:text-[#c0c1ff] transition-colors font-semibold text-sm cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`material-symbols-outlined text-[#908fa0] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#4cd7f6]' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-[#c7c4d7] text-xs sm:text-sm leading-relaxed border-t border-[#262a33]/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VIP Newsletter Section (-15% Offer) */}
      <section className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16">
        <div className="relative rounded-2xl bg-[#1c2028] p-6 lg:p-12 overflow-hidden shadow-2xl border border-[#31353e]">
          {/* Glow ambient background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#4cd7f6]/10 rounded-full blur-[90px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c0c1ff]/10 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#262a33] text-[#4cd7f6] font-mono text-xs border border-[#4cd7f6]/20">
              <span className="material-symbols-outlined text-sm">percent</span>
              <span>OFFRE DE BIENVENUE VIP</span>
            </div>

            <h3 className="text-2xl sm:text-4xl text-[#dfe2ee] font-extrabold leading-tight font-headline-lg">
              Obtenez -15% immédiats sur votre première acquisition
            </h3>

            <p className="text-xs sm:text-sm text-[#c7c4d7] leading-relaxed max-w-xl mx-auto">
              Rejoignez le cercle restreint de nos 14 000 ingénieurs et créateurs. Recevez un code de réduction instantané ainsi que notre curation hebdomadaire des meilleurs composants détachables.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
            >
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#908fa0] text-base">
                  alternate_email
                </span>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#181c24] text-[#dfe2ee] placeholder:text-[#908fa0] text-xs focus:outline-none focus:bg-[#0a0e16] border border-[#31353e] transition-colors"
                />
              </div>

              <button
                type="submit"
                className={`w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ${
                  newsletterSubmitted
                    ? 'bg-[#009eb9] text-[#002f38]'
                    : 'bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9]'
                }`}
              >
                {newsletterSubmitted ? (
                  <>
                    <span className="material-symbols-outlined text-base">check</span>
                    <span>Code activé : NOVA15</span>
                  </>
                ) : (
                  <>
                    <span>Débloquer -15%</span>
                    <span className="material-symbols-outlined text-base">send</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-[#908fa0] pt-1">
              Zéro spam. Désinscription en 1 clic à tout instant.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
