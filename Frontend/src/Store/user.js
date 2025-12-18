import { create } from 'zustand';
const AUTH_SECRET = import.meta.env.VITE_AUTH_SECRET;

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
                    'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${AUTH_SECRET}`
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
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${AUTH_SECRET}`
                },
                body: JSON.stringify(credentials)
            });

            const data = await res.json();
            console.log('Signin response:', data); // Debug
            
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Invalid email or password');
            }


            set({ 
                user: data.data, 
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