import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, Clock } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-500 mt-2">Order ID: {order._id}</p>
        </div>
        <Link to="/profile" className="text-blue-600 hover:underline">Back to Profile</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Shipping Information</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
            
            <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {order.orderStatus === 'Delivered' ? <CheckCircle2 size={16}/> : <Clock size={16}/>}
              Status: {order.orderStatus}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Payment Method</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {order.paymentStatus === 'Completed' ? <CheckCircle2 size={16}/> : <Clock size={16}/>}
              Payment: {order.paymentStatus}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Items</h2>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <li key={index} className="py-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded p-1 border">
                    <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <Link to={`/product/${item.product}`} className="font-medium text-blue-600 hover:underline">{item.name}</Link>
                    <div className="text-gray-900 font-medium">
                      {item.qty} x ${item.price.toFixed(2)} = ${(item.qty * item.price).toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(order.total - order.subtotal - order.shippingCost).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.paymentStatus === 'Pending' && (
              <button 
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md mt-4"
                onClick={() => alert('Test Payment Integration clicked. In a real app this would open a payment gateway.')}
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
