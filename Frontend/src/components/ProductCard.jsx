import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit, FaEye } from "react-icons/fa";
import { MdDelete, MdClose, MdWarning } from "react-icons/md";
import { useProductStore } from "../Store/product";
import { useUserStore } from "../Store/user";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const BACKEND_URL = "http://localhost:5000";
  const { user } = useUserStore();
  const { deleteProduct, updateProduct } = useProductStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

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

  const formattedPrice = formatPriceETB(product.price);

  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
      });
    }
  }, [isEditing, product]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const handleConfirmDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
    setIsDeleting(false);
    
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.image.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { success, message } = await updateProduct(product._id, formData);
      if (success) {
        toast.success(message || "Product updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(message || "Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove console.log in production
  console.log('Product Image URL:', product.image);
  console.log('Product Data:', product);

  return (
    <>
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-2">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Product
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  disabled={isLoading}
                >
                  <MdClose className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                    placeholder="Enter product name"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (ETB)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ETB
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder="0.00"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
{/* 
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200"
                    disabled={isLoading}
                    required
                  />
                  {formData.image && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-24 w-full object-contain rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/300x200/cccccc/969696?text=No+Image";
                        }}
                      />
                    </div>
                  )}
                </div> */}

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-2 border-b-2 border-white "></div>
                        Updating...
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-50 rounded-xl">
                  <MdWarning className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Delete Product
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    "{product.name}"
                  </span>
                  ? This product will be permanently removed.
                </p>
                
                <div className="p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-lg border border-gray-300 overflow-hidden shrink-0">
                      <img
                        src={product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/100x100/cccccc/969696?text=Image";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                      <p className="text-xl font-bold text-gray-900 mt-1">{formattedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  onClick={handleCancelDelete}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 bg-linear-to-r from-red-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 flex items-center"
                >
                  <MdDelete className="w-4 h-4 mr-2" />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Link to={`/product/${product._id}`} className="block group">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden h-full">
          
          <div className="relative h-64 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
            <img
              src={product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`}
              alt={product.name}
              className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300/cccccc/969696?text=Image+Not+Found";
              }}
            />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full shadow-sm">
                {product.category || "General"}
              </span>
            </div>

            {user?.isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleEditClick}
                  className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  title="Edit Product"
                >
                  <FaRegEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  title="Delete Product"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-14">
              {product.name}
            </h3>

            <div className="mb-1">
              <p className="text-2xl font-bold text-gray-900">
                {formattedPrice}
              </p>
              <p className="text-sm text-gray-500 line-through mt-1">
                {formatPriceETB(product.price * 1.2)}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;