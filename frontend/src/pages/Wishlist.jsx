import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=wishlist');
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        // We'll simulate fetching for now
        // const { data } = await axios.get('/api/wishlist');
        // setWishlist(data);
        setWishlist([]); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, [user, navigate]);

  const removeHandler = async (id) => {
    try {
      // await axios.delete(`/api/wishlist/${id}`);
      setWishlist(wishlist.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const moveToCartHandler = (product) => {
    addToCart(product._id, 1);
    removeHandler(product._id);
    alert('Moved to cart!');
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Heart className="text-red-500" fill="currentColor" size={32} /> My Wishlist
      </h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid"></div>
        </div>
      ) : wishlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="mx-auto bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <Heart size={48} className="text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save items you love to your wishlist to buy them later.</p>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center">
                <Link to={`/product/${product._id}`}>
                  <img src={product.images[0]} alt={product.name} className="object-contain max-h-full group-hover:scale-105 transition-transform" />
                </Link>
                <button 
                  onClick={() => removeHandler(product._id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:text-red-500 transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-semibold text-gray-800 line-clamp-1 mb-2 hover:text-blue-600">{product.name}</h3>
                </Link>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900">${product.discountPrice || product.price}</span>
                  <span className="text-sm text-gray-500">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <button 
                  onClick={() => moveToCartHandler(product)}
                  disabled={product.stock === 0}
                  className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={18} /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
