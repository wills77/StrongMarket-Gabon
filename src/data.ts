import { Boutique, Product, Service, DeliveryBoy, Order, Coupon, AuditLog } from './types';

export const GABON_CITIES = [
  'Libreville',
  'Owendo',
  'Akanda',
  'Port-Gentil',
  'Franceville',
  'Oyem',
  'Mouila',
  'Lambaréné',
  'Makokou',
  'Tchibanga'
];

export const CATEGORIES_PRODUCTS = [
  'Électronique',
  'Téléphones',
  'Informatique',
  'Mode Homme',
  'Mode Femme',
  'Beauté',
  'Santé',
  'Maison',
  'Mobilier',
  'Électroménager',
  'Automobile',
  'Pièces détachées',
  'Construction',
  'Alimentation',
  'Produits locaux',
  'Artisanat gabonais',
  'Restaurants'
];

export const CATEGORIES_SERVICES = [
  'Transport & Logistique',
  'Développement Web',
  'Design Graphique',
  'Réparation & Dépannage',
  'Construction & BTP',
  'Événementiel & Traiteur',
  'Formation & Soutien',
  'Consultation Professionnelle',
  'Tourisme',
  'Immobilier'
];

export const INITIAL_BOUTIQUES: Boutique[] = [
  {
    id: 'btq-1',
    name: 'OkouméTech Store',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=1200&h=400&fit=crop&q=80',
    description: 'La référence high-tech à Libreville. Ordinateurs, smartphones, tablettes et accessoires de marque au meilleur prix du marché gabonais.',
    address: 'Avenue de Cointet, Centre-ville',
    city: 'Libreville',
    phone: '+241 77 12 34 56',
    whatsapp: '+241 77 12 34 56',
    instagram: 'okoumetech_ga',
    facebook: 'OkoumeTech Gabon',
    ownerEmail: 'vendeur.tech@strongmarket.ga',
    rating: 4.8,
    followers: 1240,
    createdAt: '2025-01-10',
    verified: true
  },
  {
    id: 'btq-2',
    name: "Saveurs de l'Ogooué",
    logo: 'https://images.unsplash.com/photo-1610397613000-f0f2cf5d653f?w=150&h=150&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop&q=80',
    description: 'Spécialités agricoles et transformées gabonaises. Manioc de Lambaréné, piment de Mouila, miel d’Okondja et gâteaux de manioc maison.',
    address: 'Près du grand marché',
    city: 'Lambaréné',
    phone: '+241 65 98 76 54',
    whatsapp: '+241 65 98 76 54',
    ownerEmail: 'odo.marie@gmail.com',
    rating: 4.9,
    followers: 843,
    createdAt: '2025-02-15',
    verified: true
  },
  {
    id: 'btq-3',
    name: "L'Atelier Gabonais",
    logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&h=400&fit=crop&q=80',
    description: 'Créations de mode contemporaine et artisanat de luxe. Vêtements en pagne, raphia traditionnel revisité et bijoux bois sacrés précieux.',
    address: 'Quartier Potos',
    city: 'Franceville',
    phone: '+241 62 44 55 66',
    whatsapp: '+241 62 44 55 66',
    instagram: 'atelier_gabonais_design',
    facebook: 'Atelier Gabonais Design',
    ownerEmail: 'elyse.mby@gmail.com',
    rating: 4.7,
    followers: 2150,
    createdAt: '2024-11-20',
    verified: true
  },
  {
    id: 'btq-4',
    name: 'Akanda Express Gourmand',
    logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=1200&h=400&fit=crop&q=80',
    description: 'Le meilleur de la gastronomie gabonaise livrée chaude chez vous : Poulet Nyembwe, Coupé-Coupé, poisson braisé et bananes frites.',
    address: 'Zone résidentielle Angondjé',
    city: 'Akanda',
    phone: '+241 74 11 22 33',
    whatsapp: '+241 74 11 22 33',
    ownerEmail: 'akandagourmand@gmail.com',
    rating: 4.6,
    followers: 1620,
    createdAt: '2025-03-01',
    verified: false
  },
  {
    id: 'btq-5',
    name: 'Gabon Pro Services',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=150&h=150&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop&q=80',
    description: 'Prestataire de services professionnels au Gabon. BTP, dépannage informatique, électricité résidentielle, climatisation et design web.',
    address: 'Boulevard de Nice, Port-Gentil',
    city: 'Port-Gentil',
    phone: '+241 76 88 99 00',
    whatsapp: '+241 76 88 99 00',
    ownerEmail: 'contact@gabonpro.ga',
    rating: 4.5,
    followers: 532,
    createdAt: '2025-04-18',
    verified: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    description: 'Le tout dernier smartphone haut de gamme avec IA Galaxy. Écran Dynamic AMOLED 2X, appareil photo 200 Mpx, stylet S Pen intégré et autonomie de 2 jours.',
    price: 649000,
    compareAtPrice: 720000,
    category: 'Téléphones',
    boutiqueId: 'btq-1',
    boutiqueName: 'OkouméTech Store',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=500&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=500&fit=crop&q=80'
    ],
    stock: 12,
    salesCount: 34,
    rating: 4.9,
    reviewsCount: 18,
    city: 'Libreville',
    isAvailable: true,
    deliveryFee: 2500,
    tags: ['Promo', 'Premium', 'Galaxy AI']
  },
  {
    id: 'prod-2',
    name: 'Tubercules de Manioc de Lambaréné',
    description: 'Le véritable manioc de Lambaréné, réputé pour sa texture ferme et sa saveur inimitable. Récolté de façon artisanale. Idéal pour accompage du poisson ou poulet Nyembwe.',
    price: 3500,
    category: 'Alimentation',
    boutiqueId: 'btq-2',
    boutiqueName: "Saveurs de l'Ogooué",
    images: [
      'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&h=500&fit=crop&q=80'
    ],
    stock: 150,
    salesCount: 412,
    rating: 4.9,
    reviewsCount: 78,
    city: 'Lambaréné',
    isAvailable: true,
    deliveryFee: 1500,
    tags: ['Produit Gabonais', 'Frais', 'Traditionnel']
  },
  {
    id: 'prod-3',
    name: 'Statue Sculptée en Bois d’Ébène Majeur',
    description: "Une œuvre d'art gabonaise d'exception sculptée entièrement à la main par un maître artisan à Franceville. Symbolise la sagesse et la protection de l'Okoumé.",
    price: 120000,
    compareAtPrice: 150000,
    category: 'Artisanat gabonais',
    boutiqueId: 'btq-3',
    boutiqueName: "L'Atelier Gabonais",
    images: [
      'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=600&h=500&fit=crop&q=80'
    ],
    stock: 2,
    salesCount: 5,
    rating: 4.8,
    reviewsCount: 7,
    city: 'Franceville',
    isAvailable: true,
    deliveryFee: 4000,
    tags: ['Artisanat d’Art', 'Pièce Unique', 'Bois d’Ébène']
  },
  {
    id: 'prod-4',
    name: 'Chips de Banane Plantain Sel - Carton de 24 x 100g',
    description: 'Sachets de chips de plantain fabriqués à Lambaréné. Croustillants et dorés, parfaits pour l’apéritif ou les collations scolaires au Gabon.',
    price: 10000,
    category: 'Produits locaux',
    boutiqueId: 'btq-2',
    boutiqueName: "Saveurs de l'Ogooué",
    images: [
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=500&fit=crop&q=80'
    ],
    stock: 45,
    salesCount: 120,
    rating: 4.7,
    reviewsCount: 14,
    city: 'Lambaréné',
    isAvailable: true,
    deliveryFee: 2000,
    tags: ['Made in Gabon', 'Apéro']
  },
  {
    id: 'prod-5',
    name: 'HP EliteBook 840 G10 Intel i7',
    description: 'PC portable professionnel ultra-puissant. Processeur Intel Core i7 de 13e génération, 16 Go de RAM DDR5 et SSD de 512 Go. Clavier rétroéclairé résistant aux éclaboussures.',
    price: 525000,
    compareAtPrice: 580000,
    category: 'Informatique',
    boutiqueId: 'btq-1',
    boutiqueName: 'OkouméTech Store',
    images: [
      'https://images.unsplash.com/photo-1496181130204-755241524eab?w=600&h=500&fit=crop&q=80'
    ],
    stock: 8,
    salesCount: 19,
    rating: 4.8,
    reviewsCount: 11,
    city: 'Libreville',
    isAvailable: true,
    deliveryFee: 5000,
    tags: ['Productivité', 'Garantie 1 An']
  },
  {
    id: 'prod-6',
    name: 'Robe Cintrée en Tissu Gabonais Revisité',
    description: 'Splendide robe confectionnée sur mesure alliant modernité et motifs traditionnels colorés. Une création chic idéale pour les grands événements.',
    price: 45000,
    category: 'Mode Femme',
    boutiqueId: 'btq-3',
    boutiqueName: "L'Atelier Gabonais",
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=500&fit=crop&q=80'
    ],
    stock: 5,
    salesCount: 22,
    rating: 4.9,
    reviewsCount: 16,
    city: 'Franceville',
    isAvailable: true,
    deliveryFee: 3000,
    tags: ['Mode', 'Fait main']
  },
  {
    id: 'prod-7',
    name: 'Plat Poulet à la Sauce Nyembwe Traditionnel',
    description: 'Une portion généreuse de poulet fermier mijoté dans sa sauce de noix de palme mûres moulues, servie avec de la banane plantain bouillie ou de la purée de manioc.',
    price: 6500,
    category: 'Restaurants',
    boutiqueId: 'btq-4',
    boutiqueName: 'Akanda Express Gourmand',
    images: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=500&fit=crop&q=80'
    ],
    stock: 30,
    salesCount: 388,
    rating: 4.6,
    reviewsCount: 94,
    city: 'Akanda',
    isAvailable: true,
    deliveryFee: 1500,
    tags: ['Chaud', 'Plat National']
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: 'Course & Livraison Express Libreville-Owendo',
    description: 'Notre équipe de coursiers s’occupe du transport sécurisé de vos plis, colis, marchandises ou repas n’importe où dans le Grand Libreville avec rapport WhatsApp.',
    price: 5000,
    category: 'Transport & Logistique',
    boutiqueId: 'btq-5',
    boutiqueName: 'Gabon Pro Services',
    city: 'Libreville',
    phone: '+241 76 88 99 00',
    whatsapp: '+241 76 88 99 00',
    duration: '1 à 3 heures',
    isOnline: false
  },
  {
    id: 'srv-2',
    name: 'Installation & Entretien de Climatiseur split',
    description: 'Installation professionnelle de vos climatiseurs, recharges en gaz R410/R22 et nettoyage complet pour maximiser le flux d’air froid pendant les périodes de canicule.',
    price: 35000,
    category: 'Réparation & Dépannage',
    boutiqueId: 'btq-5',
    boutiqueName: 'Gabon Pro Services',
    city: 'Port-Gentil',
    phone: '+241 76 88 99 00',
    whatsapp: '+241 76 88 99 00',
    duration: '2 à 4 heures',
    isOnline: false
  },
  {
    id: 'srv-3',
    name: 'Création de Boutique E-commerce Professionnelle',
    description: 'Création d’un site de vente en ligne clé en main avec module de paiement Mobile Money local (Airtel-Moov) intégré et interface de gestion claire et fonctionnelle.',
    price: 250000,
    category: 'Développement Web',
    boutiqueId: 'btq-5',
    boutiqueName: 'Gabon Pro Services',
    city: 'Port-Gentil',
    phone: '+241 76 88 99 00',
    whatsapp: '+241 76 88 99 00',
    duration: '7 à 14 jours',
    isOnline: true
  }
];

