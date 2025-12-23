import { styles } from "../styles";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdClose, MdWarning } from "react-icons/md";
import { useProductStore } from "../Store/product";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
  const formattedPrice = product.price
    ? `$${parseFloat(product.price).toFixed(2)}`
    : "$0.00";

  const { deleteProduct, updateProduct } = useProductStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Initialize form with product data when editing starts
  useEffect(() => {
    if (isEditing) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        image: product.image || "",
      });
    }
  }, [isEditing, product]);

  const handleDeleteClick = () => {
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

  const handleEditClick = () => {
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

    // Validate form
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

  return (
    <>
      {/* Edit Form Modal/Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-slideUp">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Edit Product
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  disabled={isLoading}
                >
                  <MdClose className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Enter product name"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Enter price"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    placeholder="Enter image URL"
                    disabled={isLoading}
                    required
                  />
                  {formData.image && (
                    <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-20 object-contain mx-auto"
                        onError={(e) =>
                          (e.target.src =
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e")
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className={`${styles.secondaryButton} px-6 py-2`}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.primaryButton} px-6 py-2 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
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

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-slideUp">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MdWarning className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Delete Product
                    </h2>
                    <p className="text-gray-600 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCancelDelete}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <MdClose className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Confirmation Message */}
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    "{product.name}"
                  </span>
                  ? This will permanently remove the product from your store.
                </p>
                
                {/* Product Preview */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white rounded-lg border border-gray-300 overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-lg font-bold text-gray-900">{formattedPrice}</p>
                      <p className="text-xs text-gray-500 mt-1">ID: {product._id?.substring(0, 8)}...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className={`${styles.secondaryButton} px-6 py-2`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className={`flex items-center justify-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg`}
                >
                  <MdDelete className="w-4 h-4 mr-2" />
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Card (Original) */}
      <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200">
        {/* Product Image Container */}
        <div className="relative h-64 bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
            }}
          />
        </div>

        {/* Product Information Section */}
        <div className="p-5 justify-center items-center text-center">
          {/* Product Name */}
          <h2 className="text-lg text-center font-semibold text-gray-800 mb-2 line-clamp-2 min-h-12">
            {product.name}
          </h2>

          {/* Product Price */}
          <p className="text-2xl font-bold text-gray-900 mb-6">
            {formattedPrice}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            {/* Edit Button */}
            <button
              className={`
                ${styles.secondaryButton}
                flex items-center space-x-1
                text-gray-600
                border border-gray-300 hover:border-indigo-400
                cursor-pointer hover:text-white
                transition-all duration-300
                min-w-[100px]
              `}
              onClick={handleEditClick}
            >
              <FaRegEdit className={styles.iconSize} />
              <span className="text-sm font-medium">Edit</span>
            </button>

            {/* Delete Button */}
            <button
              className={`
                flex items-center justify-center space-x-1
                px-4 py-2
                bg-red-600 hover:bg-red-700
                text-white font-medium
                rounded-lg
                transition-all duration-300
                cursor-pointer
                min-w-[100px]
              `}
              onClick={handleDeleteClick}
            >
              <MdDelete className="w-4 h-4" />
              <span className="text-sm font-medium">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;