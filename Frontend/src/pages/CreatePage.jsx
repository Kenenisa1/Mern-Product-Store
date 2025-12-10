import { useState } from 'react';
import { FaBookMedical } from 'react-icons/fa';
import { useProductStore } from '../Store/product'; 
import { styles } from '../styles'; 
import toast from 'react-hot-toast';

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });
    
    const { createProduct } = useProductStore();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev, 
            [name]: value 
        }));
    }

    const handleAddProduct = async (e) => {
        e.preventDefault(); 
        
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        // Validate price is a positive number
        if (parseFloat(newProduct.price) <= 0) {
            toast.error("Price must be greater than 0.");
            return;
        }

        try {
            const { success, message } = await createProduct(newProduct);
            
            if (!success) {
                toast.error(message);
            } else {
                toast.success(message);
                setNewProduct({ name: "", price: "", image: "" });
            }
        } catch (error) {
            console.error("API call failed:", error);
            toast.error("An unexpected error occurred during creation.");
        }
    };

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
                
                <form onSubmit={handleAddProduct} className='space-y-6'>
                    
                    <div>
                        <label htmlFor="name" className={styles.inputLabel}>
                            Book Title
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name" 
                            placeholder="e.g., The MERN Stack Guide"
                            onChange={handleChange}
                            value={newProduct.name}
                            required
                            className={styles.input}
                        />
                    </div>
                        
                    <div>
                        <label htmlFor="price" className={styles.inputLabel}>
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price" 
                            placeholder="e.g., 29.99"
                            onChange={handleChange}
                            value={newProduct.price}
                            required
                            min="0.01"
                            step="0.01"
                            className={styles.input}
                        />
                        <p className={styles.inputHelper}>
                            Enter price in USD. Minimum $0.01
                        </p>
                    </div>

                    <div>
                        <label htmlFor="image" className={styles.inputLabel}>
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image" 
                            placeholder="e.g., https://example.com/cover.jpg"
                            onChange={handleChange}
                            value={newProduct.image}
                            required
                            className={styles.input}
                        />
                        <p className={styles.inputHelper}>
                            Enter a valid URL for the product image
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
    )
}

export default CreatePage;