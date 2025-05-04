import { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  showPagination?: boolean;
  productsPerPage?: number;
}

const ProductGrid = ({ 
  products, 
  columns = 3, 
  showPagination = false,
  productsPerPage = 12
}: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  // Update displayed products when page changes or products change
  useEffect(() => {
    if (showPagination) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      setDisplayedProducts(products.slice(startIndex, endIndex));
    } else {
      setDisplayedProducts(products);
    }
  }, [currentPage, products, showPagination, productsPerPage]);
  
  // Reset to first page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const getGridCols = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    }
  };
  
  return (
    <div>
      {displayedProducts.length > 0 ? (
        <>
          <div className={`grid ${getGridCols()} gap-6`}>
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {showPagination && totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <nav className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-l-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50 ${
                      currentPage === page
                        ? 'z-10 bg-accent text-white hover:bg-accent-light border-accent'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-r-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;