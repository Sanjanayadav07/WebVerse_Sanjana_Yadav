

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaLock, FaPhone } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signup(formData); // ✅ single call
      console.log("Signup Success:", res);

      navigate('/dashboard'); // ✅ direct redirect
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      alert(error.response?.data?.msg || 'Signup failed!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="text-6xl mb-6 mx-auto">🚀</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Join Us Today</h1>
          <p className="text-gray-600 text-sm md:text-base">Create your account in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FaUser className="mr-2 text-purple-500 w-5 h-5" />
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300 text-lg"
              placeholder="John Doe"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FaPhone className="mr-2 text-green-500 w-5 h-5" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 text-lg"
              placeholder="9876543210"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FaUser className="mr-2 text-blue-500 w-5 h-5" />
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-lg"
              placeholder="your@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FaLock className="mr-2 text-red-500 w-5 h-5" />
              Password *
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 text-lg"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 transition-colors">
            Sign in here
          </Link>
        </p>

        {/* Team ID */}
        <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl">
          <p className="text-xs text-blue-800 font-bold text-center">
            👥 Team ID: <span className="text-blue-600">KPT016</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

