import React, { useState, useEffect } from 'react';
import {
  Monitor,
  Smartphone,
  CheckCircle,
  AlertCircle,
  BookOpen,
  User,
  Shield,
  Briefcase,
  Store,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  Bell,
  Heart,
  Share2
} from 'lucide-react';

// Import our modular schemas and types
import { Product, Boutique, Order, DeliveryBoy, AuditLog, Coupon } from './types';
import {
  INITIAL_BOUTIQUES,
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_DELIVERY_BOYS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_AUDIT_LOGS,
  GABON_CITIES
} from './data';

// Import our gorgeous sub-screens
import HomeView from './components/HomeView';
import MarketplaceView from './components/MarketplaceView';
import SellerDashboardView from './components/SellerDashboardView';
import AdminDashboardView from './components/AdminDashboardView';
import StrongMarketAI from './components/StrongMarketAI';
import MarketingLoyaltyView from './components/MarketingLoyaltyView';
import SecurityView from './components/SecurityView';

export default function App() {
  // --- Persistent State Handlers (Load from LocalStorage) ---
  const [boutiques, setBoutiques] = useState<Boutique[]>(() => {
    const saved = localStorage.getItem('sm_boutiques');
    return saved ? JSON.parse(saved) : INITIAL_BOUTIQUES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sm_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('sm_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sm_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>(() => {
    const saved = localStorage.getItem('sm_delivery_boys');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_BOYS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('sm_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('sm_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('sm_loyalty_points');
    return saved ? Number(saved) : 320; // Default starting balance
  });

  const [cart, setCart] = useState<{ item: Product; quantity: number }[]>(() => {
    const saved = localStorage.getItem('sm_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save changes to localStorage on any state mutation
  useEffect(() => {
    localStorage.setItem('sm_boutiques', JSON.stringify(boutiques));
  }, [boutiques]);

  useEffect(() => {
    localStorage.setItem('sm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sm_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('sm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sm_delivery_boys', JSON.stringify(deliveryBoys));
  }, [deliveryBoys]);

  useEffect(() => {
    localStorage.setItem('sm_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('sm_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('sm_loyalty_points', String(loyaltyPoints));
  }, [loyaltyPoints]);

  useEffect(() => {
    localStorage.setItem('sm_cart', JSON.stringify(cart));
  }, [cart]);

  // --- Profile state: 'client' | 'seller' | 'admin' ---
  const [userRole, setUserRole] = useState<'client' | 'seller' | 'admin'>('client');
  const [activeTab, setActiveTab] = useState<'accueil' | 'marketplace' | 'seller-dashboard' | 'admin-dashboard' | 'strongmarket-ai' | 'marketing-loyalty' | 'security'>('accueil');

  // Interactive Store registration modal
  const [isBoutiqueModalOpen, setIsBoutiqueModalOpen] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreDesc, setNewStoreDesc] = useState('');
  const [newStoreCity, setNewStoreCity] = useState('Libreville');
  const [newStoreWhatsapp, setNewStoreWhatsapp] = useState('');

  // Mobile Device Simulator View toggle
  const [mobileMode, setMobileMode] = useState(false);
  const [phoneOs, setPhoneOs] = useState<'android' | 'ios'>('android');

  // Toast push banners simulation
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [pushText, setPushText] = useState('');

  const triggerPushNotification = (message: string) => {
    setPushText(message);
    setShowPushNotification(true);
    setTimeout(() => {
      setShowPushNotification(false);
    }, 4500);
  };

  // --- Audit Logging helper ---
  const addAuditLog = (action: string, details: string, actor: string = 'wills_user') => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: actor,
      action: action,
      details: details,
      ipAddress: '197.214.3.45'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // --- Core State Actions ---

  // 1. Boutiques Creation & Approvals
  const handleRegisterBoutique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoreName || !newStoreWhatsapp) {
      alert("Veuillez remplir les informations indispensables.");
      return;
    }

    const newBtq: Boutique = {
      id: `btq-${Date.now()}`,
      name: newStoreName,
      logo: 'https://images.unsplash.com/photo-1610397613000-f0f2cf5d653f?w=150&h=150&fit=crop&q=80',
      banner: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=1200&h=400&fit=crop&q=80',
      description: newStoreDesc || "Ma boutique en ligne sur StrongMarket Gabon. Produits & Services exclusifs.",
      address: 'Avenue Principale',
      city: newStoreCity,
      phone: newStoreWhatsapp,
      whatsapp: newStoreWhatsapp,
      ownerEmail: 'willsangeloboussamba@gmail.com',
      rating: 5.0,
      followers: 1,
      createdAt: new Date().toISOString().split('T')[0],
      verified: false // Awaiting administrator approval
    };

    setBoutiques((prev) => [newBtq, ...prev]);
    addAuditLog('BOUTIQUE_CREATION', `Création d'une nouvelle boutique : "${newStoreName}" à ${newStoreCity}.`);
    
    // Switch to seller role to manage the store immediately
    setUserRole('seller');
    setActiveTab('seller-dashboard');
    setIsBoutiqueModalOpen(false);

    triggerPushNotification(`🏬 Boutique '${newStoreName}' créée ! Soumise pour validation auprès de l'administration.`);

    // Reset Form
    setNewStoreName('');
    setNewStoreDesc('');
    setNewStoreWhatsapp('');
  };

  const handleToggleVerifyBoutique = (boutiqueId: string) => {
    setBoutiques((prev) =>
      prev.map((b) => (b.id === boutiqueId ? { ...b, verified: !b.verified } : b))
    );
    const targetBtq = boutiques.find((b) => b.id === boutiqueId);
    if (targetBtq) {
      const activeState = !targetBtq.verified;
      addAuditLog('ADMIN_VERIFY_SHOP', `Badge de vérification boutique '${targetBtq.name}' : ${activeState ? 'ACTIF' : 'SUSPENDU'}`, 'system_admin');
      triggerPushNotification(`🛡️ Boutique '${targetBtq.name}' : ${activeState ? 'Validée et vérifiée !' : 'Vérification suspendue.'}`);
    }
  };

  const handleUpdateBoutique = (updatedBoutique: Boutique) => {
    setBoutiques((prev) => prev.map((b) => (b.id === updatedBoutique.id ? updatedBoutique : b)));
    addAuditLog('BOUTIQUE_UPDATE', `Mise à jour des informations pour la boutique : "${updatedBoutique.name}".`);
  };

  // 2. Products Addition and removal
  const handleAddNewProductBySeller = (newProd: Omit<Product, 'id' | 'salesCount' | 'rating' | 'reviewsCount'>) => {
    const added: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 0,
    };
    setProducts((prev) => [added, ...prev]);
    addAuditLog('PRODUCT_INSERTION', `Ajout d'un nouveau produit : "${added.name}" dans ${added.category}.`, 'vendeur_gabon');
    triggerPushNotification(`📦 Nouvel article ajouté au catalogue : ${added.name}`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    addAuditLog('PRODUCT_STOCK_UPDATE', `Ajustement de stock de l'article "${updated.name}" : ${updated.stock} unités.`, 'vendeur_gabon');
  };

  const handleDeleteProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (target) {
      addAuditLog('PRODUCT_DELETION', `Retrait du catalogue de l'article : ${target.name}.`, 'vendeur_gabon');
    }
  };

  // 3. Cart handlers
  const handleAddItemToCart = (prod: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.item.id === prod.id);
      if (existing) {
        return prev.map((item) =>
          item.item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { item: prod, quantity: 1 }];
    });
  };

  const handleRemoveItemFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.item.id !== productId));
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.item.id === productId ? { ...item, quantity: quantity } : item))
    );
  };

  // 4. Checkout Handler
  const handleCheckoutSubmit = (info: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    paymentMethod: 'airtel_money' | 'moov_money' | 'visa_mastercard' | 'cash_on_delivery';
  }) => {
    // Generate order item references
    const orderItemsStructured = cart.map((c) => ({
      id: c.item.id,
      type: 'product' as const,
      name: c.item.name,
      price: c.item.price,
      quantity: c.quantity,
      image: c.item.images[0],
      boutiqueId: c.item.boutiqueId,
      boutiqueName: c.item.boutiqueName,
    }));

    const rawSubtotal = cart.reduce((s, c) => s + c.item.price * c.quantity, 0);
    const shippingFee = info.city === 'Libreville' ? 1500 : info.city === 'Port-Gentil' ? 3500 : 4500;
    const finalBill = rawSubtotal + shippingFee;

    const newOrder: Order = {
      id: `SMG-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: info.name,
      customerPhone: info.phone,
      customerEmail: info.email,
      customerWhatsApp: info.phone,
      city: info.city,
      address: info.address,
      items: orderItemsStructured,
      totalAmount: finalBill,
      paymentMethod: info.paymentMethod,
      paymentStatus: info.paymentMethod === 'cash_on_delivery' ? 'pending' : 'success',
      status: 'pending',
      trackingNumber: `SMG-F${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString(),
      deliveryStatus: 'not_assigned',
      shippingFee: shippingFee,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Track points awarded (1 point per 1000 FCFA calculated)
    const earnedPoints = Math.floor(rawSubtotal / 1000);
    setLoyaltyPoints((prev) => prev + earnedPoints);

    addAuditLog('NEW_ORDER', `Achat complété par ${info.name}. Commande ID: ${newOrder.id}.`);
    
    // Trigger push simulated delay
    setTimeout(() => {
      triggerPushNotification(`✨ Commande ${newOrder.id} validée ! Vous avez gagné +${earnedPoints} points de fidélité ! 🇬🇦`);
    }, 2000);

    // Clear cart
    setCart([]);
  };

  // Order state transiting
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: status } : o))
    );
    addAuditLog('ORDER_STATUS_TRANSIT', `Changement d'état pour la commande #${orderId} : ${status.toUpperCase()}.`, 'vendeur_studio');
  };

  // Courier Assignment
  const handleAssignDeliveryBoy = (orderId: string, deliveryBoyName: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, deliveryStatus: 'assigned', deliveryBoy: deliveryBoyName } : o))
    );
    addAuditLog('DELIVERY_COURIER_ASSIGN', `La commande #${orderId} a été confiée à ${deliveryBoyName}.`, 'system_admin');
    triggerPushNotification(`🛵 Livraison ${orderId} confiée à : ${deliveryBoyName}`);
  };

  // Points redemption coupon addition
  const handleRedeemLoyaltyCoupon = (cost: number, rewardType: string) => {
    setLoyaltyPoints((prev) => prev - cost);
    const newBonusCoupon: Coupon = {
      code: rewardType,
      discountType: rewardType === 'LOYAL15' ? 'percentage' : 'fixed',
      discountValue: rewardType === 'LOYAL15' ? 15 : 2000,
      minSpend: 5000,
      active: true
    };
    setCoupons((prev) => [newBonusCoupon, ...prev]);
    addAuditLog('LOYALTY_REDEMPTION', `Échange de ${cost} points pour obtenir le coupon de récompense : '${rewardType}'.`);
  };

  // Coupons creation from marketing console
  const handleAddCoupon = (item: Coupon) => {
    setCoupons((prev) => [item, ...prev]);
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code !== code));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-800 bg-[#F8FAFC] selection:bg-[#3B82F6] selection:text-white">
      
      {/* GLOBAL PUSH BANNER SYSTEM */}
      {showPushNotification && (
        <div id="smg-push-notification" className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-50 max-w-sm w-full animate-bounce flex items-start gap-3 border-l-4 border-l-[#3B82F6]">
          <div className="p-2 bg-blue-50 text-[#3B82F6] rounded-full">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-blue-600 uppercase tracking-widest font-mono font-bold block">Notification de Caisse</span>
            <p className="text-xs text-slate-700 pt-0.5 leading-snug font-medium">{pushText}</p>
          </div>
        </div>
      )}

      {/* STRIP-FLAG COLOR BAR AT VERY TOP */}
      <div id="stripe-flag-bar" className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-sky-500 z-50"></div>

      {/* TOP SYSTEM NAV CONTROL: SWITCH USERS PERSPECTIVE & MOBILE EMULATION */}
      <header id="control-panel-heading" className="bg-[#0F172A] border-b border-slate-800 px-6 py-2.5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#3B82F6] rounded-full animate-ping"></div>
          <p className="text-slate-300 font-mono">
            Mode Évaluation – <strong className="text-[#3B82F6]">Rôles instantanés :</strong>
          </p>
          <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg">
            {[
              { role: 'client', label: '👤 Client', activeTab: 'accueil' },
              { role: 'seller', label: '🏪 Vendeur', activeTab: 'seller-dashboard' },
              { role: 'admin', label: '🛡️ Admin', activeTab: 'admin-dashboard' }
            ].map((p) => (
              <button
                key={p.role}
                onClick={() => {
                  setUserRole(p.role as any);
                  setActiveTab(p.activeTab as any);
                  addAuditLog('ROLE_SWITCH', `L'évaluateur filtre désormais sur le rôle : [${p.role.toUpperCase()}].`);
                }}
                className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${
                  userRole === p.role 
                    ? 'bg-[#3B82F6] text-white shadow' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Emulation, Simulator triggers */}
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                setMobileMode(false);
                addAuditLog('VIEWMODE_CHANGE', "Bascule de l'affichage en mode BUREAU.");
              }}
              className={`p-1.5 rounded transition ${!mobileMode ? 'bg-slate-800 text-[#3B82F6]' : 'text-slate-400'}`}
              title="Affichage Plein Écran Bureau"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMode(true);
                addAuditLog('VIEWMODE_CHANGE', "Bascule de l'affichage en mode ÉMULATION MOBILE.");
              }}
              className={`p-1.5 rounded transition ${mobileMode ? 'bg-slate-800 text-[#3B82F6]' : 'text-slate-400'}`}
              title="Affichage Émulateur Mobile"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Quick email link */}
          <span className="text-[11px] text-slate-500 font-mono">willsangeloboussamba@gmail.com</span>
        </div>
      </header>

      {/* MASTER LAYOUT INNER CHANGER */}
      <div id="viewport-coordinator" className="flex-1 flex justify-center items-stretch overflow-hidden bg-slate-100">

        {/* CONDITION 1: MOBILE DEVICE SIMULATION WRAPPER */}
        {mobileMode ? (
          <div className="py-8 flex flex-col items-center justify-center w-full max-w-7xl mx-auto z-10 animate-fade-in px-4">
            {/* Phone Bezel frame */}
            <div className="w-[380px] h-[780px] bg-slate-900 border-8 border-slate-850 rounded-[3rem] shadow-2xl relative flex flex-col overflow-hidden">
              
              {/* Top Notch Status Bar */}
              <div className="bg-white h-5 px-6 flex justify-between items-center text-[10px] text-slate-500 shrink-0 z-20 border-b border-slate-100">
                <div className="flex items-center gap-1 font-mono font-medium">
                  <span>StrongMarket Ga</span>
                </div>
                <div className="w-20 h-4 bg-slate-900 rounded-b-xl absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  {/* Camera hole simulation */}
                  <span className="w-3.5 h-1.5 bg-slate-850 rounded-full"></span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-medium">
                  <span>9:12 AM</span>
                  <span className="text-blue-500">⚡ 100%</span>
                </div>
              </div>

              {/* App Shell in Phone Viewport */}
              <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-[#F8FAFC] text-xs text-slate-800">
                {/* Navbar within phone */}
                <div className="p-4 bg-white text-left border-b border-slate-200 shrink-0">
                  <h1 className="text-sm font-display font-extrabold text-slate-900 flex items-center gap-1">
                    🌳 STRONG<span className="text-[#3B82F6]">MARKET</span>
                  </h1>
                </div>

                {/* Simulated Core view Area */}
                <div className="flex-grow overflow-y-auto px-4 py-2">
                  {renderMainTabsView()}
                </div>

                {/* Mobile Bottom Tab icons bar (Touch targets 44px) */}
                <nav className="h-14 bg-white border-t border-slate-200 grid grid-cols-5 items-center justify-center text-center shrink-0">
                  {[
                    { key: 'accueil', label: 'Accueil', icon: '🏠' },
                    { key: 'marketplace', label: 'E-Shop', icon: '🛒' },
                    { key: 'seller-dashboard', label: 'Studio', icon: '📦' },
                    { key: 'strongmarket-ai', label: 'AI', icon: '🪄' },
                    { key: 'marketing-loyalty', label: 'Vouchers', icon: '🎟️' }
                  ].map((tb) => (
                    <button
                      key={tb.key}
                      onClick={() => setActiveTab(tb.key as any)}
                      className={`flex flex-col items-center justify-center h-full gap-0.5 cursor-pointer ${
                        activeTab === tb.key ? 'text-[#3B82F6] font-bold' : 'text-slate-500 font-normal'
                      }`}
                    >
                      <span className="text-base leading-none">{tb.icon}</span>
                      <span className="text-[9px] scale-90">{tb.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Bottom Capacitive Pill slide */}
              <div className="bg-white h-3 flex items-center justify-center shrink-0 border-t border-slate-100">
                <span className="w-24 h-1.5 bg-slate-250 rounded-full"></span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-500 font-mono mt-3">
              💡 Utilisez la barre de navigation du smartphone virtuel ci-dessus pour naviguer dans l'édition mobile.
            </p>
          </div>
        ) : (
          
          /* CONDITION 2: FULL-SCREEN DESKTOP VIEWPORT WITH COMPREHENSIVE CONTROL BAR */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* PLATFORM HEADER */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center z-10 shrink-0 shadow-sm">
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setActiveTab('accueil')}
              >
                {/* Visual stylized logo featuring the Gabon flag theme but modernized */}
                <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center relative overflow-hidden group shadow-inner">
                  <div className="absolute top-0 w-full h-1/3 bg-emerald-500"></div>
                  <div className="absolute top-1/3 w-full h-1/3 bg-yellow-400"></div>
                  <div className="absolute top-2/3 w-full h-1/3 bg-sky-500"></div>
                  <span className="text-slate-900 text-[10px] font-display font-extrabold rotate-12 z-10 font-bold group-hover:scale-110 transition bg-white/90 px-1 py-0.5 rounded-md shadow-sm border border-slate-100">SM</span>
                </div>
                <div className="text-left">
                  <h1 className="text-lg font-display font-black text-slate-900 tracking-tighter flex items-center gap-1.5">
                    STRONG<span className="text-[#3B82F6]">MARKET</span> <span className="text-[#3A7E3E] font-semibold text-[10px] px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-100">Gabon</span>
                  </h1>
                  <span className="text-[10px] text-slate-400 block font-light leading-none">Écosystème Numérique Commercial National</span>
                </div>
              </div>

              {/* Desktop links */}
              <nav className="hidden lg:flex items-center gap-1.5 text-xs">
                {[
                  { key: 'accueil', label: 'Accueil' },
                  { key: 'marketplace', label: 'Marketplace' },
                  ...(userRole === 'seller' ? [{ key: 'seller-dashboard', label: 'Tableau de Bord Vendeur' }] : []),
                  ...(userRole === 'admin' ? [{ key: 'admin-dashboard', label: 'Portail Administratif' }] : []),
                  { key: 'strongmarket-ai', label: 'StrongMarket AI ✓' },
                  { key: 'marketing-loyalty', label: 'Fidélité & Coupons' },
                  { key: 'security', label: 'Sécurité & Audit' }
                ].map((lnk) => (
                  <button
                    key={lnk.key}
                    onClick={() => setActiveTab(lnk.key as any)}
                    className={`px-4 py-2.5 rounded-full transition font-bold cursor-pointer ${
                      activeTab === lnk.key
                        ? 'bg-blue-50 text-[#3B82F6] border border-blue-100 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {lnk.label}
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBoutiqueModalOpen(true)}
                  className="px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/10 transition cursor-pointer"
                >
                  🏪 Créer ma Boutique
                </button>
              </div>
            </header>

            {/* MAIN APP WORKSPACE CONTAINERS */}
            <main className="flex-1 overflow-y-auto px-8 py-6 w-full max-w-7xl mx-auto">
              {renderMainTabsView()}
            </main>

            {/* PUBLIC FOOTER */}
            <footer className="py-6 border-t border-slate-200 bg-white text-[10px] text-slate-400 font-mono tracking-wider shrink-0 text-center">
              <p>© 2026 StrongMarket Gabon. Tous droits réservés. Propulsé pour le développement du commerce national.</p>
            </footer>
          </div>
        )}
      </div>

      {/* BOUTIQUE REGISTRATION FORM LIGHTBOX MODAL */}
      {isBoutiqueModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 animate-fade-in backdrop-blur-md">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full relative text-left space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              🏪 Créer ma boutique en ligne
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">Installez votre catalogue de produits physiques ou proposez vos services professionnels immédiatement.</p>

            <form onSubmit={handleRegisterBoutique} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-500 font-bold block">Nom de la boutique *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: L'Échoppe de l'Estuaire"
                  value={newStoreName}
                  onChange={(e) => setNewStoreName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6] transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-500 font-bold block">Description de votre activité ou slogan</label>
                <input
                  type="text"
                  placeholder="Ex: Vente au détail de manioc de Lambaréné..."
                  value={newStoreDesc}
                  onChange={(e) => setNewStoreDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-500 font-bold block">N° WhatsApp Direct *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: +241 77 12 34 56"
                    value={newStoreWhatsapp}
                    onChange={(e) => setNewStoreWhatsapp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6] font-mono transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold block">Ville d'implantation *</label>
                  <select
                    value={newStoreCity}
                    onChange={(e) => setNewStoreCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-[#3B82F6] transition"
                  >
                    {GABON_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsBoutiqueModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-150 hover:bg-slate-200 text-slate-750 font-bold rounded-xl transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-blue-500/10"
                >
                  🚀 Créer ma boutique
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );

  // --- Sub-views routing coordinator switcher ---
  function renderMainTabsView() {
    switch (activeTab) {
      case 'accueil':
        return (
          <HomeView
            onNavigate={(tab) => {
              setActiveTab(tab);
              addAuditLog('TAB_NAVIGATE', `Navigation vers l'onglet : ${tab.toUpperCase()}.`);
            }}
            products={products}
            boutiques={boutiques}
            onOpenCreateBoutiqueModal={() => setIsBoutiqueModalOpen(true)}
          />
        );
      
      case 'marketplace':
        return (
          <MarketplaceView
            products={products}
            services={services}
            cart={cart}
            onAddToCart={handleAddItemToCart}
            onRemoveFromCart={handleRemoveItemFromCart}
            onUpdateCartQuantity={handleUpdateCartQty}
            onCheckout={handleCheckoutSubmit}
          />
        );

      case 'seller-dashboard':
        return (
          <SellerDashboardView
            boutiques={boutiques}
            products={products}
            orders={orders}
            onAddProduct={handleAddNewProductBySeller}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateBoutique={handleUpdateBoutique}
          />
        );

      case 'admin-dashboard':
        return (
          <AdminDashboardView
            boutiques={boutiques}
            products={products}
            orders={orders}
            deliveryBoys={deliveryBoys}
            auditLogs={auditLogs}
            onToggleVerifyBoutique={handleToggleVerifyBoutique}
            onAssignDeliveryBoy={handleAssignDeliveryBoy}
          />
        );

      case 'strongmarket-ai':
        return (
          <StrongMarketAI
            products={products}
            onAddMarketingLog={(detail) => addAuditLog('AI_MARKETING', detail, 'StrongMarket AI')}
          />
        );

      case 'marketing-loyalty':
        return (
          <MarketingLoyaltyView
            coupons={coupons}
            onAddCoupon={handleAddCoupon}
            onDeleteCoupon={handleDeleteCoupon}
            loyaltyPoints={loyaltyPoints}
            onRedeemPoints={handleRedeemLoyaltyCoupon}
          />
        );

      case 'security':
        return (
          <SecurityView
            auditLogs={auditLogs}
            onAddAuditLog={(action, details) => addAuditLog(action, details)}
          />
        );

      default:
        return (
          <div className="py-12 text-center text-xs text-slate-500">
            Erreur: Tab non implémenté.
          </div>
        );
    }
  }
}
