const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: { 
    type: String, 
    required: true,
    enum: ['Plumber', 'Electrician', 'Tutor', 'Cleaner', 'Carpenter', 'Other']
  },

  description: String,

  price: { type: Number, required: true },

  image: {
    type: String,
    default: ""
  },

  location: {
    type: String
  },

  rating: {
    type: Number,
    default: 0
  },

  numReviews: {
    type: Number,
    default: 0
  },

  provider: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }

}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);