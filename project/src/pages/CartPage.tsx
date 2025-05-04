import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ChevronLeft, AlertCircle, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    
    // Simulate API delay
    setTimeout(() => {
      updateQuantity(productId, newQuantity);
      setIsUpdating(false);
    }, 300);
  };
  
  const handleRemoveItem = (productId: number) => {
    setIsUpdating(true);
    
    // Simulate API delay
    setTimeout(() => {
      removeFromCart(productId);
      setIsUpdating(false);
    }, 300);
  };
  
  // Calculate shipping - free over $150
  const shipping = cartTotal >= 150 ? 0 : 12.99;
  
  // Calculate tax (7%)
  const tax = cartTotal * 0.07;
  
  // Calculate order total
  const orderTotal = cartTotal + shipping + tax;
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif mb-8">Your Shopping Cart</h1>
        
        {isUpdating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <div className="w-12 h-12 border-4 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg">Updating your cart...</p>
            </div>
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                        Price
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="py-4 px-6 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <tr key={item.product.id}>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <Link
                                to={`/product/${item.product.id}`}
                                className="text-primary hover:text-accent font-medium"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-gray-500">{item.product.woodType}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden sm:table-cell">
                          {item.product.isOnSale && item.product.salePrice ? (
                            <div>
                              <span className="text-error font-medium">
                                {formatPrice(item.product.salePrice)}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-1">
                                {formatPrice(item.product.price)}
                              </span>
                            </div>
                          ) : (
                            <span>{formatPrice(item.product.price)}</span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex border border-gray-300 rounded w-24">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-10 text-center border-x border-gray-300"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right font-medium">
                          {formatPrice(
                            (item.product.isOnSale && item.product.salePrice
                              ? item.product.salePrice
                              : item.product.price) * item.quantity
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="text-gray-500 hover:text-error"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Cart Actions */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/shop" className="btn-outline flex items-center">
                  <ChevronLeft size={16} className="mr-1" /> Continue Shopping
                </Link>
                <button onClick={clearCart} className="text-gray-600 hover:text-error flex items-center">
                  <Trash2 size={16} className="mr-1" /> Clear Cart
                </button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (7%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    {shipping === 0 && (
                      <div className="py-2 px-4 bg-success/10 text-success rounded flex items-start">
                        <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          You've qualified for free shipping!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-6 text-lg font-medium">
                    <span>Total</span>
                    <span>{formatPrice(orderTotal)}</span>
                  </div>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="btn-primary w-full"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;