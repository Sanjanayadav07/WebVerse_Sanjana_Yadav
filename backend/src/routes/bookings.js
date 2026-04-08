const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Service = require('../models/Service');
const router = express.Router();
const auth = require('../middleware/auth');

// ✅ Create Booking (Public - Anyone can book)
router.post('/', auth, async (req, res) => {
  try {
    console.log('📅 New Booking:', req.body);

    const { service, date, time, location, notes } = req.body;

    // Validate required fields
    if (!date || !time || !location || !service) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Find service to get price
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({ msg: 'Service not found' });
    }
    const priceFromClient = req.body.price;
    const bookingPrice = priceFromClient || serviceDoc.price; // fallback to service price

    if (!bookingPrice) {
      return res.status(400).json({ error: "Price is required for booking." });
    }


    // Create booking
    const booking = new Booking({

      service,
      date,
      time,
      location,
      notes,
      price: bookingPrice || serviceDoc.price,
      user: req.user._id , // fallback for older token structure
      //totalPrice: totalPrice || serviceDoc.price // 1 hour default
    });

    await booking.save();

    // Add to user's bookings array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { bookings: booking._id }
    });

    console.log('✅ Booking Created:', booking._id);
    res.json({
      msg: 'Booking created successfully!',
      booking: {
        id: booking._id,
        service: serviceDoc.name,
        date: booking.date,
        time: booking.time,
        location: booking.location,
        status: booking.status,
        //totalPrice: booking.totalPrice
        totalPrice: booking.price
      }
    });

  } catch (error) {
    console.error('❌ Booking Error:', error);
    res.status(500).json({ msg: 'Booking failed' });
  }
});

// ✅ Get My Bookings (Public - for demo)
/*
router.get('/my-bookings', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ msg: 'User ID required' });
    }

    const bookings = await Booking.find({ user: userId })
      .populate('service', 'name price icon category')
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    console.log(`📋 ${bookings.length} bookings found for user ${userId}`);
    res.json(bookings);

  } catch (error) {
    console.error('❌ My Bookings Error:', error);
    res.status(500).json({ msg: 'Failed to fetch bookings' });
  }
});*/

router.get('/my-bookings', async (req, res) => {
  try {
    const { userId } = req.query;

    const bookings = await Booking.find({ user: userId })
      .populate('service', 'name price category')
      .sort({ createdAt: -1 });

    console.log("Bookings found:", bookings);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// ✅ Update Booking Status (Admin only)
router.patch('/:id/status', async (req, res) => {
  try {
    if (req.query.key !== 'admin123') {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('service', 'name price');

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    console.log('🔄 Booking status updated:', booking._id, status);
    res.json({ msg: 'Status updated', booking });

  } catch (error) {
    console.error('❌ Status Update Error:', error);
    res.status(500).json({ msg: 'Update failed' });
  }
});

// ✅ Get All Bookings (Admin)

router.get('/', async (req, res) => {
  try {
    if (req.query.key !== 'admin123') {
      return res.status(403).json({ msg: 'Unauthorized' });
    }

    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('service', 'name price category')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;