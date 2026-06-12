import React, { useState } from 'react';
import { Sparkles, BarChart2, MessageSquare, Box, Play, Check, Copy, RefreshCw } from 'lucide-react';
import { Product, SellerQA } from '../types';

interface StrongMarketAIProps {
  products: Product[];
  onAddMarketingLog?: (detail: string) => void;
}

export default function StrongMarketAI({ products, onAddMarketingLog }: StrongMarketAIProps) {
  // Sub-tabs switcher: 'recommend' | 'copywriter' | 'stock' | 'qa'
  const [activeAITab, setActiveAITab] = useState<'recommend' | 'copywriter' | 'stock' | 'qa'>('recommend');

  // Recommendation engine state
  const [recommendQuery, setRecommendQuery] = useState('');
  const [recommendedItems, setRecommendedItems] = useState<Product[]>([]);
  const [analysisText, setAnalysisText] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);

  // Copywriter generator states
  const [productTitle, setProductTitle] = useState('');
  const [productKeywords, setProductKeywords] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Custom interactive non-prompt states for Q&A
  const [editingQAId, setEditingQAId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [qaSuccessFeedbacks, setQaSuccessFeedbacks] = useState<Record<string, string>>({});

  // Q&A simulator state
  const [qaList, setQaList] = useState<SellerQA[]>([
    {
      id: 'qa-1',
      productName: 'Samsung Galaxy S24 Ultra',
      question: 'Bonjour, livrez-vous à Port-Gentil cette semaine ? Quel est le délai ?',
      askedBy: 'Gervais Obiang',
      date: '2026-06-12 08:30'
    },
    {
      id: 'qa-2',
      productName: 'Tubercules de Manioc de Lambaréné',
      question: 'Y a-t-il une réduction sur la commande de 50 kg pour un mariage ?',
      askedBy: 'Chantal Biyoghe',
      date: '2026-06-12 09:12'
    }
  ]);

  const runSmartRecommendations = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recommendQuery) return;
    setIsAILoading(true);
    setRecommendedItems([]);

    setTimeout(() => {
      // Very smart search matching
      const keywords = recommendQuery.toLowerCase().split(' ');
      const matched = products.filter((prod) => {
        return keywords.some((kw) =>
          prod.name.toLowerCase().includes(kw) ||
          prod.category.toLowerCase().includes(kw) ||
          prod.description.toLowerCase().includes(kw)
        );
      });

      // Default fallback if no match
      const finalItems = matched.length > 0 ? matched : products.slice(0, 3);
      setRecommendedItems(finalItems);
      setAnalysisText(
        `L’Assistant StrongMarket AI a analysé la demande : "${recommendQuery}". ` +
        `Il a filtré ${finalItems.length} articles disponibles et géolocalisés au Gabon répondant à ces besoins réels. ` +
        `Recommandation marketing : activez une campagne sponsorisée locale dans la région correspondante.`
      );
      setIsAILoading(false);
      
      if (onAddMarketingLog) {
        onAddMarketingLog(`Analyse IA pour la requête marketplace : "${recommendQuery}"`);
      }
    }, 1200);
  };

  const handleMarketingGenerator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productTitle) return;
    setIsAILoading(true);
    setGeneratedCopy('');

    setTimeout(() => {
      const gCopy = `🔥 NOVEAUTÉ EXCLUSIVEMENT SUR STRONGMARKET GABON ! 🔥\n\n` +
        `Découvrez "${productTitle}", l'article tendance déjà disponible au Gabon !\n\n` +
        `⭐️ Caractéristiques : ${productKeywords || 'Haute qualité, certifié par nos experts, production de choix.'}\n\n` +
        `🟢 Disponible en livraison express à domicile (Libreville, Port-Gentil, Franceville).\n` +
        `🔴 Payez en toute tranquillité via Airtel Money ou Moov Money lors de la réception !\n\n` +
        `👉 Cliquez sur le lien pour commander votre exemplaire dès aujourd'hui avant la rupture de stock !`;
      
      setGeneratedCopy(gCopy);
      setIsAILoading(false);
      
      if (onAddMarketingLog) {
        onAddMarketingLog(`Création de fiches par IA pour : "${productTitle}"`);
      }
    }, 1500);
  };

  const answerQAWithAI = (qaId: string, question: string) => {
    const aiAnswers: Record<string, string> = {
      'qa-1': `Bonjour Gervais, oui nous livrons absolument à Port-Gentil par transport routier/aérien sécurisé. Le délai d'expédition moyen est de 48 heures. Vous recevrez un SMS avec tracking dès validation de votre paiement Airtel Money. Merci !`,
      'qa-2': `Bonjour Chantal, pour des volumes de commande conséquents (50 kg et plus), nous proposons en effet un tarif préférentiel grossiste. Veuillez cliquer sur notre bouton WhatsApp direct afin que nous vous envoyions un devis pro formatté ajusté.`
    };

    setQaList((prev) =>
      prev.map((item) =>
        item.id === qaId ? { ...item, answer: aiAnswers[qaId] || 'Une réponse IA est en cours d\'attribution...' } : item
      )
    );
  };

  return (
    <div id="ai-view-container" className="space-y-6 text-left py-4 pb-12">
      
      {/* AI Header */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3B82F6]/5 rounded-full blur-2xl"></div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#3B82F6] text-white rounded-xl shadow-md">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              StrongMarket AI Studio <span className="text-[10px] bg-blue-50 border border-blue-200 text-[#3B82F6] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold">Version 1.5</span>
            </h2>
            <p className="text-slate-505 text-xs text-slate-500 font-medium">Outils d'intelligence artificielle pour la recommandation, la prévision des ventes et la rédaction publicitaire optimisée pour le Gabon.</p>
          </div>
        </div>
      </div>

      {/* Selector of AI Tools */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: 'recommend', title: '⭐ Recommandations', desc: 'Analyse d\'intentions d\'achats', icon: Sparkles },
          { key: 'copywriter', title: '✍️ Fiche & Publicité', desc: 'Copywriter Gabonais à fort impact', icon: BarChart2 },
          { key: 'stock', title: '📈 Stocks & Ventes AI', desc: 'Prévision de ventes', icon: Box },
          { key: 'qa', title: '💬 Auto Client Q&A', desc: 'Répondeur automatisé', icon: MessageSquare }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setActiveAITab(item.key as any)}
              className={`p-4 border rounded-2xl text-left transition duration-200 flex flex-col justify-between h-28 cursor-pointer ${
                activeAITab === item.key
                  ? 'bg-blue-55/60 border-[#3B82F6] text-[#3B82F6] shadow-sm'
                  : 'bg-white border-slate-200 text-slate-550 hover:border-slate-350 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <Icon className={`w-5 h-5 ${activeAITab === item.key ? 'text-[#3B82F6]' : 'text-slate-500'}`} />
                <span className="text-[9px] font-mono text-slate-400 font-bold">IA Actif</span>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[10px] leading-tight text-slate-400 font-medium line-clamp-1">{item.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* AI RECOMMENDATION ENGINE */}
      {activeAITab === 'recommend' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Moteur de recommandations et associations d'articles</h3>
            <p className="text-xs text-slate-505 font-medium leading-relaxed">Insérez une phrase décrivant ce qu'un client recherche. Notre IA étudie la sémantique et scanne le catalogue des vendeurs enregistrés afin de suggérer les meilleurs produits et services gabonais.</p>
          </div>

          <form onSubmit={runSmartRecommendations} className="space-y-4">
            <div className="flex gap-2">
              <input
                id="ai-recommend-input"
                type="text"
                required
                placeholder="Ex: Je cherche de la nourriture traditionnelle locale ou des téléphones pas cher"
                value={recommendQuery}
                onChange={(e) => setRecommendQuery(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={isAILoading}
                className="px-5 bg-[#3B82F6] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
              >
                {isAILoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />} Analyser
              </button>
            </div>
          </form>

          {isAILoading && (
            <div className="py-12 text-center text-xs text-slate-400 font-mono space-y-2">
              <div className="w-8 h-8 rounded-full border-t border-[#3B82F6] animate-spin mx-auto"></div>
              <span>StrongMarket AI s'exécute, veuillez patienter...</span>
            </div>
          )}

          {!isAILoading && recommendedItems.length > 0 && (
            <div className="space-y-4 animate-fade-in pt-4 border-t border-slate-100">
              
              {/* Analysis output alert banner */}
              {analysisText && (
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-700 leading-relaxed font-semibold">
                  ⚡ <strong className="text-[#3B82F6] font-extrabold">Analyse IA :</strong> {analysisText}
                </div>
              )}

              <span className="text-[10px] text-slate-400 font-bold block">PRODUITS RECOMMANDÉS À LA SUITE DE L'ANALYSE :</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedItems.map((item) => (
                  <div key={item.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 text-xs">
                    <img src={item.images[0]} alt={item.name} className="w-full h-24 object-cover rounded-xl" />
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[#3A7E3E] font-bold font-sans">{item.price.toLocaleString()} FCFA</p>
                      <span className="text-[9px] text-slate-400 font-bold block">Vendeur : {item.boutiqueName} ({item.city})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI COPYWRITING ASSISTANT */}
      {activeAITab === 'copywriter' && (
        <div className="bg-white border border-slate-205 rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Rédacteur de Fiches Produits & Réseaux Sociaux</h3>
            <p className="text-xs text-slate-505 font-medium leading-relaxed">Saisissez le nom d'un produit ou d'un service. StrongMarket AI rédigera un texte promotionnel captivant, intégrant les arguments locaux gabonais (Airtel, Moov, livraison, sécurité) pour Whatsapp, Facebook et newsletters.</p>
          </div>

          <form onSubmit={handleMarketingGenerator} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-bold block">Intitulé du produit ou service *</label>
              <input
                type="text"
                required
                placeholder="Ex: Tubercules de Manioc préparés à la vapeur"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-bold block">Mots clés ou caractéristiques (optionnel)</label>
              <input
                type="text"
                placeholder="Ex: Bio, frais, récolté à Lambaréné, sac de 10kg"
                value={productKeywords}
                onChange={(e) => setProductKeywords(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isAILoading}
                className="w-full py-3 bg-[#3B82F6] hover:bg-blue-600 text-white font-black rounded-xl transition text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAILoading ? 'Génération en cours...' : '🪄 Générer mon contenu optimisé'}
              </button>
            </div>
          </form>

          {isAILoading && (
            <div className="py-6 text-center text-xs text-slate-400 font-mono">
              La plume numérique de StrongMarket s'active...
            </div>
          )}

          {generatedCopy && !isAILoading && (
            <div className="bg-slate-50 p-5 border border-slate-150 rounded-2xl space-y-3 relative">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">CONTENU PUBLICITAIRE GABONAIS CRÉÉ :</span>
              <pre className="text-xs text-slate-700 font-sans whitespace-pre-wrap leading-relaxed font-medium">
                {generatedCopy}
              </pre>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedCopy);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="absolute top-4 right-4 p-2 bg-white hover:bg-slate-100 text-[#3B82F6] border border-slate-200 rounded-xl flex items-center gap-1.5 text-[10px] font-bold transition shadow-sm cursor-pointer"
              >
                {copiedLink ? <Check className="w-3" /> : <Copy className="w-3" />}
                {copiedLink ? 'Copié !' : 'Copier text'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* AI STOCkS FORECAST & INSIGHTS ALERT */}
      {activeAITab === 'stock' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              🔮 Prévisions Prédictives des Stocks (Intelligence Logistique)
            </h3>
            
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              En analysant l'historique des requêtes Gabonaises et les vitesses de commandes quotidiennes (velocity tracker), l'assistant StrongMarket AI estime les dates de ruptures théoriques de vos produits pour sécuriser vos chaînes de logistiques nationales.
            </p>

            <div className="space-y-3 pt-2">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-rose-700">🚨 HP EliteBook 840 (Libreville)</span>
                  <span className="text-[10px] bg-rose-50 text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full font-bold">Rupture sous 12 jours</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded overflow-hidden">
                  <div className="bg-rose-500 h-full w-[25%] rounded"></div>
                </div>
                <p className="text-[10px] text-slate-450 italic font-semibold">Conseil IA : Nous détectons une intensification des recherches informatiques à Libreville et Owendo (+34% de requêtes). Commandez un réassort rapidement.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-105 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-700 font-sans">📦 Tubercules de Manioc (Lambaréné)</span>
                  <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 px-2 py-0.5 rounded-full font-bold">Rupture sous 18 jours</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded overflow-hidden">
                  <div className="bg-amber-500 h-full w-[45%] rounded"></div>
                </div>
                <p className="text-[10px] text-slate-450 italic font-semibold">Conseil IA : Forte demande des restaurants d'Akanda le week-end. Augmentez la cadence de préparation des tournées pour sécuriser vos marges.</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#3A7E3E]">📦 Statue Bois d'Ébène Art (Franceville)</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full font-bold">Sécurisé</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded overflow-hidden">
                  <div className="bg-[#3A7E3E] h-full w-[90%] rounded"></div>
                </div>
                <p className="text-[10px] text-slate-450 italic font-semibold">Conseil IA : Produit unique, rotation lente. Niveau de stock de 2 pièces suffisant pour répondre à l'estimation de vente de ce semestre.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI AUTO CLIENT Q&A SELECT */}
      {activeAITab === 'qa' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Boîte de Réponse Rapide des Clients par l'IA</h3>
            <p className="text-xs text-slate-505 font-medium leading-relaxed">Assistance vendeur : Répondez en une seconde aux questions récurrentes posées par vos acheteurs sur vos fiches produits grâce à nos modèles calibrés.</p>
          </div>

          <div className="divide-y divide-slate-100">
            {qaList.map((qa) => (
              <div key={qa.id} className="py-4 space-y-3 text-xs">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 italic block font-sans font-bold">Sur l'article : <strong>{qa.productName}</strong></span>
                    <p className="text-slate-800 font-bold pl-2 border-l-2 border-[#3B82F6] mt-1 text-xs">"{qa.question}"</p>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-1">Posée par {qa.askedBy} • {qa.date}</span>
                  </div>
                  
                  {!qa.answer && (
                    <button
                      onClick={() => answerQAWithAI(qa.id, qa.question)}
                      className="px-3.5 py-1.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-extrabold rounded-xl text-[10px] whitespace-nowrap transition cursor-pointer shadow-xs"
                    >
                      🪄 Suggérer réponse IA
                    </button>
                  )}
                </div>

                {qa.answer && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <span className="text-[10px] text-[#3B82F6] font-extrabold block uppercase tracking-wider">Réponse générée par IA :</span>
                    
                    {editingQAId === qa.id ? (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="w-full bg-white border border-slate-205 p-3 rounded-xl text-xs text-slate-800 font-sans focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6]"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setQaList((prev) =>
                                prev.map((it) => (it.id === qa.id ? { ...it, answer: editingValue } : it))
                              );
                              setEditingQAId(null);
                            }}
                            className="bg-[#3A7E3E] hover:bg-emerald-700 text-white px-3 py-1 rounded-xl text-[10px] font-bold cursor-pointer"
                          >
                            Sauvegarder
                          </button>
                          <button
                            onClick={() => setEditingQAId(null)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1 rounded-xl text-[10px] font-bold cursor-pointer"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-slate-700 leading-relaxed italic font-medium">"{qa.answer}"</p>
                        
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            onClick={() => {
                              setQaSuccessFeedbacks((prev) => ({
                                ...prev,
                                [qa.id]: `✓ Transmise avec succès au client ${qa.askedBy} !`
                              }));
                            }}
                            className="text-[10px] bg-[#3A7E3E] hover:bg-emerald-700 text-white px-3 py-1 rounded-xl font-bold transition cursor-pointer"
                          >
                            ✓ Valider & Envoyer
                          </button>
                          
                          <button
                            onClick={() => {
                              setEditingQAId(qa.id);
                              setEditingValue(qa.answer || '');
                            }}
                            className="text-[10px] bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-3 py-1 rounded-xl font-bold transition cursor-pointer"
                          >
                            Modifier réponse
                          </button>

                          {qaSuccessFeedbacks[qa.id] && (
                            <span className="text-[10px] text-emerald-600 font-extrabold animate-pulse">
                              {qaSuccessFeedbacks[qa.id]}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
