import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    clearCart,
    cartTotalEUR,
    discountedTotalEUR,
    discountRate,
    appliedPromoCode,
    applyPromoCode,
    formatPrice,
    completeCheckout,
    currency,
    setActiveView,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'Stripe' | 'MTN MoMo' | 'Orange Money' | 'PayPal'>('MTN MoMo');
  const [customerEmail, setCustomerEmail] = useState('karistidegael@gmail.com');
  const [momoPhone, setMomoPhone] = useState('07 88 12 34 56');
  const [momoCountry, setMomoCountry] = useState('+225');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handlePay = async () => {
    setIsProcessing(true);
    // Simulate real network authorization
    await new Promise((resolve) => setTimeout(resolve, 1400));
    const result = await completeCheckout(selectedMethod, customerEmail);
    setIsProcessing(false);
    if (result.success && result.orderId) {
      setCheckoutSuccess(result.orderId);
    }
  };

  const handleGoToDownloads = () => {
    setCheckoutSuccess(null);
    setIsCartOpen(false);
    setActiveView('mon-espace-client');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => !isProcessing && setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181c24] border-l border-[#262a33] shadow-2xl flex flex-col justify-between text-[#dfe2ee]">
          {/* Header */}
          <div className="p-5 border-b border-[#262a33] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4cd7f6] text-2xl">
                shopping_bag
              </span>
              <h2 className="font-headline-sm text-lg font-bold text-[#dfe2ee]">
                Panier d'achats ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg hover:bg-[#262a33] text-[#908fa0] hover:text-[#dfe2ee] transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Success Screen */}
          {checkoutSuccess ? (
            <div className="p-6 flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#009eb9]/20 text-[#4cd7f6] flex items-center justify-center border border-[#4cd7f6]/30">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-xl font-bold font-headline-sm text-[#dfe2ee]">
                Commande Confirmée !
              </h3>
              <p className="text-xs text-[#c7c4d7] leading-relaxed max-w-xs">
                Votre transaction <strong className="text-[#dfe2ee]">{checkoutSuccess}</strong> a été validée via {selectedMethod}. Vos dépôts GitHub et archives .zip sont prêts au téléchargement.
              </p>
              <div className="w-full p-4 rounded-xl bg-[#1c2028] border border-[#31353e] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Client :</span>
                  <span className="font-medium text-[#dfe2ee]">{customerEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Licence :</span>
                  <span className="font-mono text-[#4cd7f6]">Commerciale Illimitée</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#908fa0]">Reçu envoyé :</span>
                  <span className="text-[#c0c1ff]">Par e-mail instantané</span>
                </div>
              </div>
              <button
                onClick={handleGoToDownloads}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] hover:brightness-110 text-white font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">cloud_download</span>
                <span>Accéder à mes Téléchargements</span>
              </button>
            </div>
          ) : (
            <>
              {/* Content Body */}
              <div className="p-5 flex-1 overflow-y-auto space-y-5">
                {cart.length === 0 ? (
                  <div className="py-16 text-center text-[#908fa0] space-y-3">
                    <span className="material-symbols-outlined text-5xl text-[#31353e]">
                      remove_shopping_cart
                    </span>
                    <p className="text-sm">Votre panier est actuellement vide.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveView('catalogue');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#262a33] text-[#c0c1ff] hover:bg-[#31353e] text-xs font-semibold"
                    >
                      Explorer le Catalogue
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items List */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[#1c2028] border border-[#262a33]"
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className="w-16 h-12 object-cover rounded-lg bg-[#262a33] shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#dfe2ee] truncate">
                              {item.product.title}
                            </h4>
                            <p className="text-[11px] text-[#908fa0] font-mono">
                              {item.product.techStack}
                            </p>
                            <span className="text-xs font-bold text-[#4cd7f6] mt-0.5 block">
                              {formatPrice(item.product.priceEUR)}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-[#908fa0] hover:text-[#ffb4ab] transition-colors rounded-lg hover:bg-[#262a33]"
                            title="Supprimer"
                          >
                            <span className="material-symbols-outlined text-base">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code Input */}
                    <div className="p-3 rounded-xl bg-[#1c2028] border border-[#262a33] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#c7c4d7]">Code de réduction VIP :</span>
                        {!appliedPromoCode && (
                          <button
                            type="button"
                            onClick={() => applyPromoCode('NOVA15')}
                            className="text-[#4cd7f6] text-[11px] hover:underline"
                          >
                            Essayer "NOVA15" (-15%)
                          </button>
                        )}
                      </div>
                      <form onSubmit={handleApplyPromo} className="flex gap-2">
                        <input
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Ex: NOVA15"
                          className="flex-1 bg-[#181c24] text-xs px-3 py-2 rounded-lg border border-[#31353e] text-[#dfe2ee] uppercase focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-3 py-2 rounded-lg bg-[#262a33] hover:bg-[#31353e] text-xs font-semibold text-[#dfe2ee] transition-colors"
                        >
                          Appliquer
                        </button>
                      </form>
                      {appliedPromoCode && (
                        <div className="flex items-center justify-between text-xs text-[#4cd7f6] pt-1">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check</span>
                            Code <strong>{appliedPromoCode}</strong> actif
                          </span>
                          <span>-{(discountRate * 100).toFixed(0)}%</span>
                        </div>
                      )}
                    </div>

                    {/* Payment Gateways Selection */}
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-[#c7c4d7] block">
                        Mode de règlement instantané :
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedMethod('MTN MoMo')}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            selectedMethod === 'MTN MoMo'
                              ? 'bg-[#262a33] border-[#4cd7f6] text-[#dfe2ee] ring-1 ring-[#4cd7f6]'
                              : 'bg-[#1c2028] border-[#262a33] text-[#908fa0] hover:text-[#dfe2ee]'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>MTN MoMo</span>
                            <span className="w-2 h-2 rounded-full bg-[#fcd116]"></span>
                          </div>
                          <span className="text-[10px] block opacity-80 mt-0.5">Mobile Money direct</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedMethod('Orange Money')}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            selectedMethod === 'Orange Money'
                              ? 'bg-[#262a33] border-[#4cd7f6] text-[#dfe2ee] ring-1 ring-[#4cd7f6]'
                              : 'bg-[#1c2028] border-[#262a33] text-[#908fa0] hover:text-[#dfe2ee]'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>Orange Money</span>
                            <span className="w-2 h-2 rounded-full bg-[#ff7900]"></span>
                          </div>
                          <span className="text-[10px] block opacity-80 mt-0.5">XAF / XOF rapide</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedMethod('Stripe')}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            selectedMethod === 'Stripe'
                              ? 'bg-[#262a33] border-[#4cd7f6] text-[#dfe2ee] ring-1 ring-[#4cd7f6]'
                              : 'bg-[#1c2028] border-[#262a33] text-[#908fa0] hover:text-[#dfe2ee]'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>Carte Stripe</span>
                            <span className="w-2 h-2 rounded-full bg-[#8083ff]"></span>
                          </div>
                          <span className="text-[10px] block opacity-80 mt-0.5">Visa, MC, Apple Pay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedMethod('PayPal')}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                            selectedMethod === 'PayPal'
                              ? 'bg-[#262a33] border-[#4cd7f6] text-[#dfe2ee] ring-1 ring-[#4cd7f6]'
                              : 'bg-[#1c2028] border-[#262a33] text-[#908fa0] hover:text-[#dfe2ee]'
                          }`}
                        >
                          <div className="font-bold flex items-center justify-between">
                            <span>PayPal</span>
                            <span className="w-2 h-2 rounded-full bg-[#009eb9]"></span>
                          </div>
                          <span className="text-[10px] block opacity-80 mt-0.5">Compte PayPal</span>
                        </button>
                      </div>

                      {/* Payment Method Details Form */}
                      {(selectedMethod === 'MTN MoMo' || selectedMethod === 'Orange Money') && (
                        <div className="p-3 rounded-xl bg-[#1c2028] border border-[#262a33] space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-tertiary">
                            <span className="material-symbols-outlined text-sm">phone_iphone</span>
                            <span className="font-semibold">Paiement Mobile Money Sécurisé</span>
                          </div>
                          <div className="flex gap-2">
                            <select
                              value={momoCountry}
                              onChange={(e) => setMomoCountry(e.target.value)}
                              className="bg-[#181c24] border border-[#31353e] rounded-lg px-2 py-1.5 text-xs text-[#dfe2ee]"
                            >
                              <option value="+225">+225 (CI)</option>
                              <option value="+237">+237 (CM)</option>
                              <option value="+229">+229 (BJ)</option>
                              <option value="+221">+221 (SN)</option>
                              <option value="+242">+242 (CG)</option>
                            </select>
                            <input
                              type="tel"
                              value={momoPhone}
                              onChange={(e) => setMomoPhone(e.target.value)}
                              placeholder="Numéro de téléphone"
                              className="flex-1 bg-[#181c24] border border-[#31353e] rounded-lg px-3 py-1.5 text-xs text-[#dfe2ee]"
                            />
                          </div>
                          <p className="text-[11px] text-[#908fa0]">
                            Une notification push de confirmation apparaîtra sur votre téléphone pour valider avec votre code secret.
                          </p>
                        </div>
                      )}

                      {selectedMethod === 'Stripe' && (
                        <div className="p-3 rounded-xl bg-[#1c2028] border border-[#262a33] space-y-2 text-xs">
                          <div className="flex items-center justify-between text-[#908fa0]">
                            <span>Numéro de carte</span>
                            <span className="material-symbols-outlined text-sm">credit_card</span>
                          </div>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-[#181c24] border border-[#31353e] rounded-lg px-3 py-1.5 text-xs font-mono text-[#dfe2ee]"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/AA"
                              className="bg-[#181c24] border border-[#31353e] rounded-lg px-3 py-1.5 text-xs font-mono text-[#dfe2ee]"
                            />
                            <input
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              placeholder="CVC"
                              className="bg-[#181c24] border border-[#31353e] rounded-lg px-3 py-1.5 text-xs font-mono text-[#dfe2ee]"
                            />
                          </div>
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[11px] text-[#908fa0]">
                          Email de livraison des accès :
                        </label>
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full bg-[#1c2028] border border-[#31353e] rounded-lg px-3 py-1.5 text-xs text-[#dfe2ee]"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Summary & Checkout Button */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#262a33] bg-[#0f131c] space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[#908fa0]">
                      <span>Sous-total HT</span>
                      <span>{formatPrice(cartTotalEUR)}</span>
                    </div>
                    {discountRate > 0 && (
                      <div className="flex justify-between text-[#4cd7f6]">
                        <span>Réduction ({appliedPromoCode})</span>
                        <span>-{formatPrice(cartTotalEUR * discountRate)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#dfe2ee] pt-2 border-t border-[#262a33]">
                      <span>Total à payer</span>
                      <span className="text-[#c0c1ff]">
                        {formatPrice(discountedTotalEUR)}
                      </span>
                    </div>
                  </div>

                  <button
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#8083ff] to-[#571bc1] hover:brightness-110 disabled:opacity-50 text-[#dfe2ee] text-sm font-semibold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-base">
                          progress_activity
                        </span>
                        <span>Traitement sécurisé en cours...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">lock</span>
                        <span>
                          Payer {formatPrice(discountedTotalEUR)} via {selectedMethod}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#908fa0]">
                    Paiement crypté SSL 256-bit • Téléchargement immédiat + Licence commerciale
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
