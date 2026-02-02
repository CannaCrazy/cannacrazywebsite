
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
  // price: number; // Removed as per request
  color: string;
  image: string;
  category?: 'flower' | 'preroll' | 'edible' | 'cbd' | 'merch';
  grade?: 'Greenhouse' | 'A' | 'AA' | 'AAA' | 'Top Shelf';
  growType?: 'Indoor' | 'Greenhouse' | 'Sun-Grown';
  potency?: string;
  effects?: string[];
  strength?: 'Mild' | 'Medium' | 'Heavy' | 'Nuclear';
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
