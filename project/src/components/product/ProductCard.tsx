import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  return (
    <div className="product-card card h-full">
      {/* Product Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {product.isNewArrival && (
          <span className="badge-new">New</span>
        )}
        {product.isOnSale && (
          <span className="badge-sale">Sale</span>
        )}
      </div>
      
      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow"
        aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          size={18} 
          className={isInWishlist(product.id) ? "fill-secondary text-secondary" : "text-gray-600"} 
        />
      </button>
      
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden h-[240px]">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-card-image w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium text-primary truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm truncate mb-2">{product.woodType}</p>
          
          <div className="flex justify-between items-center">
            <div>
              {product.isOnSale && product.salePrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium text-error">{formatPrice(product.salePrice)}</span>
                  <span className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</span>
                </div>
              ) : (
                <span className="text-lg font-medium">{formatPrice(product.price)}</span>
              )}
            </div>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-amber-500">{product.rating}</span>
                <span className="ml-1 text-amber-500">★</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* Quick Actions */}
      <div className="product-card-actions">
        <button
          onClick={handleAddToCart}
          className="w-full btn-secondary text-sm py-2"
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;