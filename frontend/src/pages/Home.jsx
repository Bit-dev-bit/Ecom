import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Tag, Clock } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 mt-10 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Everything You Need for <span className="text-blue-600">Campus Life</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              From textbooks to tech, dorm essentials to daily wear. CampusCart brings you the best deals for your college journey.
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Students with shopping bags" 
              className="rounded-lg shadow-2xl object-cover h-96 w-full"
            />
          </div>
        </div>
      </section>

      {/* Why CampusCart Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why CampusCart?</h2>
            <p className="mt-4 text-gray-600">Built specifically for student needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <Tag size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Affordable Prices</h3>
              <p className="text-gray-600 text-sm">Discounts and deals tailored for student budgets.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <Truck size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Get your essentials delivered right to your dorm or hostel.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">100% safe and secure transactions every time.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2">Student Friendly</h3>
              <p className="text-gray-600 text-sm">Curated products that you actually need for college.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="mt-2 text-gray-600">Top picks for this semester</p>
            </div>
            <Link to="/products" className="text-blue-600 hover:text-blue-800 font-medium">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Skeletons/Placeholders for now */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                    <div className="h-8 bg-blue-200 rounded w-1/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
