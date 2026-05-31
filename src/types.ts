export interface Product {
  id: number | string;
  name: string;
  category: string;
  subCategory?: string;
  size?: 'king' | 'queen' | 'single' | 'double' | string;
  material?: 'solid-wood' | 'engineered-wood' | 'teak' | 'mango-wood' | 'sheesham' | string;
  storage?: 'hydraulic' | 'box' | 'drawer' | 'no-storage' | string;
  price: number; // 0 means Custom Quote
  orig?: number;
  img: string;
  badge?: 'bs' | 'new' | 'cus' | null;
  colors?: string[];
  description?: string;
  shortDesc?: string;
}

export type ViewState = 
  | 'home'
  | 'beds'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'payments'
  | 'wishlist'
  | 'showroom'
  | 'about'
  | 'contact'
  | 'login';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  finish: string;
  storage: string;
}

export interface ShowroomWalkthrough {
  name: string;
  phone: string;
  location: string;
  date: string;
  category: string;
  notes: string;
}
