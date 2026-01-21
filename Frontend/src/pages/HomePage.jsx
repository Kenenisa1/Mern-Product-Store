import { useProductStore } from "../Store/product";
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { FaSort, FaFire, FaTruck, FaCreditCard, FaSyncAlt, FaArrowRight, FaStar, FaShieldAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  const { fetchFeaturedProducts, featuredProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchFeaturedProducts();
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchFeaturedProducts]);

  const displayProducts = featuredProducts || [];

  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return (a.price || 0) - (b.price || 0);
      case 'price-high': return (b.price || 0) - (a.price || 0);
      case 'name-asc': return (a.name || '').localeCompare(b.name || '');
      case 'name-desc': return (b.name || '').localeCompare(a.name || '');
      case 'featured': return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      default: return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  const productCount = sortedProducts.length;
  const featuredDisplay = sortedProducts.slice(0, 4);

  const features = [
    {
      icon: <FaTruck className="text-2xl" />,
      title: "Fast Updates",
      description: "Stay updated with new market arrivals",
      linear: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaCreditCard className="text-2xl" />,
      title: "Save Time",
      description: "Shop efficiently from anywhere",
      linear: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaSyncAlt className="text-2xl" />,
      title: "Save Energy",
      description: "Avoid crowded market visits",
      linear: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <>
      <HeroSection />
      
      <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          
          {/* Featured Products Section */}
          <div className="mb-16">
            {/* Header with Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full mb-4">
                  <FaFire className="text-orange-500 text-xl" />
                  <span className="font-bold text-indigo-700">FEATURED COLLECTION</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Premium Products <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Curated for You</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl">
                  Handpicked selection of our most popular and high-quality products
                </p>
              </div>
              
              {/* Sort Controls */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaSort className="w-5 h-5" />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300 bg-white appearance-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="featured">Featured First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl shadow-xl border border-indigo-100 p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-6"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Loading Premium Products</h3>
                <p className="text-gray-600">Fetching our curated collection...</p>
              </div>
            ) : productCount > 0 ? (
              <>
                {/* Featured Products Grid */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredDisplay.map((product) => (
                      <div key={product._id} className="group transform hover:-translate-y-2 transition-all duration-300">
                        <div className="relative">
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                              Featured
                            </span>
                          </div>
                          <ProductCard product={product} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Products Section */}
                {sortedProducts.length > 4 && (
                  <div className="mt-16 pt-12 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">All Products</h3>
                        <p className="text-gray-600">
                          Explore our complete collection of {productCount} premium items
                        </p>
                      </div>
                      <Link 
                        to="/products"
                        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold group"
                      >
                        <span>View All Products</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {sortedProducts.slice(4, 8).map((product) => (
                        <div key={product._id} className="transform hover:-translate-y-2 transition-all duration-300">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results Summary */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Product Collection Summary</h4>
                        <p className="text-gray-600">
                          Showing <span className="font-bold text-indigo-600">{Math.min(8, productCount)}</span> of {productCount} premium products
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2 bg-white rounded-xl border border-indigo-200">
                          <span className="font-bold text-indigo-600">{productCount}</span>
                          <span className="text-gray-600 ml-2">Total Items</span>
                        </div>
                        <Link 
                          to="/products"
                          className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                          <span>Browse Full Catalog</span>
                          <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 p-12 text-center">
                <div className="w-24 h-24 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                  <FaStar className="text-4xl text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Premium Collection Coming Soon
                </h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                  Our featured products collection is currently being curated. We're adding amazing products that you'll love.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/products"
                    className="inline-flex items-center justify-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span>Browse All Products</span>
                    <FaArrowRight />
                  </Link>
                  <Link 
                    to="/signup"
                    className="inline-flex items-center justify-center gap-3 bg-white text-indigo-600 border-2 border-indigo-200 hover:border-indigo-300 font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <span>Join for Updates</span>
                    <FaStar />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Benefits Banner */}
          <div className="mt-16">
            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">
                    Why Choose <span className="text-yellow-300">MarVista?</span>
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2"></div>
                      <p className="text-indigo-100 leading-relaxed">
                        Quickly discover new market arrivals and trending products
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2"></div>
                      <p className="text-indigo-100 leading-relaxed">
                        Stay updated with real-time market information and inventory
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2"></div>
                      <p className="text-indigo-100 leading-relaxed">
                        Promote products effectively with smart market insights
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/products"
                    className="inline-flex items-center justify-center gap-3 bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span>Start Exploring</span>
                    <FaArrowRight />
                  </Link>
                  <Link 
                    to="/signup"
                    className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all duration-300"
                  >
                    <span>Create Account</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Smart Shopping <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Benefits</span>
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Experience the future of market shopping with our innovative features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`bg-linear-to-br ${feature.linear} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;