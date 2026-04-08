import { Link } from 'react-router-dom';

const Home = () => {
  const services = [
    { name: 'Plumbing', icon: '🔧', color: 'from-blue-500 to-blue-600' },
    { name: 'Electrician', icon: '⚡', color: 'from-yellow-500 to-yellow-600' },
    { name: 'Tutoring', icon: '📚', color: 'from-purple-500 to-purple-600' },
    { name: 'Cleaning', icon: '🧹', color: 'from-green-500 to-green-600' },
    { name: 'Carpentry', icon: '🔨', color: 'from-orange-500 to-orange-600' }
  ];

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Hero */}
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Neighbourhood Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Trusted local professionals at your doorstep. Book plumbers, electricians, tutors & more in just 2 clicks!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              
              className="px-12 py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-bold rounded-3xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-2xl"
            >
              Browse Services
            </Link>
            <Link
              to="/signup"
              className="px-12 py-6 border-4 border-blue-500 text-blue-600 text-xl font-bold rounded-3xl hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Popular Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose from our top-rated professionals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to="/services"
                className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50 hover:border-blue-200"
              >
                <div className={`text-5xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center justify-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-semibold">Starting @ ₹200/hr</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Ready to get started?</h2>
            <p className="text-xl text-gray-600 mb-12">Join 10,000+ happy customers</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/services" className="px-12 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-xl font-bold rounded-3xl hover:from-green-600 hover:to-green-700 shadow-2xl">
                Book Now
              </Link>
              <Link to="/signup" className="px-12 py-6 border-4 border-gray-300 text-gray-800 text-xl font-bold rounded-3xl hover:bg-gray-100 shadow-xl">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-3xl mb-6">🏠</div>
          <h3 className="text-2xl font-bold mb-4">Neighbourhood Services</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Team ID: <span className="font-bold text-blue-400">KPT016</span> | Built with ❤️ for the competition
          </p>
        </div>
      </footer>
    </div>
    
  );
};

export default Home;