import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ActiveView, CurrencyCode } from '../types';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    setSelectedCategory,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleNavClick = (view: ActiveView, catFilter?: any) => {
    setActiveView(view);
    if (catFilter) {
      setSelectedCategory(catFilter);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { label: string; view: ActiveView; catFilter?: string }[] = [
    { label: 'Accueil', view: 'accueil' },
    { label: 'Catalogue', view: 'catalogue' },
    { label: 'Templates & UI', view: 'templates-and-ui', catFilter: 'templates-and-ui' },
    { label: 'Formations & Guides', view: 'formations-and-guides', catFilter: 'formations-and-guides' },
    { label: 'Offres Spéciales', view: 'offres-speciales', catFilter: 'offres-speciales' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f131c]/80 backdrop-blur-xl border-b border-[#262a33]/60 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
      <div className="h-20 max-w-7xl mx-auto px-4 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Version Pill */}
        <div className="flex items-center gap-6 shrink-0">
          <button
            onClick={() => handleNavClick('accueil')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <img
              alt="NovaDigital Brand Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WyL1tZ1dyok1aNLWiUNeDFumt-cBPOwMl2Ogr069bKvGFfgDRt_yHMFMcgjCjetG-9vRy41pxEW4NnCpL8xoCpD_6o1VqRXgz1Zv9o1OIoKqSmI5xUaSz4ZL0OUrBVgEHqp7O0npDWXQ7s_stanAq7uAda3mHfq3EMl5UthGcZHqVDCfTzx3kSl2Z8ApQD47RZ1yjw3yfG6RGmGuoUHhYFz0GhcLKNevp285DkrMHhIYhg1Jouy-gJNqQ"
            />
            <span className="font-headline-sm text-xl font-bold text-[#dfe2ee] tracking-tight group-hover:text-[#c0c1ff] transition-colors">
              NovaDigital
            </span>
          </button>
          <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full bg-[#262a33] text-[#4cd7f6] font-code-inline text-xs border border-[#4cd7f6]/20">
            Digital Assets v2.4
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view, item.catFilter)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  isActive
                    ? 'text-[#dfe2ee] bg-[#262a33] font-semibold shadow-inner'
                    : 'text-[#c7c4d7] hover:text-[#dfe2ee] hover:bg-[#262a33]/60 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Currency Switcher */}
          <div className="hidden sm:flex items-center bg-[#181c24] px-2.5 py-1.5 rounded-lg border border-[#31353e]/80">
            <span className="material-symbols-outlined text-[#908fa0] text-base mr-1">
              payments
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-[#dfe2ee] text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              aria-label="Sélectionner la devise"
            >
              <option className="bg-[#262a33] text-[#dfe2ee]" value="EUR">
                EUR (€)
              </option>
              <option className="bg-[#262a33] text-[#dfe2ee]" value="USD">
                USD ($)
              </option>
              <option className="bg-[#262a33] text-[#dfe2ee]" value="XAF">
                XAF (FCFA)
              </option>
            </select>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Recherche"
            className="p-2 text-[#c7c4d7] hover:text-[#dfe2ee] hover:bg-[#262a33] rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            title="Rechercher (⌘K)"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>

          {/* Cart Icon with Live Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Panier d'achats"
            className="relative p-2 text-[#c7c4d7] hover:text-[#dfe2ee] hover:bg-[#262a33] rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#4cd7f6] text-[#002f38] rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-[#31353e] hidden sm:block"></div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen((prev) => !prev)}
              aria-label="Espace profil client"
              className="flex items-center gap-1.5 p-1 hover:bg-[#262a33] rounded-full transition-colors cursor-pointer"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#4cd7f6]/30"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbbjLYCH0Mu1qdXRxpc4SdyhwaYINyKT1x4Y7FhYzfWXiaC74k_7y3vHXglNYbaBpwvAbcjaIa29YhIAFaiBtKGksRuPWBASe0emMeqDLh4O0rEHV5C-E0Gub6whkWesIkVNoEZVrFovvpZCTEXG0Mhku94Dl1mUmqpkPKH7OMNIrwKXo33iHXMMue4Cz2OA-h0HWRpUA-Vyygxty3Yi_67ryvPoNcabjGKRB0ET8mK_lRdCjJ-hjF"
              />
              <span className="material-symbols-outlined text-[#c7c4d7] text-base hidden md:inline">
                expand_more
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1c2028] border border-[#31353e] p-2 shadow-2xl z-50 text-xs"
                onClick={() => setProfileMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#262a33] mb-1">
                  <p className="font-semibold text-[#dfe2ee]">Marc-Aurèle K.</p>
                  <p className="text-[#908fa0] text-[11px] truncate">karistidegael@gmail.com</p>
                </div>
                <button
                  onClick={() => handleNavClick('mon-espace-client')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#4cd7f6]">
                    cloud_download
                  </span>
                  <span>Mes Téléchargements & Licences</span>
                </button>
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[#c0c1ff] hover:bg-[#262a33] transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#c0c1ff]">
                    admin_panel_settings
                  </span>
                  <span>Tableau de bord Admin</span>
                </button>
              </div>
            )}
          </div>

          {/* Admin Dashboard Pill */}
          <button
            onClick={() => handleNavClick('admin-dashboard')}
            className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'admin-dashboard'
                ? 'bg-[#8083ff] text-[#0d0096]'
                : 'bg-[#571bc1] hover:bg-[#8083ff] text-[#dfe2ee]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>Accès Admin</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Menu Mobile"
            className="lg:hidden p-2 text-[#c7c4d7] hover:text-[#dfe2ee] hover:bg-[#262a33] rounded-lg"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181c24] border-b border-[#31353e] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view, item.catFilter)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeView === item.view
                  ? 'bg-[#262a33] text-[#4cd7f6] font-semibold'
                  : 'text-[#dfe2ee] hover:bg-[#262a33]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#31353e] flex items-center justify-between">
            <span className="text-xs text-[#908fa0]">Devise :</span>
            <div className="flex gap-2">
              {(['EUR', 'USD', 'XAF'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 text-xs rounded ${
                    currency === c
                      ? 'bg-[#4cd7f6] text-[#002f38] font-bold'
                      : 'bg-[#262a33] text-[#dfe2ee]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleNavClick('mon-espace-client')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#262a33] text-[#dfe2ee] text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-sm text-[#4cd7f6]">person</span>
            <span>Mon Espace Client</span>
          </button>
          <button
            onClick={() => handleNavClick('admin-dashboard')}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#571bc1] text-[#dfe2ee] text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>Accès Admin</span>
          </button>
        </div>
      )}
    </header>
  );
};
