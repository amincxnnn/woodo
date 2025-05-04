import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Handcrafted Oak Dining Table",
    description: "This beautiful handcrafted oak dining table features a smooth, natural finish that showcases the wood's grain pattern. The sturdy design ensures stability and longevity, making it perfect for family gatherings and dinner parties. Each table is made to order, ensuring uniqueness and attention to detail.",
    price: 1200,
    imageUrl: "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/2092058/pexels-photo-2092058.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2826787/pexels-photo-2826787.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Furniture",
    subcategory: "Tables",
    woodType: "Oak",
    inStock: true,
    stockQuantity: 5,
    dimensions: {
      width: 180,
      height: 75,
      depth: 90,
      unit: "cm"
    },
    weight: {
      value: 45,
      unit: "kg"
    },
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Minimalist Walnut Bookshelf",
    description: "This sleek minimalist bookshelf is crafted from premium walnut wood, featuring five spacious shelves perfect for displaying books and decorative items. The natural finish highlights the rich color variations and distinctive grain patterns of walnut wood.",
    price: 850,
    imageUrl: "https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/7319279/pexels-photo-7319279.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Furniture",
    subcategory: "Shelves",
    woodType: "Walnut",
    inStock: true,
    stockQuantity: 8,
    dimensions: {
      width: 120,
      height: 180,
      depth: 35,
      unit: "cm"
    },
    weight: {
      value: 30,
      unit: "kg"
    },
    isNewArrival: true,
    rating: 4.6,
    reviewCount: 12,
    createdAt: "2023-02-20T14:45:00Z",
    updatedAt: "2023-02-20T14:45:00Z"
  },
  {
    id: 3,
    name: "Artisanal Cherry Wood Coffee Table",
    description: "This stunning coffee table is handcrafted from solid cherry wood, featuring a unique live edge design that preserves the natural beauty of the wood. The rich, warm tones deepen over time, developing a gorgeous patina that makes each piece truly one-of-a-kind.",
    price: 680,
    imageUrl: "https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/2098913/pexels-photo-2098913.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Furniture",
    subcategory: "Tables",
    woodType: "Cherry",
    inStock: true,
    stockQuantity: 3,
    dimensions: {
      width: 120,
      height: 45,
      depth: 70,
      unit: "cm"
    },
    weight: {
      value: 25,
      unit: "kg"
    },
    isFeatured: true,
    rating: 4.9,
    reviewCount: 18,
    createdAt: "2023-03-05T09:15:00Z",
    updatedAt: "2023-03-05T09:15:00Z"
  },
  {
    id: 4,
    name: "Handmade Maple Cutting Board",
    description: "This premium cutting board is crafted from solid maple wood, known for its durability and gentle treatment of knife edges. The smooth surface is perfect for food preparation, while the built-in juice groove prevents spills. Each board is treated with food-safe mineral oil for protection and longevity.",
    price: 75,
    imageUrl: "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/4992866/pexels-photo-4992866.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Kitchen",
    subcategory: "Cutting Boards",
    woodType: "Maple",
    inStock: true,
    stockQuantity: 25,
    dimensions: {
      width: 40,
      height: 2.5,
      depth: 25,
      unit: "cm"
    },
    weight: {
      value: 1.2,
      unit: "kg"
    },
    isOnSale: true,
    salePrice: 59.99,
    rating: 4.7,
    reviewCount: 42,
    createdAt: "2023-01-10T11:20:00Z",
    updatedAt: "2023-04-15T16:30:00Z"
  },
  {
    id: 5,
    name: "Classic Wooden Chess Set",
    description: "This elegant chess set features hand-carved pieces crafted from contrasting maple and walnut woods. The board is constructed with alternating wood squares and finished with a satin varnish for durability. Perfect for both play and display, this set makes a wonderful gift for chess enthusiasts and collectors alike.",
    price: 120,
    imageUrl: "https://images.pexels.com/photos/277092/pexels-photo-277092.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/277092/pexels-photo-277092.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/244839/pexels-photo-244839.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Toys",
    subcategory: "Games",
    woodType: "Maple and Walnut",
    inStock: true,
    stockQuantity: 15,
    dimensions: {
      width: 40,
      height: 5,
      depth: 40,
      unit: "cm"
    },
    weight: {
      value: 2.5,
      unit: "kg"
    },
    isNewArrival: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 36,
    createdAt: "2023-04-25T13:40:00Z",
    updatedAt: "2023-04-25T13:40:00Z"
  },
  {
    id: 6,
    name: "Wooden Wall Clock",
    description: "This beautiful wall clock is handcrafted from reclaimed oak with a natural finish that highlights the unique characteristics of the wood. The minimalist design features Roman numerals and contrasting hands for easy time-reading. Each clock is equipped with a silent quartz movement to ensure peaceful timekeeping.",
    price: 95,
    imageUrl: "https://images.pexels.com/photos/691034/pexels-photo-691034.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/691034/pexels-photo-691034.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2749165/pexels-photo-2749165.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Decoration",
    subcategory: "Clocks",
    woodType: "Reclaimed Oak",
    inStock: true,
    stockQuantity: 20,
    dimensions: {
      width: 30,
      height: 30,
      depth: 3.5,
      unit: "cm"
    },
    weight: {
      value: 1.8,
      unit: "kg"
    },
    rating: 4.5,
    reviewCount: 28,
    createdAt: "2023-02-12T15:50:00Z",
    updatedAt: "2023-02-12T15:50:00Z"
  },
  {
    id: 7,
    name: "Rustic Pine Dining Chairs (Set of 2)",
    description: "These rustic dining chairs are handcrafted from solid pine wood with a distressed finish for a charming farmhouse look. The ergonomic design ensures comfort during long dinners, while the sturdy construction guarantees years of use. Each chair is carefully assembled and finished by skilled artisans.",
    price: 350,
    imageUrl: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Furniture",
    subcategory: "Chairs",
    woodType: "Pine",
    inStock: true,
    stockQuantity: 6,
    dimensions: {
      width: 45,
      height: 90,
      depth: 50,
      unit: "cm"
    },
    weight: {
      value: 12,
      unit: "kg"
    },
    isOnSale: true,
    salePrice: 299.99,
    rating: 4.4,
    reviewCount: 32,
    createdAt: "2023-03-18T10:10:00Z",
    updatedAt: "2023-05-01T09:20:00Z"
  },
  {
    id: 8,
    name: "Wooden Baby Rattle Set",
    description: "This set of three handcrafted wooden baby rattles is made from natural, untreated maple wood that's safe for little ones. The smooth, rounded edges prevent injury, while the gentle sound created by the rattles soothes and entertains. These toys stimulate auditory development and fine motor skills in infants.",
    price: 35,
    imageUrl: "https://images.pexels.com/photos/3661348/pexels-photo-3661348.jpeg?auto=compress&cs=tinysrgb&w=1600",
    additionalImages: [
      "https://images.pexels.com/photos/3661348/pexels-photo-3661348.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    category: "Toys",
    subcategory: "Baby Toys",
    woodType: "Maple",
    inStock: true,
    stockQuantity: 30,
    dimensions: {
      width: 8,
      height: 8,
      depth: 8,
      unit: "cm"
    },
    weight: {
      value: 0.2,
      unit: "kg"
    },
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 45,
    createdAt: "2023-04-05T14:25:00Z",
    updatedAt: "2023-04-05T14:25:00Z"
  }
];

