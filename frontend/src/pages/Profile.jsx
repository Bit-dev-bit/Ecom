import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, User as UserIcon, Settings } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders = async () => {
      try {
        setLoading(true);
        // Assuming we create an endpoint to get user's orders
        const { data } = await axios.get('/api/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    // In a real app we would call fetchMyOrders() here,
    // For now we'll set it to empty since we haven't built the endpoint
    setOrders([]);
    setLoading(false);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 text-center border-b border-gray-100 bg-blue-50">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <div className="p-2">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
                <UserIcon size={20} /> My Profile
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                <Package size={20} /> My Orders
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                <Settings size={20} /> Account Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't placed an order yet.</p>
                <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">Start Shopping</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm">
                      <th className="p-4 font-medium rounded-tl-lg">ORDER ID</th>
                      <th className="p-4 font-medium">DATE</th>
                      <th className="p-4 font-medium">TOTAL</th>
                      <th className="p-4 font-medium">PAID</th>
                      <th className="p-4 font-medium rounded-tr-lg">DELIVERED</th>
                      <th className="p-4 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="p-4 text-sm font-medium">{order._id.substring(0, 8)}...</td>
                        <td className="p-4 text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                        <td className="p-4 text-sm font-medium">${order.total.toFixed(2)}</td>
                        <td className="p-4 text-sm">
                          {order.paymentStatus === 'Completed' ? (
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Paid</span>
                          ) : (
                            <span className="text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded">Pending</span>
                          )}
                        </td>
                        <td className="p-4 text-sm">
                          {order.orderStatus === 'Delivered' ? (
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Delivered</span>
                          ) : (
                            <span className="text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">{order.orderStatus}</span>
                          )}
                        </td>
                        <td className="p-4">
                          <Link to={`/order/${order._id}`} className="text-blue-600 hover:underline text-sm font-medium">Details</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
