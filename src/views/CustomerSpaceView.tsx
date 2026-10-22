import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PurchasedAsset } from '../types';

export const CustomerSpaceView: React.FC = () => {
  const {
    purchasedAssets,
    orders,
    downloadAssetSimulated,
    addToast,
    setActiveView,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'downloads' | 'orders' | 'licenses'>('downloads');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyLicenseKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    addToast({
      type: 'success',
      title: 'Clé de licence copiée !',
      message: `${key} est enregistrée dans votre presse-papier.`
    });
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const generateInvoice = (invoiceId: string, itemTitle: string) => {
    const text = `==========================================================\n` +
      `                   FACTURE COMMERCIALE\n` +
      `                     NOVADIGITAL INC.\n` +
      `==========================================================\n` +
      `Référence Facture : ${invoiceId}\n` +
      `Date : ${new Date().toLocaleDateString('fr-FR')}\n` +
      `Client : Marc-Aurèle K. (karistidegael@gmail.com)\n` +
      `Identifiant Fiscal Client : CI-ABJ-2026-B-99812\n\n` +
      `Détail des Acquisitions :\n` +
      `- ${itemTitle} (Licence Commerciale Illimitée)\n\n` +
      `TVA (0% Export Numérique) : 0,00 €\n` +
      `Statut : ACQUITTÉE - PAIEMENT VALIDÉ\n` +
      `==========================================================\n` +
      `Support technique & Discord VIP : https://discord.gg/novadigital-pro\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facture-${invoiceId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Facture téléchargée',
      message: `La quittance ${invoiceId} a été exportée.`
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-10 space-y-8">
      {/* Profile Overview Card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1c2028] to-[#181c24] p-6 sm:p-8 border border-[#262a33] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            alt="Profile Avatar"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-[#4cd7f6]/30 shadow-lg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbbjLYCH0Mu1qdXRxpc4SdyhwaYINyKT1x4Y7FhYzfWXiaC74k_7y3vHXglNYbaBpwvAbcjaIa29YhIAFaiBtKGksRuPWBASe0emMeqDLh4O0rEHV5C-E0Gub6whkWesIkVNoEZVrFovvpZCTEXG0Mhku94Dl1mUmqpkPKH7OMNIrwKXo33iHXMMue4Cz2OA-h0HWRpUA-Vyygxty3Yi_67ryvPoNcabjGKRB0ET8mK_lRdCjJ-hjF"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold font-headline-sm text-[#dfe2ee]">
                Marc-Aurèle K.
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#571bc1] text-[#dfe2ee] font-mono text-[10px] font-bold uppercase">
                Membre VIP Pro
              </span>
            </div>
            <p className="text-xs text-[#908fa0] mt-0.5">karistidegael@gmail.com</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#c7c4d7]">
              <span className="flex items-center gap-1 text-[#4cd7f6]">
                <span className="material-symbols-outlined text-sm">inventory_2</span>
                <span>{purchasedAssets.length} Assets Débloqués</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#c0c1ff]">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>Licences Commerciales Actives</span>
              </span>
            </div>
          </div>
        </div>

        {/* Discord VIP Access Box */}
        <div className="w-full md:w-auto p-4 rounded-xl bg-[#0a0e16]/80 border border-[#4cd7f6]/20 flex items-center justify-between md:justify-start gap-4">
          <div>
            <span className="text-xs font-semibold text-[#dfe2ee] block">
              Discord VIP NovaDigital
            </span>
            <span className="text-[11px] text-[#908fa0]">
              Support direct & Q&A créateurs
            </span>
          </div>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg bg-[#571bc1] hover:bg-[#8083ff] text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow shrink-0"
          >
            <span className="material-symbols-outlined text-sm">forum</span>
            <span>Rejoindre</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#262a33] pb-2">
        <button
          onClick={() => setActiveTab('downloads')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'downloads'
              ? 'bg-[#262a33] text-[#4cd7f6] shadow-inner'
              : 'text-[#908fa0] hover:text-[#dfe2ee] hover:bg-[#181c24]'
          }`}
        >
          <span className="material-symbols-outlined text-base">cloud_download</span>
          <span>Mes Téléchargements ({purchasedAssets.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#262a33] text-[#4cd7f6] shadow-inner'
              : 'text-[#908fa0] hover:text-[#dfe2ee] hover:bg-[#181c24]'
          }`}
        >
          <span className="material-symbols-outlined text-base">receipt_long</span>
          <span>Historique Commandes ({orders.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('licenses')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'licenses'
              ? 'bg-[#262a33] text-[#4cd7f6] shadow-inner'
              : 'text-[#908fa0] hover:text-[#dfe2ee] hover:bg-[#181c24]'
          }`}
        >
          <span className="material-symbols-outlined text-base">key</span>
          <span>Gestion des Clés de Licence</span>
        </button>
      </div>

      {/* Tab: Downloads */}
      {activeTab === 'downloads' && (
        <div className="space-y-4">
          {purchasedAssets.length === 0 ? (
            <div className="py-16 text-center rounded-2xl bg-[#181c24] border border-[#262a33] space-y-3">
              <span className="material-symbols-outlined text-5xl text-[#31353e]">
                folder_open
              </span>
              <p className="text-sm text-[#dfe2ee] font-semibold">
                Vous n'avez pas encore acheté d'asset numérique.
              </p>
              <button
                onClick={() => setActiveView('catalogue')}
                className="px-4 py-2 rounded-lg bg-[#571bc1] text-white text-xs font-semibold"
              >
                Parcourir le catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {purchasedAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-5 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-md flex flex-col justify-between space-y-4 hover:border-[#31353e] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-[#262a33] text-[#4cd7f6] font-mono text-[11px]">
                        {asset.version}
                      </span>
                      <span className="text-[11px] text-[#908fa0]">
                        Acquis le {asset.purchaseDate}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-base font-bold text-[#dfe2ee]">
                      {asset.title}
                    </h3>

                    {/* License snippet */}
                    <div className="p-2.5 rounded-lg bg-[#1c2028] border border-[#262a33] flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#908fa0] block">Clé de Licence :</span>
                        <code className="text-xs font-mono text-[#c0c1ff] truncate block">
                          {asset.licenseKey}
                        </code>
                      </div>
                      <button
                        onClick={() => copyLicenseKey(asset.licenseKey)}
                        className="px-2 py-1 rounded bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-[11px] font-medium transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                        title="Copier la clé"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedKey === asset.licenseKey ? 'check' : 'content_copy'}
                        </span>
                        <span>{copiedKey === asset.licenseKey ? 'Copié' : 'Copier'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="pt-2 border-t border-[#262a33] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {asset.gitRepoUrl && (
                        <a
                          href={asset.gitRepoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">code</span>
                          <span>GitHub Repo</span>
                        </a>
                      )}
                      <button
                        onClick={() => generateInvoice(asset.invoiceId, asset.title)}
                        className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#908fa0] hover:text-[#dfe2ee] text-xs font-medium flex items-center gap-1 transition-colors"
                        title="Télécharger la quittance PDF"
                      >
                        <span className="material-symbols-outlined text-sm">receipt</span>
                        <span>Facture</span>
                      </button>
                    </div>

                    <button
                      onClick={() => downloadAssetSimulated(asset)}
                      className="px-4 py-2 rounded-lg bg-[#4cd7f6] hover:bg-[#acedff] text-[#002f38] font-bold text-xs flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">download</span>
                      <span>Télécharger ZIP ({asset.fileSize})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="rounded-2xl bg-[#181c24] border border-[#262a33] overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1c2028] text-[#908fa0] uppercase tracking-wider font-mono border-b border-[#262a33]">
                <tr>
                  <th className="px-4 py-3">Commande</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Articles</th>
                  <th className="px-4 py-3">Moyen de paiement</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3 text-right">Facture</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#262a33]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#1c2028]/60 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-[#dfe2ee]">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 text-[#c7c4d7]">{order.date}</td>
                    <td className="px-4 py-3 text-[#dfe2ee] max-w-xs truncate">
                      {order.items.map((i) => i.title).join(', ')}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-[#262a33] text-[#c0c1ff] font-mono text-[11px]">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-[#4cd7f6]">
                      {order.totalAmount}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#009eb9]/20 text-[#4cd7f6] font-semibold text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]"></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          generateInvoice(`INV-${order.id}`, order.items[0]?.title || 'Achat NovaDigital')
                        }
                        className="text-[#908fa0] hover:text-[#dfe2ee] transition-colors p-1"
                        title="Télécharger la quittance"
                      >
                        <span className="material-symbols-outlined text-base">download</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Licenses */}
      {activeTab === 'licenses' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-[#1c2028] border border-[#262a33] text-xs text-[#c7c4d7] leading-relaxed">
            <h4 className="font-bold text-[#dfe2ee] mb-1 font-headline-sm">
              Règles d'utilisation de vos licences commerciales :
            </h4>
            <p>
              Chaque clé générée ci-dessous vous confère un droit commercial perpétuel et mondial. Vous pouvez déployer vos applications pour des clients finaux ou monétiser vos SaaS sans redevances supplémentaires.
            </p>
          </div>

          <div className="space-y-3">
            {purchasedAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 rounded-xl bg-[#181c24] border border-[#262a33] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#dfe2ee]">{asset.title}</h4>
                  <p className="text-[11px] text-[#908fa0] font-mono mt-0.5">
                    Actif depuis : {asset.purchaseDate} • Réf : {asset.invoiceId}
                  </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    readOnly
                    value={asset.licenseKey}
                    className="flex-1 sm:w-72 bg-[#0a0e16] border border-[#31353e] text-[#4cd7f6] font-mono text-xs px-3 py-1.5 rounded-lg select-all"
                  />
                  <button
                    onClick={() => copyLicenseKey(asset.licenseKey)}
                    className="px-3 py-1.5 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Copier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
