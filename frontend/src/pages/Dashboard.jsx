import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { FaCalendarCheck, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (user) {
    fetchBookings();
  }
}, [user]);

  const fetchBookings = async () => {
    try {
      if (!user?._id) return;

      const res = await axios.get(
        `/api/bookings/my-bookings?userId=${user._id}`
      );
      console.log("Bookings API:", res.data);
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.put(`/api/bookings/${id}`, {
        status: 'cancelled'
      });
      fetchBookings();
    } catch {
      alert("Error cancelling booking");
    }
  };

  // 🔐 user safety
  if (!user) {
    return <div className="text-center mt-10 text-xl">Please login first</div>;
  }

  // ⏳ loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6 sm:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Welcome back, {user.name} 👋
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            Team ID: <span className="font-bold text-blue-600">KPT016</span>
          </p>

          <button
            onClick={logout}
            className="mt-4 w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center">
            <FaCalendarCheck className="text-2xl sm:text-3xl mx-auto text-green-500 mb-2" />
            <h2 className="text-xl sm:text-2xl font-bold">{bookings.length}</h2>
            <p className="text-sm sm:text-base">Total Bookings</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center">
            <FaMapMarkerAlt className="text-2xl sm:text-3xl mx-auto text-blue-500 mb-2" />
            <h2 className="text-xl sm:text-2xl font-bold">5+</h2>
            <p className="text-sm sm:text-base">Services Available</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow text-center">
            <FaClock className="text-2xl sm:text-3xl mx-auto text-purple-500 mb-2" />
            <h2 className="text-xl sm:text-2xl font-bold">24/7</h2>
            <p className="text-sm sm:text-base">Support</p>
          </div>
        </div>

        {/* Booking List */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-xl sm:text-2xl font-bold">Your Bookings</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-6 sm:p-10 text-center">
              <h3 className="text-lg sm:text-xl mb-4">No bookings yet</h3>
              <Link
                to="/services"
                className="bg-blue-500 text-white px-6 py-2 rounded"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="p-4 sm:p-6 border-b">

                {/* 🔥 MAIN FIX HERE */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                  {/* Left */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">
                      {booking.service?.name}
                    </h3>

                    <p className="text-gray-600 text-sm sm:text-base">
                      📍 {booking.location}
                    </p>

                    <p className="text-gray-500 text-xs sm:text-sm">
                      📅 {new Date(booking.date).toLocaleDateString()} | ⏰ {booking.time}
                    </p>

                    <span className={`inline-block mt-2 px-3 py-1 rounded text-xs font-bold
                  ${booking.status === 'pending' && 'bg-yellow-100 text-yellow-800'}
                  ${booking.status === 'confirmed' && 'bg-blue-100 text-blue-800'}
                  ${booking.status === 'completed' && 'bg-green-100 text-green-800'}
                  ${booking.status === 'cancelled' && 'bg-red-100 text-red-800'}
                `}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Right */}
                  <div className="text-left sm:text-right">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-600">
                      ₹{booking.price || booking.service?.price}
                    </h3>

                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="mt-2 w-full sm:w-auto bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;