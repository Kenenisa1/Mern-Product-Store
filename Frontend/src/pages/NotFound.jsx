import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaShoppingBag, 
  FaInfoCircle, 
  FaEnvelope,
  FaExclamationTriangle,
  FaArrowLeft,
  FaCompass
} from "react-icons/fa";
import { MdOutlineSearchOff, MdLocationOff } from "react-icons/md";

const NotFound = () => {
  const helpfulLinks = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <FaHome className="text-xl" />,
      description: 'Back to homepage'
    },
    { 
      name: 'Products', 
      path: '/products', 
      icon: <FaShoppingBag className="text-xl" />,
      description: 'Browse our catalog'
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: <FaInfoCircle className="text-xl" />,
      description: 'Learn about us'
    },
    { 
      name: 'Contact', 
      path: '/contact', 
      icon: <FaEnvelope className="text-xl" />,
      description: 'Get in touch'
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-pink-400/10 to-rose-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header with Icon */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl mb-8">
              <MdOutlineSearchOff className="text-4xl text-white" />
            </div>
            <h1 className="text-7xl md:text-9xl font-bold text-gray-900 mb-6 leading-none">
              4<span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">0</span>4
            </h1>
            <div className="h-2 w-48 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 mx-auto rounded-full mb-6"></div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12 border border-indigo-100">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full mb-6">
                <FaExclamationTriangle className="text-indigo-600 text-xl" />
                <span className="font-bold text-indigo-700">PAGE NOT FOUND</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lost in the Digital Space?
              </h2>
              
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
                Don't worry, our navigation compass is here to guide you back to familiar territory.
              </p>

              {/* Compass Illustration */}
              <div className="relative w-40 h-40 mx-auto mb-10">
                <div className="absolute inset-0 bg-linear-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                  <FaCompass className="text-6xl text-indigo-400 animate-pulse" />
                </div>
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-spin-slow"></div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 min-w-[200px]"
                >
                  <FaArrowLeft />
                  <span>Go to Homepage</span>
                </Link>
                
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-3 bg-white text-gray-800 border-2 border-indigo-200 hover:border-indigo-300 font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 min-w-[200px]"
                >
                  <FaShoppingBag />
                  <span>Browse Products</span>
                </Link>
              </div>
            </div>

            {/* Helpful Links Section */}
            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Quick Navigation
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {helpfulLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-6 text-center border border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                      <div className="w-16 h-16 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <div className="text-indigo-600">
                          {link.icon}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {link.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {link.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-2xl p-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <MdLocationOff className="text-2xl" />
                <span className="font-bold">CAN'T FIND WHAT YOU'RE LOOKING FOR?</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Try Our Search Feature</h3>
              <p className="text-indigo-100 mb-6">
                Use the search bar at the top of the page to find specific products or information.
              </p>
              
              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1"
              >
                <span>Back to Search</span>
                <FaArrowLeft />
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Still having trouble?{' '}
              <Link to="/contact" className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline">
                Contact our support team
              </Link>
              {' '}for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;