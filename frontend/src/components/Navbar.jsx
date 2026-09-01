import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { calculateItemCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CampusCart
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium">Shop</Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="w-full max-w-lg relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="text-gray-600 hover:text-blue-600">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-blue-600 relative">
              <ShoppingCart size={24} />
              {calculateItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {calculateItemCount()}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to={user.role === 'admin' ? "/admin/dashboard" : "/profile"} className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-1">
                  <User size={20} /> {user.name.split(' ')[0]}
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-red-600">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                <User size={24} />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-blue-600">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
