import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { 
  FaPlus, 
  FaSignInAlt, 
  FaUserPlus, 
  FaBars, 
  FaTimes, 
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaEye as FaVisit,
  FaHome,
  FaInfoCircle,
  FaPaperPlane
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { useUserStore } from "../Store/user";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signout } = useUserStore();
  const profileRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signout();
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const isAdmin = user?.isAdmin === true;

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaPaperPlane /> },
    { to: "/products", label: "Products", icon: <AiOutlineAppstoreAdd /> },
  ];

  const userMenuItems = [
    { to: "/profile", label: "My Profile", icon: <FaUserCircle /> },
    { to: "/visits", label: "My Visits", icon: <FaVisit /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    ...(isAdmin ? [{ to: "/admin", label: "Dashboard", icon: <MdDashboard /> }] : []),
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled 
      ? 'bg-linear-to-r from-indigo-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
      : 'bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900'
    }`}>
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="MarVista" 
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">MarVista</h1>
              <p className="text-indigo-200 text-xs md:text-sm">Smart Market Preview</p>
            </div>
          </Link>

          {/* Desktop Navigation - Show on medium and larger screens */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                className="group relative px-3 py-2 lg:px-4 lg:py-3 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <div className="text-indigo-300 group-hover:text-white transition-colors text-sm lg:text-base">
                    {link.icon}
                  </div>
                  <span className="font-medium text-white group-hover:text-white transition-colors text-sm lg:text-base">
                    {link.label}
                  </span>
                </div>
                <div className="absolute inset-0 bg-linear-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
              </Link>
            ))}

            {/* Admin Add Product Button */}
            {isAdmin && (
              <Link 
                to="/create" 
                className="group flex items-center px-3 py-2 lg:px-4 lg:py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ml-2"
              >
                <FaPlus className="text-white text-sm lg:text-base mr-2 group-hover:rotate-90 transition-transform" />
                <span className="text-white font-semibold text-sm lg:text-base">Add Product</span>
              </Link>
            )}

            {/* User Profile or Auth Buttons */}
            {user ? (
              <div className="relative ml-2" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-3 rounded-xl bg-linear-to-r from-indigo-800/50 to-purple-800/50 hover:from-indigo-700/50 hover:to-purple-700/50 backdrop-blur-sm border border-white/10 transition-all duration-300 group"
                  aria-label="User profile menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="relative">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-lg shadow-lg">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="absolute -inset-1 lg:-inset-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs lg:text-sm font-semibold text-white truncate max-w-[100px] lg:max-w-[120px]">
                      {user.username}
                    </p>
                    <p className="text-xs text-indigo-300 truncate max-w-[100px] lg:max-w-[120px]">
                      {user.email}
                    </p>
                  </div>
                  <div className={`transform transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-3 h-3 lg:w-4 lg:h-4 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 lg:w-72 bg-linear-to-br from-indigo-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-3 z-50 animate-fadeIn">
                    <div className="px-4 lg:px-5 py-3 lg:py-4 border-b border-white/10">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-base lg:text-xl shadow-lg">
                          {user.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold text-base lg:text-lg truncate">{user.username}</p>
                          <p className="text-xs lg:text-sm text-indigo-300 truncate">{user.email}</p>
                          {user.isAdmin && (
                            <span className="inline-block mt-1 lg:mt-2 px-2 lg:px-3 py-1 text-xs bg-linear-to-r from-indigo-700 to-purple-700 text-white rounded-full">
                              Administrator
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link 
                          key={item.to}
                          to={item.to} 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-4 lg:px-5 py-2 lg:py-3 text-indigo-200 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer group/item"
                        >
                          <div className="mr-3 lg:mr-4 text-lg lg:text-xl group-hover/item:scale-110 transition-transform">
                            {item.icon}
                          </div>
                          <span className="flex-1 text-sm lg:text-base">{item.label}</span>
                          <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover/item:opacity-100"></div>
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-white/10 mx-4 lg:mx-5 my-2"></div>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 lg:px-5 py-2 lg:py-3 text-red-300 hover:text-red-200 hover:bg-red-900/20 transition-all duration-200 cursor-pointer group/item"
                    >
                      <FaSignOutAlt className="text-lg lg:text-xl mr-3 lg:mr-4 group-hover/item:rotate-12 transition-transform" />
                      <span className="flex-1 text-sm lg:text-base">Sign Out</span>
                      <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-500 rounded-full opacity-0 group-hover/item:opacity-100"></div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-4 ml-2">
                <Link 
                  to="/signin" 
                  className="flex items-center px-3 py-2 lg:px-4 lg:py-3 rounded-xl border border-white/20 text-white hover:border-indigo-500 hover:text-indigo-300 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaSignInAlt className="text-sm lg:text-base mr-2 group-hover:rotate-12 transition-transform" />
                  <span className="font-medium text-sm lg:text-base">Sign In</span>
                </Link>

                <Link 
                  to="/signup" 
                  className="flex items-center px-3 py-2 lg:px-4 lg:py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <FaUserPlus className="text-sm lg:text-base mr-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm lg:text-base">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle - Show on small and medium screens */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-linear-to-r from-indigo-800/50 to-purple-800/50 hover:from-indigo-700/50 hover:to-purple-700/50 backdrop-blur-sm border border-white/10 transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-white text-xl" />
            ) : (
              <FaBars className="text-white text-xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Show on small and medium screens */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-linear-to-br from-indigo-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl animate-slideDown">
          <div className="px-4 py-4 space-y-1">
            {user && (
              <div className="px-4 py-3 bg-linear-to-r from-indigo-800/50 to-purple-800/50 rounded-xl mb-3 border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {user.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="absolute -inset-1.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full blur-md opacity-50"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-base">{user.username}</p>
                    <p className="text-xs text-indigo-300 truncate">{user.email}</p>
                    {user.isAdmin && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-linear-to-r from-indigo-700 to-purple-700 text-white rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <Link 
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl hover:bg-white/5 text-white hover:text-indigo-300 transition-all duration-300 group"
              >
                <div className="w-9 h-9 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <div className="text-lg">
                    {link.icon}
                  </div>
                </div>
                <span className="font-medium text-base flex-1">{link.label}</span>
                <div className="w-1.5 h-1.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}

            {/* Add Product Link - Mobile (Admin Only) */}
            {isAdmin && (
              <Link 
                to="/create" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-4 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 mt-3"
              >
                <div className="w-9 h-9 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                  <FaPlus className="text-lg" />
                </div>
                <span className="font-semibold text-base">Add Product</span>
              </Link>
            )}

            {user ? (
              <>
                {/* User Links - Mobile */}
                {userMenuItems.map((item) => (
                  <Link 
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl hover:bg-white/5 text-indigo-200 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-9 h-9 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <div className="text-lg">
                        {item.icon}
                      </div>
                    </div>
                    <span className="font-medium text-base flex-1">{item.label}</span>
                    <div className="w-1.5 h-1.5 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                ))}

                {/* Sign Out Button - Mobile */}
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-3 rounded-xl text-red-300 hover:bg-red-900/20 hover:text-red-200 transition-all duration-300 mt-2"
                >
                  <div className="w-9 h-9 bg-linear-to-r from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center mr-3">
                    <FaSignOutAlt className="text-lg" />
                  </div>
                  <span className="font-medium text-base flex-1">Sign Out</span>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                </button>
              </>
            ) : (
              <>
                {/* Sign In Link - Mobile */}
                <Link 
                  to="/signin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl border border-white/20 text-white hover:border-indigo-500 hover:text-indigo-300 transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mr-3">
                    <FaSignInAlt className="text-lg" />
                  </div>
                  <span className="font-medium text-base flex-1">Sign In</span>
                </Link>

                {/* Sign Up Link - Mobile */}
                <Link 
                  to="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all duration-300 mt-2"
                >
                  <div className="w-9 h-9 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                    <FaUserPlus className="text-lg" />
                  </div>
                  <span className="font-semibold text-base flex-1">Sign Up</span>
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