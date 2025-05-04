import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/common/ProductGrid';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Your wishlist is empty</p>
          <a 
            href="/shop" 
            className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <ProductGrid products={wishlist} />
      )}
    </div>
  );
}