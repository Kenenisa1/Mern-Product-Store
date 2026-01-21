import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserLock, FaDatabase, FaCookie, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 2026';

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Privacy <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-indigo-100">
            {/* Introduction */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FaUserLock className="text-indigo-500" />
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to MarVista ("we," "our," or "us"). We are committed to protecting your personal 
                information and your right to privacy. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our market preview platform.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using MarVista, you agree to the collection and use of information in accordance with 
                this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaDatabase className="text-indigo-500" />
                2. Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div className="bg-indigo-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-gray-600">
                    When you register for an account, we collect:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Full name and username</li>
                    <li>Email address</li>
                    <li>Phone number (optional)</li>
                    <li>Profile information</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Usage Data</h3>
                  <p className="text-gray-600">
                    We automatically collect information about how you interact with our platform:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Pages visited and time spent</li>
                    <li>Search queries and product interactions</li>
                    <li>Device information</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2">Market Data</h3>
                  <p className="text-gray-600">
                    When you use our market preview features:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Saved products and preferences</li>
                    <li>Market browsing history</li>
                    <li>Product comparisons and notes</li>
                    <li>Location data (if enabled)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. How We Use Your Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-indigo-100 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Service Provision</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Create and manage your account</li>
                    <li>• Provide market preview services</li>
                    <li>• Personalize your shopping experience</li>
                    <li>• Process transactions (if applicable)</li>
                  </ul>
                </div>

                <div className="bg-white border border-indigo-100 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Improvement & Communication</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Improve platform features</li>
                    <li>• Send service-related notifications</li>
                    <li>• Respond to customer support requests</li>
                    <li>• Send marketing communications (opt-in)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Cookies & Tracking */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaCookie className="text-indigo-500" />
                4. Cookies & Tracking Technologies
              </h2>
              
              <div className="bg-indigo-50 rounded-xl p-5">
                <p className="text-gray-600 mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                    <p className="text-gray-600 text-sm">
                      Required for basic functionality like user authentication and session management.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                    <p className="text-gray-600 text-sm">
                      Help us understand how users interact with our platform to improve services.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <p className="text-gray-600">
                    You can control cookies through your browser settings. However, disabling essential 
                    cookies may affect platform functionality.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Data Sharing & Disclosure</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Service Providers:</span> We share data with trusted 
                    partners who assist in platform operations (hosting, analytics, customer support).
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Legal Requirements:</span> We may disclose information 
                    if required by law or to protect our rights and safety.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Business Transfers:</span> In case of merger, 
                    acquisition, or asset sale, user information may be transferred.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-linear-to-r from-indigo-100 to-purple-100 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-3">We Do Not Sell Your Data</h3>
                <p className="text-gray-600">
                  MarVista does not sell, trade, or rent your personal information to third parties 
                  for marketing purposes.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Data Security</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-5 bg-white border border-indigo-100 rounded-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-600 font-bold">AES-256</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Encryption</h3>
                  <p className="text-gray-600 text-sm">
                    All data is encrypted in transit and at rest using industry-standard protocols.
                  </p>
                </div>
                
                <div className="text-center p-5 bg-white border border-indigo-100 rounded-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-600 font-bold">2FA</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Access Controls</h3>
                  <p className="text-gray-600 text-sm">
                    Strict access controls and authentication measures protect your information.
                  </p>
                </div>
                
                <div className="text-center p-5 bg-white border border-indigo-100 rounded-xl">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-indigo-600 font-bold">24/7</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Monitoring</h3>
                  <p className="text-gray-600 text-sm">
                    Continuous security monitoring and regular vulnerability assessments.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Your Privacy Rights</h2>
              
              <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold mb-3">Access & Correction</h3>
                    <ul className="space-y-2 text-indigo-100">
                      <li>• View your personal data</li>
                      <li>• Update inaccurate information</li>
                      <li>• Request data export</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-3">Control & Deletion</h3>
                    <ul className="space-y-2 text-indigo-100">
                      <li>• Opt-out of marketing</li>
                      <li>• Delete your account</li>
                      <li>• Restrict data processing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-indigo-100">
                    To exercise your rights, contact us at{' '}
                    <a href="mailto:privacy@marvista.com" className="underline hover:text-white">
                      privacy@marvista.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaEnvelope className="text-indigo-500" />
                8. Contact Us
              </h2>
              
              <div className="bg-white border border-indigo-100 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Data Protection Officer</h3>
                    <p className="text-gray-600">
                      For privacy-related inquiries, contact our Data Protection Officer:
                    </p>
                    <div className="mt-3 space-y-2">
                      <p className="text-gray-700">📧 privacy@marvista.com</p>
                      <p className="text-gray-700">📞 +251 964 762 288</p>
                      <p className="text-gray-700">📍 Shashamene, Ethiopia</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Response Time</h3>
                    <p className="text-gray-600 mb-4">
                      We aim to respond to all privacy inquiries within 7 business days.
                    </p>
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Note:</span> For account-specific issues, 
                        please use our regular support channels for faster response.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Policy Updates */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Policy Updates</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant 
                changes by:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-6">
                <li>Posting the new policy on this page</li>
                <li>Sending email notification to registered users</li>
                <li>Displaying a notice on our platform</li>
              </ul>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <p className="text-gray-700">
                  <span className="font-semibold">Continued use of MarVista after policy changes</span> 
                  {' '}constitutes acceptance of the updated policy.
                </p>
              </div>
            </section>

            {/* Footer Links */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-gray-600">
                    Need more information? Check our other policies:
                  </p>
                </div>
                <div className="flex gap-6">
                  <Link 
                    to="/terms" 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    Terms of Service
                  </Link>
                  <Link 
                    to="/cookies" 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    Cookie Policy
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;