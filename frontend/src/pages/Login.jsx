import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData);   // ✅ useAuth वाला login
      navigate('/dashboard');  // ✅ redirect
    } catch (error) {
      console.error(error);
      alert('Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 mx-4">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FaLock className="mr-2 text-blue-500" />
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 pl-12 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-xl disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;