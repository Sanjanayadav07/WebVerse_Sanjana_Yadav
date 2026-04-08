const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  service: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },

  date: { type: Date, required: true },
  time: String,

  location: String,
  address: String,
  phone: String,

  price: {
    type: Number,
    required: true
  },

  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'], 
    default: 'pending' 
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },

  isReviewed: {
    type: Boolean,
    default: false
  },

  notes: String

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);