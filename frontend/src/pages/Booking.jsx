import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Booking = () => {
    const { serviceId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
        notes: ''
    }
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/services/${serviceId}`)
            .then(res => setService(res.data))
            .catch(err => console.error(err));
    }, [serviceId]);
    /*
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/bookings', {
                ...formData,
                user: user._id,
                service: serviceId,
                totalPrice: service.price
            });

            alert('Booking created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.msg || 'Error creating booking');
        }
        setLoading(false);
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                'http://localhost:5000/api/bookings',
                {
                    ...formData,
                    service: serviceId,
                    totalPrice: service.price,
                    user: user._id  
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert('Booking created successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.msg || 'Error creating booking');
        }

        setLoading(false);
    };


    if (!service) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                        Book {service.name}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Service info */}
                        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                            <div className="text-3xl mb-2">{service.icon}</div>
                            <h3 className="text-2xl font-bold">{service.name}</h3>
                            <p className="text-3xl font-bold text-blue-600">₹{service.price}/hr</p>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all"
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                            <input
                                type="time"
                                required
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                            <input
                                type="text"
                                placeholder="Your address"
                                required
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                            <textarea
                                rows="4"
                                placeholder="Any special requirements?"
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 rounded-2xl font-bold text-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50"
                        >
                            {loading ? 'Creating Booking...' : `Book Now - ₹${service.price}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Booking;