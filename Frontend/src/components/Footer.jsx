import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { styles } from '../styles'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaFacebook, href: "https://web.facebook.com/profile.php?id=100084359453118", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/kenenisa-mieso/", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/Kenenisa1", label: "GitHub" }
  ];

  const quickLinks = [
    { path: '/Home', label: 'Home' },
    { path: '/', label: 'All Products' },
    { path: '/CreatePage', label: 'Add Product' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: 'Abyssinia Building 3rd floor, Arba Minch, Ethiopia' },
    { icon: FaEnvelope, text: 'kenenisamb@gmail.com' },
    { icon: FaPhone, text: '+251 964 762 288' },
    { icon: FaClock, text: 'Mon-Fri: 9AM-6PM' }
  ];

  const policyLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/cookies', label: 'Cookie Policy' }
  ];

  return (
    <footer className="-linear-to-rbg-linear-to-r from-slate-900 via-gray-900 to-slate-950 text-white mt-16 pt-16 pb-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-indigo-600 to-transparent animate-gradient-x"></div>

      <div className={`${styles.container} relative z-10`}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Product Store
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Your premier destination for curated quality products. Experience excellence in every purchase.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 group-hover:w-8 transition-all duration-300"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 linear-to-r-linear-to-rbg-linear-to-r border-slate-800 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className={`${styles.flexStart} text-slate-300 hover:text-indigo-400 ${styles.transition} cursor-pointer group py-2`}
                  >
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="font-medium group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 linear-to-r-linear-to-rbg-linear-to-r border-slate-800 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className={`${styles.flexStart} text-slate-300 group`}>
                    <div className="p-2 mr-3 bg-slate-800/50 rounded-lg group-hover:bg-slate-800 transition-colors">
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Divider with Gradient */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-slate-900 text-slate-400 text-sm font-medium">
              Excellence Delivered
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} <span className="text-indigo-400 font-semibold">Product Store</span>. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            {policyLinks.map((policy, index) => (
              <Link
                key={index}
                to={policy.path}
                className="text-slate-400 hover:text-indigo-400 text-sm font-medium transition-colors duration-300 relative group"
              >
                {policy.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Add to global CSS or use inline style */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </footer>
  )
}

export default Footer;