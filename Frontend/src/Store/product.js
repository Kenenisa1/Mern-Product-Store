import { create } from 'zustand';

export const useProductStore = create((set, get) => ({
    products: [],
    featuredProducts: [],
    filteredProducts: [],
    isLoading: false,
    error: null,
    
    fetchProducts: async () => {
        const userStoreModule = await import('./user');
        const userStore = userStoreModule.useUserStore.getState();
        const { user, token } = userStore;
        
        if (!user || !token) {
            return { success: false, message: 'You must be logged in to view products' };
        }

        set({ isLoading: true, error: null });
        
        try {
            const res = await fetch('/api/products', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const data = await res.json();

            if (data.success) {
                const productsArray = data.data || data.products || [];
                set({
                    products: productsArray,
                    filteredProducts: productsArray,
                    isLoading: false,
                    error: null
                });
                return { success: true, products: productsArray };
            }
            
            set({ isLoading: false, error: data.message });
            return { success: false, message: data.message };
            
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: 'Failed to fetch products' };
        }
    },

    fetchFeaturedProducts: async () => {
        set({ isLoading: true, error: null });
        
        try {
            const response = await fetch('/api/products/featured');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            
            if (data.success) {
                const featuredArray = data.data || data.products || [];
                set({ featuredProducts: featuredArray, isLoading: false });
                return { success: true, products: featuredArray };
            }
            
            set({ isLoading: false, error: data.message });
            return { success: false, message: data.message };
            
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: 'Failed to fetch featured products' };
        }
    },
    
    createProduct: async (formData) => {
        const userStoreModule = await import('./user');
        const userStore = userStoreModule.useUserStore.getState();
        const { user, token } = userStore;

        if (!user || !user.isAdmin) {
            return { success: false, message: 'Admin access required' };
        }
        
        if (!token) return { success: false, message: 'Authentication token missing' };
        
        const name = formData.get('name');
        const price = formData.get('price');
        const image = formData.get('image');
        
        if (!name || !price || !image) {
            return { success: false, message: "All fields are required" };
        }

        set({ isLoading: true, error: null });
        
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || `Failed: ${res.status}`);
            if (!data.success) throw new Error(data.message || 'Failed to create product');
            
            const newProduct = data.data || data.product;
            set((state) => ({ 
                products: [...state.products, newProduct],
                filteredProducts: [...state.filteredProducts, newProduct],
                isLoading: false
            }));
            
            return { 
                success: true, 
                message: data.message || "Product created successfully",
                product: newProduct
            };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },
    
    deleteProduct: async (productId) => {
        const userStoreModule = await import('./user');
        const userStore = userStoreModule.useUserStore.getState();
        const { user, token } = userStore;
        
        if (!user || !user.isAdmin) {
            return { success: false, message: 'Admin access required' };
        }
        
        if (!token) return { success: false, message: 'Authentication token missing' };
        
        set({ isLoading: true, error: null });
        
        try {
            const res = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || `Failed: ${res.status}`);
            if (!data.success) throw new Error(data.message || 'Failed to delete product');
            
            set(state => ({ 
                products: state.products.filter(p => p._id !== productId),
                filteredProducts: state.filteredProducts.filter(p => p._id !== productId),
                isLoading: false
            }));
            
            return { success: true, message: data.message || 'Product deleted' };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },
    
    updateProduct: async (productId, updatedData) => {
        const userStoreModule = await import('./user');
        const userStore = userStoreModule.useUserStore.getState();
        const { user, token } = userStore;
        
        if (!user || !user.isAdmin) {
            return { success: false, message: 'Admin access required' };
        }
        
        if (!token) return { success: false, message: 'Authentication token missing' };
        
        set({ isLoading: true, error: null });
        
        try {
            const isFormData = updatedData instanceof FormData;
            const headers = { 'Authorization': `Bearer ${token}` };
            let body;
            
            if (isFormData) {
                body = updatedData;
            } else {
                headers['Content-Type'] = 'application/json';
                body = JSON.stringify(updatedData);
            }
            
            const res = await fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers,
                body
            });
            
            const data = await res.json();
            
            if (!res.ok) throw new Error(data.message || `Failed: ${res.status}`);
            if (!data.success) throw new Error(data.message || 'Failed to update product');
            
            const updatedProduct = data.data || data.product || updatedData;
            
            set(state => ({
                products: state.products.map(p => 
                    p._id === productId ? { ...p, ...updatedProduct } : p
                ),
                filteredProducts: state.filteredProducts.map(p => 
                    p._id === productId ? { ...p, ...updatedProduct } : p
                ),
                isLoading: false
            }));
            
            return { 
                success: true, 
                message: data.message || 'Product updated',
                product: updatedProduct
            };
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },

    searchProducts: (searchTerm) => {
        const { products } = get();
        
        if (!searchTerm.trim()) {
            set({ filteredProducts: products });
            return;
        }
        
        const term = searchTerm.toLowerCase().trim();
        const filtered = products.filter(product => 
            product.name?.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term) ||
            product.price?.toString().includes(term) ||
            product.category?.toLowerCase().includes(term)
        );
        
        set({ filteredProducts: filtered });
    },
    
    clearSearch: () => {
        const { products } = get();
        set({ filteredProducts: products });
    },

    getProductById: (id) => {
        const { products } = get();
        return products.find(product => product._id === id);
    },

    fetchProductById: async (productId) => {
        set({ isLoading: true, error: null });
        
        try {
            const res = await fetch(`/api/products/${productId}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            
            const data = await res.json();
            
            if (data.success) {
                return { success: true, product: data.data || data.product };
            }
            
            set({ isLoading: false, error: data.message });
            return { success: false, message: data.message };
            
        } catch (error) {
            set({ isLoading: false, error: error.message });
            return { success: false, message: 'Failed to fetch product' };
        }
    },

    getProductsByCategory: (category) => {
        const { products } = get();
        return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    },

    sortProducts: (sortBy = 'name', order = 'asc') => {
        const { filteredProducts } = get();
        
        const sorted = [...filteredProducts].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            
            if (sortBy === 'price') {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
            }
            
            if (order === 'asc') return aValue > bValue ? 1 : -1;
            return aValue < bValue ? 1 : -1;
        });
        
        set({ filteredProducts: sorted });
    },

    resetProducts: () => {
        set({ 
            products: [], 
            featuredProducts: [], 
            filteredProducts: [], 
            isLoading: false, 
            error: null 
        });
    },

    clearError: () => set({ error: null }),

    setProducts: (products) => {
        set({ products, filteredProducts: products });
    }
}));