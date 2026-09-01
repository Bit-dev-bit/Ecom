import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Filter, Star } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products${location.search}`);
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} />
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link to="/products" className="hover:text-blue-600">All Products</Link></li>
                <li><Link to="/products?category=Electronics" className="hover:text-blue-600">Electronics</Link></li>
                <li><Link to="/products?category=Clothing" className="hover:text-blue-600">Clothing</Link></li>
                <li><Link to="/products?category=Stationery" className="hover:text-blue-600">Stationery</Link></li>
                <li><Link to="/products?category=Hostel Essentials" className="hover:text-blue-600">Hostel Essentials</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {searchQuery && (
            <h2 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h2>
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 p-4">
                  <div className="h-48 bg-gray-200 animate-pulse mb-4"></div>
                  <div className="h-4 bg-gray-200 animate-pulse w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                  <Link to={`/product/${product._id}`}>
                    <div className="h-48 overflow-hidden relative p-4 bg-gray-50 flex items-center justify-center">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discountPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          SALE
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-gray-800 font-semibold truncate mb-1" title={product.name}>
                        {product.name}
                      </h3>
                      <div className="flex items-center text-yellow-400 mb-2">
                        <Star size={16} fill="currentColor" />
                        <span className="text-gray-500 text-sm ml-1">
                          {product.rating} ({product.numReviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {product.discountPrice ? (
                          <>
                            <span className="text-xl font-bold text-gray-900">${product.discountPrice}</span>
                            <span className="text-sm text-gray-500 line-through">${product.price}</span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">${product.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Products;