export const INITIAL_DELIVERY_BOYS: DeliveryBoy[] = [
  {
    id: 'dlv-1',
    name: 'Jean-Marc Mba',
    phone: '+241 62 11 11 11',
    vehicle: 'moto',
    city: 'Libreville',
    status: 'active',
    ratings: 4.8
  },
  {
    id: 'dlv-2',
    name: 'Brice Obiang',
    phone: '+241 74 22 22 22',
    vehicle: 'moto',
    city: 'Akanda',
    status: 'active',
    ratings: 4.9
  },
  {
    id: 'dlv-3',
    name: 'Kevin Ndong',
    phone: '+241 65 33 33 33',
    vehicle: 'pick-up',
    city: 'Owendo',
    status: 'active',
    ratings: 4.6
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'SMX-4821',
    customerName: 'Aline Boussamba',
    customerPhone: '+241 77 89 45 12',
    customerEmail: 'aline.bous@gmail.com',
    customerWhatsApp: '+241 77 89 45 12',
    city: 'Libreville',
    address: 'Quartier Louis, Rue des Palmiers',
    items: [
      {
        id: 'prod-1',
        type: 'product',
        name: 'Samsung Galaxy S24 Ultra 512GB',
        price: 649000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=150&h=150&fit=crop&q=80',
        boutiqueId: 'btq-1',
        boutiqueName: 'OkouméTech Store'
      }
    ],
    totalAmount: 651500,
    paymentMethod: 'airtel_money',
    paymentStatus: 'success',
    status: 'validated',
    trackingNumber: 'SMG-99482110',
    date: '2026-06-11T14:30:00.000Z',
    deliveryStatus: 'assigned',
    deliveryBoy: 'Jean-Marc Mba',
    shippingFee: 2500
  },
  {
    id: 'SMX-1209',
    customerName: 'Marc-Aurèle Ngouoni',
    customerPhone: '+241 66 31 15 24',
    customerEmail: 'mngouoni@outlook.com',
    city: 'Lambaréné',
    address: 'Quartier Isaac, non loin du fleuve',
    items: [
      {
        id: 'prod-2',
        type: 'product',
        name: 'Tubercules de Manioc de Lambaréné',
        price: 3500,
        quantity: 5,
        image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=150&h=150&fit=crop&q=80',
        boutiqueId: 'btq-2',
        boutiqueName: "Saveurs de l'Ogooué"
      },
      {
        id: 'prod-4',
        type: 'product',
        name: 'Chips de Banane Plantain Sel - Carton de 24 x 100g',
        price: 10000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150&h=150&fit=crop&q=80',
        boutiqueId: 'btq-2',
        boutiqueName: "Saveurs de l'Ogooué"
      }
    ],
    totalAmount: 29000,
    paymentMethod: 'moov_money',
    paymentStatus: 'success',
    status: 'shipped',
    trackingNumber: 'SMG-55120911',
    date: '2026-06-12T08:15:00.000Z',
    deliveryStatus: 'transit',
    deliveryBoy: 'Jean-Marc Mba',
    shippingFee: 1500
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'GABON2026', discountType: 'percentage', discountValue: 10, minSpend: 15000, active: true },
  { code: 'AIRTELMONEY', discountType: 'fixed', discountValue: 2000, minSpend: 10000, active: true },
  { code: 'BIENVENUE', discountType: 'percentage', discountValue: 5, active: true }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-06-12 09:02:11',
    user: 'sys_admin',
    action: 'APPROBATION_BOUTIQUE',
    details: "Approbation de la boutique 'L’Atelier Gabonais' de Franceville et octroi du badge de vérification.",
    ipAddress: '197.214.3.45'
  },
  {
    id: 'log-2',
    timestamp: '2026-06-12 08:34:00',
    user: 'vendeur_okoume',
    action: 'MISE_A_JOUR_STOCK',
    details: 'Mise à jour du stock de HP EliteBook 840. Ancienne valeur: 10, Nouvelle: 8.',
    ipAddress: '197.214.12.102'
  }
];
