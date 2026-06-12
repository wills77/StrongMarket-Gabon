import React from 'react';
import { ShoppingBag, Store, TrendingUp, Users, Truck, ShieldCheck, Gamepad2, ArrowRight } from 'lucide-react';
import { Product, Boutique } from '../types';

interface HomeViewProps {
  onNavigate: (tab: 'accueil' | 'marketplace' | 'boutiques' | 'seller-dashboard' | 'admin-dashboard' | 'marketing-loyalty' | 'security') => void;
  products: Product[];
  boutiques: Boutique[];
  onOpenCreateBoutiqueModal: () => void;
}

export default function HomeView({ onNavigate, products, boutiques, onOpenCreateBoutiqueModal }: HomeViewProps) {
  // Simple summary stats
  const totalBoutiques = boutiques.length;
  const totalProducts = products.length;
  const citiesServedCount = new Set(products.map(p => p.city)).size;

  return (
    <div id="home-view-container" className="space-y-16 py-6 pb-20">
      {/* Hero Section */}
      <section id="hero-section" className="relative overflow-hidden rounded-[2.5rem] bg-white border border-slate-200 p-8 md:p-16 shadow-xl shadow-slate-200/40">
        {/* Subtle decorative flag color accents in background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-yellow-400 to-sky-500"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl -z-10"></div>
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3  py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold text-blue-600">
              <span className="flex h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
              Lancement Officiel – 100% Gabonais
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-slate-900 leading-tight">
              La Marketplace <br/>
              <span className="text-[#3B82F6]">
                du Gabon
              </span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed max-w-xl font-sans">
              Créez votre boutique en ligne en 2 minutes, vendez vos produits et services partout au Gabon avec livraison intégrée et paiement Airtel & Moov Money sécurisés.
            </p>
 
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="btn-hero-create-store"
                onClick={onOpenCreateBoutiqueModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/10 transition duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Store className="w-5 h-5 text-white" />
                Créer ma boutique
              </button>
              <button
                id="btn-hero-explore"
                onClick={() => onNavigate('marketplace')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl border border-slate-200 transition duration-200 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-slate-600" />
                Découvrir les produits
              </button>
            </div>
 
            {/* Quick trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-slate-500 border-t border-slate-200">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#3A7E3E]" />
                Paiements Airtel & Moov sécurisés
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Truck className="w-4 h-4 text-blue-500" />
                Livraison à Libreville, Port-Gentil, Franceville...
              </div>
            </div>
          </div>
 
          {/* Elegant Illustration / Floating Product Card Simulation */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative mx-auto max-w-[340px] md:max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50">
              <div className="absolute -top-3 -right-3 bg-yellow-100 text-yellow-800 border-2 border-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Populaire au Gabon
              </div>
              
              <img
                src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80"
                alt="Smartphone haut de gamme"
                className="w-full h-48 object-cover rounded-2xl mb-4 border border-slate-100"
              />
 
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                    Téléphonie / Électronique
                  </span>
                  <div className="flex items-center text-amber-500 text-xs font-semibold">
                    ★ 4.9 (34 avis)
                  </div>
                </div>
 
                <h3 className="text-base font-bold text-slate-950 tracking-tight text-left">
                  Samsung Galaxy S24 Ultra 512GB
                </h3>
                
                <div className="flex items-baseline justify-between border-t border-slate-100 pt-3">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Prix local</span>
                    <span className="text-lg font-bold text-slate-900 font-sans">649 000 FCFA</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('marketplace')} 
                    className="p-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-xl transition shadow-md shadow-blue-500/10 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
 
            {/* Overlap badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 flex items-center gap-3 max-w-[200px]">
              <div className="p-2.5 bg-blue-50 rounded-xl text-[#3B82F6]">
                <Store className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Total Vendeurs</div>
                <div className="text-sm font-bold text-slate-900">{totalBoutiques} Boutiques</div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Dynamic Statistics Block */}
      <section id="statistics-section" className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 text-center md:text-left transition hover:border-slate-300 shadow-sm">
          <div className="p-3 bg-blue-50 text-[#3B82F6] rounded-2xl inline-block">
            <Store className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Boutiques Gabonaises</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{totalBoutiques}</p>
          <span className="text-[11px] text-emerald-600 flex items-center justify-center md:justify-start gap-1 font-bold">
            <TrendingUp className="w-3 h-3" /> +15% ce mois
          </span>
        </div>
 
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 text-center md:text-left transition hover:border-slate-300 shadow-sm">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl inline-block">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Produits & Services</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{totalProducts + 3}</p>
          <span className="text-[11px] text-emerald-600 flex items-center justify-center md:justify-start gap-1 font-bold">
            <TrendingUp className="w-3 h-3" /> Mis à jour en continu
          </span>
        </div>
 
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 text-center md:text-left transition hover:border-slate-300 shadow-sm">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl inline-block">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Clients Actifs</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">4,810</p>
          <span className="text-[11px] text-emerald-600 flex items-center justify-center md:justify-start gap-1 font-bold">
            <TrendingUp className="w-3 h-3" /> +142 cette semaine
          </span>
        </div>
 
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-2 text-center md:text-left transition hover:border-slate-300 shadow-sm">
          <div className="p-3 bg-emerald-50 text-[#3A7E3E] rounded-2xl inline-block">
            <Truck className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Villes Couvertes</p>
          <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{citiesServedCount}</p>
          <span className="text-[11px] text-emerald-600 flex items-center justify-center md:justify-start gap-1 font-bold">
            Livraison 100% Nationale
          </span>
        </div>
      </section>
 
      {/* Flagship Features Grid inspired by Shopify/Jumia */}
      <section id="features-section" className="space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 tracking-tight">Pourquoi choisir StrongMarket ?</h2>
          <p className="text-slate-500 text-sm">Une plateforme souveraine pensée pour dynamiser le commerce et l'entrepreneuriat national gabonais.</p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] space-y-4 hover:border-blue-300 transition duration-200 text-left shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#3B82F6]">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Boutique Clé en main</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ajoutez vos produits ou services, définissez vos prix, configurez vos réseaux sociaux et vendez instantanément. Aucune compétence technique requise.
            </p>
          </div>
 
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] space-y-4 hover:border-blue-300 transition duration-200 text-left shadow-sm">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Intelligence Artificielle</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Profitez d’analyses de stocks automatiques, de prévisions financières de pointe et de suggestions de fiches produits optimisées par notre module <strong className="text-[#3B82F6] font-bold">StrongMarket AI</strong>.
            </p>
          </div>
 
          <div className="p-8 bg-white border border-slate-200 rounded-[2rem] space-y-4 hover:border-blue-300 transition duration-200 text-left shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#3A7E3E]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Logistique Intégrée au Gabon</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Que vous soyez à Libreville, Port-Gentil ou Franceville, les frais de port sont calculés automatiquement. Notre réseau de livreurs partenaires livre vos clients à domicile.
            </p>
          </div>
        </div>
      </section>
 
      {/* Featured Shops Spotlight */}
      <section id="featured-shops-spotlight" className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="text-left space-y-1">
            <h2 className="text-xl md:text-2xl font-display font-black text-slate-900">Boutiques à la Une</h2>
            <p className="text-slate-500 text-xs">Soutenez les commerçants, artisans et PME talentueux du Gabon.</p>
          </div>
          <button 
            onClick={() => onNavigate('marketplace')}
            className="text-xs font-bold text-[#3B82F6] hover:text-blue-600 flex items-center gap-1 transition"
          >
            Voir tout le catalogue →
          </button>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boutiques.slice(0, 4).map((btq) => (
            <div 
              key={btq.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-300 transition flex flex-col h-full shadow-sm"
            >
              <div className="h-24 overflow-hidden relative border-b border-slate-100">
                <img src={btq.banner} alt={btq.name} className="w-full h-full object-cover grayscale-20 hover:grayscale-0 transition" />
                {btq.verified && (
                  <span className="absolute top-2 right-2 bg-[#3A7E3E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    Vérifié✓
                  </span>
                )}
              </div>
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="flex items-start gap-3">
                  <img src={btq.logo} alt={btq.name} className="w-10 h-10 object-cover rounded-full border border-slate-200 bg-slate-50" />
                  <div className="text-left">
                    <h4 className="font-bold text-slate-900 line-clamp-1">{btq.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      📍 {btq.city}
                    </span>
                  </div>
                </div>
                <p className="text-slate-500 text-xs line-clamp-2 text-left leading-relaxed">{btq.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-bold">
                  <span>✨ {btq.followers} abonnés</span>
                  <span className="text-amber-500 font-semibold">★ {btq.rating}</span>
                </div>
                <button
                  onClick={() => {
                    onNavigate('marketplace');
                  }}
                  className="w-full mt-2 py-2 bg-slate-50 hover:bg-[#3B82F6] hover:text-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 hover:border-transparent transition"
                >
                  Visiter la boutique
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
 
      {/* Gabon Flag graphic banner */}
      <section id="gabon-banner" className="bg-blue-50 border border-blue-100 p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-2">
          <h3 className="text-lg font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
            🌳 Fier de produire pour le pays
          </h3>
          <p className="text-slate-600 text-sm max-w-xl font-medium">
            StrongMarket met en avant les artisans locaux et les produits agricoles directement issus de nos régions (Manioc de Lambaréné, Ébène de l'Est, Chocolat gabonais).
          </p>
        </div>
        <button
          onClick={() => onNavigate('marketplace')}
          className="px-6 py-3 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold rounded-xl text-xs tracking-wider uppercase transition cursor-pointer shadow-lg shadow-blue-500/10"
        >
          Soutenir la production locale
        </button>
      </section>
    </div>
  );
}
