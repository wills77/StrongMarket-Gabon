import React, { useState } from 'react';
import { Store, Plus, Edit, Trash2, TrendingUp, AlertTriangle, CheckCircle, Package, Truck, Award, DollarSign, Eye, ShoppingBag } from 'lucide-react';
import { Product, Boutique, Order } from '../types';

interface SellerDashboardViewProps {
  boutiques: Boutique[];
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id' | 'salesCount' | 'rating' | 'reviewsCount'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateBoutique: (boutique: Boutique) => void;
}

export default function SellerDashboardView({
  boutiques,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateBoutique,
}: SellerDashboardViewProps) {
  // Select active boutique to preview (defaults to first boutique OkouméTech)
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState<string>(boutiques[0]?.id || '');
  const activeBoutique = boutiques.find((b) => b.id === selectedBoutiqueId) || boutiques[0];

  // Section switcher: 'stats' | 'products' | 'orders' | 'settings'
  const [activeSection, setActiveSection] = useState<'stats' | 'products' | 'orders' | 'settings'>('stats');

  // New product Form state
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(0);
  const [newProdComparePrice, setNewProdComparePrice] = useState(0);
  const [newProdCategory, setNewProdCategory] = useState('Électronique');
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdCity, setNewProdCity] = useState('Libreville');
  const [newProdImageUrl, setNewProdImageUrl] = useState('https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=500&fit=crop&q=80');

  // Filter listings based on selected boutique
  const boutiqueProducts = products.filter((p) => p.boutiqueId === activeBoutique?.id);
  const boutiqueOrders = orders.filter((o) =>
    o.items.some((item) => item.boutiqueId === activeBoutique?.id)
  );

  // Statistics calculations
  const totalRevenue = boutiqueOrders
    .filter((o) => o.paymentStatus === 'success')
    .reduce((sum, o) => {
      const boutiqueSubset = o.items
        .filter((i) => i.boutiqueId === activeBoutique?.id)
        .reduce((s, i) => s + (i.price * i.quantity), 0);
      return sum + boutiqueSubset;
    }, 0);

  const pendingOrdersCount = boutiqueOrders.filter((o) => o.status === 'pending').length;
  const processedOrdersCount = boutiqueOrders.filter((o) => o.status === 'delivered').length;

  const lowStockAlerts = boutiqueProducts.filter((p) => p.stock < 5);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) {
      alert('Veuillez spécifier le nom et le prix du produit.');
      return;
    }

    onAddProduct({
      name: newProdName,
      description: newProdDesc,
      price: Number(newProdPrice),
      compareAtPrice: newProdComparePrice > 0 ? Number(newProdComparePrice) : undefined,
      category: newProdCategory,
      boutiqueId: activeBoutique.id,
      boutiqueName: activeBoutique.name,
      images: [newProdImageUrl],
      stock: Number(newProdStock),
      city: newProdCity,
      isAvailable: true,
      deliveryFee: 1500,
      tags: ['Nouveau']
    });

    // Reset fields
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(0);
    setNewProdComparePrice(0);
    setNewProdStock(10);
    setIsAddingProduct(false);
  };

  const handleUpdateBoutiqueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBoutique(activeBoutique);
    alert('Informations de votre boutique enregistrées avec succès !');
  };

  return (
    <div id="seller-dashboard-container" className="space-y-6 text-left py-4 pb-12">
      
      {/* Seller Header & Boutique Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={activeBoutique?.logo}
            alt={activeBoutique?.name}
            className="w-14 h-14 object-cover rounded-xl border border-slate-100 bg-slate-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeBoutique?.name}</h2>
              {activeBoutique?.verified && (
                <span className="bg-emerald-55/90 text-[#3A7E3E] border border-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  ✓ Vérifié StrongMarket
                </span>
              )}
            </div>
            <p className="text-slate-500 text-xs">Propriétaire : <span className="text-[#3B82F6] font-mono font-medium">{activeBoutique?.ownerEmail}</span></p>
          </div>
        </div>

        {/* Dynamic Boutique select switch */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs text-slate-500 font-bold whitespace-nowrap uppercase">Choisir Boutique :</label>
          <select
            value={selectedBoutiqueId}
            onChange={(e) => setSelectedBoutiqueId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-55/10 focus:border-[#3B82F6] w-full md:w-52 transition"
          >
            {boutiques.map((btq) => (
              <option key={btq.id} value={btq.id}>
                🏪 {btq.name} ({btq.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Primary Sub-menus switches */}
      <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
        {[
          { key: 'stats', label: '📊 Tableau de Bord', icon: TrendingUp },
          { key: 'products', label: '📦 Catalogue Produits', icon: Package },
          { key: 'orders', label: '📋 Commandes Clients', icon: ShoppingBag },
          { key: 'settings', label: '⚙️ Configuration Boutique', icon: Store }
        ].map((sec) => {
          const IconComp = sec.icon;
          return (
            <button
              key={sec.key}
              onClick={() => setActiveSection(sec.key as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                activeSection === sec.key
                  ? 'border-[#3B82F6] text-[#3B82F6] bg-blue-50/30'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* STATS SECTION */}
      {activeSection === 'stats' && (
        <div className="space-y-6">
          {/* Top dynamic metrics widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-1 block relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Revenu Estimé</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight font-sans">{totalRevenue.toLocaleString()} FCFA</p>
              <p className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">★ Libéré via Airtel/Moov Money</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-1 block relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Commandes en Attente</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight font-sans">{pendingOrdersCount}</p>
              <p className="text-[10px] text-amber-600 font-bold">⚠️ Requiert votre validation rapide</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-1 block relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-450"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Total Produits Actifs</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight font-sans">{boutiqueProducts.length}</p>
              <p className="text-[10px] text-sky-600 font-bold">Aperçus dans {activeBoutique?.city}</p>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-1 block relative overflow-hidden shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-pink-400"></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Abonnés Boutique</p>
              <p className="text-2xl font-bold text-slate-900 tracking-tight font-sans">{activeBoutique?.followers || 0}</p>
              <p className="text-[10px] text-pink-600 font-bold">Fidélité & Notifications Push</p>
            </div>
          </div>

          {/* Low Stock Indicators & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" /> Alertes de ruptures de stocks
              </h3>
              
              {lowStockAlerts.length === 0 ? (
                <div className="p-5 bg-slate-50 rounded-2xl text-xs text-slate-500 text-center font-medium">
                  ☘️ Parfait ! Tous vos produits possèdent un niveau de stock satisfaisant.
                </div>
              ) : (
                <div className="space-y-3">
                  {lowStockAlerts.map((prod) => (
                    <div key={prod.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{prod.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Stock actuel : {prod.stock} unités</span>
                      </div>
                      <button
                        onClick={() => {
                          const val = prompt(`Nouveau stock pour ${prod.name} :`, String(prod.stock + 15));
                          if (val && !isNaN(Number(val))) {
                            onUpdateProduct({ ...prod, stock: Number(val) });
                          }
                        }}
                        className="py-1.5 px-3 bg-[#3B82F6] hover:bg-blue-600 text-white text-[10px] font-bold rounded-lg transition"
                      >
                        Approvisionner
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Simulated Sales Chart Vector */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#3B82F6]" /> Courbe des Ventes journalières (FCFA)
              </h3>
              
              {/* Gorgeous SVG interactive plot */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 h-32 flex flex-col justify-end relative shadow-inner">
                {/* Simulated Chart Plot paths */}
                <svg className="w-full h-20 overflow-visible text-[#3B82F6]" viewBox="0 0 100 20">
                  <path
                    d="M 0 18 Q 15 12, 30 14 T 60 4 T 90 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="0" cy="18" r="1.5" className="fill-[#3B82F6]" />
                  <circle cx="30" cy="14" r="1.5" className="fill-[#3B82F6]" />
                  <circle cx="60" cy="4" r="1.5" className="fill-[#3B82F6]" />
                  <circle cx="90" cy="2" r="1.5" className="fill-yellow-500 animate-ping" />
                </svg>

                {/* X markers */}
                <div className="flex justify-between text-[9px] text-slate-400 border-t border-slate-100 pt-1 mt-2 font-mono font-bold">
                  <span>Lundi</span>
                  <span>Mercredi</span>
                  <span>Vendredi</span>
                  <span>Aujourd'hui (Max!)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATALOGUE SECTION */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white p-5 border border-slate-200 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Gerez vos fiches descriptives, tarifs et photos en temps réel.</span>
            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Ajouter un Produit
            </button>
          </div>

          {/* New product overlay dialog */}
          {isAddingProduct && (
            <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">Formulaire de création d'article</h3>
              <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-bold block">Nom de l'article *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Manioc Préparé Premium de Port-Gentil"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-bold block">Image illustrative (URL) *</label>
                  <input
                    type="text"
                    required
                    value={newProdImageUrl}
                    onChange={(e) => setNewProdImageUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[11px] text-slate-500 font-bold block">Description commerciale complète</label>
                  <textarea
                    rows={2}
                    placeholder="Détaillez les bienfaits, dimensions, caractéristiques et garanties de livraison au Gabon..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-bold block">Prix de Vente (FCFA) *</label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 5000"
                    value={newProdPrice === 0 ? '' : newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-bold block">Prix à barrer si promo (FCFA)</label>
                  <input
                    type="number"
                    placeholder="Laisser vide ou spécifier tarif d'origine"
                    value={newProdComparePrice === 0 ? '' : newProdComparePrice}
                    onChange={(e) => setNewProdComparePrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-bold block">Catégorie d'affiliation</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  >
                    <option value="Alimentation">Alimentation</option>
                    <option value="Produits locaux">Produits locaux</option>
                    <option value="Artisanat gabonais">Artisanat gabonais</option>
                    <option value="Téléphones">Téléphones</option>
                    <option value="Électronique">Électronique</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Mode Homme">Mode Homme</option>
                    <option value="Mode Femme">Mode Femme</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-bold block">Stock initial disponible</label>
                  <input
                    type="number"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                  />
                </div>

                <div className="flex gap-2 justify-end md:col-span-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingProduct(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 font-bold transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/10 cursor-pointer"
                  >
                    Enregistrer le produit
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List display */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <th className="p-4">Identité</th>
                    <th className="p-4">Catégorie</th>
                    <th className="p-4">Prix</th>
                    <th className="p-4">Quantité</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {boutiqueProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img src={prod.images[0]} alt={prod.name} className="w-9 h-9 object-cover rounded bg-slate-100 border border-slate-200" />
                        <div>
                          <span className="font-bold text-slate-900 block">{prod.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold">📍 {prod.city}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        <span className="px-2.5 py-1 bg-slate-100 text-[10px] rounded-full text-slate-600 font-bold">
                          {prod.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[#3B82F6] font-bold text-xs">{prod.price.toLocaleString()} FCFA</td>
                      <td className="p-4">
                        <span className={`font-mono font-bold ${prod.stock < 5 ? 'text-rose-600' : 'text-slate-600'}`}>
                          {prod.stock} unités
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              const ns = prompt(`Désigner nouveau stock de ${prod.name} :`, String(prod.stock));
                              if (ns && !isNaN(Number(ns))) {
                                onUpdateProduct({ ...prod, stock: Number(ns) });
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-[#3B82F6] transition"
                            title="Ajuster stock"
                          >
                            <Package className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Êtes-vous sûr de vouloir supprimer ${prod.name} du catalogue ?`)) {
                                onDeleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS SECTION */}
      {activeSection === 'orders' && (
        <div className="space-y-6">
          <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl shadow-sm">
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Gérez les demandes de livraison à travers le Gabon. Pour chaque commande validée, vous pouvez cliquer sur 
              le bouton <span className="text-[#3B82F6] font-bold">WhatsApp</span> pour discuter des conditions d'envoi.
            </p>
          </div>

          {boutiqueOrders.length === 0 ? (
            <div className="bg-white border border-slate-200 p-8 rounded-3xl text-center text-slate-500 text-xs shadow-sm font-medium">
              😴 Reçu aucune commande pour le moment. Expédiez d'abord des paniers d'achats depuis la Marketplace !
            </div>
          ) : (
            <div className="space-y-4">
              {boutiqueOrders.map((ord) => (
                <div key={ord.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                  
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">Commande #{ord.id}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          ord.status === 'delivered' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' :
                          ord.status === 'shipped' ? 'bg-blue-50 text-blue-800 border border-blue-100' :
                          'bg-amber-50 text-amber-800 border border-amber-100'
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-bold pt-0.5">Date : {new Date(ord.date).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2 items-center">
                      <label className="text-[11px] text-slate-500 font-bold uppercase">État :</label>
                      <select
                        value={ord.status}
                        onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500/10"
                      >
                        <option value="pending">En attente (Pending)</option>
                        <option value="validated">Validée (Validated)</option>
                        <option value="preparing">Préparation colis (Preparing)</option>
                        <option value="shipped">Expédiée (Shipped)</option>
                        <option value="delivered">Livrée (Delivered)</option>
                        <option value="cancelled">Annulée (Cancelled)</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Customer credentials */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Destinataire :</span>
                      <strong className="text-slate-900 font-bold text-xs">{ord.customerName}</strong>
                      <span className="block text-slate-500 font-mono">{ord.customerPhone}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Adresse de livraison :</span>
                      <strong className="text-slate-900 font-bold text-xs">📍 {ord.city}</strong>
                      <span className="block text-slate-500">{ord.address}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-slate-400 font-bold block uppercase text-[9px] tracking-wider">Paiement :</span>
                      <strong className="text-slate-900 font-bold text-xs uppercase font-mono">{ord.paymentMethod.replace('_', ' ')}</strong>
                      <span className={`block text-[11px] font-bold ${ord.paymentStatus === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {ord.paymentStatus === 'success' ? '✓ Payé' : '⌛ Non libéré'}
                      </span>
                    </div>
                  </div>

                  {/* Order items purchased */}
                  <div className="bg-slate-50 p-4 rounded-xl space-y-2 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Articles commandés :</span>
                    {ord.items.map((item) => (
                      <div key={item.id} className="text-xs flex justify-between">
                        <span className="text-slate-700 font-medium">{item.name} <strong className="text-amber-600 font-mono font-bold">x{item.quantity}</strong></span>
                        <span className="font-mono text-slate-600 font-bold">{(item.price * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp contact triggers */}
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-[10px] text-slate-400 font-bold">Livreur assigné : <strong className="text-slate-700">{ord.deliveryBoy || 'Non désigné pour le moment'}</strong></span>
                    <a
                      href={`https://wa.me/${ord.customerPhone.replace(/\s+/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#3A7E3E] hover:bg-emerald-600 text-white rounded-xl flex items-center gap-1 font-bold transition shadow-lg shadow-emerald-600/10"
                    >
                      💬 WhatsApp Client
                    </a>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOUTIQUE CONFIGURATION SETTINGS */}
      {activeSection === 'settings' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <form onSubmit={handleUpdateBoutiqueSubmit} className="space-y-6 text-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">Mettre à jour les informations de la boutique</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-500 font-bold block">Nom légal de la boutique</label>
                <input
                  type="text"
                  required
                  value={activeBoutique?.name}
                  onChange={(e) => {
                    const updated = { ...activeBoutique, name: e.target.value };
                    onUpdateBoutique(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold block">Ville Gabon d'implantation principale</label>
                <select
                  value={activeBoutique?.city}
                  onChange={(e) => {
                    const updated = { ...activeBoutique, city: e.target.value };
                    onUpdateBoutique(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                >
                  <option value="Libreville">Libreville</option>
                  <option value="Port-Gentil">Port-Gentil</option>
                  <option value="Franceville">Franceville</option>
                  <option value="Oyem">Oyem</option>
                  <option value="Lambaréné">Lambaréné</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-slate-500 font-bold block">Description courte / Histoire / Slogan de marque</label>
                <input
                  type="text"
                  value={activeBoutique?.description}
                  onChange={(e) => {
                    const updated = { ...activeBoutique, description: e.target.value };
                    onUpdateBoutique(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold block">Téléphone de livraison</label>
                <input
                  type="text"
                  value={activeBoutique?.phone}
                  onChange={(e) => {
                    const updated = { ...activeBoutique, phone: e.target.value };
                    onUpdateBoutique(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold block">N° WhatsApp Direct (avec code pays ex: +241... * )</label>
                <input
                  type="text"
                  value={activeBoutique?.whatsapp}
                  onChange={(e) => {
                    const updated = { ...activeBoutique, whatsapp: e.target.value };
                    onUpdateBoutique(updated);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-xl transition cursor-pointer shadow-lg shadow-blue-500/10"
            >
              Sauvegarder les réglages
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
