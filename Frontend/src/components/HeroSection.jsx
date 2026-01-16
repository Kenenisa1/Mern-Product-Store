import { FaStar, FaShoppingBag, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import home from '../assets/home.jpg'

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-800 via-indigo-300 to-pink-600 opacity-50"></div>
      
      <div className="relative">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
                <span className="font-medium">WEL COME TO S.MARKET PREVIEW</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-6xl md:text-6xl font-bold mb-6">
                Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 ">High Quality</span> Products
                <br />
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                Experience shopping redefined with our curated collection of high-quality products. 
                From electronics to fashion, find everything you need at unbeatable prices.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="group flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600  font-semibold px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <FaShoppingBag className="text-lg" />
                  <span>Visit Now</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link 
                  to="/signup" 
                  className="group flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  <FaStar className="text-yellow-300" />
                  <span>Join Free</span>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={home} 
                  alt="Modern Shopping Experience" 
                  className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-linear-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">30% discount</div>
                    <div className="text-sm">preview</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-linear-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">⭐ 4.9</div>
                    <div className="text-sm">Customer Rating</div>
                  </div>
                </div>
              </div>

              {/* Background Blur */}
              <div className="absolute -inset-10 bg-linear-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
            </div>

          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="white" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HeroSection;