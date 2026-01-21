import { useProductStore } from "../Store/product";
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { Link } from "react-router";

const Products = () => {
  const { fetchProducts, products, searchProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing & Fashion' },
    { id: 'books', name: 'Books & Stationery' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'sports', name: 'Sports & Fitness' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'wearable', name: 'Wearable Tech' }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    searchProducts(value);
  };

  const categoryFiltered = selectedCategory === 'all' 
    ? products 
    : products.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  const searchFiltered = searchTerm 
    ? categoryFiltered.filter(product => 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categoryFiltered;

  const productCount = searchFiltered.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Our <span className="text-yellow-300">Premium</span> Products
            </h1>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Browse through our curated collection of high-quality products from trusted suppliers
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8">
        <div className="relative">
          {/* Search and Filter Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-indigo-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search Bar */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaSearch className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300"
                    placeholder="Search products by name, description, or category..."
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaFilter className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300 appearance-none bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || searchTerm) && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">Active Filters:</span>
                  
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                      <span>Category: {categories.find(c => c.id === selectedCategory)?.name}</span>
                      <button 
                        onClick={() => setSelectedCategory('all')}
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  
                  {searchTerm && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm">
                      <span>Search: "{searchTerm}"</span>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  
                  {(selectedCategory !== 'all' || searchTerm) && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                      }}
                      className="ml-auto text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-bold text-indigo-600">{productCount}</span> products
                {selectedCategory !== 'all' && (
                  <span> in <span className="font-semibold">{categories.find(c => c.id === selectedCategory)?.name}</span></span>
                )}
              </div>
              
              <div className="text-sm text-gray-600">
                Total: <span className="font-bold">{products.length}</span> products
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
          ) : productCount > 0 ? (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchFiltered.map((product) => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-all duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Summary Banner */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Found {productCount} products matching your criteria
                    </h3>
                    <p className="text-gray-600">
                      {selectedCategory !== 'all' 
                        ? `All products in ${categories.find(c => c.id === selectedCategory)?.name} category`
                        : "Browse through all our premium products"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl shadow-xl p-12 border border-indigo-100">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaSearch className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'No Products Found' 
                    : 'No Products Available'
                  }
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {searchTerm 
                    ? `We couldn't find any products matching "${searchTerm}". Try different keywords or browse all products.`
                    : selectedCategory !== 'all'
                    ? `There are currently no products available in the ${categories.find(c => c.id === selectedCategory)?.name} category.`
                    : "Our product collection is currently being updated. Please check back soon for new arrivals."
                  }
                </p>
                
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    View All Products
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CTA Banner */}
          {!loading && productCount > 0 && (
            <div className="mt-16">
              <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="md:max-w-lg">
                    <h3 className="text-2xl font-bold mb-3">Stay Updated with New Arrivals</h3>
                    <p className="text-indigo-100 leading-relaxed">
                      Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
                    </p>
                  </div>
                  <Link
                    to="/signup"
                    className="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 whitespace-nowrap"
                  >
                    Join Newsletter
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;