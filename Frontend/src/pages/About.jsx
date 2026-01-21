import {
  FaUsers,
  FaGlobe,
  FaClock,
  FaShoppingBag,
  FaAward,
  FaHeart,
  FaSearch,
  FaCheckCircle,
  FaArrowRight,
  FaLinkedin,
} from "react-icons/fa";
import { MdLightbulb, MdTrendingUp, MdSupport } from "react-icons/md";
import aboutHero from '../assets/about.jpg';
import kenenisa from '../assets/kenenisa.JPG';
import Gurmesa from '../assets/gurmesa.png';
import Abdurezak from '../assets/abdurezak.JPG';

const About = () => {
  const features = [
    {
      icon: <FaClock className="text-2xl" />,
      title: "Save Time",
      description: "Browse products from the comfort of your home before visiting the market.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaShoppingBag className="text-2xl" />,
      title: "Smart Shopping",
      description: "Make informed decisions with detailed product information.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaHeart className="text-2xl" />,
      title: "Save Energy",
      description: "Avoid crowded markets and unnecessary trips.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <FaGlobe className="text-2xl" />,
      title: "Access Anywhere",
      description: "Available 24/7 on all your devices.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Create your account in seconds",
      icon: <FaUsers className="text-xl" />
    },
    {
      number: "02",
      title: "Browse Products",
      description: "Explore our extensive catalog",
      icon: <FaSearch className="text-xl" />
    },
    {
      number: "03",
      title: "Save & Compare",
      description: "Mark products for later viewing",
      icon: <FaHeart className="text-xl" />
    },
    {
      number: "04",
      title: "Visit Market",
      description: "Go directly to what you need",
      icon: <FaShoppingBag className="text-xl" />
    }
  ];

  const team = [
    {
      name: "Kenenisa Mieso",
      role: "Founder & CEO",
      image: kenenisa,
      social: {
        linkedin: "linkedin.com/in/kenenisa-mieso/?skipRedirect=true"
      }
    },
    {
      name: "Gurmesa Kedir",
      role: "Tech Leader",
      image: Gurmesa,
      social: {
        linkedin: "https://www.linkedin.com/in/gurmesa-kedir/",
      }
    },
    {
      name: "Abdurezak Shemsu",
      role: "Product Manager",
      image: Abdurezak,
      social: {
        linkedin: "https://www.linkedin.com/in/abdurezak-shemsu-4ab5a6311/"
      }
    }
  ];

  const stats = [
    { value: "100+", label: "Happy Users", icon: <FaUsers className="text-2xl" /> },
    { value: "200+", label: "Products", icon: <FaShoppingBag className="text-2xl" /> },
    { value: "90%", label: "Satisfaction", icon: <FaHeart className="text-2xl" /> },
    { value: "24/7", label: "Available", icon: <FaGlobe className="text-2xl" /> }
  ];

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
                <MdLightbulb className="text-2xl" />
                <span className="font-bold text-lg">MarVista</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Welcome to <span className="text-yellow-300">MarVista</span>
              </h1>
              
              <p className="text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl">
                Your smart solution for stress-free market shopping. Browse, compare, and decide before you step out.
                Revolutionizing how people shop in traditional markets through digital preview experience.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#features"
                  className="inline-flex items-center gap-3 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                >
                  <span>Explore Features</span>
                  <FaArrowRight />
                </a>
                <a 
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <MdTrendingUp />
                  <span>How It Works</span>
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={aboutHero} 
                  alt="Team collaboration and communication" 
                  className="w-full rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-linear-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/30">
                  <div className="text-center">
                    <MdSupport className="text-3xl mx-auto mb-2" />
                    <div className="text-xl font-bold">Easy to Use</div>
                    <div className="text-sm text-indigo-100">User-Friendly</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-linear-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border-2 border-white/30">
                  <div className="text-center">
                    <FaAward className="text-3xl mx-auto mb-2" />
                    <div className="text-xl font-bold">Award Winning</div>
                    <div className="text-sm text-yellow-100">Best Innovation</div>
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
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Mission</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To revolutionize how people shop in traditional markets by providing a seamless digital preview experience 
            that saves time, energy, and money.
          </p>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`bg-linear-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-2xl p-8 md:p-12 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-indigo-100">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl p-8 text-center border border-indigo-100 hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-linear-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
              <p className="text-gray-600 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Why Choose <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Market Preview?</span>
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "No more wandering in crowded markets",
                "Detailed product specifications",
                "Mobile-friendly experience",
                "Time-saving shopping lists",
                "Real-time market updates",
                "Secure payment options"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 hover:bg-indigo-50 rounded-xl transition-colors duration-300">
                  <FaCheckCircle className="text-green-500 text-xl mt-1 shrink-0" />
                  <p className="text-gray-700 text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Meet Our <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-xl p-8 text-center border border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute bottom-0 right-1/4 bg-linear-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-full">
                    <FaAward className="text-lg" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-6 font-medium">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <a 
                    href={member.social.linkedin}
                    className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-colors duration-300"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;