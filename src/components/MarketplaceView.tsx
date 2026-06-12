import React, { useState } from 'react';
import { Search, Filter, ShoppingBag, Phone, Sparkles, Star, MapPin, X, MessageSquare, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product, Service } from '../types';
import { GABON_CITIES, CATEGORIES_PRODUCTS, CATEGORIES_SERVICES } from '../data';

interface MarketplaceViewProps {
  products: Product[];
  services: Service[];
  cart: { item: Product; quantity: number }[];
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onCheckout: (customerInfo: {
    name: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    paymentMethod: 'airtel_money' | 'moov_money' | 'visa_mastercard' | 'cash_on_delivery';
  }) => void;
}

export default function MarketplaceView({
  products,
  services,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onCheckout,
}: MarketplaceViewProps) {
  // Navigation internal mode
  const [activeSubTab, setActiveSubTab] = useState<'products' | 'services'>('products');

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [maxPrice, setMaxPrice] = useState<number>(800000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [minimumRating, setMinimumRating] = useState<number>(0);

  // Cart Tray & Booking Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Check out Form State
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('Libreville');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutPayment, setCheckoutPayment] = useState<'airtel_money' | 'moov_money' | 'visa_mastercard' | 'cash_on_delivery'>('airtel_money');
  const [isCheckoutSubmitted, setIsCheckoutSubmitted] = useState(false);

  // Service Booking / Quotation Form State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingDetails, setBookingDetails] = useState('');
  const [bookingContact, setBookingContact] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Automatic Shipping Fee calculation based on city
  const getShippingFee = (city: string) => {
    switch (city) {
      case 'Libreville':
      case 'Owendo':
      case 'Akanda':
        return 1500;
      case 'Port-Gentil':
        return 3500;
      case 'Franceville':
      case 'Oyem':
      case 'Mouila':
      case 'Lambaréné':
        return 4500;
      default:
        return 5000;
    }
  };

  const activeShippingFee = getShippingFee(checkoutCity);

  // Filtered Products
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.boutiqueName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tous' || prod.category === selectedCategory;
    const matchesCity = selectedCity === 'Toutes' || prod.city === selectedCity;
    const matchesPrice = prod.price <= maxPrice;
    const matchesAvailability = !onlyAvailable || (prod.isAvailable && prod.stock > 0);
    const matchesRating = prod.rating >= minimumRating;

    return matchesSearch && matchesCategory && matchesCity && matchesPrice && matchesAvailability && matchesRating;
  });

  // Filtered Services
  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.boutiqueName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tous' || srv.category === selectedCategory;
    const matchesCity = selectedCity === 'Toutes' || srv.city === selectedCity;
    const matchesPrice = srv.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesCity && matchesPrice;
  });

  // Totals calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const cartTotal = cartSubtotal + (cart.length > 0 ? activeShippingFee : 0);

  const triggerCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone || !checkoutEmail || !checkoutAddress) {
      alert("Veuillez remplir tous les champs obligatoires pour finaliser la commande.");
      return;
    }
    
    onCheckout({
      name: checkoutName,
      phone: checkoutPhone,
      email: checkoutEmail,
      city: checkoutCity,
      address: checkoutAddress,
      paymentMethod: checkoutPayment
    });

    setIsCheckoutSubmitted(true);
    setTimeout(() => {
      setIsCheckoutSubmitted(false);
      setIsCartOpen(false);
      // reset checkout states
      setCheckoutName('');
      setCheckoutPhone('');
      setCheckoutEmail('');
      setCheckoutAddress('');
    }, 4000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingContact || !bookingDetails) {
      alert("Veuillez remplir les informations de réservation.");
      return;
    }
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setSelectedService(null);
      setBookingDate('');
      setBookingContact('');
      setBookingDetails('');
    }, 3000);
  };

  return (
    <div id="marketplace-view-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-4">
      
      {/* Left Sidebar Filters */}
      <aside id="marketplace-filters" className="lg:col-span-3 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 h-fit text-left">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-mono font-semibold tracking-wider uppercase text-slate-300 flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" /> Filtres de recherche
          </h3>
          {(selectedCategory !== 'Tous' || selectedCity !== 'Toutes' || searchTerm !== '' || onlyAvailable || minimumRating > 0) && (
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSelectedCity('Toutes');
                setSearchTerm('');
                setOnlyAvailable(false);
                setMinimumRating(0);
                setMaxPrice(800000);
              }}
              className="text-[11px] text-yellow-400 hover:underline cursor-pointer"
            >
              Réinitialiser
            </button>
          )}
        </div>

        {/* Categories Select */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 font-medium block">Catégorie</label>
          <select
            id="select-category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="Tous">Toutes les catégories</option>
            {activeSubTab === 'products'
              ? CATEGORIES_PRODUCTS.map((cat) => (
                  <option key={cat} value={cat}>
                    📦 {cat}
                  </option>
                ))
              : CATEGORIES_SERVICES.map((cat) => (
                  <option key={cat} value={cat}>
                    🛠️ {cat}
                  </option>
                ))}
          </select>
        </div>

        {/* City Filter */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 font-medium block">Ville de livraison / Prestation</label>
          <select
            id="select-city-filter"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="Toutes">Tout le Gabon 🇬🇦</option>
            {GABON_CITIES.map((city) => (
              <option key={city} value={city}>
                📍 {city}
              </option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Prix maximum</span>
            <span className="font-mono text-emerald-400 font-semibold">{maxPrice.toLocaleString()} FCFA</span>
          </div>
          <input
            type="range"
            min="1000"
            max="800000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>1K FCFA</span>
            <span>800K FCFA</span>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-xs text-slate-400 font-medium block">Note minimum</label>
          <div className="flex gap-1.5 pt-1">
            {[0, 3, 4, 4.5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setMinimumRating(rating)}
                className={`flex-1 py-1 px-2 rounded text-[10px] font-mono border transition ${
                  minimumRating === rating
                    ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {rating === 0 ? 'Toutes' : `${rating}★+`}
              </button>
            ))}
          </div>
        </div>

        {/* Availability Toggle */}
        {activeSubTab === 'products' && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-400 font-medium">En stock uniquement</span>
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-800 accent-emerald-500 cursor-pointer"
            />
          </div>
        )}

        {/* Delivery banner info */}
        <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl text-[11px] text-slate-400 space-y-1.5">
          <p className="font-semibold text-slate-300">💡 Barème de livraison :</p>
          <ul className="space-y-1 list-disc pl-3">
            <li>Libreville, Owendo, Akanda : 1 500 FCFA</li>
            <li>Port-Gentil : 3 500 FCFA</li>
            <li>Intérieur du Gabon : 4 500 FCFA</li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main id="marketplace-content" className="lg:col-span-9 space-y-6">
        
        {/* Marketplace Search & Top Tabs bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          {/* Sub tabs: Produits vs Services */}
          <div className="flex p-1 bg-slate-950 rounded-xl w-full md:w-auto">
            <button
              onClick={() => {
                setActiveSubTab('products');
                setSelectedCategory('Tous');
              }}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg font-medium text-xs transition duration-150 cursor-pointer ${
                activeSubTab === 'products'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              📦 Produits Physiques
            </button>
            <button
              onClick={() => {
                setActiveSubTab('services');
                setSelectedCategory('Tous');
              }}
              className={`flex-1 md:flex-none px-5 py-2 rounded-lg font-medium text-xs transition duration-150 cursor-pointer ${
                activeSubTab === 'services'
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              🛠️ Services & Réservation
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              id="marketplace-search-input"
              type="text"
              placeholder={`Rechercher un ${activeSubTab === 'products' ? 'produit...' : 'prestataire de service...'}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-slate-500"
            />
          </div>

          {/* Checkout Cart trigger Button helper */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 font-medium text-xs rounded-xl hover:bg-emerald-400 transition ml-auto md:ml-0 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>

        {/* Stats bar or search breadcrumb summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 py-1 px-2">
          <span>
            {activeSubTab === 'products' ? `${filteredProducts.length} produits trouvés` : `${filteredServices.length} services trouvés`}
          </span>
          {selectedCategory !== 'Tous' && (
            <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 rounded-full text-[10px]">
              Filtre : {selectedCategory}
            </span>
          )}
        </div>

        {/* PRODUCTS GRID */}
        {activeSubTab === 'products' ? (
          filteredProducts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800/60 p-12 rounded-2xl text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-440 font-medium">Aucun produit ne correspond à ces critères de filtrage au Gabon.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('Tous');
                  setSelectedCity('Toutes');
                  setSearchTerm('');
                  setMaxPrice(800000);
                  setOnlyAvailable(false);
                }}
                className="text-xs px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
              >
                Tout réinitialiser
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div className="relative group overflow-hidden bg-slate-950">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"
                    />
                    {prod.compareAtPrice && prod.compareAtPrice > prod.price && (
                      <span className="absolute top-2 left-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        PROMO
                      </span>
                    )}
                    <span className="absolute bottom-2 right-2 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-sm">
                      📍 {prod.city}
                    </span>
                  </div>

                  <div className="p-4 space-y-2 text-left flex-1 flex flex-col justify-between">
                    <div>
                      {/* Boutique and Brand tag info */}
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="hover:underline font-medium text-emerald-400">🏪 {prod.boutiqueName}</span>
                        <span>★ {prod.rating} ({prod.reviewsCount})</span>
                      </div>

                      <h4 className="font-semibold text-white text-sm line-clamp-1 mt-1 hover:text-emerald-300 cursor-pointer" onClick={() => setSelectedProduct(prod)}>
                        {prod.name}
                      </h4>
                      <p className="text-slate-400 text-xs line-clamp-2 mt-1">{prod.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 mt-3 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-emerald-400 font-mono font-bold text-base">{prod.price.toLocaleString()} FCFA</span>
                          {prod.compareAtPrice && (
                            <span className="text-slate-500 font-mono text-xs line-through ml-2">
                              {prod.compareAtPrice.toLocaleString()} FCFA
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] ${prod.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {prod.stock > 0 ? `En stock (${prod.stock})` : 'Rupture'}
                        </span>
                      </div>

                      {/* Buy CTAs */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition text-center cursor-pointer"
                        >
                          Détails
                        </button>
                        <button
                          onClick={() => {
                            onAddToCart(prod);
                            // Visual trigger feedback can be simple state
                            alert(`${prod.name} a été ajouté à votre panier !`);
                          }}
                          disabled={prod.stock === 0}
                          className="py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition disabled:bg-slate-800 disabled:text-slate-500 cursor-pointer"
                        >
                          Acheter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* SERVICES GRID */
          filteredServices.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800/60 p-12 rounded-2xl text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-slate-440 font-medium">Aucun prestataire de services ne correspond à ce filtre.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredServices.map((srv) => (
                <div 
                  key={srv.id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-755 transition text-left space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 bg-sky-500/10 text-sky-400 text-[10px] rounded border border-sky-500/20 font-mono uppercase">
                        {srv.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        📍 {srv.city}
                      </span>
                    </div>

                    <h4 className="font-semibold text-white text-base">{srv.name}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{srv.description}</p>

                    <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono">
                      <span>⏱️ Durée : {srv.duration}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">🏪 Boutique : {srv.boutiqueName}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-slate-400 block">Tarif estimé</span>
                      <span className="font-mono font-bold text-lg text-white">{srv.price.toLocaleString()} FCFA</span>
                    </div>
                    <button
                      onClick={() => setSelectedService(srv)}
                      className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                      Réserver / Devis
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </main>

      {/* DETAILED PRODUCT DIALOG MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden p-6 relative space-y-4 text-left">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={selectedProduct.images[0]}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover rounded-xl"
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-semibold font-mono">Boutique : {selectedProduct.boutiqueName}</span>
                <span className="text-yellow-400 font-mono">★ {selectedProduct.rating} / 5</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{selectedProduct.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{selectedProduct.description}</p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-855 rounded-xl space-y-1 text-xs">
              <span className="text-slate-400 block">Informations de livraison :</span>
              <p className="text-slate-300">📍 Expédié de : <strong className="text-emerald-400">{selectedProduct.city}</strong></p>
              <p className="text-slate-300">💵 Livraison partout au Gabon. Frais locaux ajustés à l'adresse.</p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <div>
                <span className="text-xs text-slate-500 block">Prix TTC</span>
                <span className="text-xl font-mono font-bold text-emerald-400">{selectedProduct.price.toLocaleString()} FCFA</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    onAddToCart(selectedProduct);
                    setSelectedProduct(null);
                    alert(`${selectedProduct.name} a été ajouté au panier.`);
                  }}
                  disabled={selectedProduct.stock === 0}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition disabled:bg-slate-800 disabled:text-slate-500"
                >
                  Ajouter au Panier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE BOOKING DIALOG MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 relative space-y-4 text-left">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                Demande de Réservation / Devis
              </span>
              <h3 className="text-lg font-bold text-white pt-1">{selectedService.name}</h3>
              <p className="text-slate-400 text-xs">Fourni par : <strong>{selectedService.boutiqueName}</strong></p>
            </div>

            {bookingSubmitted ? (
              <div className="p-6 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3 text-center">
                <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
                <h4 className="font-semibold text-white text-sm">Demande transmise avec succès !</h4>
                <p className="text-xs text-slate-400">Le prestataire a été notifié par WhatsApp. Il vous contactera dans les plus brefs délais.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium block">Date souhaitée</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium block">Vos coordonnées (Tél, WhatsApp ou Email)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: +241 77 12 34 56 ou aline@gmail.com"
                    value={bookingContact}
                    onChange={(e) => setBookingContact(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium block">Détails de la prestation / Description de votre besoin</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Précisez votre adresse exacte au Gabon, les horaires ou toute contrainte pour ce service..."
                    value={bookingDetails}
                    onChange={(e) => setBookingDetails(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-emerald-500 placeholder-slate-600"
                  />
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-1">
                  <p className="text-slate-400">⚡ WhatsApp Direct :</p>
                  <a
                    href={`https://wa.me/${selectedService.whatsapp.replace(/\s+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-mono"
                  >
                    🚀 Discuter instantanément sur WhatsApp ({selectedService.whatsapp})
                  </a>
                </div>

                <div className="flex gap-2 pt-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition"
                  >
                    Confirmer la demande
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CART DRAWER / OFF-CANVAS OVERLAY */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 flex justify-end z-50 backdrop-blur-xs">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md p-6 h-full flex flex-col justify-between text-left relative">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
                <ShoppingBag className="w-5 h-5 text-emerald-400" /> Votre Panier
              </h3>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <ShoppingCart className="w-10 h-10 mx-auto text-slate-700" />
                  <p>Votre panier est vide.</p>
                  <p className="text-xs">Ajoutez des produits de la marketplace gabonaise pour commander.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.item.id} className="flex gap-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                      <img src={item.item.images[0]} alt={item.item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] text-emerald-400 block font-mono">Boutique : {item.item.boutiqueName}</span>
                        <h4 className="text-xs font-semibold text-white line-clamp-1">{item.item.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-white">{(item.item.price * item.quantity).toLocaleString()} FCFA</span>
                          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateCartQuantity(item.item.id, item.quantity - 1);
                                } else {
                                  onRemoveFromCart(item.item.id);
                                }
                              }}
                              className="text-xs text-slate-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="text-xs text-white font-mono">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateCartQuantity(item.item.id, item.quantity + 1)}
                              className="text-xs text-slate-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.item.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 self-start"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Summary math */}
                  <div className="p-3 bg-slate-950 border border-slate-855 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sous-total :</span>
                      <span className="font-mono text-white">{cartSubtotal.toLocaleString()} FCFA</span>
                    </div>
                    {/* Delivery input for simulation */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                      <label className="text-slate-400 block font-semibold text-[11px]">Calculateurs logistique de livraison au Gabon</label>
                      <select
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-200 text-xs focus:outline-none"
                      >
                        {GABON_CITIES.map((c) => (
                          <option key={c} value={c}>
                            🚚 Expédition vers : {c}
                          </option>
                        ))}
                      </select>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-400">Frais de livraison :</span>
                        <span className="font-mono text-sky-400">+{activeShippingFee.toLocaleString()} FCFA</span>
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-slate-800 pt-2 text-sm font-bold">
                      <span className="text-white">Total Final :</span>
                      <span className="font-mono text-emerald-400">{cartTotal.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={triggerCheckout} className="border-t border-slate-800/80 pt-4 space-y-3 pb-6">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Formulaire d'Achat Sécurisé
                    </h4>

                    {isCheckoutSubmitted ? (
                      <div className="p-4 bg-emerald-950/40 border border-emerald-500 text-emerald-400 text-xs rounded-xl text-center space-y-2">
                        <p className="font-bold">📱 Validation Mobile Money...</p>
                        <p>Veuillez valider la notification push reçue sur votre téléphone pour finaliser le débit de {cartTotal.toLocaleString()} FCFA.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Nom & Prénom du destinataire *"
                          value={checkoutName}
                          onChange={(e) => setCheckoutName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />
                        
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="tel"
                            required
                            placeholder="N° Mobile (Airtel...) *"
                            value={checkoutPhone}
                            onChange={(e) => setCheckoutPhone(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email *"
                            value={checkoutEmail}
                            onChange={(e) => setCheckoutEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <input
                          type="text"
                          required
                          placeholder="Adresse exacte de livraison (ex: Quartier, concession...) *"
                          value={checkoutAddress}
                          onChange={(e) => setCheckoutAddress(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                        />

                        {/* Payment Selection */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 font-medium">Moyen de paiement</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setCheckoutPayment('airtel_money')}
                              className={`py-1.5 px-2 border rounded font-mono text-[10px] flex items-center justify-center gap-1 transition ${
                                checkoutPayment === 'airtel_money'
                                  ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                              }`}
                            >
                              🔴 Airtel Money
                            </button>
                            <button
                              type="button"
                              onClick={() => setCheckoutPayment('moov_money')}
                              className={`py-1.5 px-2 border rounded font-mono text-[10px] flex items-center justify-center gap-1 transition ${
                                checkoutPayment === 'moov_money'
                                  ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                              }`}
                            >
                              🔵 Moov Money
                            </button>
                            <button
                              type="button"
                              onClick={() => setCheckoutPayment('visa_mastercard')}
                              className={`py-1.5 px-2 border rounded font-mono text-[10px] flex items-center justify-center gap-1 transition ${
                                checkoutPayment === 'visa_mastercard'
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                              }`}
                            >
                              💳 Visa/Mastercard
                            </button>
                            <button
                              type="button"
                              onClick={() => setCheckoutPayment('cash_on_delivery')}
                              className={`py-1.5 px-2 border rounded font-mono text-[10px] flex items-center justify-center gap-1 transition ${
                                checkoutPayment === 'cash_on_delivery'
                                  ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                                  : 'bg-slate-950 border-slate-800 text-slate-400'
                              }`}
                            >
                              💵 Cash Livraison
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-center rounded-xl transition block mt-4 cursor-pointer text-xs uppercase tracking-wider"
                        >
                          💸 Passer la commande ({cartTotal.toLocaleString()} FCFA)
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
