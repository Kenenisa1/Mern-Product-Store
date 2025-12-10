import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, Loader2 } from 'lucide-react'; 

const useUserStore = () => {
    const mockSignup = async (formData) => {
        console.log("Mock Signup Attempt:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return { success: true, message: "Welcome aboard!" };
    };
    return { signup: mockSignup };
};

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const { signup } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const result = await signup(formData);
            
            if (result.success) {
                toast.success('Account created successfully!');
                setFormData({ username: '', email: '', password: '' });
                // navigate('/');
            } else {
                toast.error(result.message || 'Signup failed due to server error.');
            }
        } catch (error) {
            console.error("Signup API failed:", error);
            toast.error('An unexpected network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const baseInputStyle = "w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200";
    const primaryButton = "flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed h-12";
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
                    
                    <div className="text-center mb-10">
                        <UserPlus className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            Create Your Account
                        </h1>
                        <p className="text-base text-gray-500 mt-2">
                            Join our product store community in seconds.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={baseInputStyle}
                                placeholder="Choose a unique username"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={baseInputStyle}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={baseInputStyle}
                                placeholder="Enter your password (min 6 characters)"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Must be at least 6 characters long
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`${primaryButton} w-full`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-3" /> 
                                    Creating Account...
                                </>
                            ) : 'Create Account'}
                        </button>

                        <div className="text-center pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500 mb-2">
                                By creating an account, you agree to our Terms of Service.
                            </p>
                            <p className="text-sm">
                                Already have an account? 
                                <span 
                                    onClick={() => navigate('/signin')}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium ml-1 cursor-pointer transition duration-150"
                                >
                                    Sign In here
                                </span>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;