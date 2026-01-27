
export interface StrainRecommendation {
  name: string;
  type: 'Sativa' | 'Indica' | 'Hybrid';
  thc: string;
  effects: string[];
  description: string;
  mood: string;
}

export interface UserPreferences {
  mood: string;
  energy: number; // 1-10
  goal: string;
  flavor: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  color: string;
  image: string;
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
