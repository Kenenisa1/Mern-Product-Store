import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheck,
  FaShieldAlt,
} from "react-icons/fa";
import { MdPersonAddAlt1 } from "react-icons/md";
import { useUserStore } from "../Store/user";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { signup } = useUserStore();
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

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

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

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // In your SignUp component, update the handleSubmit function:
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await signup({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Signup result:", result);

      if (result.success) {
        toast.success(
          "Account created successfully! Please sign in to continue.",
        );
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Navigate to signin page - DO NOT auto-login
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else {
        toast.error(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup API failed:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength =
    formData.password.length > 0
      ? formData.password.length >= 8
        ? "Strong"
        : formData.password.length >= 6
          ? "Medium"
          : "Weak"
      : "";

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-linear-to-r from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Benefits & Info */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-100 to-purple-100 px-6 py-3 rounded-full mb-6">
                <MdPersonAddAlt1 className="text-2xl text-indigo-600" />
                <span className="font-bold text-indigo-700">
                  JOIN OUR COMMUNITY
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Start Your{" "}
                <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Shopping Journey
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Create your account and unlock exclusive features, personalized
                recommendations, and seamless shopping experiences.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-6 mb-8">
              {[
                {
                  icon: <FaCheck className="text-xl" />,
                  text: "Save your favorite products",
                },
                {
                  icon: <FaCheck className="text-xl" />,
                  text: "Get personalized recommendations",
                },
                {
                  icon: <FaCheck className="text-xl" />,
                  text: "Track your order history",
                },
                {
                  icon: <FaCheck className="text-xl" />,
                  text: "Exclusive member discounts",
                },
                {
                  icon: <FaCheck className="text-xl" />,
                  text: "Fast checkout process",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-indigo-100"
                >
                  <div className="w-12 h-12 bg-linear-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <div className="text-green-600">{benefit.icon}</div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Security Badge */}
            <div className="bg-linear-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <FaShieldAlt className="text-3xl" />
                <div>
                  <p className="text-lg font-semibold mb-2">
                    Your Security is Our Priority
                  </p>
                  <p className="text-emerald-100 text-sm">
                    All your data is encrypted and protected with bank-level
                    security.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sign Up Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-indigo-100">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaUserPlus className="text-3xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h2>
              <p className="text-gray-600">Join thousands of smart shoppers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"></div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full pl-3 pr-4 py-4 border-2 ${errors.username ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300`}
                    placeholder="Ex. Kenenisa"
                    disabled={loading}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

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
                    placeholder="your email"
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
                    placeholder="Create a strong password"
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
                {formData.password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`h-2 flex-1 rounded-full ${
                        passwordStrength === "Weak"
                          ? "bg-red-500"
                          : passwordStrength === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength === "Weak"
                          ? "text-red-600"
                          : passwordStrength === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                      }`}
                    >
                      {passwordStrength} password
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400"></div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-3 pr-12 py-4 border-2 ${errors.confirmPassword ? "border-red-500" : "border-gray-200"} rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300`}
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword &&
                  formData.password === formData.confirmPassword && (
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-2">
                      <FaCheck className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                  required
                  disabled={loading}
                />
                <label htmlFor="terms" className="ml-3 text-gray-700 text-sm">
                  I agree to the{" "}
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
                </label>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    <span>Create Account</span>
                  </>
                )}
              </button>

              {/* Sign In Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors inline-flex items-center gap-2 group"
                  >
                    <span>Sign in here</span>
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
