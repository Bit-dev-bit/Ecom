import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, calculateTotal, calculateItemCount } = useCart();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="mx-auto bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={48} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <li key={item.product._id} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md p-2 flex items-center justify-center">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="object-contain max-h-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <Link to={`/product/${item.product._id}`} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">{item.product.brand}</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                          ${item.product.discountPrice || item.product.price}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          Qty: <span className="ml-2 font-semibold text-gray-900">{item.qty}</span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product._id)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-colors"
                        >
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({calculateItemCount()})</span>
                  <span>${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Subtotal</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={checkoutHandler}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
