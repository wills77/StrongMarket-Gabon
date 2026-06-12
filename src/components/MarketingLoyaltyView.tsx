import React, { useState } from 'react';
import { Award, Percent, Megaphone, CheckCircle, Mail, DollarSign, Plus, Gift, Trash2 } from 'lucide-react';
import { Coupon } from '../types';

interface MarketingLoyaltyViewProps {
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
  onDeleteCoupon: (code: string) => void;
  loyaltyPoints: number;
  onRedeemPoints: (pointsCost: number, rewardType: string) => void;
}

export default function MarketingLoyaltyView({
  coupons,
  onAddCoupon,
  onDeleteCoupon,
  loyaltyPoints,
  onRedeemPoints,
}: MarketingLoyaltyViewProps) {
  // Navigation internal mode: 'loyalty' | 'coupons' | 'newsletters'
  const [marketTab, setMarketTab] = useState<'loyalty' | 'coupons' | 'newsletters'>('loyalty');

  // Interactive feedback messages
  const [loyaltyMessage, setLoyaltyMessage] = useState<string | null>(null);
  const [loyaltyError, setLoyaltyError] = useState<string | null>(null);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [campaignFeedback, setCampaignFeedback] = useState<string | null>(null);
  const [deletingCouponCode, setDeletingCouponCode] = useState<string | null>(null);

  // Coupon creator form state
  const [newCode, setNewCode] = useState('');
  const [newDiscountType, setNewDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [newValue, setNewValue] = useState(10);
  const [newMinSpend, setNewMinSpend] = useState(5000);

  // Campaign newsletter list state
  const [newsletters, setNewsletters] = useState([
    {
      id: 'news-1',
      subject: '🌻 Offres de la fête des mères au Gabon - Épargnez 15%',
      subscribers: 2450,
      delivered: true,
      date: '2026-06-08'
    },
    {
      id: 'news-2',
      subject: '⚡ Flash Airtel Money : Pas de frais d’expédition ce week-end !',
      subscribers: 4810,
      delivered: false,
      date: 'Brouillon'
    }
  ]);

  const [newSubject, setNewSubject] = useState('');

  const handleCouponCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    onAddCoupon({
      code: newCode.toUpperCase().trim(),
      discountType: newDiscountType,
      discountValue: Number(newValue),
      minSpend: newMinSpend > 0 ? Number(newMinSpend) : undefined,
      active: true,
    });

    const activeCode = newCode.toUpperCase();
    // Reset Form
    setNewCode('');
    setNewValue(10);
    setNewMinSpend(5000);
    
    setCouponFeedback(`Code promo '${activeCode}' enregistré sur la plateforme avec succès !`);
    setTimeout(() => setCouponFeedback(null), 5000);
  };

  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject) return;

    const newCamp = {
      id: `news-${Date.now()}`,
      subject: newSubject,
      subscribers: 4810,
      delivered: true,
      date: new Date().toISOString().split('T')[0]
    };

    setNewsletters([newCamp, ...newsletters]);
    setNewSubject('');
    
    setCampaignFeedback(`Campagne transmise aux ${newCamp.subscribers} abonnés par e-mail et push !`);
    setTimeout(() => setCampaignFeedback(null), 5000);
  };

  return (
    <div id="marketing-view-container" className="space-y-6 text-left py-4 pb-12">
      
      {/* Marketing Header */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#3B82F6] text-white rounded-xl shadow-xs">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Programme de Fidélité & Outils d'Animation</h2>
            <p className="text-slate-500 text-xs font-medium">Fidélisez votre clientèle, lancez des codes promotionnels nationaux et créez des campagnes de prospections ciblées.</p>
          </div>
        </div>
      </div>

      {/* Switch selectors */}
      <div className="flex border-b border-slate-200 gap-1.5 overflow-x-auto pb-px">
        {[
          { key: 'loyalty', label: '★ Cagnotte Fidélité Gabon', icon: Award },
          { key: 'coupons', label: '🎫 Générateur de Coupons', icon: Percent },
          { key: 'newsletters', label: '✉️ Campagnes Newsletters & Push', icon: Mail }
        ].map((item) => {
          const IconComp = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setMarketTab(item.key as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                marketTab === item.key
                  ? 'border-[#3B82F6] text-[#3B82F6] bg-blue-50/25'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* LOYALTY POINTS TRACKER PANEL */}
      {marketTab === 'loyalty' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left info area points balance */}
          <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              🏆 Votre Compte Fidélité Acheteur
            </h3>
            
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Gagnez <strong className="text-[#3B82F6]">1 point par tranche de 1 000 FCFA</strong> dépensés sur StrongMarket Gabon. Échangez ensuite votre solde contre des réductions applicables lors de vos achats !
            </p>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center space-y-2 relative overflow-hidden">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Solde Actuel de Points</span>
              <p className="text-4xl font-extrabold text-blue-600">{loyaltyPoints} Points</p>
              <span className="text-[10px] text-slate-500 block font-bold">Estimation Cashback: <strong className="font-sans text-[#3A7E3E]">{(loyaltyPoints * 10).toLocaleString()} FCFA</strong></span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] text-slate-450 text-slate-500 leading-relaxed space-y-1">
              <span className="font-bold text-slate-700 block">⚡ Règles simples de conversion :</span>
              <ul className="list-disc pl-3 font-semibold">
                <li>Usage instantané à la caisse du panier d'achat.</li>
                <li>Garantie de non-expiration des points acquis au Gabon.</li>
              </ul>
            </div>
          </div>

          {/* Right points redemption catalog */}
          <div className="lg:col-span-7 bg-white border border-slate-205 rounded-3xl p-6 space-y-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Catalogue des récompenses prêtes à l'échange</h3>
            
            {loyaltyMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-semibold animate-fade-in">
                {loyaltyMessage}
              </div>
            )}
            
            {loyaltyError && (
              <div className="p-3 bg-rose-55/10 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-700 font-semibold animate-fade-in">
                {loyaltyError}
              </div>
            )}

            <div className="space-y-3 text-xs">
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block text-xs">🎫 Bon de Réduction de 2 000 FCFA</span>
                  <p className="text-[10px] text-slate-450 leading-tight font-medium">Génère instantanément un coupon de remise sans minimum d'achat.</p>
                </div>
                <div className="text-right">
                  <span className="text-[#3B82F6] font-bold block">150 Points</span>
                  <button
                    onClick={() => {
                      if (loyaltyPoints >= 150) {
                        onRedeemPoints(150, 'REDUC2K');
                        setLoyaltyMessage("Félicitations ! Votre code 'REDUC2K' (2 000 FCFA de remise débloqués) a été débloqué et copié.");
                        setTimeout(() => setLoyaltyMessage(null), 5000);
                      } else {
                        setLoyaltyError("Points de fidélité insuffisants pour débloquer le bon de rémarre 2 000 FCFA !");
                        setTimeout(() => setLoyaltyError(null), 5000);
                      }
                    }}
                    className={`px-3.5 py-1.5 text-[10px] font-bold rounded-xl mt-1.5 transition cursor-pointer ${
                      loyaltyPoints >= 150
                        ? 'bg-[#3B82F6] text-white hover:bg-blue-600'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Débloquer
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 block text-xs">🎟️ Code Promo de -15% de réduction</span>
                  <p className="text-[10px] text-slate-450 leading-tight font-medium">Applicable sur tout rayon de l'artisanat gabonais.</p>
                </div>
                <div className="text-right">
                  <span className="text-[#3B82F6] font-bold block">250 Points</span>
                  <button
                    onClick={() => {
                      if (loyaltyPoints >= 250) {
                        onRedeemPoints(250, 'LOYAL15');
                        setLoyaltyMessage("Félicitations ! Votre coupon de -15% 'LOYAL15' a été ajouté à la caisse.");
                        setTimeout(() => setLoyaltyMessage(null), 5000);
                      } else {
                        setLoyaltyError("Points de fidélité insuffisants pour débloquer la remise de 15% !");
                        setTimeout(() => setLoyaltyError(null), 5000);
                      }
                    }}
                    className={`px-3.5 py-1.5 text-[10px] font-bold rounded-xl mt-1.5 transition cursor-pointer ${
                      loyaltyPoints >= 250
                        ? 'bg-[#3B82F6] text-white hover:bg-blue-600'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Débloquer
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* COUPON BUILDER */}
      {marketTab === 'coupons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* Coupon Form Creator */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <form onSubmit={handleCouponCreate} className="space-y-4 text-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Créer un code promotionnel</h3>
              
              {couponFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-semibold">
                  {couponFeedback}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-bold block">Libellé du Code *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: LIVRAISONGRATUITE"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 uppercase font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-bold block">Type d'abattement</label>
                <select
                  value={newDiscountType}
                  onChange={(e) => setNewDiscountType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold"
                >
                  <option value="percentage">Pourcentage d'économie (%)</option>
                  <option value="fixed">Montant fixe de réduction (FCFA)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-bold block">Valeur de remise</label>
                <input
                  type="number"
                  required
                  value={newValue}
                  onChange={(e) => setNewValue(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-500 font-bold block">Dépense minimale exigée (FCFA)</label>
                <input
                  type="number"
                  value={newMinSpend}
                  onChange={(e) => setNewMinSpend(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-mono font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-extrabold rounded-xl transition text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" /> Enregistrer le Coupon
              </button>
            </form>
          </div>

          {/* Coupons tracking review table */}
          <div className="lg:col-span-7 bg-white border border-slate-205 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Coupons Promos Actifs sur StrongMarket</h3>
            
            <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 text-slate-500 font-bold border-b border-slate-150">
                    <th className="p-3">Code</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Valeur de Remise</th>
                    <th className="p-3">Achat Min</th>
                    <th className="p-3 text-center">Option</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coupons.map((c) => (
                    <tr key={c.code} className="hover:bg-slate-100/40 font-mono font-bold text-slate-700">
                      <td className="p-3 font-extrabold text-[#3B82F6]">{c.code}</td>
                      <td className="p-3 text-slate-400 text-[11px] italic font-medium">{c.discountType === 'percentage' ? 'Pourcentage (%)' : 'Montant Fixe'}</td>
                      <td className="p-3 font-extrabold text-slate-900">
                        {c.discountType === 'percentage' ? `${c.discountValue} %` : `${c.discountValue.toLocaleString()} FCFA`}
                      </td>
                      <td className="p-3 text-slate-500 font-medium">
                        {c.minSpend ? `${c.minSpend.toLocaleString()} FCFA` : 'Aucun'}
                      </td>
                      <td className="p-3 text-center">
                        {deletingCouponCode === c.code ? (
                          <div className="flex justify-center gap-1 text-[9px]">
                            <button
                              onClick={() => {
                                onDeleteCoupon(c.code);
                                setDeletingCouponCode(null);
                              }}
                              className="bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold cursor-pointer"
                            >
                              Oui
                            </button>
                            <button
                              onClick={() => setDeletingCouponCode(null)}
                              className="bg-slate-200 text-slate-750 px-1.5 py-0.5 rounded font-bold cursor-pointer"
                            >
                              Non
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setDeletingCouponCode(c.code);
                            }}
                            className="text-slate-400 hover:text-rose-600 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* NEWSLETTERS AND MARKETING CAMPAIGNS FOR NEWS AND ALERTS */}
      {marketTab === 'newsletters' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* Newsletter creation form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <form onSubmit={handleSendCampaign} className="space-y-4 text-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Lancer une campagne de mass-mailing</h3>
              
              {campaignFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 font-semibold">
                  {campaignFeedback}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-slate-500 block font-bold">Objet du message publicitaire / Titre Push *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Épargnez les frais de livraison Airtel Money ce week-end !"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] placeholder-slate-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-bold block">Cible d'audience</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-semibold focus:outline-none">
                  <option value="all">Tous les Clients du Gabon (4,810 abonnés)</option>
                  <option value="lib">Libreville, Owendo, Akanda uniquement (2,900 abonnés)</option>
                  <option value="pog">Vendeurs & PME Affiliées (50 boutiques)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-[10px] text-slate-500 leading-normal font-medium">
                <p className="font-extrabold text-slate-700">📡 Les notifications Push sont couplées :</p>
                <p>En poussant cette newsletter, vos abonnés recevront une alerte système instantanée couplée à un e-mail HTML.</p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#3B82F6] hover:bg-blue-600 text-white font-black transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Megaphone className="w-4 h-4" /> Diffuser la Newsletter
              </button>
            </form>
          </div>

          {/* Newsletter list table */}
          <div className="lg:col-span-7 bg-white border border-slate-205 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Historique des Campagnes de Diffusion</h3>
            
            <div className="space-y-3 font-sans text-xs">
              {newsletters.map((nl) => (
                <div key={nl.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <strong className="text-slate-800 block font-bold leading-snug">{nl.subject}</strong>
                    <div className="flex gap-2 text-[10px] text-slate-400 font-mono font-bold">
                      <span>Date : {nl.date}</span>
                      <span>•</span>
                      <span>Audience : {nl.subscribers} abonnés</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono font-black tracking-wider px-2.5 py-1 rounded-full uppercase ${
                    nl.delivered ? 'bg-emerald-50 border border-emerald-200 text-emerald-600' : 'bg-amber-50 border border-amber-200 text-amber-600'
                  }`}>
                    {nl.delivered ? 'Envoyé ✓' : 'Brouillon'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
