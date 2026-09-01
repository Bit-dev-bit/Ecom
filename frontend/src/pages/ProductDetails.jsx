import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, Heart, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart, loading: cartLoading } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    fetchProduct();
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

  const addToCartHandler = () => {
    addToCart(product._id, qty);
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link to="/products" className="text-gray-500 hover:text-blue-600 font-medium text-sm flex items-center">
          &larr; Back to Products
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 rounded-xl p-8">
          <img 
            src={product.images && product.images[0]} 
            alt={product.name} 
            className="object-contain max-h-[400px]"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <p className="text-blue-600 font-semibold mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-yellow-400">
              <Star fill="currentColor" size={20} />
              <span className="text-gray-600 text-sm ml-2 font-medium">
                {product.rating} ({product.numReviews} Reviews)
              </span>
            </div>
            <span className="text-gray-300">|</span>
            <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-end gap-3 mb-8">
            {product.discountPrice ? (
              <>
                <span className="text-4xl font-extrabold text-gray-900">${product.discountPrice}</span>
                <span className="text-xl text-gray-400 line-through mb-1">${product.price}</span>
                <span className="bg-red-100 text-red-700 text-sm font-bold px-2 py-1 rounded mb-2 ml-2">
                  Save ${((product.price - product.discountPrice)).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-4xl font-extrabold text-gray-900">${product.price}</span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <hr className="mb-8 border-gray-200" />

          {product.stock > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden w-32">
                <button 
                  className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                >-</button>
                <input 
                  type="number" 
                  value={qty}
                  readOnly
                  className="w-full text-center font-bold text-gray-900 border-x border-gray-300 py-3 focus:outline-none"
                />
                <button 
                  className="px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                  onClick={() => setQty(qty < product.stock ? qty + 1 : product.stock)}
                >+</button>
              </div>
              
              <button 
                onClick={addToCartHandler}
                className="flex-1 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors flex items-center justify-center text-gray-500">
                <Heart size={24} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3 text-gray-600">
              <Truck size={24} className="text-blue-500" />
              <span className="text-sm font-medium">Free Campus Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <ShieldCheck size={24} className="text-green-500" />
              <span className="text-sm font-medium">1 Year Warranty</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
