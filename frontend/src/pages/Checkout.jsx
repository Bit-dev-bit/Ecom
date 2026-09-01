import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CreditCard, Truck, MapPin } from 'lucide-react';

const Checkout = () => {
  const { cart, calculateTotal, calculateItemCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Test)');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    navigate('/login?redirect=checkout');
    return null;
  }

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const itemsPrice = Number(calculateTotal());
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const orderItems = cart.items.map(i => ({
        name: i.product.name,
        qty: i.qty,
        image: i.product.images[0],
        price: i.product.discountPrice || i.product.price,
        product: i.product._id
      }));

      const { data } = await axios.post('/api/orders', {
        orderItems,
        shippingAddress: address,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      });
      
      setLoading(false);
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Steps */}
        <div className="w-full lg:w-2/3">
          {/* Step 1: Address */}
          <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 1 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'} mb-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <h2 className="text-xl font-bold flex items-center gap-2"><MapPin size={20}/> Shipping Address</h2>
            </div>
            {step === 1 && (
              <div className="space-y-4 pl-11">
                <input 
                  type="text" placeholder="Address" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  value={address.address} onChange={(e) => setAddress({...address, address: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" placeholder="City" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})}
                  />
                  <input 
                    type="text" placeholder="Postal Code" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                  />
                </div>
                <input 
                  type="text" placeholder="Country" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                  value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})}
                />
                <button 
                  onClick={() => setStep(2)}
                  disabled={!address.address || !address.city || !address.postalCode || !address.country}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
                >
                  Continue to Payment
                </button>
              </div>
            )}
            {step > 1 && (
              <div className="pl-11 flex justify-between items-center text-sm text-gray-600">
                <p>{address.address}, {address.city}, {address.postalCode}, {address.country}</p>
                <button onClick={() => setStep(1)} className="text-blue-600 hover:underline">Edit</button>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 2 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'} mb-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <h2 className="text-xl font-bold flex items-center gap-2"><CreditCard size={20}/> Payment Method</h2>
            </div>
            {step === 2 && (
              <div className="space-y-4 pl-11">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <input 
                    type="radio" id="test-card" name="paymentMethod" 
                    checked={paymentMethod === 'Credit Card (Test)'} onChange={() => setPaymentMethod('Credit Card (Test)')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="test-card" className="ml-3 block font-medium text-gray-700">Credit Card (Test Mode)</label>
                </div>
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <input 
                    type="radio" id="paypal" name="paymentMethod" 
                    checked={paymentMethod === 'PayPal'} onChange={() => setPaymentMethod('PayPal')}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="paypal" className="ml-3 block font-medium text-gray-700">PayPal</label>
                </div>
                
                <button 
                  onClick={() => setStep(3)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Review Order
                </button>
              </div>
            )}
            {step > 2 && (
              <div className="pl-11 flex justify-between items-center text-sm text-gray-600">
                <p>{paymentMethod}</p>
                <button onClick={() => setStep(2)} className="text-blue-600 hover:underline">Edit</button>
              </div>
            )}
          </div>

          {/* Step 3: Confirm */}
          <div className={`bg-white p-6 rounded-xl shadow-sm border ${step === 3 ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'} mb-6`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <h2 className="text-xl font-bold flex items-center gap-2"><Truck size={20}/> Confirm Order</h2>
            </div>
            {step === 3 && (
              <div className="pl-11">
                <p className="text-gray-600 mb-6">Please review your items and total summary before placing the order.</p>
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-medium">{error}</div>}
                <button 
                  onClick={placeOrderHandler}
                  disabled={loading}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-green-300 shadow-md w-full sm:w-auto"
                >
                  {loading ? 'Processing...' : 'Place Order Now'}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({calculateItemCount()})</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${taxPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-semibold text-sm text-gray-900 mb-3">Items in Cart:</h3>
              <ul className="space-y-3">
                {cart.items.map((item, index) => (
                  <li key={index} className="flex gap-3 text-sm">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