// Get products by category
export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

// Get products by subcategory
export const getProductsBySubcategory = (subcategory: string) => {
  return products.filter(product => product.subcategory.toLowerCase() === subcategory.toLowerCase());
};

// Get product by ID
export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

// Get new arrivals
export const getNewArrivals = () => {
  return products.filter(product => product.isNewArrival);
};

// Get products on sale
export const getProductsOnSale = () => {
  return products.filter(product => product.isOnSale);
};

// Get related products
export const getRelatedProducts = (productId: number, limit: number = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

// Filter products
export const filterProducts = (filters: {
  category?: string;
  subcategory?: string;
  woodType?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  onSale?: boolean;
  newArrivals?: boolean;
}) => {
  return products.filter(product => {
    // Apply category filter
    if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    
    // Apply subcategory filter
    if (filters.subcategory && product.subcategory.toLowerCase() !== filters.subcategory.toLowerCase()) {
      return false;
    }
    
    // Apply wood type filter
    if (filters.woodType && filters.woodType.length > 0) {
      if (!filters.woodType.some(wood => product.woodType.toLowerCase().includes(wood.toLowerCase()))) {
        return false;
      }
    }
    
    // Apply price range filter
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    
    // Apply in stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }
    
    // Apply on sale filter
    if (filters.onSale && !product.isOnSale) {
      return false;
    }
    
    // Apply new arrivals filter
    if (filters.newArrivals && !product.isNewArrival) {
      return false;
    }
    
    return true;
  });
};

// Get wood types
export const getWoodTypes = () => {
  const woodTypes = products.map(product => product.woodType);
  // Remove duplicates and split combined types (e.g., "Maple and Walnut")
  const flattenedTypes = woodTypes
    .flatMap(type => type.split(' and '))
    .map(type => type.trim());
  
  return [...new Set(flattenedTypes)];
};

// Get price range
export const getPriceRange = () => {
  const prices = products.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

// Sort products
export const sortProducts = (products: Product[], sortBy: string) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'newest':
      return sortedProducts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'popular':
      return sortedProducts.sort((a, b) => 
        (b.rating || 0) * (b.reviewCount || 0) - (a.rating || 0) * (a.reviewCount || 0)
      );
    default:
      return sortedProducts;
  }
};