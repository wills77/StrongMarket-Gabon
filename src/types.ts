export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in FCFA
  compareAtPrice?: number;
  category: string;
  boutiqueId: string;
  boutiqueName: string;
  images: string[];
  stock: number;
  salesCount: number;
  rating: number;
  reviewsCount: number;
  city: string;
  isAvailable: boolean;
  deliveryFee: number;
  tags: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number; // in FCFA
  category: string;
  boutiqueId: string;
  boutiqueName: string;
  city: string;
  phone: string;
  whatsapp: string;
  duration: string;
  isOnline: boolean;
}

export interface Boutique {
  id: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  ownerEmail: string;
  rating: number;
  followers: number;
  createdAt: string;
  verified: boolean;
}

export interface OrderItem {
  id: string;
  type: 'product' | 'service';
  name: string;
  price: number;
  quantity: number;
  image?: string;
  boutiqueId: string;
  boutiqueName: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerWhatsApp?: string;
  city: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'airtel_money' | 'moov_money' | 'visa_mastercard' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'success' | 'failed';
  status: 'pending' | 'validated' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber: string;
  date: string;
  deliveryStatus: 'not_assigned' | 'assigned' | 'transit' | 'delivered';
  deliveryBoy?: string;
  shippingFee: number;
}

export interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  vehicle: 'moto' | 'voiture' | 'pick-up';
  city: string;
  status: 'active' | 'busy' | 'offline';
  ratings: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  active: boolean;
}

export interface SellerQA {
  id: string;
  productName: string;
  question: string;
  answer?: string;
  askedBy: string;
  date: string;
}
