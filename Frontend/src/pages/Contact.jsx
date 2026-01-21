import { useState } from "react";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPaperPlane, 
  FaCheckCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaArrowRight
} from "react-icons/fa";
import { MdMessage, MdSupportAgent } from "react-icons/md";
import { HiLightBulb } from "react-icons/hi";
import toast from "react-hot-toast";
import getInTouch from '../assets/getInTouch.jpg';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", color: "hover:text-blue-600" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-sky-500" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-pink-600" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: FaGithub, href: "https://github.com", label: "GitHub", color: "hover:text-gray-800" },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-white text-xl" />,
      title: "Email Us",
      details: ["Kenenisamiesb@gmail.com", "kenenisamb@gmail.com"],
      bgColor: "bg-linear-to-br from-indigo-500 to-purple-600",
      action: "mailto:Kenenisamiesb@gmail.com"
    },
    {
      icon: <FaPhone className="text-white text-xl" />,
      title: "Call Us",
      id: "phone",
      details: ["+251 964 762 288", "+251 702 929 800"],
      bgColor: "bg-linear-to-br from-purple-500 to-pink-600",
      action: "tel:+251964762288"
    },
    {
      icon: <FaMapMarkerAlt className="text-white text-xl" />,
      title: "Visit Us",
      details: ["Shashemene, Ethiopia", "Bishan Guracha"],
      bgColor: "bg-linear-to-br from-pink-500 to-rose-600",
      action: "#location"
    }
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner and follow the simple registration process."
    },
    {
      question: "Is Market Preview free to use?",
      answer: "Yes! Our basic features are completely free forever with premium options available."
    },
    {
      question: "Can I use it on my mobile phone?",
      answer: "Absolutely! Our platform is fully responsive and optimized for all mobile devices."
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-50">
      {/* Hero Section with Image */}
      <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-r from-indigo-900/40 via-purple-900/30 to-pink-900/40"></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
                <MdMessage className="text-2xl" />
                <span className="font-bold text-lg">LET'S CONNECT</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Get in <span className="text-yellow-300">Touch</span> With Us
              </h1>
              
              <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl">
                Have questions, feedback, or need support? Our dedicated team is here to help you succeed. 
                Reach out and experience our exceptional customer service.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact-form"
                  className="inline-flex items-center gap-3 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <span>Send Message</span>
                  <FaArrowRight />
                </a>
                <a 
                  href="#phone"
                  className="inline-flex items-center gap-3 bg-transparent border-2 border-indigo-500 text-black font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <FaPhone />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={getInTouch} 
                  alt="Team collaboration and communication" 
                  className="w-full rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-linear-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/30">
                  <div className="text-center">
                    <MdSupportAgent className="text-3xl mx-auto mb-2" />
                    <div className="text-xl font-bold">24/7 Support</div>
                    <div className="text-sm text-indigo-100">Always Here</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-linear-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/30">
                  <div className="text-center">
                    <HiLightBulb className="text-3xl mx-auto mb-2" />
                    <div className="text-xl font-bold">Quick Response</div>
                    <div className="text-sm text-yellow-100">Under 24h</div>
                  </div>
                </div>
              </div>
              
              {/* Background Glow */}
              <div className="absolute -inset-10 bg-linear-to-r from-indigo-400/20 to-purple-400/20 blur-3xl rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f8fafc" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 -mt-10 relative z-20">
        {submitted && (
          <div className="mb-10 animate-fadeIn">
            <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-6">
                <FaCheckCircle className="text-4xl" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2"> Message Sent Successfully!</h3>
                  <p className="text-green-100">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-indigo-100">
                Quick Contact
              </h2>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <a 
                    key={index}
                    href={info.action}
                    className="block group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-indigo-50 transition-all duration-300">
                      <div id="phone" className={`${info.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 mb-2">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Media Section */}
              <div className="mt-12 pt-8 border-t border-indigo-100">
                <h4 className="font-bold text-gray-900 mb-6 text-xl">Connect With Us</h4>
                <p className="text-gray-600 mb-6">Follow us on social media for updates and news.</p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-all duration-300 ${social.color} group`}
                        aria-label={social.label}
                      >
                        <Icon className="text-2xl group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Business Hours</h3>
              <div className="space-y-4">
                {[
                  { day: "Monday-Monday", hours: "2:00 AM - 12:00 PM" },
                  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                  { day: "Friday", hours: "5:00 AM - 8:00 AM closed" }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center pb-4 border-b border-white/20 last:border-0">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="font-bold">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Contact Form & FAQ */}
          <div className="lg:col-span-2 space-y-10">
            {/* Contact Form */}
            <div id="contact-form" className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl">
                  <FaPaperPlane className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Send Your Message</h2>
                  <p className="text-gray-600 mt-2">We'd love to hear from you. Fill out the form below.</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                      disabled={loading}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300"
                    placeholder="What would you like to discuss?"
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300 min-h-[200px] resize-none"
                    placeholder="Please provide detailed information about your inquiry..."
                    required
                    disabled={loading}
                    rows="6"
                  />
                </div>
                
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl hover:-translate-y-1 disabled:opacity-70"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Sending Your Message...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-lg" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </button>                 
                </div>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="group">
                    <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 hover:border-indigo-300 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                        <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed pl-6">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Banner */}
        <div className="mt-16">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl p-12">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-6">Need Immediate Assistance?</h3>
              <p className="text-indigo-100 text-xl mb-10 max-w-3xl mx-auto">
                Our dedicated support team is ready to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a 
                  href="tel:+251964762288"
                  className="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-4 shadow-lg hover:shadow-xl hover:-translate-y-1 text-lg"
                >
                  <FaPhone className="text-2xl" />
                  <div className="text-left">
                    <div className="font-bold">Call Now</div>
                    <div className="text-sm">+251 964 762 288</div>
                  </div>
                </a>
                <a 
                  href="mailto:Kenenisamiesb@gmail.com"
                  className="bg-transparent hover:bg-white/10 border-2 border-white text-white font-bold py-5 px-10 rounded-xl transition-all duration-300 flex items-center justify-center gap-4 text-lg"
                >
                  <FaEnvelope className="text-2xl" />
                  <div className="text-left">
                    <div className="font-bold">Email Support</div>
                    <div className="text-sm">Kenenisamiesb@gmail.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;