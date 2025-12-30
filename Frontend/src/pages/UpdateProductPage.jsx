import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTimes } from "react-icons/fa";
import { useProductStore } from "../Store/product";
import toast from "react-hot-toast";

const UpdateProduct = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { updateProduct, isLoading } = useProductStore();
  
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
    category: product.category || "",
    countInStock: product.countInStock || "",
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.image || "");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SIMPLE: Handle file selection from computer
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Quick validation
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (JPG, PNG, etc.)");
      return;
    }

    setImageFile(file);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Open file browser
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(product.image || ""); // Reset to original
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updateData;

      // If user selected a new image, use FormData
      if (imageFile) {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("price", formData.price);
        formDataObj.append("description", formData.description || "");
        formDataObj.append("category", formData.category || "");
        formDataObj.append("countInStock", formData.countInStock || "");
        formDataObj.append("image", imageFile); // ACTUAL FILE, not URL
        updateData = formDataObj;
      } else {
        // No new image, just update other fields
        updateData = {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          category: formData.category,
          countInStock: formData.countInStock,
        };
      }

      const result = await updateProduct(product._id, updateData);

      if (result.success) {
        toast.success("Product updated successfully!");
        if (onClose) onClose();
        navigate("/products");
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating product");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            step="0.01"
            min="0"
          />
        </div>

        {/* Image Upload - SIMPLE VERSION */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Image</label>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {/* Current/Preview Image */}
          {imagePreview && (
            <div className="mb-3">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="h-32 object-contain mx-auto mb-2 border rounded"
              />
            </div>
          )}
          
          {/* Upload Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleBrowseClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <FaUpload /> 
              {imageFile ? "Change Image" : "Browse from Computer"}
            </button>
            
            {imageFile && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTimes /> Remove
              </button>
            )}
          </div>
          
          {imageFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {imageFile.name}
            </p>
          )}
          
          <p className="text-xs text-gray-500 mt-1">
            {!imageFile ? "Leave empty to keep current image" : "New image will replace current one"}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;