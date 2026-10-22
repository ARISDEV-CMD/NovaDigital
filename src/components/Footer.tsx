import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ActiveView } from '../types';

export const Footer: React.FC = () => {
  const { setActiveView, addToast, applyPromoCode } = useShop();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    applyPromoCode('NOVA15');
    addToast({
      type: 'success',
      title: 'Inscription VIP Validée !',
      message: 'Votre réduction de -15% (Code: NOVA15) a été activée.'
    });
    setEmail('');
  };

  const handleNav = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0e16] text-[#dfe2ee] border-t border-[#1c2028] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-10 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-[#1c2028]">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                alt="NovaDigital Brand Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1WyL1tZ1dyok1aNLWiUNeDFumt-cBPOwMl2Ogr069bKvGFfgDRt_yHMFMcgjCjetG-9vRy41pxEW4NnCpL8xoCpD_6o1VqRXgz1Zv9o1OIoKqSmI5xUaSz4ZL0OUrBVgEHqp7O0npDWXQ7s_stanAq7uAda3mHfq3EMl5UthGcZHqVDCfTzx3kSl2Z8ApQD47RZ1yjw3yfG6RGmGuoUHhYFz0GhcLKNevp285DkrMHhIYhg1Jouy-gJNqQ"
              />
              <span className="font-headline-sm text-lg font-bold text-[#dfe2ee] tracking-tight">
                NovaDigital
              </span>
            </div>
            <p className="text-[#c7c4d7] text-xs leading-relaxed">
              La place de marché d'actifs numériques premium pour concepteurs, développeurs et bâtisseurs d'exception. Livraison instantanée 24/7.
            </p>
            <div className="flex items-center gap-2 text-[#c7c4d7]">
              <span className="material-symbols-outlined text-[#4cd7f6] text-base">
                verified_user
              </span>
              <span className="text-xs text-[#dfe2ee] font-medium">
                Licences Authentifiées & Prêtes à Déployer
              </span>
            </div>
          </div>

          {/* Catalogues & Outils */}
          <div className="space-y-3">
            <h3 className="font-headline-sm text-base font-semibold text-[#dfe2ee]">
              Catalogues & Outils
            </h3>
            <ul className="space-y-2 text-xs text-[#c7c4d7]">
              <li>
                <button
                  onClick={() => handleNav('catalogue')}
                  className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left"
                >
                  Tous les Produits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('templates-and-ui')}
                  className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left"
                >
                  Templates Next.js & UI Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('formations-and-guides')}
                  className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left"
                >
                  Guides & Ebooks Techniques
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('offres-speciales')}
                  className="hover:text-[#c0c1ff] transition-colors cursor-pointer text-left"
                >
                  Packs & Bundles Exclusifs
                </button>
              </li>
            </ul>
          </div>

          {/* Confiance & Garanties */}
          <div className="space-y-3">
            <h3 className="font-headline-sm text-base font-semibold text-[#dfe2ee]">
              Confiance & Garanties
            </h3>
            <ul className="space-y-2 text-xs text-[#c7c4d7]">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-sm">bolt</span>
                <span>Téléchargement 100% Instantané</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#c0c1ff] text-sm">security</span>
                <span>Paiement Chiffré SSL 256-bit</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#d0bcff] text-sm">assignment_return</span>
                <span>Garantie Sérénité 30 Jours</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4cd7f6] text-sm">support_agent</span>
                <span>Support Technique Réactif</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h3 className="font-headline-sm text-base font-semibold text-[#dfe2ee]">
              Restez à la Pointe
            </h3>
            <p className="text-[#c7c4d7] text-xs">
              Recevez les nouveaux templates chaque semaine directement dans votre boîte mail.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
              <div className="flex items-center rounded-lg bg-[#262a33] px-3 py-2 border border-[#31353e]">
                <span className="material-symbols-outlined text-[#908fa0] text-sm mr-2">mail</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-[#dfe2ee] placeholder:text-[#908fa0] text-xs focus:outline-none w-full"
                  placeholder="votre.email@domaine.com"
                  type="email"
                  required
                />
              </div>
              <button
                className="w-full py-2 px-3 rounded-lg bg-[#571bc1] hover:bg-[#8083ff] text-[#dfe2ee] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow"
                type="submit"
              >
                <span>S'inscrire</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#c7c4d7]">
          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[11px] border border-[#31353e]">
              Stripe
            </span>
            <span className="px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[11px] border border-[#31353e]">
              MTN MoMo
            </span>
            <span className="px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[11px] border border-[#31353e]">
              Orange Money
            </span>
            <span className="px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[11px] border border-[#31353e]">
              PayPal
            </span>
            <span className="px-2.5 py-1 rounded bg-[#262a33] text-[#dfe2ee] font-mono text-[11px] border border-[#31353e]">
              Visa / Mastercard
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => handleNav('cgv')}
              className="hover:text-[#dfe2ee] transition-colors cursor-pointer"
            >
              CGV
            </button>
            <button
              onClick={() => handleNav('mentions-legales')}
              className="hover:text-[#dfe2ee] transition-colors cursor-pointer"
            >
              Confidentialité
            </button>
            <button
              onClick={() => handleNav('mentions-legales')}
              className="hover:text-[#dfe2ee] transition-colors cursor-pointer"
            >
              Mentions Légales
            </button>
          </div>

          <div className="text-[11px] text-[#908fa0]">
            © 2025-2026 NovaDigital Inc. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};
