import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaStar,
  FaTag,
  FaClock
} from "react-icons/fa";

import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const BACKEND_URL = "http://localhost:5000"; 

  // Format price in ETB
  const formatPriceETB = (price) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return "ETB 0.00";
    
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numPrice);
  };

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      
      if (data.success) {
        setProduct(data.data || data.product);
      } else {
        toast.error(data.message || 'Product not found');
        navigate('/products');
      }
    } catch (error) {
      toast.error('Failed to load product');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const checkIfSaved = useCallback(() => {
    const savedItems = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    setSaved(savedItems.includes(id));
  }, [id]);

  useEffect(() => {
    fetchProduct();
    checkIfSaved();
  }, [fetchProduct, checkIfSaved]);

  const handleSaveForLater = () => {
    const savedItems = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    
    if (saved) {
      const updated = savedItems.filter(item => item !== id);
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      setSaved(false);
      toast.success('Removed from saved list');
    } else {
      savedItems.push(id);
      localStorage.setItem('savedProducts', JSON.stringify(savedItems));
      setSaved(true);
      toast.success('Saved for market visit!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <FaArrowLeft className="inline mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const mainImageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${BACKEND_URL}${product.image}`;

  const productImages = [
    mainImageUrl,
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white"> {/* FIX: linear */}
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer text-gray-600 hover:text-gray-900 transition"
        >
          <FaArrowLeft className="mr-2" />
          Back to Products
        </button>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="rounded-3xl overflow-hidden shadow-2xl mb-6 flex justify-center items-center bg-gray-100">
              <img
                src={productImages[imageIndex]}
                alt={product.name}
                className="w-full max-w-lg h-auto object-contain p-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/600x400/cccccc/969696?text=Image+Not+Found";
                }}
              />
            </div>
            
            {/* Image Thumbnails */}
            <div className="flex gap-4">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all duration-200 ${
                    imageIndex === idx 
                      ? 'border-indigo-500 scale-105' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/100x100/cccccc/969696?text=Thumb";
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium flex items-center">
                  <FaTag className="mr-1" />
                  {product.category || "General"}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* ADDED: Price Display */}
              <div className="mb-6">
                <p className="text-5xl font-bold text-indigo-600">
                  {formatPriceETB(product.price)}
                </p>
                <p className="text-lg text-gray-500 line-through mt-1">
                  {formatPriceETB(product.price * 1.2)}
                </p>
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold mt-2">
                  20% OFF
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Easy to Use & Maintain",
                  "24/7 Customer Support",
                  "Eco-Friendly Packaging",
                  "Fast Delivery Available"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleSaveForLater}
                className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center" // FIX: linear
              >
                <FaShoppingCart className="mr-3 text-xl" />
                {saved ? 'Remove from Saved List' : 'Save for Market Visit'}
              </button>

            </div>

            {/* Product Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow">
                  <FaClock className="text-indigo-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Delivery</p>
                  <p className="font-bold">2-3 Days</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow">
                  <FaTag className="text-green-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-500">SKU</p>
                  <p className="font-bold">MK-{id.substring(0, 8)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow">
                  <FaStar className="text-yellow-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-bold">4.5/5.0</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow">
                  <FaShoppingCart className="text-red-600 text-2xl mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Sold</p>
                  <p className="font-bold">500+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;