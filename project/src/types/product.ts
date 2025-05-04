export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  additionalImages?: string[];
  category: string;
  subcategory: string;
  woodType: string;
  inStock: boolean;
  stockQuantity: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  weight?: {
    value: number;
    unit: string;
  };
  isNewArrival?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  salePrice?: number;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  woodType?: string[];
  priceRange?: [number, number];
  inStock?: boolean;
  onSale?: boolean;
  newArrivals?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
}