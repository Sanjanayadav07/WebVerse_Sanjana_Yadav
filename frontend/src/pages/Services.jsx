import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // add

const Services = () => {
  const [services, setServices] = useState([]); // ✅ FIX
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const filteredServices = selectedCategory
    ? services.filter(s => s.category === selectedCategory)
    : services;

  useEffect(() => {
    axios.get('/api/services')
      .then(res => {
        console.log("SERVICES:", res.data); // 👈 ADD THIS
        setServices(res.data);
      });
  }, []);

  /*const handleBooking = (id) => {
    navigate(`/book/${id}`);
  };*/


  const { user } = useAuth();
  const handleBooking = (serviceId) => {
    console.log("clicked:", serviceId); // debug
    navigate(`/booking/${serviceId}`);
  };

  const categories = [
    { name: 'Plumber', icon: '🔧' },
    { name: 'Electrician', icon: '⚡' },
    { name: 'Tutor', icon: '📚' },
    { name: 'Cleaner', icon: '🧹' },
    { name: 'Carpenter', icon: '🔨' }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>

      {/* ✅ Category Filter */}
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-500 hover:text-white"
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map(service => (
          <div
            key={service._id}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <img
              src={service.image}
              onError={(e) => {
                e.target.src = "/images/plumber.jpg"; // fallback
              }}
             className="w-full h-40 object-cover rounded-xl hover:scale-105 transition duration-300"
            />

            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-gray-600">{service.description}</p>

            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
              <span className="ml-2 text-sm">
                ({service.rating || 0})
              </span>
            </div>

            <p className="text-blue-600 font-bold mt-2">
              ₹{service.price}/hr
            </p>

            <button
              onClick={() => {
                console.log("BUTTON CLICKED");
                handleBooking(service._id);
              }}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;