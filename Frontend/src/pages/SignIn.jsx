import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../Store/user";
import toast from "react-hot-toast";
import {
  FaSignInAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";
import { MdOutlineSecurity, MdEmail } from "react-icons/md";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { signin } = useUserStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await signin(formData);

      if (result.success) {
        toast.success("Welcome back! Successfully signed in.");
        navigate("/");
      } else {
        toast.error(
          result.message || "Sign in failed. Please check your credentials.",
        );
      }
      console.log("SignIn - Result:", result);

      // Check what classes are on body/html
      console.log("HTML Classes:", document.documentElement.className);
      console.log("Body Classes:", document.body.className);

      // Check localStorage
      console.log("LocalStorage theme:", localStorage.getItem("theme"));
      console.log("LocalStorage user:", localStorage.getItem("user"));
    } catch (error) {
      console.error("Signin error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Illustration & Info */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full mb-6">
                <MdOutlineSecurity className="text-2xl text-indigo-600" />
                <span className="font-bold text-indigo-700">SECURE LOGIN</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Welcome Back to{" "}
                <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Market Preview
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Sign in to access your personalized shopping experience, track
                your orders, and manage your account.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: <MdEmail className="text-xl" />,
                  text: "Access your order history",
                },
                {
                  icon: <FaLock className="text-xl" />,
                  text: "Secure payment methods",
                },
                {
                  icon: <FaEnvelope className="text-xl" />,
                  text: "Personalized recommendations",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-indigo-100"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="text-indigo-600">{feature.icon}</div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
              <p className="text-lg italic mb-4">
                "MarVista transformed how I shop. I save hours every week!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full"></div>
                <div>
                  <p className="font-semibold">Kenenisa M.</p>
                  <p className="text-indigo-200 text-sm">Regular Shopper</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sign In Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-indigo-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaSignInAlt className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"></div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-3 pr-4 py-4 border-2 ${errors.email ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300`}
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"></div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-3 pr-12 py-4 border-2 ${errors.password ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300`}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-gray-500 text-sm mt-2">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded"
                    disabled={loading}
                  />
                  <label htmlFor="remember" className="ml-3 text-gray-700">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Sign Up Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>Sign up now</span>
                    <FaUserPlus className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>
            </form>

            {/* Terms */}
            <div className="text-center pt-6 mt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                By signing in, you agree to our{" "}
                <Link
                  to="/terms"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
