import { create } from 'zustand';

export const useProductStore = create((set, get) => ({ // Add 'get' parameter
    products: [],
    filteredProducts: [], // Add this state
    
    setProducts: (products) => set({ products, filteredProducts: products }), // Update this
    
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please provide all required fields." };
        }
        
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });
            
            const data = await res.json();
            
            if (!res.ok) {
                return { success: false, message: data.message || 'Failed to create product' };
            }
            
            set((state) => ({ 
                products: [...state.products, data.data],
                filteredProducts: [...state.products, data.data] // Add this
            }));
            return { success: true, message: "Product created successfully!" };
        } catch (error) {
            console.error('Error creating product:', error);
            return { success: false, message: "Network error. Please try again." };
        }
    },
    
    fetchProducts: async () => {
        try {
            const res = await fetch('/api/products');
            
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            
            if (data.success) {
                set({ 
                    products: data.data,
                    filteredProducts: data.data // Add this
                });
            } else {
                set({ 
                    products: [],
                    filteredProducts: [] // Add this
                });
                console.error('API returned error:', data.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            set({ 
                products: [],
                filteredProducts: [] // Add this
            });
        }
    },
    
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: 'DELETE',
            });
            
            const data = await res.json();
            
            if (!res.ok || !data.success) {
                return { success: false, message: data.message || 'Failed to delete product' };
            }
            
            set(state => ({ 
                products: state.products.filter(product => product._id !== pid),
                filteredProducts: state.products.filter(product => product._id !== pid) // Add this
            }));
            
            return { success: true, message: data.message || 'Product deleted successfully' };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, message: "Network error. Please try again." };
        }
    },
    
    updateProduct: async (pid, updatedData) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            
            const data = await res.json();
            
            if (data.success) {
                set(state => ({
                    products: state.products.map(product => 
                        product._id === pid ? { ...product, ...updatedData } : product
                    ),
                    filteredProducts: state.products.map(product => // Add this
                        product._id === pid ? { ...product, ...updatedData } : product
                    )
                }));
                return { success: true, message: data.message || 'Product updated successfully' };
            } else {
                return { success: false, message: data.message || 'Failed to update product' };
            }
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, message: "Network error. Please try again." };
        }
    },

    searchProducts: (searchTerm) => {
        const { products } = get(); // Now get() will work
        
        if (!searchTerm.trim()) {
            set({ filteredProducts: products });
            return;
        }
        
        const term = searchTerm.toLowerCase().trim();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(term) ||
            product.price.toString().includes(term)
        );
        
        set({ filteredProducts: filtered });
    },
    
    clearSearch: () => {
        const { products } = get(); // Now get() will work
        set({ filteredProducts: products });
    }
}));