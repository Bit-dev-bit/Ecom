import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CampusCart</h3>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for everything you need on campus. Quality products at student-friendly prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link to="/products" className="hover:text-blue-400">Shop</Link></li>
              <li><Link to="/faq" className="hover:text-blue-400">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/shipping" className="hover:text-blue-400">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-blue-400">Returns & Refunds</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-200">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CampusCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
