import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Users, ShoppingBag, LayoutDashboard, Edit, Trash2, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [user, navigate, activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products');
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const deleteProductHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // In a real app we need DELETE /api/products/:id endpoint
        // await axios.delete(`/api/products/${id}`);
        setProducts(products.filter(p => p._id !== id));
        alert('Product deleted (Simulated)');
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-900 text-white">
              <h2 className="font-bold text-xl flex items-center gap-2"><LayoutDashboard size={20}/> Admin Panel</h2>
            </div>
            <nav className="p-2 space-y-1">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <LayoutDashboard size={20} /> Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-colors ${activeTab === 'products' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Package size={20} /> Products
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <ShoppingBag size={20} /> Orders
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-left transition-colors ${activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Users size={20} /> Users
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          
          {activeTab === 'dashboard' && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-gray-500 text-sm font-medium mb-2">Total Revenue</div>
                  <div className="text-3xl font-bold text-gray-900">$12,450.00</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-gray-500 text-sm font-medium mb-2">Total Orders</div>
                  <div className="text-3xl font-bold text-gray-900">45</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-gray-500 text-sm font-medium mb-2">Total Products</div>
                  <div className="text-3xl font-bold text-gray-900">120</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-gray-500 text-sm font-medium mb-2">Total Users</div>
                  <div className="text-3xl font-bold text-gray-900">32</div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-gray-900">Products Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
                  <Plus size={18}/> Add Product
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b">
                      <th className="p-4 font-semibold">Product</th>
                      <th className="p-4 font-semibold">Price</th>
                      <th className="p-4 font-semibold">Category</th>
                      <th className="p-4 font-semibold">Stock</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {loading ? (
                      <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
                    ) : products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded object-cover border" />
                            <div className="font-medium text-gray-900 max-w-[200px] truncate">{product.name}</div>
                          </div>
                        </td>
                        <td className="p-4 text-sm">${product.discountPrice || product.price}</td>
                        <td className="p-4 text-sm text-gray-500">{product.category}</td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => deleteProductHandler(product._id)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Orders Management</h2>
              <p className="text-gray-500">Orders management interface goes here...</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Users Management</h2>
              <p className="text-gray-500">Users management interface goes here...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
