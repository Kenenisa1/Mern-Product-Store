import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
    user: null,
    token: null,
    users: [],
    loading: false,
    error: null,

    signup: async (userData) => {
        set({ loading: true, error: null });
        
        try {
            const res = await fetch('/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Signup failed');
            }

            // IMPORTANT: Don't set user or token here
            // Don't save to localStorage
            // Just return success
            set({ 
                loading: false,
                error: null
            });
            
            return { 
                success: true, 
                message: data.message || 'Signup successful',
                user: data.user, // Return user data but don't store it
                token: data.token // Return token but don't store it
            };
            
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },

    signin: async (credentials) => {
        set({ loading: true, error: null });
        
        try {
            const res = await fetch('/api/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Invalid email or password');
            }

            // ONLY set user and token here (on signin)
            set({ 
                user: data.user,
                token: data.token,
                loading: false,
                error: null
            });

            // Only save to localStorage on signin
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            
            return { 
                success: true, 
                message: data.message || 'Login successful',
                user: data.user,
                token: data.token
            };
            
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    },

    signout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, error: null });
        return { success: true, message: 'Logged out successfully' };
    },

    initializeAuth: () => {
        try {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');
            
            if (token && userStr) {
                const user = JSON.parse(userStr);
                set({ user: user, token: token });
            }
        } catch {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },

    clearError: () => set({ error: null }),

    isLoggedIn: () => {
        const { user, token } = get();
        return !!(user && token);
    },

    getCurrentUser: () => get().user,

    getToken: () => get().token,

    updateProfile: async (userData) => {
        const { token } = get();
        if (!token) return { success: false, message: 'Not authenticated' };

        set({ loading: true, error: null });
        
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            const data = await res.json();
            
            if (!res.ok || !data.success) {
                throw new Error(data.message || 'Update failed');
            }

            set({ user: data.user, loading: false });
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return { 
                success: true, 
                message: data.message || 'Profile updated',
                user: data.user
            };
        } catch (error) {
            set({ loading: false, error: error.message });
            return { success: false, message: error.message };
        }
    }
}));