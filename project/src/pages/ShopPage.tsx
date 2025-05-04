import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  filterProducts, 
  getWoodTypes, 
  getPriceRange, 
  sortProducts,
  products 
} from '../data/products';
import { Product, ProductFilters } from '../types/product';
import ProductGrid from '../components/common/ProductGrid';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const ShopPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [woodTypes, setWoodTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({});
  const [sortOption, setSortOption] = useState('newest');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract category and subcategory from URL if present
  useEffect(() => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    let newFilters: ProductFilters = { ...activeFilters };
    
    // If path is /shop/category
    if (pathParts.length === 2 && pathParts[0] === 'shop') {
      newFilters.category = pathParts[1];
      newFilters.subcategory = undefined;
    }
    
    // If path is /shop/category/subcategory
    if (pathParts.length === 3 && pathParts[0] === 'shop') {
      newFilters.category = pathParts[1];
      newFilters.subcategory = pathParts[2];
    }
    
    setActiveFilters(newFilters);
  }, [location.pathname]);
  
  // Load available wood types and price range
  useEffect(() => {
    setWoodTypes(getWoodTypes());
    setPriceRange(getPriceRange());
  }, []);
  
  // Filter products based on active filters
  useEffect(() => {
    let filtered = filterProducts({
      category: activeFilters.category,
      subcategory: activeFilters.subcategory,
      woodType: activeFilters.woodType,
      minPrice: activeFilters.priceRange?.[0],
      maxPrice: activeFilters.priceRange?.[1],
      inStock: activeFilters.inStock,
      onSale: activeFilters.onSale,
      newArrivals: activeFilters.newArrivals
    });
    
    // Apply sorting
    if (activeFilters.sortBy) {
      filtered = sortProducts(filtered, activeFilters.sortBy);
    } else {
      filtered = sortProducts(filtered, sortOption);
    }
    
    setFilteredProducts(filtered);
  }, [activeFilters, sortOption]);
  
  // Update filters
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setActiveFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setSortOption('newest');
    
    // Reset URL to /shop
    navigate('/shop');
  };
  
  // Toggle mobile filter panel
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Handle price range change
  const handlePriceChange = (value: number, isMin: boolean) => {
    const currentRange = activeFilters.priceRange || [priceRange.min, priceRange.max];
    const newRange = isMin 
      ? [value, currentRange[1]] 
      : [currentRange[0], value];
    
    updateFilters({ priceRange: newRange });
  };
  
  // Handle wood type selection
  const handleWoodTypeChange = (type: string) => {
    const currentTypes = activeFilters.woodType || [];
    
    if (currentTypes.includes(type)) {
      // Remove from selection
      updateFilters({ 
        woodType: currentTypes.filter(t => t !== type) 
      });
    } else {
      // Add to selection
      updateFilters({ 
        woodType: [...currentTypes, type] 
      });
    }
  };
  
  // Handle checkbox filters
  const handleCheckboxChange = (key: keyof ProductFilters, value: boolean) => {
    updateFilters({ [key]: value });
  };
  
  // Handle sorting
  const handleSortChange = (option: string) => {
    setSortOption(option);
    updateFilters({ 
      sortBy: option as 'price-asc' | 'price-desc' | 'newest' | 'popular' 
    });
  };
  
  // Count active filters (excluding category and subcategory)
  const activeFilterCount = Object.entries(activeFilters)
    .filter(([key]) => !['category', 'subcategory', 'sortBy'].includes(key))
    .filter(([key, value]) => {
      if (key === 'woodType' && Array.isArray(value)) return value.length > 0;
      return value !== undefined;
    }).length;
  
  return (
    <div className="pt-24">
      {/* Category Header */}
      <div className="bg-accent text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl">
            {activeFilters.category 
              ? activeFilters.category.charAt(0).toUpperCase() + activeFilters.category.slice(1)
              : 'Shop'}
          </h1>
          {activeFilters.subcategory && (
            <p className="text-xl mt-2">
              {activeFilters.subcategory.charAt(0).toUpperCase() + activeFilters.subcategory.slice(1)}
            </p>
          )}
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar - Mobile Toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button 
            className="btn-outline py-2 flex items-center"
            onClick={toggleFilter}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          
          {/* Mobile Sort */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => handleSortChange(e.target.value)}
              className="input py-2 appearance-none pr-8"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Popularity</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`
            lg:w-1/4 bg-white p-6 rounded-lg shadow-md 
            ${isFilterOpen ? 'fixed inset-0 z-50 overflow-auto' : 'hidden lg:block'}
          `}>
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h3 className="text-xl font-medium">Filters</h3>
              <button onClick={toggleFilter}>
                <X size={24} />
              </button>
            </div>
            
            {/* Wood Type Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Wood Type</h3>
              <div className="space-y-2">
                {woodTypes.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={(activeFilters.woodType || []).includes(type)}
                      onChange={() => handleWoodTypeChange(type)}
                      className="mr-2"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>${activeFilters.priceRange?.[0] || priceRange.min}</span>
                  <span>${activeFilters.priceRange?.[1] || priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step="10"
                  value={activeFilters.priceRange?.[0] || priceRange.min}
                  onChange={(e) => handlePriceChange(parseInt(e.target.value), true)}
                  className="w-full"
                />
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step="10"
                  value={activeFilters.priceRange?.[1] || priceRange.max}
                  onChange={(e) => handlePriceChange(parseInt(e.target.value), false)}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Other Filters */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={activeFilters.inStock || false}
                    onChange={(e) => handleCheckboxChange('inStock', e.target.checked)}
                    className="mr-2"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Special Offers</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={activeFilters.onSale || false}
                    onChange={(e) => handleCheckboxChange('onSale', e.target.checked)}
                    className="mr-2"
                  />
                  <span>On Sale</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={activeFilters.newArrivals || false}
                    onChange={(e) => handleCheckboxChange('newArrivals', e.target.checked)}
                    className="mr-2"
                  />
                  <span>New Arrivals</span>
                </label>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            {/* Sort and Results Count - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input py-2 appearance-none pr-8"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="popular">Popularity</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {activeFilters.woodType && activeFilters.woodType.length > 0 && 
                  activeFilters.woodType.map(type => (
                    <div key={type} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="mr-1">{type}</span>
                      <button 
                        onClick={() => handleWoodTypeChange(type)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))
                }
                
                {activeFilters.priceRange && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="mr-1">
                      ${activeFilters.priceRange[0]} - ${activeFilters.priceRange[1]}
                    </span>
                    <button 
                      onClick={() => updateFilters({ priceRange: undefined })}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {activeFilters.inStock && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="mr-1">In Stock</span>
                    <button 
                      onClick={() => updateFilters({ inStock: false })}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {activeFilters.onSale && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="mr-1">On Sale</span>
                    <button 
                      onClick={() => updateFilters({ onSale: false })}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                {activeFilters.newArrivals && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="mr-1">New Arrivals</span>
                    <button 
                      onClick={() => updateFilters({ newArrivals: false })}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-accent-light text-sm"
                >
                  Clear All
                </button>
              </div>
            )}
            
            {/* Products */}
            <ProductGrid 
              products={filteredProducts} 
              columns={3} 
              showPagination={true}
              productsPerPage={9}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;