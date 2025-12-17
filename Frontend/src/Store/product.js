import { create } from 'zustand';

const AUTH_SECRET = import.meta.env.VITE_AUTH_SECRET;
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
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${AUTH_SECRET}`
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
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${AUTH_SECRET}`
                }
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
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${AUTH_SECRET}`
                 },
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
    },

}));

export const useUserStore = create((set, get) => ({
    user: null,
    users: [],
    loading: false,
    error: null,

    // Signup function
    signup: async (userData) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            set({ 
                user: data.data, // Your backend returns data directly, not data.data.user
                loading: false,
                error: null
            });
            
            // Also add to users list if needed
            set(state => ({
                users: [...state.users, data.data]
            }));
            
            return { 
                success: true, 
                message: 'Signup successful',
                data: data.data
            };
            
        } catch (error) {
            set({ 
                loading: false, 
                error: error.message 
            });
            return { 
                success: false, 
                message: error.message 
            };
        }
    },

    // Signin function
    signin: async (credentials) => {
        set({ loading: true, error: null });
        console.log('Signin attempt:', credentials); // Debug
        
        try {
            const res = await fetch('/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const data = await res.json();
            console.log('Signin response:', data); // Debug
            
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Invalid email or password');
            }

            // Store user data (no token)
            set({ 
                user: data.data, // Just store the user data directly
                loading: false,
                error: null
            });
            
            return { 
                success: true, 
                message: 'Login successful',
                data: data.data
            };
            
        } catch (error) {
            console.error('Signin error:', error.message);
            set({ 
                loading: false, 
                error: error.message 
            });
            return { 
                success: false, 
                message: error.message 
            };
        }
    },
    // Signout function
    signout: () => {
        set({ 
            user: null,
            error: null
        });
        return { success: true, message: 'Logged out successfully' };
    },

    // Clear error
    clearError: () => set({ error: null }),

    // Check if user is logged in
    isLoggedIn: () => {
        const { user } = get();
        return !!user;
    }
}));