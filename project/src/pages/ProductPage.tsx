import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, ArrowLeft, Star, Truck, Package, Award, AlertCircle } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductGrid from '../components/common/ProductGrid';
import { toast } from '../components/ui/Toaster';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  // Fetch product details
  useEffect(() => {
    if (id) {
      const productId = parseInt(id, 10);
      setIsLoading(true);
      
      // Simulate API call delay for demo
      setTimeout(() => {
        const foundProduct = getProductById(productId);
        if (foundProduct) {
          setProduct(foundProduct);
          setActiveImage(foundProduct.imageUrl);
          
          // Get related products
          const related = getRelatedProducts(productId);
          setRelatedProducts(related);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id]);
  
  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    if (product && product.stockQuantity && value > product.stockQuantity) {
      toast.error(`Sorry, only ${product.stockQuantity} items in stock`);
      return;
    }
    setQuantity(value);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
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
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-error" />
          <h2 className="text-2xl font-medium mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/shop" className="text-accent flex items-center hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Back to Shop
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="relative h-[400px] md:h-[500px] bg-gray-100">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-4"
                />
                {product.isNewArrival && (
                  <span className="absolute top-4 left-4 badge-new">New</span>
                )}
                {product.isOnSale && (
                  <span className="absolute top-4 left-4 badge-sale">Sale</span>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="flex p-4 space-x-2 overflow-x-auto">
                  {[product.imageUrl, ...product.additionalImages].map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-20 rounded border-2 flex-shrink-0 ${
                        activeImage === img ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={`${
                          star <= Math.round(product.rating || 0)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="mb-6">
                {product.isOnSale && product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-medium text-error mr-2">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="ml-2 text-sm bg-error text-white px-2 py-1 rounded-md">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
                )}
              </div>
              
              {/* Short Description */}
              <p className="text-gray-600 mb-6">
                {product.description.substring(0, 150)}...
              </p>
              
              {/* Wood Type */}
              <div className="mb-6">
                <span className="text-gray-700 font-medium">Wood Type: </span>
                <span className="text-gray-600">{product.woodType}</span>
              </div>
              
              {/* Add to Cart Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <span className="text-gray-700 font-medium mr-4">Quantity:</span>
                  <div className="flex border border-gray-300 rounded">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="w-12 text-center border-x border-gray-300"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="ml-4 text-gray-500">
                    {product.inStock ? (
                      <span className="text-success">In Stock</span>
                    ) : (
                      <span className="text-error">Out of Stock</span>
                    )}
                    {product.inStock && product.stockQuantity && (
                      <span className="ml-1">
                        ({product.stockQuantity} available)
                      </span>
                    )}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn-secondary flex-grow sm:flex-grow-0"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={handleToggleWishlist}
                    className={`btn flex-grow sm:flex-grow-0 ${
                      isInWishlist(product.id)
                        ? 'bg-accent/10 text-accent border border-accent'
                        : 'btn-outline'
                    }`}
                  >
                    <Heart
                      size={18}
                      className={`mr-2 ${isInWishlist(product.id) ? 'fill-accent' : ''}`}
                    />
                    {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
              
              {/* Product Highlights */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-start">
                  <Truck size={20} className="text-accent mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On orders over $150</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Package size={20} className="text-accent mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Secure Packaging</h4>
                    <p className="text-sm text-gray-600">Carefully packed to protect your item</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Award size={20} className="text-accent mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium">Quality Guarantee</h4>
                    <p className="text-sm text-gray-600">2-year warranty on all products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex border-b border-gray-200">
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'specifications'
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              
              <button
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-accent text-accent'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviewCount || 0})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="mb-4">{product.description}</p>
                  <p>
                    Each piece is handcrafted with care by our skilled artisans, ensuring that you receive a
                    one-of-a-kind item with its own unique character. The natural variations in the wood grain
                    make every product truly special.
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Wood Type</dt>
                      <dd className="mt-1 text-gray-900">{product.woodType}</dd>
                    </div>
                    
                    {product.dimensions && (
                      <>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
                          <dd className="mt-1 text-gray-900">
                            {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} {product.dimensions.unit}
                          </dd>
                        </div>
                        
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Width</dt>
                          <dd className="mt-1 text-gray-900">{product.dimensions.width} {product.dimensions.unit}</dd>
                        </div>
                        
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Height</dt>
                          <dd className="mt-1 text-gray-900">{product.dimensions.height} {product.dimensions.unit}</dd>
                        </div>
                        
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Depth</dt>
                          <dd className="mt-1 text-gray-900">{product.dimensions.depth} {product.dimensions.unit}</dd>
                        </div>
                      </>
                    )}
                    
                    {product.weight && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Weight</dt>
                        <dd className="mt-1 text-gray-900">{product.weight.value} {product.weight.unit}</dd>
                      </div>
                    )}
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Product Code</dt>
                      <dd className="mt-1 text-gray-900">WC-{product.id.toString().padStart(4, '0')}</dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Care Instructions</dt>
                      <dd className="mt-1 text-gray-900">Dust regularly with a soft, dry cloth. Apply furniture wax or oil periodically.</dd>
                    </div>
                  </dl>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                  
                  {/* Review Summary */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      <div className="text-4xl font-medium mr-2">{product.rating}</div>
                      <div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={18}
                              className={`${
                                star <= Math.round(product.rating || 0)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">Based on {product.reviewCount} reviews</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Review List (Mocked for demo) */}
                  <div className="space-y-6">
                    {[
                      {
                        name: "Michael Thompson",
                        date: "August 15, 2023",
                        rating: 5,
                        title: "Exceptional quality and craftsmanship",
                        comment: "I'm extremely satisfied with my purchase. The attention to detail is outstanding, and the wood quality is top-notch. It's exactly as described and pictured, and even more beautiful in person."
                      },
                      {
                        name: "Jennifer Adams",
                        date: "July 28, 2023",
                        rating: 4,
                        title: "Beautiful piece, slight shipping delay",
                        comment: "The product is beautiful and well-made. I can tell it's going to last for generations. The only downside was a slight delay in shipping, but customer service was responsive and kept me updated."
                      },
                      {
                        name: "David Wilson",
                        date: "June 10, 2023",
                        rating: 5,
                        title: "Perfect addition to our home",
                        comment: "This has become my favorite piece in our living room. The craftsmanship is exceptional, and we've received so many compliments from guests. Worth every penny for such quality."
                      }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={`${
                                star <= review.rating
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <h5 className="font-medium mb-2">{review.title}</h5>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif mb-8">You May Also Like</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;