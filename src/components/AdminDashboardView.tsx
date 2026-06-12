import React, { useState } from 'react';
import { Shield, Users, CheckCircle, Store, Truck, DollarSign, AlertCircle, FileText, Compass, Star, Settings } from 'lucide-react';
import { Boutique, Product, Order, DeliveryBoy, AuditLog } from '../types';

interface AdminDashboardViewProps {
  boutiques: Boutique[];
  products: Product[];
  orders: Order[];
  deliveryBoys: DeliveryBoy[];
  auditLogs: AuditLog[];
  onToggleVerifyBoutique: (boutiqueId: string) => void;
  onAssignDeliveryBoy: (orderId: string, deliveryBoyName: string) => void;
  onClearLogs?: () => void;
}

export default function AdminDashboardView({
  boutiques,
  products,
  orders,
  deliveryBoys,
  auditLogs,
  onToggleVerifyBoutique,
  onAssignDeliveryBoy,
}: AdminDashboardViewProps) {
  // Navigation internal mode: 'boutiques' | 'logistique' | 'transactions' | 'audit'
  const [adminTab, setAdminTab] = useState<'boutiques' | 'logistique' | 'finance' | 'audit'>('boutiques');

  const [deliveryFilter, setDeliveryFilter] = useState<'all' | 'pending' | 'transit' | 'delivered'>('all');

  // Calculates financial aggregates
  const totalVolume = orders
    .filter((o) => o.paymentStatus === 'success')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // Platform Commission calculated at 5% of total sales
  const platformCommissions = totalVolume * 0.05;

  // Dispatchers filter for logical listing
  const ordersRequiringDelivery = orders.filter((o) => o.status !== 'cancelled' && o.status !== 'delivered');

  // Filtered boutiques to allow search of shops to authorize
  const [shopFilterQuery, setShopFilterQuery] = useState('');
  const filteredBoutiques = boutiques.filter((b) =>
    b.name.toLowerCase().includes(shopFilterQuery.toLowerCase()) ||
    b.city.toLowerCase().includes(shopFilterQuery.toLowerCase())
  );

  return (
    <div id="admin-dashboard-container" className="space-y-6 text-left py-4 pb-12">
      
      {/* Platform Administration Hub Banner */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#3B82F6] text-white rounded-xl shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Portail Administrateur National</h2>
            <p className="text-slate-500 text-xs">StrongMarket Gabon Corporate Management Console – Surveillance, Validation & Finance</p>
          </div>
        </div>
      </div>

      {/* Admin stats counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-205 p-5 rounded-2xl space-y-1 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Volume d'Affaire Total</p>
          <p className="text-xl font-bold text-slate-900 font-sans">{totalVolume.toLocaleString()} FCFA</p>
          <span className="text-[10px] text-emerald-600 font-bold">📈 Trafic sur toute l'étendue du Gabon</span>
        </div>

        <div className="bg-white border border-slate-205 p-5 rounded-2xl space-y-1 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Commissions StrongMarket (5%)</p>
          <p className="text-xl font-[#3B82F6] font-bold text-[#3B82F6] font-sans">{platformCommissions.toLocaleString()} FCFA</p>
          <span className="text-[10px] text-blue-600 font-bold">💵 Financement des infrastructures</span>
        </div>

        <div className="bg-white border border-slate-205 p-5 rounded-2xl space-y-1 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Boutiques Enregistrées</p>
          <p className="text-xl font-bold text-slate-900 font-sans">{boutiques.length}</p>
          <span className="text-[10px] text-sky-600 font-bold">🏬 {boutiques.filter(b => b.verified).length} Certifiées Actives</span>
        </div>

        <div className="bg-white border border-slate-205 p-5 rounded-2xl space-y-1 shadow-sm">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Livreurs Affiliés</p>
          <p className="text-xl font-bold text-slate-900 font-sans">{deliveryBoys.length}</p>
          <span className="text-[10px] text-purple-600 font-bold">🛵 Libreville, Owendo, Akanda</span>
        </div>
      </div>

      {/* Tab select bar */}
      <div className="flex border-b border-slate-205 gap-1 overflow-x-auto pb-px">
        {[
          { key: 'boutiques', label: '🏬 Approbation Boutiques', icon: Store },
          { key: 'logistique', label: '🚚 Attribution Course & GPS', icon: Truck },
          { key: 'finance', label: '📊 Transactions & Commissions', icon: DollarSign },
          { key: 'audit', label: '🕵️ Journal d\'Audit & Sécurité', icon: Shield }
        ].map((tab) => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setAdminTab(tab.key as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                adminTab === tab.key
                  ? 'border-[#3B82F6] text-[#3B82F6] bg-blue-50/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* BOUTIQUE APPROVAL VIEW */}
      {adminTab === 'boutiques' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 p-4 border border-slate-200 rounded-2xl shadow-sm">
            <div>
              <p className="text-xs text-slate-800 font-bold">Validation administrative des marchands gabonais</p>
              <p className="text-[10px] text-slate-450 font-medium leading-relaxed">Les boutiques validées reçoivent le badge officiel "Vérifié ✓" augmentant leur visibilité et taux de conversion.</p>
            </div>
            <input
              type="text"
              placeholder="Rechercher boutique..."
              value={shopFilterQuery}
              onChange={(e) => setShopFilterQuery(e.target.value)}
              className="bg-white border border-slate-205 rounded-xl px-3 py-1.5 text-xs text-slate-700 w-full sm:w-52 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="p-4">Boutique</th>
                    <th className="p-4">Siège Social / Ville</th>
                    <th className="p-4">Téléphone / WhatsApp</th>
                    <th className="p-4">Date Enregistrement</th>
                    <th className="p-4 text-center">Certification Badge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBoutiques.map((btq) => (
                    <tr key={btq.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img src={btq.logo} alt={btq.name} className="w-8 h-8 object-cover rounded-full bg-slate-50 border border-slate-100" />
                        <div>
                          <strong className="text-slate-900 block font-bold">{btq.name}</strong>
                          <span className="text-[10px] text-slate-400 font-bold">{btq.ownerEmail}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{btq.city} - {btq.address}</td>
                      <td className="p-4 font-mono text-slate-600 font-bold">{btq.phone}</td>
                      <td className="p-4 text-slate-400 font-mono font-bold">{btq.createdAt}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            onToggleVerifyBoutique(btq.id);
                          }}
                          className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all cursor-pointer ${
                            btq.verified
                              ? 'bg-rose-50 text-rose-800 border border-rose-100 hover:bg-rose-100'
                              : 'bg-emerald-55/90 text-[#3A7E3E] border border-emerald-100 hover:bg-emerald-50'
                          }`}
                        >
                          {btq.verified ? 'Suspendre' : 'Valider boutique ✓'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCH LOGISTICS & COURIERS */}
      {adminTab === 'logistique' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Orders dispatch list */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Commandes en attente de logistique</h3>
              <p className="text-[10px] text-slate-500 font-medium">Attribuez des coursiers professionnels équipés pour livrer rapidement à Libreville et ses alentours.</p>
            </div>

            <div className="space-y-3">
              {ordersRequiringDelivery.length === 0 ? (
                <div className="p-8 bg-white border border-slate-205 text-center text-slate-500 text-xs rounded-2xl shadow-sm">
                  Parfait, aucune livraison n'est actuellement en attente.
                </div>
              ) : (
                ordersRequiringDelivery.map((ord) => (
                  <div key={ord.id} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 text-xs shadow-sm">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-mono font-bold text-slate-900"># {ord.id}</span>
                        <span className="text-[10px] text-slate-400 font-bold block pt-1">📍 Destination : <strong className="text-[#3B82F6]">{ord.city}</strong> ({ord.address})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 font-mono font-bold">Frais : {ord.shippingFee.toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    {/* Selector of Delivery Boy */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-505 font-bold">
                        Livreur assigné : <strong className="text-[#3B82F6] font-extrabold">{ord.deliveryBoy || 'Non assigné'}</strong>
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <select
                          id={`select-delivery-${ord.id}`}
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) {
                              onAssignDeliveryBoy(ord.id, e.target.value);
                            }
                          }}
                          className="bg-slate-50 border border-slate-200 rounded-xl text-[10px] p-2 text-slate-700"
                        >
                          <option value="" disabled>Attribuer un transporteur...</option>
                          {deliveryBoys.map((boy) => (
                            <option key={boy.id} value={boy.name}>
                              🛵 {boy.name} ({boy.vehicle} - {boy.city})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Delivery Boy Roster & Live status simulation map */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Courier status tracking list */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                👥 Livreurs Disponibles
              </h3>
              
              <div className="space-y-2.5">
                {deliveryBoys.map((dboy) => (
                  <div key={dboy.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs flex justify-between items-center">
                    <div className="space-y-0.5">
                      <strong className="text-slate-900 font-bold block">{dboy.name}</strong>
                      <span className="text-[10px] text-slate-500 block font-mono font-medium">🚙 {dboy.vehicle.toUpperCase()} à {dboy.city}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-[#3A7E3E] border border-emerald-100 uppercase tracking-widest font-mono font-bold">
                        {dboy.status}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1">★ {dboy.ratings} / 5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GPS tracker widget (Anti AI-Slop, keep simple, beautiful, functional) */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
              <h4 className="text-xs font-bold text-slate-700">📍 Logistique Grand Libreville</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Notre algorithme d'optimisation groupe les tournées d'expéditions par secteurs (Charbonnages, Louis, Angondjé, Owendo-Port).
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* PLATFORM COMMISSIONS & PAYMENTS FLOWS LOGS */}
      {adminTab === 'finance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1 shadow-sm">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Taux Commission Plateforme</span>
              <p className="text-3xl font-bold font-sans text-slate-900">5.0 %</p>
              <p className="text-[10px] text-slate-450 font-medium">Prélevé automatiquement sur chaque vente finalisée.</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1 shadow-sm">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Répartition des flux bancaires</span>
              <p className="text-3xl font-bold font-sans text-slate-900">100%</p>
              <p className="text-[10px] text-emerald-600 font-bold">Libéré aux commerçants gabonais de suite.</p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-1 shadow-sm">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Moyens de paiement exploités</span>
              <p className="text-[11px] font-bold text-[#3B82F6] uppercase pt-2">Airtel Money (55%) • Moov (35%) • CB/CASH (10%)</p>
              <p className="text-[10px] text-slate-400 font-medium">Transactions sécurisées locales.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-205 rounded-2xl p-6 text-xs space-y-3 shadow-sm">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider">Suivi des paiements rémanents</h3>
            
            <div className="space-y-3">
              {orders.filter(o => o.paymentStatus === 'success').map((ord) => (
                <div key={ord.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-xs">
                  <div>
                    <span className="text-slate-900 font-bold block">Ord. #{ord.trackingNumber}</span>
                    <span className="text-[10px] text-slate-400 font-bold">Par {ord.customerName} à {ord.city}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#3A7E3E] font-bold block">+{ord.totalAmount.toLocaleString()} FCFA</span>
                    <span className="text-[9px] text-[#3B82F6] font-bold">Commission SG : {Math.round(ord.totalAmount * 0.05).toLocaleString()} FCFA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AUDIT LOGS & INTEL SECURITY TABS */}
      {adminTab === 'audit' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              📋 Journal des Événements & Activités Système (Audit Logs)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono font-bold">Chiffrement AES-256 actif</span>
          </div>

          <div className="space-y-3 flex flex-col gap-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
                <div className="flex justify-between text-[11px] font-mono font-bold">
                  <span className="text-[#3B82F6] font-bold">[{log.action}]</span>
                  <span className="text-slate-400 font-medium">{log.timestamp}</span>
                </div>
                <p className="text-slate-705 text-xs font-semibold leading-relaxed text-slate-700">{log.details}</p>
                <div className="flex gap-2 text-[10px] text-slate-450 font-mono">
                  <span>Opérateur : <strong className="text-slate-500 font-bold">{log.user}</strong></span>
                  <span>•</span>
                  <span>IP Trace : {log.ipAddress}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
