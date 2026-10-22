import React from 'react';
import { useShop } from '../context/ShopContext';

export const LegalView: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 lg:px-12 py-12 space-y-8 text-xs leading-relaxed text-[#c7c4d7]">
      <button
        onClick={() => {
          setActiveView('accueil');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-1.5 text-[#4cd7f6] hover:underline mb-2 cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Retour à l'accueil</span>
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold font-headline-lg text-[#dfe2ee]">
        Conditions Générales de Vente & Mentions Légales
      </h1>

      <section className="space-y-3 p-5 rounded-2xl bg-[#181c24] border border-[#262a33]">
        <h2 className="text-sm font-bold text-[#dfe2ee] font-headline-sm uppercase tracking-wider text-[#4cd7f6]">
          1. Éditeur de la Plateforme
        </h2>
        <p>
          Le service <strong>NovaDigital</strong> est édité par NovaDigital Inc., société de fourniture d'actifs technologiques numériques, solutions logicielles et formations d'ingénierie logicielle.
        </p>
      </section>

      <section className="space-y-3 p-5 rounded-2xl bg-[#181c24] border border-[#262a33]">
        <h2 className="text-sm font-bold text-[#dfe2ee] font-headline-sm uppercase tracking-wider text-[#4cd7f6]">
          2. Modalités de Livraison Instantanée
        </h2>
        <p>
          Tous les produits acquis sur la plateforme NovaDigital (archives zip, code TypeScript, fichiers .fig Figma, dépôts GitHub privés et guides numériques) font l'objet d'une mise à disposition immédiate dès la confirmation du paiement par carte bancaire ou Mobile Money (MTN MoMo, Orange Money).
        </p>
        <p>
          Les liens de téléchargement ainsi que les clés de licence uniques demeurent associés de façon pérenne au compte client de l'acheteur.
        </p>
      </section>

      <section className="space-y-3 p-5 rounded-2xl bg-[#181c24] border border-[#262a33]">
        <h2 className="text-sm font-bold text-[#dfe2ee] font-headline-sm uppercase tracking-wider text-[#4cd7f6]">
          3. Licence Commerciale Étendue
        </h2>
        <p>
          L'achat confère une licence commerciale perpétuelle, mondiale et non exclusive. L'acquéreur est autorisé à créer et monétiser un nombre indéfini de logiciels, SaaS, ou sites clients dérivés. La seule interdiction stricte consiste en la redistribution ou revente directe des templates dans leur état brut ou non transformé.
        </p>
      </section>

      <section className="space-y-3 p-5 rounded-2xl bg-[#181c24] border border-[#262a33]">
        <h2 className="text-sm font-bold text-[#dfe2ee] font-headline-sm uppercase tracking-wider text-[#4cd7f6]">
          4. Passerelles de Paiement & Données Personnelles
        </h2>
        <p>
          Les transactions sont protégées par chiffrement SSL 256-bit via Stripe et nos partenaires agréés Mobile Money. NovaDigital ne conserve aucun numéro de carte bancaire ni code secret Mobile Money.
        </p>
      </section>
    </div>
  );
};
