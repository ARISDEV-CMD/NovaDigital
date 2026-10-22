import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, CategoryId } from '../types';
import { CATEGORIES } from '../data/mockData';

export const AdminView: React.FC = () => {
  const { products, orders, addProduct, deleteProduct, formatPrice } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryId>('templates-and-ui');
  const [newPriceEUR, setNewPriceEUR] = useState(49);
  const [newTechStack, setNewTechStack] = useState('NEXT.JS 15 • TAILWIND');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuChyjSUycIHB-YD4xSVlGpBeONahaGJKbx9dmB1X4DIUKkWXWGEK6Z8XaoGBSWvouPibmK8VRC-wqxq1sRi3aEbnrayuUcs_4hn1NFbNJKerRu4eWOgG-EEBh_qyZhr8JVCbf14hgjXqTZHIXRhRX9eryv11NyD6q_VUx_tgV_pMibrxzFpMVlgRjXrhWrsfTmmJ3YnRwC3Hnc8ONRDeTSHO-qFNu9HJkeGxfCuJSpk7mc4oFauufhj'
  );
  const [newTags, setNewTags] = useState('Next.js, Tailwind, React');

  // Compute metrics
  const totalRevenueEUR = orders.reduce((acc, order) => {
    const raw = parseFloat(order.totalAmount.replace(/[^0-9.]/g, '')) || 50;
    return acc + raw;
  }, 14850);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug,
      title: newTitle,
      category: newCategory,
      tagline: newDescription.slice(0, 80) + '...',
      description: newDescription || 'Asset numérique professionnel conçu pour accélérer votre développement.',
      badge: 'Nouveau',
      badgeType: 'new',
      rating: 5.0,
      reviewCount: 1,
      priceEUR: newPriceEUR,
      priceFCFA: Math.round(newPriceEUR * 655),
      imageUrl: newImageUrl,
      imageAlt: newTitle,
      tags: newTags.split(',').map((t) => t.trim()),
      techStack: newTechStack,
      featured: true,
      version: 'v1.0.0',
      downloadsCount: 0,
      includedFeatures: [
        'Code source TypeScript complet sans obfuscation',
        'Licence commerciale étendue incluse',
        'Support direct sur Discord privé',
        'Mises à jour gratuites à vie'
      ],
      fileSize: '35 MB .zip',
      lastUpdated: new Date().toLocaleDateString('fr-FR'),
      license: 'Licence Commerciale Illimitée',
      downloadFileName: `${slug}-v1.0.0.zip`
    };

    addProduct(newProd);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#571bc1] text-[#dfe2ee] font-mono text-xs">
            <span className="material-symbols-outlined text-sm text-[#4cd7f6]">
              admin_panel_settings
            </span>
            <span>BACK-OFFICE ADMINISTRATEUR</span>
          </div>
          <h1 className="text-3xl font-bold font-headline-lg text-[#dfe2ee] mt-1">
            Tableau de bord NovaDigital
          </h1>
          <p className="text-xs text-[#908fa0]">
            Suivi des ventes multi-devises (Stripe, MTN MoMo, Orange Money) et gestion des actifs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] hover:brightness-110 text-white text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Ajouter un Actif Numérique</span>
        </button>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-sm">
          <div className="flex items-center justify-between text-[#908fa0] text-xs">
            <span>Volume d'Affaires</span>
            <span className="material-symbols-outlined text-[#4cd7f6] text-lg">
              trending_up
            </span>
          </div>
          <p className="text-2xl font-bold text-[#dfe2ee] mt-2 font-headline-sm">
            {formatPrice(totalRevenueEUR)}
          </p>
          <span className="text-[11px] text-[#4cd7f6] font-mono mt-1 block">
            +18.4% ce mois
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-sm">
          <div className="flex items-center justify-between text-[#908fa0] text-xs">
            <span>Commandes Validées</span>
            <span className="material-symbols-outlined text-[#c0c1ff] text-lg">
              shopping_cart
            </span>
          </div>
          <p className="text-2xl font-bold text-[#dfe2ee] mt-2 font-headline-sm">
            {orders.length + 382}
          </p>
          <span className="text-[11px] text-[#908fa0] font-mono mt-1 block">
            Taux de succès 99.4%
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-sm">
          <div className="flex items-center justify-between text-[#908fa0] text-xs">
            <span>Actifs en Ligne</span>
            <span className="material-symbols-outlined text-[#d0bcff] text-lg">
              layers
            </span>
          </div>
          <p className="text-2xl font-bold text-[#dfe2ee] mt-2 font-headline-sm">
            {products.length}
          </p>
          <span className="text-[11px] text-[#908fa0] font-mono mt-1 block">
            5 catégories actives
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-sm">
          <div className="flex items-center justify-between text-[#908fa0] text-xs">
            <span>Répartition Paiements</span>
            <span className="material-symbols-outlined text-[#4cd7f6] text-lg">
              pie_chart
            </span>
          </div>
          <div className="mt-2 text-xs space-y-1">
            <div className="flex justify-between text-[#dfe2ee]">
              <span>MTN MoMo</span>
              <span className="font-mono text-[#fcd116]">42%</span>
            </div>
            <div className="flex justify-between text-[#dfe2ee]">
              <span>Orange Money</span>
              <span className="font-mono text-[#ff7900]">28%</span>
            </div>
            <div className="flex justify-between text-[#dfe2ee]">
              <span>Cartes Stripe & Apple</span>
              <span className="font-mono text-[#c0c1ff]">30%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Table Management */}
      <div className="rounded-2xl bg-[#181c24] border border-[#262a33] overflow-hidden shadow-md">
        <div className="p-4 border-b border-[#262a33] bg-[#1c2028] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-lg">
              inventory
            </span>
            <h3 className="font-headline-sm text-sm font-bold text-[#dfe2ee]">
              Inventaire des Actifs ({products.length})
            </h3>
          </div>
          <span className="text-xs text-[#908fa0]">
            Mises à jour en direct
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1c2028]/80 text-[#908fa0] uppercase tracking-wider font-mono border-b border-[#262a33]">
              <tr>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Stack Tech</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Note / Avis</th>
                <th className="px-4 py-3">Téléchargements</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262a33]">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#1c2028]/50 transition-colors">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-10 h-10 rounded-lg object-cover bg-[#0a0e16]"
                    />
                    <div>
                      <span className="font-bold text-[#dfe2ee] block">{prod.title}</span>
                      <span className="text-[11px] text-[#908fa0]">{prod.version}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#c7c4d7]">
                    {CATEGORIES.find((c) => c.id === prod.category)?.name || prod.category}
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-[#4cd7f6]">
                    {prod.techStack}
                  </td>
                  <td className="px-4 py-3 font-bold text-[#dfe2ee]">
                    {formatPrice(prod.priceEUR)}
                  </td>
                  <td className="px-4 py-3 text-[#dfe2ee]">
                    ★ {prod.rating} ({prod.reviewCount})
                  </td>
                  <td className="px-4 py-3 font-mono text-[#908fa0]">
                    {prod.downloadsCount}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-[#908fa0] hover:text-[#ffb4ab] transition-colors rounded-lg hover:bg-[#262a33]"
                      title="Supprimer cet actif"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#181c24] border border-[#31353e] rounded-2xl shadow-2xl p-6 z-10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262a33]">
              <h3 className="text-lg font-bold font-headline-sm text-[#dfe2ee]">
                Mettre en ligne un nouvel asset
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#908fa0] hover:text-[#dfe2ee]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-[#908fa0] block mb-1">Nom du produit / Template :</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: SaaS FastLaunch Supabase 2026"
                  className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee] focus:outline-none focus:border-[#4cd7f6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#908fa0] block mb-1">Catégorie :</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CategoryId)}
                    className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[#908fa0] block mb-1">Prix de vente (€) :</label>
                  <input
                    type="number"
                    min="5"
                    value={newPriceEUR}
                    onChange={(e) => setNewPriceEUR(Number(e.target.value))}
                    className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#908fa0] block mb-1">Tech Stack Badge :</label>
                <input
                  type="text"
                  value={newTechStack}
                  onChange={(e) => setNewTechStack(e.target.value)}
                  placeholder="NEXT.JS 15 • TAILWIND • SUPABASE"
                  className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee] font-mono"
                />
              </div>

              <div>
                <label className="text-[#908fa0] block mb-1">Tags (séparés par des virgules) :</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Next.js, Supabase, Tailwind, TypeScript"
                  className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee]"
                />
              </div>

              <div>
                <label className="text-[#908fa0] block mb-1">Description détaillée :</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Présentation des fonctionnalités, intégrations et architecture..."
                  className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee]"
                />
              </div>

              <div>
                <label className="text-[#908fa0] block mb-1">URL Image Miniature :</label>
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-2 text-[#dfe2ee] font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-[#262a33] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#262a33] text-[#908fa0] hover:text-[#dfe2ee]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#4cd7f6] hover:bg-[#acedff] text-[#002f38] font-bold shadow"
                >
                  Publier l'Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
