import { useState, useRef, useEffect } from "react";
import { FaBookMedical, FaUpload, FaImage, FaTimes } from "react-icons/fa";
import { useProductStore } from "../Store/product";
import { useUserStore } from "../Store/user";
import { styles } from "../styles";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();
  const { user, token } = useUserStore();
  const { createProduct, isLoading: isCreating } = useProductStore();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Check if user is admin
  useEffect(() => {
    if (!user || !token) {
      toast.error("Please login first");
      navigate("/signin");
      return;
    }
    
    if (user.isAdmin !== true) {
      toast.error("Admin access required");
      navigate("/");
    }
  }, [user, token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, GIF, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB!");
      return;
    }

    setImageFile(file);

    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.price || !imageFile) {
      toast.error("Please fill in all required fields and select an image!");
      return;
    }

    // Validate price
    if (parseFloat(formData.price) <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    // Validate stock
    if (formData.countInStock && parseInt(formData.countInStock) < 0) {
      toast.error("Stock cannot be negative.");
      return;
    }

    setUploading(true);

    try {
      // Create FormData for file upload
      const productFormData = new FormData();
      
      // Append text fields
      productFormData.append("name", formData.name);
      productFormData.append("price", formData.price);
      if (formData.description) {
        productFormData.append("description", formData.description);
      }
      if (formData.category) {
        productFormData.append("category", formData.category);
      }
      if (formData.countInStock) {
        productFormData.append("countInStock", formData.countInStock);
      }
      
      // Append image file
      productFormData.append("image", imageFile);
      
      // Call createProduct with FormData
      const result = await createProduct(productFormData);
      
      if (result.success) {
        toast.success(result.message || "Product created successfully!");
        
        // Reset form
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          countInStock: "",
        });
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        
        // Optionally navigate to products page
        // navigate("/products");
      } else {
        toast.error(result.message || "Failed to create product.");
      }
    } catch (error) {
      console.error("Create product error:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setUploading(false);
    }
  };

  if (!user || user.isAdmin !== true) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">Admin privileges required to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.containerNarrow} ${styles.flexCenter} min-h-screen ${styles.sectionPadding} ${styles.bgGradientPrimary}`}>
      <div className={`${styles.formContainer} w-full`}>
        <div className={`${styles.flexCenter} flex-col mb-8`}>
          <FaBookMedical className={`${styles.iconXl} text-indigo-600 mb-4 ${styles.hoverScale}`} />
          <h1 className={`${styles.h2} ${styles.gradientText} mb-2`}>
            Add New Product
          </h1>
          <p className={`${styles.subtitle} text-center`}>
            Enter the details for the new product entry.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className={styles.inputLabel}>
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Wireless Headphones"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
              disabled={uploading || isCreating}
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className={styles.inputLabel}>
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g., 99.99"
              value={formData.price}
              onChange={handleChange}
              required
              min="1"
              step="1"
              className={styles.input}
              disabled={uploading || isCreating}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={styles.inputLabel}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Product description..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={styles.input}
              disabled={uploading || isCreating}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className={styles.inputLabel}>
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="e.g., Electronics, Clothing"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              disabled={uploading || isCreating}
            />
          </div>


          {/* Image Upload */}
          <div>
            <label className={styles.inputLabel}>
              Product Image *
            </label>
            
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={uploading || isCreating}
            />

            {/* Upload Area */}
            <div className="mt-2">
              {!imagePreview ? (
                // Upload prompt
                <div
                  onClick={handleUploadClick}
                  className={`border-2 border-dashed border-gray-300 ${styles.roundedLg} p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 ${
                    uploading || isCreating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={{ pointerEvents: uploading || isCreating ? "none" : "auto" }}
                >
                  <div className={`${styles.flexCenter} flex-col`}>
                    <FaUpload className={`${styles.iconXl} text-gray-400 mb-4`} />
                    <p className="text-gray-600 font-medium mb-1">
                      Click to upload product image
                    </p>
                    <p className={`${styles.small} text-gray-500`}>
                      Supports JPG, PNG, GIF up to 5MB
                    </p>
                    <button
                      type="button"
                      className={`${styles.secondaryButton} mt-4 px-4 py-2`}
                      disabled={uploading || isCreating}
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              ) : (
                // Image Preview
                <div className={`${styles.card} p-4 ${uploading || isCreating ? "opacity-70" : ""}`}>
                  <div className={`${styles.flexBetween} mb-3`}>
                    <div className={`${styles.flexStart}`}>
                      <FaImage className={`${styles.iconMd} text-indigo-600 mr-2`} />
                      <span className="font-medium text-gray-900">
                        Selected Image
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className={`${styles.ghostButton} text-red-600 hover:text-red-700`}
                      disabled={uploading || isCreating}
                    >
                      <FaTimes className="mr-1" /> Remove
                    </button>
                  </div>

                  <div className={`${styles.flexCenter} mb-4`}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 max-w-full object-contain rounded-lg"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className={`${styles.secondaryButton} px-4 py-2`}
                      disabled={uploading || isCreating}
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {imageFile && (
              <p className={`${styles.small} mt-2 text-gray-600`}>
                Selected file: {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className={`${styles.primaryButton} w-full h-12 text-base ${
                uploading || isCreating ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={uploading || isCreating}
            >
              {uploading || isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {uploading ? "Uploading..." : "Creating Product..."}
                </>
              ) : (
                <>
                  <FaBookMedical className={`${styles.iconMd} mr-2`} />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;