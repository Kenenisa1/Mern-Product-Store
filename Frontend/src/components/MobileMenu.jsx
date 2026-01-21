import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {FaSignInAlt,FaHome,FaInfoCircle,FaPaperPlane,FaCog,FaUserCircle,FaEye, FaUserPlus, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import { useUserStore } from '../Store/user'
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";


const MobileMenu = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [ setIsProfileOpen] = useState(false);
    const { user, signout } = useUserStore();
    const navigate = useNavigate();

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
        { to: "/visits", label: "My Visits", icon: <FaEye /> },
        { to: "/settings", label: "Settings", icon: <FaCog /> },
        ...(isAdmin ? [{ to: "/admin", label: "Dashboard", icon: <MdDashboard /> }] : []),
      ];
    

  return (
    <div>
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
    </div>
  )
}

export default MobileMenu