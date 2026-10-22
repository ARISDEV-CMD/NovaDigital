/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { CustomerSpaceView } from './views/CustomerSpaceView';
import { AdminView } from './views/AdminView';
import { LegalView } from './views/LegalView';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeView } = useShop();

  const renderCurrentView = () => {
    switch (activeView) {
      case 'accueil':
        return <HomeView />;
      case 'catalogue':
      case 'templates-and-ui':
      case 'formations-and-guides':
      case 'offres-speciales':
        return <CatalogView />;
      case 'mon-espace-client':
        return <CustomerSpaceView />;
      case 'admin-dashboard':
        return <AdminView />;
      case 'cgv':
      case 'mentions-legales':
        return <LegalView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="bg-[#0f131c] text-[#dfe2ee] font-sans min-h-screen flex flex-col selection:bg-[#8083ff] selection:text-[#0d0096]">
      {/* Top Fixed Header */}
      <Header />

      {/* Main View Container with Top Offset */}
      <main className="flex-1 w-full pt-20 bg-[#0f131c]">
        {renderCurrentView()}
      </main>

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <ProductDetailModal />
      <SearchModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
