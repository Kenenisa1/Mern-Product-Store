import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn, Loader2 } from 'lucide-react'; 

const useUserStore = () => {
    const mockSignin = async (formData) => {
        console.log("Mock Signin Attempt:", formData);
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        if (formData.email === "test@example.com" && formData.password === "password") {
            return { success: true, message: "Welcome back!" };
        }
        return { success: false, message: "Invalid email or password." };
    };
    return { signin: mockSignin };
};

const styles = {
    flexCenter: "flex items-center justify-center",
    container: "w-full max-w-md",
    form: "bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100",
    header: "text-3xl font-extrabold text-gray-900",
    subHeader: "text-base text-gray-500 mt-2",
    input: "w-full p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200",
    primaryButton: "flex items-center text-white bg-indigo-600 hover:bg-indigo-700 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed",
    secondaryButton: "flex items-center justify-center text-indigo-600 bg-gray-100 hover:bg-gray-200 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out",
};

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const { signin } = useUserStore();
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

        if (!formData.email.trim() || !formData.password.trim()) {
            toast.error('Please fill in all fields');
            setLoading(false);
            return;
        }

        try {
            const result = await signin(formData);
            
            if (result.success) {
                toast.success('Welcome back!');
                // navigate('/');
            } else {
                toast.error(result.message || 'Sign in failed');
            }
        } catch (error) {
            console.error("Signin API failed:", error);
            toast.error('An unexpected network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen ${styles.flexCenter} bg-gray-50 p-4 sm:p-6 lg:p-8`}>
            <div className={styles.container}>
                <div className={`${styles.flexCenter}`}>
                    <div className={`${styles.form} max-w-md w-full`}>
                        
                        <div className="text-center mb-8">
                            <LogIn className="w-10 h-10 mx-auto text-indigo-600 mb-4" />
                            <h1 className={styles.header}>
                                Welcome Back
                            </h1>
                            <p className={styles.subHeader}>
                                Sign in to your account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Enter your email"
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
                                    className={styles.input}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                
                                <button
                                    type="button"
                                    className="text-sm text-indigo-600 hover:text-indigo-800"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${styles.primaryButton} w-full justify-center py-3 px-4`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2 text-white" />
                                        Signing In...
                                    </>
                                ) : 'Sign In'}
                            </button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => navigate('/signup')}
                                    className={`${styles.secondaryButton} w-full justify-center py-3 px-4`}
                                >
                                    Create New Account
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;