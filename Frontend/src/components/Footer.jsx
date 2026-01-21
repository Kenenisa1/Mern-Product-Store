import { FaFacebook, FaLinkedin, FaGithub, FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import logo from '../assets/logo.png';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: FaFacebook, 
      href: "https://web.facebook.com/profile.php?id=100084359453118", 
      label: "Facebook"
    },
    { 
      icon: FaLinkedin, 
      href: "https://www.linkedin.com/in/kenenisa-mieso/", 
      label: "LinkedIn"
    },
    { 
      icon: FaGithub, 
      href: "https://github.com/Kenenisa1", 
      label: "GitHub"
    }
  ];

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/add-product', label: 'Add Product' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const contactInfo = [
    { 
      icon: FaMapMarkerAlt, 
      text: 'Rahma Mosque, Shashamene, Ethiopia'
    },
    { 
      icon: FaEnvelope, 
      text: 'kenenisamb@gmail.com'
    },
    { 
      icon: FaPhone, 
      text: '+251 964 762 288'
    },
    { 
      icon: FaClock, 
      text: 'Mon-Fri: 9AM-6PM'
    }
  ];

  const policyLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/faq', label: 'FAQ' }
  ];

  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-linear-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white pt-12 pb-6 relative">
      <div className={styles.container + " relative z-10"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to='/' className="inline-block group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={logo} 
                    alt="MarVista" 
                    className="w-14 h-14 md:w-16 md:h-16 object-contain transition-all duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">MarVista</h2>
                  <p className="text-indigo-200 text-sm">Smart Market Preview</p>
                </div>
              </div>
            </Link>

            <p className="text-indigo-200 text-sm leading-relaxed">
              Your destination for stress-free market shopping. Browse before you buy.
            </p>

            {/* Social Links */}
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-indigo-800/50 hover:bg-indigo-700 rounded-lg transition-all duration-300 hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-white/20">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-sm text-indigo-200 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-white/20">Contact Info</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-indigo-800/50 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <Icon className="w-3 h-3 text-indigo-300" />
                    </div>
                    <span className="text-sm text-indigo-200 leading-tight">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Useful Resources */}
          <div>
            <h3 className="text-base font-semibold mb-4 pb-2 border-b border-white/20">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-indigo-200 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-indigo-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-indigo-200 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-sm text-indigo-200 hover:text-white transition-colors">
                  Developers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-indigo-300">
                © {currentYear} MarVista. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {policyLinks.map((policy, index) => (
                <Link
                  key={index}
                  to={policy.path}
                  className="text-xs text-indigo-300 hover:text-white transition-colors"
                >
                  {policy.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg shadow-lg transition-all duration-300 cursor-pointer z-50 border border-white/10"
          aria-label="Back to top"
        >
          <FaArrowUp className="w-4 h-4 text-white" />
        </button>
      )}
    </footer>
  );
};

export default Footer;