import { useState, useRef } from "react";
import { FaBookMedical, FaUpload } from "react-icons/fa";
import { useProductStore } from "../Store/product";
import { styles } from "../styles";
import toast from "react-hot-toast";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { createProduct } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valide image file!");
      return;
    }

    // validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB!");
      return;
    }

    setImageFile(file);

    // create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // remove selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = " ";
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.name || !newProduct.price || !imageFile) {
      toast.error(
        "Please fill in all the required fields and select an image!"
      );
      return;
    }

    // Validate price is a positive number
    if (parseFloat(newProduct.price) <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("image", imageFile);

      const [success, message] = await createProduct(formData);
      if (!success) {
        toast.error(message);
      }
       else {
        toast.success(message);
        setNewProduct({ name: "", price: "" });
        setImageFile(null);
        setImagePreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }

    }
     catch (error) {
      console.error("API call failed:", error);
      toast.error("An unexpected error occurred during creation.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`${styles.containerNarrow} ${styles.flexCenter} min-h-screen ${styles.sectionPadding} ${styles.bgGradientPrimary}`}
    >
      <div className={`${styles.formContainer} w-full`}>
        <div className={`${styles.flexCenter} flex-col mb-8`}>
          <FaBookMedical
            className={`${styles.iconXl} text-indigo-600 mb-4 ${styles.hoverScale}`}
          />
          <h1 className={`${styles.h2} ${styles.gradientText} mb-2`}>
            Add New Product
          </h1>
          <p className={`${styles.subtitle} text-center`}>
            Enter the details for the new product entry.
          </p>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-6">
          <div>
            <label htmlFor="name" className={styles.inputLabel}>
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g., Earphone"
              onChange={handleChange}
              value={newProduct.name}
              required
              className={styles.input}
              disabled={isUploading}
            />
          </div>

          <div>
            <label htmlFor="price" className={styles.inputLabel}>
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="e.g 5"
              onChange={handleChange}
              value={newProduct.price}
              required
              min="0.01"
              step="0.01"
              className={styles.input}
              disabled={isUploading}
            />
          </div>

          <div>
            <label className={styles.inputLabel}>Product Image *</label>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              disabled={isUploading}
            />

            {/* Upload Area */}
            <div className="mt-2">
              {!imagePreview ? (
                // Upload prompt
                <div
                  onClick={handleUploadClick}
                  className={`border-2 border-dashed border-gray-300 ${
                    styles.roundedLg
                  } p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <div className={`${styles.flexCenter} flex-col`}>
                    <FaUpload
                      className={`${styles.iconXl} text-gray-400 mb-4`}
                    />
                    <p className="text-gray-600 font-medium mb-1">
                      Click to upload product image
                    </p>
                    <p className={`${styles.small} text-gray-500`}>
                      Supports JPG, PNG, GIF up to 5MB
                    </p>
                    <button
                      type="button"
                      className={`${styles.secondaryButton} mt-4 px-4 py-2`}
                      disabled={isUploading}
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              ) : (
                // Image Preview
                <div
                  className={`${styles.card} p-4 ${
                    isUploading ? "opacity-70" : ""
                  }`}
                >
                  <div className={`${styles.flexBetween} mb-3`}>
                    <div className={`${styles.flexStart}`}>
                      <FaImage
                        className={`${styles.iconMd} text-indigo-600 mr-2`}
                      />
                      <span className="font-medium text-gray-900">
                        Selected Image
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className={`${styles.ghostButton} text-red-600 hover:text-red-700`}
                      disabled={isUploading}
                    >
                      Remove
                    </button>
                  </div>

                  <div className={`${styles.flexCenter} mb-4`}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 object-contain rounded-lg"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className={`${styles.secondaryButton} px-4 py-2`}
                      disabled={isUploading}
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className={`${styles.inputHelper} mt-2`}>
              Required. Maximum file size: 5MB
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className={`${styles.primaryButton} w-full h-12 text-base`}
            >
              <FaBookMedical className={`${styles.iconMd} mr-2`} />
              <span>Publish Product</span>
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className={`${styles.small} text-center`}>
              Need help?{" "}
              <a href="#" className={styles.primaryLink}>
                View product guidelines
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
