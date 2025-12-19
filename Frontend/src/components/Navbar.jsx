import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { 
  FaPlus, 
  FaSignInAlt, 
  FaUserPlus, 
  FaBars, 
  FaTimes, 
  FaProductHunt,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { styles } from '../styles';
import { useUserStore } from "../Store/user";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, signout } = useUserStore();
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black shadow-lg border-b border-gray-100">
      <nav className={`${styles.container} ${styles.flexBetween}  py-4`}>
        
        {/* Logo and Brand */}
        <Link to="/" className={`${styles.flexStart} space-x-3 cursor-pointer ${styles.hoverScale}`}>
          <img 
            src={logo} 
            alt="Product Store" 
            className="w-30 h-20 md:w-12 md:h-12 object-contain"
          />
          <span className="hidden md:inline text-xl font-bold text-white">
            Product Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex  items-center justify-center space-x-3">
          <Link 
            to="/Products" 
            className={`${styles.navLink} items-center justify-center flex`}
          >
            <AiOutlineAppstoreAdd className={`text-white ${styles.iconMd}`} />
            <span className="ml-2 text-white">Products</span>
          </Link>

          <Link 
            to="/CreatePage" 
            className={`${styles.secondaryButton} ${styles.buttonPadding}`}
          >
            <FaPlus className={`${styles.iconSm} text-white`} />
            <span className="ml-2 text-white">Add Product</span>
          </Link>

          {user ? 
          (
            <div className="relative" ref={profileRef}>
              {/* Profile Button */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`${styles.flexCenter} space-x-2 px-4 py-2 ${styles.roundedLg} hover:bg-gray-50 ${styles.transition} cursor-pointer border border-gray-200`}
              >
                <div className={`${styles.flexCenter} w-8 h-8 bg-linear-to-r from-indigo-500 to-purple-500 ${styles.roundedFull} text-white font-semibold`}>
                  {user.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <FaUserCircle className={styles.iconSm} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className={`absolute right-0 mt-2 w-64 bg-white ${styles.roundedXl} ${styles.shadowXl} border border-gray-200 py-2 z-50 animate-slideDown`}>
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  <Link 
                    to="/profile" 
                    onClick={() => setIsProfileOpen(false)}
                    className={`${styles.flexStart} px-4 py-3 text-gray-700 hover:bg-gray-50 ${styles.transition} cursor-pointer`}
                  >
                    <FaUserCircle className={`${styles.iconSm} mr-3 text-white`} />
                    <span>My Profile</span>
                  </Link>

                  <Link 
                    to="/orders" 
                    onClick={() => setIsProfileOpen(false)}
                    className={`${styles.flexStart} px-4 py-3 text-white hover:bg-gray-500 ${styles.transition} cursor-pointer`}
                  >
                    <FaShoppingCart className={`${styles.iconSm} mr-3 text-white`} />
                    <span>My Orders</span>
                  </Link>

                  <Link 
                    to="/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className={`${styles.flexStart} px-4 py-3 text-white hover:bg-gray-500 ${styles.transition} cursor-pointer`}
                  >
                    <FaCog className={`${styles.iconSm} mr-3 text-white`} />
                    <span>Settings</span>
                  </Link>

                  <div className="border-t border-gray-100 my-2"></div>

                  {/* Sign Out */}
                  <button
                    onClick={() => {
                      signout();
                      setIsProfileOpen(false);
                    }}
                    className={`${styles.flexStart} w-full px-4 py-3 text-red-600 hover:bg-red-50 ${styles.transition} cursor-pointer`}
                  >
                    <FaSignOutAlt className={`${styles.iconSm} mr-3`} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : 
          (
            <>
              <Link 
                to="/SignIn" 
                className={styles.ghostButton}
              >
                <FaSignInAlt className={styles.iconSm} />
                <span className="ml-2">Sign In</span>
              </Link>

              <Link 
                to="/SignUp" 
                className={styles.primaryButton}
              >
                <FaUserPlus className={styles.iconSm} />
                <span className="ml-2">Sign Up</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 ${styles.roundedLg} hover:bg-gray-100 ${styles.transition} cursor-pointer`}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <FaTimes className={styles.iconLg} />
          ) : (
            <FaBars className={styles.iconLg} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-slideDown">
          <div className="px-4 py-3 space-y-2">
            {/* User Info in Mobile Menu */}
            {user && (
              <div className={`px-4 py-3 ${styles.bgGradientPrimary} ${styles.roundedLg} mb-2`}>
                <div className={`${styles.flexStart} space-x-3`}>
                  <div className={`${styles.flexCenter} w-10 h-10 bg-linear-to-r from-indigo-500 to-purple-500 ${styles.roundedFull} text-white font-semibold text-lg`}>
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.username}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <Link 
              to="/Products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-gray-50 text-gray-700 ${styles.transition} cursor-pointer`}
            >
              <FaProductHunt className={`${styles.iconMd} mr-3`} />
              <span className="font-medium">Products</span>
            </Link>

            <Link 
              to="/CreatePage" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${styles.flexStart} px-4 py-3 border border-indigo-600 text-indigo-600 ${styles.roundedLg} hover:bg-indigo-50 ${styles.transition} cursor-pointer`}
            >
              <FaPlus className={`${styles.iconMd} mr-3`} />
              <span className="font-medium">Add Product</span>
            </Link>

            {/* Cart in Mobile */}

            {user ? (
              <>
                {/* Profile Links in Mobile */}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-gray-50 text-gray-700 ${styles.transition} cursor-pointer`}
                  >
                    <FaUserCircle className={`${styles.iconMd} mr-3`} />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <Link 
                    to="/orders" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-gray-50 text-gray-700 ${styles.transition} cursor-pointer`}
                  >
                    <FaShoppingCart className={`${styles.iconMd} mr-3`} />
                    <span className="font-medium">My Orders</span>
                  </Link>

                  <Link 
                    to="/settings" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-gray-50 text-gray-700 ${styles.transition} cursor-pointer`}
                  >
                    <FaCog className={`${styles.iconMd} mr-3`} />
                    <span className="font-medium">Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      signout();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`${styles.flexStart} w-full px-4 py-3 text-red-600 hover:bg-red-50 ${styles.roundedLg} ${styles.transition} cursor-pointer`}
                  >
                    <FaSignOutAlt className={`${styles.iconMd} mr-3`} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/SignIn" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${styles.flexStart} px-4 py-3 ${styles.roundedLg} hover:bg-gray-50 text-gray-700 ${styles.transition} cursor-pointer`}
                >
                  <FaSignInAlt className={`${styles.iconMd} mr-3`} />
                  <span className="font-medium">Sign In</span>
                </Link>

                <Link 
                  to="/SignUp" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${styles.flexStart} px-4 py-3 bg-indigo-600 text-white ${styles.roundedLg} hover:bg-indigo-700 ${styles.transition} cursor-pointer`}
                >
                  <FaUserPlus className={`${styles.iconMd} mr-3`} />
                  <span className="font-medium">Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;